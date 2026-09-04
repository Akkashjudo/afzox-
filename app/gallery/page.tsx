import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { COLLECTIONS, PRODUCTS, collectionProducts } from '@/lib/catalogue';
import { IconArrow } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Equipment Gallery',
  description: `Studio photography of the AFZOX range — ${PRODUCTS.length} commercial machines across ${COLLECTIONS.length} series, shot on the line rather than sourced from stock.`,
  alternates: { canonical: '/gallery' },
};

/**
 * The gallery is grouped by series rather than presented as one undifferentiated
 * masonry wall. That gives the page an editorial spine — you are walking the
 * ranges, not scrolling a contact sheet — and it means each row can carry its
 * own count and link straight into the collection.
 */
export default function GalleryPage() {
  const rows = COLLECTIONS.map((c) => ({
    collection: c,
    shots: collectionProducts(c.slug).slice(0, 8),
  }));

  return (
    <>
      <section className="shell pb-14 pt-16 md:pt-24">
        <span className="eyebrow">Gallery</span>
        <h1 className="mt-7 max-w-3xl text-display-lg text-balance">
          Every machine here is the machine that ships.
        </h1>
        <p className="mt-7 max-w-prose text-body-lg text-on-surface-variant">
          Studio photography of the real product — no stock imagery, no renders. Open any frame
          for the full specification.
        </p>
      </section>

      {rows.map(({ collection, shots }, rowIndex) => (
        <section
          key={collection.slug}
          className={`section-tight border-t border-black/[0.07] ${rowIndex % 2 === 1 ? 'bg-paper-sunken' : ''}`}
        >
          <div className="shell">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/[0.08] pb-5">
                <div>
                  <span className="text-label-md uppercase text-brand">{collection.displayName}</span>
                  <h2 className="mt-3 text-headline-lg">{collection.short}</h2>
                </div>
                <Link href={collection.url} className="group cta-text">
                  <span className="relative">
                    All {collection.count} products
                    <span className="cta-text__line absolute -bottom-1 left-0" />
                  </span>
                  <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>

            {/* A horizontal rail on narrow screens, a grid from md up — the
                machines stay large either way instead of shrinking to thumbnails. */}
            <div className="no-scrollbar -mx-margin-mobile mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-margin-mobile pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
              {shots.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className="group relative w-[62vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-[border-color,box-shadow,transform] duration-control ease-afzox hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-card-hover sm:w-[40vw] md:w-auto"
                >
                  <div className="relative aspect-square overflow-hidden bg-paper-sunken transition-colors duration-control group-hover:bg-paper-deep">
                    <Image
                      src={p.imageMd}
                      alt={`AFZOX ${p.series} ${p.name}`}
                      fill
                      sizes="(max-width:640px) 62vw, (max-width:768px) 40vw, 22vw"
                      className="object-contain p-6 transition-transform duration-[900ms] ease-afzox group-hover:scale-[1.05]"
                      loading={rowIndex === 0 && i < 4 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div className="border-t border-black/[0.08] p-4">
                    <p className="truncate text-label-sm uppercase text-on-surface-variant/70">
                      {p.categoryName}
                    </p>
                    <p className="mt-1.5 truncate text-body-sm font-medium text-ink-900">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-tight border-t border-black/[0.07]">
        <div className="shell text-center">
          <Reveal>
            <h2 className="text-headline-lg text-balance">See the full range</h2>
            <p className="mx-auto mt-4 max-w-md text-body-md text-on-surface-variant">
              {PRODUCTS.length} machines, filterable by series, range, body area and equipment
              type.
            </p>
            <Link href="/shop" className="btn btn-primary group mt-8">
              Browse the catalogue
              <IconArrow className="h-4 w-4 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
