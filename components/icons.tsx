/* Inline icon set — no icon-font or external request. */
type IconProps = { className?: string };

const base = 'currentColor';

export const IconSearch = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" className={className} aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
  </svg>
);
export const IconBag = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M6 7h12l1 13H5L6 7z" /><path d="M9 7a3 3 0 016 0" />
  </svg>
);
export const IconMenu = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" className={className} aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const IconClose = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2.2} strokeLinecap="round" className={className} aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconArrow = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconChevDown = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
export const IconChevRight = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
export const IconCheck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
export const IconPlus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2.3} strokeLinecap="round" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const IconMinus = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2.3} strokeLinecap="round" className={className} aria-hidden>
    <path d="M5 12h14" />
  </svg>
);
export const IconTrash = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m3 0-1 13a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7h14z" />
  </svg>
);
export const IconWhatsApp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill={base} className={className} aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.87 9.87 0 004.76 1.21c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.43 12.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.48.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
  </svg>
);
export const IconShield = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 2l7 4v6c0 4.4-3 8.3-7 10-4-1.7-7-5.6-7-10V6z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
export const IconTruck = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" />
  </svg>
);
export const IconTool = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M14.7 6.3a4 4 0 015.6 5.6l-6.4 6.4a2 2 0 01-2.8 0L4.5 11.7a2 2 0 010-2.8L8 5.4" /><circle cx="17" cy="7" r="1.2" />
  </svg>
);
export const IconPackage = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" />
  </svg>
);
export const IconClipboard = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="6" y="4" width="12" height="17" rx="2" /><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1M9 11h6M9 15h6" />
  </svg>
);
export const IconStar = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 2.5l3 6.2 6.8.9-5 4.7 1.3 6.7L12 17.8l-6.1 3.2L7.2 14.4l-5-4.7 6.8-.9L12 2.5z" />
  </svg>
);
export const IconMapPin = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
export const IconPhone = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .3 2 .6 2.9a2 2 0 01-.5 2.1L7.9 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.9.3 1.9.5 2.9.6a2 2 0 011.7 2z" />
  </svg>
);
export const IconMail = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
  </svg>
);
export const IconClock = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
export const IconZoom = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" className={className} aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
  </svg>
);
export const IconEmpty = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3M8 11h6" />
  </svg>
);
export const IconLayers = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
  </svg>
);
export const IconAward = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="12" cy="8" r="5" /><path d="M8.5 13 7 22l5-3 5 3-1.5-9" />
  </svg>
);
export const IconUsers = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0" /><circle cx="17.5" cy="9" r="3" /><path d="M15 12.5c2.9.3 5.5 2.2 6.5 5.5" />
  </svg>
);
export const IconRuler = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={base} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="2.5" y="7" width="19" height="10" rx="1.5" /><path d="M6 7v3M10 7v5M14 7v3M18 7v5" />
  </svg>
);
