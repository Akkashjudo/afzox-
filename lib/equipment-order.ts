import type { Product } from './types';

/**
 * The order equipment is presented in once a visitor has chosen a category.
 *
 * Catalogue order is an accident of how the data was assembled — the cardio
 * range happens to begin with a spin bike and a torso twister, because those
 * two came from the original core file and the thirteen treadmills were added
 * later. A buyer opening "Cardio" is looking for the running line first, so
 * the order is stated here rather than inherited from file position.
 *
 * Groups are matched on the product name because that is the only field that
 * distinguishes a treadmill from a rower — `equipmentType` is `Cardio` for all
 * fifty-one of them. Matching is ordered: the first group whose pattern hits
 * wins, so `Ski Trainer` reaches ROWERS rather than being caught by the
 * cross-trainer group, which names its trainers explicitly.
 *
 * Anything unmatched sorts last, so a machine added later never disappears —
 * it simply arrives at the end until it is given a group.
 */
export type EquipmentGroup = {
  /** Shown on the chip, and used as the URL value. */
  label: string;
  test: RegExp;
};

/** Cardio, in the order a commercial floor is specified. */
export const CARDIO_GROUPS: EquipmentGroup[] = [
  { label: 'Treadmills', test: /treadmill/i },
  { label: 'Cross Trainers', test: /elliptical|cross trainer|arc trainer|lateral trainer/i },
  { label: 'Bikes', test: /\bbike|cycle|spin/i },
  { label: 'Climbers', test: /climber|stepper|stair/i },
  { label: 'Rowers & Ski', test: /row|ski/i },
];

/** Equipment types whose products are sub-grouped, and the groups to use. */
const GROUPS_BY_TYPE: Record<string, EquipmentGroup[]> = {
  Cardio: CARDIO_GROUPS,
};

/** The sub-group a product belongs to, or null when its type has no groups. */
export function productGroup(p: Product): string | null {
  const groups = GROUPS_BY_TYPE[p.equipmentType];
  if (!groups) return null;
  return groups.find((g) => g.test.test(p.name))?.label ?? 'Other';
}

/**
 * Sort key within a category landing. Zero for every product whose type has no
 * declared grouping, so families without one keep exactly the order they had.
 */
export function groupRank(p: Product): number {
  const groups = GROUPS_BY_TYPE[p.equipmentType];
  if (!groups) return 0;
  const i = groups.findIndex((g) => g.test.test(p.name));
  return i === -1 ? groups.length : i;
}

/**
 * The groups actually present in a set of products, in declared order. Used to
 * build the chips, so a group with nothing behind it is never offered.
 */
export function availableGroups(products: Product[]): string[] {
  const types = new Set(products.map((p) => p.equipmentType));
  const groups = [...types].flatMap((t) => GROUPS_BY_TYPE[t] ?? []);
  if (!groups.length) return [];
  const present = new Set(products.map(productGroup).filter(Boolean) as string[]);
  const ordered = groups.filter((g) => present.has(g.label)).map((g) => g.label);
  if (present.has('Other')) ordered.push('Other');
  return ordered;
}
