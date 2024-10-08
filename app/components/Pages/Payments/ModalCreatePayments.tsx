'use client'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Modal from '../../Modal/Portal'
import { useTranslations } from 'next-intl'
import Close from '../../Icons/Close'
import './ModalCreatePayments.sass'
import { useForm } from 'react-hook-form'
import Input from '../../Form/Input/Input'
import { endpoints } from '@/api/endpoints'
import { api } from '@/api'
import { RESPONSE_SUCCESS_STATUS } from '@/configs/constants'
import LoadingButton from '../../Form/LoadingButton/LoadingButton'

interface PortalHandle {
  toggleModal: () => void
  closeModal: () => void
  openModal: () => void
}

interface IModalCreatePayments {
  onSuccess: () => void
}

const ModalCreatePayments = forwardRef<
  { openModal: () => void },
  IModalCreatePayments
>((props, ref) => {
  const modalRef = useRef<PortalHandle>(null)
  const t = useTranslations('Payments')
  const { onSuccess } = props
  useImperativeHandle(ref, () => ({
    openModal() {
      modalRef?.current?.openModal()
    },
  }))

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<{
    amount: string
    currency: any
  }>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: any) => {
    // setIsSubmitting(true)
    const { base, payments } = endpoints
    const { amount, currency } = values

    try {
      const { data, status } = await api.post(
        base + payments.base + payments.mono.base + payments.mono.invoice,
        {
          amount: parseInt(amount),
          currency: currency.number,
        }
      )

      if (RESPONSE_SUCCESS_STATUS.includes(status)) {
        window.open(data.pageUrl)
        modalRef.current?.closeModal()
        onSuccess()
        // toast.success(t('createdPaymentSuccess'))
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  const { amount, currency } = watch()

  return (
    <Modal ref={modalRef}>
      <div className='modal__header'>
        <h2 className='text-heading-4'>{t('createdPayment')}</h2>
        <button onClick={() => modalRef.current?.closeModal()}>
          <Close
            className='layout__left-icon text-error-main dark:text-main-gray-50'
            width={32}
            height={32}
          />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='modal__body'>
          <Input
            id={'amount'}
            label={t('amount')}
            register={{
              ...register('amount', {
                required: 'This is required field',
                validate: {
                  positive: (v) =>
                    parseInt(v) > 0 || 'Value must be greater than 0',
                  lessThanTen: (v) =>
                    parseInt(v) < 999999 ||
                    'Value must be greater than 999 999',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Only digits are allowed',
                },
              }),
            }}
            error={errors.amount}
            type='number'
            name='amount'
            placeholder='100'
            isFill={Boolean(amount)}
            className='mb-4'
            wallet
            walletRegister={control}
            prependInnerIcon={currency?.label || 'UAH'}
          />
        </div>
        <div className='modal__actions'>
          <button
            className='rounded bg-main-gray-200 px-4 py-2 text-primary-main'
            onClick={() => modalRef.current?.closeModal()}
          >
            {t('cancel')}
          </button>
          <LoadingButton
            type='submit'
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className='rounded bg-primary-main px-4 py-2 text-main-gray-50'
          >
            {t('payment')}
          </LoadingButton>
        </div>
      </form>
    </Modal>
  )
})

ModalCreatePayments.displayName = 'ModalCreatePayments'

export default ModalCreatePayments
