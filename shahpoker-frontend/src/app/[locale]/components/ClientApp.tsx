// FILE: shahpoker-frontend/src/app/[locale]/components/ClientApp.tsx
'use client';

// ما تمام کدهای دیگر را موقتاً غیرفعال می‌کنیم
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useTranslations } from 'next-intl';
// import LobbyPage from './LobbyPage';

export default function ClientApp() {
  // تمام منطق state و useEffect غیرفعال شده است
  return (
    <div className="container text-center">
      <h1 className="text-5xl font-bold">صفحه تست دیباگ</h1>
      <p className="mt-4">این یک تست برای بررسی کش است.</p>

      <div className="mt-8 p-4 border-2 border-yellow-500 rounded-lg text-left font-mono text-xs">
        <h3 className="font-bold text-yellow-500 text-sm mb-2">-- DEBUG INFO --</h3>
        <p>اگر این کادر را می‌بینید، یعنی فایل با موفقیت آپدیت شده است.</p>
      </div>
    </div>
  );
}

// declare global { ... } // این بخش نیازی به تغییر ندارد