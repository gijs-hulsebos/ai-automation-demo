import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { EngineeringCredibility } from '@/components/EngineeringCredibility';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { Integrations } from '@/components/Integrations';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1">
        <Hero />
        <EngineeringCredibility />
        <ArchitectureDiagram />
        <Integrations />
      </div>
      <Footer />
    </main>
  );
}
