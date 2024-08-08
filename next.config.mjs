/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  output: 'export',
  sassOptions: {
    prependData: `@import "@/styles/mixins"`,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig