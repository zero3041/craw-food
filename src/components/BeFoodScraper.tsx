import { useState } from 'react'
import { makeApiRequest } from '@/utils/apiService'
import { extractBeFoodRestaurantId, createBeFoodApiRequest, getBeFoodGuestToken } from '@/utils/beFoodParser'
import { extractProductData } from '@/utils/curlParser'
import type { BeResponse } from '@/types/be'
import ProductList from '@/components/ProductList'

const BeFoodScraper = () => {
  const [restaurantUrl, setRestaurantUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')
  const [loadingStep, setLoadingStep] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!restaurantUrl.trim()) {
      setError('Please enter restaurant URL!')
      return
    }

    setLoading(true)
    setError('')
    setData(null)
    setLoadingStep('Extracting restaurant ID from URL...')

    try {
      const restaurantId = extractBeFoodRestaurantId(restaurantUrl.trim())
      
      if (!restaurantId) {
        throw new Error('Cannot extract restaurant ID from URL. Please check the URL format.')
      }

      setLoadingStep(`Found restaurant ID: ${restaurantId}. Getting guest token...`)
      
      // Step 1: Get guest access token
      const guestTokenRequest = getBeFoodGuestToken()
      const guestTokenResponse = await makeApiRequest(guestTokenRequest)
      
      const accessToken = guestTokenResponse.data?.access_token;
      
      if (!accessToken) {
        throw new Error('Failed to get guest access token')
      }

      setLoadingStep(`Got access token. Making restaurant API request...`)
      
      // Step 2: Use the token to get restaurant data
      const requestConfig = createBeFoodApiRequest(restaurantId, accessToken)
      const responseData = await makeApiRequest(requestConfig)
      
      setLoadingStep('Extracting product data...')
      
      // Fix the data path for Be Food API - need to access nested data
      const actualData = responseData.data?.data || responseData.data || responseData;
      
      // Try to extract data - but first check if it's Be Food format
      let extractedData;
      try {
        // Pass the correct data structure to extractProductData
        extractedData = extractProductData({ data: actualData })
      } catch (parseError) {
        // If curlParser fails, use raw data
        extractedData = {
          restaurant: actualData.restaurant_info || {},
          products: [],
          totalProducts: 0,
          source: 'Be Food',
          rawData: responseData
        }
      }
      
      setData(extractedData)
      setLoadingStep('')
    } catch (err: any) {
      setError(err.message)
      setLoadingStep('')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await navigator.clipboard.writeText(text)
      const originalText = (event.target as HTMLElement).textContent
      ;(event.target as HTMLElement).textContent = '✅ Copied!'
      setTimeout(() => {
        if (event && event.target) {
          ;(event.target as HTMLElement).textContent = originalText || ''
        }
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white">🐝 Be Food Data Scraper</h2>
              <p className="text-white/70 text-lg">Extract restaurant and menu data from Be Food URLs</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-lg">Restaurant URL:</label>
            <input 
              type="text" 
              value={restaurantUrl} 
              onChange={(e) => setRestaurantUrl(e.target.value)} 
              placeholder="Example: https://food.be.com.vn/resto?id=84166&name=Restaurant+Name"
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" 
            />
            <p className="text-white/60 text-sm mt-2">💡 Enter the full Be Food restaurant URL or just the URL with restaurant ID</p>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Extracting data...</span>
              </div>
            ) : (
              '🚀 Extract Restaurant Data'
            )}
          </button>
        </form>

        {loadingStep && (
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Processing...</h3>
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
                <h3 className="text-red-200 font-semibold">Error</h3>
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !data && !error && (
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-lg">📖 Usage Guide:</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>1. Copy the Be Food restaurant URL from your browser</p>
              <p>2. Paste it into the input field above (only need the URL with ID)</p>
              <p>3. Click "🚀 Extract Restaurant Data" to get detailed information</p>
              <p>4. Data will be displayed including restaurant info, menu, prices</p>
              <p>5. You can copy individual items or export all data</p>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/20">
              <h4 className="text-yellow-200 font-semibold mb-2">📝 URL Format Examples:</h4>
              <div className="space-y-1 text-sm text-yellow-200/80">
                <p>• Full URL: <code className="text-xs bg-black/20 px-2 py-1 rounded">https://food.be.com.vn/resto?id=84166&name=Restaurant+Name</code></p>
                <p>• Short URL: <code className="text-xs bg-black/20 px-2 py-1 rounded">https://food.be.com.vn/resto?id=84166</code></p>
                <p>• Just the ID part: <code className="text-xs bg-black/20 px-2 py-1 rounded">id=84166</code></p>
              </div>
            </div>
          </div>
        )}
      </div>

      {data && <ProductList data={data} />}
    </div>
  )
}

export default BeFoodScraper