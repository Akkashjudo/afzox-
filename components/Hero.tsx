import Link from 'next/link';
import HeroMotion from './HeroMotion';
import HeroSlider, { type HeroScene } from './HeroSlider';
import { IconArrow } from './icons';

/**
 * Homepage hero.
 *
 * The backdrop is four gym environments supplied by the client, one per slide:
 * a complete floor, a strength area, a cardio line-up and a functional zone.
 * They share one brand world — dark concrete, warm slat wood, warm accent
 * light, city glazing — so they are used as shot, with no grade applied.
 *
 * Each is cropped three ways rather than left to `object-fit: cover`, with the
 * crop centred per image on where its equipment actually sits. Slide 2's
 * treadmills anchor the left half, so its portrait crop moves right to bring
 * the elliptical and bikes into frame; a blanket centre crop would have cut
 * the line-up in half.
 *
 * The copy sits in the left third under a directional scrim. The statistics
 * block that used to sit beneath the CTA is gone — those counts live on the
 * shop and collection pages, where a buyer is comparing, not on the first
 * thing they see.
 *
 * Height is `svh`-based: `100vh` on mobile browsers measures the viewport with
 * the address bar collapsed, so the CTA ends up below the fold on first paint.
 */

const SCENES: HeroScene[] = [
  {
    slug: 'floor',
    label: 'Complete floor',
    alt: 'A fitted-out commercial gym floor: curved and motorised treadmills, an indoor cycle, a cable station, a power rack, dumbbell racking and an adjustable bench.',
  },
  {
    slug: 'strength',
    label: 'Strength area',
    alt: 'A strength training area: a loaded power rack, dual-column cable station, plate-loaded leg press, dumbbell racking, adjustable bench and a weight sled.',
  },
  {
    slug: 'cardio',
    label: 'Cardio line-up',
    alt: 'A cardio line-up on a raised plinth: motorised and curved treadmills, an elliptical cross trainer, upright bike, rower and air bike.',
  },
  {
    slug: 'functional',
    label: 'Functional zone',
    alt: 'A functional training zone: a stair climber, air bike, medicine ball and kettlebell racking, a cable rig, battle ropes, plyo box, weight sled and dumbbell racking.',
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
        {/* Below `lg` the copy sits under the picture on solid ink rather than
            over it. Text on a photograph of a dark gym is the least legible
            place to put the one sentence that has to explain the business, and
            keeping it off the image is what lets the band be cut for the room
            instead of for a safe text area. From `lg` the copy returns over
            the image in the left third, which the wide compositions are cut
            for. */}
        <div className="shell relative flex flex-col pb-11 pt-7 sm:pb-14 sm:pt-11 lg:min-h-[min(88svh,940px)] lg:justify-center lg:pb-36 lg:pt-[calc(var(--header-h)+40px)]">
          <div className="relative z-10 max-w-xl lg:max-w-2xl">
            <span data-hero="eyebrow" className="eyebrow-on-ink">
              Commercial fitness equipment
            </span>

            {/* The display scale is held back until `lg`: the copy column is
                roughly half the viewport at the tablet breakpoint, and the full
                clamp broke every line there. */}
            {/* Says the product and the business in the first line. The old
                headline — "We equip the whole floor" — read as a slogan, and a
                first-time visitor had to reach the paragraph before learning
                AFZOX makes gym equipment at all. */}
            <h1
              data-hero="title"
              className="mt-4 text-[clamp(2.05rem,7.2vw,2.7rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance] md:mt-7 lg:text-display-xl lg:leading-[0.98]"
            >
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">Commercial gym</span>
              </span>
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">
                  equipment, <span className="text-primary-fixed-dim">built in India.</span>
                </span>
              </span>
            </h1>

            <p data-hero="body" className="mt-4 max-w-lg text-body-md text-white/70 lg:mt-7 lg:text-body-lg">
              Strength, cardio and functional machines — manufactured, delivered and installed
              for gyms, hotels and residential projects across India.
            </p>

            <div data-hero="cta" className="mt-6 flex flex-wrap items-center gap-3 lg:mt-10">
              <Link
                href="/shop"
                className="btn btn-lg group bg-white text-ink-900 hover:bg-primary-fixed-dim"
              >
                <span className="flex items-center gap-2.5">
                  Explore equipment
                  <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/contact" className="btn btn-lg btn-on-ink">
                Plan your gym
              </Link>
            </div>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
