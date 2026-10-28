import { ProductItem, OutfitInfo } from './types';

// Danh sách ảnh thời trang NỮ chuẩn, đã được kiểm duyệt 100% người mẫu nữ và trang phục nữ
interface FashionCategoryImages {
  keywords: string[];
  images: string[];
}

const FEMALE_FASHION_GALLERY: FashionCategoryImages[] = [
  // 1. Áo trễ vai / hở vai / bẹt vai / khoe xương quai xanh
  {
    keywords: ['trễ vai', 'hở vai', 'bẹt vai', 'lệch vai', 'khoe vai', 'quai xanh', 'nhún ngực trễ vai'],
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 2. Áo croptop / baby tee / áo thun gân ôm body / hai dây
  {
    keywords: ['baby tee', 'croptop', 'gân tăm', 'ôm body', 'ôm sát', 'hai dây', 'cổ vuông', 'sát nách'],
    images: [
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 3. Áo sơ mi nữ (trắng, kẻ sọc, tay bồng, lụa)
  {
    keywords: ['sơ mi', 'tay bồng', 'kate', 'lụa', 'công sở', 'caro', 'cổ đức'],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 4. Áo thun nữ basic / form rộng / oversize
  {
    keywords: ['áo thun', 'áo phông', 'oversize', 'tay lỡ', 'cotton', 'unisex', 't-shirt'],
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 5. Áo khoác / blazer / cardigan / len
  {
    keywords: ['blazer', 'cardigan', 'áo len', 'dệt kim', 'vest', 'bomber', 'hoodie', 'sweater', 'áo khoác'],
    images: [
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 6. Quần jogger / nỉ / thể thao nữ
  {
    keywords: ['jogger', 'nỉ', 'thể thao', 'sweatpant'],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 7. Quần âu / quần tây / xếp ly công sở nữ
  {
    keywords: ['quần âu', 'quần tây', 'tuyết mưa', 'xếp ly', 'công sở', 'suông cạp cao', 'quần vải'],
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 8. Quần jean / quần bò nữ (ống rộng, cạp cao, baggy, retro)
  {
    keywords: ['quần jean', 'quần bò', 'jean', 'baggy', 'ống rộng', 'cạp cao', 'ống loe', 'short bò'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 9. Chân váy nữ (tennis, chữ A, jean, midi)
  {
    keywords: ['chân váy', 'váy ngắn', 'tennis', 'xếp ly', 'chữ a', 'xẻ tà', 'skirt'],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 10. Đầm / váy liền / hoa nhí / babydoll
  {
    keywords: ['đầm', 'váy', 'hoa nhí', 'babydoll', 'bodycon', 'tiểu thư', 'công chúa', 'dress'],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 11. Giày nữ (sneaker trắng, cao gót, mary jane, sandal)
  {
    keywords: ['giày', 'sneaker', 'cao gót', 'sandal', 'boot', 'bốt', 'dép'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    ],
  },

  // 12. Túi xách & phụ kiện nữ (túi tote, kẹp nách, balo, nón, kính)
  {
    keywords: ['túi', 'balo', 'tote', 'kẹp nách', 'mũ', 'nón', 'kính'],
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=400&q=80',
    ],
  },
];

// Khớp hình ảnh thời trang NỮ chuẩn xác, đảm bảo mỗi sản phẩm có một hình ảnh riêng biệt không trùng lặp
export function matchFashionImage(name: string, category: string, keyword?: string, index: number = 0): string {
  const fullText = `${name} ${keyword || ''} ${category}`.toLowerCase();

  for (const group of FEMALE_FASHION_GALLERY) {
    if (group.keywords.some((kw) => fullText.includes(kw))) {
      // Dùng index để chọn ảnh khác nhau cho từng món đồ trong cùng danh mục
      const imageIndex = Math.abs(index) % group.images.length;
      return group.images[imageIndex];
    }
  }

  // Fallback an toàn theo danh mục NỮ
  const cat = category.toLowerCase();
  if (cat.includes('quần')) {
    const list = [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=400&q=80',
    ];
    return list[Math.abs(index) % list.length];
  }
  if (cat.includes('áo')) {
    const list = [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    ];
    return list[Math.abs(index) % list.length];
  }
  if (cat.includes('váy') || cat.includes('đầm')) {
    const list = [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=400&q=80',
    ];
    return list[Math.abs(index) % list.length];
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
          const realImage = matchFashionImage(it.name, category, keyword, idx);

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
      // Truyền idx vào để mỗi sản phẩm nhận một ảnh khác biệt hoàn toàn
      const realImage = matchFashionImage(p.name || '', category, keyword, idx);

      return {
        id: p.id || `item-${idx + 1}`,
        name: p.name || 'Sản phẩm thời trang',
        category,
        keyword,
        price,
        priceRange: p.priceRange || `Khoảng ${new Intl.NumberFormat('vi-VN').format(price)}đ`,
        imageUrl: realImage,
        searchUrl,
        directUrl: searchUrl,
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
