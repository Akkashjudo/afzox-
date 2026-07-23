import type { Metadata } from 'next';
import ShopExplorer from '@/components/ShopExplorer';
import { PRODUCTS } from '@/lib/catalogue';

export const metadata: Metadata = {
  title: 'Shop All Equipment',
  description: `Browse all ${PRODUCTS.length} AFZOX commercial gym machines — plate loaded, pin loaded, benches, racks, cable stations and cardio. Filter, search and enquire on WhatsApp.`,
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <div className="shell section !pt-8">
      <ShopExplorer />
    </div>
  );
}
