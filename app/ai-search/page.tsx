'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BrainCircuit, Search, ArrowRight, Sparkles, Database, FileText, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AISearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-32 pb-20 px-6 flex flex-col items-center">
        {/* Hero Section */}
        <section className="text-center mb-16 w-full max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-2xl mb-6 border border-indigo-500/20">
            <BrainCircuit className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
            AI-Powered Search
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Experience the next generation of search. Our AI understands context, semantics, and intent to deliver precise answers from across your knowledge base.
          </p>
        </section>

        {/* Search Interface */}
        <section className="w-full max-w-3xl mx-auto mb-24">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-zinc-900/80 border border-white/10 rounded-2xl p-2 backdrop-blur-sm focus-within:border-indigo-500/50 transition-colors">
              <div className="pl-4 pr-2 text-zinc-400">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask anything... (e.g., 'How does the RAG pipeline work?')"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 py-4 px-2 text-lg"
              />
              <button
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
                className="bg-white text-zinc-950 px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    Search
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/20">
              <Globe className="w-6 h-6 text-indigo-400 mb-4" />
              <h3 className="text-white font-medium mb-2">Semantic Understanding</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Goes beyond keyword matching to understand the true meaning and intent behind your queries.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/20">
              <Database className="w-6 h-6 text-indigo-400 mb-4" />
              <h3 className="text-white font-medium mb-2">Vector Database</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Powered by high-dimensional vector embeddings for lightning-fast similarity search.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-zinc-900/20">
              <FileText className="w-6 h-6 text-indigo-400 mb-4" />
              <h3 className="text-white font-medium mb-2">Contextual Synthesis</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Synthesizes information from multiple sources to provide comprehensive, accurate answers.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
