import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'journlab.online' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
    ],
  },
}

export default withPayload(nextConfig)
