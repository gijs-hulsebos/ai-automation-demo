'use client';

import { motion } from 'motion/react';
import { BrainCircuit, Workflow, Network } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function EngineeringCredibility() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].engineering;
  
  const cards = [
    {
      title: t.cards[0].title,
      desc: t.cards[0].desc,
      icon: BrainCircuit
    },
    {
      title: t.cards[1].title,
      desc: t.cards[1].desc,
      icon: Workflow
    },
    {
      title: t.cards[2].title,
      desc: t.cards[2].desc,
      icon: Network
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 border-t border-white/5 bg-zinc-950/50 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {t.tag}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-zinc-900/30 border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center hover:bg-zinc-900/80 hover:border-white/10 transition-all shadow-sm group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <card.icon size={24} className="text-zinc-300" />
              </div>
              <h3 className="text-base font-medium text-white mb-2">{card.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
