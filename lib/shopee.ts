import { ProductItem, OutfitInfo } from './types';
import { VERIFIED_PRODUCTS } from './productsData';

// Tạo link tìm kiếm Shopee an toàn, luôn hiển thị sản phẩm thật và sắp xếp theo lượt bán
export function createShopeeSearchUrl(keyword: string): string {
  const cleanKeyword = keyword.trim();
  return `https://shopee.vn/search?keyword=${encodeURIComponent(cleanKeyword)}&sortBy=sales`;
}

// Tìm sản phẩm khớp chính xác từ kho sản phẩm chuẩn
export function findCatalogProduct(idOrName: string): (typeof VERIFIED_PRODUCTS)[0] | undefined {
  const text = (idOrName || '').toLowerCase().trim();
  return (
    VERIFIED_PRODUCTS.find((p) => p.id.toLowerCase() === text) ||
    VERIFIED_PRODUCTS.find((p) => p.name.toLowerCase() === text) ||
    VERIFIED_PRODUCTS.find((p) => p.name.toLowerCase().includes(text) || text.includes(p.name.toLowerCase()))
  );
}

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
        }, idx: number) => {
          const matched = findCatalogProduct(it.name);
          const keyword = it.keyword || matched?.keyword || it.name;
          const searchUrl = createShopeeSearchUrl(keyword);
          const imageUrl = matched?.imageUrl || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80';

          return {
            id: `legacy-${idx}`,
            name: it.name,
            category: it.category || matched?.category || 'Thời trang',
            keyword,
            price: it.estimatedPrice || matched?.price || 150000,
            priceRange: `Khoảng ${new Intl.NumberFormat('vi-VN').format(it.estimatedPrice || matched?.price || 150000)}đ`,
            imageUrl,
            searchUrl,
            directUrl: searchUrl,
            description: it.note || matched?.description || 'Sản phẩm gợi ý phù hợp với phong cách của bạn',
            shopName: 'Shopee Việt Nam',
            note: it.note || matched?.note,
          };
        });

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

    const products: ProductItem[] = (data.items || []).map((p: Partial<ProductItem>, idx: number) => {
      // Ưu tiên tìm sản phẩm chuẩn xác trong kho VERIFIED_PRODUCTS
      const matched = p.id ? findCatalogProduct(p.id) : (p.name ? findCatalogProduct(p.name) : undefined);

      const name = p.name || matched?.name || 'Sản phẩm thời trang nữ';
      const category = p.category || matched?.category || 'Thời trang';
      const keyword = p.keyword || matched?.keyword || name;
      const searchUrl = createShopeeSearchUrl(keyword);
      const price = typeof p.price === 'number' ? p.price : (matched?.price || 150000);
      const priceRange = p.priceRange || matched?.priceRange || `Khoảng ${new Intl.NumberFormat('vi-VN').format(price)}đ`;
      const imageUrl = p.imageUrl || matched?.imageUrl || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80';
      const description = p.description || matched?.description || p.note || '';

      return {
        id: p.id || matched?.id || `item-${idx + 1}`,
        name,
        category,
        keyword,
        price,
        priceRange,
        imageUrl,
        searchUrl,
        directUrl: searchUrl,
        description,
        shopName: p.shopName || 'Shopee Việt Nam',
        note: p.note || matched?.note,
      };
    });

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
