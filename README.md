# ✨ Stylie — AI Tư Vấn Thời Trang Nữ

Chatbot AI tư vấn trang phục nữ theo phong cách cá nhân và ngân sách, kết hợp tìm kiếm sản phẩm trên Shopee Việt Nam.

## 🚀 Cài Đặt & Chạy Ứng Dụng

### Bước 1: Lấy Gemini API Key (miễn phí)
1. Truy cập https://aistudio.google.com
2. Đăng nhập bằng tài khoản Google
3. Nhấn **"Get API Key"** → **"Create API key"**
4. Copy key vừa tạo

### Bước 2: Cấu hình API Key
Mở file `.env.local` và thay `your_gemini_api_key_here` bằng key vừa copy:
```
GEMINI_API_KEY=AIzaSy...key_của_bạn...
```

### Bước 3: Chạy ứng dụng
Mở PowerShell trong thư mục `stylie`, chạy:
```bash
npm run dev
```

### Bước 4: Mở trình duyệt
Truy cập: **http://localhost:3000**

---

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|-----------|---------|
| Next.js 15 | Framework React full-stack |
| TailwindCSS | Giao diện |
| Google Gemini 1.5 Flash | Mô hình AI |
| Shopee Search URL | Tìm kiếm sản phẩm |

## 📁 Cấu Trúc Dự Án

```
stylie/
├── app/
│   ├── page.tsx          ← Trang chính (giao diện chat)
│   ├── layout.tsx        ← Layout và metadata
│   ├── globals.css       ← Styles toàn cục
│   └── api/chat/route.ts ← API xử lý tin nhắn AI
├── components/
│   ├── MessageBubble.tsx  ← Bong bóng tin nhắn
│   ├── ProductCard.tsx    ← Thẻ sản phẩm Shopee
│   ├── TypingIndicator.tsx← Hiệu ứng đang gõ
│   └── SuggestedQuestions.tsx ← Câu hỏi gợi ý
├── lib/
│   ├── types.ts          ← TypeScript types
│   ├── prompts.ts        ← System prompt cho AI
│   ├── shopee.ts         ← Tạo link tìm kiếm Shopee
│   └── gemini.ts         ← Kết nối Gemini API
├── .env.local            ← API keys (KHÔNG đưa lên GitHub)
└── .env.example          ← Mẫu biến môi trường
```

## ⚠️ Lưu Ý Bảo Mật

- **KHÔNG** đưa file `.env.local` lên GitHub
- File `.gitignore` đã tự động loại trừ `.env.local`
- Chia sẻ `.env.example` thay vì `.env.local`
