'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion/primitives';

export type HeroScene = {
  slug: string;
  /** Describes what is actually on screen — these are real catalogue machines. */
  alt: string;
  /** Short label shown against the progress rail. */
  label: string;
};

const DWELL = 6000; // ms a slide holds before advancing
const FADE = 1.1; // s crossfade

/**
 * Hero backdrop — four staged equipment scenes on a slow crossfade.
 *
 * Art direction is real, not a crop: each scene ships wide, tablet and mobile
 * compositions, and `<picture>` with `media` queries means the browser fetches
 * exactly one of them. A single wide file with `object-fit: cover` would put
 * half a treadmill on a phone; the portrait variant keeps the whole line-up in
 * frame with the top half clear for the headline.
 *
 * The first scene renders as plain eager `<img>` markup so it can be the LCP
 * element without waiting for React — the slider only takes over afterwards.
 * Every layer is absolutely positioned inside a container the page has already
 * sized, so nothing shifts when it does.
 */
export default function HeroSlider({ scenes }: { scenes: HeroScene[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Which slides have been mounted so far. Stacked layers are what make a
     crossfade safe — the incoming image is already decoded — but mounting all
     four up front pulls roughly 750KB of wide imagery while the first one is
     still trying to be the LCP. Mounting one slide ahead spreads that across
     the rotation: the next scene loads while the current one is showing, and
     once a slide is mounted it stays, so going back to it is instant. */
  const [mounted, setMounted] = useState<number[]>([0]);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % scenes.length) + scenes.length) % scenes.length),
    [scenes.length]
  );

  /* Autoplay. Held while the pointer is inside the hero, while a control has
     focus, and whenever the tab is in the background — a slider that keeps
     cycling in a hidden tab just burns battery. */
  useEffect(() => {
    if (reduce || paused || scenes.length < 2) return;
    timer.current = setTimeout(() => go(index + 1), DWELL);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, reduce, go, scenes.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const ahead = (index + 1) % scenes.length;
    setMounted((m) => (m.includes(ahead) ? m : [...m, ahead]));
  }, [index, scenes.length]);

  const visible = useMemo(() => new Set(mounted), [mounted]);
  const active = scenes[index];

  return (
    <div
      aria-roledescription="carousel"
      aria-label="AFZOX equipment installations"
      className="absolute inset-0 -z-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* ---------- Scenes ----------
          Every scene stays mounted and only its opacity is animated. Mounting
          and unmounting per slide meant the incoming image could still be
          decoding when the crossfade began — a blank frame — and the outgoing
          node hung around until its slow scale finished. Stacked layers cannot
          produce either: each file is fetched once, and a switch is a pure
          opacity change between two already-decoded images. */}
      <div className="absolute inset-0 overflow-hidden">
        {scenes.map((scene, i) =>
          !visible.has(i) ? null : (
          <motion.div
            key={scene.slug}
            aria-hidden={i !== index}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: reduce ? 1 : i === index ? 1 : 1.04,
            }}
            transition={{
              opacity: { duration: reduce ? 0.2 : FADE, ease: EASE },
              scale: { duration: reduce ? 0 : DWELL / 1000 + FADE, ease: 'linear' },
            }}
            style={{ willChange: 'opacity' }}
          >
            <Picture scene={scene} eager={i === 0} />
          </motion.div>
          )
        )}
      </div>

      {/* Readability scrim — deliberately light, because each composition
          already carries its own falloff behind the copy. Stacking a heavy
          CSS gradient on top of that darkened the machines twice over and the
          gym stopped reading on a phone, which is the one thing this hero has
          to do. This adds only the contrast the type actually needs. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/25 to-ink-950/85 lg:bg-gradient-to-r lg:from-ink-950/88 lg:via-ink-950/45 lg:to-transparent"
      />

      {/* ---------- Controls ---------- */}
      {scenes.length > 1 && (
        <div className="shell pointer-events-none absolute inset-x-0 bottom-6 z-10 lg:bottom-9">
          <div className="pointer-events-auto flex items-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose an installation">
              {scenes.map((s, i) => (
                <button
                  key={s.slug}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={s.label}
                  onClick={() => go(i)}
                  className="group relative h-8 w-10 sm:w-14"
                >
                  <span
                    className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full transition-colors duration-control ${
                      i === index ? 'bg-white/25' : 'bg-white/15 group-hover:bg-white/30'
                    }`}
                  >
                    {i === index && !reduce && (
                      <motion.span
                        key={`fill-${index}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-white"
                        initial={{ width: '0%' }}
                        animate={{ width: paused ? '18%' : '100%' }}
                        transition={{ duration: paused ? 0.3 : DWELL / 1000, ease: 'linear' }}
                      />
                    )}
                    {i === index && reduce && <span className="absolute inset-0 bg-white" />}
                  </span>
                </button>
              ))}
            </div>

            <span aria-live="polite" className="text-label-sm uppercase text-white/55">
              {active.label}
            </span>

            <div className="ml-auto hidden items-center gap-1.5 sm:flex">
              <Arrow dir="prev" onClick={() => go(index - 1)} />
              <Arrow dir="next" onClick={() => go(index + 1)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * True art direction. `media` on each `<source>` means exactly one file is
 * fetched — a 375px phone never downloads the 2560px composition.
 */
function Picture({ scene, eager }: { scene: HeroScene; eager: boolean }) {
  const base = `/images/hero/${scene.slug}`;
  return (
    <picture>
      <source type="image/webp" media="(min-width: 1024px)" srcSet={`${base}-wide.webp`} />
      <source type="image/webp" media="(min-width: 640px)" srcSet={`${base}-tablet.webp`} />
      <source type="image/webp" srcSet={`${base}-mobile.webp`} />
      <source media="(min-width: 1024px)" srcSet={`${base}-wide.jpg`} />
      <source media="(min-width: 640px)" srcSet={`${base}-tablet.jpg`} />
      <img
        src={`${base}-mobile.jpg`}
        alt={scene.alt}
        fetchPriority={eager ? 'high' : 'auto'}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        /* Centre is correct at every size: the focal choice was already made
           when each variant was cropped, per image, so nudging the position
           again here would only undo it. */
        className="h-full w-full object-cover object-center"
      />
    </picture>
  );
}

function Arrow({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous installation' : 'Next installation'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-control hover:border-white/35 hover:text-white"
    >
      <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
        <path
          d={dir === 'prev' ? 'M10 3 5 8l5 5' : 'M6 3l5 5-5 5'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
