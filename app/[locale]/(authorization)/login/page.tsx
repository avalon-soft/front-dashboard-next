'use client'
import SupportIcon from '@/app/components/Icons/Support'
import './login.sass'
import Img from '@/app/components/Image/Image'
import Logo from '@/public/assets/logo.png'
import LogoRetina from '@/public/assets/logo@2x.png'
import { useForm } from 'react-hook-form'

import Input from '@/app/components/Form/Input/Input'
import { useState } from 'react'

interface ILoginValues {
  username: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginValues>()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      // const { data } = await auth.post('/token', {
      //   ...values,
      //   client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      //   client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      //   grant_type: 'password',
      //   scope: '*',
      // })
      // addAuthHeader(data)
      // window.localStorage.setItem('session', JSON.stringify(data))
      // push('/subscription')
    } finally {
      setIsSubmitting(false)
    }
  }
  const { username, password } = watch()

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='bg-main-blue-gray-50 login__container'>
        <div className='bg-main-gray-50 login__form'>
          <div className='login__form-container'>
            <div className='login__form-title flex justify-between align-middle'>
              <a href='/' className='flex justify-between align-middle'>
                <Img
                  src={Logo}
                  srcSet={[Logo, LogoRetina]} // important!!!images name for retina display must includes @2x
                  alt='logo'
                  priority={true}
                  width={24}
                  height={24}
                />
                <span className='text-primary-main text-heading-7 ml-2'>
                  Logo
                </span>
              </a>
              <SupportIcon
                className='login__form-icon'
                width={32}
                height={32}
              />
            </div>
            <div className='my-8 w-full justify-start'>
              <h1 className='text-heading-6'>Sign in</h1>
              <h2 className='text-body-w mt-3'>
                Enter your account details below.
              </h2>
            </div>
            <div>
              <Input
                id={'username'}
                label={'Login'}
                register={{
                  ...register('username', {
                    required: 'this is required field',
                  }),
                }}
                error={errors.username}
                type='text'
                name='username'
                placeholder='username'
                isFill={Boolean(username)}
                className='mb-4'
              />
              <Input
                id={'password'}
                label={'Password'}
                register={{
                  ...register('password', {
                    required: 'this is required field',
                  }),
                }}
                error={errors.password}
                type='text'
                name='password'
                placeholder='password'
                isFill={Boolean(password)}
              />
            </div>
          </div>
        </div>
        <div className='bg-primary-focus login__logo'>
          <Img
            src={Logo}
            srcSet={[Logo, LogoRetina]} // important!!!images name for retina display must includes @2x
            alt='logo'
            priority={true}
            width={120}
            height={120}
          />
        </div>
      </div>
    </div>
  )
}
