import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopExplorer from '@/components/ShopExplorer';
import { brandName } from '@/lib/brand';
import { ALL_CATEGORIES, COLLECTIONS, getCategory, getCollection } from '@/lib/catalogue';
import { SITE_URL } from '@/lib/site';

/**
 * One dynamic segment serves both levels of the hierarchy:
 *
 *   /shop/afzox-series     → the AFZOX SERIES collection
 *   /shop/hs-series        → the HS SERIES collection
 *   /shop/ps-series        → the PS SERIES collection
 *   /shop/bb-series        → the BB SERIES collection
 *   /shop/plate-loaded     → a range inside AFZOX Series  (unchanged URL)
 *   /shop/hs-plate-loaded  → a range inside HS Series
 *   /shop/ps-legs-glutes   → a range inside PS Series
 *   /shop/bb-glutes-hips   → a range inside BB Series
 *
 * Collection slugs are resolved first. Because collection and category slugs
 * are validated as mutually exclusive when the catalogue is built, a segment
 * can never mean both things.
 */
export function generateStaticParams() {
  return [
    ...COLLECTIONS.map((c) => ({ category: c.slug })),
    ...ALL_CATEGORIES.map((c) => ({ category: c.slug })),
  ];
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const collection = getCollection(params.category);
  if (collection) {
    return {
      // The collection name may already start with "AFZOX" (AFZOX Series) —
      // don't prefix it twice.
      title: `${collection.name.startsWith('AFZOX') ? '' : 'AFZOX '}${collection.name} — ${collection.count} Products`,
      description: collection.desc,
      alternates: { canonical: collection.url },
      openGraph: { title: `${collection.name.startsWith('AFZOX') ? '' : 'AFZOX '}${collection.name}`, images: [{ url: `${SITE_URL}${collection.imageLg}` }], type: 'website' },
    };
  }

  const cat = getCategory(params.category);
  if (!cat) return {};
  const parent = getCollection(cat.collection);
  return {
    title: `${cat.name} — ${cat.count} Machines`,
    description: `${cat.desc} Browse ${cat.count} ${cat.name.toLowerCase()} from the ${parent ? brandName(parent.name) : 'AFZOX'} collection, manufactured and installed across India.`,
    alternates: { canonical: `/shop/${cat.slug}` },
    openGraph: { images: [{ url: `${SITE_URL}${cat.imageLg}` }], type: 'website' },
  };
}

export default function ShopSegmentPage({ params }: { params: { category: string } }) {
  const collection = getCollection(params.category);
  if (collection) {
    return (
      <div className="shell section !pt-8">
        <ShopExplorer initialCollection={collection.slug} lockCollection />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
                { '@type': 'ListItem', position: 3, name: collection.name },
              ],
            }),
          }}
        />
      </div>
    );
  }

  const cat = getCategory(params.category);
  if (!cat) notFound();

  return (
    <div className="shell section !pt-8">
      <ShopExplorer initialCollection={cat.collection} initialCategory={cat.slug} lockCollection />
    </div>
  );
}
