import { useState, type ImgHTMLAttributes } from 'react'
import { getFallbackImage } from '../config/images'

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackAlt?: string
}

export default function SafeImage({
  src,
  alt,
  className = '',
  fallbackAlt,
  onError,
  ...props
}: SafeImageProps) {
  const fallback = getFallbackImage()
  const [currentSrc, setCurrentSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  return (
    <img
      {...props}
      src={hasError ? fallback.src : currentSrc}
      alt={hasError ? (fallbackAlt ?? fallback.alt) : alt}
      className={`${className} ${hasError ? 'opacity-90' : ''}`}
      onError={(e) => {
        if (!hasError) {
          setHasError(true)
          setCurrentSrc(fallback.src)
        }
        onError?.(e)
      }}
    />
  )
}
