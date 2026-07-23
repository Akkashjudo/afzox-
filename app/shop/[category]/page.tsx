import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopExplorer from '@/components/ShopExplorer';
import { CATEGORIES, getCategory } from '@/lib/catalogue';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return {
    title: `${cat.name} — ${cat.count} Machines`,
    description: `${cat.desc} Browse ${cat.count} ${cat.name.toLowerCase()} from AFZOX, manufactured and installed across India.`,
    alternates: { canonical: `/shop/${cat.slug}` },
  };
}

export default function CategoryShopPage({ params }: { params: { category: string } }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  return (
    <div className="shell section !pt-8">
      <ShopExplorer initialCategory={cat.slug} />
    </div>
  );
}
