'use client';

import { ProductItem, OutfitInfo } from '@/lib/types';
import { formatPrice } from '@/lib/shopee';

interface ProductCardProps {
  item: ProductItem;
  index: number;
}

interface ProductListProps {
  items: ProductItem[];
  outfitInfo?: OutfitInfo;
}

// Icon Shopee chuẩn
function ShopeeIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.5 7.05h-2.58A4.93 4.93 0 0 0 12 3a4.93 4.93 0 0 0-4.92 4.05H4.5A2.5 2.5 0 0 0 2 9.55v10.95A2.5 2.5 0 0 0 4.5 23h15a2.5 2.5 0 0 0 2.5-2.5V9.55a2.5 2.5 0 0 0-2.5-2.5zm-7.5-2.55a3.43 3.43 0 0 1 3.39 2.55H8.61A3.43 3.43 0 0 1 12 4.5zm7.5 16h-15a1 1 0 0 1-1-1V9.55a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1V19.5a1 1 0 0 1-1 1zm-5.74-7.46a2.49 2.49 0 0 0-1.76-.74h-1.5v1.5h1.5a.99.99 0 0 1 0 1.98h-1.5v1.5h1.5a2.49 2.49 0 0 0 1.76-.73 2.49 2.49 0 0 0 0-3.51z"/>
    </svg>
  );
}

// Icon tương ứng theo từng loại trang phục
function getCategoryIcon(category: string) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('quần') || cat.includes('jean') || cat.includes('trousers') || cat.includes('short')) {
    return '👖';
  }
  if (cat.includes('váy') || cat.includes('đầm') || cat.includes('skirt') || cat.includes('dress')) {
    return '👗';
  }
  if (cat.includes('áo') || cat.includes('shirt') || cat.includes('croptop') || cat.includes('hoodie')) {
    return '👚';
  }
  if (cat.includes('giày') || cat.includes('dép') || cat.includes('sneaker') || cat.includes('boots')) {
    return '👟';
  }
  if (cat.includes('túi') || cat.includes('balo') || cat.includes('ví') || cat.includes('bag')) {
    return '👜';
  }
  if (cat.includes('phụ kiện') || cat.includes('nón') || cat.includes('mũ') || cat.includes('kính')) {
    return '👒';
  }
  return '✨';
}

// Thẻ sản phẩm tối ưu dẫn trực tiếp đến trang tìm kiếm Shopee bán chạy
export function ProductCard({ item, index }: ProductCardProps) {
  const icon = getCategoryIcon(item.category);
  const targetUrl = item.searchUrl || item.directUrl;

  return (
    <div className="group bg-white hover:bg-pink-50/30 rounded-2xl border border-pink-100 hover:border-pink-300 p-3.5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Cột trái: Icon danh mục thời trang kèm số thứ tự */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 border border-pink-200/60 flex flex-col items-center justify-center shadow-xs">
        <span className="text-2xl sm:text-3xl select-none" role="img" aria-label={item.category}>
          {icon}
        </span>
        <div className="absolute -top-1.5 -left-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
          #{index + 1}
        </div>
      </div>

      {/* Cột giữa: Chi tiết sản phẩm, danh mục và mô tả */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100/70 text-pink-700 border border-pink-200/50">
              {item.category || 'Thời trang'}
            </span>
            <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
              {item.priceRange || formatPrice(item.price)}
            </span>
          </div>

          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-pink-600 transition-colors">
            {item.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
            {item.description || item.note}
          </p>
        </div>

        {/* Nút tìm kiếm trên Shopee */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 pt-2 border-t border-gray-100">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-3 py-1.5 rounded-xl shadow-xs hover:shadow-sm active:scale-95 transition-all"
          >
            <ShopeeIcon className="w-4 h-4 text-white" />
            <span>Xem sản phẩm trên Shopee</span>
            <span className="text-xs">↗</span>
          </a>

          <div className="text-[11px] text-gray-500 flex items-center gap-1">
            <span>Từ khóa:</span>
            <span className="font-medium text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
              {item.keyword || item.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Danh sách sản phẩm và tổng hợp outfit (nếu có)
export function ProductList({ items, outfitInfo }: ProductListProps) {
  if (!items || items.length === 0) return null;

  const isOutfit = outfitInfo?.isOutfit === true;
  const totalEstimated = items.reduce((sum, item) => sum + item.price, 0);
  const budget = outfitInfo?.totalBudget || 0;
  const isOverBudget = budget > 0 && totalEstimated > budget;
  const remaining = budget - totalEstimated;

  return (
    <div className="mt-3 space-y-2.5">
      {/* Danh sách từng sản phẩm */}
      <div className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <ProductCard key={item.id || index} item={item} index={index} />
        ))}
      </div>

      {/* Thẻ tổng kết ngân sách nếu là tư vấn phối đồ outfit */}
      {isOutfit && budget > 0 && (
        <div
          className={`rounded-2xl p-4 mt-3 border transition-colors ${
            isOverBudget
              ? 'bg-red-50 border-red-200'
              : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              💰 Tổng chi phí dự kiến cho outfit:
            </span>
            <span
              className={`text-base sm:text-lg font-bold ${
                isOverBudget ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {formatPrice(totalEstimated)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Ngân sách của bạn:</span>
            <span className="font-semibold text-gray-700">{formatPrice(budget)}</span>
          </div>

          <div
            className={`mt-2 pt-2 border-t text-xs font-semibold flex items-center gap-1.5 ${
              isOverBudget
                ? 'border-red-200 text-red-600'
                : 'border-green-200 text-green-600'
            }`}
          >
            {isOverBudget ? (
              <>⚠️ Vượt ngân sách {formatPrice(Math.abs(remaining))} — Bạn có muốn Stylie tìm sản phẩm giá mềm hơn không?</>
            ) : (
              <>✅ Nằm trong ngân sách! Bạn còn dư {formatPrice(remaining)} để mua thêm phụ kiện hoặc tiền ship nhé 🎉</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
