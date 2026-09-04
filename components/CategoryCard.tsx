import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { IconArrow } from './icons';

/**
 * Range card.
 *
 * The thumbnails are real white-background studio photography, not lifestyle
 * shots — so the image sits on its own light plate with `object-contain` and
 * generous padding. The machine is never cropped, the AFZOX watermark in the
 * photography stays intact, and copy lives in a solid band below rather than
 * overlaid on the product.
 */
export default function CategoryCard({ category, large = false }: { category: Category; large?: boolean }) {
  return (
    <Link
      href={category.url}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white transition-[border-color,box-shadow,transform] duration-control ease-afzox hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-card-hover ${
        large ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-paper-sunken transition-colors duration-control group-hover:bg-paper-deep ${
          large ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}
      >
        <Image
          src={category.image}
          alt={`AFZOX ${category.name} — commercial gym equipment range`}
          fill
          sizes={large ? '(max-width:760px) 90vw, 66vw' : '(max-width:760px) 90vw, 33vw'}
          className="object-contain p-8 transition-transform duration-[900ms] ease-afzox group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full border border-black/[0.08] bg-white/85 px-3 py-1 text-label-sm uppercase text-on-surface-variant backdrop-blur-sm">
          {category.count} machines
        </span>
      </div>

      <div className="flex flex-1 flex-col border-t border-black/[0.08] p-6">
        <h3 className="text-headline-sm">{category.name}</h3>
        <p className="mt-2 text-body-sm text-on-surface-variant">{category.short}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-label-sm uppercase text-ink-900">
          Explore range
          <IconArrow className="h-3.5 w-3.5 transition-transform duration-control ease-afzox group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
