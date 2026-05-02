import Link from 'next/link'
import type { Course } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

const CATEGORY_LABELS: Record<string, string> = {
  use_ai: 'Usar IA', code_with_ai: 'Programar con IA', ml_fundamentals: 'ML',
  deep_learning: 'Deep Learning', data_science: 'Data Science',
  ai_tools: 'Herramientas', agents: 'Agentes', ethics_ai: 'Ética',
}
const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado',
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`} className="no-underline group">
      <div className="relative flex flex-col gap-3 min-h-[220px] p-[18px_20px_16px] rounded-xl border border-[var(--border)] bg-[var(--space-3)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-[180ms] cursor-pointer group-hover:border-[rgba(77,166,245,0.5)] group-hover:bg-[var(--space-4)] group-hover:-translate-y-0.5">
        <div className="flex items-center gap-2">
          <span className={`cc-tag tag-${course.category}`}>{CATEGORY_LABELS[course.category]}</span>
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.06em] uppercase text-[var(--lunar-5)]">
            · {LEVEL_LABELS[course.level]}
          </span>
          <span className="ml-auto font-[var(--font-mono)] text-[11px] text-[var(--lunar-5)]">
            {course.language === 'es' ? '🇦🇷 ES' : '🇺🇸 EN'}
          </span>
        </div>

        <h3 className="font-[var(--font-display)] font-semibold text-[19px] tracking-[-0.01em] text-[var(--fg)] leading-snug">
          {course.title}
        </h3>

        <p className="text-[13px] text-[var(--lunar-4)] leading-relaxed line-clamp-2">
          {course.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-1.5">
          <span className="text-xs text-[var(--lunar-5)]">{course.platform}</span>
          <span className="text-[13px] font-medium text-[var(--signal-300)] flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
            Ver curso →
          </span>
        </div>
      </div>
    </Link>
  )
}
