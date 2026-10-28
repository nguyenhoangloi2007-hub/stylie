'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Message, GeminiMessage } from '@/lib/types';
import { parseStylieProducts } from '@/lib/shopee';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import SuggestedQuestions from '@/components/SuggestedQuestions';

// Tin nhắn chào mừng ban đầu của Stylie
const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Xin chào! Tôi là Stylie — trợ lý AI tư vấn thời trang và gợi ý sản phẩm trên Shopee.\n\nTôi có thể hỗ trợ bạn:\n- Tìm kiếm các món đồ thời trang (quần jeans, áo sơ mi, chân váy, v.v.) theo phong cách và ngân sách\n- Gợi ý phối trọn bộ outfit phù hợp cho từng dịp (đi học, đi chơi, đi làm)\n- Cung cấp link sản phẩm trực tiếp trên Shopee để bạn tham khảo\n\nBạn đang cần tìm trang phục gì hay muốn tư vấn phong cách nào hôm nay?',
  timestamp: new Date(),
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geminiHistory, setGeminiHistory] = useState<GeminiMessage[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Gửi tin nhắn
  const handleSend = async (messageText?: string) => {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;

    setInput('');
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
      content: text,
      timestamp: new Date(),
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

      // Cập nhật lịch sử Gemini (dùng rawResponse để AI ghi nhớ đầy đủ)
      setGeminiHistory((prev) => [
        ...prev,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: rawResponse }] },
      ]);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Đã có lỗi kết nối. Vui lòng thử lại.';
      setError(errorMsg);

      // Giữ tin nhắn người dùng để thử lại
      setInput(text);
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
              <p className="text-xs text-gray-400">AI tư vấn thời trang nữ & sản phẩm Shopee thật</p>
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
                    if (input) handleSend();
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

          {/* Input area */}
          <div className="flex items-end gap-3 px-4 py-3">
            <div className="flex-1 bg-gray-50 border border-pink-200 rounded-2xl flex items-end gap-2 px-4 py-2.5 focus-within:border-purple-400 focus-within:bg-white transition-all duration-200 shadow-sm">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustTextareaHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Nhắn tin với Stylie... (Enter để gửi, Shift+Enter xuống dòng)"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none outline-none max-h-[120px] leading-relaxed disabled:opacity-50"
              />
            </div>

            {/* Nút gửi */}
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 bg-gradient-to-br from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center active:scale-95 flex-shrink-0"
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
            Stylie AI • Sản phẩm và liên kết trực tiếp trên Shopee Việt Nam
          </p>
        </div>
      </div>
    </div>
  );
}
