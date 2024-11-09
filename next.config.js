/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['thejeweljaipur.com'],
    unoptimized: true
  },
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;