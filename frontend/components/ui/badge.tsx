import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-[var(--font-mono)] text-[11px] font-medium tracking-[0.06em] uppercase',
  {
    variants: {
      variant: {
        ok:      'bg-[rgba(63,191,127,0.14)]  text-[#6BE0A0]',
        warn:    'bg-[rgba(245,184,62,0.14)]  text-[#F5CC6E]',
        danger:  'bg-[rgba(226,85,85,0.14)]   text-[#F2867D]',
        default: 'bg-[var(--space-4)] text-[var(--lunar-4)]',
        signal:  'bg-[rgba(77,166,245,0.14)]  text-[var(--signal-300)]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, dot = false, children, ...props }: BadgeProps) {
  const dotColor = { ok: '#3FBF7F', warn: '#F5B83E', danger: '#E25555', signal: 'var(--signal-400)', default: 'var(--lunar-5)' }
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span
          className={variant === 'warn' ? 'animate-pulse' : ''}
          style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor[variant ?? 'default'], flexShrink: 0 }}
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
