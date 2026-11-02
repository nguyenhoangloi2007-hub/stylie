import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const catalogPath = resolve(__dirname, '..', 'lib', 'productsData.ts');

async function test() {
  const content = readFileSync(catalogPath, 'utf-8');
  const blocks = [...content.matchAll(/id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?imageUrl:\s*'([^']+)'/g)];

  console.log(`Kiểm tra ${blocks.length} sản phẩm:`);
  const set = new Set();
  let ok = 0;

  for (const b of blocks) {
    const id = b[1];
    const name = b[2];
    const url = b[3];

    if (set.has(url)) {
      console.error(`❌ TRÙNG LẶP: ${id} trùng URL với sản phẩm khác: ${url}`);
    }
    set.add(url);

    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status === 200) {
        ok++;
        console.log(`✅ [200 OK] ${id}: "${name}"`);
      } else {
        console.error(`❌ [${res.status}] ${id}: ${url}`);
      }
    } catch (e) {
      console.error(`❌ [LỖI MẠNG] ${id}: ${e.message}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Kết quả HTTP 200 OK: ${ok}/${blocks.length}`);
  console.log(`Số ảnh độc nhất: ${set.size}/${blocks.length}`);
}

test();
