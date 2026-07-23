import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import MotionProvider from '@/components/MotionProvider';
import { EnquiryProvider } from '@/lib/enquiry-context';
import { SITE_URL } from '@/lib/site';
import { BRAND } from '@/lib/catalogue';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

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
  themeColor: '#0050cb',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <MotionProvider>
          <EnquiryProvider>
            <Header />
            <main className="pt-[92px]">{children}</main>
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
