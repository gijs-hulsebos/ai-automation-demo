import { Sparkles, Brain, Workflow, Database, Triangle } from 'lucide-react';

const techStack = [
  { name: 'OpenAI', icon: Sparkles },
  { name: 'Gemini', icon: Brain },
  { name: 'n8n', icon: Workflow },
  { name: 'Supabase', icon: Database },
  { name: 'Vercel', icon: Triangle },
];

export function TechStackCarousel() {
  return (
    <section className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xs tracking-[0.2em] text-zinc-600 uppercase mb-10">
          BUILT WITH PRODUCTION AI INFRASTRUCTURE
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div 
                key={tech.name}
                className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-default"
              >
                <Icon className="h-8 w-auto text-zinc-300" />
                <span className="text-lg font-medium text-zinc-400 tracking-tight">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
