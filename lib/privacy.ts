/**
 * Module nhận diện và cảnh báo các dãy số nhạy cảm / đáng ngờ:
 * - Căn cước công dân (12 chữ số)
 * - Số điện thoại Việt Nam (10 chữ số, bắt đầu bằng số 0 hoặc +84)
 * - Mã sinh viên (10 chữ số hoặc có tiền tố MSSV/SV)
 * - CMND cũ (9 chữ số)
 * - Số thẻ ngân hàng / tài khoản (13-19 chữ số)
 * - Các dãy số đáng ngờ khác (từ 9 đến 16 số liên tục không phải giá tiền)
 */

export interface SensitiveNumberMatch {
  type: 'cccd' | 'phone' | 'student_id' | 'bank_card' | 'suspicious';
  typeName: string;
  matchedText: string;
  maskedText: string;
}

// Che bớt các chữ số ở giữa để bảo vệ dữ liệu cá nhân
export function maskSensitiveNumber(numStr: string): string {
  const digitsOnly = numStr.replace(/\D/g, '');
  if (digitsOnly.length <= 4) return numStr;
  const first = digitsOnly.slice(0, 3);
  const last = digitsOnly.slice(-3);
  return `${first}${'•'.repeat(Math.max(4, digitsOnly.length - 6))}${last}`;
}

// Kiểm tra xem một vị trí số có phải là giá tiền / ngân sách không
function isPriceOrBudget(rawText: string, matchIndex: number, matchLength: number): boolean {
  const afterMatch = rawText.slice(matchIndex + matchLength, matchIndex + matchLength + 15).toLowerCase();
  const beforeMatch = rawText.slice(Math.max(0, matchIndex - 15), matchIndex).toLowerCase();

  // Kiểm tra hậu tố tiền tệ: đ, vnd, vnđ, k, đồng, triệu, nghìn, ngàn, cành, củ
  if (/^\s*(?:đ|vnd|vnđ|k|đồng|dong|nghìn|ngàn|triệu|trieu|cành|củ)\b/i.test(afterMatch)) {
    return true;
  }

  // Kiểm tra tiền tố tiền tệ: giá, ngân sách, tầm, khoảng, dưới
  if (/(?:giá|ngân sách|tầm|khoảng|budget|tiền|chi phí)\s*[:=]?\s*$/i.test(beforeMatch)) {
    // Nếu có tiền tố giá tiền và số kết thúc bằng 000 hoặc 000000 thì là giá tiền
    return true;
  }

  return false;
}

/**
 * Quét chuỗi văn bản để tìm các dãy số nhạy cảm
 */
