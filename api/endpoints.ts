import { API_V1 } from '@/configs/constants'
export const endpoints = {
  base: API_V1,
  users: {
    base: '/user',
    me: '/me',
  },
  auth: {
    base: '/auth',
    token: '/login',
  },

  dashboard: {
    base: '/dashboard',
    table: '/table',
    statistic: '/statistic',
    chart: '/chart',
  },
  payments: {
    base: '/payment',
    mono: {
      base: '/mono',
      my: '/my',
      invoice: '/invoice',
      check: 'check',
    },
  },
}
