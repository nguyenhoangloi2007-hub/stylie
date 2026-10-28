// Kiểu dữ liệu dùng chung trong ứng dụng Stylie

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: ProductItem[];
  outfitInfo?: OutfitInfo;
  image?: string; // Data URL của ảnh người dùng tải lên
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  keyword?: string;
  price: number;
  priceRange: string;
  searchUrl?: string;
  directUrl: string; // Tương thích ngược: trỏ thẳng đến trang tìm kiếm Shopee
  description: string;
  shopName?: string;
  note?: string;
  imageUrl?: string;
}

export interface OutfitInfo {
  isOutfit: boolean; // true nếu là outfit phối đồ, false nếu là danh sách nhiều mẫu của 1 loại đồ
  totalBudget: number;
  totalEstimated: number;
  occasion?: string;
  style?: string;
}

// Định dạng lịch sử hội thoại gửi cho Gemini API
export type GeminiPart =
  | { text: string }
  | { inlineData: { mimeType: string; data: string } };

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

export interface AttachedImage {
  data: string; // Chuỗi base64 (không bao gồm tiền tố data:image/...)
  mimeType: string;
  previewUrl: string; // Data URL đầy đủ để render xem trước trên UI
}
