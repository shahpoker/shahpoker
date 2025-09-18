// FILE: shahpoker-frontend/src/app/[locale]/components/LobbyPage.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';

interface Table {
  id: string;
  name: string;
  gameType: string;
  size: number;
  smallBlind: number;
  bigBlind: number;
  seats: any[]; // فعلاً ساده نگه می‌داریم
}

export default function LobbyPage({ token }: { token: string }) {
  const t = useTranslations('LobbyPage');
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTables = async () => {
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:3000/tables', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTables(response.data);
      } catch (err) {
        setError(t('error_fetching_tables'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTables();
  }, [token, t]);

  if (isLoading) {
    return <p>{t('loading')}</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full max-w-4xl p-4">
      <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-4">{t('table_name')}</th>
              <th className="p-4">{t('stakes')}</th>
              <th className="p-4">{t('players')}</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id} className="border-t border-gray-600 hover:bg-gray-700 cursor-pointer">
                <td className="p-4">{table.name}</td>
                <td className="p-4">{`${table.smallBlind} / ${table.bigBlind}`}</td>
                <td className="p-4">{`${table.seats.length} / ${table.size}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}