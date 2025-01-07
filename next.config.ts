import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images:{
    domains: ['res.cloudinary.com']
  },
};

export default nextConfig;
