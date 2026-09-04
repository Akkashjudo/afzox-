import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MotionProvider from '@/components/MotionProvider';
import SmoothScroll from '@/components/SmoothScroll';
import { EnquiryProvider } from '@/lib/enquiry-context';
import { SITE_URL } from '@/lib/site';
import { BRAND } from '@/lib/catalogue';
import './globals.css';

/* Two faces, both self-hosted by next/font — no external request, no FOUT.
   Archivo is the display voice: an industrial grotesque that reads
   engineered rather than startup-generic. Inter carries body and UI. Only
   the weights actually used are shipped. */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} Global Strength | Commercial Gym Equipment India`,
    template: `%s | ${BRAND.name} Global Strength`,
  },
  description:
    'AFZOX manufactures and supplies commercial gym equipment across India — plate loaded and pin loaded machines, racks, benches, cable stations and studio cardio.',
  openGraph: {
    type: 'website',
    siteName: 'AFZOX Global Strength',
    locale: 'en_IN',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0B0E16',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="font-sans">
        <MotionProvider>
          <SmoothScroll />
          <EnquiryProvider>
            <Header />
            {/* Clears the fixed header. A page with a dark hero cancels this
                with `-mt-[var(--header-h)]` so the hero runs up behind the
                transparent bar. */}
            <main className="pt-[var(--header-h)]">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </EnquiryProvider>
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_URL}/#org`,
              name: BRAND.legal,
              url: SITE_URL,
              logo: `${SITE_URL}/afzox-logo-full.png`,
              telephone: `+${BRAND.phoneRaw}`,
              email: BRAND.email,
              address: {
                '@type': 'PostalAddress',
                addressLocality: BRAND.city,
                addressRegion: BRAND.region,
                addressCountry: 'IN',
              },
              areaServed: { '@type': 'Country', name: 'India' },
            }),
          }}
        />
      </body>
    </html>
  );
}
