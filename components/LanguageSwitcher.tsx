'use client';

import { motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';

const LANGUAGES = ['EN', 'NL', 'DE'] as const;

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="hidden md:flex fixed bottom-6 left-6 z-50 gap-1 p-1 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
      {LANGUAGES.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            lang === l ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          {lang === l && (
            <motion.div
              layoutId="lang-active"
              className="absolute inset-0 bg-indigo-600 rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{l}</span>
        </button>
      ))}
    </div>
  );
}
