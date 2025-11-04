// Script để chạy trong Console của trang Grab Food
// Cách dùng:
// 1. Mở trang restaurant trên food.grab.com
// 2. Mở Console (F12)
// 3. Copy và paste script này
// 4. Enter để chạy
// 5. JSON sẽ được copy vào clipboard

(async function() {
  try {
    // Extract merchant ID from URL
    const url = window.location.href;
    const match = url.match(/\/([A-Z0-9-]+)$/);
    if (!match) {
      console.error('❌ Không tìm thấy merchant ID trong URL');
      return;
    }
    
    const merchantId = match[1];
    console.log('🔍 Merchant ID:', merchantId);
    
    // Get current location or use default
    const latlng = '10.762622,106.660172'; // Default HCM location
    
    // Fetch merchant data
    const apiUrl = `https://portal.grab.com/foodweb/v2/merchants/${merchantId}?latlng=${latlng}&countryCode=VN`;
    console.log('🚀 Fetching:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'X-Country-Code': 'VN',
        'X-Locale': 'vi-VN'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Data fetched successfully!');
    console.log('📊 Data:', data);
    
    // Copy to clipboard
    const jsonString = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(jsonString);
    
    console.log('✅ JSON đã được copy vào clipboard!');
    console.log('📋 Bạn có thể paste vào app ngay!');
    console.log('📈 Tổng số món:', data.merchant?.menu?.categories?.reduce((sum, cat) => sum + (cat.items?.length || 0), 0) || 0);
    
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  }
})();
