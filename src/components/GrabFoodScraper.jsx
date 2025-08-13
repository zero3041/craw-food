import { useState } from 'react';
import { makeApiRequest } from '../utils/apiService';
import GrabFoodProductList from './GrabFoodProductList';

const GrabFoodScraper = () => {
  const [restaurantIds, setRestaurantIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loadingStep, setLoadingStep] = useState('');
  const [inputMethod, setInputMethod] = useState('manual'); // manual, file, existing

  const fetchRestaurantData = async (id) => {
    const url = `https://portal.grab.com/foodweb/v2/merchants/${id}`;
    
    try {
      // Use proxy system to bypass CORS
      const requestConfig = {
        url,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://food.grab.com/',
          'Origin': 'https://food.grab.com'
        }
      };

      const data = await makeApiRequest(requestConfig);
      
      // Debug logging to understand the response structure
      console.log('🔍 Debug - Raw API response:', data);
      console.log('🔍 Debug - Response keys:', Object.keys(data || {}));
      console.log('🔍 Debug - Merchant data:', data?.merchant);
      console.log('🔍 Debug - Menu data:', data?.merchant?.menu);
      
      return { id, data, success: true };
    } catch (error) {
      return { id, error: error.message, success: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!restaurantIds.trim()) {
      setError('Vui lòng nhập ID nhà hàng!');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);
    setLoadingStep('Đang xử lý danh sách ID...');

    try {
      // Parse restaurant IDs
      let ids = [];
      if (inputMethod === 'manual') {
        ids = restaurantIds.split(',').map(id => id.trim()).filter(id => id);
      } else if (inputMethod === 'file') {
        // Handle file input if needed
        ids = restaurantIds.split('\n').map(id => id.trim()).filter(id => id);
      }

      if (ids.length === 0) {
        throw new Error('Không có ID hợp lệ nào được nhập!');
      }

      setLoadingStep(`Bắt đầu lấy dữ liệu cho ${ids.length} nhà hàng...`);
      
      const results = [];
      let successful = 0;
      let failed = 0;

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        setLoadingStep(`Đang lấy dữ liệu: ${id} (${i + 1}/${ids.length})`);
        
        const result = await fetchRestaurantData(id);
        results.push(result);
        
        if (result.success) {
          successful++;
        } else {
          failed++;
        }

        // Add small delay to avoid overwhelming the API
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setResults(results);
      setLoadingStep(`Hoàn thành! Thành công: ${successful}, Thất bại: ${failed}`);
      
    } catch (err) {
      setError(err.message);
      setLoadingStep('');
    } finally {
      setLoading(false);
    }
  };

  const extractRestaurantInfo = (data) => {
    try {
      const merchant = data?.merchant || data?.data?.merchant || {};
      
      // Extract basic restaurant info
      const basicInfo = {
        id: merchant.ID || 'N/A',
        name: merchant.name || merchant.displayName || 'N/A',
        cuisine: merchant.cuisine || 'N/A',
        timezone: merchant.timeZone || 'N/A',
        photoHref: merchant.photoHref || 'N/A',
        eta: merchant.ETA || 'N/A',
        latlng: merchant.latlng || 'N/A',
        rating: merchant.Rating || 'N/A',
        distanceInKm: merchant.distanceInKm || 'N/A',
        address: merchant.address?.displayString || merchant.address || 'N/A',
        estimatedDeliveryFee: merchant.estimatedDeliveryFee || {},
        promotions: merchant.promotions || []
      };

      // Extract menu items (products) - Fix the path to match actual JSON structure
      const menuItems = [];
      
      // Try multiple possible paths for menu data
      const menuData = merchant?.menu || data?.menu || data?.data?.menu;
      
      if (menuData?.categories) {
        menuData.categories.forEach(category => {
          if (category.items && Array.isArray(category.items)) {
            category.items.forEach(item => {
              menuItems.push({
                id: item.ID || 'N/A',
                name: item.name || 'N/A',
                price: item.priceInMinorUnit ? item.priceInMinorUnit.toString() : 'N/A',
                originalPrice: item.priceInMinorUnit || 0,
                description: item.description || 'N/A',
                available: item.available || false,
                imgHref: item.imgHref || 'N/A',
                category: category.name || 'N/A',
                modifiers: item.modifierGroups || []
              });
            });
          }
        });
      }

      // Debug logging
      console.log('🔍 Debug - Merchant data:', merchant);
      console.log('🔍 Debug - Menu data found:', menuData);
      console.log('🔍 Debug - Menu categories:', menuData?.categories);
      console.log('🔍 Debug - Extracted menu items:', menuItems);

      return {
        ...basicInfo,
        menuItems,
        totalMenuItems: menuItems.length
      };
    } catch (error) {
      console.error('❌ Error extracting restaurant info:', error);
      return { error: 'Không thể trích xuất thông tin' };
    }
  };

  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grab_food_data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (text, event) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show temporary success message
      const originalText = event.target.textContent;
      event.target.textContent = '✅ Copied!';
      setTimeout(() => {
        event.target.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatPrice = (priceInMinorUnit) => {
    if (!priceInMinorUnit) return 'N/A';
    return priceInMinorUnit.toString();
  };

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white">
                🍽️ Grab Food Data Scraper
              </h2>
              <p className="text-white/70 text-lg">
                Cào dữ liệu nhà hàng và menu từ Grab Food API
              </p>
            </div>
          </div>
        </div>

        {/* Input Method Selection */}
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setInputMethod('manual')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                inputMethod === 'manual'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              📝 Nhập thủ công
            </button>
            <button
              onClick={() => setInputMethod('file')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                inputMethod === 'file'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              📁 Từ file text
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-lg">
              {inputMethod === 'manual' ? 'ID nhà hàng (phân cách bằng dấu phẩy):' : 'Nội dung file:'}
            </label>
            {inputMethod === 'manual' ? (
              <input
                type="text"
                value={restaurantIds}
                onChange={(e) => setRestaurantIds(e.target.value)}
                placeholder="Ví dụ: SGDD04938, 4-C7CAVJV3HB2KWA"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <textarea
                value={restaurantIds}
                onChange={(e) => setRestaurantIds(e.target.value)}
                placeholder="Nhập từng ID trên một dòng..."
                rows={4}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            )}
            <p className="text-white/60 text-sm mt-2">
              💡 {inputMethod === 'manual' 
                ? 'Nhập ID nhà hàng, phân cách bằng dấu phẩy' 
                : 'Nhập từng ID trên một dòng riêng biệt'
              }
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang cào dữ liệu...</span>
              </div>
            ) : (
              '🚀 Bắt đầu cào dữ liệu'
            )}
          </button>
        </form>

        {/* Loading Step */}
        {loadingStep && (
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Đang xử lý...</h3>
                <p className="text-white/70">{loadingStep}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-200 font-semibold">Lỗi</h3>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!loading && results.length === 0 && !error && (
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-lg">📖 Hướng dẫn sử dụng:</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>1. Chọn cách nhập ID nhà hàng (thủ công hoặc từ file)</p>
              <p>2. Nhập ID nhà hàng Grab Food (có thể tìm từ URL hoặc API)</p>
              <p>3. Nhấn "🚀 Bắt đầu cào dữ liệu" để lấy thông tin chi tiết</p>
              <p>4. Dữ liệu sẽ được hiển thị và có thể tải xuống dưới dạng JSON</p>
              <p>5. Thông tin bao gồm: thông tin nhà hàng, menu, giá cả, mô tả</p>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      {results.length > 0 && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">
              📊 Kết quả ({results.length} nhà hàng)
            </h3>
            <button
              onClick={downloadResults}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
            >
              💾 Tải xuống JSON
            </button>
          </div>

          <div className="grid gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className={`backdrop-blur-sm rounded-2xl p-6 border ${
                  result.success
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      result.success ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {result.success ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-white font-semibold text-lg">
                      ID: {result.id}
                    </h4>
                  </div>
                  <button
                    onClick={(e) => copyToClipboard(result.id, e)}
                    className="text-white/70 hover:text-white transition-colors"
                    title="Copy ID"
                  >
                    📋
                  </button>
                </div>

                {result.success ? (
                  <div className="space-y-4">
                    {(() => {
                      const info = extractRestaurantInfo(result.data);
                      if (info.error) {
                        return <p className="text-red-200">{info.error}</p>;
                      }
                      
                      return (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-white/70">Tên:</span>
                              <span className="text-white font-medium">{info.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Ẩm thực:</span>
                              <span className="text-white font-medium">{info.cuisine}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Địa chỉ:</span>
                              <span className="text-white font-medium">{info.address}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Rating:</span>
                              <span className="text-white font-medium">{info.rating}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-white/70">ETA:</span>
                              <span className="text-white font-medium">{info.eta}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Khoảng cách:</span>
                              <span className="text-white font-medium">{info.distanceInKm} km</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Phí giao hàng:</span>
                              <span className="text-white font-medium">
                                {info.estimatedDeliveryFee.priceDisplay || 'N/A'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Tổng món:</span>
                              <span className="text-white font-medium">
                                {info.totalMenuItems} món
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <p className="text-red-200">Lỗi: {result.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product List for each successful restaurant */}
      {results.map((result, index) => {
        if (!result.success) return null;
        
        const info = extractRestaurantInfo(result.data);
        if (info.error || !info.menuItems || info.menuItems.length === 0) return null;
        
        return (
          <GrabFoodProductList key={`products-${index}`} data={info} />
        );
      })}
    </div>
  );
};

export default GrabFoodScraper; 