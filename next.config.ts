import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // Wichtig für Docker!
  reactStrictMode: true,
};

export default nextConfig;
