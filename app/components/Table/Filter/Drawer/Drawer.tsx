'use client'
import React, {
  forwardRef,
  HTMLProps,
  useEffect,
  useRef,
  useState,
} from 'react'
import './Drawer.sass'
import Pin from '@/app/components/Icons/Pin'
import PinOff from '@/app/components/Icons/PinOff'
import DeviceFloppy from '@/app/components/Icons/DeviceFloppy'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Input from '@/app/components/Form/Input/Input'
import { useForm } from 'react-hook-form'
import { IQueryParams } from '@/types'
import LoadingButton from '@/app/components/Form/LoadingButton/LoadingButton'
import Portal from '@/app/components/Modal/Modal'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { clearObject, getKeysObject } from '@/helpers'
import { useFilterStore } from '@/stores/filterStore'

interface IFilter {
  name: string
  status: string
}

interface ISaveFilter {
  filterName: string
}

interface IDrawer extends HTMLProps<HTMLDivElement> {
  loadData: (params?: IQueryParams) => void
  savedFilter: any
}

interface PortalHandle {
  toggleModal: () => void
  closeModal: () => void
  openModal: () => void
}

const Drawer = forwardRef<HTMLDivElement, IDrawer>((props, ref) => {
  const { loadData, savedFilter, className, ...defaultProps } = props
  const [isPin, setIsPin] = useState(false)

  const container = useRef<HTMLButtonElement>(null)
  const portalRef = useRef<PortalHandle>(null)
  const { contextSafe } = useGSAP({ scope: container })

  const t = useTranslations('Filter')

  const handleClickIsPin = contextSafe(() => {
    if (!isPin) {
      gsap.to('.drawer-filter__icon--pin', { opacity: 0 })
      gsap.to('.drawer-filter__icon--pin-off', { opacity: 1 })
    } else {
      gsap.to('.drawer-filter__icon--pin', { opacity: 1 })
      gsap.to('.drawer-filter__icon--pin-off', { opacity: 0 })
    }
    if ('isPin' in window.localStorage && isPin) {
      localStorage.removeItem('isPin')
    } else localStorage.setItem('isPin', isPin.toString())
    setIsPin(!isPin)
  })

  useEffect(() => {
    if ('isPin' in window.localStorage) handleClickIsPin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (savedFilter) {
      reset(savedFilter.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedFilter])

  const { handleSubmit, reset, register, watch } = useForm<IFilter>()
  const saveFilter = useForm<ISaveFilter>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const watchAllFields = watch()
  const { filters, setFilters } = useFilterStore()

  const handleClickSaved = ({ filterName }: { filterName: string }) => {
    let savedFilters = [...filters]
    savedFilters.push({ label: filterName, value: watchAllFields })

    setFilters(savedFilters)
    toast.success(t('notify.success.filterSaved'))

    saveFilter.reset()
    return true
  }

  const onSubmit = async (values: IFilter) => {
    setIsSubmitting(true)
    try {
      loadData(values)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleClickClear = () => {
    reset({
      name: '',
      status: '',
    })
  }

  const bodyModalWindow = () => {
    return (
      <Input
        label={t('filterName')}
        register={{ ...saveFilter.register('filterName') }}
        isFill={false}
        placeholder='Please to enter name filter'
        name='filterName'
        type='text'
      />
    )
  }
  const footerModalWindow = () => {
    return (
      <>
        <LoadingButton
          type='submit'
          className='w-24 rounded-sm border border-primary-border bg-primary-main px-4 py-3 text-main-gray-50 hover:bg-primary-hover disabled:bg-main-blue-gray-50 disabled:text-main-gray-400'
          disabled={!saveFilter.watch().filterName}
        >
          Save
        </LoadingButton>
      </>
    )
  }

  const handleClickModal = () => {
    if (Boolean(getKeysObject(clearObject(watchAllFields)).length)) {
      portalRef.current?.toggleModal()
    } else {
      toast.warning(t('notify.warning.filterIsEmpty'))
    }
  }

  return (
    <>
      <div
        ref={ref}
        {...defaultProps}
        className={classNames('drawer-filter dark:bg-main-gray-700', className)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='drawer-filter__content'>
            <Input
              label='Name'
              register={{ ...register('name') }}
              isFill={false}
              placeholder='Please to enter name'
              name='name'
              type='text'
            />
            <Input
              label='Status'
              register={{ ...register('status') }}
              isFill={false}
              placeholder='Please to enter name status'
              name='status'
              type='text'
            />
          </div>
          <div className={classNames('drawer-filter__footer')}>
            {/* <button className='drawer-filter__show-additional-filter flex items-center'>
          <span className='mr-1 text-body-2'>Show additional filters</span>
          <ChevronDown width={24} height={24} />
        </button> */}
            <div className='flex'>
              <div className='flex gap-4'>
                <button
                  className={classNames(
                    'drawer-filter__button rounded-sm border p-2',
                    {
                      'border-error-main': isPin,
                      'border-primary-main': !isPin,
                    }
                  )}
                  ref={container}
                  type='button'
                  onClick={() => handleClickIsPin()}
                >
                  <Pin
                    width={24}
                    height={24}
                    className='drawer-filter__icon drawer-filter__icon--pin text-primary-main dark:text-main-gray-50'
                  />
                  <PinOff
                    width={24}
                    height={24}
                    className='drawer-filter__icon drawer-filter__icon--pin-off text-error-main'
                  />
                </button>
                <Portal
                  ref={portalRef}
                  header={'Save filter'}
                  footer={footerModalWindow()}
                  onSave={saveFilter.handleSubmit(handleClickSaved)}
                  activeButton={
                    <button
                      type='button'
                      onClick={() => handleClickModal()}
                      className='rounded-sm bg-primary-main p-2'
                    >
                      <DeviceFloppy
                        width={24}
                        height={24}
                        className='text-main-gray-50'
                      />
                    </button>
                  }
                  body={bodyModalWindow()}
                />
              </div>
              <div className='mx-4 divide-y-2 border border-main-gray-200' />
              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={handleClickClear}
                  className='rounded-sm border border-primary-main px-5 py-2 text-primary-main dark:text-main-gray-50'
                >
                  Clear all
                </button>
                <LoadingButton
                  isLoading={isSubmitting}
                  type='submit'
                  className='rounded-sm bg-primary-main px-8 py-2 text-main-gray-50'
                >
                  Apply
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
})
Drawer.displayName = 'Drawer'
export default Drawer
