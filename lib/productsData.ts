import { ProductItem } from './types';

export interface CatalogProduct extends ProductItem {
  styles: string[]; // 'korean', 'minimalist', 'y2k', 'streetwear', 'vintage', 'feminine', 'preppy', 'casual'
  keywords: string[];
}

export const VERIFIED_PRODUCTS: CatalogProduct[] = [
  // ==================== 1. QUẦN JEANS / QUẦN DÀI ====================
  {
    id: 'jean-01',
    name: 'Quần jean nữ ống rộng xanh nhạt',
    category: 'Quần',
    price: 185000,
    priceRange: 'Khoảng 180.000–261.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Qu%E1%BA%A7n-Jean-N%E1%BB%AF-L%C6%B0ng-Cao-%E1%BB%90ng-R%E1%BB%99ng-M%C3%A0u-Xanh-Nh%E1%BA%A1t-Qu%E1%BA%A7n-B%C3%B2-N%E1%BB%AF-Phong-C%C3%A1ch-H%C3%A0n-Qu%E1%BB%91c-D%C3%A1ng-Su%C3%B4ng-Hot-Trend-i.391508026.42427299517',
    description: 'Dáng rộng, cạp cao tôn dáng, phong cách Hàn Quốc.',
    shopName: 'Shopee Việt Nam',
    note: 'Hack chân dài cực tốt, dễ mix áo thun hoặc croptop',
    styles: ['korean', 'casual', 'streetwear'],
    keywords: ['quần jean', 'quần bò', 'ống rộng', 'xanh nhạt', 'hàn quốc', 'cạp cao'],
  },
  {
    id: 'jean-02',
    name: 'Quần jeans nữ phong cách retro',
    category: 'Quần',
    price: 189000,
    priceRange: 'Khoảng 189.000–250.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Qu%E1%BA%A7n-jeans-n%E1%BB%AF-retro-thi%E1%BA%BFt-k%E1%BA%BF-c%E1%BA%A3m-gi%C3%A1c-ba-chi%E1%BB%81u-chi-ti%E1%BA%BFt-kim-c%C6%B0%C6%A1ng-gi%E1%BA%A3-m%E1%BA%ABu-m%C3%A3-HOT-i.450374282.57251869525',
    description: 'Chất jean dày dặn, kiểu wide-leg washed retro dễ phối áo.',
    shopName: 'Shopee Mall',
    note: 'Vibe cổ điển cá tính, hợp đi chơi và dạo phố cuối tuần',
    styles: ['vintage', 'streetwear', 'y2k'],
    keywords: ['quần jean', 'quần bò', 'retro', 'vintage', 'wide-leg', 'washed'],
  },
  {
    id: 'jean-03',
    name: 'Quần jean nữ túi dán ống rộng',
    category: 'Quần',
    price: 150000,
    priceRange: 'Khoảng 150.000–195.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/product/316600188/20653145363',
    description: 'Kiểu trẻ trung, túi hộp 2 bên, hợp phối đồ streetwear cá tính.',
    shopName: 'Shop Yêu Thích',
    note: 'Form suông thoải mái, đậm chất đường phố Gen Z',
    styles: ['streetwear', 'y2k', 'casual'],
    keywords: ['quần jean', 'túi dán', 'túi hộp', 'cargo', 'streetwear', 'ống rộng'],
  },
  {
    id: 'jean-04',
    name: 'Quần jeans suông cạp cao kèm đai',
    category: 'Quần',
    price: 165000,
    priceRange: 'Khoảng 165.000–220.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Qu%E1%BA%A7n-jeans-su%C3%B4ng-n%E1%BB%AF-c%E1%BA%A1p-cao-%E1%BB%91ng-r%E1%BB%99ng-m%C3%A0u-xanh-nh%E1%BA%A1t-k%C3%A8m-d%C3%A2y-%C4%91ai-si%C3%AAu-%C4%91%E1%BA%B9p-(-s%E1%BA%B5n-)-i.1618705293.55950706480',
    description: 'Quần bò nữ dáng suông cạp cao kèm dây đai tạo điểm nhấn eo.',
    shopName: 'Shopee Việt Nam',
    note: 'Thanh lịch và trẻ trung, mặc đi học hay đi làm thêm đều xinh',
    styles: ['korean', 'casual', 'minimalist'],
    keywords: ['quần jean', 'ống suông', 'cạp cao', 'kèm đai', 'đi học'],
  },
  {
    id: 'pants-05',
    name: 'Quần tây ống suông xếp ly cạp cao',
    category: 'Quần',
    price: 145000,
    priceRange: 'Khoảng 135.000–180.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Qu%E1%BA%A7n-t%C3%A2y-%E1%BB%91ng-su%C3%B4ng-n%E1%BB%AF-c%E1%BA%A1p-cao-kh%C3%B3a-k%C3%A9o-d%C3%A1ng-d%C3%A0i-%C4%91i-h%E1%BB%8Dc-%C4%91i-l%C3%A0m-t%C3%B4n-d%C3%A1ng-i.283921782.16439201948',
    description: 'Chất tuyết mưa đứng form, xếp ly tinh tế phong cách Minimalist.',
    shopName: 'Shop Yêu Thích',
    note: 'Rất tôn dáng, thanh lịch cho môi trường học đường và công sở',
    styles: ['minimalist', 'korean', 'preppy'],
    keywords: ['quần tây', 'quần âu', 'ống suông', 'xếp ly', 'tối giản', 'đi học'],
  },

  // ==================== 2. ÁO (TOPS / SHIRTS) ====================
  {
    id: 'top-01',
    name: 'Áo sơ mi nữ oversize form rộng trắng kem',
    category: 'Áo',
    price: 155000,
    priceRange: 'Khoảng 140.000–185.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/%C3%81o-s%C6%A1-mi-n%E1%BB%AF-form-r%E1%BB%99ng-tay-d%C3%A0i-m%C3%A0u-tr%E1%BA%AFng-kem-style-H%C3%A0n-Qu%E1%BB%91c-ulzzang-i.291847102.18374920194',
    description: 'Form rộng ulzzang tay dài, vải lụa mềm mát chống nhăn.',
    shopName: 'Shopee Mall',
    note: 'Món đồ basic quốc dân, mix cùng quần jean hay chân váy đều đẹp',
    styles: ['korean', 'minimalist', 'preppy', 'casual'],
    keywords: ['áo sơ mi', 'oversize', 'trắng kem', 'form rộng', 'hàn quốc', 'ulzzang'],
  },
  {
    id: 'top-02',
    name: 'Áo thun baby tee nữ in hình Y2K ôm dáng',
    category: 'Áo',
    price: 99000,
    priceRange: 'Khoảng 89.000–130.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/%C3%81o-thun-baby-tee-n%E1%BB%AF-%C3%B4m-body-in-h%C3%ACnh-ch%E1%BB%AF-c%E1%BB%95-tr%C3%B2n-phong-c%C3%A1ch-Y2K-i.384719284.19284710294',
    description: 'Chất cotton 100% co giãn nhẹ, họa tiết chữ Y2K bắt mắt.',
    shopName: 'Shop Yêu Thích',
    note: 'Cực hợp mix cùng quần jeans ống rộng cạp cao hack dáng',
    styles: ['y2k', 'streetwear', 'casual'],
    keywords: ['áo thun', 'baby tee', 'croptop', 'y2k', 'ôm body'],
  },
  {
    id: 'top-03',
    name: 'Áo len croptop dệt kim mỏng cổ V',
    category: 'Áo',
    price: 135000,
    priceRange: 'Khoảng 125.000–170.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/%C3%81o-len-croptop-n%E1%BB%AF-d%E1%BB%87t-kim-d%C3%A0i-tay-c%E1%BB%95-tim-phong-c%C3%A1ch-H%C3%A0n-Qu%E1%BB%91c-i.482910482.17482910294',
    description: 'Chất len mềm mịn dệt kim, dáng ngắn khoe eo thon nhẹ nhàng.',
    shopName: 'Shopee Việt Nam',
    note: 'Vibe tiểu thư Hàn Quốc nữ tính, hợp mặc mùa thu đông hoặc phòng máy lạnh',
    styles: ['korean', 'feminine'],
    keywords: ['áo len', 'croptop', 'dệt kim', 'cổ v', 'hàn quốc'],
  },
  {
    id: 'top-04',
    name: 'Áo cardigan len mỏng pastel cổ V',
    category: 'Áo',
    price: 125000,
    priceRange: 'Khoảng 110.000–165.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/%C3%81o-kho%C3%A1c-cardigan-len-m%E1%BB%8Fng-n%E1%BB%AF-c%E1%BB%95-V-h%C3%A0ng-c%C3%BAc-phong-c%C3%A1ch-H%C3%A0n-Qu%E1%BB%91c-i.382910482.16482910384',
    description: 'Áo khoác len mỏng hàng cúc trước tone màu pastel ngọt ngào.',
    shopName: 'Shop Yêu Thích',
    note: 'Khoác nhẹ bên ngoài áo thun/hai dây, layer chuẩn style Hàn',
    styles: ['korean', 'feminine', 'preppy'],
    keywords: ['cardigan', 'áo khoác len', 'pastel', 'khoác ngoài', 'hàn quốc'],
  },
  {
    id: 'top-05',
    name: 'Áo thun nữ oversize cotton form rộng',
    category: 'Áo',
    price: 110000,
    priceRange: 'Khoảng 95.000–140.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/%C3%81o-thun-n%E1%BB%AF-oversize-tay-l%E1%BB%A1-cotton-form-r%E1%BB%99ng-phong-c%C3%A1ch-streetwear-i.192847102.15382910482',
    description: 'Cotton 2 chiều dày dặn không bai xù, tay lỡ che bắp tay tốt.',
    shopName: 'Shopee Mall',
    note: 'Cực kỳ thoải mái, mặc ở nhà, đi học thêm hay đi cà phê cùng bạn bè',
    styles: ['streetwear', 'casual', 'minimalist'],
    keywords: ['áo thun', 'áo phông', 'oversize', 'tay lỡ', 'cotton', 'basic'],
  },

  // ==================== 3. CHÂN VÁY / ĐẦM (SKIRTS & DRESSES) ====================
  {
    id: 'skirt-01',
    name: 'Chân váy chữ A cạp cao qua gối',
    category: 'Váy',
    price: 165000,
    priceRange: 'Khoảng 140.000–195.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Ch%C3%A2n-v%C3%A1y-ch%E1%BB%AF-A-n%E1%BB%AF-d%C3%A1ng-d%C3%A0i-c%E1%BA%A1p-cao-x%E1%BA%BFp-ly-phong-c%C3%A1ch-H%C3%A0n-Qu%E1%BB%91c-i.283910482.18492019482',
    description: 'Chân váy dài qua gối chữ A, che khuyết điểm chân cực tốt.',
    shopName: 'Shopee Việt Nam',
    note: 'Thanh lịch chuẩn vibe tiểu thư Hàn Quốc, diện đi học vừa kín đáo vừa xinh',
    styles: ['korean', 'feminine', 'minimalist'],
    keywords: ['chân váy', 'chữ a', 'dáng dài', 'cạp cao', 'xếp ly', 'hàn quốc'],
  },
  {
    id: 'skirt-02',
    name: 'Chân váy tennis xếp ly ngắn phong cách Preppy',
    category: 'Váy',
    price: 115000,
    priceRange: 'Khoảng 99.000–145.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1592632701796-56454b4d618d?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Ch%C3%A2n-v%C3%A1y-tennis-x%E1%BA%BFp-ly-ng%E1%BA%AFn-c%C3%B3-qu%E1%BA%A7n-trong-phong-c%C3%A1ch-h%E1%BB%8Dc-%C4%91%C6%B0%E1%BB%9Dng-preppy-i.193847291.15482910482',
    description: 'Váy tennis có quần bảo hộ bên trong, xếp ly đều tôn chân thon.',
    shopName: 'Shop Yêu Thích',
    note: 'Trẻ trung, năng động, chuẩn gu học đường năng động',
    styles: ['preppy', 'korean', 'y2k'],
    keywords: ['chân váy', 'tennis', 'xếp ly', 'ngắn', 'preppy', 'học sinh'],
  },
  {
    id: 'skirt-03',
    name: 'Chân váy jean dáng dài xẻ tà trước ulzzang',
    category: 'Váy',
    price: 185000,
    priceRange: 'Khoảng 160.000–230.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Ch%C3%A2n-v%C3%A1y-jean-d%C3%A0i-n%E1%BB%AF-x%E1%BA%BB-t%C3%A0-c%E1%BA%A1p-cao-t%C3%B4n-d%C3%A1ng-phong-c%C3%A1ch-ulzzang-i.382910482.17382910294',
    description: 'Chất bò mềm cạp cao tôn dáng, chi tiết xẻ tà đi lại thoải mái.',
    shopName: 'Shopee Mall',
    note: 'Đang là hot trend trên Shopee, mix cùng áo phông hay sơ mi đều sành điệu',
    styles: ['korean', 'streetwear', 'casual'],
    keywords: ['chân váy', 'váy jean', 'dáng dài', 'xẻ tà', 'bò', 'ulzzang'],
  },
  {
    id: 'dress-04',
    name: 'Đầm hoa nhí cổ V tay bồng dáng dài vintage',
    category: 'Đầm',
    price: 195000,
    priceRange: 'Khoảng 175.000–240.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/%C4%90%E1%BA%A7m-hoa-nh%C3%AD-n%E1%BB%AF-d%C3%A1ng-d%C3%A0i-c%E1%BB%95-V-tay-b%E1%BB%93ng-ti%E1%BB%83u-th%C6%B0-phong-c%C3%A1ch-vintage-i.482910294.19382910482',
    description: 'Họa tiết hoa nhí nhã nhặn, thắt nơ eo nhẹ nhàng đậm chất vintage thơ mộng.',
    shopName: 'Shop Yêu Thích',
    note: 'Hoàn hảo cho những buổi hẹn hò, cà phê check-in hoặc đi du lịch',
    styles: ['vintage', 'feminine'],
    keywords: ['đầm', 'váy', 'hoa nhí', 'tay bồng', 'vintage', 'tiểu thư'],
  },

  // ==================== 4. TÚI XÁCH & PHỤ KIỆN (BAGS & ACCESSORIES) ====================
  {
    id: 'bag-01',
    name: 'Túi tote vải canvas phong cách Hàn Quốc',
    category: 'Túi',
    price: 65000,
    priceRange: 'Khoảng 55.000–85.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/T%C3%BAi-tote-v%E1%BA%A3i-canvas-n%E1%BB%AF-%C4%91eo-vai-phong-c%C3%A1ch-H%C3%A0n-Qu%E1%BB%91c-%C4%91i-h%E1%BB%8Dc-%C4%91i-ch%C6%A1i-i.283910482.14382910482',
    description: 'Vải canvas dày dặn có khóa kéo, đựng vừa vặn sách vở A4 và laptop 14 inch.',
    shopName: 'Shopee Việt Nam',
    note: 'Món phụ kiện tiện lợi không thể thiếu của học sinh, sinh viên',
    styles: ['korean', 'casual', 'minimalist', 'preppy'],
    keywords: ['túi tote', 'canvas', 'vải', 'đi học', 'đựng laptop'],
  },
  {
    id: 'bag-02',
    name: 'Túi kẹp nách da PU phong cách Y2K Retro',
    category: 'Túi',
    price: 95000,
    priceRange: 'Khoảng 79.000–120.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/T%C3%BAi-k%E1%BA%B9p-n%C3%A1ch-n%E1%BB%AF-da-PU-d%C3%A1ng-retro-phong-c%C3%A1ch-Y2K-%C4%91i-ch%C6%A1i-d%E1%BA%A1o-ph%E1%BB%91-i.382910482.18482910482',
    description: 'Chất da PU bóng nhẹ, phom cứng cáp tạo điểm nhấn thời thượng.',
    shopName: 'Shop Yêu Thích',
    note: 'Vibe Y2K sang chảnh, mix cùng outfit đi chơi tối là hết nước chấm',
    styles: ['y2k', 'vintage', 'streetwear'],
    keywords: ['túi kẹp nách', 'túi xách', 'da pu', 'y2k', 'retro'],
  },
  {
    id: 'shoe-01',
    name: 'Giày sneaker trắng đế bánh mì 5cm',
    category: 'Giày',
    price: 185000,
    priceRange: 'Khoảng 165.000–245.000đ',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    directUrl: 'https://shopee.vn/Gi%C3%A0y-sneaker-n%E1%BB%AF-%C4%91%E1%BA%BF-b%C3%A1nh-m%C3%AC-%C4%91%E1%BB%99n-%C4%91%E1%BA%BF-5cm-m%C3%A0u-tr%E1%BA%AFng-phong-c%C3%A1ch-H%C3%A0n-Qu%E1%BB%91c-i.283910482.19382910482',
    description: 'Độn đế êm chân, tôn dáng hack chiều cao, màu trắng dễ phối đồ.',
    shopName: 'Shopee Mall',
    note: 'Đôi giày đa năng hợp với mọi outfit từ quần jean đến chân váy',
    styles: ['korean', 'casual', 'streetwear', 'preppy'],
    keywords: ['giày sneaker', 'giày thể thao', 'đế bánh mì', 'màu trắng', 'độn đế'],
  },
];

// Hàm tìm kiếm sản phẩm theo từ khóa, danh mục, phong cách và ngân sách
export function queryCatalog(params: {
  keyword?: string;
  category?: string;
  style?: string;
  maxPrice?: number;
  limit?: number;
}): CatalogProduct[] {
  const { keyword, category, style, maxPrice, limit = 4 } = params;

  let results = [...VERIFIED_PRODUCTS];

  if (category) {
    const catLower = category.toLowerCase();
    results = results.filter((p) => p.category.toLowerCase().includes(catLower));
  }

  if (style) {
    const styleLower = style.toLowerCase();
    results = results.filter((p) =>
      p.styles.some((s) => s.includes(styleLower) || styleLower.includes(s))
    );
  }

  if (maxPrice && maxPrice > 0) {
    results = results.filter((p) => p.price <= maxPrice);
  }

  if (keyword) {
    const kwLower = keyword.toLowerCase();
    results = results.filter((p) =>
      p.name.toLowerCase().includes(kwLower) ||
      p.description.toLowerCase().includes(kwLower) ||
      p.keywords.some((k) => kwLower.includes(k) || k.includes(kwLower))
    );
  }

  return results.slice(0, limit);
}
