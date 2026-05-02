import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-[120ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-60 cursor-pointer',
  {
    variants: {
      variant: {
        primary:   'bg-[var(--signal-400)] text-[#06142B] hover:bg-[var(--signal-300)] rounded-lg',
        secondary: 'bg-[var(--space-3)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--space-4)] hover:border-[var(--space-5)] rounded-lg',
        ghost:     'bg-transparent text-[var(--fg)] hover:bg-white/[0.04] rounded-lg',
        danger:    'bg-[rgba(226,85,85,0.15)] text-[#F2867D] border border-[rgba(226,85,85,0.35)] hover:bg-[rgba(226,85,85,0.25)] rounded-lg',
        approve:   'bg-[rgba(63,191,127,0.15)] text-[#6BE0A0] border border-[rgba(63,191,127,0.35)] hover:bg-[rgba(63,191,127,0.25)] rounded-lg',
        link:      'text-[var(--signal-300)] underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'text-xs px-3 py-1.5',
        md: 'text-sm px-4 py-2.5',
        lg: 'text-base px-6 py-3 font-semibold',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
