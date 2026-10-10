const fs = require('fs');

const path = 'src/pages/MenuManagement.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add the Find Better Image button
const buttonCode = `                        <button onClick={() => handleFindBetterImage(item)} className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors" title="Find Better Image">
                          <ImageIcon size={16} />
                        </button>`;
content = content.replace(
  /<button onClick=\{\(\) => handleOpenModal\(item\)\}/,
  buttonCode + '\n                        <button onClick={() => handleOpenModal(item)}'
);

// 2. Add the Image Search Modal
const modalCode = `      {/* Image Search Modal */}
      {imageSearchModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-xl border border-gray-100 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Find Better Image</h2>
              <button onClick={() => setImageSearchModalOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Search Query</label>
              <div className="flex gap-2 mt-1">
                <input 
                  type="text" 
                  value={imageSearchQuery}
                  onChange={(e) => setImageSearchQuery(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bangalore-primary/20 focus:border-bangalore-primary outline-none"
                  onKeyDown={(e) => { if(e.key === 'Enter') handleFindBetterImage({ id: imageSearchTargetId, name: imageSearchQuery }) }}
                />
                <button 
                  onClick={() => handleFindBetterImage({ id: imageSearchTargetId, name: imageSearchQuery })}
                  className="px-4 py-2 bg-bangalore-primary text-white rounded-lg font-medium flex items-center gap-2"
                  disabled={imageSearchLoading}
                >
                  {imageSearchLoading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto min-h-[300px]">
              {imageSearchLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Loader2 className="animate-spin mb-2" size={32} />
                  <p>Searching Wikimedia Commons...</p>
                </div>
              ) : imageSearchResults.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4">
                  {imageSearchResults.map((url, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:ring-4 hover:ring-bangalore-primary/30 transition-all" onClick={() => handleSelectSearchedImage(url)}>
                      <img src={url} alt="Search Result" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-bangalore-primary text-white px-3 py-1.5 rounded-lg text-sm font-semibold">Select</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>No images found. Try a different search term.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Sync Summary Modal */}`;

content = content.replace(/\{\/\* Sync Summary Modal \*\/\}/, modalCode);

fs.writeFileSync(path, content, 'utf8');
console.log("Patched successfully");
