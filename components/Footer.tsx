'use client';

import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function Footer() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].footer;

  return (
    <footer className="w-full border-t border-white/5 bg-zinc-950/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex flex-col sm:flex-row items-center justify-between text-[13px] text-zinc-500 font-medium">
        {/* Left */}
        <div className="flex-1 hidden md:flex justify-start">
          {/* Empty space to prevent overlap with the fixed language switcher */}
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-2 whitespace-nowrap">
          <p>OpenAI <span className="opacity-40 mx-1">•</span> Gemini <span className="opacity-40 mx-1">•</span> n8n <span className="opacity-40 mx-1">•</span> Supabase <span className="opacity-40 mx-1">•</span> Vercel</p>
        </div>

        {/* Right */}
        <div className="flex-1 flex w-full justify-center md:justify-end items-center md:pr-20">
          <p>© {new Date().getFullYear()} Gijs Hulsebos</p>
        </div>
      </div>
    </footer>
  );
}
