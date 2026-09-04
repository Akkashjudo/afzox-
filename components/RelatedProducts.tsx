import Reveal from './Reveal';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';

/**
 * Related equipment. Only ever fed products from the same collection —
 * `relatedProducts()` refuses cross-collection suggestions — so the heading
 * can name the series without qualification.
 */
export default function RelatedProducts({
  products,
  collectionName,
}: {
  products: Product[];
  collectionName?: string;
}) {
  if (!products.length) return null;

  return (
    <section className="section-tight border-t border-black/[0.07] bg-paper-sunken py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">Complete the floor</span>
          <h2 className="mt-6 text-headline-lg">
            More from {collectionName ? `AFZOX ${collectionName}` : 'this range'}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={0.05 * i}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
