'use client'
import Table from '@/app/components/Table/Table'
import React, { useEffect, useState } from 'react'
import './dashboard.sass'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import { RESPONSE_SUCCESS_STATUS } from '@/configs/constants'
import { IisLoading, IMeta, IQueryParams } from '@/types'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { queryString } from '@/helpers'
import { usePathname, useRouter } from 'next/navigation' // Замінено на новий пакет

const Dashboard = () => {
  // useEffect(() => {
  //   loadData()
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const headers = ['id', 'name', 'status']

  type Data = {
    id: number
    name: string
    status: number
  }

  interface IData {
    data: Data[]
    meta: IMeta
  }

  const { base, dashboard } = endpoints
  const [data, setData] = useState<IData>({} as IData)
  const [isLoading, setIsLoading] = useState<IisLoading>({})
  const router = useRouter()
  const pathname = usePathname()
  const loadData = async (params?: IQueryParams) => {
    router.replace(pathname + queryString(params))
    const { data, status } = await api.get(
      base + dashboard.base + dashboard.table + queryString(params)
    )
    if (RESPONSE_SUCCESS_STATUS.includes(status)) setData(data)
  }
  const t = useTranslations('Dashboard')

  const createFakeData = async () => {
    setIsLoading({ isButton: true })
    await api.post(base + dashboard.base + dashboard.table)
    toast.success(t('notify.fakeDataCreatedSuccessfull'))
    loadData({ page: 1, size: 10 })
    setIsLoading({ isButton: false })
  }
  const { isTable, isButton } = isLoading
  return (
    <div className='dashboard dark:bg-main-gray-900'>
      <div className='dashboard__container'>
        <Table
          headers={headers}
          data={data?.data || []}
          tableTitle='Table with fake data'
          loadData={loadData}
          meta={data.meta}
          buttonOption={{
            label: 'Create fake data to table',
            onClick: () => createFakeData(),
            disabled: isButton,
          }}
        />
      </div>
    </div>
  )
}

export default Dashboard
