'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, GeminiMessage, AttachedImage, GeminiPart } from '@/lib/types';
import { parseStylieProducts } from '@/lib/shopee';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import SuggestedQuestions from '@/components/SuggestedQuestions';

// Tin nhắn chào mừng ban đầu của Stylie
const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Xin chào! Tôi là Stylie — trợ lý AI tư vấn thời trang và gợi ý sản phẩm trên Shopee.\n\nTôi có thể hỗ trợ bạn:\n- Tìm kiếm các món đồ thời trang (quần jeans, áo sơ mi, chân váy, v.v.) theo phong cách và ngân sách\n- Gợi ý phối trọn bộ outfit phù hợp cho từng dịp (đi học, đi chơi, đi làm)\n- 📸 **Đọc và nhận diện hình ảnh trang phục:** Bạn có thể tải lên ảnh hoặc dán ảnh (Ctrl+V), tôi sẽ phân tích outfit và tìm các món đồ tương tự trên Shopee\n- Cung cấp link tìm kiếm Shopee trực tiếp để bạn tham khảo\n\nBạn đang cần tìm trang phục gì hay muốn gửi ảnh nào để tôi xem qua không?',
  timestamp: new Date(),
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [attachedImage, setAttachedImage] = useState<AttachedImage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geminiHistory, setGeminiHistory] = useState<GeminiMessage[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Tự động điều chỉnh chiều cao textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  // Xử lý chọn ảnh từ máy
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chỉ tải lên tệp định dạng hình ảnh (PNG, JPG, WebP...).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('Dung lượng ảnh tối đa là 8MB. Vui lòng chọn ảnh nhẹ hơn.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setAttachedImage({
        data: base64Data,
        mimeType: file.type,
        previewUrl: result,
      });
      setError(null);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Hỗ trợ dán ảnh trực tiếp từ clipboard (Ctrl+V)
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const base64Data = result.split(',')[1];
            setAttachedImage({
              data: base64Data,
              mimeType: file.type,
              previewUrl: result,
            });
            setError(null);
          };
          reader.readAsDataURL(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  // Gửi tin nhắn và hình ảnh
  const handleSend = async (messageText?: string) => {
    const text = (messageText || input).trim();
    const currentImage = attachedImage;

    // Kiểm tra: phải có ít nhất tin nhắn hoặc ảnh đính kèm
    if ((!text && !currentImage) || isLoading) return;

    setInput('');
    setAttachedImage(null);
    setError(null);
    setShowSuggestions(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Thêm tin nhắn người dùng vào UI
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text || (currentImage ? 'Tìm giúp mình các sản phẩm tương tự outfit trong ảnh này nhé!' : ''),
      timestamp: new Date(),
      image: currentImage?.previewUrl,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Gửi tin nhắn tới API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: geminiHistory,
          image: currentImage
            ? {
                data: currentImage.data,
                mimeType: currentImage.mimeType,
              }
            : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đã có lỗi xảy ra');
      }

      const rawResponse: string = data.response;

      // Phân tích phản hồi AI — tách block STYLIE_PRODUCTS
      const { cleanContent, products, outfitInfo } = parseStylieProducts(rawResponse);

      // Thêm tin nhắn AI vào UI
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanContent,
        timestamp: new Date(),
        products: products.length > 0 ? products : undefined,
        outfitInfo,
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Cập nhật lịch sử Gemini
      const userHistoryParts: GeminiPart[] = [];
      if (currentImage) {
        userHistoryParts.push({
          inlineData: {
            mimeType: currentImage.mimeType,
            data: currentImage.data,
          },
        });
      }
      userHistoryParts.push({
        text: text || 'Phân tích hình ảnh trang phục này và gợi ý sản phẩm phù hợp trên Shopee giúp tôi.',
      });

      setGeminiHistory((prev) => [
        ...prev,
        { role: 'user', parts: userHistoryParts },
        { role: 'model', parts: [{ text: rawResponse }] },
      ]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Đã có lỗi kết nối. Vui lòng thử lại.';
      setError(errorMsg);

      // Giữ lại tin nhắn và ảnh nếu có lỗi để người dùng dễ thử lại
      setInput(text);
      if (currentImage) setAttachedImage(currentImage);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý phím Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Bắt đầu cuộc trò chuyện mới
  const handleNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setGeminiHistory([]);
    setInput('');
    setAttachedImage(null);
    setError(null);
    setShowSuggestions(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* ===== HEADER ===== */}
      <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-lg shadow-md">
              ✨
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Stylie
              </h1>
              <p className="text-xs text-gray-400">AI tư vấn thời trang nữ & tìm kiếm Shopee thông minh</p>
            </div>
          </div>

          {/* Nút bắt đầu lại */}
          <button
            onClick={handleNewChat}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-pink-500 bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-pink-200 px-3 py-2 rounded-full transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Cuộc trò chuyện mới
          </button>
        </div>
      </header>

      {/* ===== KHU VỰC CHAT ===== */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-0">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Typing indicator */}
          {isLoading && <TypingIndicator />}

          {/* Thông báo lỗi */}
          {error && (
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-sm flex-shrink-0">
                ⚠️
              </div>
              <div className="bg-red-50 border border-red-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-sm text-red-600 font-medium mb-1">Đã có lỗi xảy ra</p>
                <p className="text-xs text-red-500">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    if (input || attachedImage) handleSend();
                  }}
                  className="mt-2 text-xs text-red-600 underline hover:no-underline"
                >
                  Thử lại
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* ===== KHU VỰC NHẬP TIN NHẮN ===== */}
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-md border-t border-pink-100 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {/* Gợi ý câu hỏi nhanh */}
          {showSuggestions && (
            <SuggestedQuestions
              onSelect={(q) => {
                setInput(q);
                handleSend(q);
              }}
              disabled={isLoading}
            />
          )}

          {/* Khung xem trước ảnh đính kèm */}
          {attachedImage && (
            <div className="mx-4 mt-2 p-2 bg-pink-50/80 border border-pink-200 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={attachedImage.previewUrl}
                  alt="Xem trước ảnh trang phục"
                  className="w-12 h-12 object-cover rounded-xl border border-pink-300 shadow-inner flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                    <span>📸</span> Đã đính kèm ảnh trang phục
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    Stylie sẽ đọc outfit trong ảnh và tìm các món đồ tương tự trên Shopee
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="w-7 h-7 rounded-full bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 flex items-center justify-center transition-colors flex-shrink-0 text-xs font-bold"
                title="Hủy bỏ ảnh"
              >
                ✕
              </button>
            </div>
          )}

          {/* Input area */}
          <div className="flex items-end gap-2.5 px-4 py-3">
            {/* Input file ẩn */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Nút bấm tải ảnh */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-11 h-11 rounded-2xl bg-gray-50 hover:bg-pink-100 text-gray-600 hover:text-pink-600 border border-pink-200 flex items-center justify-center transition-all duration-150 flex-shrink-0 active:scale-95 disabled:opacity-40"
              title="Tải lên ảnh trang phục (hoặc dán Ctrl+V trực tiếp)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            {/* Khung gõ tin nhắn */}
            <div className="flex-1 bg-gray-50 border border-pink-200 rounded-2xl flex items-end gap-2 px-4 py-2.5 focus-within:border-purple-400 focus-within:bg-white transition-all duration-200 shadow-sm">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={attachedImage ? "Thêm yêu cầu (ví dụ: tìm đồ giá hạt dẻ, đổi màu áo...)" : "Nhắn tin hoặc dán ảnh (Ctrl+V) để Stylie tư vấn..."}
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none outline-none max-h-[120px] leading-relaxed disabled:opacity-50"
              />
            </div>

            {/* Nút gửi */}
            <button
              onClick={() => handleSend()}
              disabled={isLoading || (!input.trim() && !attachedImage)}
              className="w-11 h-11 bg-gradient-to-br from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-2xl shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center active:scale-95 flex-shrink-0"
              title="Gửi"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 pb-2">
            Stylie AI • Nhận diện phong cách qua hình ảnh & tìm kiếm Shopee Việt Nam
          </p>
        </div>
      </div>
    </div>
  );
}
