'use client'
import React, { useEffect, useState } from 'react'

import Select, { Props as SelectProps } from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

interface CustomSelectProps extends SelectProps {}

function CustomSelect(props: CustomSelectProps) {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Select
      {...props}
      closeMenuOnSelect={false}
      // components={animatedComponents}
      components={{
        IndicatorSeparator: () => null,
      }}
      // defaultValue={[colourOptions[4], colourOptions[5]]}
      isLoading={isLoading}
    />
  )
}

export default CustomSelect
