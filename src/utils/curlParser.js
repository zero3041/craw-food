export const parseCurlCommand = (curlCommand) => {
  try {
    // Extract URL
    const urlMatch = curlCommand.match(/curl\s+'([^']+)'/);
    if (!urlMatch) {
      throw new Error('Không tìm thấy URL trong curl command');
    }
    const url = urlMatch[1];

    // Extract headers
    const headers = {};
    const headerMatches = curlCommand.matchAll(/-H\s+'([^:]+):\s*([^']+)'/g);
    for (const match of headerMatches) {
      headers[match[1]] = match[2];
    }

    // Extract data
    let data = null;
    const dataMatch = curlCommand.match(/--data-raw\s+'(.+)'/s);
    if (dataMatch) {
      try {
        data = JSON.parse(dataMatch[1]);
      } catch (e) {
        data = dataMatch[1];
      }
    }

    // Extract method
    const method = curlCommand.includes('--data-raw') ? 'POST' : 'GET';

    return {
      url,
      method,
      headers,
      data
    };
  } catch (error) {
    throw new Error(`Lỗi parse curl command: ${error.message}`);
  }
};

export const extractProductData = (responseData) => {
  try {
    if (!responseData || !responseData.data) {
      throw new Error('Dữ liệu response không hợp lệ');
    }

    const { data } = responseData;
    const products = [];

    // Extract restaurant info
    const restaurantInfo = data.restaurant_info || {};
    const currency = data.currency || '₫';

    // Extract products from categories
    if (data.categories && Array.isArray(data.categories)) {
      data.categories.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
          category.items.forEach(item => {
            products.push({
              id: item.restaurant_item_id || Math.random(),
              name: item.item_name || 'Không có tên',
              price: item.price || 0,
              displayPrice: item.display_price || '0',
              oldPrice: item.old_price || item.price,
              displayOldPrice: item.display_old_price || item.display_price,
              description: item.item_details || '',
              image: item.item_image_compressed_web || item.item_image || '',
              category: category.category_name || 'Khác',
              currency: currency,
              isActive: item.is_active !== 0,
              offerText: item.offer_text || '',
              hasDiscount: item.offers_discount || false
            });
          });
        }
      });
    }

    return {
      products,
      restaurantInfo: {
        name: restaurantInfo.name || 'Không có tên',
        address: restaurantInfo.display_address || restaurantInfo.address || '',
        rating: restaurantInfo.rating || 0,
        reviewCount: restaurantInfo.review_count || 0,
        deliveryTime: restaurantInfo.min_delivery_time || 0,
        minimumOrder: restaurantInfo.display_minimum_order_amount || '0'
      },
      currency
    };
  } catch (error) {
    throw new Error(`Lỗi extract dữ liệu sản phẩm: ${error.message}`);
  }
}; 