/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  basePath: '/malla-curricular',
  assetPrefix: '/malla-curricular/',
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
