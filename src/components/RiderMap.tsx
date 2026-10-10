import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2, Navigation, AlertCircle } from 'lucide-react';

// Setup Leaflet icons
const iconPerson = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const iconRestaurant = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const iconCustomer = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface RiderMapProps {
  riderLocation: { lat: number, lng: number } | null;
  customerLocation: { lat: number, lng: number } | null;
  customerAddress: string;
  restaurantLocation: { lat: number, lng: number };
  restaurantAddress: string;
  target: 'customer' | 'restaurant';
}

function MapUpdater({ bounds }: { bounds: L.LatLngBounds | null }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
       map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, map]);
  return null;
}

export function RiderMap({ riderLocation, customerLocation: initialCustLoc, customerAddress, restaurantLocation, restaurantAddress, target }: RiderMapProps) {
  const [customerLoc, setCustomerLoc] = useState<{lat: number, lng: number} | null>(initialCustLoc);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [distance, setDistance] = useState<string>('');
  const [eta, setEta] = useState<string>('');
  const [status, setStatus] = useState<'loading' | 'success' | 'notFound' | 'error'>('loading');

  // Geocode customer address if no lat/lng is provided
  useEffect(() => {
    if (initialCustLoc) {
      setCustomerLoc(initialCustLoc);
      setStatus('success');
      return;
    }
    if (!customerAddress) {
      setStatus('notFound');
      return;
    }
    
    setStatus('loading');
    // Using Nominatim for free geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(customerAddress)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setCustomerLoc({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
          setStatus('success');
        } else {
          // fallback if not found
          setStatus('notFound');
        }
      })
      .catch(err => {
         console.error('Geocoding error', err);
         setStatus('error');
      });
  }, [initialCustLoc, customerAddress]);

  // Fetch route
  useEffect(() => {
    const destination = target === 'restaurant' ? restaurantLocation : customerLoc;
    
    if (riderLocation && destination && status === 'success') {
      const url = `https://router.project-osrm.org/route/v1/driving/${riderLocation.lng},${riderLocation.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
      
      fetch(url)
        .then(res => res.json())
        .then(data => {
          if (data.routes && data.routes.length > 0) {
             const route = data.routes[0];
             // OSRM returns GeoJSON coordinates as [lng, lat], Leaflet expects [lat, lng]
             const coords = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);
             setRouteCoords(coords);
             
             const distKm = (route.distance / 1000).toFixed(1);
             setDistance(`${distKm} km`);
             
             const mins = Math.round(route.duration / 60);
             setEta(`${mins} min`);
          }
        })
        .catch(err => console.error("Routing error", err));
    }
  }, [riderLocation, customerLoc, restaurantLocation, target, status]);

  if (status === 'loading') {
    return (
       <div className="h-64 bg-gray-50 flex flex-col items-center justify-center rounded-2xl border border-gray-100">
          <Loader2 className="animate-spin text-bangalore-primary mb-2" size={32} />
          <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Loading customer location...</p>
       </div>
    );
  }

  if (status === 'notFound') {
    return (
       <div className="h-64 bg-gray-50 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200">
          <AlertCircle className="text-gray-400 mb-2" size={32} />
          <p className="text-gray-500 font-bold text-sm uppercase tracking-wider text-center max-w-[250px]">Customer location not available. Please contact admin/customer.</p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(customerAddress)}`}
            target="_blank"
            className="mt-3 text-blue-600 font-bold text-xs uppercase bg-blue-100 px-4 py-2 rounded-lg"
          >
             Search in Google Maps
          </a>
       </div>
    );
  }
  
  if (status === 'error') {
    return (
       <div className="h-64 bg-red-50 flex flex-col items-center justify-center rounded-2xl border border-red-100">
          <AlertCircle className="text-red-400 mb-2" size={32} />
          <p className="text-red-500 font-bold text-sm uppercase tracking-wider">Map Error</p>
          <p className="text-red-400 text-xs text-center px-4">Unable to load map. Use Google Maps instead.</p>
       </div>
    );
  }

  const destination = target === 'restaurant' ? restaurantLocation : customerLoc;
  let bounds = null;
  if (riderLocation && destination) {
    bounds = L.latLngBounds([riderLocation.lat, riderLocation.lng], [destination.lat, destination.lng]);
  }

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-200 z-0">
      <MapContainer 
         center={riderLocation || [30.900965, 75.8572758]} 
         zoom={13} 
         scrollWheelZoom={false} 
         style={{ height: '100%', width: '100%' }}
         zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {riderLocation && (
           <Marker position={[riderLocation.lat, riderLocation.lng]} icon={iconPerson}>
              <Popup>You are here</Popup>
           </Marker>
        )}
        
        <Marker position={[restaurantLocation.lat, restaurantLocation.lng]} icon={iconRestaurant}>
            <Popup>{restaurantAddress}</Popup>
        </Marker>
        
        {customerLoc && (
           <Marker position={[customerLoc.lat, customerLoc.lng]} icon={iconCustomer}>
              <Popup>{customerAddress}</Popup>
           </Marker>
        )}
        
        {routeCoords.length > 0 && (
           <Polyline positions={routeCoords} color="#B30000" weight={4} opacity={0.7} />
        )}
        
        <MapUpdater bounds={bounds} />
      </MapContainer>
      
      {/* Overlay UI for ETA/Distance */}
      {(distance || eta) && (
         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg border border-white/40 flex flex-col items-end z-[400] pointer-events-none">
            {eta && <div className="text-bangalore-primary font-black text-lg leading-tight">{eta}</div>}
            {distance && <div className="text-gray-500 font-bold text-xs uppercase tracking-wider">{distance} left</div>}
         </div>
      )}
    </div>
  );
}
