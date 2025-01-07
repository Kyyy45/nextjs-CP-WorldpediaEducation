import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  image:{
    domains: ['res.cloudinary.com']
  },
};

export default nextConfig;
