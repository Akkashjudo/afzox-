import rawAfzoxCore from './catalogue-data.json';
import rawAfzoxExtra from './afzox-series-extra.json';
import rawHsSeries from './hs-series-data.json';
import rawPsSeries from './ps-series-data.json';
import rawBbSeries from './bb-series-data.json';
import type { BodyArea, Brand, Category, Collection, FilterState, PriceBand, Product } from './types';

export const BRAND = rawAfzoxCore.brand as unknown as Brand;

/* ------------------------------------------------------------------ *
 * Collections
 *
 * AFZOX SERIES, HS SERIES, PS SERIES and BB SERIES are separate, sibling
 * collections. They share the same product components but their datasets
 * never merge: every product carries a `collection` slug, and every category
 * belongs to exactly one collection. Nothing in this module can put a product
 * from one collection into another collection's view.
 *
 * AFZOX SERIES is the collection formerly labelled "Accessories". Its ranges
 * are its sub-series: the seven original ones plus the two added from the
 * 2026 catalogues. Product slugs and image paths were deliberately left
 * untouched by that rename, so every existing product URL still resolves.
 * ------------------------------------------------------------------ */

export const AFZOX_SERIES_SLUG = 'afzox-series';
/** @deprecated Retained so older imports keep compiling. Use AFZOX_SERIES_SLUG. */
export const ACCESSORIES_SLUG = AFZOX_SERIES_SLUG;
export const HS_SERIES_SLUG = 'hs-series';
export const PS_SERIES_SLUG = 'ps-series';
export const BB_SERIES_SLUG = 'bb-series';

/** Equipment type for each of the seven original AFZOX Series ranges. */
const ACCESSORY_EQUIPMENT_TYPE: Record<string, string> = {
  'plate-loaded': 'Plate Loaded Machine',
  'pin-loaded': 'Selectorized Machine',
  benches: 'Bench',
  'racks-rigs': 'Rack',
  functional: 'Cable Machine',
  storage: 'Storage',
  cardio: 'Cardio',
};

/** Muscle-name fragments mapped to the body area they belong to. */
const BODY_AREA_RULES: [BodyArea, string[]][] = [
  ['Chest', ['pectoral', 'chest', 'pec ']],
  ['Back', ['latissimus', 'lat ', 'lats', 'rhomboid', 'trapezius', 'erector', 'spinae', 'back']],
  ['Shoulders', ['deltoid', 'shoulder', 'rotator', 'delts']],
  ['Arms', ['bicep', 'tricep', 'brachii', 'brachialis', 'brachioradialis', 'forearm']],
  ['Legs', ['quadricep', 'quads', 'hamstring', 'calf', 'calves', 'gastrocnemius', 'soleus', 'adductor', 'abductor', 'tibialis', 'leg', 'thigh']],
  ['Glutes', ['glute']],
  ['Core', ['abdomin', 'oblique', 'core', 'hip flexor', 'transverse']],
  ['Full Body', ['full body', 'total body']],
];

function deriveBodyAreas(targets: string[]): BodyArea[] {
  const hay = targets.join(' | ').toLowerCase();
  const found = BODY_AREA_RULES.filter(([, frags]) => frags.some((f) => hay.includes(f))).map(([area]) => area);
  return found.length ? found : [];
}

/**
 * The original AFZOX Series products are read straight from the catalogue file
 * and normalised in memory. `catalogue-data.json` itself is never modified —
 * every existing id, slug, image path and URL is preserved byte-for-byte, so
 * the Accessories -> AFZOX Series rename breaks no product link.
 */
const ACCESSORY_PRODUCTS: Product[] = (rawAfzoxCore.products as unknown as Record<string, unknown>[]).map((p) => {
  const base = p as unknown as Omit<Product, 'collection' | 'collectionName' | 'series' | 'equipmentType' | 'bodyAreas' | 'images' | 'tags'>;
  return {
    ...base,
    collection: AFZOX_SERIES_SLUG,
    collectionName: 'AFZOX Series',
    series: base.tier,
    equipmentType: ACCESSORY_EQUIPMENT_TYPE[base.category] ?? 'Strength Machine',
    bodyAreas: deriveBodyAreas(base.targets),
    images: [base.image],
    tags: [base.name, base.categoryName, base.tier, ...base.targets],
  };
});

