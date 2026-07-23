import raw from './catalogue-data.json';
import type { Brand, Category, FilterState, Product } from './types';

export const BRAND = raw.brand as unknown as Brand;
export const CATEGORIES = raw.categories as unknown as Category[];
export const PRODUCTS = raw.products as unknown as Product[];

/** Pre-filled WhatsApp deep link for a single product, or a general enquiry. */
export function whatsAppLink(productName?: string): string {
  const msg = productName
    ? `Hi AFZOX, I'm interested in the ${productName}. Please send me the price and specifications.`
    : `Hi AFZOX, I'd like a quote for gym equipment. Please get in touch.`;
  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(msg)}`;
}

/** WhatsApp deep link listing several products at once — used by the enquiry cart. */
export function whatsAppLinkMulti(productNames: string[], note?: string): string {
  const list = productNames.map((n, i) => `${i + 1}. ${n}`).join('\n');
  const msg =
    `Hi AFZOX, I'd like a quotation for the following equipment:\n\n${list}` +
    (note ? `\n\nAdditional notes: ${note}` : '') +
    `\n\nPlease send pricing, specifications and delivery timelines.`;
  return `https://wa.me/${BRAND.phoneRaw}?text=${encodeURIComponent(msg)}`;
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function relatedProducts(p: Product): Product[] {
  return p.related.map((s) => getProduct(s)).filter((x): x is Product => Boolean(x));
}

export function featuredProducts(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.featured)
    .sort((a, b) => b.popular - a.popular)
    .slice(0, limit);
}

const haystackOf = (p: Product) =>
  [p.name, p.sku, p.categoryName, p.tier, p.short, p.targets.join(' '), p.applications.join(' '), p.features.join(' ')]
    .join(' ')
    .toLowerCase();

export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return PRODUCTS.slice();
  return PRODUCTS.filter((p) => terms.every((t) => haystackOf(p).includes(t)));
}

const SORTERS: Record<NonNullable<FilterState['sort']>, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || b.popular - a.popular,
  popular: (a, b) => b.popular - a.popular,
  newest: (a, b) => b.added - a.added,
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
};

export function filterProducts(state: FilterState): Product[] {
  let list = searchProducts(state.query ?? '');
  if (state.category && state.category !== 'all') list = list.filter((p) => p.category === state.category);
  if (state.usage === 'home') list = list.filter((p) => p.isHome);
  if (state.usage === 'commercial') list = list.filter((p) => p.isCommercial);
  if (state.band && state.band !== 'all') list = list.filter((p) => p.band === state.band);
  const sorter = SORTERS[state.sort ?? 'featured'];
  return list.slice().sort(sorter);
}

export const BAND_LABEL: Record<Product['band'], string> = {
  premium: 'Premium',
  standard: 'Standard',
  value: 'Value',
};
