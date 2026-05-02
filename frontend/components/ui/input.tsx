import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full px-3.5 py-2.5 text-sm rounded-lg outline-none transition-all duration-[120ms]',
      'bg-[var(--space-2)] border border-[var(--border)] text-[var(--fg)]',
      'placeholder:text-[var(--lunar-5)]',
      'focus:border-[var(--signal-400)] focus:shadow-[0_0_0_3px_rgba(77,166,245,0.2)]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'

export { Input }
