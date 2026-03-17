'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BrainCircuit, Workflow, Network, LayoutTemplate, ArrowRight, Mic, Video, Webhook } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export default function ConsultancyPage() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].consultancy;

  const getSystemIcon = (index: number) => {
    const icons = [Workflow, BrainCircuit, Mic, Video, LayoutTemplate, Webhook];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      <main className="pt-32 pb-20 px-6">
        {/* Hero */}
        <section className="text-center mb-24">
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-white mb-5 leading-[1.1]">
            {t.title}
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-4">
            {t.subtitle}
          </p>
          <p className="text-sm text-zinc-500">
            {t.description}
          </p>
        </section>

        {/* AI Systems I Build */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-2xl font-display font-medium text-white mb-12 text-center">{t.systemsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.systems.map((system, i) => {
              const Icon = getSystemIcon(i);
              return (
                <div key={i} className="p-8 rounded-2xl border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                  <Icon className="w-8 h-8 text-indigo-400 mb-6" />
                  <h3 className="text-lg font-medium text-white mb-3">{system.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{system.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI Tools & Models Experience */}
        <section className="max-w-6xl mx-auto mb-24 border-t border-white/5 pt-16">
          <h2 className="text-2xl font-display font-medium text-white mb-12 text-center">{t.toolsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.tools.map((toolGroup, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{toolGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {toolGroup.items.map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How I Build AI Systems */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-2xl font-display font-medium text-white mb-16 text-center">{t.processTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.process.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-indigo-400 font-medium mb-6">
                  {i + 1}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.desc}</p>
                {i < t.process.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-white/10 bg-zinc-900/20">
          <h2 className="text-3xl font-display font-medium text-white mb-4">{t.ctaTitle}</h2>
          <p className="text-zinc-400 mb-8">{t.ctaDesc}</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-zinc-950 bg-white rounded-full hover:bg-zinc-200 transition-all"
          >
            {t.ctaButton}
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
