import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.output',
  sassOptions: {
    prependData: `@import "@/app/styles/mixins"`,
  },
}

export default withNextIntl(nextConfig);

