export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
