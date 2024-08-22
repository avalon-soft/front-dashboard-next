'use server'
import { deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function signOut() {
  deleteSession()
  // let locale = cookies().get('NEXT_LOCALE')?.value || 'en'
  // redirect(`/${locale}/login`)
}

export async function getCookie() {
  return cookies().get('session')
}