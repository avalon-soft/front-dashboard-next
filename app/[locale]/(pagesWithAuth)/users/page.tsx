'use client'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import ModalCreateUser from '@/app/components/Pages/Users/ModalCreateUser'
import Table from '@/app/components/Table/Table'
import React, { useEffect, useRef, useState } from 'react'

interface IUser {
  id: number
  name: string
  username: string
}
interface PortalHandle {
  openModal: () => void
}

const Users = () => {
  const { base, users } = endpoints

  const [listUsers, setListUsers] = useState<IUser[]>()
  const modalCreateUser = useRef<PortalHandle>(null)
  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    const { data } = await api.get(base + users.base)
    setListUsers(data)
  }
  const headers = ['id', 'name', 'username']

  return (
    <div className='dashboard dark:bg-main-gray-900'>
      <div className='dashboard__container'>
        <Table
          headers={headers}
          data={listUsers || []}
          tableTitle='Table with users'
          loadData={loadData}
          // meta={data.meta}
          buttonOption={{
            label: 'Create user',
            onClick: () => modalCreateUser.current?.openModal(),
          }}
        />
      </div>
      <ModalCreateUser ref={modalCreateUser} onSuccess={loadData} />
    </div>
  )
}

export default Users
