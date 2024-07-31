import type { Metadata } from 'next'
import { Providers } from '../providers'
import '../styles/index.sass'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = useMessages()
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
