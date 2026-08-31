/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MUI + Emotion play nicest when transpiled through Next's compiler.
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  // Chinese keeps the bare URLs it is already indexed under; the app itself
  // lives entirely under /[lang], so bare paths are rewritten to the zh tree.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/zh' },
        { source: '/education', destination: '/zh/education' },
        { source: '/mice', destination: '/zh/mice' },
        { source: '/tour/:id', destination: '/zh/tour/:id' },
        { source: '/institution/:id', destination: '/zh/institution/:id' },
        { source: '/nordic/:country', destination: '/zh/nordic/:country' },
        { source: '/helsinki/:section', destination: '/zh/helsinki/:section' },
        { source: '/china/travel-guide', destination: '/zh/china/travel-guide' },
      ],
    };
  },
  // /zh/* would otherwise be a second, indexable copy of every Chinese page.
  async redirects() {
    return [
      { source: '/zh', destination: '/', permanent: true },
      { source: '/zh/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // public/ assets are served with must-revalidate by default, so every
        // visit re-checks every image. These filenames are stable.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }],
      },
      {
        // public/index.html is the dormant CRA shell, kept only as a rollback.
        // It renders no content and duplicates "/", so keep it out of the index.
        source: '/index.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
