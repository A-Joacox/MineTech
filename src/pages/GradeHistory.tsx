import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gradesApi, studentsApi, subjectsApi } from '../services/api';
import type { Grade, Student, Subject, GradeFilters } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

const GradeHistory: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<GradeFilters>({});
  const [sortBy, setSortBy] = useState<'date' | 'student' | 'subject' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

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
    return student ? `${student.first_name} ${student.last_name}` : 'No encontrado';
  };

  const getSubjectName = (subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'No encontrado';
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const sortGrades = (gradesToSort: Grade[]) => {
    return [...gradesToSort].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'student':
          comparison = getStudentName(a.student_id).localeCompare(getStudentName(b.student_id));
          break;
        case 'subject':
          comparison = getSubjectName(a.subject_id).localeCompare(getSubjectName(b.subject_id));
          break;
        case 'score':
          const aPercentage = (a.score / a.max_score) * 100;
          const bPercentage = (b.score / b.max_score) * 100;
          comparison = aPercentage - bPercentage;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const handleSort = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
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

  const sortedGrades = sortGrades(grades);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Historial de Calificaciones</h1>
            <Link to="/grades">
              <Button variant="secondary">Volver a Calificaciones</Button>
            </Link>
          </div>

          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtros Avanzados</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estudiante
                </label>
                <select
                  value={filters.student_id || ''}
                  onChange={(e) => handleFilterChange('student_id', e.target.value || undefined)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Todos los estudiantes</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
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

          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total de Registros</h3>
              <p className="text-3xl font-bold text-blue-600">{sortedGrades.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Promedio General</h3>
              <p className="text-3xl font-bold text-green-600">
                {sortedGrades.length > 0 
                  ? (sortedGrades.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) / sortedGrades.length).toFixed(1)
                  : '0'
                }%
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Mejor Calificación</h3>
              <p className="text-3xl font-bold text-purple-600">
                {sortedGrades.length > 0 
                  ? Math.max(...sortedGrades.map(g => (g.score / g.max_score) * 100)).toFixed(1) + '%'
                  : 'N/A'
                }
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Peor Calificación</h3>
              <p className="text-3xl font-bold text-red-600">
                {sortedGrades.length > 0 
                  ? Math.min(...sortedGrades.map(g => (g.score / g.max_score) * 100)).toFixed(1) + '%'
                  : 'N/A'
                }
              </p>
            </div>
          </div>

          
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Historial Completo ({sortedGrades.length} registros)
              </h3>
            </div>
            {sortedGrades.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                No hay calificaciones que coincidan con los filtros aplicados.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('date')}
                      >
                        Fecha {getSortIcon('date')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('student')}
                      >
                        Estudiante {getSortIcon('student')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('subject')}
                      >
                        Materia {getSortIcon('subject')}
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort('score')}
                      >
                        Calificación {getSortIcon('score')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Porcentaje
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comentarios
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedGrades.map((grade) => {
                      const percentage = (grade.score / grade.max_score) * 100;
                      return (
                        <tr key={grade.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(grade.created_at).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {getStudentName(grade.student_id)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {getSubjectName(grade.subject_id)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {grade.score} / {grade.max_score}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${getGradeColor(percentage)}`}>
                              {percentage.toFixed(1)}%
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {grade.comments || 'Sin comentarios'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link
                                to={`/grades/student/${grade.student_id}`}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Estudiante
                              </Link>
                              <Link
                                to={`/grades/subject/${grade.subject_id}`}
                                className="text-green-600 hover:text-green-900"
                              >
                                Materia
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeHistory; 