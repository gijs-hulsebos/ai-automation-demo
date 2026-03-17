'use client';

import { motion } from 'motion/react';
import { User, BrainCircuit, Workflow, Webhook, Database, MessageSquare, ArrowDown } from 'lucide-react';

export function ArchitectureDiagram() {
  const steps = [
    { icon: User, title: 'User Request', desc: 'Input via chat, email, or form' },
    { icon: BrainCircuit, title: 'AI Processing', desc: 'Intent recognition & extraction (OpenAI/Gemini)' },
    { icon: Workflow, title: 'Automation Workflow', desc: 'Logic routing & execution (n8n)' },
    { icon: Webhook, title: 'API Integrations', desc: 'Third-party service actions' },
    { icon: Database, title: 'Database', desc: 'State & record management (Supabase)' },
    { icon: MessageSquare, title: 'Response', desc: 'Formatted output back to user' },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
            How the System Works
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A robust, event-driven architecture designed to process complex natural language requests and execute deterministic workflows.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="w-full max-w-md bg-zinc-950/50 border border-white/5 rounded-xl p-6 flex items-center gap-5 shadow-sm hover:bg-zinc-900/80 hover:border-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 shadow-sm">
                  <step.icon className="text-zinc-300" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-medium text-base mb-1">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
              
              {index < steps.length - 1 && (
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
          ))}
        </div>
      </div>
    </section>
  );
}
