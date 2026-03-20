import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { EngineeringCredibility } from '@/components/EngineeringCredibility';
import { TechStackCarousel } from '@/components/TechStackCarousel';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { Integrations } from '@/components/Integrations';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1">
        <Hero />
        <EngineeringCredibility />
        <TechStackCarousel />
        <ArchitectureDiagram />
        <Integrations />
      </div>
      <Footer />
      <ChatWidget />
    </main>
  );
}
