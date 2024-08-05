import { API_V1 } from '@/configs/constants'
export const endpoints = {
  base: API_V1,
  
  user: '/user',
  token: '/auth/login',
  curentuser: 'user/current',
  subscribe: {
    buy: 'subscription/stripe/subscribe',
    cancel: 'subscription/stripe/cancel',
  },
  contactUs: 'mail/contact-us',
  logout: 'user/logout',
}
