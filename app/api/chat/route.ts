import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/gemini';
import { GeminiMessage } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history: GeminiMessage[];
    };

    // Kiểm tra đầu vào
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Tin nhắn không được để trống.' },
        { status: 400 }
      );
    }

    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            'Chưa cấu hình Gemini API key. Vui lòng thêm GEMINI_API_KEY vào file .env.local và khởi động lại server.',
        },
        { status: 503 }
      );
    }

    // Gửi tin nhắn tới Gemini
    const response = await sendMessage(message.trim(), history || []);

    return NextResponse.json({ response });
  } catch (error: unknown) {
    console.error('Lỗi Chat API:', error);

    // Xử lý các lỗi cụ thể từ Gemini
    const errorMessage =
      error instanceof Error ? error.message : 'Đã có lỗi không xác định.';

    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'API key không hợp lệ. Vui lòng kiểm tra lại GEMINI_API_KEY.' },
        { status: 401 }
      );
    }

    if (errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: 'Đã vượt giới hạn sử dụng API. Vui lòng thử lại sau ít phút.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.' },
      { status: 500 }
    );
  }
}
