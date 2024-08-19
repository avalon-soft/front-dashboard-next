import { useTranslations } from 'next-intl'
import { SaveFilter } from './SaveFilter/SaveFilter'
import Input from '../../Form/Input/Input'
import FilterIcon from '@/app/components/Icons/Filter'
import Select from '../../Form/Select/Select'
import './Filter.sass'
import Drawer from './Drawer/Drawer'
const Filter = () => {
  const t = useTranslations('Filter')

  return (
    <>
      <div className='mt-6 flex filter'>
        <Input
          id={'searchField'}
          label={''}
          register={
            {
              // ...register('searchField', {}),
            }
          }
          error={undefined}
          type='text'
          name='searchField'
          placeholder='Search...'
          prependInnerIcon='Search'
          className='w-full'
          isFill={Boolean()}
          propsAppendIconButton={{ onClick: () => {} }}
        />
        <Select
          options={[
            { label: 'Saved filter', value: 'Saved filter' },
            { label: 'Saved filter2', value: 'Saved filter2' },
          ]}
          placeholder='Saved filters'
          className='filter__react-select-container'
          classNamePrefix='filter__react-select'
        />
        <button className='filter__btn rounded-r-sm border border-primary-main p-2 hover:bg-primary-main'>
          <FilterIcon
            width={24}
            height={24}
            className='filter__icon text-primary-main'
          />
        </button>
      </div>
      <Drawer />
      <SaveFilter />
    </>
  )
}

export default Filter
