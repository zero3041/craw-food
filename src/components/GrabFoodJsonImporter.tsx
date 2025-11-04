import { useState } from 'react'
import type { GrabMerchantResponse, GrabRestaurantExtractedInfo, GrabExtractedMenuItem } from '@/types/grab'
import GrabFoodProductList from './GrabFoodProductList'

const GrabFoodJsonImporter = () => {
  const [jsonInput, setJsonInput] = useState('')
  const [parsedData, setParsedData] = useState<GrabRestaurantExtractedInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parseGrabJson = (jsonData: GrabMerchantResponse): GrabRestaurantExtractedInfo => {
    const { merchant } = jsonData

    const menuItems: GrabExtractedMenuItem[] = []
    
    if (merchant.menu?.categories) {
      merchant.menu.categories.forEach((category) => {
        if (category.items) {
          category.items.forEach((item) => {
            menuItems.push({
              id: item.ID,
              name: item.name,
              originalPrice: item.priceInMinorUnit,
              description: item.description,
              available: item.available,
              imgHref: item.imgHref,
              category: category.name,
              modifiers: item.modifierGroups
            })
          })
        }
      })
    }

    return {
      id: merchant.ID,
      name: merchant.name || merchant.displayName || 'Unknown',
      cuisine: merchant.cuisine || 'N/A',
      timezone: merchant.timeZone || 'N/A',
      photoHref: merchant.photoHref || '',
      eta: merchant.ETA?.toString() || 'N/A',
      latlng: merchant.latlng || 'N/A',
      rating: merchant.Rating || 'N/A',
      distanceInKm: merchant.distanceInKm || 'N/A',
      address: typeof merchant.address === 'string' ? merchant.address : merchant.address?.displayString || 'N/A',
      estimatedDeliveryFee: merchant.estimatedDeliveryFee || {},
      promotions: merchant.promotions || [],
      menuItems,
      totalMenuItems: menuItems.length
    }
  }

  const handleParse = () => {
    setError(null)
    setParsedData(null)

    try {
      const trimmed = jsonInput.trim()
      if (!trimmed) {
        setError('Vui lòng nhập JSON')
        return
      }

      const parsed = JSON.parse(trimmed) as GrabMerchantResponse

      if (!parsed.merchant) {
        setError('JSON không đúng định dạng. Cần có trường "merchant"')
        return
      }

      const extractedData = parseGrabJson(parsed)
      setParsedData(extractedData)
    } catch (err) {
      setError(`Lỗi parse JSON: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const handleClear = () => {
    setJsonInput('')
    setParsedData(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">📋 Import JSON từ Grab Food</h2>
          <p className="text-white/70">Paste JSON data của merchant từ Grab Food API để hiển thị danh sách món ăn</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">JSON Input:</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-64 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400 font-mono text-sm"
              placeholder='{"merchant": {"ID": "...", "name": "...", ...}}'
            />
          </div>

          {error && (
            <div className="backdrop-blur-sm bg-red-500/20 border border-red-400/50 rounded-2xl px-4 py-3">
              <div className="flex items-center space-x-2">
                <span className="text-red-400 text-xl">⚠️</span>
                <p className="text-red-200 font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleParse}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              🔍 Parse & Hiển thị
            </button>
            <button
              onClick={handleClear}
              className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-200"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {parsedData && (
        <div>
          <GrabFoodProductList data={parsedData} />
        </div>
      )}
    </div>
  )
}

export default GrabFoodJsonImporter