const HS_PRODUCTS = rawHsSeries.products as unknown as Product[];
const PS_PRODUCTS = rawPsSeries.products as unknown as Product[];
const BB_PRODUCTS = rawBbSeries.products as unknown as Product[];

/** The two ranges added from the 2026 catalogues, merged into AFZOX Series. */
const AFZOX_EXTRA_PRODUCTS = rawAfzoxExtra.products as unknown as Product[];

const ACCESSORY_CATEGORIES: Category[] = [
  ...(rawAfzoxCore.categories as unknown as Category[]),
  ...(rawAfzoxExtra.categories as unknown as Category[]),
].map((c) => ({ ...c, collection: AFZOX_SERIES_SLUG }));

const HS_CATEGORIES: Category[] = (rawHsSeries.categories as unknown as Category[]).map((c) => ({
  ...c,
  collection: HS_SERIES_SLUG,
}));

const PS_CATEGORIES: Category[] = (rawPsSeries.categories as unknown as Category[]).map((c) => ({
  ...c,
  collection: PS_SERIES_SLUG,
}));

const BB_CATEGORIES: Category[] = (rawBbSeries.categories as unknown as Category[]).map((c) => ({
  ...c,
  collection: BB_SERIES_SLUG,
}));

const accessoriesHero = ACCESSORY_PRODUCTS.find((p) => p.slug === 'plate-loaded-chest-press-pec-deck') ?? ACCESSORY_PRODUCTS[0];
const hsHero = HS_PRODUCTS.find((p) => p.slug === 'hs-plate-loaded-chest-press') ?? HS_PRODUCTS[0];
const psHero = PS_PRODUCTS.find((p) => p.slug === 'ps-seated-chest-press') ?? PS_PRODUCTS[0];
const bbHero = BB_PRODUCTS.find((p) => p.slug === 'bb-hip-thrust') ?? BB_PRODUCTS[0];

export const COLLECTIONS: Collection[] = [
  {
    slug: AFZOX_SERIES_SLUG,
    name: 'AFZOX Series',
    displayName: 'AFZOX SERIES',
    short: 'The core AFZOX commercial range',
    desc:
      'The core AFZOX catalogue — plate loaded and pin loaded machines, racks and rigs, benches, cable stations, storage, studio cardio, selectorized strength and functional training equipment. Manufactured and installed across India.',
    url: `/shop/${AFZOX_SERIES_SLUG}`,
    count: ACCESSORY_PRODUCTS.length + AFZOX_EXTRA_PRODUCTS.length,
    image: accessoriesHero.imageMd,
    imageLg: accessoriesHero.image,
  },
  {
    ...(rawHsSeries.collection as unknown as Omit<Collection, 'image' | 'imageLg'>),
    image: hsHero.imageMd,
    imageLg: hsHero.image,
  },
  {
    ...(rawPsSeries.collection as unknown as Omit<Collection, 'image' | 'imageLg'>),
    image: psHero.imageMd,
    imageLg: psHero.image,
  },
  {
    ...(rawBbSeries.collection as unknown as Omit<Collection, 'image' | 'imageLg'>),
    image: bbHero.imageMd,
    imageLg: bbHero.image,
  },
];

/** Every product across every collection, AFZOX Series first. */
export const PRODUCTS: Product[] = [
  ...ACCESSORY_PRODUCTS,
  ...AFZOX_EXTRA_PRODUCTS,
  ...HS_PRODUCTS,
  ...PS_PRODUCTS,
  ...BB_PRODUCTS,
];

/**
 * Every range carries the number of products actually in it, counted from
 * PRODUCTS rather than read from the JSON. The `count` fields in the data
 * files are a snapshot of the moment they were written; adding a product to
 * an existing range would otherwise leave the range card, the mega menu and
 * the range header all quoting a stale figure.
 */
function withLiveCount(categories: Category[]): Category[] {
  const totals = new Map<string, number>();
  for (const p of PRODUCTS) totals.set(p.category, (totals.get(p.category) ?? 0) + 1);
  return categories.map((c) => ({ ...c, count: totals.get(c.slug) ?? 0 }));
}

/**
 * Every AFZOX Series range — the seven original ones plus the two added from
 * the 2026 catalogues. Exported under the original name so existing pages
 * (/categories, the mega menu, the footer) keep working unchanged.
 */
export const CATEGORIES: Category[] = withLiveCount(ACCESSORY_CATEGORIES);

