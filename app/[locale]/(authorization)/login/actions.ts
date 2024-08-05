'use server'
import { createSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function signIn(token: string) {
  createSession(token)
  let locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  redirect(`/${locale}/dashboard`)
}
