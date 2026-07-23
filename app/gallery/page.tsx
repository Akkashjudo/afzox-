import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { PRODUCTS } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Equipment Gallery',
  description: 'A high-resolution visual gallery of every AFZOX commercial gym machine — plate loaded, pin loaded, racks, benches, cable stations and cardio.',
  alternates: { canonical: '/gallery' },
};

// A deliberately varied row-span pattern for a masonry feel without layout shift.
const SPANS = ['row-span-2', '', '', 'row-span-2', '', '', '', 'row-span-2', '', '', '', ''];

export default function GalleryPage() {
  const shots = PRODUCTS.slice(0, 24);
  return (
    <div className="shell section !pt-8">
      {/* Above the fold — renders immediately, no scroll-reveal gating. */}
      <span className="eyebrow">Gallery</span>
      <h1 className="mt-4 max-w-2xl text-headline-xl">Equipment, photographed straight off the line.</h1>
      <p className="mt-3 max-w-xl text-body-md text-on-surface-variant">
        Every image here is the real product — no stock photography. Click through to any
        machine for full specifications.
      </p>

      <div className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-3 sm:grid-cols-3 md:auto-rows-[200px] lg:grid-cols-4">
        {shots.map((p, i) => {
          const tile = (
            <Link
              href={`/product/${p.slug}`}
              className="group relative block h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-surface to-surface-container"
            >
              <Image
                src={p.imageMd}
                alt={p.name}
                fill
                sizes="(max-width:640px) 48vw, (max-width:1024px) 32vw, 23vw"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                loading={i < 6 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold text-white">{p.name}</span>
              </div>
            </Link>
          );
          // First six tiles are eager-loaded and likely in the initial viewport —
          // render them immediately rather than gating them behind opacity:0
          // until an IntersectionObserver fires post-hydration.
          if (i < 6) {
            return <div key={p.slug} className={SPANS[i % SPANS.length]}>{tile}</div>;
          }
          return (
            <Reveal key={p.slug} delay={Math.min(i, 8) * 0.03} className={SPANS[i % SPANS.length]}>
              {tile}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 text-center">
        <Link href="/shop" className="btn btn-secondary">Browse full catalogue</Link>
      </Reveal>
    </div>
  );
}
