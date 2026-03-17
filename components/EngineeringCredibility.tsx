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
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-6 pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center bg-zinc-900/30 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center hover:bg-zinc-900/80 hover:border-white/10 transition-all shadow-sm group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                <card.icon className="text-zinc-300 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-base font-medium text-white mb-2 relative z-10">{card.title}</h3>
              <p className="text-[11px] md:text-sm text-zinc-400 leading-relaxed relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
