import { TRUST_STRIP } from '@/lib/site';
import { IconShield, IconTruck, IconTool, IconPackage, IconClipboard, IconStar } from './icons';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  star: IconStar,
  truck: IconTruck,
  tool: IconTool,
  package: IconPackage,
  clipboard: IconClipboard,
  shield: IconShield,
};

export default function TrustStrip() {
  const items = [...TRUST_STRIP, ...TRUST_STRIP];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-3.5 text-white [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((t, i) => {
          const Icon = ICONS[t.icon];
          return (
            <span key={i} className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/85">
              <Icon className="h-3.5 w-3.5 text-primary-fixed-dim" />
              {t.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
