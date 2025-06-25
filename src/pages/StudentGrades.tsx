import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studentsApi, subjectsApi } from '../services/api';
import type { Student, Grade, Subject } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const StudentGrades: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadStudentData(Number(id));
    }
  }, [id]);

  const loadStudentData = async (studentId: number) => {
    try {
      setLoading(true);
      const [studentRes, gradesRes, subjectsRes] = await Promise.all([
        studentsApi.getById(studentId),
        studentsApi.getGrades(studentId),
        subjectsApi.getAll()
      ]);
      setStudent(studentRes.data);
      setGrades(gradesRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectName = (subjectId: number) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'N/A';
  };

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + (grade.score / grade.max_score) * 100, 0);
    return (total / grades.length).toFixed(1);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
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

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Estudiante no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Calificaciones de {student.first_name} {student.last_name}
                </h1>
                <p className="mt-2 text-gray-600">
                  ID: {student.id} | Email: {student.email}
                </p>
              </div>
              <Link to="/grades">
                <Button variant="secondary">Volver a Calificaciones</Button>
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total de Calificaciones</h3>
              <p className="text-3xl font-bold text-blue-600">{grades.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Promedio General</h3>
              <p className="text-3xl font-bold text-green-600">{calculateAverage()}%</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Mejor Calificación</h3>
              <p className="text-3xl font-bold text-purple-600">
                {grades.length > 0 
                  ? Math.max(...grades.map(g => (g.score / g.max_score) * 100)).toFixed(1) + '%'
                  : 'N/A'
                }
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Peor Calificación</h3>
              <p className="text-3xl font-bold text-red-600">
                {grades.length > 0 
                  ? Math.min(...grades.map(g => (g.score / g.max_score) * 100)).toFixed(1) + '%'
                  : 'N/A'
                }
              </p>
            </div>
          </div>

          {/* Grades Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Historial de Calificaciones
              </h3>
            </div>
            {grades.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                No hay calificaciones registradas para este estudiante.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
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
                        Comentarios
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grades.map((grade) => {
                      const percentage = (grade.score / grade.max_score) * 100;
                      return (
                        <tr key={grade.id}>
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {grade.date ? new Date(grade.date).toLocaleDateString() : 'Sin fecha'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {grade.comments || 'Sin comentarios'}
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

          {/* Grade Distribution Chart */}
          {grades.length > 0 && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución de Calificaciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {grades.filter(g => (g.score / g.max_score) * 100 < 60).length}
                  </div>
                  <div className="text-sm text-gray-600">Menos de 60%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {grades.filter(g => {
                      const p = (g.score / g.max_score) * 100;
                      return p >= 60 && p < 80;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">60% - 79%</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {grades.filter(g => (g.score / g.max_score) * 100 >= 80).length}
                  </div>
                  <div className="text-sm text-gray-600">80% o más</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentGrades; 