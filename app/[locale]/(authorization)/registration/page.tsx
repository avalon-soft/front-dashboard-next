'use client'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import Input from '@/app/components/Form/Input/Input'
import LoadingButton from '@/app/components/Form/LoadingButton/LoadingButton'
import ProgressCheck from '../../../components/Icons/ProgressCheck'
import { RESPONSE_SUCCESS_STATUS } from '@/configs/constants'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useActionState, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const Registration = () => {
  const t = useTranslations('SignInPage')
  const locale = useLocale()

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
  const [step, setStep] = useState(1)
  // const [ state, action] = useActionState(signup, null)
  const { push } = useRouter()

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)
    const { base, users } = endpoints
    const { full_name, email, password } = values
    // action(values)
    try {
      const { status } = await api.post(base + users.base, {
        full_name,
        email,
        password,
      })
      if (RESPONSE_SUCCESS_STATUS.includes(status)) setStep(1)
      // addAuthHeader(data)
      // window.localStorage.setItem('session', JSON.stringify(data))
      // push(`/${locale}/dashboard`)
    } finally {
      setIsSubmitting(false)
    }
  }
  const { email, password, confirmPassword, full_name } = watch()
  return step === 0 ? (
    <>
      <div className='my-8 w-full justify-start'>
        <h1 className='text-heading-6'>{t('signUp')}</h1>
        <h2 className='text-body-w mt-3'>{t('createYourAccount')}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <LoadingButton
          isLoading={isSubmitting}
          type='submit'
          className='login__form-button mt-8 w-full bg-primary-main px-4 py-3 text-button-1 text-main-gray-50 hover:bg-primary-hover'
          disabled={isSubmitting}
        >
          {t('signUp')}
        </LoadingButton>
      </form>
      <div className='mt-4 flex items-center justify-center'>
        <span className='mr-2 text-body-2'>{t('alreadyHaveAnAccount')}</span>
        <a
          href={`/${locale}/login`}
          className='flex items-center justify-center text-primary-main hover:text-primary-hover'
        >
          <span className='text-subtitle-1'>Back to log in</span>
        </a>
      </div>
    </>
  ) : (
    <>
      <div>
        <div className='mx-auto w-content rounded-full bg-success-main p-1'>
          <ProgressCheck
            className='text-main-blue-gray-50'
            width={40}
            height={40}
          />
        </div>
        <h1 className='mt-6 text-center text-heading-6'>
          {t('successfullRegistration')}
        </h1>
        <p className='mb-8 mt-4 text-center text-body-2'>
          {t('textForSuccessRegistration')}
          <br />
          {/* <span className='text-primary-main'>{email}</span>. */}
          <span className='text-primary-main'>tymoshenko.vlad@gmail.com</span>.
        </p>
        <p className='text-center text-body-2'>
          {t('DidntGetTheLink')}?
          <button className='ml-2 text-subtitle-2 text-primary-main'>
            {t('SendMore')}
          </button>
        </p>
      </div>
      <div />
    </>
  )
}

export default Registration
