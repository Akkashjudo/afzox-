import Link from 'next/link';
import HeroMotion from './HeroMotion';
import HeroSlider, { type HeroScene } from './HeroSlider';
import { IconArrow } from './icons';

/**
 * Homepage hero.
 *
 * The backdrop is three gym environments, one per slide: a complete floor, a
 * strength area and a cardio line-up. They share one brand world — dark
 * concrete, warm slat wood, warm accent light, city glazing — so they are used
 * as shot, with no grade applied.
 *
 * Each slide has two photographs, not one crop reused: a 16:9 room for
 * landscape screens and a portrait frame for the phone. Three of the portrait
 * frames were shot 9:16 by the client; the functional zone's is cut from its
 * own landscape original, which that room survives because its equipment sits
 * in a band across the middle rather than spanning the full width.
 *
 * The landscape files are untouched and always win on a landscape viewport —
 * see the `<source>` order in HeroSlider. Portrait work cannot reach them.
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
    alt: 'A fitted-out commercial gym floor: a stair climber and air bike, medicine ball and kettlebell racking, cable rigs, a plyo box, weight sled, battle ropes and dumbbell racking.',
  },
  {
    slug: 'strength',
    label: 'Strength area',
    alt: 'A strength training area: loaded power racks, plate storage, dual-column cable stations, dumbbell racking, an adjustable bench, leg press and a weight sled.',
    /* The run of white floor markings under the sled keeps this frame bright
       along the bottom edge, where the copy sits. */
    heavyScrim: true,
  },
  {
    slug: 'cardio',
    label: 'Cardio line-up',
    alt: 'A cardio line-up on a raised plinth: a motorised treadmill, curved treadmill, elliptical cross trainer, upright bike and air bike.',
  },
  {
    slug: 'functional',
    label: 'Functional zone',
    alt: 'A functional training zone: cable rigs, adjustable benches, dumbbell racking, a weight sled, plyo box and balance trainer.',
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
        {/* Portrait screens get a centred group sitting in the lower third:
            centred because a left-ragged column under a symmetrical photograph
            reads as misaligned, and low because the machines own the middle of
            every portrait frame. Every width here is a measure, not a margin —
            the headline and the sentence are given their own max-widths so the
            block keeps a deliberate shape instead of running to both edges.
            From `lg` it returns to the left third, which the wide rooms are
            cut for. */}
        <div className="shell relative flex min-h-[min(78svh,760px)] flex-col items-center justify-end pb-16 pt-[calc(var(--header-h)+24px)] text-center sm:min-h-[min(82svh,840px)] sm:pb-20 lg:min-h-[min(88svh,940px)] lg:items-start lg:justify-center lg:pb-36 lg:pt-[calc(var(--header-h)+40px)] lg:text-left">
          <div className="relative z-10 mx-auto w-full max-w-[23rem] sm:max-w-[30rem] lg:mx-0 lg:max-w-2xl">
            {/* Hidden on portrait screens. "Commercial fitness equipment" over
                "Commercial gym equipment, built in India." is the same phrase
                twice, and on a phone the second one costs a band of
                photograph. It returns from `lg`, where there is room for it to
                do its job as a label. */}
            <span data-hero="eyebrow" className="eyebrow-on-ink hidden lg:inline-flex">
              Commercial fitness equipment
            </span>

            {/* The display scale is held back until `lg`: the copy column is
                roughly half the viewport at the tablet breakpoint, and the full
                clamp broke every line there. */}
            {/* Says the product and the business in the first line. The old
                headline — "We equip the whole floor" — read as a slogan, and a
                first-time visitor had to reach the paragraph before learning
                AFZOX makes gym equipment at all. */}
            {/* Split so the two halves balance under each other when centred.
                The old break put "Commercial gym" over the much longer
                "equipment, built in India." — correct on a left edge, lopsided
                on a centre line. */}
            <h1
              data-hero="title"
              className="text-[clamp(1.8rem,6.9vw,2.35rem)] font-bold leading-[1.06] tracking-[-0.03em] text-white [text-wrap:balance] lg:mt-7 lg:text-display-xl lg:leading-[0.98]"
            >
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">Commercial gym equipment,</span>
              </span>
              <span data-hero="line" className="block overflow-hidden">
                <span className="block text-primary-fixed-dim">built in India.</span>
              </span>
            </h1>

            {/* Two lines on a phone, not three. Every line of copy here is a
                line of photograph covered, so the sentence carries only what
                the headline above does not already say. */}
            <p
              data-hero="body"
              className="mx-auto mt-3 max-w-[34ch] text-body-sm text-white/75 sm:text-body-md lg:mx-0 lg:mt-7 lg:max-w-lg lg:text-body-lg"
            >
              Strength, cardio and functional machines, installed nationwide.
            </p>

            <div
              data-hero="cta"
              className="mt-5 flex flex-wrap items-center justify-center gap-2.5 lg:mt-10 lg:gap-3 lg:justify-start"
            >
              <Link
                href="/shop"
                className="btn btn-lg group bg-white px-5 text-ink-900 hover:bg-primary-fixed-dim sm:px-7"
              >
                <span className="flex items-center gap-2.5">
                  Explore equipment
                  <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/contact" className="btn btn-lg btn-on-ink px-5 sm:px-7">
                Plan your gym
              </Link>
            </div>
          </div>
        </div>
      </HeroMotion>
    </section>
  );
}
