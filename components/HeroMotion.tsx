'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Progressive enhancement for the hero.
 *
 * The hero markup is server-rendered and fully visible on first paint. This
 * wrapper only *adds* an entrance sequence and a little pointer depth on top.
 * Two consequences, both deliberate:
 *
 *  - It hides elements in a layout effect before the browser paints, so
 *    there is no flash of the final state first.
 *  - If this component never mounts — JS disabled, hydration failure, an
 *    in-app WebView misbehaving — the hero simply stays visible. Nothing
 *    the visitor needs is gated behind the animation.
 *
 * The sequence is ~1.1s end to end and never blocks interaction: the CTAs
 * are clickable from the first frame.
 */

const ORDER: { sel: string; delay: number; y: number }[] = [
  { sel: '[data-hero="eyebrow"]', delay: 0.05, y: 12 },
  { sel: '[data-hero="body"]', delay: 0.5, y: 16 },
  { sel: '[data-hero="cta"]', delay: 0.6, y: 16 },
  { sel: '[data-hero="stats"]', delay: 0.72, y: 18 },
  { sel: '[data-hero="caption"]', delay: 0.66, y: 14 },
];

export default function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    // Respect a user who has already scrolled past the hero on a reload.
    if (window.scrollY > 40) return;

    const cleanups: (() => void)[] = [];
    const EASE = 'cubic-bezier(0.22,1,0.36,1)';

    const animate = (node: HTMLElement, from: string, to: string, delay: number, dur: number) => {
      node.style.transition = 'none';
      node.style.opacity = '0';
      node.style.transform = from;
      // Force a style flush so the browser never paints the final state first.
      void node.offsetHeight;
      node.style.transition = `opacity ${dur}s ${EASE} ${delay}s, transform ${dur}s ${EASE} ${delay}s`;
      node.style.opacity = '1';
      node.style.transform = to;
      const done = () => {
        node.style.transition = '';
        node.style.transform = '';
        node.style.willChange = '';
      };
      const t = window.setTimeout(done, (delay + dur) * 1000 + 80);
      cleanups.push(() => window.clearTimeout(t));
    };

    // Headline lines rise out of their overflow-hidden rows.
    el.querySelectorAll<HTMLElement>('[data-hero="line"] > span').forEach((line, i) => {
      animate(line, 'translateY(105%)', 'translateY(0)', 0.12 + i * 0.085, 0.9);
    });

    ORDER.forEach(({ sel, delay, y }) => {
      const node = el.querySelector<HTMLElement>(sel);
      if (node) animate(node, `translateY(${y}px)`, 'translateY(0)', delay, 0.7);
    });

    // The product panel scales back as it fades in — depth, not just opacity.
    const visual = el.querySelector<HTMLElement>('[data-hero="visual-inner"]');
    if (visual) animate(visual, 'scale(1.04)', 'scale(1)', 0.28, 1.1);

    return () => cleanups.forEach((fn) => fn());
  }, [reduce]);

  /* ---- Pointer depth: the panel tilts a few degrees toward the cursor ---- */
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const visual = el.querySelector<HTMLElement>('[data-hero="visual"]');
    if (!visual) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        visual.style.transform = `perspective(1200px) rotateY(${nx * 4}deg) rotateX(${-ny * 3}deg) translate3d(${nx * 10}px, ${ny * 8}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      visual.style.transform = '';
    };

    visual.style.transition = 'transform 500ms cubic-bezier(0.22,1,0.36,1)';
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      visual.style.transform = '';
      visual.style.transition = '';
    };
  }, [reduce]);

  return <div ref={root}>{children}</div>;
}
