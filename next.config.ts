/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/malla-curricular',
  assetPrefix: '/malla-curricular/',
};
module.exports = nextConfig;