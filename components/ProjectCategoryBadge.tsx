"use client";
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function ProjectCategoryBadge({ category, label, id, open, onOpenChange }: { category: string; label: string; id: string; open: boolean; onOpenChange: (open: boolean) => void }) {
 const button = useRef<HTMLButtonElement>(null);
 const [position, setPosition] = useState({ left: 0, top: 0 });
 function show() {
  const rect = button.current?.getBoundingClientRect();
  if (rect) setPosition({ left: Math.max(8, Math.min(rect.left, window.innerWidth - 180)), top: rect.bottom + 8 });
  onOpenChange(true);
 }
 useEffect(() => {
  if (!open) return;
  const hide = () => onOpenChange(false);
  window.addEventListener('scroll', hide, true);
  window.addEventListener('resize', hide);
  return () => { window.removeEventListener('scroll', hide, true); window.removeEventListener('resize', hide); };
 }, [open, onOpenChange]);
 return <>
  <button ref={button} type="button" className="bento-category-icon" aria-label={label} aria-describedby={open ? id : undefined}
   onMouseEnter={show} onMouseLeave={() => onOpenChange(false)} onFocus={show} onBlur={() => onOpenChange(false)}
   onClick={event => { event.stopPropagation(); show(); }}
   onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onOpenChange(false); } }}>
   <span aria-hidden="true" style={{ maskImage: `url(/categories/${category}.svg)` }} />
  </button>
  {open && createPortal(<div id={id} role="tooltip" className="bento-category-tooltip" style={position}>{label}</div>, document.body)}
 </>;
}
