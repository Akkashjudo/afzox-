import type { Config } from 'tailwindcss';

/**
 * Tokens lifted verbatim from the Stitch reference
 * ("AFZOX Global Strength" design system — the palette used across 8 of the
 * 12 reference screens, including Home, Shop and Product Details).
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-container-highest': '#e1e3e4',
        'surface-dim': '#d9dadb',
        'surface-variant': '#e1e3e4',
        'on-error-container': '#93000a',
        'inverse-primary': '#b3c5ff',
        'on-secondary-fixed-variant': '#474646',
        secondary: '#5f5e5e',
        background: '#f8f9fa',
        'tertiary-container': '#e30d1a',
        'secondary-fixed-dim': '#c8c6c5',
        'on-background': '#191c1d',
        'on-tertiary-fixed': '#410002',
        primary: '#0050cb',
        'on-tertiary': '#ffffff',
        'surface-container': '#edeeef',
        'on-primary': '#ffffff',
        'on-primary-fixed': '#001849',
        'error-container': '#ffdad6',
        error: '#ba1a1a',
        'outline-variant': '#c2c6d8',
        'surface-tint': '#0054d6',
        'primary-container': '#0066ff',
        'on-tertiary-fixed-variant': '#93000a',
        'on-surface-variant': '#424656',
        'on-secondary-fixed': '#1c1b1b',
        'tertiary-fixed': '#ffdad6',
        'on-error': '#ffffff',
        'tertiary-fixed-dim': '#ffb4ab',
        outline: '#727687',
        'primary-fixed-dim': '#b3c5ff',
        'surface-container-high': '#e7e8e9',
        'surface-container-low': '#f3f4f5',
        surface: '#f8f9fa',
        'surface-bright': '#f8f9fa',
        tertiary: '#b60010',
        'secondary-fixed': '#e5e2e1',
        'secondary-container': '#e5e2e1',
        'on-secondary': '#ffffff',
        'inverse-on-surface': '#f0f1f2',
        'on-secondary-container': '#656464',
        'on-surface': '#191c1d',
        'on-primary-container': '#f8f7ff',
        'surface-container-lowest': '#ffffff',
        'on-tertiary-container': '#fff6f4',
        'inverse-surface': '#2e3132',
        'primary-fixed': '#dae1ff',
        'on-primary-fixed-variant': '#003fa4',
        whatsapp: '#128040', // darkened from brand #25D366 — white-on-green text needs AA contrast (5.0:1 vs 2.0:1)
        ink: '#111111',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        'margin-mobile': '24px',
        'margin-desktop': '80px',
        gutter: '32px',
        'section-gap': '160px',
        unit: '8px',
        'container-max': '1440px',
      },
      maxWidth: {
        shell: '1440px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['clamp(2.5rem,6vw,4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '700' }],
        'headline-xl': ['clamp(2rem,4.2vw,3rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-sm': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'label-md': ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      boxShadow: {
        card: '0px 4px 12px rgba(0,0,0,0.03), 0px 20px 40px rgba(0,0,0,0.04)',
        'card-hover': '0px 8px 20px rgba(0,0,0,0.06), 0px 32px 64px rgba(0,0,0,0.08)',
        glass: '0 2px 10px rgba(0,0,0,0.04)',
      },
      backdropBlur: {
        glass: '20px',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        ping: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%,100%': { transform: 'scale(1.35)', opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        /* Draws attention briefly when the button first appears, then stops —
           an infinite pulse on a permanently-visible fixed element costs
           battery/GPU for no ongoing benefit once the user has seen it. */
        'ping-slow': 'ping 2.6s cubic-bezier(0,0,0.2,1) 4',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
