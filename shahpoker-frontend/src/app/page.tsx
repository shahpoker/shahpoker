// FILE: shahpoker-frontend/src/app/page.tsx
'use client'; // این خط برای استفاده از هوک‌های ری‌اکت ضروری است

import { useEffect, useState } from 'react';
import axios from 'axios';

// این یک رابط TypeScript برای تعریف ساختار داده‌های کاربر تلگرام است
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export default function HomePage() {
  const [status, setStatus] = useState('در حال اتصال...');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // این تابع بلافاصله پس از بارگذاری صفحه اجرا می‌شود
    const authenticateUser = async () => {
      // برای تست در مرورگر، یک کاربر تلگرام را شبیه‌سازی می‌کنیم
      // در محیط واقعی تلگرام، این اطلاعات به صورت خودکار توسط اسکریپت تلگرام مقداردهی می‌شود
      const tgData = window.Telegram?.WebApp?.initDataUnsafe?.user;
      
      const mockUser: TelegramUser = {
        id: 12345678,
        first_name: 'Test User',
        username: 'test_user_browser',
        photo_url: 'https://via.placeholder.com/150'
      };

      const userToAuth = tgData || mockUser;

      if (!userToAuth) {
        setError('اطلاعات کاربری تلگرام یافت نشد. لطفاً اپ را از داخل تلگرام باز کنید.');
        setStatus('خطا در احراز هویت');
        return;
      }

      try {
        setStatus('در حال احراز هویت با سرور...');
        const response = await axios.post('http://localhost:3000/auth/telegram', {
          id: userToAuth.id,
          first_name: userToAuth.first_name,
          username: userToAuth.username,
          photo_url: userToAuth.photo_url,
        });

        // توکن و اطلاعات کاربر را در کنسول نمایش می‌دهیم
        console.log('Authentication successful:', response.data);
        
        // TODO: توکن را در یک state سراسری ذخیره کن
        const { access_token, user } = response.data;
        setUserData(user);
        setStatus(`خوش آمدی، ${user.nickname}!`);

      } catch (err: any) {
        console.error('Authentication failed:', err);
        setError(err.message || 'یک خطای ناشناخته رخ داد.');
        setStatus('اتصال با سرور برقرار نشد');
      }
    };

    authenticateUser();
  }, []); // [] یعنی این افکت فقط یک بار پس از رندر اولیه اجرا شود

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="container text-center">
        <h1 className="text-5xl font-bold">شاه پوکر</h1>
        <p className="mt-4 text-xl text-gray-400">{status}</p>
        {error && <p className="mt-2 text-red-500">خطا: {error}</p>}
        {userData && (
          <div className="mt-8 p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl">اطلاعات شما</h2>
            <pre className="mt-2 text-left text-sm whitespace-pre-wrap">
              {JSON.stringify(userData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}

// این بخش برای جلوگیری از خطای TypeScript لازم است چون آبجکت تلگرام در window تعریف نشده
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: TelegramUser;
        };
      };
    };
  }
}