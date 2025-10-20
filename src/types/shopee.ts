export interface ShopeeDiscountPrice {
  text: string
  unit: string
  value: number
}

export interface ShopeeProduct {
  id: number | string
  name: string
  discount_price: ShopeeDiscountPrice
  original_price?: ShopeeDiscountPrice
  description?: string
  image_url?: string
  is_available?: boolean
}

export interface ShopeeRestaurant {
  id: number | string
  name?: string
  address?: string
  rating?: number
  total_reviews?: number
  delivery_time?: string
  delivery_fee?: ShopeeDiscountPrice
}

export interface ShopeeResponse {
  reply?: {
    delivery_detail?: {
      delivery_id?: number | string
      name?: string
      address?: string
      rating?: number
      total_review?: number
      photos?: Array<{ value: string }>
      menu_infos?: {
        menu_items?: ShopeeProduct[]
      }
    }
  }
  result?: string
}

export interface ShopeeApiRequest {
  url: string
  method: 'GET' | 'POST'
  headers: Record<string, string>
  body?: any
}