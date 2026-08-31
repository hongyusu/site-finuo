/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MUI + Emotion play nicest when transpiled through Next's compiler.
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
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
