import { ProductItem, OutfitInfo } from './types';

// Danh sách các quy tắc khớp ảnh thời trang thật theo tên và từ khóa
interface FashionImageRule {
  keywords: string[];
  imageUrl: string;
}

const FASHION_IMAGE_RULES: FashionImageRule[] = [
  // 1. Quần
  {
    keywords: ['jogger', 'nỉ', 'thể thao', 'sweatpant'],
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['quần âu', 'quần tây', 'tuyết mưa', 'xếp ly', 'công sở', 'suông cạp cao'],
    imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['túi hộp', 'cargo', 'túi dán'],
    imageUrl: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['retro', 'vintage wash', 'rách', 'bò retro'],
    imageUrl: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['quần short', 'quần đùi', 'sooc', 'short bò'],
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['ống loe', 'flare'],
    imageUrl: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['quần jean', 'quần bò', 'jean ống rộng', 'baggy', 'denim', 'cạp cao'],
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80',
  },

  // 2. Áo
  {
    keywords: ['sơ mi croptop', 'sơ mi lửng', 'caro'],
    imageUrl: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['sơ mi', 'tay bồng', 'công sở', 'kate', 'trắng kem', 'oversize trắng'],
    imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['baby tee', 'y2k', 'ôm body', 'ôm sát'],
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['cardigan', 'khoác len'],
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['áo len', 'dệt kim', 'len cổ tim', 'len cổ v'],
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['blazer', 'vest', 'áo khoác tây'],
    imageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['hoodie', 'sweater', 'áo nỉ'],
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['bomber', 'áo khoác dù', 'khoác gió'],
    imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['croptop', 'hai dây', 'sát nách', 'cổ vuông'],
    imageUrl: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['áo thun', 'áo phông', 'oversize', 'tay lỡ', 'cotton', 'unisex'],
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
  },

  // 3. Chân váy & Đầm
  {
    keywords: ['tennis', 'xếp ly ngắn', 'học đường'],
    imageUrl: 'https://images.unsplash.com/photo-1592632701796-56454b4d618d?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['váy jean', 'chân váy jean', 'xẻ tà', 'bò dài'],
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['chân váy chữ a', 'chân váy dài', 'chân váy midi', 'xòe'],
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['hoa nhí', 'vintage', 'tiểu thư', 'cổ v tay bồng'],
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['bodycon', 'ôm body', 'dạ hội', 'quyến rũ'],
    imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['đầm', 'váy', 'babydoll', 'công chúa', 'váy trắng'],
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80',
  },

  // 4. Giày & Phụ kiện
  {
    keywords: ['sneaker', 'thể thao', 'bánh mì', 'trắng', 'độn đế'],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['cao gót', 'mary jane', 'gót nhọn'],
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['sandal', 'dép quai', 'quai mảnh'],
    imageUrl: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['boot', 'bốt', 'cổ cao', 'cổ thấp'],
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['tote', 'canvas', 'vải', 'đi học'],
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['kẹp nách', 'túi da', 'túi đeo chéo', 'túi xách'],
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['balo'],
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['mũ', 'nón', 'bucket'],
    imageUrl: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80',
  },
  {
    keywords: ['kính', 'mắt kính', 'kính râm'],
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80',
  },
];

// Khớp hình ảnh trang phục thật chính xác theo tên và từ khóa
export function matchFashionImage(name: string, category: string, keyword?: string): string {
  const fullText = `${name} ${keyword || ''} ${category}`.toLowerCase();

  for (const rule of FASHION_IMAGE_RULES) {
    if (rule.keywords.some((kw) => fullText.includes(kw))) {
      return rule.imageUrl;
    }
  }

  // Fallback theo danh mục nếu không khớp từ khóa chi tiết
  const cat = category.toLowerCase();
  if (cat.includes('quần')) {
    return 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('áo')) {
    return 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('váy') || cat.includes('đầm')) {
    return 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('giày')) {
    return 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80';
  }
  if (cat.includes('túi')) {
    return 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80';
  }

  return 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80';
}

// Tạo link tìm kiếm Shopee an toàn, luôn hiển thị sản phẩm thật và sắp xếp theo lượt bán
export function createShopeeSearchUrl(keyword: string): string {
  const cleanKeyword = keyword.trim();
  return `https://shopee.vn/search?keyword=${encodeURIComponent(cleanKeyword)}&sortBy=sales`;
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
          const keyword = it.keyword || it.name || 'thời trang nữ';
          const searchUrl = createShopeeSearchUrl(keyword);
          const category = it.category || 'Thời trang';
          const realImage = matchFashionImage(it.name, category, keyword);

          return {
            id: `legacy-${idx}`,
            name: it.name,
            category,
            keyword,
            price: it.estimatedPrice || 150000,
            priceRange: `Khoảng ${new Intl.NumberFormat('vi-VN').format(it.estimatedPrice || 150000)}đ`,
            imageUrl: realImage,
            searchUrl,
            directUrl: searchUrl,
            description: it.note || 'Sản phẩm gợi ý phù hợp với phong cách của bạn',
            shopName: 'Shopee Việt Nam',
            note: it.note,
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
      const keyword = p.keyword || p.name || 'thời trang nữ';
      const searchUrl = createShopeeSearchUrl(keyword);
      const price = typeof p.price === 'number' ? p.price : 150000;
      const category = p.category || 'Thời trang';
      const realImage = p.imageUrl || matchFashionImage(p.name || '', category, keyword);

      return {
        id: p.id || `item-${idx + 1}`,
        name: p.name || 'Sản phẩm thời trang',
        category,
        keyword,
        price,
        priceRange: p.priceRange || `Khoảng ${new Intl.NumberFormat('vi-VN').format(price)}đ`,
        imageUrl: realImage,
        searchUrl,
        directUrl: searchUrl, // Trỏ đến trang tìm kiếm Shopee bán chạy
        description: p.description || p.note || '',
        shopName: p.shopName || 'Shopee Việt Nam',
        note: p.note,
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
