import { useTranslations } from 'next-intl'
import { SaveFilter } from './SaveFilter/SaveFilter'
import Input from '../../Form/Input/Input'
import FilterIcon from '@/app/components/Icons/Filter'
import Select from '../../Form/Select/Select'
import './Filter.sass'
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
        <Select />
        <button className='filter__btn rounded-r-sm border border-primary-main p-2 hover:bg-primary-main'>
          <FilterIcon
            width={24}
            height={24}
            className='filter__icon text-primary-main'
          />
        </button>
      </div>
      <SaveFilter />
    </>
  )
}

export default Filter
