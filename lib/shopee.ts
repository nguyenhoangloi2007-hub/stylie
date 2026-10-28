import { ProductItem, OutfitInfo } from './types';

// Phân tích block STYLIE_PRODUCTS từ phản hồi của AI
export function parseStylieProducts(content: string): {
  cleanContent: string;
  products: ProductItem[];
  outfitInfo?: OutfitInfo;
} {
  const productRegex = /STYLIE_PRODUCTS:\s*([\s\S]*?)END_STYLIE_PRODUCTS/;
  const match = content.match(productRegex);

  if (!match) {
    // Kiểm tra tương thích ngược với format STYLIE_SEARCH cũ nếu có
    const legacyRegex = /STYLIE_SEARCH:\s*([\s\S]*?)END_STYLIE_SEARCH/;
    const legacyMatch = content.match(legacyRegex);

    if (legacyMatch) {
      try {
        const legacyData = JSON.parse(legacyMatch[1].trim());
        const cleanContent = content.replace(/STYLIE_SEARCH:[\s\S]*?END_STYLIE_SEARCH/g, '').trim();
        const products: ProductItem[] = (legacyData.items || []).map((it: {
          name: string;
          category?: string;
          estimatedPrice?: number;
          maxPrice?: number;
          keyword?: string;
          note?: string;
        }, idx: number) => ({
          id: `item-${idx}`,
          name: it.name,
          category: it.category || 'Thời trang',
          price: it.estimatedPrice || 150000,
          priceRange: `Khoảng ${new Intl.NumberFormat('vi-VN').format(it.estimatedPrice || 150000)}đ`,
          imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80',
          directUrl: `https://shopee.vn/search?keyword=${encodeURIComponent(it.keyword || it.name)}`,
          description: it.note || 'Sản phẩm đề xuất cho bạn',
          shopName: 'Shopee Việt Nam',
        }));

        const totalEstimated = products.reduce((sum, p) => sum + p.price, 0);
        return {
          cleanContent,
          products,
          outfitInfo: {
            isOutfit: true,
            totalBudget: legacyData.totalBudget || 400000,
            totalEstimated,
            occasion: legacyData.occasion,
            style: legacyData.style,
          },
        };
      } catch {
        return { cleanContent: content, products: [] };
      }
    }

    return { cleanContent: content, products: [] };
  }

  try {
    const jsonStr = match[1].trim();
    const data = JSON.parse(jsonStr);
    const cleanContent = content.replace(/STYLIE_PRODUCTS:[\s\S]*?END_STYLIE_PRODUCTS/g, '').trim();

    const products: ProductItem[] = (data.items || []).map((p: ProductItem, idx: number) => ({
      id: p.id || `p-${idx}`,
      name: p.name,
      category: p.category || 'Thời trang',
      price: p.price || 150000,
      priceRange: p.priceRange || `Khoảng ${new Intl.NumberFormat('vi-VN').format(p.price || 150000)}đ`,
      imageUrl: p.imageUrl,
      directUrl: p.directUrl,
      description: p.description || '',
      shopName: p.shopName || 'Shopee Việt Nam',
      note: p.note,
    }));

    const totalEstimated = products.reduce((sum, p) => sum + p.price, 0);

    const outfitInfo: OutfitInfo = {
      isOutfit: data.isOutfit === true,
      totalBudget: data.totalBudget || 0,
      totalEstimated,
      occasion: data.occasion,
      style: data.style,
    };

    return { cleanContent, products, outfitInfo };
  } catch (err) {
    console.error('Lỗi khi phân tích JSON STYLIE_PRODUCTS:', err);
    const cleanContent = content.replace(/STYLIE_PRODUCTS:[\s\S]*?END_STYLIE_PRODUCTS/g, '').trim();
    return { cleanContent, products: [] };
  }
}

// Format tiền tệ VNĐ
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}
