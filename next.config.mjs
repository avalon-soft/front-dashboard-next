import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async () => {
    return {
      '/': { dir: '/' },
      '/[locale]': { dir: '/[locale]' },
    }
  },
}

export default withNextIntl(nextConfig)
