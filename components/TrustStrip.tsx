import { TRUST_STRIP } from '@/lib/site';

/**
 * Capability marquee. Slow, continuous, seam-free — the track holds two
 * identical copies and translates exactly -50%, so the loop point never
 * lands mid-item. Text only: icons at this size were noise.
 */
export default function TrustStrip() {
  const items = [...TRUST_STRIP, ...TRUST_STRIP];

  return (
    <div className="edge-fade-x relative overflow-hidden border-b border-black/[0.07] bg-paper py-5">
      <div className="animate-marquee flex w-max items-center gap-14 will-change-transform">
        {items.map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-14 text-label-md uppercase text-on-surface-variant"
          >
            {t.label}
            <span aria-hidden className="h-1 w-1 rounded-full bg-brand/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
