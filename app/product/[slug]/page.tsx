import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import ProductBuyBox from '@/components/ProductBuyBox';
import ProductTabs from '@/components/ProductTabs';
import RelatedProducts from '@/components/RelatedProducts';
import Reveal from '@/components/Reveal';
import { PRODUCTS, getCategory, getProduct, relatedProducts, whatsAppLink } from '@/lib/catalogue';
import { SITE_URL } from '@/lib/site';
import { IconChevRight, IconWhatsApp } from '@/components/icons';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.short} ${p.specs['Warranty']?.split('·')[0].trim() ?? ''}. Manufactured and installed across India by AFZOX.`,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: { images: [{ url: `${SITE_URL}${p.image}` }], type: 'website' },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category)!;
  const related = relatedProducts(product);

  return (
    <>
      <div className="shell pt-8">
        <nav className="flex items-center gap-1.5 text-xs text-on-surface-variant" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">Home</Link>
          <IconChevRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <IconChevRight className="h-3 w-3" />
          <Link href={category.url} className="hover:text-primary">{category.name}</Link>
          <IconChevRight className="h-3 w-3" />
          <span aria-current="page" className="text-on-background">{product.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal><ProductGallery product={product} /></Reveal>
          <Reveal delay={0.08}><ProductBuyBox product={product} /></Reveal>
        </div>
      </div>

      <div className="shell section">
        <Reveal><ProductTabs product={product} /></Reveal>
      </div>

      <RelatedProducts products={related} />

      <section className="shell py-14 text-center">
        <p className="text-sm text-on-surface-variant">Still deciding? Send us your requirement directly.</p>
        <a
          href={whatsAppLink(product.name)}
          target="_blank"
          rel="noopener"
          className="btn btn-whatsapp mt-4 inline-flex !normal-case"
        >
          <IconWhatsApp className="h-4 w-4" /> WhatsApp about the {product.name}
        </a>
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
                image: [`${SITE_URL}${product.image}`],
                category: category.name,
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
                  { '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}${category.url}` },
                  { '@type': 'ListItem', position: 4, name: product.name },
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
