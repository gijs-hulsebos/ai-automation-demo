'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import { DICTIONARY } from '@/data/dictionary';
import { Braces } from 'lucide-react';
import projects from '@/data/bento-projects.json';
import {techIcons, techAliases} from '@/data/tech-stack';

// Keep established technologies and derive additions from the project records.
const carouselTechnologies = Array.from(new Set([
'OpenAI','Claude','Gemini','n8n','Supabase','Vercel','Python','Next.js','GitHub','Remotion',
...projects.flatMap(project => project.stack),
].filter(name => name !== 'Curated regulatory sources').map(name => techAliases[name] ?? name)));

export function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const t = DICTIONARY[lang].nav;
  const ui = INTERFACE[lang];
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
    { name: ui.projects, href: '/projects' },
    { name: ui.certificates, href: '/certificates' },
    { name: ui.learning, href: '/learning-trajectory' },
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
        <div className="relative max-w-[1328px] mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-display font-medium text-lg tracking-tight text-white hover:text-zinc-300 transition-colors">
            Gijs Hulsebos
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 lg:gap-8 whitespace-nowrap">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/gijs-hulsebos" 
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
            aria-label={ui.menu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div aria-label={ui.technologies} className="absolute top-full inset-x-0 border-y border-white/5 bg-zinc-950/95 py-3">
          <div className="max-w-6xl mx-auto px-6">
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] group">
            <div className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]" style={{ animationDuration: `${carouselTechnologies.length * 4}s` }}>
              {[...Array(2)].map((_, i) => (
                <div key={i} aria-hidden={i === 1 ? true : undefined} data-tech-track={i} className="flex items-center gap-x-10 pr-10 shrink-0">
                  {carouselTechnologies.map(name => (
                    <div key={name} className="flex items-center justify-center gap-2 shrink-0">
                      {techIcons[name] ? <Image src={techIcons[name]} alt="" width={20} height={20}
                        className="object-contain shrink-0" unoptimized
                        style={{ width: 20, height: 20, filter: name === 'React Flow' || name === 'MailerLite' ? 'grayscale(1)' : 'grayscale(1) brightness(0) invert(.6)' }}
                      /> : <Braces size={20} className="text-zinc-400" aria-hidden="true" />}
                      <span className="text-xs font-medium text-zinc-400 whitespace-nowrap">{name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          </div>
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
                  aria-current={pathname === link.href ? 'page' : undefined}
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
                href="https://github.com/gijs-hulsebos" 
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
              <span className="text-sm font-medium text-zinc-400">{ui.language}</span>
              <div className="flex gap-1 p-1 bg-zinc-950/50 rounded-full border border-white/5">
                {['EN', 'NL', 'DE'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l as 'EN' | 'NL' | 'DE')}
                    aria-pressed={lang === l}
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
