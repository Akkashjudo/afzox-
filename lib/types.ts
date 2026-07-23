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

export interface Category {
  slug: string;
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

export interface Product {
  sku: string;
  slug: string;
  name: string;
  category: string;
  categoryName: string;
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
  targets: string[];
  specs: Record<string, string>;
  image: string;
  imageMd: string;
  imageSm: string;
  isHome: boolean;
  isCommercial: boolean;
  related: string[];
}

export interface FilterState {
  query?: string;
  category?: string;
  usage?: 'all' | 'home' | 'commercial';
  band?: 'all' | PriceBand;
  sort?: 'featured' | 'popular' | 'newest' | 'az' | 'za';
}
