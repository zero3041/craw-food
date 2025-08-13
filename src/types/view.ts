export type ViewProduct = {
  id: string | number
  name: string
  displayPrice: string
  description?: string
  image?: string
  category?: string
  currency?: string
  isActive?: boolean
  offerText?: string
  hasDiscount?: boolean
  oldPrice?: number
  displayOldPrice?: string
}

export type ViewRestaurantInfo = {
  name: string
  address: string
  rating: number
  reviewCount: number
  deliveryTime: number
  minimumOrder: string
}

export type ViewProductList = {
  products: ViewProduct[]
  restaurantInfo: ViewRestaurantInfo
  currency: string
} 