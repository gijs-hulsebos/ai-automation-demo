'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  contact?: boolean;
  sources?: {label:string;url:string}[]; 
};

export function ChatWidget() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].chat;
  const ui = INTERFACE[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '', unavailable: true }
  ]);
  const successfulReplies=useRef(0);
  const [busy,setBusy]=useState(false);
  const copy={NL:{hello:'Vraag me naar Gijs zijn projecten, certificaten of leertraject. Ik gebruik openbare portfolio- en SkillMax+ gegevens.',status:'Portfolio-assistent · AI',loading:'Bronnen raadplegen…',error:'Het antwoorden is niet gelukt. Probeer het zo nog eens.'},EN:{hello:'Ask me about Gijs’s projects, certificates or learning journey. I use public portfolio and SkillMax+ data.',status:'Portfolio assistant · AI',loading:'Checking sources…',error:'Unable to answer right now. Please try again shortly.'},DE:{hello:'Frage mich nach Gijs’ Projekten, Zertifikaten oder Lernplan. Ich nutze öffentliche Portfolio- und SkillMax+ Daten.',status:'Portfolio-Assistent · KI',loading:'Quellen werden geprüft…',error:'Die Antwort ist momentan nicht verfügbar. Bitte versuche es erneut.'}}[lang];
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

  const handleSend = async (text: string) => {
    if (!text.trim() || busy) return;
    const history=[...messages.filter(m=>!m.unavailable).map(({role,content})=>({role,content:content.slice(0,2000)})),{role:'user' as const,content:text.trim()}].slice(-9);
    while(history.reduce((n,m)=>n+m.content.length,0)>12000)history.splice(0,2);
    setMessages(previous=>[...previous,{role:'user',content:text.trim()}]);setInput('');setBusy(true);
    try {
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history}),signal:AbortSignal.timeout(60000)});
      const data=await r.json();if(!r.ok)throw Error(data.error);
      successfulReplies.current++;
      setMessages(previous=>[...previous,{role:'assistant',content:data.answer,sources:data.sources,contact:successfulReplies.current%5===0}]);
    }catch{setMessages(previous=>[...previous,{role:'assistant',content:copy.error,unavailable:true}])}finally{setBusy(false)}
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
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {copy.status}
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
                    {msg.role === 'assistant' ? <div className="chat-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{a: ({children, href}) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>, img: () => null}}>{i===0?copy.hello:msg.content}</ReactMarkdown></div> : <div className="whitespace-pre-wrap break-words">{msg.content}</div>}
                    {msg.contact&&<div className="mt-4 border-t border-white/15 pt-3"><p>{({NL:'Gijs kan je hier met meer diepgang over vertellen. Wil je contact met hem opnemen?',EN:'Gijs can explain this in more depth. Would you like to get in touch?',DE:'Gijs kann dir dies ausführlicher erklären. Möchtest du Kontakt aufnehmen?'}[lang])}</p><div className="mt-3 flex flex-wrap gap-2"><a className="rounded-lg bg-white px-3 py-2 text-xs text-zinc-950" href="/contact">Contact</a><a className="rounded-lg border border-white/20 px-3 py-2 text-xs" href="https://linkedin.com/in/gijshulsebos" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>}
                    {msg.sources&&<div className="mt-3 flex flex-wrap gap-2">{msg.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline text-xs text-sky-300">{source.label}</a>)}</div>}


                  </div>
                </div>
              ))}
              {busy&&<p role="status" className="text-sm text-zinc-400">{copy.loading}</p>}
              {messages.length===1&&<div className="flex flex-wrap gap-2">{({NL:[['Projecten','Welke projecten heeft Gijs gebouwd?'],['Certificaten','Welke certificaten heeft Gijs behaald?'],['Leertraject','Wat heeft Gijs geleerd en wat staat gepland?']],EN:[['Projects','Which projects has Gijs built?'],['Certificates','Which certificates has Gijs earned?'],['Learning journey','What has Gijs learned and what is planned?']],DE:[['Projekte','Welche Projekte hat Gijs gebaut?'],['Zertifikate','Welche Zertifikate hat Gijs erworben?'],['Lernpfad','Was hat Gijs gelernt und was ist geplant?']]}[lang]).map(([label,prompt])=><button key={label} disabled={busy} onClick={()=>void handleSend(prompt)} className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white hover:bg-white/10">{label}</button>)}</div>}
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
                  maxLength={2000}
                  disabled={busy}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full bg-zinc-950/50 border border-white/10 rounded-full pl-5 pr-12 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 focus:bg-zinc-900 transition-all shadow-inner disabled:opacity-50"
                />
                <button
                  type="submit"
                  aria-label={ui.chatSend}
                  disabled={busy||!input.trim()}
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

