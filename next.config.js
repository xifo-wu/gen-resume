/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'images.unsplash.com', 'source.unsplash.com', 'localhost:2027', 's1.ax1x.com'],
  },
  output: 'standalone',
  experimental: {
    appDir: true,
  }
};
