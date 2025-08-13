export type GrabMenuItem = {
  ID: string
  name: string
  priceInMinorUnit: number
  description?: string
  available?: boolean
  imgHref?: string
  modifierGroups?: unknown[]
}

export type GrabMenuCategory = {
  name: string
  items: GrabMenuItem[]
}

export type GrabMenu = {
  categories: GrabMenuCategory[]
}

export type GrabAddress = {
  displayString?: string
}

export type GrabMerchant = {
  ID: string
  name?: string
  displayName?: string
  cuisine?: string
  timeZone?: string
  photoHref?: string
  ETA?: string
  latlng?: { lat: number; lng: number } | string
  Rating?: number | string
  distanceInKm?: number | string
  address?: GrabAddress | string
  estimatedDeliveryFee?: { priceDisplay?: string }
  promotions?: unknown[]
  menu?: GrabMenu
}

export type GrabMerchantResponse = {
  merchant: GrabMerchant
}

// View-layer extracted types
export type GrabExtractedMenuItem = {
  id: string | number
  name: string
  originalPrice: number
  description?: string
  available?: boolean
  imgHref?: string
  category?: string
  modifiers?: unknown[]
}

export type GrabRestaurantExtractedInfo = {
  id: string | number
  name: string
  cuisine: string
  timezone: string
  photoHref: string
  eta: string
  latlng: unknown
  rating: string | number
  distanceInKm: number | string
  address: string
  estimatedDeliveryFee: { priceDisplay?: string }
  promotions: unknown[]
  menuItems: GrabExtractedMenuItem[]
  totalMenuItems: number
} 