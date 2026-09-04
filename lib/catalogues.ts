/**
 * Downloadable AFZOX catalogues.
 *
 * These are the source PDFs the product data was built from, served straight
 * from /public/catalogues. `sizeMb` is measured from the actual file rather
 * than estimated — a visitor on mobile data should know what they are about
 * to pull down before they tap.
 */
export interface CatalogueFile {
  slug: string;
  title: string;
  /** The collection or range this catalogue documents. */
  scope: string;
  /** Number of equipment pages in the source PDF. */
  pages: number;
  sizeMb: number;
  file: string;
}

export const CATALOGUES: CatalogueFile[] = [
  {
    slug: 'hs-series',
    title: 'AFZOX HS Series',
    scope: 'Selectorized, plate-loaded, cable, benches, racks and storage',
    pages: 51,
    sizeMb: 12.9,
    file: '/catalogues/afzox-hs-series.pdf',
  },
  {
    slug: 'ps-series',
    title: 'AFZOX PS Series',
    scope: 'Plate-loaded presses, rows, pulldowns, leg press and squat stations',
    pages: 53,
    sizeMb: 3.2,
    file: '/catalogues/afzox-ps-series.pdf',
  },
  {
    slug: 'bb-series',
    title: 'AFZOX BB Series',
    scope: 'Glute, hip thrust, belt squat and lower-body specialist stations',
    pages: 18,
    sizeMb: 0.9,
    file: '/catalogues/afzox-bb-series.pdf',
  },
  {
    slug: 'selectorized-strength',
    title: 'AFZOX Selectorized Strength',
    scope: 'Single-station pin-loaded machines',
    pages: 18,
    sizeMb: 1.0,
    file: '/catalogues/afzox-selectorized-strength.pdf',
  },
  {
    slug: 'functional-training',
    title: 'AFZOX Functional Training',
    scope: 'Rollers, bands, sleds, mats, agility and studio equipment',
    pages: 20,
    sizeMb: 0.7,
    file: '/catalogues/afzox-functional-training-accessories.pdf',
  },
];
