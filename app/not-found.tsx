import Link from 'next/link';
import { IconEmpty } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[68svh] max-w-2xl flex-col items-center justify-center py-24 text-center">
      <IconEmpty className="h-12 w-12 text-outline" />
      <span className="mt-7 text-label-md uppercase text-brand">404</span>
      <h1 className="mt-4 text-headline-xl text-balance">This page moved or never existed.</h1>
      <p className="mt-5 max-w-prose text-body-md text-on-surface-variant">
        The machine or page you&rsquo;re looking for isn&rsquo;t here. Browse the full catalogue
        instead, or head back home.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-primary">Browse equipment</Link>
        <Link href="/" className="btn btn-secondary">Back to home</Link>
      </div>
    </div>
  );
}
