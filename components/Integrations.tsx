'use client';

import { motion } from 'motion/react';
import { Layers, Workflow, Database, Sparkles, Webhook, Cloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function Integrations() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].integrationsSection;
  
  const integrations = [
    {
      name: t.items[0].name,
      icon: Layers,
      desc: t.items[0].desc,
    },
    {
      name: t.items[1].name,
      icon: Workflow,
      desc: t.items[1].desc,
    },
    {
      name: t.items[2].name,
      icon: Database,
      desc: t.items[2].desc,
    },
    {
      name: t.items[3].name,
      icon: Sparkles,
      desc: t.items[3].desc,
    },
    {
      name: t.items[4].name,
      icon: Webhook,
      desc: t.items[4].desc,
    },
    {
      name: t.items[5].name,
      icon: Cloud,
      desc: t.items[5].desc,
    },
  ];

  return (
    <section id="integrations" className="py-24 md:py-32 px-6 border-t border-white/5 bg-zinc-950/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {integrations.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative bg-zinc-900/30 border border-white/5 rounded-2xl p-4 md:p-8 hover:bg-zinc-900/80 hover:border-white/10 transition-all group shadow-sm overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-sm relative z-10">
                <item.icon className="text-zinc-300 w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="text-sm md:text-lg font-medium text-white mb-1 md:mb-2 relative z-10">{item.name}</h3>
              <p className="text-zinc-400 text-[11px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
