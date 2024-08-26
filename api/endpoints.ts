import { API_V1 } from '@/configs/constants'
export const endpoints = {
  base: API_V1,
  user: '/user',
  auth: {
    me: '/me',
    base: '/auth',
    token: '/login',
  },
  curentuser: 'user/current',
  subscribe: {
    buy: 'subscription/stripe/subscribe',
    cancel: 'subscription/stripe/cancel',
  },
  contactUs: 'mail/contact-us',
  logout: 'user/logout',
  dashboard: {
    base: '/dashboard',
    table: '/table',
    statistic: '/statistic',
    chart: '/chart',
  },
}
