import { addAuthHeader } from '@/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type CookieOptions = {
  httpOnly: boolean
  secure: boolean
  sameSite: 'lax' | 'strict' | 'none'
  path: string
}

const cookie = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  } as CookieOptions,
  duration: 24 * 60 * 60 * 1000,
}

export const createSession = async (
  token: string,
  keyToken: string = 'Bearer'
) => {
  const expires = new Date(Date.now() + cookie.duration)
  addAuthHeader(`${keyToken} ${token}`)
  cookies().set(cookie.name, `${keyToken} ${token}`, {
    ...cookie.options,
    expires,
  })
  // redirect('/dashboard')
}

export const verifySession = async () => {
  const cookieGet = cookies().get(cookie?.name)?.value
  console.log('cookieGet :>> ', cookieGet)
  if (!cookieGet) console.log('here :>> ', verifySession)
}

export const deleteSession = async () => {
  cookies().delete(cookie.name)
  redirect('/login')
}
