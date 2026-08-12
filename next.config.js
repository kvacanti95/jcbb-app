/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    // All images are served locally (static assets or admin-uploaded files);
    // skip the built-in optimizer so production doesn't require `sharp`.
    unoptimized: true,
  },
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['./node_modules/better-sqlite3/build/Release/*.node'],
    },
  },
};

module.exports = nextConfig;
