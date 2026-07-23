import Link from 'next/link';
import { IconEmpty } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <IconEmpty className="h-14 w-14 text-outline-variant" />
      <span className="mt-6 font-mono text-sm font-bold tracking-widest text-primary">404</span>
      <h1 className="mt-2 text-headline-lg">This page moved or never existed.</h1>
      <p className="mt-3 max-w-md text-body-md text-on-surface-variant">
        The machine or page you&rsquo;re looking for isn&rsquo;t here. Browse the full catalogue
        instead, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-primary">Browse Equipment</Link>
        <Link href="/" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}
