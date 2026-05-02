export interface Course {
  id: number
  title: string
  platform: string
  url: string
  description: string
  language: 'es' | 'en'
  level: 'beginner' | 'intermediate' | 'advanced'
  category: CourseCategory
  duration_hours: number | null
  source: 'admin' | 'community'
  is_active: boolean
  created_at: string
}

export type CourseCategory =
  | 'use_ai'
  | 'code_with_ai'
  | 'ml_fundamentals'
  | 'deep_learning'
  | 'data_science'
  | 'ai_tools'
  | 'agents'
  | 'ethics_ai'

export interface FilterOption {
  value: string
  label: string
}

export interface FiltersData {
  languages: FilterOption[]
  levels: FilterOption[]
  categories: FilterOption[]
}

export interface CourseFilters {
  language?: string
  level?: string
  category?: string
  search?: string
  ordering?: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Submission {
  id: number
  title: string
  platform: string
  url: string
  description: string
  language: string
  level: string
  category: string
  source?: 'admin' | 'community' | 'scraper'
  status: 'pending' | 'approved' | 'rejected'
  submitted_at: string
}

