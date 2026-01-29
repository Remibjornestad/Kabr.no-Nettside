"use client"

import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  lowQualityUrl?: string
}

export default function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  lowQualityUrl,
  priority,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      quality={100}
      {...props}
    />
  )
}
