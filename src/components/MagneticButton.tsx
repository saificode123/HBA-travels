import { useReducedMotion } from 'framer-motion'
import { useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
}

export default function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 overflow-hidden'

  const variants = {
    primary:
      'text-night-900 focus-visible:outline-gold-400',
    outline:
      'border border-sand-50/22 bg-sand-50/5 text-sand-50 backdrop-blur-sm hover:border-gold-400/55 hover:bg-gold-400/8 hover:text-gold-400 focus-visible:outline-sand-50',
    ghost:
      'border border-gold-400/28 bg-gold-50/45 text-gold-600 hover:border-gold-400 hover:bg-gold-50 focus-visible:outline-gold-400',
  }

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const clamp = (v: number) => Math.max(-5, Math.min(5, v * 0.18))
    ref.current.style.transform = `translate(${clamp(x)}px, ${clamp(y)}px) rotate(${clamp(x) * 0.25}deg)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
      style={{
        ...(variant === 'primary'
          ? {
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8912C 80%, #D4AF37 100%)',
              backgroundSize: '200% 200%',
              boxShadow: '0 4px 24px -4px rgba(212,175,55,0.45), 0 1px 0 rgba(255,255,255,0.2) inset',
              transition: 'box-shadow 0.35s ease, transform 0.3s ease, background-position 0.5s ease',
            }
          : {}),
        ...props.style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary' && ref.current) {
          ref.current.style.boxShadow =
            '0 8px 32px -6px rgba(212,175,55,0.6), 0 1px 0 rgba(255,255,255,0.25) inset'
          ref.current.style.backgroundPosition = '100% 100%'
        }
        props.onMouseEnter?.(e)
      }}
    >
      {children}
    </button>
  )
}
