import type { ShopeeApiRequest, ShopeeResponse, ShopeeProduct, ShopeeRestaurant } from '@/types/shopee'

export const extractShopeeFoodRestaurantId = (url: string): string | null => {
  try {
    console.log('🔍 Trying to extract ID from URL:', url)
    
    // Clean the URL first
    const cleanUrl = url.trim()
    
    // Extract restaurant ID from Shopee Food URL
    // Example: https://shopeefood.vn/now-food/shop/1239327
    const match = cleanUrl.match(/shop\/(\d+)/i)
    if (match && match[1]) {
      console.log('✅ Found restaurant ID via shop pattern:', match[1])
      return match[1]
    }
    
    // Also try to extract from request_id parameter
    const idMatch = cleanUrl.match(/request_id=(\d+)/i)
    if (idMatch && idMatch[1]) {
      console.log('✅ Found restaurant ID via request_id pattern:', idMatch[1])
      return idMatch[1]
    }
    
    // Try alternative patterns for Shopee Food URLs
    const altMatch = cleanUrl.match(/\/(\d+)(?:[?&#]|$)/i)
    if (altMatch && altMatch[1]) {
      console.log('✅ Found restaurant ID via alternative pattern:', altMatch[1])
      return altMatch[1]
    }
    
    // If just a number is provided
    if (/^\d+$/.test(cleanUrl)) {
      console.log('✅ Found restaurant ID as pure number:', cleanUrl)
      return cleanUrl
    }
    
    console.error('❌ Could not extract restaurant ID from URL:', cleanUrl)
    return null
  } catch (error) {
    console.error('Error extracting Shopee Food restaurant ID:', error)
    return null
  }
}

/**
 * Step 1: Get access token from Shopee tracking system
 * Following the actual Shopee Food flow from query 2
 */
export const getShopeeFoodAccessToken = (): ShopeeApiRequest => {
  return {
    url: 'https://dem.shopee.com/dem/janus/v1/app-auth/login',
    method: 'POST',
    headers: {
      'accept': '*/*',
      'accept-language': 'vi',
      'content-type': 'application/json',
      'origin': 'https://shopeefood.vn',
      'priority': 'u=1, i',
      'referer': 'https://shopeefood.vn/',
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    },
    body: {
      "app_name": "buyer-web",
      "sign": "cdb6086106c02be425685d323f55d65151735eb8bb822a2ae4a569a2d8f5e99f",
      "timestamp": Date.now()
    }
  }
}

export const createShopeeFoodApiRequest = (restaurantId: string): ShopeeApiRequest => {
  return {
    url: `https://gappapi.deliverynow.vn/api/delivery/get_detail?id_type=1&request_id=${restaurantId}`,
    method: 'GET',
    headers: {
      '22e21d5d': 'Xj#4C*4+@opQg-I"1kkmf4Lf$',
      '2787ad5b': '=[<Rb-J<"S]%L]=&\\2H$rIM1a*YFWVU\'Se`ICmb&00Z%-YjlHgAX0^F18erJe8$t(e,)T&,93]\\_\\P"O-fP5bdnX$_@r(-d%CHX;5p+Ga2)VkS=b<[k!K8WI0,n0EY>,#)/gA\'f!;:nkR)D(F=R@`n\\2-g:!A/=C9eQ;IFOZE*m[u-Zg2M"Hg[K-\\L#flHGb@CpDTpa]_]s8NZg06;',
      '7e0fd885': 'Ft\'(Q4!K=LfMpsI.nn?5Q!;,8',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'vi',
      'origin': 'https://shopeefood.vn',
      'priority': 'u=1, i',
      'referer': 'https://shopeefood.vn/',
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
      'x-foody-access-token': '',
      'x-foody-api-version': '1',
      'x-foody-app-type': '1004',
      'x-foody-client-id': '',
      'x-foody-client-language': 'vi',
      'x-foody-client-type': '1',
      'x-foody-client-version': '3.0.0',
      'x-sap-ri': 'b96db168d7e650880e061f3f3bb43e4a5cfb31c6cd61ebd1'
    }
  }
}

export const createShopeeFoodMenuApiRequest = (deliveryId: string): ShopeeApiRequest => {
  return {
    url: `https://gappapi.deliverynow.vn/api/dish/get_delivery_dishes?id_type=2&request_id=${deliveryId}`,
    method: 'GET',
    headers: {
      '61000470': 'clFbINXqP$WX8_ErBqZFY9%0]',
      '272e0a80': '4r>CHfPhl>7W9CVJaNs@U[DYpHme9Fi-7c)?gN:TUV.f*gFsO:<bb%iR(ANhSbYRG,\\S7_D=1-`<\\Do55BGJP!ktegFch(\\I#HI/_n%jE,(cjJH5,GhbX,f^\'f.d^b<%WmC;4`feZK#ZBs3OPTCSG?EJo@%,s=KE;:&60Iif[*dLos4/+UO3E,L/uA/1jMI29q6/+UO3E,L/uA/1jMI29q6',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'vi',
      'faab144': 'lf0d7qVK@Xd3=i-)!^L"J`X+L',
      'origin': 'https://shopeefood.vn',
      'priority': 'u=1, i',
      'referer': 'https://shopeefood.vn/',
      'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
      'x-foody-access-token': '',
      'x-foody-api-version': '1',
      'x-foody-app-type': '1004',
      'x-foody-client-id': '',
      'x-foody-client-language': 'vi',
      'x-foody-client-type': '1',
      'x-foody-client-version': '3.0.0',
      'x-sap-ri': 'b96db1682e110b2ca4a71e375a7d82c9bbb5998849884b24'
    }
  }
}

export const parseShopeeFoodResponse = (response: any) => {
  try {
    const data = response.data || response
    
    // Extract products from menu for query #5 (menu_infos structure)
    if (data.reply && data.reply.menu_infos) {
      const menuInfos = data.reply.menu_infos
      const products: ShopeeProduct[] = []
      
      menuInfos.forEach((menu: any) => {
        if (menu.dishes && Array.isArray(menu.dishes)) {
          menu.dishes.forEach((dish: any) => {
            if (dish.name && dish.discount_price) {
              products.push({
                id: dish.id || Math.random().toString(36).substr(2, 9),
                name: dish.name,
                discount_price: {
                  text: dish.discount_price.text || '',
                  unit: dish.discount_price.unit || 'đ',
                  value: dish.discount_price.value || 0
                },
                original_price: dish.price ? {
                  text: dish.price.text || '',
                  unit: dish.price.unit || 'đ', 
                  value: dish.price.value || 0
                } : undefined,
                description: dish.description || '',
                image_url: dish.photos && dish.photos.length > 0 ? dish.photos[0].value : '',
                is_available: dish.is_active !== false
              })
            }
          })
        }
      })
      
      return {
        restaurant: {
          id: 'unknown',
          name: 'Shopee Food Restaurant'
        },
        products,
        totalProducts: products.length,
        source: 'Shopee Food',
        rawData: data
      }
    }
    
    // Extract restaurant and products from delivery_detail for query #4 (delivery_detail structure)
    if (data.reply && data.reply.delivery_detail) {
      const deliveryDetail = data.reply.delivery_detail
      
      // Extract restaurant info
      const restaurant: ShopeeRestaurant = {
        id: deliveryDetail.delivery_id || deliveryDetail.restaurant_id || 'unknown',
        name: deliveryDetail.name || 'Unknown Restaurant',
        address: deliveryDetail.address || '',
        rating: deliveryDetail.rating?.avg || 0,
        total_reviews: deliveryDetail.rating?.total_review || 0
      }
      
      // Extract products from menu if available
      const products: ShopeeProduct[] = []
      
      if (deliveryDetail.menu_infos && deliveryDetail.menu_infos.menu_items) {
        deliveryDetail.menu_infos.menu_items.forEach((item: any) => {
          if (item.name && item.discount_price) {
            products.push({
              id: item.id || Math.random().toString(36).substr(2, 9),
              name: item.name,
              discount_price: {
                text: item.discount_price.text || '',
                unit: item.discount_price.unit || 'đ',
                value: item.discount_price.value || 0
              },
              original_price: item.original_price ? {
                text: item.original_price.text || '',
                unit: item.original_price.unit || 'đ', 
                value: item.original_price.value || 0
              } : undefined,
              description: item.description || '',
              image_url: item.image_url || '',
              is_available: item.is_available !== false
            })
          }
        })
      }
      
      return {
        restaurant,
        products,
        totalProducts: products.length,
        source: 'Shopee Food',
        rawData: data
      }
    }
    
    throw new Error('Invalid Shopee Food API response structure')
    
  } catch (error) {
    console.error('Error parsing Shopee Food response:', error)
    throw new Error(`Failed to parse Shopee Food data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}