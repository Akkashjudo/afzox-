'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Smooth scroll — desktop pointer devices only.
 *
 * Deliberately narrow in scope, because the failure modes of a hijacked
 * scroll are worse than the benefit:
 *
 *  - Touch devices keep native scrolling entirely. Momentum scrolling on iOS
 *    and Android is already good, and overriding it costs responsiveness and
 *    fights pull-to-refresh and address-bar collapse.
 *  - `prefers-reduced-motion` disables it outright.
 *  - The easing is short (~0.9s to settle) and `wheelMultiplier` is 1, so the
 *    page never feels slow or laggy — it only removes the step between wheel
 *    ticks.
 *  - Anchor links and any element inside a scroll-locked overlay (the mobile
 *    menu, the filter drawer) are excluded via `data-lenis-prevent`, so
 *    nested scrolling still works.
 *
 * The instance is torn down and rebuilt on route change so a new page always
 * starts from a clean scroll position.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1,
      smoothWheel: true,
      // Never take over touch input.
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // In-page anchors go through Lenis so they land smoothly and in sync.
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
