import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GradesList from './pages/GradesList';
import GradeForm from './pages/GradeForm';
import StudentGrades from './pages/StudentGrades';
import SubjectGrades from './pages/SubjectGrades';
import Reports from './pages/Reports';
import GradeHistory from './pages/GradeHistory';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const apiKey = typeof window !== 'undefined' ? localStorage.getItem('apiKey') : null;
  return apiKey ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <ProtectedRoute>
                <GradesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades/new"
            element={
              <ProtectedRoute>
                <GradeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades/student/:id"
            element={
              <ProtectedRoute>
                <StudentGrades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades/subject/:id"
            element={
              <ProtectedRoute>
                <SubjectGrades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <GradeHistory />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
