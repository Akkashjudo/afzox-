/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: { ignoreDuringBuilds: true },

  /**
   * The Accessories collection was renamed to AFZOX Series, which moved one
   * URL. Every *product* URL was left untouched; this covers the single
   * collection route so existing links and indexed pages keep resolving.
   */
  async redirects() {
    return [
      { source: '/shop/accessories', destination: '/shop/afzox-series', permanent: true },
    ];
  },
};

export default nextConfig;
