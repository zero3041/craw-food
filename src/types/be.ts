export type BeCategoryItem = {
  restaurant_item_id: string | number
  item_name: string
  price: number
  display_price: string
  old_price?: number
  display_old_price?: string
  item_details?: string
  item_image_compressed_web?: string
  item_image?: string
  is_active?: number
  offer_text?: string
  offers_discount?: boolean
}

export type BeCategory = {
  category_name: string
  items: BeCategoryItem[]
}

export type BeRestaurantInfo = {
  name?: string
  display_address?: string
  address?: string
  rating?: number
  review_count?: number
  min_delivery_time?: number
  display_minimum_order_amount?: string
}

export type BeData = {
  restaurant_info?: BeRestaurantInfo
  currency?: string
  categories?: BeCategory[]
}

export type BeResponse = {
  data: BeData
} 