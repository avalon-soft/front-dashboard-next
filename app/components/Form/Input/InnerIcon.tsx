// components/DynamicComponent.tsx
import React, { lazy, Suspense, useEffect, useState } from 'react'

interface PropsprependInnerIcon {
  componentName: string
  [key: string]: any // accept leverage any props
}

const InnerIcon = ({ componentName, ...props }: PropsprependInnerIcon) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  )

  useEffect(() => {
    const importComponent = async () => {
      try {
        const importedComponent = lazy(
          () => import(`@/app/components/Icons/${componentName}`)
        )
        setComponent(() => importedComponent)
      } catch (error) {
        console.error(`Error importing component ${componentName}:`, error)
      }
    }

    importComponent()
  }, [componentName])

  if (!Component) {
    return null
  }

  return (
    <Suspense fallback={<p style={{ width: 24, height: 24 }} />}>
      <Component {...props} />
    </Suspense>
  )
}

export default InnerIcon
