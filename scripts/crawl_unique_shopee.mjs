import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const catalogPath = resolve(__dirname, '..', 'lib', 'productsData.ts');

// Query cụ thể, khác biệt cho từng sản phẩm
const ITEMS = [
  { id: 'top-tre-vai-01', query: 'áo trễ vai dệt kim tay dài nữ shopee' },
  { id: 'top-tre-vai-02', query: 'áo trễ vai voan nhún bèo tiểu thư nữ shopee' },
  { id: 'top-croptop-01', query: 'áo croptop 2 dây len dệt kim ôm body nữ shopee' },
  { id: 'top-babytee-01', query: 'áo thun baby tee nữ in chữ y2k thun gân shopee' },
  { id: 'top-tee-oversize-01', query: 'áo phông oversize nữ tay lỡ form rộng ulzzang shopee' },
  { id: 'top-somi-01', query: 'áo sơ mi trắng nữ form rộng công sở basic shopee' },
  { id: 'top-somi-croptop-02', query: 'áo sơ mi croptop caro tay phồng nữ shopee' },
  { id: 'top-blazer-01', query: 'áo blazer vest nữ form rộng 2 lớp hàn quốc shopee' },
  { id: 'top-cardigan-01', query: 'áo cardigan len mỏng pastel cài cúc nữ shopee' },
  { id: 'top-hoodie-01', query: 'áo hoodie nỉ bông form rộng có mũ nữ shopee' },
  { id: 'bottom-jean-01', query: 'quần jean nữ ống rộng cạp cao xanh nhạt shopee' },
  { id: 'bottom-jean-02', query: 'quần bò ống suông retro wash vintage nữ shopee' },
  { id: 'bottom-jean-cargo-03', query: 'quần jean nữ túi hộp cargo cá tính shopee' },
  { id: 'bottom-quan-au-01', query: 'quần tây nữ ống suông cạp cao tuyết mưa xếp ly shopee' },
  { id: 'bottom-jogger-01', query: 'quần jogger nữ nỉ thể thao bo gấu cạp chun shopee' },
  { id: 'bottom-short-01', query: 'quần sooc bò short jean nữ cạp cao rách gấu shopee' },
  { id: 'bottom-flare-01', query: 'quần ống loe nữ cạp cao vải thun co giãn hack dáng shopee' },
  { id: 'skirt-tennis-01', query: 'chân váy tennis xếp ly ngắn có quần trong shopee' },
  { id: 'skirt-jean-01', query: 'chân váy jean dài xẻ tà trước denim ulzzang shopee' },
  { id: 'skirt-chua-01', query: 'chân váy chữ a dáng dài qua gối công sở shopee' },
  { id: 'dress-hoa-nhi-01', query: 'váy hoa nhí dáng dài vintage cổ v tay bồng shopee' },
  { id: 'dress-babydoll-01', query: 'váy đầm babydoll trắng tiểu thư xòe bồng shopee' },
  { id: 'dress-bodycon-01', query: 'đầm bodycon cổ yếm hở lưng dự tiệc ôm sát shopee' },
  { id: 'shoe-sneaker-01', query: 'giày thể thao sneaker trắng nữ đế bánh mì 5cm shopee' },
  { id: 'shoe-maryjane-01', query: 'giày mary jane nữ da bóng vintage tiểu thư shopee' },
  { id: 'bag-tote-01', query: 'túi tote vải canvas nữ đeo vai đi học shopee' },
  { id: 'bag-kep-nach-01', query: 'túi kẹp nách nữ da pu trơn retro y2k shopee' },
];

async function findDistinctShopeeImage(query, usedUrls) {
  const searchUrls = [
    `https://www.bing.com/images/search?q=${encodeURIComponent('site:shopee.vn ' + query)}&form=HDRSC2&first=1`,
    `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2&first=1`
  ];

  for (const sUrl of searchUrls) {
    try {
      const res = await fetch(sUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept-Language': 'vi-VN,vi;q=0.9,en;q=0.8'
        }
      });
      if (!res.ok) continue;
      const html = await res.text();
      const murls = [...html.matchAll(/&quot;murl&quot;:&quot;([^&]+)&quot;/g)].map(m => m[1]);

      // Lọc các URL Shopee CDN
      const candidates = murls.filter(u =>
        (u.includes('susercontent.com') || u.includes('cf.shopee.vn/file/')) &&
        !u.includes('logo') && !u.includes('icon')
      );

      for (const imgUrl of candidates) {
        // CHƯA TỪNG ĐƯỢC DÙNG CHO SẢN PHẨM KHÁC
        if (usedUrls.has(imgUrl)) continue;

        try {
          const head = await fetch(imgUrl, { method: 'HEAD' });
          if (head.status === 200) {
            usedUrls.add(imgUrl);
            return imgUrl;
          }
        } catch (_) {}
      }
    } catch (_) {}
  }

  return null;
}

async function run() {
  console.log('=== CẬP NHẬT 27 ẢNH SHOPEE ĐỘC BẢN (KHÔNG TRÙNG LẶP, HTTP 200) ===\n');

  let fileContent = readFileSync(catalogPath, 'utf-8');
  const usedUrls = new Set();
  const finalMap = {};

  for (let i = 0; i < ITEMS.length; i++) {
    const item = ITEMS[i];
    console.log(`[${i + 1}/${ITEMS.length}] ${item.id} ("${item.query}")`);

    const img = await findDistinctShopeeImage(item.query, usedUrls);
    if (img) {
      console.log(`    ✅ ${img}`);
      finalMap[item.id] = img;

      const idEscaped = item.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const itemBlockRegex = new RegExp(
        `(id:\\s*'${idEscaped}'[\\s\\S]*?imageUrl:\\s*')([^']*)(')`,
        'g'
      );
      fileContent = fileContent.replace(itemBlockRegex, `$1${img}$3`);
    } else {
      console.log(`    ❌ Không tìm thấy ảnh riêng`);
    }

    await new Promise(r => setTimeout(r, 600));
  }

  writeFileSync(catalogPath, fileContent, 'utf-8');
  writeFileSync(resolve(__dirname, 'verified_unique_shopee.json'), JSON.stringify(finalMap, null, 2), 'utf-8');

  console.log('\n==============================================');
  console.log(`KẾT QUẢ: Đã gán ${Object.keys(finalMap).length}/27 ảnh Shopee ĐỘC NHẤT (không trùng nhau)!`);
  console.log(`Tổng số URL độc nhất trong Set: ${usedUrls.size}`);
}

run().catch(console.error);
