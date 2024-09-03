'use client'
import { api } from '@/api'
import { endpoints } from '@/api/endpoints'
import './Statistic.sass'
import React, { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Legend,
  Scatter,
  RadialBarChart,
  RadialBar,
  LineChart,
  PieChart,
  Pie,
  Sector,
} from 'recharts'
import { getRandomHexColor } from '@/helpers'

interface IOptions {
  color: string
  name: string
}
interface IData {
  x: string
  y: number
  name?: string
  fill?: string
}
interface IStatistic {
  userData: {
    options: IOptions
    data: IData[]
  }[]
  salesData: {
    options: IOptions
    data: IData[]
  }[]
  trafficData: {
    options: IOptions
    data: IData[]
  }[]
}

const Statistic = () => {
  const [statistics, setStatistics] = useState<IStatistic>({} as IStatistic)
  const [activeIndex, setActiveIndex] = useState<any>(0)
  const { base, dashboard } = endpoints

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
          {payload.x}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill='none'
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill='#333'
        >{`${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill='#999'
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    )
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    const { data } = await api.get(base + dashboard.base + dashboard.statistic)
    setStatistics(data)
  }
  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  })

  if (!Object.keys(statistics).length) {
    return <div>Loading...</div> // або поверніть спіннер
  }

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 0.5 }))
  }

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o

    setOpacity((op) => ({ ...op, [dataKey]: 1 }))
  }
  const { salesData, trafficData, userData } = statistics
  return (
    <div className='statistic h-full w-full dark:bg-main-gray-900'>
      <div className='statistic__container'>
        {salesData.map(({ data, options }, index) => (
          <ResponsiveContainer height={'100%'} width={'100%'} key={index}>
            <PieChart width={400} height={400}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={80}
                fill='#8884d8'
                dataKey='y'
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
        ))}
        <div>
          <ResponsiveContainer height={'100%'} width={'100%'}>
            <PieChart>
              <Pie
                dataKey='y'
                isAnimationActive={false}
                data={trafficData[0].data}
                // cx='50%'
                // cy='50%'
                outerRadius={80}
                fill={trafficData[0].options.color}
                name={trafficData[0].options.name}
                label
              />
              <Pie
                dataKey='y'
                data={trafficData[1].data}
                cx={500}
                cy={200}
                innerRadius={40}
                outerRadius={80}
                fill={trafficData[1].options.color}
                name={trafficData[1].options.name}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {userData.map(({ data, options }, index) => (
          <ResponsiveContainer height={'100%'} width={'100%'} key={index}>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke='#f5f5f5' />
              <XAxis dataKey='x' scale='band' />
              <YAxis dataKey='y' />
              <Tooltip />
              <Legend />
              <Bar
                name={options.name}
                dataKey='y'
                barSize={20}
                fill={options.color}
              />
            </ComposedChart>
          </ResponsiveContainer>
        ))}
      </div>
    </div>
  )
}

export default Statistic
