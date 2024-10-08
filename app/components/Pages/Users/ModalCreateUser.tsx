'use client'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Modal from '../../Modal/Portal'
import { useTranslations } from 'next-intl'
import Close from '../../Icons/Close'
import './ModalCreateUser.sass'
import { useForm } from 'react-hook-form'
import Input from '../../Form/Input/Input'
import { endpoints } from '@/api/endpoints'
import { api } from '@/api'
import { RESPONSE_SUCCESS_STATUS } from '@/configs/constants'
import LoadingButton from '../../Form/LoadingButton/LoadingButton'
import { toast } from 'react-toastify'

interface PortalHandle {
  toggleModal: () => void
  closeModal: () => void
  openModal: () => void
}

interface IModalCreateUser {
  onSuccess: () => void
}

const ModalCreateUser = forwardRef<{ openModal: () => void }, IModalCreateUser>(
  (props, ref) => {
    const modalRef = useRef<PortalHandle>(null)
    const t = useTranslations('Users')
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
    } = useForm<{
      full_name: string
      email: string
      password: string
      confirmPassword: string
    }>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (values: any) => {
      setIsSubmitting(true)
      const { base, users } = endpoints
      const { full_name, email, password } = values

      try {
        const { status } = await api.post(base + users.base, {
          full_name,
          email,
          password,
        })
        if (RESPONSE_SUCCESS_STATUS.includes(status)) {
          modalRef.current?.closeModal()
          onSuccess()
          toast.success(t('createdUserSuccess'))
        }
      } finally {
        setIsSubmitting(false)
      }
    }
    const { email, password, confirmPassword, full_name } = watch()

    return (
      <Modal ref={modalRef}>
        <div className='modal__header'>
          <h2 className='text-heading-4'>{t('createdUser')}</h2>
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
              id={'name'}
              label={t('fullName')}
              register={{
                ...register('full_name', {
                  required: 'This is required field',
                  pattern: {
                    value: /^[a-zA-Z]+ [a-zA-Z]+$/,
                    message: 'Full name must have first name and last name',
                  },
                }),
              }}
              error={errors.full_name}
              type='text'
              name='full_name'
              placeholder='Placeholder@mail.com'
              isFill={Boolean(full_name)}
              className='mb-4'
            />
            <Input
              id={'email'}
              label={t('email')}
              register={{
                ...register('email', {
                  required: 'This is required field',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t('PleaseCorrectYourEmail'),
                  },
                }),
              }}
              error={errors.email}
              type='text'
              name='email'
              placeholder='Placeholder@mail.com'
              isFill={Boolean(email)}
              className='mb-4'
              prependInnerIcon='Mail'
            />
            <Input
              id={'password'}
              label={t('password')}
              register={{
                ...register('password', {
                  required: 'This is required field',
                  minLength: { value: 8, message: t('PasswordMustBeLonger') },
                  maxLength: { value: 20, message: t('PasswordMustBeLess') },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      t('PasswordMustHaveAtLeastOneUppercaseLetter'),
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      t('PasswordMustHaveAtLeastOneLowercaseLetter'),
                    hasNumber: (value) =>
                      /\d/.test(value) || t('PasswordMustHaveAtLeastOneNumber'),
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      t('Password must have at least one special character'),
                  },
                }),
              }}
              error={errors.password}
              type='password'
              name='password'
              placeholder='Password'
              isFill={Boolean(password)}
              prependInnerIcon='Lock'
              className='mb-4'
            />
            <Input
              id={'confirmPassword'}
              label={t('confirmPassword')}
              register={{
                ...register('confirmPassword', {
                  required: t('PleaseConfirmYourPassword'),
                  validate: (value) => {
                    return value === password || t('PasswordsDoNotMatch')
                  },
                }),
              }}
              error={errors.confirmPassword}
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              isFill={Boolean(confirmPassword)}
              prependInnerIcon='Lock'
              className='mb-4'
            />
            {/* <LoadingButton
            isLoading={isSubmitting}
            type='submit'
            className='login__form-button mt-8 w-full bg-primary-main px-4 py-3 text-button-1 text-main-gray-50 hover:bg-primary-hover'
            disabled={isSubmitting}
          >
            {t('signUp')}
          </LoadingButton> */}
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
              {t('save')}
            </LoadingButton>
          </div>
        </form>
      </Modal>
    )
  }
)

ModalCreateUser.displayName = 'ModalCreateUser'

export default ModalCreateUser
