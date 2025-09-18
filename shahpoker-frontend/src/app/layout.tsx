// FILE: shahpoker-frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // <<<< این خط را اضافه کنید

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shah Poker",
  description: "Shah Poker Telegram Mini App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* این اسکریپت برای ارتباط با اپلیکیشن تلگرام ضروری است */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}