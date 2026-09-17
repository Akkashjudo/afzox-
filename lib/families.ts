import { PRODUCTS } from './catalogue';
import type { Product } from './types';

/**
 * Equipment families — the customer-facing way into a 355-machine catalogue.
 *
 * Why this exists, and why it is not the `category` field:
 *
 * The catalogue carries 28 `category` ranges, but they are scoped to a series,
 * so the same customer concept is split several ways: `afz-selectorized`,
 * `hs-selectorized` and `lf-selectorized` are all "selectorized machines". A
 * buyer does not think "I want HS selectorized" — they think "I want
 * selectorized machines", and they want to see every series at once. Ranges
 * are the right axis *inside* a series page and the wrong one on the homepage.
 *
 * `equipmentType` is already the cross-series axis, but twelve values is too
 * many to open with and several are tiny (2–5 machines). These six families
 * group those twelve into the units a commercial gym actually specifies and
 * budgets for. Every product lands in exactly one family, so the six counts
 * sum to the catalogue.
 *
 * Each family maps to `equipmentType` values, which is what the shop's own
 * `type` filter already accepts as a comma-separated OR group — so a family
 * card is a real, shareable catalogue URL, not a parallel filtering system.
 */
export type FamilySlug =
  | 'plate-loaded'
  | 'selectorized'
  | 'cardio'
  | 'functional'
  | 'benches-racks'
  | 'storage';

export type Family = {
  slug: FamilySlug;
  name: string;
  /** One line, said the way a buyer would say it. */
  blurb: string;
  /** `equipmentType` values this family covers. */
  types: string[];
  /** Catalogue URL with the family's filter already applied. */
  href: string;
  count: number;
  /** Machine whose photograph represents the family on the card. */
  thumb: Product;
};

const DEFS: { slug: FamilySlug; name: string; blurb: string; types: string[]; hero: string }[] = [
  {
    slug: 'plate-loaded',
    name: 'Plate Loaded',
    blurb: 'Iso-lateral and lever stations loaded with Olympic plates.',
    types: ['Plate Loaded Machine'],
    hero: 'plate-loaded-chest-press-pec-deck',
  },
  {
    slug: 'selectorized',
    name: 'Selectorized',
    blurb: 'Single-pin stack machines that keep a circuit moving.',
    types: ['Selectorized Machine', 'Multi Station'],
    hero: 'hs-seated-chest-press',
  },
  {
    slug: 'cardio',
    name: 'Cardio',
    blurb: 'Treadmills, cycles, rowers, climbers and cross trainers.',
    types: ['Cardio'],
    hero: 'cardio-treadmill-04',
  },
  {
    slug: 'functional',
    name: 'Functional Training',
    blurb: 'Cable stations, rigs, sleds and the floor kit around them.',
    types: [
      'Functional Training',
      'Cable Machine',
      'Functional Trainer',
      'Free Weight',
      'Bodyweight Station',
    ],
    hero: 'commercial-cable-crossover',
  },
  {
    slug: 'benches-racks',
    name: 'Benches & Racks',
    blurb: 'Olympic and adjustable benches, half racks and Smith machines.',
    types: ['Bench', 'Rack'],
    hero: 'olympic-squat-combo-rack',
  },
  {
    slug: 'storage',
    name: 'Storage & Racking',
    blurb: 'Dumbbell, barbell, plate and accessory storage.',
    types: ['Storage'],
    hero: 'two-tier-dumbbell-rack',
  },
];

/** Products in a family, in catalogue order. */
export function familyProducts(slug: FamilySlug): Product[] {
  const def = DEFS.find((d) => d.slug === slug);
  if (!def) return [];
  return PRODUCTS.filter((p) => def.types.includes(p.equipmentType));
}

function thumbFor(hero: string, types: string[]): Product {
  return (
    PRODUCTS.find((p) => p.slug === hero) ??
    PRODUCTS.find((p) => types.includes(p.equipmentType)) ??
    PRODUCTS[0]
  );
}

export const FAMILIES: Family[] = DEFS.map((d) => ({
  slug: d.slug,
  name: d.name,
  blurb: d.blurb,
  types: d.types,
  href: `/shop?type=${d.types.map(encodeURIComponent).join(',')}`,
  count: PRODUCTS.filter((p) => d.types.includes(p.equipmentType)).length,
  thumb: thumbFor(d.hero, d.types),
}));

/**
 * Development guard. If a new `equipmentType` is introduced and not assigned
 * to a family, its products would silently vanish from the homepage — the six
 * counts would no longer sum to the catalogue. Fail loudly in development
 * instead of shipping a hole.
 */
if (process.env.NODE_ENV !== 'production') {
  const covered = new Set(DEFS.flatMap((d) => d.types));
  const orphans = [...new Set(PRODUCTS.map((p) => p.equipmentType))].filter((t) => !covered.has(t));
  if (orphans.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `[families] equipmentType not assigned to any family: ${orphans.join(', ')}. ` +
        `Those products will not appear in homepage discovery.`
    );
  }
}
