import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { STYLIE_SYSTEM_PROMPT } from './prompts';
import { GeminiMessage } from './types';

// Khởi tạo Gemini AI client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm vào file .env.local');
  }
  return new GoogleGenerativeAI(apiKey);
};

// Gửi tin nhắn và nhận phản hồi từ Gemini (hỗ trợ văn bản và hình ảnh đính kèm)
export async function sendMessage(
  userMessage: string,
  history: GeminiMessage[],
  image?: { data: string; mimeType: string }
): Promise<string> {
  const genAI = getGenAI();

  // Thử model gemini-flash-lite-latest trước (rất nhanh, ~1.5s), nếu lỗi thì fallback sang gemini-flash-latest
  const modelNames = ['gemini-flash-lite-latest', 'gemini-flash-latest'];
  let lastError: unknown;

  // Chuẩn bị payload parts cho tin nhắn hiện tại
  const parts: (string | Part)[] = [];

  if (image && image.data && image.mimeType) {
    parts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: image.data,
      },
    });
  }

  const promptText = userMessage.trim() || 'Hãy phân tích chi tiết hình ảnh trang phục này: phong cách, các món đồ trong set, cách phối và gợi ý các sản phẩm tương tự hoặc phù hợp trên Shopee giúp tôi.';
  parts.push(promptText);

  // Làm sạch lịch sử hội thoại để tương thích tối đa với Gemini SDK
  const formattedHistory = history.map((h) => ({
    role: h.role,
    parts: h.parts.map((p) => {
      if ('text' in p) {
        return { text: p.text };
      }
      return {
        inlineData: {
          mimeType: p.inlineData.mimeType,
          data: p.inlineData.data,
        },
      };
    }),
  }));

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: STYLIE_SYSTEM_PROMPT,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });

      // Khởi tạo chat với lịch sử hội thoại
      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(parts);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn(`Thử model ${modelName} thất bại, đang thử phương án tiếp theo:`, err);
      lastError = err;
    }
  }

  throw lastError;
}
