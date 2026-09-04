import type { Config } from 'tailwindcss';

/**
 * AFZOX design system.
 *
 * The palette is sampled from the official AFZOX mark rather than invented:
 * the logo is built on a deep navy (#001860), a brand blue (#0048b4) and a
 * brand red (#c22015). Those three anchor everything here.
 *
 * The Material-3 style token names (`surface-container-lowest`,
 * `on-surface-variant`, `outline-variant`, …) are kept deliberately — around
 * forty files reference them — but their *values* now point at the AFZOX
 * palette. That upgrades every surface on the site at once without a
 * rename sweep, and new work can use the clearer `ink` / `paper` / `brand`
 * scales below.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ---- AFZOX brand, sampled from the official mark ---- */
        brand: {
          navy: '#001A5C',
          DEFAULT: '#0B4FB8',
          bright: '#1E6DE8',
          red: '#C22015',
        },
        /* ---- Ink: the dark architectural surfaces ---- */
        ink: {
          DEFAULT: '#0B0E16',
          950: '#06080E',
          900: '#0B0E16',
          800: '#141924',
          700: '#1E2532',
          600: '#2C3444',
          500: '#3E4859',
        },
        /* ---- Paper: warm-neutral light surfaces (never cold grey) ---- */
        paper: {
          DEFAULT: '#F6F6F4',
          raised: '#FFFFFF',
          sunken: '#EDEDE9',
          deep: '#E3E3DE',
        },

        /* ---- Legacy token names, re-pointed at the AFZOX palette ---- */
        background: '#F6F6F4',
        surface: '#F6F6F4',
        'surface-bright': '#FFFFFF',
        'surface-dim': '#DBDBD5',
        'surface-variant': '#E3E3DE',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F1F1EE',
        'surface-container': '#EAEAE6',
        'surface-container-high': '#E3E3DE',
        'surface-container-highest': '#DBDBD5',

        'on-background': '#0B0E16',
        'on-surface': '#0B0E16',
        'on-surface-variant': '#5A6070',
        'inverse-surface': '#141924',
        'inverse-on-surface': '#F6F6F4',

        outline: '#9A9A92',
        'outline-variant': '#DCDCD6',

        primary: '#0B4FB8',
        'primary-container': '#1E6DE8',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#F5F8FF',
        'primary-fixed': '#DCE6FF',
        'primary-fixed-dim': '#9DBAF5',
        'inverse-primary': '#9DBAF5',
        'on-primary-fixed': '#001A5C',
        'on-primary-fixed-variant': '#0A3D8F',
        'surface-tint': '#0B4FB8',

        secondary: '#5A6070',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#E5E5E0',
        'on-secondary-container': '#4A4F5C',
        'secondary-fixed': '#E5E5E0',
        'secondary-fixed-dim': '#C6C6C0',
        'on-secondary-fixed': '#1A1D26',
        'on-secondary-fixed-variant': '#454A57',

        tertiary: '#C22015',
        'tertiary-container': '#E03A2A',
        'on-tertiary': '#FFFFFF',
        'on-tertiary-container': '#FFF5F4',
        'tertiary-fixed': '#FFDAD6',
        'tertiary-fixed-dim': '#FFB4AB',
        'on-tertiary-fixed': '#410002',
        'on-tertiary-fixed-variant': '#8E1710',

        error: '#BA1A1A',
        'on-error': '#FFFFFF',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',

        whatsapp: '#128040',
      },

      /* Tighter, more architectural than the previous soft radii. */
      borderRadius: {
        DEFAULT: '2px',
        sm: '4px',
        lg: '6px',
        xl: '10px',
        '2xl': '14px',
        '3xl': '18px',
        '4xl': '26px',
        full: '9999px',
      },

      spacing: {
        'margin-mobile': '20px',
        'margin-desktop': '64px',
        gutter: '32px',
        'section-gap': '160px',
        unit: '8px',
        'container-max': '1440px',
      },
      maxWidth: {
        shell: '1440px',
        prose: '68ch',
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo)', 'Archivo', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        /* Display — hero and major statements. Wide, tight, confident. */
        'display-xl': ['clamp(2.75rem,6vw,5.5rem)', { lineHeight: '0.94', letterSpacing: '-0.035em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem,5.5vw,4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '700' }],
        'headline-xl': ['clamp(1.85rem,3.6vw,3rem)', { lineHeight: '1.06', letterSpacing: '-0.025em', fontWeight: '700' }],
        'headline-lg': ['clamp(1.5rem,2.4vw,2.125rem)', { lineHeight: '1.14', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-sm': ['1.35rem', { lineHeight: '1.28', letterSpacing: '-0.012em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        'body-md': ['0.9688rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        /* Technical label — SERIES / MODEL / CATEGORY / SPEC keys. */
        'label-md': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.14em', fontWeight: '600' }],
        'label-sm': ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.16em', fontWeight: '600' }],
      },

      boxShadow: {
        /* Tight and grounded rather than diffuse SaaS haze. */
        card: '0 1px 2px rgba(11,14,22,0.04), 0 8px 24px -12px rgba(11,14,22,0.10)',
        'card-hover': '0 2px 4px rgba(11,14,22,0.05), 0 24px 48px -20px rgba(11,14,22,0.18)',
        glass: '0 1px 2px rgba(11,14,22,0.05), 0 12px 32px -16px rgba(11,14,22,0.16)',
        lift: '0 32px 64px -28px rgba(11,14,22,0.32)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },

      backdropBlur: { glass: '16px' },

      transitionTimingFunction: {
        /* The house curve. Everything non-linear uses this unless it springs. */
        afzox: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'afzox-in': 'cubic-bezier(0.55, 0, 0.45, 1)',
      },
      transitionDuration: {
        micro: '200ms',
        control: '320ms',
        section: '560ms',
        cinematic: '900ms',
      },

      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(320%) skewX(-12deg)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-40%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(120%)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        'marquee-slow': 'marquee 72s linear infinite',
        'scroll-cue': 'scroll-cue 2.2s cubic-bezier(0.22,1,0.36,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
