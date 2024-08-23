'use client'
import Table from '@/app/components/Table/Table'
import React, { useEffect, useState } from 'react'
import './dashboard.sass'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import { RESPONSE_SUCCESS_STATUS } from '@/configs/constants'

const Dashboard = () => {
  useEffect(() => {
    loadData()
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headers = ['id', 'name', 'status']

  type Data = {
    id: number
    name: string
    status: number
  }

  const { base, table } = endpoints
  const [data, setData] = useState<Data[]>([])
  const loadData = async () => {
    const { data, status } = await api.get(base + table)
    if (RESPONSE_SUCCESS_STATUS.includes(status)) setData(data)
  }
  return (
    <div className='dashboard dark:bg-main-gray-900'>
      <div className="dashboard__container">
      <Table
        headers={headers}
        data={data}
        tableTitle='Table title'
        buttonOption={{
          label: 'Button',
        }}
      />
      </div>
    </div>
  )
}

export default Dashboard
