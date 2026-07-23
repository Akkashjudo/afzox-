import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { IconArrow } from './icons';

/**
 * Category thumbnails are real white-background studio product photography,
 * not lifestyle/action shots — so the image area uses object-contain with
 * generous padding (never crops the machine) and copy lives in a solid
 * footer band, never overlaid on top of the photo.
 */
export default function CategoryCard({ category, large = false }: { category: Category; large?: boolean }) {
  return (
    <Link
      href={category.url}
      className={`group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-ink text-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover ${
        large ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-gradient-to-br from-surface to-surface-container ${
          large ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={category.image}
          alt={`${category.name} — AFZOX commercial gym equipment`}
          fill
          sizes={large ? '(max-width:760px) 90vw, 66vw' : '(max-width:760px) 90vw, 33vw'}
          className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-on-background backdrop-blur">
          {category.count} machines
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight">{category.name}</h3>
        <p className="mt-1.5 text-sm text-white/65">{category.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-fixed-dim">
          Explore range <IconArrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
