'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function Header() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-white/10 py-3'
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
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-950 bg-white rounded-full hover:bg-zinc-200 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            {t.contact}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-b border-white/5 p-6 md:hidden flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-zinc-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t.contact}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
