'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from './motion/primitives';

export type HeroScene = {
  /** Also names the image files: `<slug>-mobile|tablet|wide.webp`. One slug,
   *  one set of assets — no image paths scattered through the component. */
  slug: string;
  /** Describes what is actually on screen — these are real catalogue machines. */
  alt: string;
  /** Short label shown against the progress rail. */
  label: string;
  /** Extra scrim weight, for a frame whose lower half runs bright. Measured
   *  per slide rather than guessed; see the note on the scrim below. */
  heavyScrim?: boolean;
};

const DWELL = 6200; // ms a slide holds before advancing
const FADE = 1.15; // s crossfade

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
      /* Full bleed at every size. Each variant is cut to the aspect of the box
         it lands in — 0.600 against a phone box measured at 0.592, 0.940
         against a portrait tablet at 0.914-0.976, 1.778 against a laptop at
         1.80 — so `object-fit: cover` has almost nothing to discard. The
         earlier version had to hand the phone a band in normal flow because
         the only portrait asset was a crop of a 16:9 room; with photography
         shot 9:16 for the phone, the picture can own the screen again. */
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

      {/* Image treatment: two flat-to-directional gradients and a whole-frame
          tint, no blur. Blurring a photograph of a machine is what makes it
          look cheap — the equipment has to stay legible, so the softness comes
          from light instead: a thin overall tint mutes the frame, and a
          bottom-weighted gradient carries the copy.

          The left stop is /90 rather than /88: Tailwind emits no rule for an
          opacity step it does not have, so `from-ink-950/88` produced nothing
          at all and the desktop scrim silently ran at the base 30% — which is
          why the paragraph once sat almost unshaded over a lit floor. */}
      {/* No flat tint on portrait: a layer across the whole frame is exactly
          what made the photographs look grey. Landscape keeps a whisper of one
          because its copy sits over the picture's full height. */}
      <div aria-hidden className="absolute inset-0 lg:bg-ink-950/10" />
      <div
        aria-hidden
        className={`absolute inset-0 ${active.heavyScrim ? 'hero-scrim-heavy' : 'hero-scrim'}`}
      />

      {/* ---------- Controls ---------- */}
      {scenes.length > 1 && (
        <div className="shell pointer-events-none absolute inset-x-0 bottom-7 z-10 lg:bottom-9">
          <div className="pointer-events-auto flex items-center justify-center gap-4 lg:justify-start">
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
 * fetched — a 375px phone never downloads the 2048px composition.
 *
 * The first query is on orientation, not width, because the hero's shape
 * follows the viewport's: any landscape screen gets the 16:9 room, including a
 * 1023px tablet held sideways, which a width-only rule would have handed a
 * portrait photograph and cropped to a third of its height. Below that,
 * portrait tablets take the 0.94 cut and phones the 0.60 one.
 */
function Picture({ scene, eager }: { scene: HeroScene; eager: boolean }) {
  const base = `/images/hero/${scene.slug}`;
  return (
    <picture>
      <source type="image/webp" media="(min-aspect-ratio: 1/1)" srcSet={`${base}-wide.webp`} />
      <source type="image/webp" media="(min-width: 1024px)" srcSet={`${base}-wide.webp`} />
      <source type="image/webp" media="(min-width: 640px)" srcSet={`${base}-tablet.webp`} />
      <source type="image/webp" srcSet={`${base}-mobile.webp`} />
      <source media="(min-aspect-ratio: 1/1)" srcSet={`${base}-wide.jpg`} />
      <source media="(min-width: 1024px)" srcSet={`${base}-wide.jpg`} />
      <source media="(min-width: 640px)" srcSet={`${base}-tablet.jpg`} />
      <img
        src={`${base}-mobile.jpg`}
        alt={scene.alt}
        fetchPriority={eager ? 'high' : 'auto'}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        /* Centre is correct at every size: the focal choice was already made
           when each variant was cut — per image, on the machine mass, not the
           middle of the room — so nudging the position again here would only
           undo it. */
        /* No filter. The photographs already carry the warm light, contrast
           and equipment detail that make them worth showing; desaturating them
           only drained that away. Readability is handled by a gradient behind
           the text instead of by dimming the whole picture. */
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
