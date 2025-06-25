import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsApi, subjectsApi, enrollmentsApi, gradesApi } from '../services/api';
import type { Student, Subject, Enrollment, GradeFormData } from '../types';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

const GradeForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrolledSubjects, setEnrolledSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<GradeFormData>({
    student_id: '',
    subject_id: '',
    score: 0,
    max_score: 20,
    comments: ''
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (formData.student_id) {
      loadEnrolledSubjects(formData.student_id);
    }
  }, [formData.student_id]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [studentsRes, subjectsRes] = await Promise.all([
        studentsApi.getAll(),
        subjectsApi.getAll()
      ]);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledSubjects = async (studentId: string) => {
    try {
      const response = await enrollmentsApi.getByStudent(studentId);
      const enrollments: Enrollment[] = response.data;
      const enrolledSubjectIds = enrollments.map(e => e.subject_id);
      const enrolled = subjects.filter(s => enrolledSubjectIds.includes(s.id));
      setEnrolledSubjects(enrolled);
    } catch (error) {
      console.error('Error loading enrolled subjects:', error);
    }
  };

  const handleInputChange = (field: keyof GradeFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.student_id;
      case 2:
        return !!formData.subject_id;
      case 3:
        return formData.score >= 0 && formData.score <= formData.max_score && formData.max_score > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      setSubmitting(true);
      await gradesApi.create(formData);
      navigate('/grades');
    } catch (error) {
      console.error('Error creating grade:', error);
      alert('Error al registrar la calificación');
    } finally {
      setSubmitting(false);
    }
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.first_name} ${student.last_name}` : 'N/A';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'N/A';
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
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nueva Calificación</h1>
            <p className="mt-2 text-gray-600">Registra una nueva calificación paso a paso</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Estudiante</span>
              <span>Materia</span>
              <span>Calificación</span>
              <span>Confirmar</span>
            </div>
          </div>

          
          <div className="bg-white p-6 rounded-lg shadow">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Paso 1: Seleccionar Estudiante</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estudiante
                  </label>
                  <select
                    value={formData.student_id}
                    onChange={(e) => handleInputChange('student_id', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Selecciona un estudiante</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.first_name} {student.last_name} - {student.dni}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Paso 2: Seleccionar Materia</h2>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Estudiante seleccionado: <strong>{getStudentName(Number(formData.student_id))}</strong>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materia (solo materias en las que está inscrito)
                  </label>
                  <select
                    value={formData.subject_id}
                    onChange={(e) => handleInputChange('subject_id', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Selecciona una materia</option>
                    {enrolledSubjects.length === 0 ? (
                      <option disabled value="">No hay materias inscritas para este estudiante</option>
                    ) : (
                      enrolledSubjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name} - {subject.code}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Paso 3: Ingresar Calificación</h2>
                <div className="mb-4 space-y-4">
                  <p className="text-sm text-gray-600">
                    Estudiante: <strong>{getStudentName(Number(formData.student_id))}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Materia: <strong>{getSubjectName(formData.subject_id)}</strong>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntaje Máximo
                    </label>
                    <Input
                      type="number"
                      value={formData.max_score}
                      onChange={(e) => handleInputChange('max_score', Number(e.target.value))}
                      min={1}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calificación Obtenida
                    </label>
                    <Input
                      type="number"
                      value={formData.score}
                      onChange={(e) => handleInputChange('score', Number(e.target.value))}
                      min={0}
                      max={formData.max_score}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios (opcional)
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={3}
                    placeholder="Comentarios adicionales..."
                  />
                </div>
                {formData.score > 0 && formData.max_score > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      Porcentaje: {((formData.score / formData.max_score) * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Paso 4: Confirmar</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Resumen de la calificación:</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Estudiante:</strong> {getStudentName(Number(formData.student_id))}</p>
                    <p><strong>Materia:</strong> {getSubjectName(formData.subject_id)}</p>
                    <p><strong>Calificación:</strong> {formData.score} / {formData.max_score}</p>
                    <p><strong>Porcentaje:</strong> {((formData.score / formData.max_score) * 100).toFixed(1)}%</p>
                    {formData.comments && (
                      <p><strong>Comentarios:</strong> {formData.comments}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Registrando...' : 'Registrar Calificación'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeForm; 