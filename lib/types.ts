export interface Brand {
  name: string;
  legal: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  email: string;
  city: string;
  region: string;
  country: string;
  site: string;
  warrantyLine: string;
}

/**
 * A top-level product collection. Collections sit at the same level as each
 * other — ACCESSORIES and HS SERIES are siblings, never nested — and every
 * category belongs to exactly one of them.
 */
export interface Collection {
  slug: string;
  name: string;
  displayName: string;
  short: string;
  desc: string;
  url: string;
  count: number;
  image: string;
  imageLg: string;
}

export interface Category {
  slug: string;
  /** Slug of the collection this category belongs to. */
  collection: string;
  name: string;
  short: string;
  desc: string;
  thumb: string;
  image: string;
  imageLg: string;
  count: number;
  url: string;
}

export type PriceBand = 'premium' | 'standard' | 'value';

export type BodyArea =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Glutes'
  | 'Core'
  | 'Full Body';

export interface Product {
  sku: string;
  slug: string;
  name: string;
  /** Top-level collection slug — 'afzox-series', 'hs-series', 'ps-series', 'bb-series'. */
  collection: string;
  collectionName: string;
  series: string;
  category: string;
  categoryName: string;
  equipmentType: string;
  bodyAreas: BodyArea[];
  usage: string;
  featured: boolean;
  popular: number;
  added: number;
  tier: string;
  band: PriceBand;
  short: string;
  description: string[];
  features: string[];
  applications: string[];
  primaryApplication?: string;
  muscles?: { primary: string[]; secondary: string[] };
  targets: string[];
  specs: Record<string, string>;
  image: string;
  imageMd: string;
  imageSm: string;
  /** Full-size gallery images. Always contains at least `image`. */
  images: string[];
  isHome: boolean;
  isCommercial: boolean;
  related: string[];
  tags: string[];
}

export interface FilterState {
  query?: string;
  /** 'all' or a collection slug. Applied before every other filter. */
  collection?: string;
  category?: string;
  bodyAreas?: BodyArea[];
  equipmentTypes?: string[];
  usage?: 'all' | 'home' | 'commercial';
  band?: 'all' | PriceBand;
  sort?: 'featured' | 'popular' | 'newest' | 'az' | 'za';
}
