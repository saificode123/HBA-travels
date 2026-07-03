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
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-vayron focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants = {
    primary:
      'bg-gradient-to-b from-gold-400 to-gold-600 text-night-900 hover:from-gold-400 hover:to-gold-800 focus-visible:outline-gold-400 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.5)] hover:shadow-[0_8px_28px_-4px_rgba(212,175,55,0.55)]',
    outline:
      'border border-sand-50/25 bg-sand-50/5 text-sand-50 backdrop-blur-sm hover:border-gold-400/60 hover:bg-gold-400/10 hover:text-gold-400 focus-visible:outline-sand-50',
    ghost:
      'border border-gold-400/30 bg-gold-50/50 text-gold-600 hover:border-gold-400 hover:bg-gold-50 focus-visible:outline-gold-400',
  }

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const clamp = (v: number) => Math.max(-4, Math.min(4, v * 0.15))
    ref.current.style.transform = `translate(${clamp(x)}px, ${clamp(y)}px) rotate(${clamp(x) * 0.3}deg)`
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
    >
      {children}
    </button>
  )
}
