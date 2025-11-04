# 🍽️ Food Crawler - Hướng dẫn sử dụng Filter

## ✨ Tính năng Filter món ăn

### 1. 🔄 Lọc trùng lặp
- **Mục đích**: Loại bỏ các món có tên giống nhau (case-insensitive)
- **Cách dùng**: Click nút "Lọc trùng lặp"
- **Khi active**: Hiển thị số món bị loại bỏ (vd: -5 nếu có 5 món trùng)

### 2. 🚫 Ẩn món hết hàng
- **Mục đích**: Chỉ hiển thị món còn hàng (available = true)
- **Cách dùng**: Click nút "Ẩn món hết"
- **Khi active**: 
  - Các món có `available !== true` sẽ HOÀN TOÀN BIẾN MẤT
  - Hiển thị số món bị ẩn (vd: -10 nếu có 10 món hết)
  - KHÔNG còn thấy dòng "❌ Hết hàng" trong danh sách

### 3. 📊 Hiển thị trạng thái
**Khi KHÔNG bật filter "Ẩn món hết":**
- ✅ Có sẵn (màu xanh) - Món có available = true
- ❌ Hết hàng (màu đỏ) - Món có available = false/undefined

**Khi BẬT filter "Ẩn món hết":**
- Chỉ thấy các món "✅ Có sẵn"
- Tất cả món "❌ Hết hàng" không hiển thị

## 📋 Import JSON

### Format JSON yêu cầu:
```json
{
  "merchant": {
    "ID": "5-CZADLUB1CTX3BE",
    "name": "KOI Thé",
    "menu": {
      "categories": [
        {
          "name": "New - Roasted Oolong Series",
          "items": [
            {
              "ID": "VNITE001",
              "name": "Trà Oolong",
              "priceInMinorUnit": 60000,
              "available": true,
              "description": "..."
            }
          ]
        }
      ]
    }
  }
}
```

### Trường quan trọng:
- `available`: 
  - `true` → Món còn hàng
  - `false` hoặc không có → Món hết hàng

## 🎯 Use Cases

### Case 1: Xem tất cả món + trạng thái
1. Import JSON hoặc scrape data
2. KHÔNG bật filter nào
3. Xem danh sách đầy đủ với status mỗi món

### Case 2: Chỉ xem món còn hàng
1. Import JSON hoặc scrape data
2. Click "Ẩn món hết"
3. Danh sách chỉ còn món available = true

### Case 3: Loại bỏ trùng lặp + Chỉ món còn
1. Import JSON hoặc scrape data
2. Click "Lọc trùng lặp"
3. Click "Ẩn món hết"
4. Có danh sách sạch, unique, chỉ món còn hàng

## 💡 Tips

- Số ở nút filter (vd: "-10") = số món bị loại bỏ
- "Total: X items" = số món ĐANG HIỂN THỊ sau khi filter
- "(Y gốc)" = tổng số món ban đầu trước khi filter
