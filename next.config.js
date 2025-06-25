/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true // optional, safe to leave on for API routes and future features
  }
}

module.exports = nextConfig
