import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  sassOptions: {
    prependData: `@import "@/app/styles/mixins"`,
  },
}

export default withNextIntl(nextConfig);
// export default nextConfig

