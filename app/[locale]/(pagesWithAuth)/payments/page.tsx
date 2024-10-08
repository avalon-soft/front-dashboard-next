'use client'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import ModalCreatePayments from '@/app/components/Pages/Payments/ModalCreatePayments'
import Table from '@/app/components/Table/Table'
import React, { useEffect, useRef, useState } from 'react'

const Payments = () => {
  const [listPayments, setListPayments] = useState([])
  const headers = ['amount', 'invoiceId', 'payment_provider']
  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { base, payments } = endpoints

  const loadData = async () => {
    const { data } = await api.get(base + payments.base + payments.mono.base)
    console.log('data :>> ', data)
    setListPayments(data)
  }

  const paymentRef = useRef<{ openModal: () => void }>(null)

  return (
    <div className='users dark:bg-main-gray-900'>
      <div className='users__container'>
        <Table
          headers={headers}
          data={listPayments || []}
          tableTitle='Table with payments'
          loadData={loadData}
          // meta={data.meta}
          buttonOption={{
            label: 'Create payment',
            onClick: () => paymentRef.current?.openModal(),
          }}
        />
      </div>
      <ModalCreatePayments ref={paymentRef} onSuccess={loadData} />
    </div>
  )
}

export default Payments
