export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dni: string;
  phone: string;
  birth_date: string;
  admission_date: string;
  profile_photo_key: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  description: string;
  location: string;
  max_students: number;
}

export interface Grade {
  id: number;
  student_id: number;
  subject_id: number;
  score: number;
  max_score: number;
  comments: string;
  date: string;
}
export interface Enrollment {
  id: number;
  student_id: number;
  subject_id: number;
  enrollment_date: string;
}

export interface GradeFormData {
  student_id: number;
  subject_id: number;
  score: number;
  max_score: number;
  comments: string;
}

export interface GradeFilters {
  student_id?: number;
  subject_id?: number;
  date_from?: string;
  date_to?: string;
  score_min?: number;
  score_max?: number;
}

export interface GradeStatistics {
  total_grades: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  grade_distribution: {
    range_0_10: number;
    range_11_15: number;
    range_16_20: number;
  };
}

export interface StudentReport {
  student: Student;
  grades: Grade[];
  average_score: number;
  total_subjects: number;
}

export interface SubjectReport {
  subject: Subject;
  grades: Grade[];
  average_score: number;
  total_students: number;
  highest_score: number;
  lowest_score: number;
} 