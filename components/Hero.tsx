'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Terminal, Database, Workflow, Webhook, BrainCircuit, Activity, Network, LayoutTemplate, ChevronDown, Calendar, Rss, Mail, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { DICTIONARY } from '@/data/dictionary';

export function Hero() {
  const { lang } = useLanguage();
  const t = DICTIONARY[lang].hero;
  const tDemo = DICTIONARY[lang].demo;
  
  const WORKFLOWS = [
    {
      id: 'chatbot',
      name: 'AI Chatbot Automation',
      nodes: [
        { icon: Webhook, label: tDemo.nodes.webhook },
        { icon: BrainCircuit, label: tDemo.nodes.llm },
        { icon: Database, label: tDemo.nodes.context },
        { icon: Workflow, label: tDemo.nodes.logic },
        { icon: MessageSquare, label: tDemo.nodes.response }
      ],
      logs: tDemo.workflowLogs.chatbot,
      integrations: ['OpenAI / Gemini', 'Supabase', 'n8n', 'Webhooks'],
      interaction: {
        user: "What's the status of my order #12345?",
        system: "Your order #12345 is currently out for delivery and will arrive by 5 PM today."
      }
    },
    {
      id: 'calendar',
      name: 'Calendar Booking Automation',
      nodes: [
        { icon: Webhook, label: tDemo.nodes.webhook },
        { icon: BrainCircuit, label: tDemo.nodes.intent },
        { icon: Calendar, label: tDemo.nodes.calendar },
        { icon: Workflow, label: tDemo.nodes.event },
        { icon: Mail, label: tDemo.nodes.mail }
      ],
      logs: tDemo.workflowLogs.calendar,
      integrations: ['Google Calendar API', 'Zapier', 'LLM', 'Webhook'],
      interaction: {
        user: "Plan a call on Wednesday at 09:00.",
        system: "Your call has been scheduled for Wednesday at 09:00."
      }
    },
    {
      id: 'newsletter',
      name: 'AI Newsletter Generator',
      nodes: [
        { icon: Rss, label: tDemo.nodes.rss },
        { icon: BrainCircuit, label: tDemo.nodes.summarization },
        { icon: LayoutTemplate, label: tDemo.nodes.content },
        { icon: Mail, label: tDemo.nodes.formatter },
        { icon: Network, label: tDemo.nodes.dispatch }
      ],
      logs: tDemo.workflowLogs.newsletter,
      integrations: ['RSS', 'OpenAI / Gemini', 'Email API', 'Database'],
      interaction: {
        user: "Generate and send the weekly AI news summary.",
        system: "Newsletter generated with 5 articles and dispatched to 1,200 subscribers."
      }
    }
  ];
  
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeNode, setActiveNode] = useState(-1);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<{id: number, keyId: string, msg: string, time: string}[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('workflows');
  const logCounter = useRef(0);

  const activeWorkflow = WORKFLOWS[activeWorkflowIndex];

  useEffect(() => {
    setMounted(true);
    let step = 0;
    setLogs([]); // Reset logs on workflow change
    setCurrentStep(0);
    setActiveNode(-1);
    
    const interval = setInterval(() => {
      const cycleStep = step % 12; // 12 steps total (0-11)
      setCurrentStep(cycleStep);
      
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;

      if (cycleStep === 11) {
        // Reset before restarting
        setActiveNode(-1);
      } else if (cycleStep === 0) {
        setActiveNode(-1);
      } else if (cycleStep >= 1 && cycleStep <= 5) {
        setActiveNode(cycleStep - 1);
        setLogs(prev => {
          logCounter.current++;
          const newLogs = [...prev, { 
            id: step, 
            keyId: `log-entry-${logCounter.current}`,
            msg: activeWorkflow.logs[cycleStep - 1],
            time: timeString
          }];
          return newLogs.slice(-10);
        });
      } else if (cycleStep === 6) {
        setActiveNode(5); // Completed state
        setLogs(prev => {
          logCounter.current++;
          const newLogs = [...prev, { 
            id: step, 
            keyId: `log-entry-${logCounter.current}`,
            msg: tDemo.logs.completed,
            time: timeString
          }];
          return newLogs.slice(-10);
        });
      }

      step++;
    }, 800); // 800ms per step for a smooth, realistic pipeline feel

    return () => clearInterval(interval);
  }, [activeWorkflowIndex, activeWorkflow.logs, tDemo.logs.completed]);

  const handleOpenChat = () => {
    document.dispatchEvent(new CustomEvent('open-chat'));
  };

  const sidebarItems = [
    { id: 'workflows', icon: LayoutTemplate, label: tDemo.sidebar.workflows },
    { id: 'integrations', icon: Network, label: tDemo.sidebar.integrations },
    { id: 'logs', icon: Terminal, label: tDemo.sidebar.logs },
    { id: 'status', icon: Activity, label: tDemo.sidebar.status }
  ];

  return (
    <section id="overview" className="relative py-24 px-6 overflow-hidden flex flex-col items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-zinc-900/0 to-transparent blur-[100px]" />
      </div>

      <div className="relative max-w-[1100px] mx-auto text-center z-10 w-full flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-medium tracking-tight text-white mb-5 leading-[1.1]"
        >
          {t.title.split('&').map((part, i) => (
            <span key={i}>
              {part}
              {i === 0 && <br className="hidden md:block" />}
              {i === 0 && ' & '}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-24 flex flex-col items-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#walkthrough"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-zinc-950 bg-white rounded-full hover:bg-zinc-200 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
            >
              {t.cta}
              <ArrowRight size={16} />
            </a>
            <button
              onClick={handleOpenChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-zinc-300 bg-transparent border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 hover:text-white hover:-translate-y-[2px] transition-all duration-300 shadow-sm"
            >
              <Sparkles size={16} className="text-zinc-400" />
              {t.chat}
            </button>
          </div>
        </motion.div>

        {/* Product Demo Container */}
        <motion.div
          id="demo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative w-full rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/60 backdrop-blur-xl overflow-hidden flex flex-col mb-8 text-left"
        >
          {/* Window Chrome */}
          <div className="flex items-center px-4 py-3 border-b border-white/5 bg-zinc-900/30 shrink-0 relative z-20">
            <div className="flex gap-2 absolute left-4">
              <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
              <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
              <div className="w-3 h-3 rounded-full bg-zinc-700/50" />
            </div>
            
            {/* Workflow Selector */}
            <div className="mx-auto relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-800/50 border border-white/5 text-xs text-zinc-300 font-medium hover:bg-zinc-700/50 transition-colors"
              >
                <Workflow size={14} className="text-zinc-400" />
                <span>{activeWorkflow.name}</span>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {WORKFLOWS.map((wf, idx) => (
                      <button
                        key={wf.id}
                        onClick={() => {
                          setActiveWorkflowIndex(idx);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2 ${idx === activeWorkflowIndex ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
                      >
                        {idx === activeWorkflowIndex && <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />}
                        <span className={idx === activeWorkflowIndex ? '' : 'ml-3'}>{wf.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Demo Content Area */}
          <div className="flex h-[500px] md:h-[560px] bg-transparent overflow-hidden relative z-10">
            {/* Sidebar */}
            <div className="w-56 border-r border-white/5 bg-zinc-900/20 p-4 hidden md:flex flex-col gap-2 shrink-0">
              {sidebarItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-all text-left ${activeTab === item.id ? 'bg-zinc-800/80 text-zinc-200 border border-white/5 shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}
                >
                  <item.icon size={16} className={activeTab === item.id ? 'text-zinc-300' : 'text-zinc-500'} />
                  {item.label}
                </button>
              ))}
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="text-[10px] font-mono text-zinc-500 mb-3 uppercase tracking-wider">Active Integrations</div>
                <div className="flex flex-wrap gap-2">
                  {activeWorkflow.integrations.map((integration) => (
                    <span key={`${activeWorkflow.id}-integration-${integration.replace(/\s+/g, '-').toLowerCase()}`} className="px-2 py-1 rounded bg-zinc-800/50 text-[10px] text-zinc-400 border border-white/5 hover:bg-zinc-700/50 hover:text-zinc-300 transition-colors cursor-default">
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-transparent">
              {/* Status Bar */}
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-4 md:gap-6 text-[10px] md:text-xs font-mono text-zinc-500 overflow-x-auto whitespace-nowrap shrink-0 bg-zinc-900/20">
                <span className="flex items-center gap-1.5"><span className="text-zinc-600">Model</span> <span className="text-zinc-300">Gemini / OpenAI</span></span>
                <span className="flex items-center gap-1.5"><span className="text-zinc-600">Engine</span> <span className="text-zinc-300">n8n</span></span>
                <span className="flex items-center gap-1.5"><span className="text-zinc-600">{tDemo.metrics.latency}</span> <span className="text-zinc-300">~2.1s</span></span>
                <span className={`flex items-center gap-1.5 ml-auto ${currentStep === 0 || currentStep >= 11 ? 'text-zinc-500' : currentStep >= 6 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${currentStep === 0 || currentStep >= 11 ? 'bg-zinc-600' : currentStep >= 6 ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}/>
                  {currentStep === 0 || currentStep >= 11 ? tDemo.metrics.idle : currentStep >= 6 ? tDemo.metrics.online : tDemo.metrics.processing}
                </span>
              </div>

              {activeTab === 'workflows' && (
                <>
                  <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
                    {/* Interaction Panel */}
                    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-zinc-900/10 p-4 flex flex-col gap-4 shrink-0 z-20">
                      <div className="text-xs font-medium text-zinc-400 mb-2 flex items-center gap-2">
                        <MessageSquare size={14} />
                        {tDemo.userRequest}
                      </div>
                      
                      <div className="flex flex-col gap-4 flex-1">
                        {/* User Message */}
                        <AnimatePresence>
                          {currentStep >= 0 && currentStep < 11 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                backgroundColor: currentStep >= 1 && currentStep <= 5 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)'
                              }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="border border-white/10 rounded-lg p-3 text-xs text-zinc-200 self-start w-full transition-colors duration-300"
                            >
                              <div className="font-medium text-zinc-500 mb-1 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                                {tDemo.userRequest}
                              </div>
                              {activeWorkflow.interaction.user}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* System Response */}
                        <AnimatePresence>
                          {currentStep >= 6 && currentStep < 11 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-zinc-800/50 border border-white/5 rounded-lg p-3 text-xs text-zinc-300 self-start w-full"
                            >
                              <div className="font-medium text-zinc-500 mb-1 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                                {tDemo.systemResponse}
                              </div>
                              {activeWorkflow.interaction.system}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Loading Indicator */}
                        <AnimatePresence>
                          {currentStep >= 1 && currentStep <= 5 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="self-start flex gap-1 p-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Workflow Graph */}
                    <div className="flex-1 p-4 md:p-8 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px]" />

                      <div className="relative z-10 flex items-center justify-between max-w-5xl mx-auto w-full px-6 md:px-16">
                        {/* Connecting Line Background */}
                        <div className="absolute top-1/2 left-10 right-10 md:left-20 md:right-20 h-px bg-white/10 -translate-y-1/2 z-0" />

                        {/* Animated Signal Flow - Progress Indicator */}
                        {mounted && activeNode > 0 && activeNode < 5 && (
                          <motion.div
                            key={`pulse-${activeNode}`}
                            className="absolute top-1/2 h-[2px] w-8 bg-zinc-400 -translate-y-1/2 z-0 rounded-full"
                            initial={{ left: `${((activeNode - 1) / 4) * 100}%`, x: '-50%', opacity: 0 }}
                            animate={{ left: `${(activeNode / 4) * 100}%`, x: '-50%', opacity: [0, 1, 0] }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                        )}

                        {/* Nodes */}
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={activeWorkflow.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between w-full relative z-10"
                          >
                            {activeWorkflow.nodes.map((node, i) => {
                              const isActive = activeNode === i;
                              const isPast = activeNode > i;
                              return (
                                <div key={`${activeWorkflow.id}-node-${node.label.replace(/\s+/g, '-').toLowerCase()}`} className="relative flex flex-col items-center group cursor-default">
                                  <motion.div
                                    animate={{
                                      borderColor: isActive ? 'rgba(255, 255, 255, 0.2)' : isPast ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(24, 24, 27, 0.5)',
                                      scale: isActive ? 1.05 : 1
                                    }}
                                    className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl border flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.04] group-hover:border-white/20"
                                  >
                                    {isActive ? (
                                      <motion.div 
                                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-xl border border-white/30"
                                      />
                                    ) : null}
                                    
                                    {isPast ? (
                                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center">
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </div>
                                    ) : null}

                                    <node.icon size={18} className={isActive ? 'text-zinc-200' : isPast ? 'text-zinc-400' : 'text-zinc-600'} />
                                  </motion.div>
                                  <span className={`text-[9px] md:text-[11px] font-medium absolute top-full mt-2 text-center w-16 md:w-24 -ml-4 md:-ml-5 ${isActive ? 'text-zinc-300' : isPast ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    {node.label}
                                  </span>

                                  {/* Tooltip */}
                                  <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                    <div className="bg-zinc-800 border border-white/10 text-zinc-200 text-[10px] px-2.5 py-1.5 rounded-md shadow-xl whitespace-nowrap">
                                      {node.label} Step
                                    </div>
                                    <div className="w-2 h-2 bg-zinc-800 border-r border-b border-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                                  </div>
                                </div>
                              );
                            })}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Activity Log Panel */}
                  <div className="h-40 md:h-44 border-t border-white/5 bg-zinc-950/50 p-4 font-mono text-[10px] md:text-xs flex flex-col relative overflow-hidden shrink-0">
                    <div className="text-zinc-500 mb-2 flex items-center gap-2 z-10">
                      <Terminal size={12} />
                      {tDemo.logs.title}
                    </div>
                    <div className="flex-1 flex flex-col justify-end gap-1.5 z-10">
                      <AnimatePresence mode="popLayout">
                        {mounted && logs.slice(-5).map((log, i, arr) => {
                          const isCompleted = log.msg === "Process completed successfully" || i < arr.length - 1 || currentStep >= 11;
                          return (
                            <motion.div
                              key={log.keyId}
                              initial={{ opacity: 0, x: -10, height: 0 }}
                              animate={{ opacity: 1, x: 0, height: 'auto' }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2 py-0.5 border-b border-white/5 last:border-0"
                            >
                              <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                              {isCompleted ? (
                                <span className="text-emerald-500/80 shrink-0">✓</span>
                              ) : (
                                <span className="text-amber-500/80 shrink-0 animate-pulse">⟳</span>
                              )}
                              <span className={isCompleted ? 'text-zinc-400' : 'text-zinc-200'}>{log.msg}</span>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                    {/* Fade out top logs */}
                    <div className="absolute top-8 left-0 right-0 h-10 bg-gradient-to-b from-zinc-950/90 to-transparent pointer-events-none z-20" />
                  </div>
                </>
              )}

              {activeTab === 'integrations' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="text-sm font-medium text-zinc-200 mb-6">{tDemo.integrations.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeWorkflow.integrations.map((integration) => (
                      <div key={integration} className="p-4 rounded-lg border border-white/5 bg-zinc-900/50 flex items-center gap-4 hover:bg-zinc-800/80 hover:border-white/10 transition-colors cursor-default">
                        <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                          <Network size={18} className="text-zinc-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-zinc-200">{integration}</div>
                          <div className="text-xs text-emerald-400/80 flex items-center gap-1.5 mt-1">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            {tDemo.integrations.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="flex-1 p-0 flex flex-col bg-zinc-900/30 font-mono text-[10px] md:text-xs overflow-hidden">
                  <div className="p-4 border-b border-white/5 text-zinc-500 flex items-center gap-2 shrink-0 bg-zinc-900/50">
                    <Terminal size={14} />
                    {tDemo.logs.fullLogs}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-end gap-1.5">
                    <AnimatePresence mode="popLayout">
                      {logs.map((log, i, arr) => {
                        const isCompleted = log.msg === "Process completed successfully" || i < arr.length - 1 || currentStep >= 11;
                        return (
                          <motion.div 
                            key={log.keyId} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 py-1 border-b border-white/5 last:border-0"
                          >
                            <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                            {isCompleted ? (
                              <span className="text-emerald-500/80 shrink-0">✓</span>
                            ) : (
                              <span className="text-amber-500/80 shrink-0 animate-pulse">⟳</span>
                            )}
                            <span className={isCompleted ? 'text-zinc-400' : 'text-zinc-200'}>{log.msg}</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {activeTab === 'status' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="text-sm font-medium text-zinc-200 mb-6">{tDemo.sidebar.status}</h3>
                  <div className="space-y-6 max-w-xl">
                    <div className="p-5 rounded-lg border border-white/5 bg-zinc-900/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-zinc-400">API Latency</span>
                        <span className="text-sm text-emerald-400 font-mono">~2.1s</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                    <div className="p-5 rounded-lg border border-white/5 bg-zinc-900/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-zinc-400">Success Rate</span>
                        <span className="text-sm text-emerald-400 font-mono">99.9%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-[99.9%] h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                    <div className="p-5 rounded-lg border border-white/5 bg-zinc-900/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-zinc-400">CPU Usage</span>
                        <span className="text-sm text-zinc-400 font-mono">42%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-[42%] h-full bg-zinc-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Demo Context Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col items-center text-center mb-24"
        >
          <h2 className="text-sm font-medium text-zinc-300">{t.demo}</h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-lg mx-auto">{t.demoDesc}</p>
        </motion.div>

        {/* Section Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-24" 
        />

        {/* Video Demo Section */}
        <motion.div
          id="walkthrough"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto flex flex-col items-center scroll-mt-[100px] pt-6 pb-24"
        >
          <div className="mb-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">{t.video}</h2>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
              {t.videoDesc}
            </p>
          </div>
          
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl border border-white/10 bg-zinc-900/50 shadow-2xl shadow-black/40 overflow-hidden group cursor-pointer flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors z-10" />
            
            {/* Play Button Overlay */}
            <div className="relative z-20 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/20 transition-all shadow-xl">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            
            {/* Placeholder for actual video thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 opacity-50" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        </motion.div>

        {/* Trusted Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto mt-24 md:mt-32 flex flex-col items-center border-t border-white/5 pt-12"
        >
          <p className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8 text-center">
            Built with production AI infrastructure
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-16 opacity-40 hover:opacity-70 transition-opacity duration-500">
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-white flex items-center gap-2.5"><Sparkles size={22} /> OpenAI</span>
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-white flex items-center gap-2.5"><BrainCircuit size={22} /> Gemini</span>
            <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">n8n</span>
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-white flex items-center gap-2.5"><Database size={22} /> Supabase</span>
            <span className="text-xl md:text-2xl font-semibold tracking-tight text-white flex items-center gap-2.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L24 22H0L12 2Z" /></svg>
              Vercel
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
