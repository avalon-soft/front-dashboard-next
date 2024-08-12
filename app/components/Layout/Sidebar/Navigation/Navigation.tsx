import React from 'react'
import './Navigation.sass'
import ListGroup from './ListGroup/ListGroup'
import { useLocale } from 'next-intl'

const Navigation = () => {
  const locale = useLocale()
  return (
    <nav>
      <ListGroup
        title='Section name'
        items={[
          {
            label: 'Dashboard',
            badge: 100,
            icon: 'Loader',
            path: `/${locale}/dashboard`,
          },
          {
            label: 'Charts',
            sub_list: [
              {
                label: 'Bar',
                path: `/${locale}/charts/bar`,
              },
              {
                label: 'Bar',
                path: `/${locale}/charts/bar1`,
              },
              {
                label: 'Bar',
                path: `/${locale}/charts/bar2`,
              },
              {
                label: 'Bar',
                path: `/${locale}/charts/bar3`,
              },
              {
                label: 'Bar',
                path: `/${locale}/charts/bar4`,
              },
              {
                label: 'Bar',
                path: `/${locale}/charts/bar5`,
              },
            ],
            icon: 'Loader',
          },
        ]}
      />
    </nav>
  )
}

export default Navigation
