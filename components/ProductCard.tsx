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

// Thẻ sản phẩm ngang chuẩn theo mẫu giao diện ChatGPT / Shopee
export function ProductCard({ item, index }: ProductCardProps) {
  return (
    <div className="group bg-white hover:bg-pink-50/40 rounded-2xl border border-pink-100 hover:border-pink-300 p-3 shadow-sm hover:shadow-md transition-all duration-200 flex gap-3.5 items-center">
      {/* Cột trái: Hình ảnh thật của sản phẩm */}
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
          #{index + 1}
        </div>
      </div>

      {/* Cột phải: Thông tin chi tiết + link Shopee trực tiếp */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          {/* Tên sản phẩm đánh số */}
          <h3 className="font-bold text-gray-800 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {index + 1}. {item.name}
          </h3>

          {/* Khoảng giá */}
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
            {item.priceRange || formatPrice(item.price)}
          </p>

          {/* Mô tả ngắn / điểm nổi bật */}
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {item.description || item.note}
          </p>
        </div>

        {/* Nút link trực tiếp đến Shopee */}
        <div className="flex flex-wrap items-center gap-2 mt-2 pt-1 border-t border-gray-100">
          <a
            href={item.directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline active:scale-95 transition-transform"
          >
            <span>Xem sản phẩm trên Shopee</span>
            <span className="text-xs">↗</span>
          </a>

          {/* Badge nhãn hiệu Shopee */}
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
            <ShopeeIcon className="w-3 h-3 text-orange-500" />
            {item.shopName || 'Shopee Việt Nam'}
          </span>
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
