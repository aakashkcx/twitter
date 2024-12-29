import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/@:username/:slug*", destination: "/user/:username/:slug*" },
    ];
  },
};

export default nextConfig;
