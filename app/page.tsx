import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CapabilityMarquee from '@/components/CapabilityMarquee';
import CollectionShowcase from '@/components/CollectionShowcase';
import FeaturedRail from '@/components/FeaturedRail';
import BuildStandard from '@/components/BuildStandard';
import ClosingCta from '@/components/ClosingCta';
import EquipmentFamilies from '@/components/EquipmentFamilies';
import { RevealText } from '@/components/motion/primitives';
import { COLLECTIONS, featuredProducts } from '@/lib/catalogue';
import { FAMILIES } from '@/lib/families';
import { IconArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Commercial Gym Equipment Manufacturer & Supplier',
  description: `Commercial strength equipment across ${COLLECTIONS.length} AFZOX series — selectorized circuits, plate-loaded stations, racks, benches, cable systems and storage. Specified, delivered and installed.`,
  alternates: { canonical: '/' },
};

/** Spelled-out collection count, so the headline tracks the data. */
const COUNT_WORD =
  ['no', 'one', 'two', 'three', 'four', 'five', 'six'][COLLECTIONS.length] ?? String(COLLECTIONS.length);

export default function HomePage() {
  /* Shaped on the server and passed down already trimmed — the client
     component receives six cards, not 355 product records. The alt text names
     the machine in the photograph rather than the category, because that is
     what a screen reader user is actually being shown. */
  const families = FAMILIES.map((f) => ({
    slug: f.slug,
    name: f.name,
    blurb: f.blurb,
    href: f.href,
    thumb: f.thumb.imageMd,
    thumbAlt: `AFZOX ${f.thumb.name}`,
  }));

  return (
    <>
      <Hero />

      <CapabilityMarquee />

      <EquipmentFamilies families={families} />

      {/* ---------- FEATURED EQUIPMENT ---------- */}
      <FeaturedRail products={featuredProducts(10)} />

      {/* ---------- THE SERIES ----------
           After the equipment categories and a look at real machines, not
           before them. Series names (HS, PS, BB, LF, CB) are insider
           vocabulary: they mean nothing until you already know the
           catalogue, so leading with them asked a first-time visitor to
           learn the filing system before seeing a product. */}
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

      {/* ---------- BUILD STANDARD ---------- */}
      <BuildStandard />

      {/* ---------- CLOSING CTA ---------- */}
      <ClosingCta />
    </>
  );
}
