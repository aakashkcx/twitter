import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/@:username", destination: "/user/:username" }];
  },
};

export default nextConfig;
