'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import { DICTIONARY } from '@/data/dictionary';

// Define the Message type explicitly for clarity
type Message = { 
  role: 'user' | 'assistant'; 
  content: string; 
  unavailable?: boolean; 
};

export function ChatWidget() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].chat;
  const ui = INTERFACE[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '', unavailable: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    document.addEventListener('open-chat', handleOpenChat);
    return () => document.removeEventListener('open-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Local UI only: no network requests, session IDs or agent integration.
  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(previous => [...previous,
      { role: 'user', content: text.trim() },
      { role: 'assistant', content: '', unavailable: true },
    ]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={ui.chatOpen}
        onClick={() => setIsOpen(true)}
        className={`chat-widget-button fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 bg-white text-zinc-950 rounded-full shadow-2xl flex items-center justify-center z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[380px] h-[600px] max-h-[80vh] max-w-[calc(100vw-2rem)] bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-zinc-900/50 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800/50 border border-white/5 flex items-center justify-center shadow-sm">
                  <Bot size={16} className="text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{t.title}</h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    {ui.chatOfflineStatus}
                  </p>
                </div>
              </div>
              <button 
                aria-label={ui.chatClose}
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-md hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'user' ? 'bg-zinc-800 border border-white/5' : 'bg-zinc-800/50 border border-white/5'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-zinc-300" /> : <Bot size={14} className="text-zinc-300" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-white text-zinc-950 rounded-tr-sm' 
                      : 'bg-zinc-900/80 border border-white/5 text-zinc-200 rounded-tl-sm'
                  }`}>
                    {i === 0 || msg.unavailable ? ui.chatUnavailable : msg.content}


                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-900/50 border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full bg-zinc-950/50 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-900 transition-all shadow-inner disabled:opacity-50"
                />
                <button
                  type="submit"
                  aria-label={ui.chatSend}
                  disabled={!input.trim()}
                  className="absolute right-2 w-9 h-9 bg-white text-zinc-950 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:bg-zinc-200"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}