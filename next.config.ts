/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/malla-curricular',
  assetPrefix: '/malla-curricular/',
  experimental: {
    appDir: true, // <- esto es clave
  },
};

module.exports = nextConfig;