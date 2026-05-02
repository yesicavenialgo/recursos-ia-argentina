import { render, screen } from '@testing-library/react'
import CourseCard from '../CourseCard'
import type { Course } from '@/lib/types'

jest.mock('next/link', () => ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a href={href}>{children}</a>
))

const mockCourse: Course = {
  id: 1,
  title: 'Intro a Machine Learning',
  platform: 'Kaggle',
  url: 'https://kaggle.com/intro-ml',
  description: 'Curso de ML para principiantes',
  language: 'es',
  level: 'beginner',
  category: 'ml_fundamentals',
  duration_hours: null,
  source: 'admin',
  is_active: true,
  created_at: '2024-01-01T00:00:00Z',
}

describe('CourseCard', () => {
  it('muestra el título del curso', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('Intro a Machine Learning')).toBeInTheDocument()
  })

  it('muestra la plataforma', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('Kaggle')).toBeInTheDocument()
  })

  it('muestra la categoría traducida', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('ML')).toBeInTheDocument()
  })

  it('muestra el nivel traducido', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText(/Principiante/)).toBeInTheDocument()
  })

  it('linkea al detalle del curso', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/courses/1')
  })

  it('muestra el idioma en inglés correctamente', () => {
    render(<CourseCard course={{ ...mockCourse, language: 'en' }} />)
    expect(screen.getByText(/EN/)).toBeInTheDocument()
  })
})
