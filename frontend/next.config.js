/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || ''

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
}

module.exports = nextConfig
