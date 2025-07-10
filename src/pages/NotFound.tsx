import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center">
            <span className="text-6xl font-bold text-white">404</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Ups! Página no encontrada
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            La página que buscas no existe o ha sido movida. 
            Parece que te has perdido en el camino hacia la tecnología ambiental.
          </p>
          <p className="text-lg text-gray-500">
            Error 404 - Página no encontrada
          </p>
        </div>

        {/* Suggestions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            ¿Qué puedes hacer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Volver al Inicio</h3>
              <p className="text-sm text-gray-600">Regresa a la página principal de MineTech</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Explorar Recursos</h3>
              <p className="text-sm text-gray-600">Descubre nuestros recursos educativos</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Unirse a la Comunidad</h3>
              <p className="text-sm text-gray-600">Conecta con otros profesionales</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
          >
            Volver al Inicio
          </Link>
          <Link
            to="/technologies"
            className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors duration-200"
          >
            Explorar Tecnologías
          </Link>
        </div>

        {/* Fun Fact */}
        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ¿Sabías que?
          </h3>
          <p className="text-gray-600">
            La minería ilegal en el Perú afecta más de 18,000 hectáreas de bosques amazónicos. 
            Cada página que visitas en MineTech te acerca un paso más a la solución.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-2">
            ¿Necesitas ayuda? Contáctanos:
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              contacto@minetech.pe
            </a>
            <span className="text-gray-400">|</span>
            <Link
              to="/about"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Acerca de MineTech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 