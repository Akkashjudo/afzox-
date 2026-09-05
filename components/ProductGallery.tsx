'use client';

import Image from 'next/image';
import { useState } from 'react';
import { brandName } from '@/lib/brand';
import type { Product } from '@/lib/types';
import { IconZoom } from './icons';

/**
 * Product gallery.
 *
 * Only genuine photography is shown. Most machines in the catalogue were
 * photographed once, and a strip of synthetic "detail" crops of that single
 * frame reads as broken rather than informative — they land on the studio
 * backdrop and render as blank tiles. So the thumbnail strip appears only
 * where a product actually has more than one shot; everywhere else the frame
 * stands alone with click-to-zoom.
 *
 * `object-contain` throughout: equipment is never cropped and the AFZOX
 * watermark in the catalogue photography stays intact.
 */
const sized = (src: string, suffix: '-md' | '-sm') => src.replace(/\.jpg$/, `${suffix}.jpg`);

export default function ProductGallery({ product }: { product: Product }) {
  const shots = product.images?.length ? product.images : [product.image];
  const hasGallery = shots.length > 1;

  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState('center');

  const src = shots[Math.min(active, shots.length - 1)];
  const alt = `${brandName(product.series)} ${product.name} — commercial gym ${product.equipmentType.toLowerCase()}${
    hasGallery ? `, view ${active + 1} of ${shots.length}` : ''
  }`;

  return (
    <div>
      <button
        type="button"
        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border border-black/[0.08] bg-white"
        onClick={() => setZoomed((z) => !z)}
        onMouseMove={(e) => {
          if (!zoomed) return;
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        aria-label={zoomed ? 'Zoomed in — press to zoom out' : 'Product image — press to zoom in'}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width:960px) 92vw, 46vw"
          className="object-contain p-10 transition-transform duration-500 ease-afzox"
          style={{
            transform: zoomed ? 'scale(2.1)' : 'none',
            transformOrigin: zoomed ? origin : 'center',
          }}
        />

        {/* Seats the machine on the plate rather than letting it float on a
            flat white field. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_48%_at_50%_48%,transparent_58%,rgba(11,14,22,0.055)_100%)]"
        />

        {!zoomed && (
          <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/90 px-3 py-1.5 text-label-sm uppercase text-on-surface-variant opacity-0 backdrop-blur transition-opacity duration-control ease-afzox group-hover:opacity-100">
            <IconZoom className="h-3.5 w-3.5" /> Click to zoom
          </span>
        )}
      </button>

      {hasGallery && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {shots.map((shot, i) => (
            <button
              key={shot}
              onClick={() => {
                setActive(i);
                setZoomed(false);
              }}
              aria-current={active === i}
              aria-label={`${product.name} — view ${i + 1} of ${shots.length}`}
              className={`relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-lg border bg-paper-sunken transition-colors duration-micro ${
                active === i ? 'border-ink-900' : 'border-black/[0.08] hover:border-outline'
              }`}
            >
              <Image
                src={sized(shot, '-sm')}
                alt=""
                fill
                sizes="76px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
