import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentsApi, subjectsApi, gradesApi } from '../services/api';
import type { Student, Subject, Grade, StudentReport, SubjectReport } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const Reports: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<'overview' | 'students' | 'subjects'>('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [studentsRes, subjectsRes, gradesRes] = await Promise.all([
        studentsApi.getAll(),
        subjectsApi.getAll(),
        gradesApi.getAll()
      ]);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
      setGrades(gradesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallStats = () => {
    if (grades.length === 0) return { total: 0, average: 0, highest: 0, lowest: 0 };
    
    const percentages = grades.map(g => (g.score / g.max_score) * 100);
    const total = grades.length;
    const average = percentages.reduce((sum, p) => sum + p, 0) / total;
    const highest = Math.max(...percentages);
    const lowest = Math.min(...percentages);
    
    return { total, average: average.toFixed(1), highest: highest.toFixed(1), lowest: lowest.toFixed(1) };
  };

  const getGradeDistribution = () => {
    const distribution = {
      excellent: grades.filter(g => (g.score / g.max_score) * 100 >= 90).length,
      good: grades.filter(g => {
        const p = (g.score / g.max_score) * 100;
        return p >= 80 && p < 90;
      }).length,
      average: grades.filter(g => {
        const p = (g.score / g.max_score) * 100;
        return p >= 70 && p < 80;
      }).length,
      below: grades.filter(g => {
        const p = (g.score / g.max_score) * 100;
        return p >= 60 && p < 70;
      }).length,
      failing: grades.filter(g => (g.score / g.max_score) * 100 < 60).length,
    };
    return distribution;
  };

  const generateStudentReports = (): StudentReport[] => {
    const studentReports: StudentReport[] = [];
    
    students.forEach(student => {
      const studentGrades = grades.filter(g => g.student_id === student.id);
      if (studentGrades.length > 0) {
        const average = studentGrades.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) / studentGrades.length;
        studentReports.push({
          student,
          grades: studentGrades,
          average_score: average,
          total_subjects: new Set(studentGrades.map(g => g.subject_id)).size
        });
      }
    });
    
    return studentReports.sort((a, b) => b.average_score - a.average_score);
  };

  const generateSubjectReports = (): SubjectReport[] => {
    const subjectReports: SubjectReport[] = [];
    
    subjects.forEach(subject => {
      const subjectGrades = grades.filter(g => g.subject_id === subject.id);
      if (subjectGrades.length > 0) {
        const percentages = subjectGrades.map(g => (g.score / g.max_score) * 100);
        const average = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
        const highest = Math.max(...percentages);
        const lowest = Math.min(...percentages);
        
        subjectReports.push({
          subject,
          grades: subjectGrades,
          average_score: average,
          total_students: new Set(subjectGrades.map(g => g.student_id)).size,
          highest_score: highest,
          lowest_score: lowest
        });
      }
    });
    
    return subjectReports.sort((a, b) => b.average_score - a.average_score);
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

  const stats = calculateOverallStats();
  const distribution = getGradeDistribution();
  const studentReports = generateStudentReports();
  const subjectReports = generateSubjectReports();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Reportes Académicos</h1>
            <p className="mt-2 text-gray-600">Análisis completo del rendimiento académico</p>
          </div>

          {/* Report Navigation */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <Button
                variant={selectedReport === 'overview' ? 'primary' : 'secondary'}
                onClick={() => setSelectedReport('overview')}
              >
                Vista General
              </Button>
              <Button
                variant={selectedReport === 'students' ? 'primary' : 'secondary'}
                onClick={() => setSelectedReport('students')}
              >
                Reporte por Estudiantes
              </Button>
              <Button
                variant={selectedReport === 'subjects' ? 'primary' : 'secondary'}
                onClick={() => setSelectedReport('subjects')}
              >
                Reporte por Materias
              </Button>
            </div>
          </div>

          {selectedReport === 'overview' && (
            <div className="space-y-6">
              {/* Overall Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900">Total de Calificaciones</h3>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900">Promedio General</h3>
                  <p className="text-3xl font-bold text-green-600">{stats.average}%</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900">Mejor Calificación</h3>
                  <p className="text-3xl font-bold text-purple-600">{stats.highest}%</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900">Peor Calificación</h3>
                  <p className="text-3xl font-bold text-red-600">{stats.lowest}%</p>
                </div>
              </div>

              {/* Grade Distribution */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución de Calificaciones</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{distribution.failing}</div>
                    <div className="text-sm text-gray-600">Menos de 60%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{distribution.below}</div>
                    <div className="text-sm text-gray-600">60% - 69%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{distribution.average}</div>
                    <div className="text-sm text-gray-600">70% - 79%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{distribution.good}</div>
                    <div className="text-sm text-gray-600">80% - 89%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{distribution.excellent}</div>
                    <div className="text-sm text-gray-600">90% o más</div>
                  </div>
                </div>
              </div>

              {/* Top Students */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Estudiantes</h3>
                <div className="space-y-3">
                  {studentReports.slice(0, 5).map((report, index) => (
                    <div key={report.student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-500 mr-3">#{index + 1}</span>
                        <div>
                          <div className="font-medium text-gray-900">{report.student.first_name} {report.student.last_name}</div>
                          <div className="text-sm text-gray-500">{report.student.dni}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{report.average_score.toFixed(1)}%</div>
                        <div className="text-sm text-gray-500">{report.total_subjects} materias</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'students' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Ranking de Estudiantes
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posición
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estudiante
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Promedio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Materias
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calificaciones
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentReports.map((report, index) => (
                      <tr key={report.student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">#{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {report.student.first_name} {report.student.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.student.dni}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-bold ${
                            report.average_score >= 80 ? 'text-green-600' :
                            report.average_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {report.average_score.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.total_subjects}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.grades.length}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/grades/student/${report.student.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver Detalles
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedReport === 'subjects' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Rendimiento por Materias
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Materia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Promedio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estudiantes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Calificaciones
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mejor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Peor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {subjectReports.map((report) => (
                      <tr key={report.subject.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {report.subject.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.subject.code} - {report.subject.credits} créditos
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-bold ${
                            report.average_score >= 80 ? 'text-green-600' :
                            report.average_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {report.average_score.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.total_students}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {report.grades.length}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-green-600">
                            {report.highest_score.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-red-600">
                            {report.lowest_score.toFixed(1)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/grades/subject/${report.subject.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver Detalles
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports; 