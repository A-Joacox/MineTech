import axios from 'axios';
import type { Student, Subject, Grade, Enrollment, GradeFormData } from '../types';

const API_BASE_URL = 'http://pc2-matricula-alb-2123051620.us-east-1.elb.amazonaws.com/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  return config;
});

export default api;

export const authApi = {
  validateApiKey: async (apiKey: string): Promise<boolean> => {
    try {
      const response = await api.get('/students/', {
        headers: { 'x-api-key': apiKey }
      });
      return response.status === 200;
    } catch {
      return false;
    }
  },
};
export const studentsApi = {
  getAll: () => api.get<Student[]>('/students/'),
  getById: (id: number) => api.get<Student>(`/students/${id}/`),
  getGrades: (id: number) => api.get<Grade[]>(`/students/${id}/grades/`),
};

export const subjectsApi = {
  getAll: () => api.get<Subject[]>('/subjects/'),
};

export const gradesApi = {
  getAll: (params?: { student_id?: number; subject_id?: number }) => 
    api.get<Grade[]>('/grades/', { params }),
  create: (data: Omit<Grade, 'id' | 'date'>) => api.post<Grade>('/grades/', data),
};

//  matriculas
export const enrollmentsApi = {
  getByStudent: (studentId: number) => 
    api.get<Enrollment[]>(`/enrollments/?student_id=${studentId}`),
  getBySubject: (subjectId: number) => 
    api.get<Enrollment[]>(`/enrollments/?subject_id=${subjectId}`),
}; 