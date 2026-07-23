import Reveal from './Reveal';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="section bg-surface">
      <div className="shell">
        <Reveal>
          <h2 className="text-headline-lg">Complete Your Setup</h2>
          <p className="mt-2 text-sm text-on-surface-variant">Related equipment from the same range</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
