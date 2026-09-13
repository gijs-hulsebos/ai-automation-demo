'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { INTERFACE } from '@/data/interface-translations';
import { BorderBeamPanel } from '@/components/ui/border-beam-panel';
import { expandedLayout } from './bento-layouts';

// IDs follow the existing sketch. Empty positions retain their identity.
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
  const [expanded, setExpanded] = useState<string | null>(null);
  const [details, setDetails] = useState<string | null>(null);
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
          return (
            <motion.article
              key={id}
              ref={node => { tiles.current[id] = node; }}
              layout={!reducedMotion}
              data-tile-id={id}
              data-open={isExpanded || undefined}
              className={`${id === 'tarvos' ? 'tarvos-project-block' : `project-grid-space project-space-${id}`} bento-tile`}
              style={{ borderRadius: mobile ? 14 : 22 }}
              transition={transition}
              onClick={event => {
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
                  <motion.div layout={reducedMotion ? false : 'position'} transition={transition} className="bento-tile-heading">
                    <button
                      ref={node => { openingButtons.current[id] = node; }}
                      className="bento-open"
                      aria-label={`${ui.project}${id === 'tarvos' ? ' Tarvos' : ` ${id.toUpperCase()}`} ${isExpanded ? ui.close : ui.open}`}
                      aria-expanded={isExpanded}
                      aria-controls={`bento-details-${id}`}
                      onClick={() => toggle(id)}
                    />
                  </motion.div>
                  <motion.div layout={reducedMotion ? false : 'position'} transition={transition} id={`bento-details-${id}`} className="bento-detail-region" inert={details !== id}>
                    <AnimatePresence>
                      {details === id && (
                        <motion.div
                          key="details"
                          className="bento-detail-content"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: reducedMotion ? 0 : 0.1 }}
                        />
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
