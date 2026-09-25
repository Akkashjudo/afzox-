/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    /**
     * How long an optimised variant stays valid. The default is 60 seconds,
     * which is why every product thumbnail was being revalidated on the way
     * back from a product page. These sources only change when their filename
     * changes, so a month is honest — and it is the number the optimiser
     * echoes into its own Cache-Control.
     */
    minimumCacheTTL: 2592000,
  },

  /**
   * Images were the slowest thing on the site and the reason was not their
   * size: every one of them, static file and optimiser output alike, came back
   * with `Cache-Control: public, max-age=0, must-revalidate`. That is Next's
   * default for anything under /public, because it cannot know whether a file
   * has changed between deploys when the name carries no hash. The effect is
   * that the browser is forbidden from reusing an image it already has — going
   * to a product page and back, changing a filter, or scrolling up re-requests
   * every visible thumbnail over the network. JS chunks were coming back
   * `max-age=31536000, immutable` the whole time; only the images were paying.
   *
   * A week of freshness with a month of stale-while-revalidate gives the
   * browser permission to reuse what it has, while still letting a replaced
   * photograph reach people — which matters here, since hero frames have been
   * swapped in place more than once.
   */
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=2592000',
          },
        ],
      },
    ];
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
