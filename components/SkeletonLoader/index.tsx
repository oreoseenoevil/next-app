import React from 'react'
import ContentLoader from 'react-content-loader'

interface SkeletonLoaderProps {
  children?: React.ReactNode
  height?: number | string
  width?: number | string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  children,
  height,
  width
}) => {
  return (
    <ContentLoader
      uniqueKey="1"
      backgroundColor="#555"
      foregroundColor="#eee"
      height={height}
      width={width}
      speed={1}
    >
      {children}
    </ContentLoader>
  )
}

export default SkeletonLoader
