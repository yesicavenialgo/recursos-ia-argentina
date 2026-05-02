import axios from 'axios'
import type { Course, FiltersData, CourseFilters, PaginatedResponse, Submission } from './types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const tokens = localStorage.getItem('admin_tokens')
    if (tokens) {
      const { access } = JSON.parse(tokens)
      config.headers.Authorization = `Bearer ${access}`
    }
  }
  return config
})

// Courses
export const fetchCourses = (filters: CourseFilters = {}): Promise<PaginatedResponse<Course>> =>
  api.get('/api/courses/', { params: filters }).then((r) => r.data)

export const fetchCourse = (id: number): Promise<Course> =>
  api.get(`/api/courses/${id}/`).then((r) => r.data)

export const fetchFilters = (): Promise<FiltersData> =>
  api.get('/api/courses/filters/').then((r) => r.data)

// Submissions
export const createSubmission = (data: Omit<Submission, 'id' | 'status' | 'submitted_at'>): Promise<Submission> =>
  api.post('/api/submissions/', data).then((r) => r.data)

export default api
