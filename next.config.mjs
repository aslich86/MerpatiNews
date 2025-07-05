/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // biarkan kalau kamu tidak pakai Image Optimization via CDN
    domains: [
      "gnews.io",
      "ichef.bbci.co.uk",
      "cdn.cnn.com",
      "static01.nyt.com",
      "media.npr.org",
      "upload.wikimedia.org",
      "assets.bwbx.io",
      "img.youtube.com"
    ],
  },
}

export default nextConfig
