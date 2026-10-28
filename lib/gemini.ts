import { GoogleGenerativeAI } from '@google/generative-ai';
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

// Gửi tin nhắn và nhận phản hồi từ Gemini
export async function sendMessage(
  userMessage: string,
  history: GeminiMessage[]
): Promise<string> {
  const genAI = getGenAI();

  // Thử model gemini-flash-lite-latest trước (rất nhanh, ~1.5s), nếu lỗi thì fallback sang gemini-flash-latest
  const modelNames = ['gemini-flash-lite-latest', 'gemini-flash-latest'];
  let lastError: unknown;

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
        history: history,
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.warn(`Thử model ${modelName} thất bại, đang thử phương án tiếp theo:`, err);
      lastError = err;
    }
  }

  throw lastError;
}
