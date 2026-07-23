import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/catalogue';
import { BRAND } from '@/lib/catalogue';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white pt-16 md:pt-20">
      <div className="shell">
        <div className="grid grid-cols-2 gap-10 pb-14 md:grid-cols-4 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/afzox-icon.png" alt="AFZOX" width={42} height={42} className="h-10 w-10 object-contain" />
              <span className="font-bold leading-tight">
                AFZOX <span className="text-primary">Global</span>
                <br />
                Strength
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-on-surface-variant">
              Precision engineering meets high-end design. Elevating commercial and home fitness
              environments across India.
            </p>
          </div>

          <div>
            <h4 className="text-label-md uppercase tracking-widest text-on-surface-variant">Navigation</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
              <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
              <li><Link href="/services" className="hover:text-primary">Commercial Setup</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-label-md uppercase tracking-widest text-on-surface-variant">Support</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link href="/enquiry" className="hover:text-primary">Enquiry List</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-label-md uppercase tracking-widest text-on-surface-variant">Ranges</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.slug}><Link href={c.url} className="hover:text-primary">{c.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 py-6">
          <div className="flex flex-col-reverse items-center justify-between gap-4 text-xs text-on-surface-variant md:flex-row">
            <span>© {new Date().getFullYear()} {BRAND.legal}. All rights reserved.</span>
            <div className="flex items-center gap-5">
              <a href={`tel:+${BRAND.phoneRaw}`} className="hover:text-primary">{BRAND.phone}</a>
              <a href={`mailto:${BRAND.email}`} className="hover:text-primary">{BRAND.email}</a>
              <span>{BRAND.city}, {BRAND.region}, {BRAND.country}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
