// Kiểu dữ liệu dùng chung trong ứng dụng Stylie

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  products?: ProductItem[];
  outfitInfo?: OutfitInfo;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  priceRange: string;
  imageUrl: string;
  directUrl: string;
  description: string;
  shopName: string;
  note?: string;
}

export interface OutfitInfo {
  isOutfit: boolean; // true nếu là outfit phối đồ, false nếu là danh sách gợi ý 1 món (như chỉ tìm quần, chỉ tìm áo)
  totalBudget: number;
  totalEstimated: number;
  occasion?: string;
  style?: string;
}

// Định dạng lịch sử hội thoại gửi cho Gemini API
export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}
