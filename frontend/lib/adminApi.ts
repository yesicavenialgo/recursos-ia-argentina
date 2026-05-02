import axios from 'axios'
import type { Course, Submission } from './types'

const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
})

adminApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const tokens = localStorage.getItem('admin_tokens')
    if (tokens) {
      const { access } = JSON.parse(tokens)
      config.headers.Authorization = `Bearer ${access}`
    }
  }
  return config
})

export const adminLogin = (email: string, password: string) =>
  adminApi.post('/api/admin/auth/login/', { email, password }).then((r) => r.data)

export const fetchAdminCourses = (): Promise<Course[]> =>
  adminApi.get('/api/admin/courses/').then((r) => r.data.results ?? r.data)

export const createCourse = (data: Partial<Course>): Promise<Course> =>
  adminApi.post('/api/admin/courses/', data).then((r) => r.data)

export const updateCourse = (id: number, data: Partial<Course>): Promise<Course> =>
  adminApi.put(`/api/admin/courses/${id}/`, data).then((r) => r.data)

export const deleteCourse = (id: number): Promise<void> =>
  adminApi.delete(`/api/admin/courses/${id}/`).then(() => undefined)

export const fetchAdminSubmissions = (): Promise<Submission[]> =>
  adminApi.get('/api/admin/submissions/').then((r) => r.data.results ?? r.data)

export const approveSubmission = (id: number): Promise<void> =>
  adminApi.post(`/api/admin/submissions/${id}/approve/`).then(() => undefined)

export const rejectSubmission = (id: number): Promise<void> =>
  adminApi.post(`/api/admin/submissions/${id}/reject/`).then(() => undefined)
