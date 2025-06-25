import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gradesApi, studentsApi, subjectsApi } from '../services/api';
import type { Grade, Student, Subject, GradeFilters } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

const GradesList: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<GradeFilters>({});

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [gradesRes, studentsRes, subjectsRes] = await Promise.all([
        gradesApi.getAll(filters),
        studentsApi.getAll(),
        subjectsApi.getAll()
      ]);

      setGrades(gradesRes.data);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof GradeFilters, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : 'N/A';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'N/A';
  };

  const calculatePercentage = (score: number, maxScore: number) => {
    return ((score / maxScore) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Calificaciones</h1>
            <Link to="/grades/new">
              <Button>Nueva Calificación</Button>
            </Link>
          </div>

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estudiante
                </label>
                <select
                  value={filters.student_id || ''}
                  onChange={(e) => handleFilterChange('student_id', Number(e.target.value) || undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Todos los estudiantes</option>
                  {students.length === 0 ? (
                    <option disabled value="">No hay estudiantes</option>
                  ) : (
                    students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} - {student.dni}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Materia
                </label>
                <select
                  value={filters.subject_id || ''}
                  onChange={(e) => handleFilterChange('subject_id', e.target.value || undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Todas las materias</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calificación mínima
                </label>
                <Input
                  type="number"
                  value={filters.score_min || ''}
                  onChange={(e) => handleFilterChange('score_min', Number(e.target.value) || undefined)}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calificación máxima
                </label>
                <Input
                  type="number"
                  value={filters.score_max || ''}
                  onChange={(e) => handleFilterChange('score_max', Number(e.target.value) || undefined)}
                  placeholder="20"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="secondary" onClick={clearFilters}>
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Tabla de calificaciones */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Lista de Calificaciones ({grades.length})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estudiante
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Materia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calificación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Porcentaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grades.map((grade) => (
                    <tr key={grade.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {getStudentName(grade.student_id)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getSubjectName(grade.subject_id)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {grade.score} / {grade.max_score}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {calculatePercentage(grade.score, grade.max_score)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {grade.date ? new Date(grade.date).toLocaleDateString() : 'Sin fecha'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/grades/student/${grade.student_id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Ver Estudiante
                        </Link>
                        <Link
                          to={`/grades/subject/${grade.subject_id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Ver Materia
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradesList; 