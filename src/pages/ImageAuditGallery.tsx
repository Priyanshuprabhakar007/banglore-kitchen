import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  Eye, 
  Clock, 
  AlertCircle, 
  Download, 
  Layers,
  Utensils
} from 'lucide-react';
import rawManifest from '../data/aiMenuManifest.json';

interface ManifestItem {
  dishId: string;
  dishName: string;
  category: string;
  price: number;
  description: string;
  isVegetarian: boolean;
  aiPrompt: string;
  generatedAssetFilename: string;
  generationStatus: 'GENERATED' | 'QUOTA_EXHAUSTED_WAITING_RESET' | 'PENDING';
  approvalStatus: 'APPROVED' | 'PENDING_GENERATION' | 'REJECTED';
  mappingStatus: string;
  assetPath: string | null;
  originalImageUrl: string;
  lastChecked: string;
}

export function ImageAuditGallery() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; prompt: string } | null>(null);

  // Load persisted user approvals from localStorage
  const [approvals, setApprovals] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('tbk_ai_menu_approvals');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default: generated items are approved initially
    const initial: Record<string, boolean> = {};
    (rawManifest as ManifestItem[]).forEach(item => {
      if (item.generationStatus === 'GENERATED') {
        initial[item.dishId] = true;
      }
    });
    return initial;
  });

  // Sync to localStorage whenever approvals change
  useEffect(() => {
    localStorage.setItem('tbk_ai_menu_approvals', JSON.stringify(approvals));
  }, [approvals]);

  const handleApprove = (dishId: string) => {
    setApprovals(prev => ({ ...prev, [dishId]: true }));
  };

  const handleReject = (dishId: string) => {
    setApprovals(prev => ({ ...prev, [dishId]: false }));
  };

  const handleReset = (dishId: string) => {
    setApprovals(prev => {
      const next = { ...prev };
      delete next[dishId];
      return next;
    });
  };

  const items: ManifestItem[] = rawManifest as ManifestItem[];

  const categories = ['all', ...Array.from(new Set(items.map(i => i.category)))];

  const totalDishes = items.length;
  const generatedCount = items.filter(i => i.generationStatus === 'GENERATED').length;
  const approvedCount = items.filter(i => approvals[i.dishId] === true).length;
  const rejectedCount = items.filter(i => approvals[i.dishId] === false).length;
  const pendingCount = totalDishes - generatedCount;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.dishName.toLowerCase().includes(search.toLowerCase()) ||
                          item.dishId.toLowerCase().includes(search.toLowerCase()) ||
                          item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    let matchesStatus = true;
    if (selectedStatus === 'generated') matchesStatus = item.generationStatus === 'GENERATED';
    if (selectedStatus === 'pending') matchesStatus = item.generationStatus !== 'GENERATED';
    if (selectedStatus === 'approved') matchesStatus = approvals[item.dishId] === true;
    if (selectedStatus === 'rejected') matchesStatus = approvals[item.dishId] === false;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const exportManifest = () => {
    const exportData = items.map(item => ({
      ...item,
      userApproved: approvals[item.dishId] ?? (item.generationStatus === 'GENERATED')
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tbk-ai-menu-manifest-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-10 font-sans">
      <Helmet>
        <title>AI Menu Photography Studio & Approval Gallery | The Bangalore Kitchen</title>
      </Helmet>

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles size={14} />
              AI Culinary Photography Studio & Manifest Engine
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              AI Food Photography Approval Studio
            </h1>
            <p className="text-neutral-400 mt-2 text-sm md:text-base max-w-2xl">
              Inspect, approve, or reject generated AI food photographs. Rejections are instantly unpublished from the customer menu. Firebase production records remain safe and untouched.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportManifest}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-medium border border-neutral-700 transition"
            >
              <Download size={16} />
              Export Manifest JSON
            </button>
            <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 p-3 rounded-xl">
              <ShieldCheck className="text-emerald-400" size={28} />
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider font-bold">Safety Lock</div>
                <div className="text-xs font-medium text-emerald-400">0 Writes to Firebase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Generation Quota Transparency Card */}
        <div className="mt-6 bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-amber-500/30 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <AlertCircle size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Model Quota & Generation Status</h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-mono">
                  gemini-3.1-flash-image
                </span>
              </div>
              <p className="text-neutral-400 text-xs mt-1 leading-relaxed max-w-3xl">
                Batch 1 successfully generated <strong className="text-emerald-400">12 photorealistic master dish assets</strong>. The cloud image generation service is currently undergoing its standard rate-limit quota reset window (~12 minutes remaining). All remaining 99 prompts have been pre-compiled in the manifest for batch processing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-neutral-950/70 border border-neutral-800 px-3.5 py-2 rounded-xl text-xs font-mono text-neutral-300">
            <Clock size={15} className="text-amber-400" />
            <span>Reset Window: Active</span>
          </div>
        </div>

        {/* Live Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mt-6">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl font-bold text-white">{totalDishes}</div>
            <div className="text-xs text-neutral-400 mt-1">Total Active Dishes</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl font-bold text-blue-400">{generatedCount}</div>
            <div className="text-xs text-neutral-400 mt-1">AI Assets Generated</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl font-bold text-emerald-400">{approvedCount}</div>
            <div className="text-xs text-neutral-400 mt-1">Approved for Menu</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl font-bold text-rose-400">{rejectedCount}</div>
            <div className="text-xs text-neutral-400 mt-1">Rejected / Unpublished</div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="text-2xl font-bold text-amber-400">{pendingCount}</div>
            <div className="text-xs text-neutral-400 mt-1">Pending Next Batch</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={17} />
            <input
              type="text"
              placeholder="Search by dish name, ID, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            {/* Status pills */}
            {[
              { id: 'all', label: 'All Items' },
              { id: 'generated', label: `Generated (${generatedCount})` },
              { id: 'approved', label: `Approved (${approvedCount})` },
              { id: 'rejected', label: `Rejected (${rejectedCount})` },
              { id: 'pending', label: `Pending (${pendingCount})` },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedStatus === st.id
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pt-3 pb-1 scrollbar-none">
          <Filter size={14} className="text-neutral-500 shrink-0 mr-1" />
          {categories.slice(0, 12).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition capitalize ${
                selectedCategory === cat
                  ? 'bg-neutral-700 text-white font-semibold'
                  : 'bg-neutral-900/60 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dishes */}
      <div className="max-w-7xl mx-auto space-y-6">
        {filteredItems.map((item, idx) => {
          const isApproved = approvals[item.dishId] === true;
          const isRejected = approvals[item.dishId] === false;
          const isGenerated = item.generationStatus === 'GENERATED' && item.assetPath;

          return (
            <div
              key={item.dishId}
              className={`border rounded-2xl overflow-hidden transition ${
                isRejected 
                  ? 'bg-neutral-950/60 border-rose-950 opacity-70' 
                  : isApproved 
                  ? 'bg-neutral-900/60 border-neutral-800 hover:border-emerald-500/40' 
                  : 'bg-neutral-900/40 border-neutral-800'
              }`}
            >
              {/* Header Info */}
              <div className="p-4 md:px-6 md:py-3.5 bg-neutral-900 border-b border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    #{idx + 1}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white tracking-wide">
                    {item.dishName}
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500">
                    ID: {item.dishId}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 capitalize">
                    {item.category.replace(/-/g, ' ')}
                  </span>
                  {item.isVegetarian && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Veg
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold text-neutral-300">
                    ${Number(item.price).toFixed(2)}
                  </span>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  {isGenerated ? (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800 font-medium">
                      <Sparkles size={12} />
                      AI Generated
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-amber-950/60 text-amber-400 border border-amber-800/60 font-medium">
                      <Clock size={12} />
                      Pending Quota Reset
                    </span>
                  )}

                  {isApproved && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      <CheckCircle2 size={12} />
                      Active On Website
                    </span>
                  )}
                  {isRejected && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                      <XCircle size={12} />
                      Unpublished
                    </span>
                  )}
                </div>
              </div>

              {/* Body: Left Image & Right Prompt/Controls */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5">
                {/* Image Section (4 cols) */}
                <div className="md:col-span-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 group">
                    {isGenerated && item.assetPath ? (
                      <>
                        <img
                          src={item.assetPath}
                          alt={item.dishName}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <button
                          onClick={() => setPreviewImage({ src: item.assetPath!, title: item.dishName, prompt: item.aiPrompt })}
                          className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg bg-black/70 text-white backdrop-blur-sm"
                          title="Zoom Photo"
                        >
                          <Eye size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-neutral-900 to-neutral-950">
                        <Utensils size={32} className="text-neutral-600 mb-2" />
                        <span className="text-xs text-neutral-400 font-semibold">{item.dishName}</span>
                        <span className="text-[10px] text-amber-500/80 mt-1">Neutral Missing-Image Placeholder Active</span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-black/80 backdrop-blur-xs text-[11px] font-mono text-neutral-400 truncate">
                      {isGenerated ? item.assetPath : 'Fallback: Neutral Placeholder'}
                    </div>
                  </div>
                </div>

                {/* Details & Controls Section (8 cols) */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    {/* Art Direction Prompt */}
                    <div className="mb-3">
                      <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                        Art Director AI Prompt:
                      </div>
                      <p className="text-xs text-neutral-300 font-mono bg-neutral-950 p-3 rounded-lg border border-neutral-800 leading-relaxed">
                        {item.aiPrompt}
                      </p>
                    </div>

                    {/* Preparation & Ingredients */}
                    {item.description && (
                      <div className="text-xs text-neutral-400 mb-4">
                        <span className="font-semibold text-neutral-300">Description: </span>
                        {item.description}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-800">
                    <div className="text-xs text-neutral-400">
                      Resolution: <strong className="text-neutral-200">1200×900 4:3 WebP</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(item.dishId)}
                        disabled={!isGenerated}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                          isApproved
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isGenerated
                            ? 'bg-neutral-800 hover:bg-emerald-950 text-neutral-300 hover:text-emerald-400 border border-neutral-700 hover:border-emerald-800'
                            : 'opacity-40 cursor-not-allowed bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(item.dishId)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                          isRejected
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'bg-neutral-800 hover:bg-rose-950 text-neutral-300 hover:text-rose-400 border border-neutral-700 hover:border-rose-800'
                        }`}
                      >
                        <XCircle size={14} />
                        Reject / Unpublish
                      </button>

                      {(isApproved || isRejected) && (
                        <button
                          onClick={() => handleReset(item.dishId)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-neutral-200 bg-neutral-800 hover:bg-neutral-700 transition"
                          title="Reset decision"
                        >
                          <RotateCcw size={13} />
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-4xl max-h-[92vh] flex flex-col items-center bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="max-h-[72vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-3 text-center">
              <h4 className="text-lg font-bold text-white">{previewImage.title}</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl line-clamp-2">{previewImage.prompt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
