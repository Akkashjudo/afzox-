import type { Metadata } from 'next';
import ShopExplorer from '@/components/ShopExplorer';
import { COLLECTIONS, PRODUCTS } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Shop All Equipment',
  description: `Browse all ${PRODUCTS.length} AFZOX commercial gym machines across the ${COLLECTIONS.map((c) => c.name).join(', ')} collections — plate loaded, pin loaded, benches, racks, cable stations and storage. Filter, search and enquire on WhatsApp.`,
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <div className="shell section !pt-8">
      <ShopExplorer />
      <p className="sr-only">
        AFZOX equipment is organised into {COLLECTIONS.length} separate collections:{' '}
        {COLLECTIONS.map((c) => `${c.displayName} (${c.count} products)`).join(' and ')}.
      </p>
    </div>
  );
}
