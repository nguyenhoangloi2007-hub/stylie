'use client';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled: boolean;
}

const SUGGESTED_QUESTIONS = [
  '👖 Gửi link quần Shopee phong cách Hàn Quốc',
  '👗 Tư vấn outfit đi học với ngân sách 400k',
  '🛍️ Tìm quần jeans ống rộng dưới 200k',
  '👚 Tìm áo sơ mi oversize trắng kem đi học',
  '✨ Tôi chưa biết phong cách của mình, hãy giúp tôi tìm hiểu',
  '🌸 Gợi ý chân váy chữ A phong cách tiểu thư Hàn',
];

export default function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div className="px-4 py-2">
      <p className="text-xs text-gray-400 mb-2 text-center">💡 Gợi ý câu hỏi nhanh</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            disabled={disabled}
            className="text-xs bg-white border border-pink-200 text-gray-600 hover:bg-pink-50 hover:border-pink-400 hover:text-pink-600 rounded-full px-3 py-1.5 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
