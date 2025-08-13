export type ParsedRequest = {
  url: string
  method: 'GET' | 'POST'
  headers: Record<string, string>
  data: any
}

export const parseCurlCommand = (curlCommand: string): ParsedRequest => {
  try {
    const urlMatch = curlCommand.match(/curl\s+'([^']+)'/)
    if (!urlMatch) {
      throw new Error('Không tìm thấy URL trong curl command')
    }
    const url = urlMatch[1]

    const headers: Record<string, string> = {}
    const headerMatches = curlCommand.matchAll(/-H\s+'([^:]+):\s*([^']+)'/g)
    for (const match of headerMatches) {
      headers[match[1]] = match[2]
    }

    let data: any = null
    const dataMatch = curlCommand.match(/--data-raw\s+'(.+)'/s)
    if (dataMatch) {
      try {
        data = JSON.parse(dataMatch[1])
      } catch (e) {
        data = dataMatch[1]
      }
    }

    const method: 'GET' | 'POST' = curlCommand.includes('--data-raw') ? 'POST' : 'GET'

    return { url, method, headers, data }
  } catch (error: any) {
    throw new Error(`Lỗi parse curl command: ${error.message}`)
  }
}

import type { BeResponse, BeCategory, BeCategoryItem } from '@/types/be'

import type { ViewProductList, ViewProduct } from '@/types/view'

export const extractProductData = (responseData: BeResponse): ViewProductList => {
  try {
    if (!responseData || !responseData.data) {
      throw new Error('Dữ liệu response không hợp lệ')
    }

    const { data } = responseData as BeResponse
    const products: ViewProduct[] = []

    const restaurantInfo = data.restaurant_info || {}
    const currency = data.currency || '₫'

    if (data.categories && Array.isArray(data.categories)) {
      data.categories.forEach((category: BeCategory) => {
        if (category.items && Array.isArray(category.items)) {
          category.items.forEach((item: BeCategoryItem) => {
            products.push({
              id: item.restaurant_item_id || Math.random(),
              name: item.item_name || 'Không có tên',
              displayPrice: item.display_price || '0',
              oldPrice: item.old_price || item.price,
              displayOldPrice: item.display_old_price || item.display_price,
              description: item.item_details || '',
              image: item.item_image_compressed_web || item.item_image || '',
              category: category.category_name || 'Khác',
              currency: currency,
              isActive: item.is_active !== 0,
              offerText: item.offer_text || '',
              hasDiscount: !!item.offers_discount,
            })
          })
        }
      })
    }

    return {
      products,
      restaurantInfo: {
        name: restaurantInfo.name || 'Không có tên',
        address: (restaurantInfo as any).display_address || (restaurantInfo as any).address || '',
        rating: (restaurantInfo as any).rating || 0,
        reviewCount: (restaurantInfo as any).review_count || 0,
        deliveryTime: (restaurantInfo as any).min_delivery_time || 0,
        minimumOrder: (restaurantInfo as any).display_minimum_order_amount || '0',
      },
      currency,
    }
  } catch (error: any) {
    throw new Error(`Lỗi extract dữ liệu sản phẩm: ${error.message}`)
  }
} 