import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const localesMiddleware = createMiddleware(routing)

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const response = await localesMiddleware(req)

  const pathname = req.nextUrl.pathname

  const locale =
    routing.locales.find((locale) => pathname.startsWith(`/${locale}`)) ||
    routing.defaultLocale

  const cookie = req.cookies.get('session')

  const publicPath = [
    `/${locale}/login`,
    `/${locale}/forgot-password`,
    `/${locale}/registration`,
  ]
  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url))
  }

  if (!publicPath.includes(pathname) && !cookie) {
    if (!pathname.startsWith(`/${locale}/login`)) {
      return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
    }
  } else if (cookie?.value) {
    if (
      publicPath.some((el) => pathname.startsWith(el)) ||
      (pathname.length < 4 && pathname.startsWith(`/${locale}`))
    ) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url))
    } else {
      return response
    }
  }
  return response || NextResponse.next()
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/payments', '/(uk|en)/:path*'],
}
