'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, ExternalLink } from 'lucide-react'; // ExternalLink icoon toevoegen
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

// Define the Message type explicitly for clarity
type Message = { 
  role: 'user' | 'assistant'; 
  content: string; 
  buttons?: { label: string; url: string }[] 
};

export function ChatWidget() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].chat;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t.initial }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
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

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://gijshulsebos.app.n8n.cloud/webhook/Gijs-Chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      
      // THIS IS THE CLEAN, METADATA-READING WAY
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.output || 'No response from agent.',
        // Extract the buttons array directly from the metadata sent by n8n
        buttons: data.metadata?.buttons || []
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again in a few seconds or refresh the page.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
                  <p className="text-xs text-emerald-400/80 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.online}
                  </p>
                </div>
              </div>
              <button 
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
                    {msg.content}

                    {/* RENDER DYNAMIC BUTTONS HERE */}
                    {msg.role === 'assistant' && msg.buttons && msg.buttons.length > 0 && (
                      <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/5">
                        {msg.buttons.map((btn, j) => (
                          <a
                            key={j}
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between px-3 py-2 bg-zinc-800/50 border border-white/5 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all group active:scale-95"
                          >
                            {btn.label}
                            <ExternalLink size={12} className="text-zinc-500 group-hover:text-white transition-colors" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="px-5 pb-3 flex flex-col gap-2">
                {t.suggested.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="text-left px-4 py-2.5 text-xs text-zinc-400 bg-zinc-900/50 border border-white/5 rounded-xl hover:bg-zinc-800/80 hover:text-zinc-200 transition-all shadow-sm"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

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
                  disabled={isLoading}
                  className="w-full bg-zinc-950/50 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-900 transition-all shadow-inner disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 w-9 h-9 bg-white text-zinc-950 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:bg-zinc-200"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full"
                    />
                  ) : (
                    <Send size={14} className="ml-0.5" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}