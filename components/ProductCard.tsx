import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { whatsAppLink } from '@/lib/catalogue';
import { IconArrow, IconWhatsApp } from './icons';

/**
 * Product card.
 *
 * The machine is the subject, so the image sits on its own light plate with
 * generous padding and `object-contain` — equipment is never cropped and the
 * AFZOX watermark in the catalogue photography stays intact.
 *
 * Motion is restrained on purpose: the image lifts a little, the arrow
 * travels, the plate warms. The product name and category never move, because
 * they are what the visitor is actually reading.
 */
export default function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-[border-color,box-shadow,transform] duration-control ease-afzox hover:-translate-y-1 hover:border-black/[0.14] hover:shadow-card-hover">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View ${product.name}`}
      />

      {/* ---- Image plate ---- */}
      <div className="relative aspect-[4/3.3] overflow-hidden bg-paper-sunken transition-colors duration-control group-hover:bg-paper-deep">
        <Image
          src={product.imageMd}
          alt={`AFZOX ${product.series} ${product.name} — commercial gym ${product.equipmentType.toLowerCase()}`}
          fill
          sizes="(max-width:640px) 88vw, (max-width:1100px) 44vw, 340px"
          className="object-contain p-8 transition-transform duration-[900ms] ease-afzox group-hover:scale-[1.045]"
          loading={eager ? 'eager' : 'lazy'}
        />

        <span
          className="absolute left-4 top-4 z-20 rounded-full bg-ink-900 px-3 py-1 text-label-sm uppercase text-white backdrop-blur-sm"
        >
          {product.collectionName}
        </span>

        {product.featured && (
          <span className="absolute right-4 top-4 z-20 rounded-full border border-black/[0.08] bg-white/85 px-3 py-1 text-label-sm uppercase text-ink-900 backdrop-blur-sm">
            Best seller
          </span>
        )}
      </div>

      {/* ---- Detail ---- */}
      <div className="flex flex-1 flex-col gap-2 border-t border-black/[0.07] p-5">
        <span className="flex items-center gap-2.5 text-label-sm uppercase text-on-surface-variant/70">
          {product.sku}
          <span aria-hidden className="h-3 w-px bg-black/12" />
          <span className="truncate">{product.categoryName}</span>
        </span>

        <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink-900">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-body-sm text-on-surface-variant">{product.short}</p>

        <div className="relative z-20 mt-auto flex items-center gap-2 pt-4">
          <Link
            href={`/product/${product.slug}`}
            className="btn btn-sm btn-secondary flex-1 justify-between"
          >
            <span>View</span>
            <IconArrow className="h-3.5 w-3.5 transition-transform duration-control ease-afzox group-hover:translate-x-0.5" />
          </Link>
          <a
            href={whatsAppLink(product.name)}
            target="_blank"
            rel="noopener"
            className="btn btn-sm btn-whatsapp shrink-0 px-3.5"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <IconWhatsApp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
