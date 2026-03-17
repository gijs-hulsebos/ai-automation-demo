'use client';

import { motion } from 'motion/react';
import { User, BrainCircuit, Workflow, Webhook, Database, MessageSquare, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function ArchitectureDiagram() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].architecture;

  const getStepIcon = (index: number) => {
    const icons = [User, BrainCircuit, Workflow, Webhook, Database, MessageSquare];
    return icons[index % icons.length];
  };

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
            {t.title}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center">
          {t.steps.map((step, index) => {
            const Icon = getStepIcon(index);
            return (
              <div key={step.title} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-full max-w-md bg-zinc-950/50 border border-white/5 rounded-xl p-6 flex items-center gap-5 shadow-sm hover:bg-zinc-900/80 hover:border-white/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="text-zinc-300" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-base mb-1">{step.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
                
                {index < t.steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="py-4 text-zinc-600"
                  >
                    <ArrowDown size={20} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
