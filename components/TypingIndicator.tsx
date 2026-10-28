'use client';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      {/* Avatar Stylie */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0">
        ✨
      </div>

      {/* Bubble đang gõ */}
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-pink-100 flex items-center gap-1.5">
        <span className="text-xs text-gray-400 mr-1">Stylie đang trả lời</span>
        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
