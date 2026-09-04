import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import ProductBuyBox from '@/components/ProductBuyBox';
import ProductTabs from '@/components/ProductTabs';
import RelatedProducts from '@/components/RelatedProducts';
import { PRODUCTS, getCategory, getCollection, getProduct, relatedProducts, whatsAppLink } from '@/lib/catalogue';
import { SITE_URL } from '@/lib/site';
import { IconChevRight, IconWhatsApp } from '@/components/icons';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} | ${p.collectionName}`,
    description: `${p.short} AFZOX ${p.collectionName} commercial gym equipment.`,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title: `AFZOX ${p.name} — ${p.collectionName}`,
      description: p.short,
      images: [{ url: `${SITE_URL}${p.image}` }],
      type: 'website',
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const collection = getCollection(product.collection)!;
  const related = relatedProducts(product);

  return (
    <>
      <div className="shell pt-8">
        <nav
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-label-sm uppercase text-on-surface-variant/70"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="transition-colors duration-micro hover:text-brand">Home</Link>
          <IconChevRight className="h-3 w-3 shrink-0 opacity-50" />
          <Link href="/shop" className="transition-colors duration-micro hover:text-brand">Shop</Link>
          <IconChevRight className="h-3 w-3 shrink-0 opacity-50" />
          <Link href={collection.url} className="transition-colors duration-micro hover:text-brand">
            {collection.name}
          </Link>
          <IconChevRight className="h-3 w-3 shrink-0 opacity-50" />
          <Link href={category.url} className="transition-colors duration-micro hover:text-brand">
            {category.name}
          </Link>
          <IconChevRight className="h-3 w-3 shrink-0 opacity-50" />
          <span aria-current="page" className="text-ink-900">{product.name}</span>
        </nav>

        {/* Above the fold — must render fully visible immediately; this
            gallery image is the LCP element on every product page. */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ProductGallery product={product} />
          <ProductBuyBox product={product} />
        </div>
      </div>

      <div className="shell section">
        <ProductTabs product={product} />
      </div>

      <RelatedProducts products={related} collectionName={collection.name} />

      {/* ---------- Closing enquiry ---------- */}
      <section className="surface-ink grain on-ink relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid-dark absolute inset-0" />
        </div>
        <div className="shell section-tight">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="eyebrow-on-ink">Enquire</span>
              <h2 className="mt-6 max-w-xl text-headline-lg text-white text-balance">
                Specify the {product.name} into your floor plan.
              </h2>
              <p className="mt-4 max-w-md text-body-md text-white/55">
                Send your requirement and we’ll confirm specification, lead time and delivery.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={whatsAppLink(product.name)}
                target="_blank"
                rel="noopener"
                className="btn btn-whatsapp"
              >
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <Link href="/contact" className="btn btn-on-ink">
                Send an enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                name: product.name,
                sku: product.sku,
                description: product.short,
                image: product.images.map((src) => `${SITE_URL}${src}`),
                category: `${collection.name} › ${category.name}`,
                brand: { '@type': 'Brand', name: 'AFZOX' },
                manufacturer: { '@type': 'Organization', name: 'AFZOX Fitness' },
                url: `${SITE_URL}/product/${product.slug}`,
                additionalProperty: Object.entries(product.specs).map(([name, value]) => ({
                  '@type': 'PropertyValue',
                  name,
                  value,
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                  { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
                  { '@type': 'ListItem', position: 3, name: collection.name, item: `${SITE_URL}${collection.url}` },
                  { '@type': 'ListItem', position: 4, name: category.name, item: `${SITE_URL}${category.url}` },
                  { '@type': 'ListItem', position: 5, name: product.name },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
