import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { studentsApi, subjectsApi, gradesApi } from '../services/api';
import type { Student, Subject, Grade } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

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