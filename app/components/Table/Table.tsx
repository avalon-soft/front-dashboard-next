'use client'
import React, { useEffect, useState } from 'react'
import Select from '../Form/Select/Select'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import './Table.sass'
import ArrowsSort from '../Icons/ArrowsSort'
import { useTranslations } from 'next-intl'
import Filter from './Filter/Filter'
import Pagination from '../Pagination/Pagination'
import classNames from 'classnames'
import { getColorStatus } from '@/helpers'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

interface TableProps {
  data: any[]
  headers: string[]
  tableTitle?: string
  buttonOption?: ButtonProps
}

const columnHelper = createColumnHelper<any>()

const Table = (props: TableProps) => {
  const { data, headers, tableTitle, buttonOption } = props

  const [columns, setColumns] = useState<any>([])
  useEffect(() => {
    let items = headers.map((el) => columnHelper.accessor(el, {}))
    setColumns(items)
  }, [headers])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const t = useTranslations('Table')

  return (
    <div>
      <div className='flex items-center justify-between'>
        {tableTitle && (
          <h1 className='text-heading-6 text-main-gray-900 dark:text-main-gray-50'>
            {tableTitle}
          </h1>
        )}
        {buttonOption && (
          <button
            {...buttonOption}
            className='rounded bg-primary-main px-4 py-2 text-main-gray-50'
          >
            {buttonOption.label}
          </button>
        )}
      </div>
      <Filter />
      <div className='mb-4 py-2'>
        <span className='text-body-2 text-main-gray-900 dark:text-main-gray-50'>
          {t('resultsFound')}:
        </span>
        <span className='ml-2 text-subtitle-1 text-primary-main'>10</span>
      </div>
      <div className='container-table'>
        <table className='table'>
          <thead className='table__header'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='table__header-tr'>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='table__header-th text-caption-1'
                  >
                    <div className='flex items-center'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      <ArrowsSort width={16} height={16} className='ml-2' />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='table__body'>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='table__body-tr'>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='table__body-td text-body-2'>
                    <div
                      className={classNames('max-w-max rounded-3xl px-5 py-2', {
                        [getColorStatus(cell.getContext().getValue())]:
                          cell.column.id === 'status',
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex w-full items-center'>
          <span className='text-caption-1'>{t('NumberOfLines')}:</span>
          <Select
            options={[
              { label: '20', value: '20' },
              { label: '10', value: '10' },
            ]}
            defaultValue={{ label: '10', value: '10' }}
            className='table__react-select-container'
            classNamePrefix='table__react-select'
          />
        </div>
        <Pagination currentPage={1} onPageChange={() => {}} totalPages={20} />
      </div>
    </div>
  )
}

export default Table
