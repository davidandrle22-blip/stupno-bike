import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  compress: true,
};

export default nextConfig;
