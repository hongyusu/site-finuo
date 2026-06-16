/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // MUI + Emotion play nicest when transpiled through Next's compiler.
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

export default nextConfig;
