'use client';

import { Message } from '@/lib/types';
import { ProductList } from './ProductCard';

interface MessageBubbleProps {
  message: Message;
}

// Hàm format markdown đơn giản → HTML
function formatMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-pink-50 text-pink-700 px-1 rounded text-xs">$1</code>')
    .replace(/\n/g, '<br/>');
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[85%] sm:max-w-[70%]">
          <div className="bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <p suppressHydrationWarning className="text-xs text-gray-400 text-right mt-1 mr-1">{time}</p>
        </div>
      </div>
    );
  }

  // Tin nhắn của Stylie (AI)
  return (
    <div className="flex items-start gap-3 mb-5">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-base shadow-md flex-shrink-0 mt-0.5">
        ✨
      </div>

      <div className="max-w-[92%] sm:max-w-[80%] flex-1">
        {/* Tên */}
        <span className="text-xs font-semibold text-purple-600 ml-1 mb-1 block">Stylie</span>

        {/* Nội dung tin nhắn */}
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-md border border-pink-100">
          <div
            className="text-sm text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
          />

          {/* Hiển thị danh sách sản phẩm Shopee trực tiếp */}
          {message.products && message.products.length > 0 && (
            <ProductList
              items={message.products}
              outfitInfo={message.outfitInfo}
            />
          )}
        </div>

        <p suppressHydrationWarning className="text-xs text-gray-400 mt-1 ml-1">{time}</p>
      </div>
    </div>
  );
}
