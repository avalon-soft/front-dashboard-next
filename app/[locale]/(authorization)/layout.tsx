import SupportIcon from '../../components/Icons/Support'
// import './login/login.sass'
import './layout.sass'
import Img from '@/app/components/Image/Image'
import Logo from '@/public/assets/logo.png'
import LogoRetina from '@/public/assets/logo@2x.png'

import { useLocale, useTranslations } from 'next-intl'
const Layout = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale()
  const t = useTranslations('SignInPage')

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='bg-main-blue-gray-50 dark:bg-main-gray-200 h-full w-full'>
        <div className='layout__container'>
          <div className='bg-main-gray-50 dark:bg-main-gray-900 layout__left'>
            <div className='layout__left-container'>
              <div className='flex justify-between align-middle'>
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
                  className='layout__left-icon dark:text-main-gray-50'
                  width={32}
                  height={32}
                />
              </div>
              {children}
            </div>
          </div>
          <div className='bg-primary-focus dark:bg-main-gray-400 layout__right'>
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
