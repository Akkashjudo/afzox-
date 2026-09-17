import Link from 'next/link';
import HeroMotion from './HeroMotion';
import HeroSlider, { type HeroScene } from './HeroSlider';
import { IconArrow } from './icons';

/**
 * Homepage hero.
 *
 * The backdrop is four staged equipment scenes rather than one machine on a
 * plate: the client sells complete floors, so the hero shows a floor. Every
 * machine in every scene is a real product in the catalogue.
 *
 * The copy column sits in the left third, which each composition deliberately
 * keeps clear of machinery, so nothing important is ever buried under the
 * headline. The statistics block that used to sit under the CTA is gone — the
 * counts live on the shop and collection pages, where a buyer is actually
 * comparing, not on the first thing they see.
 *
 * Height is `svh`-based: `100vh` on mobile browsers measures the viewport with
 * the address bar collapsed, so the CTA ends up below the fold on first paint.
 */

const SCENES: HeroScene[] = [
  {
    slug: 'floor',
    label: 'Complete floor',
    alt: 'AFZOX commercial gym floor — a half rack, plate-loaded chest press, treadmill and two-tier dumbbell rack.',
  },
  {
    slug: 'strength',
    label: 'Strength area',
    alt: 'AFZOX strength area — lat pulldown, leg press, seated chest press and incline chest press.',
  },
  {
    slug: 'cardio',
    label: 'Cardio line-up',
    alt: 'AFZOX cardio line-up — indoor cycle, elliptical cross trainer, air rower and commercial treadmill.',
  },
  {
    slug: 'functional',
    label: 'Functional zone',
    alt: 'AFZOX functional zone — cable crossover, monkey bar rig, power sled and dumbbell rack.',
  },
];

export default function Hero() {
  return (
    <section className="surface-ink grain on-ink relative isolate -mt-[var(--header-h)] overflow-hidden">
      {/* Tells the header a dark hero is behind it. The header watches this
          with an IntersectionObserver and goes transparent with light type
          while it is under the bar. */}
      <div id="hero-sentinel" aria-hidden className="absolute inset-x-0 top-0 h-[70svh]" />

      <HeroSlider scenes={SCENES} />

      <HeroMotion>
        <div className="shell relative flex min-h-[min(86svh,900px)] flex-col justify-center pb-32 pt-[calc(var(--header-h)+40px)] lg:min-h-[min(88svh,940px)] lg:pb-36">
          <div className="relative z-10 max-w-xl lg:max-w-2xl">
            <span data-hero="eyebrow" className="eyebrow-on-ink">
              Commercial gym equipment
            </span>

            {/* The display scale is held back until `lg`: the copy column is
                roughly half the viewport at the tablet breakpoint, and the full
                clamp broke every line there. */}
            <h1
              data-hero="title"
              className="mt-6 text-[clamp(2.3rem,8vw,2.7rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white [text-wrap:balance] md:mt-7 lg:text-display-xl"
            >
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">We equip the</span>
              </span>
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">
                  whole <span className="text-primary-fixed-dim">floor.</span>
                </span>
              </span>
            </h1>

            <p data-hero="body" className="mt-7 max-w-lg text-body-lg text-white/65">
              Strength, cardio and functional equipment for commercial gyms — specified,
              delivered and installed across India by the people who build it.
            </p>

            <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="btn btn-lg group bg-white text-ink-900 hover:bg-primary-fixed-dim"
              >
                <span className="flex items-center gap-2.5">
                  Explore the catalogue
                  <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/contact" className="btn btn-lg btn-on-ink">
                Plan your floor
              </Link>
            </div>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
