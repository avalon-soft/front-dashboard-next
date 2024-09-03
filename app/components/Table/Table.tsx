'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import { calculateTotalHeight, getColorStatus } from '@/helpers'
import Skeleton from './Skaleton/Skeleton'
import { IMeta, IQueryParams } from '@/types'
import { SingleValue } from 'react-select'
import gsap from 'gsap'
import useWindowHeight from '@/helpers/useWindowHeight'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

interface TableProps {
  data: any[]
  headers: string[]
  tableTitle?: string
  buttonOption?: ButtonProps
  loadData: (params?: IQueryParams) => void
  meta?: IMeta
  isFilter?: boolean
}

const columnHelper = createColumnHelper<any>()

const Table = (props: TableProps) => {
  const { data, meta, headers, tableTitle, loadData, isFilter, buttonOption } =
    props

  const [columns, setColumns] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [typeSort, setTypeSort] = useState<'ASC' | 'DESC'>('ASC')
  const [activeSort, setActiveSort] = useState<string>()

  const [size, setSize] = useState<
    SingleValue<{ label: string; value: string }>
  >({ label: '10', value: '10' })

  useLayoutEffect(() => {
    let pageSize = Number(size?.value) || 10
    loadData({ page: 1, size: pageSize, orderBy: '-id' })
    setIsLoading(false)
    calculeteHeightTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let items = headers.map((el) => columnHelper.accessor(el, {}))
    setColumns(items)
  }, [headers])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const height = useWindowHeight()
  useEffect(() => {
    calculeteHeightTable()
  }, [height])
  const calculeteHeightTable = () => {
    let table = document.querySelector('.data-table')
    let dashboard = document.querySelector('.dashboard')

    let totalHeight = 0
    for (let element of table?.children as any) {
      if ('data-table__scroll-container' !== element.classList[0]) {
        totalHeight = totalHeight + element.offsetHeight
      }
    }
    let height = calculateTotalHeight(dashboard?.children) - totalHeight

    gsap.to('.data-table__scroll-container', {
      maxHeight: height >= 200 ? height - 125 : 200,
    })
  }
  const t = useTranslations('Table')

  const handleClickSort = async (name: string) => {
    if (name === activeSort) {
      if (typeSort === 'DESC') setTypeSort('ASC')
      else setTypeSort('DESC')
    } else setActiveSort(name)
  }

  useEffect(() => {
    let params: IQueryParams = {}
    let pageSize = Number(size?.value) || 10
    currentPage && (params.page = currentPage)
    pageSize && (params.size = pageSize)
    activeSort && (params.orderBy = activeSort)
    typeSort && (params.order = typeSort)

    if (Object.keys(params).length) loadData(params)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSort, size, currentPage, typeSort])

  return (
    <div className='data-table'>
      <div className='data-table__title flex items-center justify-between'>
        {tableTitle && (
          <h1 className='text-heading-6 text-main-gray-900 dark:text-main-gray-50'>
            {tableTitle}
          </h1>
        )}
        {buttonOption && (
          <button
            {...buttonOption}
            className='data-table__button rounded bg-primary-main px-4 py-2 text-main-gray-50'
          >
            {buttonOption.label}
          </button>
        )}
      </div>
      {isFilter && (
        <Filter loadData={loadData} className='data-table__filter' />
      )}
      <div className='data-table__resoults mb-4 py-2'>
        <span className='text-body-2 text-main-gray-900 dark:text-main-gray-50'>
          {t('resultsFound')}:
        </span>
        <span className='ml-2 text-subtitle-1 text-primary-main'>
          {meta?.itemCount || data.length || 0}
        </span>
      </div>
      <div className='data-table__scroll-container'>
        <div className='data-table__container'>
          <table className='data-table__table'>
            <thead className='data-table__table-header'>
              {table.getHeaderGroups().map((headerGroup) => {
                // console.log('headerGroup :>> ', headerGroup)
                return (
                  <tr
                    key={headerGroup.id}
                    className='data-table__table-header-tr'
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={classNames(
                          'data-table__table-header-th text-caption-1',
                          {
                            'cursor-pointer': true,
                          }
                        )}
                        onClick={() => handleClickSort(header.id)}
                      >
                        <div className='flex items-center'>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          <ArrowsSort
                            width={16}
                            height={16}
                            className={classNames('ml-2', {
                              'scale-110 text-primary-main':
                                activeSort?.includes(header.id),
                            })}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                )
              })}
            </thead>
            <tbody className='data-table__table-body'>
              {isLoading ? (
                <Skeleton cols={table.getHeaderGroups()[0].headers.length} />
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className='data-table__table-body-tr'>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className='data-table__table-body-td text-body-2'
                      >
                        <div
                          className={classNames(
                            'max-w-max rounded-3xl px-5 py-2',
                            {
                              [getColorStatus(cell.getContext().getValue())]:
                                cell.column.id === 'status',
                            }
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className='data-table__table-body-tr border border-primary-border'>
                  <td />
                  <td className='py-4 text-center'>{t('dataNotFound')}</td>
                  <td />
                </tr>
              )}
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
      </div>
      {meta && (
        <div className='data-table__footer mt-4 flex items-center justify-between'>
          <div className='flex w-full items-center'>
            <span className='text-caption-1'>{t('NumberOfLines')}:</span>
            <Select
              options={[
                { label: '20', value: '20' },
                { label: '10', value: '10' },
              ]}
              defaultValue={size}
              value={size}
              onChange={(option) =>
                setSize(option as SingleValue<{ label: string; value: string }>)
              }
              className='data-table__table-react-select-container'
              classNamePrefix='data-table__react-select'
              menuPlacement='top'
            />
          </div>

          <Pagination
            currentPage={meta?.page || 1}
            onPageChange={(page: number) => setCurrentPage(page)}
            totalPages={meta?.pageCount || 1}
          />
        </div>
      )}
    </div>
  )
}

export default Table
