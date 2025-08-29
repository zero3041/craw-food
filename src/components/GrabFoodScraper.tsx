import { useState } from 'react'
import { makeApiRequest } from '@/utils/apiService'
import GrabFoodProductList from '@/components/GrabFoodProductList'

type FetchResult = { id: string; data?: any; success: boolean; error?: string }

import type { GrabMerchant, GrabMenu, GrabMenuCategory, GrabMenuItem, GrabRestaurantExtractedInfo, GrabExtractedMenuItem, GrabMerchantResponse } from '@/types/grab'

type MerchantInfo = GrabMerchant

type ExtractedMenuItem = GrabExtractedMenuItem

type RestaurantExtractedInfo = GrabRestaurantExtractedInfo

const GrabFoodScraper = () => {
  const [restaurantIds, setRestaurantIds] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<FetchResult[]>([])
  const [error, setError] = useState('')
  const [loadingStep, setLoadingStep] = useState('')
  const [inputMethod, setInputMethod] = useState<'manual' | 'file' | 'existing'>('manual')

  const fetchRestaurantData = async (id: string): Promise<FetchResult> => {
    const url = `https://portal.grab.com/foodweb/v2/merchants/${id}`
    try {
      const requestConfig = {
        url,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          Accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
          Referer: 'https://food.grab.com/',
          Origin: 'https://food.grab.com',
        } as Record<string, string>,
      }
      const data = await makeApiRequest<GrabMerchantResponse>(requestConfig)
      return { id, data, success: true }
    } catch (error: any) {
      return { id, error: error.message, success: false }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!restaurantIds.trim()) {
      setError('Please enter restaurant ID!')
      return
    }

    setLoading(true)
    setError('')
    setResults([])
    setLoadingStep('Processing ID list...')

    try {
      let ids: string[] = []
      if (inputMethod === 'manual') {
        ids = restaurantIds.split(',').map((id) => id.trim()).filter(Boolean)
      } else if (inputMethod === 'file') {
        ids = restaurantIds.split('\n').map((id) => id.trim()).filter(Boolean)
      }

      if (ids.length === 0) {
        throw new Error('No valid IDs entered!')
      }

      setLoadingStep(`Starting data fetch for ${ids.length} restaurants...`)

      const allResults: FetchResult[] = []
      let successful = 0
      let failed = 0

      for (let i = 0; i < ids.length; i++) {
        const id = ids[i]
        setLoadingStep(`Fetching data: ${id} (${i + 1}/${ids.length})`)
        const result = await fetchRestaurantData(id)
        allResults.push(result)
        if (result.success) successful++
        else failed++
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      setResults(allResults)
      setLoadingStep(`Complete! Success: ${successful}, Failed: ${failed}`)
    } catch (err: any) {
      setError(err.message)
      setLoadingStep('')
    } finally {
      setLoading(false)
    }
  }

  const extractRestaurantInfo = (data: unknown): RestaurantExtractedInfo | { error: string } => {
    try {
      const merchant: MerchantInfo = (data as any)?.merchant || (data as any)?.data?.merchant || {}
      const basicInfo = {
        id: (merchant as any).ID || 'N/A',
        name: merchant.name || merchant.displayName || 'N/A',
        cuisine: merchant.cuisine || 'N/A',
        timezone: merchant.timeZone || 'N/A',
        photoHref: merchant.photoHref || 'N/A',
        eta: (merchant as any).ETA || 'N/A',
        latlng: merchant.latlng || 'N/A',
        rating: (merchant as any).Rating || 'N/A',
        distanceInKm: merchant.distanceInKm || 'N/A',
        address: (merchant as any).address?.displayString || (merchant as any).address || 'N/A',
        estimatedDeliveryFee: merchant.estimatedDeliveryFee || {},
        promotions: merchant.promotions || [],
      }

      const menuItems: ExtractedMenuItem[] = []
      const menuData: GrabMenu | undefined = (merchant as any)?.menu || (data as any)?.menu || (data as any)?.data?.menu
      if (menuData && Array.isArray(menuData.categories)) {
        (menuData.categories as GrabMenuCategory[]).forEach((category) => {
          if (category.items && Array.isArray(category.items)) {
            ;(category.items as GrabMenuItem[]).forEach((item) => {
              menuItems.push({
                id: item.ID || 'N/A',
                name: item.name || 'N/A',
                originalPrice: typeof item.priceInMinorUnit === 'number' ? item.priceInMinorUnit : 0,
                description: item.description || undefined,
                available: item.available || false,
                imgHref: item.imgHref || undefined,
                category: category.name || 'N/A',
                modifiers: item.modifierGroups || [],
              })
            })
          }
        })
      }

      return { ...basicInfo, menuItems, totalMenuItems: menuItems.length }
    } catch (error) {
      return { error: 'Unable to extract information' }
    }
  }

  const downloadResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'grab_food_data.json'
    link.click()
    URL.revokeObjectURL(url)
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

  const formatPrice = (priceInMinorUnit: number) => {
    if (!priceInMinorUnit) return 'N/A'
    return priceInMinorUnit.toString()
  }

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
              <h2 className="text-3xl font-black text-white">🍽️ Grab Food Data Scraper</h2>
              <p className="text-white/70 text-lg">Scrape restaurant and menu data from Grab Food API</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <button onClick={() => setInputMethod('manual')} className={`px-4 py-2 rounded-xl font-semibold transition-all ${inputMethod === 'manual' ? 'bg-green-500 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
              📝 Manual Input
            </button>
            <button onClick={() => setInputMethod('file')} className={`px-4 py-2 rounded-xl font-semibold transition-all ${inputMethod === 'file' ? 'bg-green-500 text-white shadow-lg' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
              📁 From Text File
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3 text-lg">{inputMethod === 'manual' ? 'Restaurant IDs (separated by commas):' : 'File Content:'}</label>
            {inputMethod === 'manual' ? (
              <input type="text" value={restaurantIds} onChange={(e) => setRestaurantIds(e.target.value)} placeholder="Example: SGDD04938, 4-C7CAVJV3HB2KWA" className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            ) : (
              <textarea value={restaurantIds} onChange={(e) => setRestaurantIds(e.target.value)} placeholder="Enter each ID on a separate line..." rows={4} className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" />
            )}
            <p className="text-white/60 text-sm mt-2">💡 {inputMethod === 'manual' ? 'Enter restaurant IDs separated by commas' : 'Enter each ID on a separate line'}</p>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Scraping data...</span>
              </div>
            ) : (
              '🚀 Start Scraping Data'
            )}
          </button>
        </form>

        {loadingStep && (
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
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

        {!loading && results.length === 0 && !error && (
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-lg">📖 Usage Guide:</h3>
            <div className="space-y-2 text-white/70 text-sm">
              <p>1. Choose input method (manual or from file)</p>
              <p>2. Enter Grab Food restaurant IDs (can be found from URL or API)</p>
              <p>3. Click "🚀 Start Scraping Data" to get detailed information</p>
              <p>4. Data will be displayed and can be downloaded as JSON</p>
              <p>5. Information includes: restaurant details, menu, prices, descriptions</p>
            </div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">📊 Results ({results.length} restaurants)</h3>
            <button onClick={downloadResults} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition-all">💾 Download JSON</button>
          </div>

          <div className="grid gap-6">
            {results.map((result, index) => (
              <div key={index} className={`backdrop-blur-sm rounded-2xl p-6 border ${result.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${result.success ? 'bg-green-500' : 'bg-red-500'}`}>
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
                    <h4 className="text-white font-semibold text-lg">ID: {result.id}</h4>
                  </div>
                  <button onClick={(e) => copyToClipboard(result.id, e)} className="text-white/70 hover:text-white transition-colors" title="Copy ID">📋</button>
                </div>

                {result.success ? (
                  <div className="space-y-4">
                    {(() => {
                      const info = extractRestaurantInfo(result.data)
                      if ((info as any).error) {
                        return <p className="text-red-200">{(info as any).error}</p>
                      }
                      const i = info as any
                      return (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between"><span className="text-white/70">Name:</span><span className="text-white font-medium">{i.name}</span></div>
                            <div className="flex justify-between"><span className="text-white/70">Cuisine:</span><span className="text-white font-medium">{i.cuisine}</span></div>
                            <div className="flex justify-between"><span className="text-white/70">Address:</span><span className="text-white font-medium">{i.address}</span></div>
                            <div className="flex justify-between"><span className="text-white/70">Rating:</span><span className="text-white font-medium">{i.rating}</span></div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between"><span className="text-white/70">ETA:</span><span className="text-white font-medium">{i.eta}</span></div>
                            <div className="flex justify-between"><span className="text-white/70">Distance:</span><span className="text-white font-medium">{i.distanceInKm} km</span></div>
                            <div className="flex justify-between"><span className="text-white/70">Delivery fee:</span><span className="text-white font-medium">{i.estimatedDeliveryFee?.priceDisplay || 'N/A'}</span></div>
                            <div className="flex justify-between"><span className="text-white/70">Total items:</span><span className="text-white font-medium">{i.totalMenuItems} items</span></div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                ) : (
                  <p className="text-red-200">Error: {result.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {results.map((result, index) => {
        if (!result.success) return null
        const info = extractRestaurantInfo(result.data) as any
        if ((info as any).error || !info.menuItems || info.menuItems.length === 0) return null
        return <GrabFoodProductList key={`products-${index}`} data={info} />
      })}
    </div>
  )
}

export default GrabFoodScraper 