import { PRODUCTS } from './catalogue';
import { DEFS, type FamilySlug } from './family-defs';
import type { Product } from './types';

/**
 * The six equipment categories the homepage opens with.
 *
 * Why these six, and why not the `category` field:
 *
 * The catalogue carries 28 `category` ranges, but they are scoped to a series,
 * so one customer concept is split several ways — `afz-selectorized`,
 * `hs-selectorized` and `lf-selectorized` are all "selectorized machines". A
 * buyer does not think "I want HS selectorized"; they think "I want
 * selectorized machines" and expect to see every series at once. Ranges are
 * the right axis *inside* a series page and the wrong one on the homepage.
 *
 * `equipmentType` is the cross-series axis, but twelve values is too many to
 * open with and several are tiny (2-5 machines). These six group those twelve
 * into the units a commercial gym actually specifies and budgets for. Every
 * product lands in exactly one, so the six cover the catalogue with no overlap
 * and no remainder.
 *
 * Names come from what is actually in each group rather than from a generic
 * list. The last one is "Storage & Accessories" and not "Free Weights": behind
 * it are 19 racks and 5 accessories (ab wheels, a steel mace, a studio barbell
 * set) — there is no dumbbell or barbell range to promise.
 *
 * Each maps to `equipmentType` values, which is what the shop's own `type`
 * filter already accepts as a comma-separated OR group — so a category card is
 * a real, shareable catalogue URL, not a parallel filtering system.
 */
export type { FamilySlug } from './family-defs';

export type Family = {
  slug: FamilySlug;
  name: string;
  /** One line, said the way a buyer would say it. */
  blurb: string;
  /** `equipmentType` values this category covers. */
  types: string[];
  /** Catalogue URL with the category's filter already applied. */
  href: string;
  /** Machine whose photograph represents the category on its card. */
  thumb: Product;
};

/** Products in a category, in catalogue order. */
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
  thumb: thumbFor(d.hero, d.types),
}));

/**
 * Development guard. If a new `equipmentType` is introduced and not assigned
 * to a category, its products would silently vanish from homepage discovery —
 * the six would no longer cover the catalogue. Fail loudly in development
 * rather than ship a hole.
 */
if (process.env.NODE_ENV !== 'production') {
  const covered = new Set(DEFS.flatMap((d) => d.types));
  const orphans = [...new Set(PRODUCTS.map((p) => p.equipmentType))].filter((t) => !covered.has(t));
  if (orphans.length) {
    // eslint-disable-next-line no-console
    console.warn(
      `[families] equipmentType not assigned to a category: ${orphans.join(', ')}. ` +
        `Those products will not appear in homepage discovery.`
    );
  }
}
