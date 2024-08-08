import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'output'
}

export default withNextIntl(nextConfig);

