import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // development only setting to disable image optimization (NGROK)
    unoptimized: process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === 'true',
  },
}

export default nextConfig
