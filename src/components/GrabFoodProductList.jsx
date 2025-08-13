import { useState, useMemo } from 'react';

const GrabFoodProductList = ({ data }) => {
  const [copiedId, setCopiedId] = useState(null);
  const [filterDuplicates, setFilterDuplicates] = useState(false);

  if (!data || !data.menuItems || data.menuItems.length === 0) {
    return null;
  }

  const { menuItems, name, address, rating, eta, distanceInKm, estimatedDeliveryFee } = data;

  // Filter out duplicate products based on name
  const filteredMenuItems = useMemo(() => {
    if (!filterDuplicates) return menuItems;
    
    const uniqueItems = [];
    const seenNames = new Set();
    
    menuItems.forEach(item => {
      const normalizedName = item.name.toLowerCase().trim();
      if (!seenNames.has(normalizedName)) {
        seenNames.add(normalizedName);
        uniqueItems.push(item);
      }
    });
    
    return uniqueItems;
  }, [menuItems, filterDuplicates]);

  // Count duplicates
  const duplicateCount = useMemo(() => {
    if (!filterDuplicates) return 0;
    
    const seenNames = new Set();
    let duplicates = 0;
    
    menuItems.forEach(item => {
      const normalizedName = item.name.toLowerCase().trim();
      if (seenNames.has(normalizedName)) {
        duplicates++;
      } else {
        seenNames.add(normalizedName);
      }
    });
    
    return duplicates;
  }, [menuItems, filterDuplicates]);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatPrice = (priceInMinorUnit) => {
    if (!priceInMinorUnit) return 'N/A';
    return priceInMinorUnit.toString();
  };

  const copyProductInfo = (product) => {
    const text = `${product.name}\t${formatPrice(product.originalPrice)}`;
    copyToClipboard(text, product.id);
  };

  const copyAllProducts = () => {
    const allText = filteredMenuItems
      .map(product => `${product.name}\t${formatPrice(product.originalPrice)}`)
      .join('\n');
    copyToClipboard(allText, 'all');
  };

  const copyRestaurantInfo = () => {
    const info = `Nhà hàng: ${name}\nĐịa chỉ: ${address}\nRating: ${rating}\nETA: ${eta}\nKhoảng cách: ${distanceInKm}km\nPhí giao hàng: ${estimatedDeliveryFee?.priceDisplay || 'N/A'}`;
    copyToClipboard(info, 'restaurant');
  };

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
      {/* Premium Restaurant Header */}
      <div className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-cyan-500/20 backdrop-blur-sm p-8 border-b border-white/10">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
              <span className="text-xs font-bold text-white">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-black text-white mb-2">
              🍽️ {name}
            </h3>
            <p className="text-white/70 text-lg mb-3">{address}</p>
            <div className="flex flex-wrap gap-3">
              {rating && rating !== 'N/A' && (
                <div className="backdrop-blur-sm bg-yellow-500/20 border border-yellow-400/30 rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-semibold">{rating}</span>
                </div>
              )}
              {eta && eta !== 'N/A' && (
                <div className="backdrop-blur-sm bg-blue-500/20 border border-blue-400/30 rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <span className="text-blue-400">🚚</span>
                  <span className="text-white font-semibold">{eta}</span>
                </div>
              )}
              {distanceInKm && distanceInKm !== 'N/A' && (
                <div className="backdrop-blur-sm bg-green-500/20 border border-green-400/30 rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <span className="text-green-400">📍</span>
                  <span className="text-white font-semibold">{distanceInKm} km</span>
                </div>
              )}
              {estimatedDeliveryFee?.priceDisplay && (
                <div className="backdrop-blur-sm bg-purple-500/20 border border-purple-400/30 rounded-2xl px-4 py-2 flex items-center space-x-2">
                  <span className="text-purple-400">💰</span>
                  <span className="text-white font-semibold">{estimatedDeliveryFee.priceDisplay}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="backdrop-blur-sm bg-white/5 px-8 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <button
                onClick={copyAllProducts}
                className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-xl transform hover:scale-105"
              >
                {copiedId === 'all' ? (
                  <>
                    <div className="w-6 h-6 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Copied All! ✨</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </div>
                    <span>Copy All ({filteredMenuItems.length})</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <button
                onClick={copyRestaurantInfo}
                className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-xl transform hover:scale-105"
              >
                {copiedId === 'restaurant' ? (
                  <>
                    <div className="w-6 h-6 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Copied! ✨</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Copy Restaurant Info</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Duplicate Filter Toggle */}
            <div className="flex items-center space-x-3">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={filterDuplicates}
                    onChange={(e) => setFilterDuplicates(e.target.checked)}
                  />
                  <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
                    filterDuplicates ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
                      filterDuplicates ? 'transform translate-x-6' : ''
                    }`}></div>
                  </div>
                </div>
                <span className="ml-3 text-white font-medium text-sm">Lọc trùng lặp</span>
              </label>
              
              {filterDuplicates && duplicateCount > 0 && (
                <div className="backdrop-blur-sm bg-orange-500/20 border border-orange-400/30 rounded-2xl px-3 py-1">
                  <span className="text-orange-400 text-sm font-semibold">
                    🚫 {duplicateCount} món trùng
                  </span>
                </div>
              )}
            </div>
            
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl px-6 py-3 border border-white/20">
              <span className="text-white/80 font-medium">Total: </span>
              <span className="text-white font-bold text-lg">{filteredMenuItems.length}</span>
              <span className="text-white/60 ml-1">items</span>
              {filterDuplicates && duplicateCount > 0 && (
                <span className="text-white/40 ml-2">({menuItems.length} gốc)</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Table Header */}
      <div className="backdrop-blur-sm bg-gradient-to-r from-slate-500/10 to-gray-500/10 px-8 py-6 border-b border-white/10">
        <div className="grid grid-cols-3 gap-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-black text-white">Product Name</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-black text-white">Category</span>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <span className="text-xl font-black text-white">Price</span>
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredMenuItems.map((product, index) => (
          <div
            key={product.id}
            onClick={() => copyProductInfo(product)}
            className={`group relative grid grid-cols-3 gap-8 px-8 py-6 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-300 ${
              index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.05]'
            } hover:shadow-xl`}
          >
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-emerald-400/0 to-cyan-400/0 group-hover:from-green-400/5 group-hover:via-emerald-400/5 group-hover:to-cyan-400/5 transition-all duration-500 rounded-2xl"></div>
            
            {/* Product Name Column */}
            <div className="relative flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 text-lg truncate">
                  {product.name}
                </h4>
                {product.description && product.description !== 'N/A' && (
                  <p className="text-white/60 text-sm mt-1 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
                    {product.description}
                  </p>
                )}
                {product.modifiers && product.modifiers.length > 0 && (
                  <div className="mt-2">
                    <span className="inline-flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      <span>⚙️</span>
                      <span>{product.modifiers.length} tùy chọn</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Category Column */}
            <div className="relative flex items-center">
              <div className="text-center w-full">
                <span className="text-white/80 font-medium text-sm bg-white/10 px-3 py-1 rounded-lg">
                  {product.category}
                </span>
              </div>
            </div>
            
            {/* Price Column */}
            <div className="relative flex flex-col items-end justify-center space-y-2">
              <div className="text-right">
                <div className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors duration-300">
                  {formatPrice(product.originalPrice)}
                </div>
                <div className={`text-sm ${product.available ? 'text-green-400' : 'text-red-400'}`}>
                  {product.available ? '✅ Có sẵn' : '❌ Hết hàng'}
                </div>
              </div>
              
              {copiedId === product.id && (
                <div className="flex items-center space-x-2 text-green-400 text-sm font-bold animate-pulse">
                  <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Copied!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Premium Footer Instructions */}
      <div className="backdrop-blur-sm bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-cyan-500/10 p-8 border-t border-white/10">
        <div className="flex items-start space-x-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-black text-white mb-4 text-xl">💡 Hướng dẫn sử dụng</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-white/80">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-green-400 font-bold">1</span>
                  </div>
                  <strong className="text-white">Click từng món</strong>
                </div>
                <p className="text-white/60 ml-11">Click vào món ăn để copy tên và giá vào clipboard</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-emerald-400 font-bold">2</span>
                  </div>
                  <strong className="text-white">Lọc trùng lặp</strong>
                </div>
                <p className="text-white/60 ml-11">Bật toggle "Lọc trùng lặp" để loại bỏ món ăn trùng tên</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-cyan-400 font-bold">3</span>
                  </div>
                  <strong className="text-white">Copy tất cả</strong>
                </div>
                <p className="text-white/60 ml-11">Sử dụng "Copy All" để lấy danh sách món ăn đã lọc</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrabFoodProductList; 