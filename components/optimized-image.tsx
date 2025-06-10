"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

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
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && !priority && (
        <div
          className={`bg-slate-200 animate-pulse ${className}`}
          style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%" }}
        />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"} transition-all duration-300`}
        onLoadingComplete={() => setIsLoading(false)}
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        {...props}
      />
    </>
  )
}
