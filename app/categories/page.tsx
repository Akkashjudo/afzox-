import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import CategoryCard from '@/components/CategoryCard';
import { CATEGORIES } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'All Equipment Categories',
  description: 'Seven equipment ranges from AFZOX — Plate Loaded, Pin Loaded, Benches, Racks & Rigs, Functional & Cable, Storage and Cardio.',
  alternates: { canonical: '/categories' },
};

export default function CategoriesPage() {
  return (
    <div className="shell section !pt-8">
      {/* Above the fold — renders immediately, no scroll-reveal gating. */}
      <span className="eyebrow">The catalogue</span>
      <h1 className="mt-3 text-headline-xl">
        Seven ranges. <span className="text-primary">One build standard.</span>
      </h1>
      <p className="mt-3 max-w-xl text-body-md text-on-surface-variant">
        Every category tile shows a real AFZOX machine from that range — the machine on the
        tile is the machine that ships.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.slug} delay={0.04 * i} className={i === 0 ? 'md:col-span-2' : ''}>
            <CategoryCard category={c} large={i === 0} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
