import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import CollectionShowcase from '@/components/CollectionShowcase';
import FeaturedRail from '@/components/FeaturedRail';
import BuildStandard from '@/components/BuildStandard';
import ClosingCta from '@/components/ClosingCta';
import { RevealText } from '@/components/motion/primitives';
import { ALL_CATEGORIES, COLLECTIONS, PRODUCTS, featuredProducts } from '@/lib/catalogue';
import { IconArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Commercial Gym Equipment Manufacturer & Supplier',
  description: `Commercial strength equipment across ${COLLECTIONS.length} AFZOX series — ${PRODUCTS.length} machines spanning selectorized circuits, plate-loaded stations, racks, benches, cable systems and storage. Specified, delivered and installed.`,
  alternates: { canonical: '/' },
};

/** Spelled-out collection count, so the headline tracks the data. */
const COUNT_WORD =
  ['no', 'one', 'two', 'three', 'four', 'five', 'six'][COLLECTIONS.length] ?? String(COLLECTIONS.length);

export default function HomePage() {
  const hero = featuredProducts(1)[0];

  /* Every figure here is counted from the catalogue at build time — nothing
     is asserted that the data cannot back up. */
  const stats = [
    { value: String(PRODUCTS.length), label: 'Machines' },
    { value: String(COLLECTIONS.length), label: 'Series' },
    { value: String(ALL_CATEGORIES.length), label: 'Ranges' },
  ];

  return (
    <>
      <Hero heroProduct={hero} stats={stats} />

      <TrustStrip />

      {/* ---------- THE SERIES ---------- */}
      <section className="section relative">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <span className="eyebrow">The catalogue</span>
              <RevealText
                as="h2"
                className="mt-6 max-w-2xl text-headline-xl capitalize-first"
                lines={[`${COUNT_WORD} series.`, 'One build standard.']}
              />
            </div>
            <Link href="/categories" className="group cta-text shrink-0">
              <span className="relative">
                All collections
                <span className="cta-text__line absolute -bottom-1 left-0" />
              </span>
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>
          </div>

          <p className="mt-5 max-w-xl text-body-md text-on-surface-variant">
            Each series is specified and stocked separately. The machine on the tile is the
            machine that ships.
          </p>
        </div>

        <CollectionShowcase collections={COLLECTIONS} />
      </section>

      {/* ---------- FEATURED EQUIPMENT ---------- */}
      <FeaturedRail products={featuredProducts(10)} total={PRODUCTS.length} />

      {/* ---------- BUILD STANDARD ---------- */}
      <BuildStandard />

      {/* ---------- CLOSING CTA ---------- */}
      <ClosingCta />
    </>
  );
}
