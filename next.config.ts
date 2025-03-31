import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['rb.gy'],
        unoptimized: true
    },
    reactStrictMode: false
};

export default nextConfig;
