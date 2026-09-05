import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CategoryCard from '@/components/CategoryCard';
import CatalogueDownloads from '@/components/CatalogueDownloads';
import { brandName } from '@/lib/brand';
import { COLLECTIONS, PRODUCTS, collectionCategories } from '@/lib/catalogue';
import { IconArrow } from '@/components/icons';

/** Spelled-out collection count, so the page copy tracks the data. */
const COUNT_WORD =
  ['no', 'one', 'two', 'three', 'four', 'five', 'six'][COLLECTIONS.length] ?? String(COLLECTIONS.length);

export const metadata: Metadata = {
  title: 'Collections & Equipment Ranges',
  description: `${COLLECTIONS.length} AFZOX collections — ${COLLECTIONS.map((c) => `${c.displayName} (${c.count} products)`).join(', ')} — covering plate loaded, pin loaded, cable, benches, racks, storage and cardio.`,
  alternates: { canonical: '/categories' },
};

export default function CategoriesPage() {
  return (
    <>
      {/* Above the fold — renders immediately, no scroll-reveal gating. */}
      <section className="shell pb-14 pt-16 md:pt-24">
        <span className="eyebrow">The catalogue</span>
        <h1 className="capitalize-first mt-7 max-w-3xl text-display-lg text-balance">
          {COUNT_WORD} collections. One build standard.
        </h1>
        <p className="mt-7 max-w-prose text-body-lg text-on-surface-variant">
          {PRODUCTS.length} machines in total, kept in {COUNT_WORD} separate collections so a
          specification never crosses over. Every tile shows a real AFZOX machine from that range —
          the machine on the tile is the machine that ships.
        </p>
      </section>

      {/* ---------- COLLECTIONS — siblings, never nested ---------- */}
      <section className="shell pb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {COLLECTIONS.map((col, i) => (
            <Link
              key={col.slug}
              href={col.url}
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-[border-color,box-shadow,transform] duration-control ease-afzox hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-paper-sunken transition-colors duration-control group-hover:bg-paper-deep">
                <Image
                  src={col.imageLg}
                  alt={`${brandName(col.name)} collection — commercial gym equipment`}
                  fill
                  sizes="(max-width:640px) 92vw, (max-width:1280px) 46vw, 24vw"
                  className="object-contain p-8 transition-transform duration-[900ms] ease-afzox group-hover:scale-[1.04]"
                  priority={i < 2}
                />
                <span className="absolute left-4 top-4 text-label-sm uppercase text-on-surface-variant/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-1 flex-col border-t border-black/[0.08] p-6">
                <p className="text-label-md uppercase text-brand">{col.displayName}</p>
                <h2 className="mt-3 text-headline-sm">
                  {col.count} <span className="font-normal text-on-surface-variant">products</span>
                </h2>
                <p className="mt-2 text-body-sm text-on-surface-variant">{col.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-label-sm uppercase text-ink-900">
                  View collection
                  <IconArrow className="h-3.5 w-3.5 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- RANGES WITHIN EACH COLLECTION ---------- */}
      {COLLECTIONS.map((col) => {
        const cats = collectionCategories(col.slug);
        return (
          <section key={col.slug} className="shell section-tight">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/[0.08] pb-5">
                <div>
                  <span className="text-label-md uppercase text-brand">{col.displayName}</span>
                  <h2 className="mt-3 text-headline-lg">
                    {cats.length} {cats.length === 1 ? 'range' : 'ranges'}
                  </h2>
                </div>
                <Link href={col.url} className="group cta-text">
                  <span className="relative">
                    All {col.count} products
                    <span className="cta-text__line absolute -bottom-1 left-0" />
                  </span>
                  <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cats.map((c, i) => (
                <Reveal key={c.slug} delay={0.04 * i}>
                  <CategoryCard category={c} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <CatalogueDownloads />
    </>
  );
}
