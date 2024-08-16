'use client'
import Table from '@/app/components/Table/Table'
import React from 'react'
import './dashboard.sass'

const Dashboard = () => {
  const headers = [
    'firstName',
    'lastName',
    'age',
    'visits',
    'status',
    'progress',
  ]

  type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
  }

  const data: Person[] = [
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'dirte',
      age: 45,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
  ]

  return (
    <div className='dashboard dark:bg-main-gray-900'>
      <Table
        headers={headers}
        data={data}
        tableTitle='Table title'
        buttonOption={{
          label: 'Button',
        }}
      />
    </div>
  )
}

export default Dashboard
