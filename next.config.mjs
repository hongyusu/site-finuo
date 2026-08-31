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
        // public/index.html is the dormant CRA shell, kept only as a rollback.
        // It renders no content and duplicates "/", so keep it out of the index.
        source: '/index.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
