"use client"

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
}: OptimizedImageProps) {
  const imgSrc = src || "/placeholder.svg"
  
  if (fill) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className || ""}`}
        loading={priority ? "eager" : "lazy"}
      />
    )
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
    />
  )
}