/** Every category across every collection. */
export const ALL_CATEGORIES: Category[] = withLiveCount([
  ...ACCESSORY_CATEGORIES,
  ...HS_CATEGORIES,
  ...PS_CATEGORIES,
  ...BB_CATEGORIES,
]);

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/** Products belonging to one collection, and only that collection. */
export function collectionProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.collection === slug);
}

/** Categories belonging to one collection, and only that collection. */
export function collectionCategories(slug: string): Category[] {
  return ALL_CATEGORIES.filter((c) => c.collection === slug);
}

/* ------------------------------------------------------------------ *
 * Enquiry links
 * ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ *
 * Lookups
 * ------------------------------------------------------------------ */

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return BY_SLUG.get(slug);
}

export function getCategory(slug: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Related products, resolved from slugs. Anything that no longer exists is
 * dropped, and cross-collection suggestions are refused — a PS Series page
 * only ever recommends PS Series machines, and the same holds for every
 * other collection.
 */
export function relatedProducts(p: Product): Product[] {
  return p.related
    .map((s) => getProduct(s))
    .filter((x): x is Product => Boolean(x) && x!.collection === p.collection);
}

export function featuredProducts(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.featured)
    .sort((a, b) => b.popular - a.popular)
    .slice(0, limit);
}

/* ------------------------------------------------------------------ *
 * Search & filtering
 * ------------------------------------------------------------------ */

/** Pre-computed lowercase search index — built once, not per keystroke. */
const HAYSTACK = new Map(
  PRODUCTS.map((p) => [
    p.slug,
    [
      p.name,
      p.sku,
      p.collectionName,
      p.series,
      p.categoryName,
      p.equipmentType,
      p.tier,
      p.short,
      p.bodyAreas.join(' '),
      p.targets.join(' '),
      p.applications.join(' '),
      p.features.join(' '),
      p.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase(),
  ])
);

const matches = (p: Product, terms: string[]) => {
  const hay = HAYSTACK.get(p.slug) ?? '';
  return terms.every((t) => hay.includes(t));
};

export function searchProducts(query: string, within: Product[] = PRODUCTS): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return within.slice();
  return within.filter((p) => matches(p, terms));
}

const SORTERS: Record<NonNullable<FilterState['sort']>, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || b.popular - a.popular,
  popular: (a, b) => b.popular - a.popular,
  newest: (a, b) => b.added - a.added,
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
};

/**
 * Filter groups combine with AND; options inside a group combine with OR.
 * The collection filter is applied first and is never widened by any other
 * filter, so selecting PS SERIES can only ever narrow the result to PS
 * SERIES products — no search term or body-area choice can reintroduce a
 * machine from another collection.
 */
export function filterProducts(state: FilterState): Product[] {
  let list: Product[] = PRODUCTS;

  if (state.collection && state.collection !== 'all') {
    list = list.filter((p) => p.collection === state.collection);
  }
  if (state.category && state.category !== 'all') {
    list = list.filter((p) => p.category === state.category);
  }
  if (state.bodyAreas?.length) {
    list = list.filter((p) => state.bodyAreas!.some((a) => p.bodyAreas.includes(a)));
  }
  if (state.equipmentTypes?.length) {
    list = list.filter((p) => state.equipmentTypes!.includes(p.equipmentType));
  }
  if (state.usage === 'home') list = list.filter((p) => p.isHome);
  if (state.usage === 'commercial') list = list.filter((p) => p.isCommercial);
  if (state.band && state.band !== 'all') list = list.filter((p) => p.band === state.band);

  list = searchProducts(state.query ?? '', list);

  return list.sort(SORTERS[state.sort ?? 'featured']);
}

export const BAND_LABEL: Record<PriceBand, string> = {
  premium: 'Premium',
  standard: 'Standard',
  value: 'Value',
};

export const BODY_AREA_ORDER: BodyArea[] = [
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs',
  'Glutes',
  'Core',
  'Full Body',
];

/** Body areas that actually have products in `within` — never an empty option. */
export function availableBodyAreas(within: Product[]): BodyArea[] {
  const present = new Set(within.flatMap((p) => p.bodyAreas));
  return BODY_AREA_ORDER.filter((a) => present.has(a));
}

/** Equipment types that actually have products in `within` — never an empty option. */
export function availableEquipmentTypes(within: Product[]): string[] {
  return Array.from(new Set(within.map((p) => p.equipmentType))).sort((a, b) => a.localeCompare(b));
}
