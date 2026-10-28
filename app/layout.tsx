import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Stylie ✨ — AI Tư Vấn Thời Trang Nữ',
  description:
    'Chatbot AI tư vấn phong cách trang phục nữ cá nhân hóa theo ngân sách, kết hợp tìm kiếm sản phẩm trên Shopee Việt Nam.',
  keywords: ['thời trang nữ', 'tư vấn phong cách', 'Shopee', 'AI chatbot', 'Gen Z'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