export function detectSensitiveNumbers(text: string): SensitiveNumberMatch | null {
  if (!text || typeof text !== 'string') return null;

  // 1. Loại bỏ các URL http/https để tránh bắt nhầm ID sản phẩm trong link
  const cleanText = text.replace(/https?:\/\/[^\s]+/gi, ' [URL] ');

  // 2. Nhận diện Số điện thoại Việt Nam:
  // - 10 chữ số bắt đầu bằng số 0 (có thể có khoảng trắng, dấu chấm hoặc gạch ngang)
  // - Hoặc đầu số quốc tế +84 theo sau bởi 9 chữ số
  const phoneRegex = /(?:\+84|0)(?:[\s.-]?\d){9}\b/g;
  let match: RegExpExecArray | null;
  while ((match = phoneRegex.exec(cleanText)) !== null) {
    const rawMatch = match[0];
    const digits = rawMatch.replace(/\D/g, '');
    // Chuẩn hoá: nếu có +84 thì tương đương số bắt đầu từ 0
    if ((digits.startsWith('0') && digits.length === 10) || (digits.startsWith('84') && digits.length === 11)) {
      return {
        type: 'phone',
        typeName: 'Số điện thoại',
        matchedText: rawMatch,
        maskedText: maskSensitiveNumber(rawMatch),
      };
    }
  }

  // 3. Nhận diện Căn cước công dân (CCCD - 12 chữ số):
  // Ví dụ: 001201002345 hoặc 001 201 002 345, 001.201.002.345
  const cccdRegex = /\b(?:\d[\s.-]?){12}\b/g;
  while ((match = cccdRegex.exec(cleanText)) !== null) {
    const rawMatch = match[0];
    const digits = rawMatch.replace(/\D/g, '');
    if (digits.length === 12) {
      if (!isPriceOrBudget(cleanText, match.index, rawMatch.length)) {
        return {
          type: 'cccd',
          typeName: 'Căn cước công dân (CCCD)',
          matchedText: rawMatch,
          maskedText: maskSensitiveNumber(rawMatch),
        };
      }
    }
  }

  // 4. Nhận diện Mã số sinh viên (MSSV):
  // Có tiền tố như mssv, mã sv, mã sinh viên
  const labeledStudentRegex = /(?:mssv|mã\s+sinh\s+viên|mã\s+sv|sv)\s*[:=]?\s*([a-zA-Z0-9]{7,12})\b/gi;
  const labeledMatch = labeledStudentRegex.exec(cleanText);
  if (labeledMatch && labeledMatch[1]) {
    const idVal = labeledMatch[1];
    return {
      type: 'student_id',
      typeName: 'Mã số sinh viên',
      matchedText: idVal,
      maskedText: maskSensitiveNumber(idVal),
    };
  }

  // Mã sinh viên dạng số độc lập (10 chữ số, không bắt đầu bằng 0 để tránh trùng SĐT, và không phải giá tiền)
  const student10Regex = /\b[1-9]\d{9}\b/g;
  while ((match = student10Regex.exec(cleanText)) !== null) {
    const rawMatch = match[0];
    if (!isPriceOrBudget(cleanText, match.index, rawMatch.length)) {
      return {
        type: 'student_id',
        typeName: 'Mã số sinh viên hoặc dãy số định danh (10 số)',
        matchedText: rawMatch,
        maskedText: maskSensitiveNumber(rawMatch),
      };
    }
  }

  // 5. Nhận diện Số thẻ ngân hàng / tài khoản (13 đến 19 chữ số):
  const bankCardRegex = /\b(?:\d[\s.-]?){13,19}\b/g;
  while ((match = bankCardRegex.exec(cleanText)) !== null) {
    const rawMatch = match[0];
    const digits = rawMatch.replace(/\D/g, '');
    if (digits.length >= 13 && digits.length <= 19) {
      if (!isPriceOrBudget(cleanText, match.index, rawMatch.length)) {
        return {
          type: 'bank_card',
          typeName: 'Số thẻ hoặc tài khoản ngân hàng',
          matchedText: rawMatch,
          maskedText: maskSensitiveNumber(rawMatch),
        };
      }
    }
  }

  // 6. Nhận diện CMND cũ (9 chữ số):
  const cmndRegex = /\b\d{9}\b/g;
  while ((match = cmndRegex.exec(cleanText)) !== null) {
    const rawMatch = match[0];
    if (!isPriceOrBudget(cleanText, match.index, rawMatch.length)) {
      return {
        type: 'suspicious',
        typeName: 'Dãy số định danh cá nhân (9 số)',
        matchedText: rawMatch,
        maskedText: maskSensitiveNumber(rawMatch),
      };
    }
  }

  return null;
}

/**
 * Tạo câu trả lời cảnh báo an toàn thông tin cá nhân
 */
export function generatePrivacyWarningResponse(match: SensitiveNumberMatch): string {
  return `Tôi nhận thấy trong tin nhắn của bạn có chứa một dãy số đáng chú ý: **\`${match.maskedText}\`** (có định dạng tương tự **${match.typeName}**).

Bạn có thể cho tôi biết bạn đang nhập dãy số đó là số gì và nhằm mục đích gì không?

⚠️ **CẢNH BÁO AN TOÀN VÀ BẢO VỆ DỮ LIỆU CÁ NHÂN:**
Bạn tuyệt đối **KHÔNG NÊN cung cấp thông tin cá nhân nhạy cảm** (như số Căn cước công dân, số điện thoại, mã sinh viên, số tài khoản ngân hàng, mật khẩu...) cho tôi hay bất kỳ chatbot AI nào trên internet:
1. **Bảo mật quyền riêng tư:** Stylie là trợ lý AI hỗ trợ tư vấn thời trang và gợi ý sản phẩm, hoàn toàn **không cần** và **không có quyền** thu thập hay lưu trữ thông tin định danh cá nhân của bạn.
2. **Phòng tránh rủi ro:** Việc chia sẻ dữ liệu nhạy cảm trên các nền tảng trực tuyến có thể tiềm ẩn nguy cơ bị lộ lọt thông tin hoặc bị kẻ xấu lợi dụng.

Bạn hãy kiểm tra lại và yên tâm rằng tôi không lưu trữ dãy số này. Nếu bạn cần tôi tư vấn phối đồ, tìm kiếm trang phục trên Shopee hoặc trò chuyện về bất kỳ chủ đề nào khác, hãy tiếp tục nhắn mà không cần gửi các thông tin cá nhân nhé!`;
}
