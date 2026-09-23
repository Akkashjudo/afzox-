/**
 * The six equipment categories, as plain data.
 *
 * Separate from families.ts because that module reads PRODUCTS to pick a
 * photograph for each card, and the header — a client component — needs only
 * the names and links. Importing families.ts there would pull the whole
 * catalogue into the client bundle to render six words.
 */
export type FamilySlug =
  | 'cardio'
  | 'plate-loaded'
  | 'selectorized'
  | 'functional'
  | 'benches-racks'
  | 'storage';

/* Ordered the way a floor is usually specified, cardio first. */
export const DEFS: { slug: FamilySlug; name: string; blurb: string; types: string[]; hero: string }[] = [
  {
    slug: 'cardio',
    name: 'Cardio',
    blurb: 'Treadmills, cross trainers, bikes and rowers.',
    types: ['Cardio'],
    hero: 'cardio-treadmill-04',
  },
  {
    slug: 'plate-loaded',
    name: 'Plate Loaded',
    blurb: 'Iso-lateral and lever stations loaded with plates.',
    types: ['Plate Loaded Machine'],
    hero: 'plate-loaded-chest-press-pec-deck',
  },
  {
    slug: 'selectorized',
    name: 'Selectorized',
    blurb: 'Single-pin stack machines and multi-stations.',
    types: ['Selectorized Machine', 'Multi Station'],
    hero: 'hs-seated-chest-press',
  },
  {
    slug: 'functional',
    name: 'Functional & Cable',
    blurb: 'Cable crossovers, pulleys and functional trainers.',
    types: ['Functional Training', 'Cable Machine', 'Functional Trainer', 'Bodyweight Station'],
    hero: 'commercial-cable-crossover',
  },
  {
    slug: 'benches-racks',
    name: 'Benches & Racks',
    blurb: 'Benches, power racks, rigs and Smith machines.',
    types: ['Bench', 'Rack'],
    hero: 'olympic-squat-combo-rack',
  },
  {
    slug: 'storage',
    name: 'Storage & Accessories',
    blurb: 'Dumbbell, barbell and plate racking.',
    types: ['Free Weight', 'Storage'],
    hero: 'two-tier-dumbbell-rack',
  },
];


/** Name and filtered-catalogue link only — what navigation needs. */
export const FAMILY_LINKS = DEFS.map((d) => ({
  slug: d.slug,
  name: d.name,
  href: `/shop?type=${d.types.map(encodeURIComponent).join(',')}`,
}));
