'use client'
import type { Course } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const CATEGORIES = [
  { value: 'use_ai', label: 'Usar IA' }, { value: 'code_with_ai', label: 'Programar con IA' },
  { value: 'ml_fundamentals', label: 'Fundamentos de ML' }, { value: 'deep_learning', label: 'Deep Learning' },
  { value: 'data_science', label: 'Data Science' }, { value: 'ai_tools', label: 'Herramientas de IA' },
  { value: 'agents', label: 'Agentes' }, { value: 'ethics_ai', label: 'Ética en IA' },
]

interface Props {
  initial?: Partial<Course>
  onSubmit: (data: Partial<Course>) => void
  loading: boolean
  submitLabel: string
}

export default function CourseForm({ initial = {}, onSubmit, loading, submitLabel }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit({
      title: fd.get('title') as string,
      platform: fd.get('platform') as string,
      url: fd.get('url') as string,
      description: fd.get('description') as string,
      language: fd.get('language') as 'es' | 'en',
      level: fd.get('level') as 'beginner' | 'intermediate' | 'advanced',
      category: fd.get('category') as Course['category'],
      duration_hours: fd.get('duration_hours') ? Number(fd.get('duration_hours')) : null,
      is_active: fd.get('is_active') === 'true',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" defaultValue={initial.title} required placeholder="Nombre del curso" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="platform">Plataforma</Label>
          <Input id="platform" name="platform" defaultValue={initial.platform} required placeholder="YouTube, Coursera..." />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" type="url" defaultValue={initial.url} required placeholder="https://..." />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" defaultValue={initial.description} required maxLength={500} placeholder="¿De qué trata el curso?" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Idioma</Label>
          <select name="language" defaultValue={initial.language ?? 'es'}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[var(--space-2)] border border-[var(--border)] text-[var(--fg)] outline-none focus:border-[var(--signal-400)] cursor-pointer">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Nivel</Label>
          <select name="level" defaultValue={initial.level ?? 'beginner'}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[var(--space-2)] border border-[var(--border)] text-[var(--fg)] outline-none focus:border-[var(--signal-400)] cursor-pointer">
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Estado</Label>
          <select name="is_active" defaultValue={String(initial.is_active ?? true)}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[var(--space-2)] border border-[var(--border)] text-[var(--fg)] outline-none focus:border-[var(--signal-400)] cursor-pointer">
            <option value="true">Activo</option>
            <option value="false">Oculto</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="duration">Duración (hs)</Label>
          <Input id="duration" name="duration_hours" type="number" step="0.5" defaultValue={initial.duration_hours ?? ''} placeholder="Opcional" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Categoría</Label>
        <select name="category" defaultValue={initial.category ?? 'use_ai'}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[var(--space-2)] border border-[var(--border)] text-[var(--fg)] outline-none focus:border-[var(--signal-400)] cursor-pointer">
          {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="mt-2">
        {loading ? 'Guardando...' : submitLabel}
      </Button>
    </form>
  )
}
