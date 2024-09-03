import type { Metadata } from 'next'
import { Providers } from '../providers'
import '@/app/styles/index.sass'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'next app',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()
  console.log('locale :>> ', locale)
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        {/* {children} */}
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
