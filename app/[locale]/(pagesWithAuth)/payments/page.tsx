'use client'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import ModalCreatePayments from '@/app/components/Pages/Payments/ModalCreatePayments'
import Table from '@/app/components/Table/Table'
import React, { useEffect, useRef, useState } from 'react'
import useQueryParams from '@/hooks/useQueryParams'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import './payments.sass'
import { ListOfCurrencies } from '@/configs/constants'
const Payments = () => {
  const [listPayments, setListPayments] = useState([])
  const headers = ['amount', 'currency', 'invoiceId', 'payment_provider']
  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { base, payments } = endpoints

  const loadData = async () => {
    const { data } = await api.get(
      base + payments.base + payments.mono.base + payments.mono.my
    )
    let updateData = data.map((item: any) => {
      item.currency = ListOfCurrencies.find(
        (el) => el.number === item.currency
      )?.label || '--'
      return item
    })
    setListPayments(updateData)
  }
  const t = useTranslations('Payments')
  const pathname = usePathname()
  const { replace } = useRouter()
  const paymentRef = useRef<{ openModal: () => void }>(null)
  const { success } = useQueryParams()
  useEffect(() => {
    if (Boolean(success)) {
      toast.success(t('createdPaymentSuccess'))
      replace(pathname)
    }
  }, [success])
  return (
    <div className='payments dark:bg-main-gray-900'>
      <div className='payments__container'>
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
