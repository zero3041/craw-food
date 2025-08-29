/**
 * Extract restaurant ID from Be Food URL
 * Supports various URL formats:
 * - https://food.be.com.vn/resto?id=84166&name=Restaurant+Name
 * - https://food.be.com.vn/resto?id=84166
 * - id=84166
 */
export const extractBeFoodRestaurantId = (url: string): string | null => {
  try {
    // Try to parse as full URL first
    const urlObj = new URL(url)
    const id = urlObj.searchParams.get('id')
    if (id) return id
  } catch {
    // If URL parsing fails, try regex patterns
  }
  
  // Try to match ID pattern in the string
  const patterns = [
    /id=(\d+)/,           // id=84166
    /\/resto\/(\d+)/,     // /resto/84166
    /restaurant[/-](\d+)/, // restaurant/84166 or restaurant-84166
    /^(\d+)$/             // Just numbers: 84166
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

/**
 * Get guest access token from Be Food API
 */
export const getBeFoodGuestToken = () => {
  return {
    url: 'https://gw.be.com.vn/api/v1/be-delivery-gateway/api/v1/user/guest',
    method: 'POST',
    headers: {
      'accept': '*/*',
      'accept-language': 'vi',
      'content-type': 'application/json',
      // Remove unsafe headers that browsers don't allow
      // 'origin': 'https://food.be.com.vn',
      // 'referer': 'https://food.be.com.vn/',
      // 'user-agent': 'Mozilla/5.0...',
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site'
    } as Record<string, string>,
    data: JSON.stringify({})
  }
}

/**
 * Create Be Food API request configuration
 */
export const createBeFoodApiRequest = (restaurantId: string, accessToken: string) => {
  const apiUrl = 'https://gw.be.com.vn/api/v1/be-marketplace/web/restaurant/detail'
  
  const requestBody = {
    restaurant_id: restaurantId,
    locale: "vi",
    app_version: "11296",
    version: "1.1.296",
    device_type: 3,
    operator_token: "0b28e008bc323838f5ec84f718ef11e6",
    customer_package_name: "xyz.be.food",
    device_token: "a0e09f4206cef88dab92b93072e25747",
    ad_id: "",
    screen_width: 360,
    screen_height: 640,
    client_info: {
      locale: "vi",
      app_version: "11296",
      version: "1.1.296",
      device_type: 3,
      operator_token: "0b28e008bc323838f5ec84f718ef11e6",
      customer_package_name: "xyz.be.food",
      device_token: "a0e09f4206cef88dab92b93072e25747",
      ad_id: "",
      screen_width: 360,
      screen_height: 640
    },
    latitude: 20.997957,
    longitude: 105.794586
  }

  return {
    url: apiUrl,
    method: 'POST',
    headers: {
      'accept': '*/*',
      'accept-language': 'vi',
      'appversion': '11296',
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json',
      // Remove unsafe headers that browsers don't allow
      // 'origin': 'https://food.be.com.vn',
      // 'referer': 'https://food.be.com.vn/',
      // 'user-agent': 'Mozilla/5.0...',
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site'
    } as Record<string, string>,
    data: JSON.stringify(requestBody)
  }
}