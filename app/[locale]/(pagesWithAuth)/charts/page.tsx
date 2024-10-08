'use client'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import React, { useEffect, useState } from 'react'
import './Charts.sass'
import {
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts'
import CircleSpinner from '@/app/components/CircleSpinner/CircleSpinner'
import { useTheme } from 'next-themes'

interface IData {
  x: number
  y: number
}

interface IOption {
  name: string
  color: string
}

interface IChart {
  options: IOption
  data: IData[]
}

const Charts = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setIsDarkMode(resolvedTheme === 'dark')
  }, [resolvedTheme])
  const [charts, setCharts] = useState<IChart[]>([])

  const loadData = async () => {
    const { base, dashboard } = endpoints
    const { data } = await api.get(base + dashboard.base + dashboard.chart)
    setCharts(data)
  }

  if (!charts.length)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <CircleSpinner />
      </div>
    )
  return (
    <div className='charts'>
      <div className='charts__container dark:bg-main-gray-900'>
        {charts.map(({ data, options }, index) => (
          <ResponsiveContainer width='100%' height='100%' key={index}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='x' />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#616161' : '#fff',
                }}
              />
              <Legend />
              <Line
                type='monotone'
                dataKey='y'
                stroke={options.color}
                activeDot={{ r: 8 }}
              />
              <Line type='monotone' dataKey='x' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        ))}
      </div>
    </div>
  )
}

export default Charts
