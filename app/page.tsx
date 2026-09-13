import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1">
        <Hero />
      </div>
    </main>
  );
}
