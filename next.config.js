/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'images.unsplash.com', 'source.unsplash.com']
  },
  output: 'standalone',
};
