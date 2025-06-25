import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!apiKey.trim()) {
      setError('La API Key es requerida');
      setLoading(false);
      return;
    }

    if (apiKey.length < 8) {
      setError('La API Key debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    try {
      const success = await login(apiKey);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('API Key inválida');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tu API Key para acceder al sistema
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="API Key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Ingresa tu API Key"
              error={error}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              Iniciar Sesión
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Ingrese la API Key que se le proporcionó para acceder al sistema
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 