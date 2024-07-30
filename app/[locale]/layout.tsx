import type { Metadata } from 'next'
import { Providers } from '../providers'
import '../styles/index.sass'
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
