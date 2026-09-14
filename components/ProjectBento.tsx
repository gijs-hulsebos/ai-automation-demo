'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import { BorderBeamPanel } from '@/components/ui/border-beam-panel';
import { AegixProjectInfo } from './AegixProjectInfo';
import { TarvosProjectInfo } from './TarvosProjectInfo';
import { TarvosHackathonBadge } from './TarvosHackathonBadge';
import { BentoProjectDetails, ProjectMark, projectsBySlot, localizeProject } from './BentoProjectContent';
import { ProjectTechStack } from './ProjectTechStack';
import { expandedLayout } from './bento-layouts';

// IDs follow the existing sketch. Empty positions retain their identity.
const aegixSlot = 'g';
const slots = ['tarvos', ...'abcdefrgshixjklmnoptquvw'];
const subscribeTablet = (onChange: () => void) => {
  const query = window.matchMedia('(max-width: 1100px)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getTablet = () => window.matchMedia('(max-width: 1100px)').matches;
const mobileQuery = '(max-width: 600px)';
const subscribeMobile = (onChange: () => void) => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getMobile = () => window.matchMedia(mobileQuery).matches;
const getServerMobile = () => false;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;

export default function ProjectBento() {
  const { lang } = useLanguage();
  const ui = INTERFACE[lang];
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getServerMobile);
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, getServerMobile);
  const tablet = useSyncExternalStore(subscribeTablet, getTablet, getServerMobile);
  const transition = { layout: { duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] as const } };
  const [hackathonOpen, setHackathonOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [details, setDetails] = useState<string | null>(null);
  const [tarvosVideo, setTarvosVideo] = useState(0);
  const openingButtons = useRef<Record<string, HTMLButtonElement | null>>({});
  const tiles = useRef<Record<string, HTMLElement | null>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const active = useRef<string | null>(null);
  const cancelTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => cancelTimers, [cancelTimers]);

  const close = useCallback(() => {
    cancelTimers();
    const id = active.current;
    if (!id) return;
    // Move focus before detail controls leave the accessibility tree.
    openingButtons.current[id]?.focus({ preventScroll: true });
    active.current = null;
    setDetails(null);
    const restore = () => setExpanded(null);
    if (reducedMotion) restore();
    else timers.current.push(setTimeout(restore, 100));
  }, [cancelTimers, reducedMotion]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setHovered(null);
      if (event.key === 'Escape' && active.current) {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [close]);

  function toggle(id: string) {
    if (active.current === id) {
      close();
      return;
    }
    cancelTimers();
    const previous = active.current;
    if (previous && tiles.current[previous]?.contains(document.activeElement)) {
      openingButtons.current[id]?.focus({ preventScroll: true });
    }
    active.current = id;
    const region = tiles.current[id]?.querySelector('.bento-detail-region');
    if (region) region.scrollTop = 0;
    setDetails(null);
    setExpanded(id);
    timers.current.push(setTimeout(() => {
      if (active.current !== id) return;
      setDetails(id);
    }, reducedMotion ? 0 : 300));
    // Only reveal the nearest edge after the layout has settled. Never center
    // the whole grid or move a tile whose controls are already on screen.
    timers.current.push(setTimeout(() => {
      if (active.current !== id) return;
      const rect = tiles.current[id]?.getBoundingClientRect();
      if (!rect) return;
      const topInset = 140;
      const available = window.innerHeight - topInset - 16;
      let delta = 0;
      if (rect.top < topInset) delta = rect.top - topInset;
      else if (rect.height <= available && rect.bottom > window.innerHeight - 16) {
        delta = rect.bottom - window.innerHeight + 16;
      }
      if (delta) window.scrollBy({ top: delta, behavior: reducedMotion ? 'instant' : 'smooth' });
    }, reducedMotion ? 0 : 450));
  }

  return (
    <LayoutGroup>
      <div id="projects" className="landing-project-grid interactive-bento" data-expanded={expanded ?? undefined} style={expanded ? expandedLayout(expanded, mobile ? 'mobile' : tablet ? 'tablet' : 'desktop') : undefined} aria-label={ui.projects}>
        {slots.map(id => {
          const isExpanded = expanded === id;
          const sourceProject = projectsBySlot[id];
          const project = sourceProject ? localizeProject(sourceProject, lang) : undefined;
          const isAegix = id === aegixSlot;
          const interactive = id === 'tarvos' || isAegix || !!project;
          return (
            <motion.article
              key={id}
              ref={node => { tiles.current[id] = node; }}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              onFocusCapture={() => setHovered(id)}
              onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(null); }}
              layout={!reducedMotion}
              data-tile-id={id}
              data-project-id={isAegix ? 'aegix' : project?.id || (id === 'tarvos' ? 'tarvos' : undefined)}
              data-project-size={project?.size}
              data-open={isExpanded || undefined}
              className={`${id === 'tarvos' ? 'tarvos-project-block' : `project-grid-space project-space-${id}`} bento-tile`}
              style={{ borderRadius: mobile ? 14 : 22 }}
              transition={transition}
              onClick={event => {
                if (!interactive) return;
                if (event.defaultPrevented || !(event.target instanceof Element)) return;
                // The full-surface button has its own handler. Native media,
                // links and embedded controls must never toggle the tile.
                if (event.target.closest('button, a, input, select, textarea, label, video, audio, [role="button"], [role="link"], [role="slider"], [contenteditable], [data-bento-interactive]')) return;
                toggle(id);
              }}
            >
                  {(expanded === id || (!expanded && id === 'tarvos')) && (
                    <BorderBeamPanel
                      colors={id === 'tarvos' ? ['#34d399', '#a855f7'] : undefined}
                      travelSpeed={isExpanded ? 80 : undefined}
                      hoverSpeed={isExpanded ? 42 : 240}
                      reducedMotion={reducedMotion}
                    />
                  )}
                  {id === 'tarvos' && (
                    <motion.div className="tarvos-collapsed-brand" aria-hidden={isExpanded}
                      initial={false} animate={{ opacity: isExpanded ? 0 : 1 }}
                      transition={{ duration: reducedMotion ? 0 : 0.2, delay: isExpanded || reducedMotion ? 0 : 0.2 }}>
                      <span className="tarvos-collapsed-logo" aria-hidden="true" />
                      <h2 className="font-display">Tarvos</h2>
                      <p>{lang === 'NL' ? 'Solana-integraties voor n8n' : lang === 'DE' ? 'Solana-Integrationen für n8n' : 'Solana integrations for n8n'}</p>
                    </motion.div>
                  )}
                  {isAegix && <motion.div className="aegix-collapsed" aria-hidden={isExpanded}
                    initial={false} animate={{ opacity: isExpanded ? 0 : 1 }}
                    transition={{ duration: reducedMotion ? 0 : 0.15, delay: isExpanded || reducedMotion ? 0 : 0.15 }}>
                    <div className="aegix-wordmark"><Image src="/projects/aegix-wordmark-cat.png" alt="Aegix" fill sizes="(max-width: 600px) 70vw, 260px" className="object-contain" /></div>
                    <p className="aegix-tagline">{lang === 'NL' ? 'Private x402-betalingen door agents' : lang === 'DE' ? 'Private x402-Zahlungen durch Agenten' : 'Private x402 Agent Payments'}</p>
                  </motion.div>}
                  {project && (
                    <motion.div className="bento-project-brand" aria-hidden={isExpanded}
                      initial={false} animate={{ opacity: isExpanded ? 0 : 1 }}
                      transition={{ duration: reducedMotion ? 0 : 0.15, delay: isExpanded || reducedMotion ? 0 : 0.15 }}>
                      <ProjectMark project={project} />
                      <div><h2 className="font-display">{project.displayName}</h2>
                        {project.size !== 'small' && <p>{project.tagline}</p>}
                      </div>
                    </motion.div>
                  )}
                  {!isAegix && interactive && hovered === id && !isExpanded && !hackathonOpen && <ProjectTechStack stack={sourceProject?.stack ?? ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'D3', 'Vite', 'Solana', 'n8n', 'Python']} tileId={id} id={`tech-${id}`} />}
                  {(id === 'tarvos' || isAegix) && <TarvosHackathonBadge project={isAegix ? 'Aegix' : 'Tarvos'} open={hackathonOpen === id} onOpenChange={open => setHackathonOpen(current => open ? id : current === id ? null : current)} />}
                  <motion.div layout={reducedMotion ? false : 'position'} transition={transition} className="bento-tile-heading">
                    {interactive && <button
                      ref={node => { openingButtons.current[id] = node; }}
                      className="bento-open"
                      title={id === 'tarvos' ? 'Tarvos' : isAegix ? 'Aegix' : project?.name}
                      aria-label={`${id === 'tarvos' ? 'Tarvos' : isAegix ? 'Aegix' : project?.name} ${isExpanded ? ui.close : ui.open}`}
                      aria-describedby={!isAegix && hovered === id && !isExpanded && !hackathonOpen ? `tech-${id}` : undefined}
                      aria-expanded={isExpanded}
                      aria-controls={`bento-details-${id}`}
                      onClick={() => toggle(id)}
                    />}
                  </motion.div>
                  <motion.div layout={reducedMotion ? false : 'position'} transition={transition} id={`bento-details-${id}`} className="bento-detail-region" tabIndex={(id === 'tarvos' || isAegix) && details === id ? 0 : undefined} aria-label={id === 'tarvos' ? (lang === 'NL' ? 'Tarvos-projectdetails' : lang === 'DE' ? 'Tarvos-Projektdetails' : 'Tarvos project details') : undefined} inert={details !== id}>
                    <AnimatePresence>
                      {details === id && (
                        <motion.div
                          key="details"
                          className="bento-detail-content"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.1 }}
                        >
                          {project && <BentoProjectDetails project={project} />}
                          {isAegix && <><div className="aegix-expanded">
                            <div className="aegix-expanded-logo">
                              <Image src="/projects/aegix-shield.png" alt={lang === 'NL' ? 'Aegix: kat met schild' : lang === 'DE' ? 'Aegix: Katze mit Schild' : 'Aegix: cat with shield'} fill sizes="64px" className="object-contain" />
                            </div>
                            <h2 className="font-display text-xl font-medium">Aegix</h2>
                            <div className="tarvos-project-media">
                              <video className="tarvos-project-video" src="/projects/aegix-explainer-1080p.mp4" controls playsInline preload="metadata"
                                aria-label={lang === 'NL' ? 'Aegix-uitlegvideo' : lang === 'DE' ? 'Aegix-Erklärvideo' : 'Aegix explainer video'} />
                            </div>
                            <div className="tarvos-project-information">
                              <div className="flex flex-wrap justify-center gap-3">
                                <a href="https://aegix-restored-dashboard.vercel.app/" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-3 py-2 text-xs text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">Website ↗</a>
                                <a href="https://github.com/gijs-hulsebos/aegix-restored" target="_blank" rel="noopener noreferrer" title={lang === 'NL' ? 'Private repository' : lang === 'DE' ? 'Privates Repository' : 'Private repository'} className="rounded-xl border border-white/20 px-3 py-2 text-xs text-zinc-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400">GitHub ↗</a>
                              </div>
                            </div>
                          </div><AegixProjectInfo /></>}
                          {id === 'tarvos' && (
                            <>
                            <div className="tarvos-project-details">
                              <span className="tarvos-expanded-logo" role="img" aria-label="Tarvos" />
                              <div className="tarvos-project-video-heading">
                                <h2 className="font-display text-xl sm:text-2xl font-medium">Tarvos</h2>
                                <button
                                  type="button"
                                  onClick={() => setTarvosVideo(index => (index + 1) % 2)}
                                  aria-label={tarvosVideo === 0
                                    ? (lang === 'NL' ? 'Volgende video' : lang === 'DE' ? 'Nächstes Video' : 'Next video')
                                    : (lang === 'NL' ? 'Vorige video' : lang === 'DE' ? 'Vorheriges Video' : 'Previous video')}
                                  className="tarvos-video-switch inline-flex h-8 items-center justify-center rounded-full px-2 text-sm tabular-nums text-zinc-300 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                                >
                                  <span aria-live="polite">{tarvosVideo === 0 ? '(1/2) >' : '< (2/2)'}</span>
                                </button>
                              </div>
                              <div className="tarvos-project-media">
                                <video
                                  key={tarvosVideo}
                                  className="tarvos-project-video"
                                  src={tarvosVideo === 0 ? '/projects/tarvos-introduction.mp4' : '/projects/tarvos-product-film.mp4'}
                                  controls
                                  playsInline
                                  preload="metadata"
                                  aria-label={tarvosVideo === 0 ? (lang === 'NL' ? 'Wat is Tarvos?' : lang === 'DE' ? 'Was ist Tarvos?' : 'What is Tarvos?') : (lang === 'NL' ? 'Tarvos-productfilm' : lang === 'DE' ? 'Tarvos-Produktfilm' : 'Tarvos Product Film')}
                                />
                              </div>
                              <div className="tarvos-project-information">

                                <div className="flex flex-wrap justify-center gap-3">
                                  <a href="https://tarvos.tools/" target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-sm text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400">Website ↗</a>
                                  <a href="https://github.com/TarvosTools/n8n-nodes-Tarvos-x402" target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-200 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400">GitHub ↗</a>
                                </div>
                              </div>
                            </div>
                            <TarvosProjectInfo />
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
            </motion.article>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
