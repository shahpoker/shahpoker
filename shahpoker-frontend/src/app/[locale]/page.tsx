// FILE: shahpoker-frontend/src/app/[locale]/page.tsx
import ClientApp from './components/ClientApp';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <ClientApp />
    </main>
  );
}