import { INavigation } from '@/types'

export const navigationList = (locale: string): INavigation[] => {
  return [
    {
      label: 'Dashboard',
      icon: 'Loader',
      path: `/${locale}/dashboard`,
    },
    {
      label: 'Charts',
      icon: 'Loader',
      path: `/${locale}/charts`,
    },
    {
      label: 'Statistic',
      icon: 'Loader',
      path: `/${locale}/statistic`,
    },
    {
      label: 'Users',
      icon: 'Loader',
      path: `/${locale}/users`,
    },
    {
      label: 'Payments',
      icon: 'Loader',
      path: `/${locale}/payments`,
    },
  ]
}
