import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

export default async function () {
  if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform()
  }

  return {
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: false,
    },
    experimental: {
      typedRoutes: false,
    },
    output: 'standalone',
    headers: async () => [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ],
    images: {
      domains: ['cdn.openrouter.ai', 'your-cdn.com'],
    },
  }
}
