'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function Header() {
  const { lang, setLang } = useLanguage();
  const t = DICTIONARY[lang].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.overview, href: '/#demo' },
    { name: t.walkthrough, href: '/#walkthrough' },
    { name: t.integrations, href: '/#integrations' },
    { name: t.consultancy, href: '/consultancy' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/5 backdrop-blur-md border-white/10 py-3'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-display font-medium text-lg tracking-tight text-white hover:text-zinc-300 transition-colors">
            Gijs Hulsebos
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#FF7F11] transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-[#FF7F11] transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-950 bg-white rounded-full hover:bg-zinc-200 hover:-translate-y-0.5 transition-all shadow-sm"
              >
                {t.contact}
              </Link>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-3 -mr-3 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Nav Bottom Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/90 backdrop-blur-xl border-t border-white/10 p-6 pb-8 md:hidden flex flex-col gap-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] min-h-[500px] max-h-[90vh]"
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-zinc-200 hover:text-white transition-colors py-3 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex-1" />

            {/* Mobile Socials */}
            <div className="flex items-center justify-center gap-6 py-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#FF7F11] transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-[#FF7F11] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-sm font-medium text-zinc-400">Language</span>
              <div className="flex gap-1 p-1 bg-zinc-950/50 rounded-full border border-white/5">
                {['EN', 'NL', 'DE'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l as any)}
                    className={`relative px-4 py-2 text-xs font-medium rounded-full transition-colors ${
                      lang === l ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {lang === l && (
                      <motion.div
                        layoutId="lang-active-mobile"
                        className="absolute inset-0 bg-indigo-600 rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{l}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center w-full px-4 py-4 text-base font-medium text-zinc-950 bg-white rounded-xl hover:bg-zinc-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
