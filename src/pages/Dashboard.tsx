import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentsApi, subjectsApi, gradesApi } from '../services/api';
import type { Student, Subject, Grade } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DashboardStats {
  totalStudents: number;
  totalSubjects: number;
  totalGrades: number;
  averageGrade: number;
  topStudents: { student: Student; average: number }[];
  topSubjects: { subject: Subject; average: number }[];
  gradeDistribution: {
    excellent: number;
    good: number;
    average: number;
    below: number;
    failing: number;
  };
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [studentsRes, subjectsRes, gradesRes] = await Promise.all([
        studentsApi.getAll(),
        subjectsApi.getAll(),
        gradesApi.getAll()
      ]);

      calculateStats(studentsRes.data, subjectsRes.data, gradesRes.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (studentsData: Student[], subjectsData: Subject[], gradesData: Grade[]) => {
    const totalStudents = studentsData.length;
    const totalSubjects = subjectsData.length;
    const totalGrades = gradesData.length;

    const averageGrade = totalGrades > 0 
      ? gradesData.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) / totalGrades
      : 0;

    const studentAverages = studentsData.map(student => {
      const studentGrades = gradesData.filter(g => g.student_id === student.id);
      const average = studentGrades.length > 0
        ? studentGrades.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) / studentGrades.length
        : 0;
      return { student, average };
    }).filter(s => s.average > 0)
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);

    // Calcular top materias
    const subjectAverages = subjectsData.map(subject => {
      const subjectGrades = gradesData.filter(g => g.subject_id === subject.id);
      const average = subjectGrades.length > 0
        ? subjectGrades.reduce((sum, g) => sum + (g.score / g.max_score) * 100, 0) / subjectGrades.length
        : 0;
      return { subject, average };
    }).filter(s => s.average > 0)
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);

    // Distribución de calificaciones
    const gradeDistribution = {
      excellent: gradesData.filter(g => (g.score / g.max_score) * 100 >= 90).length,
      good: gradesData.filter(g => {
        const p = (g.score / g.max_score) * 100;
        return p >= 80 && p < 90;
      }).length,
      average: gradesData.filter(g => {
        const p = (g.score / g.max_score) * 100;
        return p >= 70 && p < 80;
      }).length,
      below: gradesData.filter(g => {
        const p = (g.score / g.max_score) * 100;
        return p >= 60 && p < 70;
      }).length,
      failing: gradesData.filter(g => (g.score / g.max_score) * 100 < 60).length,
    };

    setStats({
      totalStudents,
      totalSubjects,
      totalGrades,
      averageGrade,
      topStudents: studentAverages,
      topSubjects: subjectAverages,
      gradeDistribution
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Calificaciones</h1>
            <p className="mt-2 text-gray-600">Vista general del sistema académico</p>
          </div>

          {/* Estadísticas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total de Estudiantes</h3>
              <p className="text-3xl font-bold text-blue-600">{stats?.totalStudents || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total de Materias</h3>
              <p className="text-3xl font-bold text-green-600">{stats?.totalSubjects || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total de Calificaciones</h3>
              <p className="text-3xl font-bold text-purple-600">{stats?.totalGrades || 0}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Promedio General</h3>
              <p className="text-3xl font-bold text-orange-600">
                {stats?.averageGrade ? stats.averageGrade.toFixed(1) : '0'}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico Épico de Distribución de Calificaciones */}
            <div className="bg-white p-6 rounded-lg shadow col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Análisis de Calificaciones</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Gráfico de Dona - Distribución por Rangos */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Distribución por Rangos</h3>
                  <div className="relative h-64">
                    <Doughnut
                      data={{
                        labels: ['Excelente (90-100%)', 'Bueno (80-89%)', 'Promedio (70-79%)', 'Regular (60-69%)', 'Reprobado (<60%)'],
                        datasets: [{
                          data: [
                            stats?.gradeDistribution.excellent || 0,
                            stats?.gradeDistribution.good || 0,
                            stats?.gradeDistribution.average || 0,
                            stats?.gradeDistribution.below || 0,
                            stats?.gradeDistribution.failing || 0
                          ],
                          backgroundColor: [
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(107, 114, 128, 0.8)'
                          ],
                          borderColor: [
                            'rgb(34, 197, 94)',
                            'rgb(59, 130, 246)',
                            'rgb(245, 158, 11)',
                            'rgb(239, 68, 68)',
                            'rgb(107, 114, 128)'
                          ],
                          borderWidth: 2,
                          hoverOffset: 4
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              padding: 20,
                              usePointStyle: true,
                              font: {
                                size: 11
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Gráfico de Barras - Top Estudiantes */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Top Estudiantes</h3>
                  <div className="relative h-64">
                    <Bar
                      data={{
                        labels: stats?.topStudents.slice(0, 5).map(s => `${s.student.first_name} ${s.student.last_name}`) || [],
                        datasets: [{
                          label: 'Promedio (%)',
                          data: stats?.topStudents.slice(0, 5).map(s => s.average) || [],
                          backgroundColor: 'rgba(34, 197, 94, 0.8)',
                          borderColor: 'rgb(34, 197, 94)',
                          borderWidth: 2,
                          borderRadius: 8,
                          borderSkipped: false,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.1)'
                            }
                          },
                          x: {
                            grid: {
                              display: false
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Gráfico de Líneas - Top Materias */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Top Materias</h3>
                  <div className="relative h-64">
                    <Line
                      data={{
                        labels: stats?.topSubjects.slice(0, 5).map(s => s.subject.name) || [],
                        datasets: [{
                          label: 'Promedio (%)',
                          data: stats?.topSubjects.slice(0, 5).map(s => s.average) || [],
                          borderColor: 'rgb(147, 51, 234)',
                          backgroundColor: 'rgba(147, 51, 234, 0.1)',
                          borderWidth: 3,
                          fill: true,
                          tension: 0.4,
                          pointBackgroundColor: 'rgb(147, 51, 234)',
                          pointBorderColor: '#fff',
                          pointBorderWidth: 2,
                          pointRadius: 6,
                          pointHoverRadius: 8
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                              color: 'rgba(0, 0, 0, 0.1)'
                            }
                          },
                          x: {
                            grid: {
                              display: false
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Estadísticas Detalladas */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">{stats?.gradeDistribution.excellent || 0}</div>
                  <div className="text-sm text-green-700">Excelente</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg">
                  <div className="text-2xl font-bold text-blue-800">{stats?.gradeDistribution.good || 0}</div>
                  <div className="text-sm text-blue-700">Bueno</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-800">{stats?.gradeDistribution.average || 0}</div>
                  <div className="text-sm text-yellow-700">Promedio</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-red-100 to-red-200 rounded-lg">
                  <div className="text-2xl font-bold text-red-800">{stats?.gradeDistribution.below || 0}</div>
                  <div className="text-sm text-red-700">Regular</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg">
                  <div className="text-2xl font-bold text-gray-800">{stats?.gradeDistribution.failing || 0}</div>
                  <div className="text-sm text-gray-700">Reprobado</div>
                </div>
              </div>
            </div>

            {/* Top Estudiantes */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Estudiantes</h2>
              {stats?.topStudents && stats.topStudents.length > 0 ? (
                <div className="space-y-3">
                  {stats.topStudents.map((item, index) => (
                    <div key={item.student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-500 mr-3">#{index + 1}</span>
                        <div>
                          <div className="font-medium text-gray-900">{item.student.first_name} {item.student.last_name}</div>
                          <div className="text-sm text-gray-500">{item.student.dni}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{item.average.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No hay calificaciones registradas
                </div>
              )}
            </div>

            {/* Top Materias */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Materias</h2>
              {stats?.topSubjects && stats.topSubjects.length > 0 ? (
                <div className="space-y-3">
                  {stats.topSubjects.map((item, index) => (
                    <div key={item.subject.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-500 mr-3">#{index + 1}</span>
                        <div>
                          <div className="font-medium text-gray-900">{item.subject.name}</div>
                          <div className="text-sm text-gray-500">{item.subject.code}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{item.average.toFixed(1)}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No hay calificaciones registradas
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 