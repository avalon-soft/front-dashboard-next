import { cookies } from 'next/headers'
import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const localesConfig = {
  locales: ['en', 'uk'],
  defaultLocale: 'en',
}

const localesMiddleware = createMiddleware({
  locales: localesConfig.locales,
  defaultLocale: localesConfig.defaultLocale,
})

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const response = await localesMiddleware(req)

  const pathname = req.nextUrl.pathname

  const currentLocale =
    localesConfig.locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
    localesConfig.defaultLocale

  const cookie = req.cookies.get('session')

  const publicPath = [
    `/${currentLocale}/login`,
    `/${currentLocale}/forgot-password`,
    `/${currentLocale}/registration`,
  ]

  if (!publicPath.includes(pathname) && !cookie) {
    if (!pathname.startsWith(`/${currentLocale}/login`)) {
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.url))
    }
  } else if (cookie?.value) {
    if (
      publicPath.some((el) => pathname.startsWith(el)) ||
      (pathname.length < 4 && pathname.startsWith('/en'))
    ) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/dashboard`, req.url)
      )
    } else return response
  }
  return response || NextResponse.next()
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(uk|en)/:path*'],
}
