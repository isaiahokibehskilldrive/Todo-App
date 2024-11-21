// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: false, // This will disable the build activity notification
    appIsrStatus: false,  // Disables the ISR status indicator
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;
