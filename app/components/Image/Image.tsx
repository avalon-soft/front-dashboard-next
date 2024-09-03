'use client'
import React, { useEffect, useState } from 'react'
import Image, { ImageProps, StaticImageData } from 'next/image'
interface ImgProps extends ImageProps {
  alt: string
  srcSet?: StaticImageData[]
}

const Img = (props: ImgProps) => {
  const { alt, src, className, srcSet, ...defaultProps } = props
  const [customSrc, setCustomSrc] = useState(src)
  useEffect(() => {
    checkTypeDisplayClient()
  })
  const checkTypeDisplayClient = () => {
    window.devicePixelRatio > 1 &&
      setCustomSrc(
        srcSet?.find((el) => el.src.includes('@2x')) as StaticImageData
      )
  }
  return (
    <div className={className}>
      <div className={`image`}>
        <Image
          {...defaultProps}
          src={customSrc}
          alt={alt}
          className={`image__item`}
        />
      </div>
    </div>
  )
}

export default Img
