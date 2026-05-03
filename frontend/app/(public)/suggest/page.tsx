'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { createSubmissionRequest, resetSubmissionStatus } from '@/store/slices/submissionsSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const CATEGORIES = [
  { value: 'use_ai', label: 'Usar IA' }, { value: 'code_with_ai', label: 'Programar con IA' },
  { value: 'ml_fundamentals', label: 'Fundamentos de ML' }, { value: 'deep_learning', label: 'Deep Learning' },
  { value: 'data_science', label: 'Data Science' }, { value: 'ai_tools', label: 'Herramientas de IA' },
  { value: 'agents', label: 'Agentes' }, { value: 'ethics_ai', label: 'Ética en IA' },
]

const selectClass = 'w-full px-3.5 py-2.5 text-sm rounded-lg bg-[var(--space-2)] border border-[var(--border)] text-[var(--fg)] outline-none focus:border-[var(--signal-400)] cursor-pointer'

export default function SuggestPage() {
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((s: RootState) => s.submissions)
  const [form, setForm] = useState({ title: '', platform: '', url: '', description: '', language: 'es', level: 'beginner', category: 'use_ai' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (success) { dispatch(resetSubmissionStatus()); setSubmitted(true) }
  }, [success])

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(createSubmissionRequest(form))
  }

  if (submitted) {
    return (
      <div className="max-w-[620px] mx-auto px-8 py-12 text-center">
        <div className="eyebrow mb-3.5">Gracias</div>
        <h1 className="font-[var(--font-display)] text-[32px] font-semibold tracking-[-0.02em] text-[var(--lunar-0)] mb-2">
          Sugerencia enviada
        </h1>
        <p className="text-[var(--lunar-4)] text-[15px] mb-8">
          Lo revisamos y si cumple los criterios lo publicamos en el directorio.
        </p>
        <button onClick={() => { setSubmitted(false); setForm({ title: '', platform: '', url: '', description: '', language: 'es', level: 'beginner', category: 'use_ai' }) }} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, background: 'var(--signal-400)', color: '#06142B', border: 0, cursor: 'pointer' }}>
          Agregar otro
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-[620px] mx-auto px-8 py-12">
      <div className="eyebrow mb-3.5">Nueva sugerencia</div>
      <h1 className="font-[var(--font-display)] text-[32px] font-semibold tracking-[-0.02em] text-[var(--lunar-0)] mb-2">
        Sugerí un curso
      </h1>
      <p className="text-[var(--lunar-4)] text-[15px] mb-8">
        Compartí un recurso gratuito de IA con la comunidad. Lo revisamos y lo publicamos.
      </p>

      {error && (
        <div className="px-3.5 py-2.5 rounded-lg text-sm mb-5 bg-[rgba(226,85,85,0.12)] border border-[rgba(226,85,85,0.3)] text-[#F2867D]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Título del curso <span className="text-[var(--signal-400)]">*</span></Label>
          <Input id="title" value={form.title} onChange={set('title')} required placeholder="Ej: ChatGPT para principiantes" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="platform">Plataforma <span className="text-[var(--signal-400)]">*</span></Label>
            <Input id="platform" value={form.platform} onChange={set('platform')} required placeholder="YouTube, Coursera..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="url">URL <span className="text-[var(--signal-400)]">*</span></Label>
            <Input id="url" type="url" value={form.url} onChange={set('url')} required placeholder="https://..." />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">Descripción breve <span className="text-[var(--signal-400)]">*</span></Label>
            <span className="text-[11px] font-[var(--font-mono)] text-[var(--lunar-5)]">{form.description.length}/200</span>
          </div>
          <Textarea id="description" value={form.description} onChange={set('description')} required maxLength={200} placeholder="¿De qué trata el curso?" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Idioma <span className="text-[var(--signal-400)]">*</span></Label>
            <select value={form.language} onChange={set('language')} className={selectClass} required>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Nivel <span className="text-[var(--signal-400)]">*</span></Label>
            <select value={form.level} onChange={set('level')} className={selectClass} required>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Categoría <span className="text-[var(--signal-400)]">*</span></Label>
            <select value={form.category} onChange={set('category')} className={selectClass} required>
              {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
        </div>

        <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
          {loading ? 'Enviando...' : 'Enviar sugerencia'}
        </Button>
      </form>
    </div>
  )
}
