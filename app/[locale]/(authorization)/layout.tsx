import SupportIcon from '@/app/components/icons/Support'
import './login/login.sass'
import Img from '@/app/components/Image/Image'
import Logo from '@/public/assets/logo.png'
import LogoRetina from '@/public/assets/logo@2x.png'

import { useLocale, useTranslations } from 'next-intl'
const Layout = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale()
  const t = useTranslations('SignInPage')

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='bg-main-blue-gray-50 h-screen w-full'>
        <div className='login__container'>
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
              {children}
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
    </div>
  )
}

export default Layout
