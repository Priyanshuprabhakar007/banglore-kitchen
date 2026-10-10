import React, { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, onSnapshot, addDoc, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, LogIn, Bike, MapPin, Navigation, Package, CheckCircle2, DollarSign, Power, User, AlertTriangle, XCircle, Search, HelpCircle, History, CircleDot } from 'lucide-react';

export function RiderApp() {
  const [rider, setRider] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [activeJob, setActiveJob] = useState<any>(null);
  const [availableJobs, setAvailableJobs] = useState<any[]>([]);
  const [historyJobs, setHistoryJobs] = useState<any[]>([]);
  const [stats, setStats] = useState({ deliveries: 0, earnings: 0 });
  const [activeTab, setActiveTab] = useState<'jobs' | 'history'>('jobs');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueNote, setIssueNote] = useState('');
  const [issueReason, setIssueReason] = useState('Customer not reachable');
  const [showCodModal, setShowCodModal] = useState(false);
  const [riderLocation, setRiderLocation] = useState<{lat: number, lng: number} | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // initialize notification sound
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
  }, []);

  const playNotification = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let riderData = null;

      // First check if input matches exactly a document ID
      const docRef = doc(db, 'riders', phone);
      const docSnap = await getDocs(query(collection(db, 'riders'), where('__name__', '==', phone)));
      if (!docSnap.empty) {
        riderData = { id: docSnap.docs[0].id, ...docSnap.docs[0].data() };
      } else {
        // Fallback to check by phone
        let q = query(collection(db, 'riders'), where('phone', '==', phone));
        let querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          riderData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
        }
      }

      if (riderData) {
        if (riderData.password && riderData.password !== password) {
          alert("Incorrect password. Please try again.");
          setLoading(false);
          return;
        }
        setRider(riderData);
        localStorage.setItem('rider_id', riderData.id);
        // By default update to online if logging in
        await updateDoc(doc(db, 'riders', riderData.id), { status: 'Online' });
      } else {
        alert("Rider not found with this number or ID. Please contact admin.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in.");
    } finally {
      setLoading(false);
    }
  };

  // Persist Login
  useEffect(() => {
    const savedId = localStorage.getItem('rider_id');
    if (savedId) {
      const unsubscribe = onSnapshot(doc(db, 'riders', savedId), (snapshot) => {
        if (snapshot.exists()) {
          setRider({ id: snapshot.id, ...snapshot.data() });
        } else {
          localStorage.removeItem('rider_id');
          setRider(null);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Sync Jobs and Stats
  useEffect(() => {
    if (!rider) return;

    // 1. Active Job (assigned or out_for_delivery for this rider)
    const qActive = query(
      collection(db, 'orders'), 
      where('riderId', '==', rider.id),
      where('status', 'in', ['assigned', 'out_for_delivery'])
    );

    const unsubActive = onSnapshot(qActive, (snapshot) => {
      if (!snapshot.empty) {
        setActiveJob({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      } else {
        setActiveJob(null);
      }
    });

    // 2. Available Jobs (delivery orders that are ready/packed and NOT assigned OR assigned to me but status is still ready/packed)
    // To simplify: if riderId is null, and status in ['ready','packed'], it's available for grab
    const qAvailable = query(
      collection(db, 'orders'),
      where('status', 'in', ['ready', 'packed']),
    );

    const unsubAvailable = onSnapshot(qAvailable, (snapshot) => {
      let jobs: any[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Filter out non-delivery
      jobs = jobs.filter(j => (!j.orderType || j.orderType === 'delivery') && !j.riderId);
      
      if (jobs.length > availableJobs.length && rider.status === 'Online') {
        playNotification();
      }
      setAvailableJobs(jobs);
    });

    // 3. History Jobs (delivered or failed by this rider today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const qHistory = query(
      collection(db, 'orders'),
      where('riderId', '==', rider.id),
      where('status', 'in', ['delivered', 'failed', 'issue_reported'])
    );

    const unsubHistory = onSnapshot(qHistory, (snapshot) => {
      let jobs: any[] = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort by date DESC
      jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setHistoryJobs(jobs);
    });

    return () => {
      unsubActive();
      unsubAvailable();
      unsubHistory();
    };
  }, [rider]);

  // Live Location Tracking
  useEffect(() => {
    let watchId: number;

    if (rider && activeJob && rider.status === 'Online') {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          async (position) => {
            const { latitude, longitude, heading, speed } = position.coords;
            setRiderLocation({ lat: latitude, lng: longitude });
            try {
              // We can either update a separate collection or the rider doc.
              // Updating a tracking collection:
              await updateDoc(doc(db, 'riders', rider.id), {
                 lat: latitude,
                 lng: longitude,
                 heading: heading || 0,
                 speed: speed || 0,
                 activeOrderId: activeJob.id,
                 lastLocationUpdate: serverTimestamp()
              });
            } catch (err) {
              console.log("Location update error", err);
            }
          },
          (error) => console.log("Geolocation error", error),
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );
      }
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [rider, activeJob]);

  const toggleStatus = async () => {
    const newStatus = rider.status === 'Online' ? 'Offline' : 'Online';
    await updateDoc(doc(db, 'riders', rider.id), { status: newStatus });
  };

  const acceptJob = async (jobId: string) => {
    if (rider.status !== 'Online') {
      alert("Please go Online to accept jobs.");
      return;
    }
    if (activeJob) {
      alert("You already have an active job.");
      return;
    }
    try {
      await updateDoc(doc(db, 'orders', jobId), {
        riderId: rider.id,
        riderName: rider.name,
        status: 'assigned',
        assignedAt: serverTimestamp()
      });
    } catch (e) {
      console.error(e);
      alert("Could not accept job. It might have been taken.");
    }
  };

  const updateOrderStatus = async (status: string, extraData: any = {}) => {
    if (!activeJob) return;
    
    const updates: any = { status, ...extraData };
    
    if (status === 'delivered') {
      updates.deliveredAt = serverTimestamp();
      const newDeliveries = (rider.totalDeliveries || 0) + 1;
      const newEarnings = (rider.earnings || 0) + 50; // default 50 per delivery
      await updateDoc(doc(db, 'riders', rider.id), {
        totalDeliveries: newDeliveries,
        earnings: newEarnings
      });
    } else if (status === 'out_for_delivery') {
      updates.pickedUpAt = serverTimestamp();
    }

    try {
      await updateDoc(doc(db, 'orders', activeJob.id), updates);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };
  
  const handleMarkDelivered = () => {
     const pm = (activeJob?.paymentMethod || '').toLowerCase();
     if (pm === 'cash' || pm === 'cod' || pm.includes('cash on delivery')) {
        setShowCodModal(true);
     } else {
        if (window.confirm("Are you sure this order has been delivered?")) {
           updateOrderStatus('delivered');
        }
     }
  };

  const submitCodDelivery = () => {
     updateOrderStatus('delivered', { paymentStatus: 'Paid' });
     setShowCodModal(false);
  };

  const submitIssue = () => {
     if (!issueNote) {
        alert("Please add a note about the issue.");
        return;
     }
     updateOrderStatus('issue_reported', { 
         issueReason, 
         issueNote, 
         issueReportedAt: serverTimestamp() 
     });
     setShowIssueModal(false);
  };

  const openGoogleMapsRoute = () => {
    // Admin config placeholder, can be fetched if exists in branding
    const restaurantLat = 30.8986; 
    const restaurantLng = 75.8504;
    const restaurantAddress = "The Bangalore Kitchen, Ludhiana";
    
    let origin = `${restaurantLat},${restaurantLng}`;

    let destination = '';
    if (activeJob?.customerLocation?.lat && activeJob?.customerLocation?.lng) {
        destination = `${activeJob.customerLocation.lat},${activeJob.customerLocation.lng}`;
    } else if (activeJob?.deliveryLocation?.lat && activeJob?.deliveryLocation?.lng) {
        destination = `${activeJob.deliveryLocation.lat},${activeJob.deliveryLocation.lng}`;
    } else {
        const address = activeJob?.customerAddress || activeJob?.deliveryAddress || activeJob?.address;
        if (address) {
            destination = encodeURIComponent(address);
        }
    }

    if (!destination) {
        alert("Customer location not available. Please call customer or contact admin.");
        return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    try {
        window.open(url, '_blank');
    } catch (e) {
        alert("Unable to open Google Maps. Please check customer address or copy address manually.");
    }
  };
  
  const callCustomer = (phone: string) => {
     if (!phone) {
        alert("Customer phone number not available.");
        return;
     }
     window.location.href = `tel:${phone}`;
  };

  if (!rider) {
    return (
      <div className="min-h-screen bg-bangalore-ivory flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-bangalore-primary text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Bike size={48} />
            </div>
            <h1 className="text-3xl font-serif font-black text-gray-900">Rider App</h1>
            <p className="text-gray-500 font-medium">The Bangalore Kitchen Logistics</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest pl-1">Phone Number / ID</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="tel" 
                  required
                  placeholder="Enter Mobile or ID"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-bangalore-primary outline-none transition-all text-xl font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-700 uppercase tracking-widest pl-1">PIN / Password</label>
              <div className="relative">
                <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Optional for demo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-bangalore-primary outline-none transition-all text-xl font-bold"
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-bangalore-primary text-white py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-bangalore-primary active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "AUTHENTICATING..." : (
                <>LOGIN <LogIn size={24} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-8 pb-6 shadow-sm mb-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2 uppercase tracking-tight">
            {rider.name}
          </h2>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{rider.vehicle || 'Rider'}</p>
        </div>
        <button 
          onClick={toggleStatus}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-black text-sm uppercase tracking-wider transition-all shadow-sm ${
            rider.status === 'Online' 
              ? 'bg-green-500 text-white border border-green-600 active:bg-green-600' 
              : 'bg-gray-100 text-gray-500 border border-gray-200 active:bg-gray-200'
          }`}
        >
          <CircleDot size={18} className={rider.status === 'Online' ? 'animate-pulse' : ''} /> {rider.status}
        </button>
      </div>

      <div className="px-5 space-y-6">
         {activeTab === 'jobs' && (
            <>
               {/* Current Order Section */}
               {activeJob && (
                 <div>
                   <h3 className="text-sm font-black text-gray-500 mb-3 px-1 uppercase tracking-widest flex items-center gap-2">
                     <Navigation className="text-bangalore-primary" size={16} /> 
                     Current Active Job
                   </h3>
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-6"
                   >
                     <div className="bg-bangalore-primary p-5 text-white flex justify-between items-center shadow-inner">
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Order #</p>
                         <h4 className="text-xl font-black">{activeJob.id.slice(-6).toUpperCase()}</h4>
                       </div>
                       <div className="text-right">
                         <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30 backdrop-blur-sm">
                           {activeJob.status.replace('_', ' ')}
                         </span>
                       </div>
                     </div>

                     <div className="p-6 space-y-6">
                       {/* Customer */}
                       <div className="flex items-start gap-4">
                         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                           <User size={24} />
                         </div>
                         <div className="flex-1">
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer</p>
                           <p className="text-xl font-black text-gray-900">{activeJob.customerName}</p>
                           <p className="text-sm font-bold text-gray-500">{activeJob.customerPhone}</p>
                         </div>
                       </div>
                       {/* Delivery Address */}
                       <div className="flex items-start gap-4">
                         <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                           <MapPin size={24} />
                         </div>
                         <div className="flex-1">
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Delivery Details</p>
                           <p className="text-base font-bold text-gray-800 leading-tight">
                             {activeJob.customerAddress || activeJob.deliveryAddress}
                           </p>
                           {activeJob.landmark && <p className="text-sm text-gray-500 mt-1">Landmark: {activeJob.landmark}</p>}
                           </div>
                         </div>

                         {/* Items and Total */}
                         <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                           <div className="flex justify-between font-black text-gray-900">
                             <span>Amount to Collect:</span>
                             <span className={activeJob.paymentMethod === 'Cash' || activeJob.paymentMethod === 'cod' ? "text-bangalore-primary text-xl" : "text-green-600 text-xl"}>
                                ${activeJob.totalAmount || activeJob.total} 
                             </span>
                           </div>
                           <p className="text-right text-xs font-bold text-gray-500 mt-1 uppercase">
                             Via {activeJob.paymentMethod || 'Online'}
                           </p>
                         </div>

                         {/* Actions */}
                         <div className="flex flex-col gap-3 pt-2">
                           {activeJob.status === 'assigned' && (
                             <button 
                               onClick={() => updateOrderStatus('out_for_delivery')}
                               className="w-full bg-bangalore-primary text-white py-5 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                             >
                               <CheckCircle2 size={24} /> MARK PICKED UP
                             </button>
                           )}
                           {activeJob.status === 'out_for_delivery' && (
                             <>
                               <button 
                                 onClick={() => openGoogleMapsRoute()}
                                 className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                               >
                                 <Navigation size={24} /> NAVIGATE TO CUSTOMER
                               </button>
                               <button 
                                 onClick={handleMarkDelivered}
                                 className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                               >
                                 <CheckCircle2 size={24} /> MARK DELIVERED
                               </button>
                             </>
                           )}
                           
                           {/* Secondary Actions (always visible alongside primary) */}
                           <div className="flex gap-2">
                             <button 
                               onClick={() => callCustomer(activeJob.customerPhone)}
                               className="flex-1 bg-white border-2 border-green-100 text-green-600 py-4 rounded-2xl font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide hover:bg-green-50"
                             >
                               <Phone size={18} /> Call Customer
                             </button>
                             <button 
                                onClick={() => setShowIssueModal(true)}
                                className="flex-1 bg-white border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide hover:bg-red-50"
                             >
                                <AlertTriangle size={18} /> Report Issue
                             </button>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   </div>
                 )}

               {/* Available Jobs */}
               {!activeJob && (
                 <div>
                   <h3 className="text-sm font-black text-gray-500 mb-3 px-1 uppercase tracking-widest flex items-center justify-between">
                     <span className="flex items-center gap-2"><Bike className="text-bangalore-primary" size={16} /> Available Jobs</span>
                     {rider.status === 'Offline' && <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md text-[10px]">GO ONLINE</span>}
                   </h3>
                   
                   {rider.status === 'Offline' ? (
                     <div className="bg-red-50/50 rounded-2xl p-8 text-center border-2 border-dashed border-red-100">
                       <Power size={32} className="mx-auto text-red-300 mb-3" />
                       <p className="text-sm font-bold text-red-500 uppercase tracking-wide">You are Offline</p>
                       <p className="text-xs text-red-400 mt-1">Go online to receive delivery jobs.</p>
                     </div>
                   ) : availableJobs.length > 0 ? (
                      <div className="space-y-4">
                        <AnimatePresence>
                           {availableJobs.map(job => (
                             <motion.div
                               key={job.id}
                               initial={{ opacity: 0, x: -20 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, scale: 0.9 }}
                               className="bg-white p-5 rounded-3xl shadow-sm border-2 border-bangalore-primary/20 relative overflow-hidden"
                             >
                                <div className="absolute top-0 left-0 w-1 h-full bg-bangalore-primary" />
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <span className="bg-green-100 text-green-700 font-black text-[10px] px-2 py-1 rounded-md uppercase tracking-wider">New Job Available</span>
                                    <h4 className="font-black text-lg text-gray-900 mt-1">#{job.id.slice(-6).toUpperCase()}</h4>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs font-bold text-gray-500">Collect</p>
                                    <p className="font-black text-bangalore-primary text-lg">${job.totalAmount || job.total}</p>
                                  </div>
                                </div>
                                <div className="space-y-2 mb-5">
                                  <p className="text-sm text-gray-600 flex items-center gap-2 font-medium">
                                    <User size={14} className="text-gray-400" /> {job.customerName}
                                  </p>
                                  <p className="text-sm text-gray-600 flex items-start gap-2 font-medium">
                                    <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" /> 
                                    <span className="line-clamp-2">{job.customerAddress || job.deliveryAddress}</span>
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <button onClick={() => acceptJob(job.id)} className="flex-1 bg-bangalore-primary text-white font-black text-sm uppercase py-3 rounded-xl shadow-md active:scale-95 transition-transform">Accept Job</button>
                                </div>
                             </motion.div>
                           ))}
                        </AnimatePresence>
                      </div>
                   ) : (
                     <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                       <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
                         <Search size={32} />
                       </div>
                       <p className="text-sm font-black text-gray-400 uppercase tracking-wider">Waiting for Jobs...</p>
                     </div>
                   )}
                 </div>
               )}
            </>
         )}

         {activeTab === 'history' && (
            <div>
               <h3 className="text-sm font-black text-gray-500 mb-3 px-1 uppercase tracking-widest flex items-center gap-2">
                 <History className="text-bangalore-primary" size={16} /> 
                 Today's History
               </h3>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                   <Package className="text-green-500 mb-2" size={24} />
                   <p className="text-2xl font-black text-gray-900">{rider.totalDeliveries || 0}</p>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Deliveries</p>
                 </div>
                 <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
                   <DollarSign className="text-yellow-500 mb-2" size={24} />
                   <p className="text-2xl font-black text-gray-900">${rider.earnings || 0}</p>
                   <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Earnings</p>
                 </div>
               </div>

               {historyJobs.length > 0 ? (
                  <div className="space-y-4">
                    {historyJobs.map(job => (
                      <div key={job.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-gray-900">#{job.id.slice(-6).toUpperCase()}</span>
                          <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${
                             job.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {job.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-500 mt-1">{new Date(job.updatedAt || job.createdAt).toLocaleTimeString()}</p>
                        <p className="text-sm font-medium text-gray-700 mt-2">{job.customerName}</p>
                      </div>
                    ))}
                  </div>
               ) : (
                  <div className="text-center py-12">
                     <p className="text-sm font-bold text-gray-400">No jobs completed today.</p>
                  </div>
               )}
            </div>
         )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showIssueModal && (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
               className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-black text-gray-900 mb-4">Report Issue</h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Reason</label>
                    <select 
                       value={issueReason} 
                       onChange={(e) => setIssueReason(e.target.value)}
                       className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:border-red-500"
                    >
                       <option>Customer not reachable</option>
                       <option>Wrong address</option>
                       <option>Payment issue</option>
                       <option>Customer refused order</option>
                       <option>Vehicle issue</option>
                       <option>Food package issue</option>
                       <option>Other</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">Notes</label>
                    <textarea 
                       value={issueNote}
                       onChange={(e) => setIssueNote(e.target.value)}
                       className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-medium outline-none focus:border-red-500 resize-none h-24"
                       placeholder="Add details here..."
                    />
                 </div>
                 
                 <div className="flex gap-3 pt-2">
                    <button onClick={() => setShowIssueModal(false)} className="flex-1 py-3 text-gray-600 font-bold bg-gray-100 rounded-xl">Cancel</button>
                    <button onClick={submitIssue} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-md">Submit Issue</button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showCodModal && activeJob && (
          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm"
          >
            <motion.div 
               initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
               className="bg-white w-full max-w-sm rounded-t-[2rem] sm:rounded-3xl p-6 pb-12 sm:pb-6 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />
              <div className="text-center mb-6">
                 <div className="w-16 h-16 bg-bangalore-primary/10 text-bangalore-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign size={32} />
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 mb-1">Cash on Delivery</h3>
                 <p className="text-gray-500 font-medium">Please collect cash before delivering.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6 flex flex-col items-center">
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Amount to Collect</span>
                 <span className="text-4xl font-black text-gray-900">${activeJob.totalAmount || activeJob.total}</span>
              </div>
              
              <div className="flex flex-col gap-3">
                 <button onClick={submitCodDelivery} className="w-full py-4 bg-green-500 text-white font-black text-lg rounded-xl shadow-md active:scale-95 flex items-center justify-center gap-2">
                    <CheckCircle2 size={24} /> CASH COLLECTED
                 </button>
                 <button onClick={() => setShowCodModal(false)} className="w-full py-4 text-gray-500 font-bold bg-white border-2 border-gray-100 rounded-xl">
                    Back
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
        <button 
           onClick={() => setActiveTab('jobs')}
           className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 font-bold text-[10px] uppercase tracking-widest transition-colors ${activeTab === 'jobs' ? 'text-bangalore-primary' : 'text-gray-400 hover:bg-gray-50'}`}
        >
          <Bike size={24} className={activeTab === 'jobs' ? 'mb-1' : 'mb-1 opacity-70'} />
          Jobs
        </button>
        <button 
           onClick={() => setActiveTab('history')}
           className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 font-bold text-[10px] uppercase tracking-widest transition-colors ${activeTab === 'history' ? 'text-bangalore-primary' : 'text-gray-400 hover:bg-gray-50'}`}
        >
          <History size={24} className={activeTab === 'history' ? 'mb-1' : 'mb-1 opacity-70'} />
          History
        </button>
        <button 
          onClick={() => {
            updateDoc(doc(db, 'riders', rider.id), { status: 'Offline' }).then(() => {
               localStorage.removeItem('rider_id');
               setRider(null);
            });
          }}
           className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors"
        >
          <Power size={24} className="mb-1 opacity-70" />
          Logout
        </button>
      </div>
    </div>
  );
}
