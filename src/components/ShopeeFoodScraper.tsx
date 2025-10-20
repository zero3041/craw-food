import { useState } from 'react'
import { makeApiRequest } from '@/utils/apiService'
import { extractShopeeFoodRestaurantId, getShopeeFoodAccessToken, createShopeeFoodApiRequest, createShopeeFoodMenuApiRequest, parseShopeeFoodResponse } from '@/utils/shopeeFoodParser'
import ProductList from '@/components/ProductList'

const ShopeeFoodScraper = () => {
  const [restaurantUrl, setRestaurantUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [loadingStep, setLoadingStep] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!restaurantUrl.trim()) {
      setError('Vui lòng nhập URL nhà hàng!')
      return
    }

    setLoading(true)
    setError('')
    setData(null)
    setLoadingStep('Đang trích xuất ID nhà hàng từ URL...')

    try {
      const restaurantId = extractShopeeFoodRestaurantId(restaurantUrl.trim())
      
      if (!restaurantId) {
        throw new Error(`Không thể trích xuất ID nhà hàng từ URL: "${restaurantUrl}". Vui lòng kiểm tra định dạng URL phải có dạng: https://shopeefood.vn/now-food/shop/[ID_RESTAURANT]`)
      }

      setLoadingStep(`Tìm thấy ID nhà hàng: ${restaurantId}. Đang thử kết nối API...`)
      
      // Try simplified approach without complex authentication
      // Since Shopee Food API requires complex auth flow, we'll demonstrate with mock data
      setLoadingStep('Shopee Food API yêu cầu authentication phức tạp. Tạo dữ liệu mẫu...')
      
      // Create demo data based on the restaurant ID
      const demoData = {
        restaurant: {
          id: restaurantId,
          name: `Nhà hàng Shopee Food #${restaurantId}`,
          address: `Địa chỉ cho nhà hàng ID ${restaurantId}`,
          rating: 4.5,
          total_reviews: 1234
        },
        products: [
          {
            id: '1',
            name: 'Cuốn to sốt lẫn',
            discount_price: {
              text: '44.100đ',
              unit: 'đ',
              value: 44100.0
            },
            original_price: {
              text: '50.000đ',
              unit: 'đ',
              value: 50000.0
            },
            description: 'Cuốn to sốt lẫn đặc biệt, thơm ngon',
            image_url: 'https://via.placeholder.com/300x200',
            is_available: true
          },
          {
            id: '2', 
            name: 'Phở bò tái',
            discount_price: {
              text: '65.000đ',
              unit: 'đ',
              value: 65000.0
            },
            original_price: {
              text: '70.000đ',
              unit: 'đ',
              value: 70000.0
            },
            description: 'Phở bò tái truyền thống',
            image_url: 'https://via.placeholder.com/300x200',
            is_available: true
          },
          {
            id: '3',
            name: 'Bánh mì pate',
            discount_price: {
              text: '25.000đ',
              unit: 'đ',
              value: 25000.0
            },
            description: 'Bánh mì pate thơm ngon',
            image_url: 'https://via.placeholder.com/300x200', 
            is_available: true
          }
        ],
        totalProducts: 3,
        source: 'Shopee Food (Demo)',
        note: 'Đây là dữ liệu mẫu vì Shopee Food API yêu cầu authentication phức tạp với signature và session token. Để có dữ liệu thật, cần implement đầy đủ flow authentication của Shopee.'
      }
      
      setData(demoData)
      setLoadingStep('')
      
    } catch (err: any) {
      setError(`Lỗi khi trích xuất dữ liệu: ${err.message}`)
      setLoadingStep('')
      console.error('Shopee Food scraping error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white">🛵 Shopee Food Data Scraper</h2>
              <p className="text-white/70 text-lg">Trích xuất dữ liệu nhà hàng và thực đơn từ Shopee Food URLs</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-lg">URL Nhà hàng:</label>
            <input 
              type="text" 
              value={restaurantUrl} 
              onChange={(e) => setRestaurantUrl(e.target.value)} 
              placeholder="Ví dụ: https://shopeefood.vn/now-food/shop/1239327"
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
            />
            <p className="text-white/60 text-sm mt-2">💡 Nhập URL Shopee Food đầy đủ hoặc chỉ ID nhà hàng</p>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang trích xuất dữ liệu...</span>
              </div>
            ) : (
              '🚀 Trích xuất dữ liệu nhà hàng'
            )}
          </button>
        </form>

        {loadingStep && (
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
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

        {error && (
          <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l-2.293-2.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-200 font-semibold">Lỗi</h3>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-lg">📖 Hướng dẫn sử dụng:</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>1. Sao chép URL nhà hàng Shopee Food từ trình duyệt</p>
              <p>2. Dán vào ô nhập liệu bên trên</p>
              <p>3. Nhấp "🚀 Trích xuất dữ liệu nhà hàng" để xem dữ liệu mẫu</p>
              <p>4. Dữ liệu hiển thị bao gồm thông tin nhà hàng và thực đơn mẫu</p>
              <p>5. Bạn có thể sao chép từng mục hoặc xuất tất cả dữ liệu</p>
            </div>
            
            <div className="mt-4 p-4 bg-orange-500/10 rounded-xl border border-orange-400/20">
              <h4 className="text-orange-200 font-semibold mb-2">📝 Ví dụ định dạng URL:</h4>
              <div className="space-y-1 text-sm text-orange-200/80">
                <p>• URL đầy đủ: <code className="text-xs bg-black/20 px-2 py-1 rounded">https://shopeefood.vn/now-food/shop/1239327</code></p>
                <p>• URL ngắn gọn: <code className="text-xs bg-black/20 px-2 py-1 rounded">shopeefood.vn/shop/1239327</code></p>
                <p>• Chỉ ID: <code className="text-xs bg-black/20 px-2 py-1 rounded">1239327</code></p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-600/10 rounded-xl border border-yellow-500/20">
              <h4 className="text-yellow-200 font-semibold mb-2">⚠️ Lưu ý quan trọng:</h4>
              <div className="space-y-1 text-sm text-yellow-200/80">
                <p>• Hiện tại hiển thị <strong>dữ liệu mẫu</strong> vì Shopee Food API yêu cầu authentication phức tạp</p>
                <p>• API thật cần signature động và session token</p>
                <p>• Tool này demo cách parse dữ liệu từ cấu trúc API của Shopee Food</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {data && <ProductList data={data} />}
    </div>
  )
}

export default ShopeeFoodScraper