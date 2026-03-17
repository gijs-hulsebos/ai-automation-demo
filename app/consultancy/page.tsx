import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BrainCircuit, Workflow, Network, LayoutTemplate, ArrowRight, Mic, Video, Webhook } from 'lucide-react';
import Link from 'next/link';

const AI_SYSTEMS = [
  {
    icon: Workflow,
    title: 'AI Workflow Automation',
    description: 'Design automation pipelines using LLMs, APIs and workflow engines such as n8n, Zapier or custom integrations.'
  },
  {
    icon: BrainCircuit,
    title: 'AI Chatbots & AI Assistants',
    description: 'Build AI assistants that automate support, research, scheduling and internal workflows.'
  },
  {
    icon: Mic,
    title: 'AI Voice & Text-to-Speech Systems',
    description: 'Integrate modern voice models and text-to-speech systems to create voice agents, voice assistants and automated communication tools.'
  },
  {
    icon: Video,
    title: 'AI Avatars & Video Generation',
    description: 'Integrate AI avatar systems and video generation tools to build automated video content pipelines and interactive digital agents.'
  },
  {
    icon: LayoutTemplate,
    title: 'AI Content Generation Pipelines',
    description: 'Automate content generation using modern AI models for text, images and video (including tools like Nano Banana, Veo or similar systems).'
  },
  {
    icon: Webhook,
    title: 'AI API Integrations',
    description: 'Connect AI models with real software systems such as CRMs, databases, messaging platforms, internal tools and business APIs.'
  }
];

const TOOLS = [
  { category: 'Language Models', items: ['OpenAI', 'Gemini', 'OpenRouter'] },
  { category: 'Voice & Speech', items: ['ElevenLabs', 'Deepgram'] },
  { category: 'Video / Avatars', items: ['HeyGen', 'Synthesia'] },
  { category: 'Automation', items: ['n8n', 'Zapier', 'Supabase', 'Vercel'] }
];

const PROCESS_STEPS = [
  { title: 'Analyze the workflow', description: 'Identify repetitive processes, integration points and automation opportunities.' },
  { title: 'Design the AI architecture', description: 'Design the system architecture connecting LLMs, APIs, databases and automation workflows.' },
  { title: 'Implement and deploy', description: 'Build and deploy the AI system so it runs reliably inside real production environments.' }
];

export default function ConsultancyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Header />
      <main className="pt-32 pb-20 px-6">
        {/* Hero */}
        <section className="text-center mb-24">
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight text-white mb-5 leading-[1.1]">
            AI Automation & AI Systems Engineering
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-4">
            I design and build production AI systems that connect language models, APIs and automation engines and modern AI tools to automate real business workflows.
          </p>
          <p className="text-sm text-zinc-500">
            From AI assistants and automation pipelines to AI avatars, content generation systems and workflow orchestration.
          </p>
        </section>

        {/* AI Systems I Build */}
        <section className="max-w-6xl mx-auto mb-24">
          <h2 className="text-2xl font-display font-medium text-white mb-12 text-center">AI Systems I Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_SYSTEMS.map((system, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors">
                <system.icon className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-lg font-medium text-white mb-3">{system.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{system.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Tools & Models Experience */}
        <section className="max-w-6xl mx-auto mb-24 border-t border-white/5 pt-16">
          <h2 className="text-2xl font-display font-medium text-white mb-12 text-center">AI Models & Tools I Work With</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOOLS.map((toolGroup, i) => (
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
          <h2 className="text-2xl font-display font-medium text-white mb-16 text-center">How I Build AI Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-indigo-400 font-medium mb-6">
                  {i + 1}
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm">{step.description}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto text-center p-12 rounded-3xl border border-white/10 bg-zinc-900/20">
          <h2 className="text-3xl font-display font-medium text-white mb-4">Interested in building AI automation systems?</h2>
          <p className="text-zinc-400 mb-8">Let’s discuss how AI integrations and automation pipelines can improve your workflows.</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium text-zinc-950 bg-white rounded-full hover:bg-zinc-200 transition-all"
          >
            Contact Me
            <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
