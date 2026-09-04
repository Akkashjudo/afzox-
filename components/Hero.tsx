import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import HeroMotion from './HeroMotion';
import { IconArrow } from './icons';

/**
 * Server Component. The headline, CTA and hero image are present and fully
 * visible in the server-rendered HTML — this image is the LCP element on the
 * site, so it must never wait on JS. `HeroMotion` layers the entrance
 * sequence and pointer depth on top as a progressive enhancement: if its JS
 * never runs, the hero is still complete and correct.
 */
export default function Hero({
  heroProduct,
  stats,
}: {
  heroProduct: Product;
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="surface-ink grain on-ink relative isolate -mt-[var(--header-h)] overflow-hidden">
      {/* Tells the header a dark hero is behind it. The header watches this
          with an IntersectionObserver and goes transparent with light type
          while it is under the bar — so any page can opt in simply by
          rendering a dark hero, with no route whitelist in the header. */}
      <div id="hero-sentinel" aria-hidden className="absolute inset-x-0 top-0 h-[70svh]" />

      {/* ---------- Ambient field: engineering grid + directional light ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="ambient-glow absolute -left-[15%] top-[-20%] h-[720px] w-[720px] rounded-full bg-brand/25 blur-[140px]" />
        <div className="ambient-glow absolute right-[-10%] top-[25%] h-[520px] w-[520px] rounded-full bg-brand-red/[0.10] blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <HeroMotion>
        <div className="shell relative grid min-h-[min(92svh,940px)] grid-cols-1 items-center gap-10 pb-20 pt-[calc(var(--header-h)+32px)] md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-[1.12fr_0.88fr] md:gap-8 md:pt-[calc(var(--header-h)+40px)] lg:gap-10 lg:pb-28">
          {/* ---------------- COPY ---------------- */}
          <div className="relative z-10">
            <span data-hero="eyebrow" className="eyebrow-on-ink">
              Commercial strength equipment
            </span>

            {/* The copy column narrows sharply at the tablet breakpoint (it
                becomes roughly half the viewport), so the display scale is
                held back until `lg` — at 820px the full clamp rendered 61px
                type into a 339px column and broke every line. */}
            <h1
              data-hero="title"
              className="mt-6 text-[clamp(2.3rem,8vw,2.6rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white [text-wrap:balance] md:mt-7 lg:text-display-xl"
            >
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">Built for floors</span>
              </span>
              <span data-hero="line" className="block overflow-hidden">
                <span className="block">that <span className="text-primary-fixed-dim">never close.</span></span>
              </span>
            </h1>

            <p data-hero="body" className="mt-7 max-w-lg text-body-lg text-white/60">
              Selectorized circuits, iso-lateral plate-loaded stations, racks, benches and
              storage — specified, delivered and installed by the people who build them.
            </p>

            <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="btn btn-lg group bg-white text-ink-900 hover:bg-primary-fixed-dim">
                <span className="flex items-center gap-2.5">
                  Explore the catalogue
                  <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/contact" className="btn btn-lg btn-on-ink">
                Talk to sales
              </Link>
            </div>

            {/* Verifiable figures only — each one is derived from the catalogue. */}
            <dl
              data-hero="stats"
              className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:mt-12"
            >
              {stats.map((s) => (
                <div key={s.label} className="bg-ink-900/80 px-4 py-5 backdrop-blur-sm">
                  <dt className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-label-sm uppercase text-white/45">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- VISUAL ---------------- */}
          {/* No `justify-self-end` here: it would shrink the grid item to its
              content width and leave `w-full` below with nothing to fill. The
              item stretches; the inner wrapper handles alignment. */}
          <div data-hero="visual" className="relative w-full">
            {/* Technical corner marks — engineering drawing, not decoration */}
            <span aria-hidden className="absolute -left-3 -top-3 h-10 w-10 border-l border-t border-white/20" />
            <span aria-hidden className="absolute -bottom-3 -right-3 h-10 w-10 border-b border-r border-white/20" />

            {/* The catalogue photography is shot on white. Rather than fight
                that on a dark hero, the panel is treated as a lit studio
                plate: the photo's own white becomes the backdrop, a vignette
                seats it into the frame, and a hairline keeps its edge crisp
                against the ink. */}
            <div
              data-hero="visual-inner"
              className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-white/15 md:ml-auto md:max-w-none lg:max-w-[600px]"
            >
              <Image
                src={heroProduct.image}
                alt={`${heroProduct.name} — AFZOX ${heroProduct.collectionName} commercial gym equipment`}
                fill
                priority
                sizes="(max-width:768px) 88vw, (max-width:1024px) 46vw, 600px"
                className="object-contain p-8 lg:p-12"
              />
              {/* Seats the machine on the plate instead of letting it float
                  on a flat white field. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_46%,transparent_55%,rgba(11,14,22,0.10)_100%)]"
              />
            </div>

            {/* Caption rail — names the machine actually on screen */}
            <div
              data-hero="caption"
              className="mt-4 flex max-w-[440px] items-center justify-between gap-4 border-t border-white/10 pt-4 md:ml-auto md:max-w-none lg:max-w-[600px]"
            >
              <div className="min-w-0">
                <p className="text-label-sm uppercase text-primary-fixed-dim">
                  {heroProduct.collectionName}
                </p>
                <p className="mt-1 truncate font-display text-base font-semibold text-white">
                  {heroProduct.name}
                </p>
              </div>
              <Link
                href={`/product/${heroProduct.slug}`}
                className="shrink-0 text-label-sm uppercase text-white/50 transition-colors duration-micro hover:text-white"
              >
                View&nbsp;→
              </Link>
            </div>
          </div>
        </div>
      </HeroMotion>

      {/* ---------------- Scroll cue ---------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
      >
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-primary-fixed-dim" />
        </span>
      </div>
    </section>
  );
}
