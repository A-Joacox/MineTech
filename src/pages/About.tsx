import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Acerca de MineTech</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Una plataforma web gratuita, educativa y colaborativa diseñada para centralizar y difundir información sobre tecnologías emergentes aplicadas a la lucha contra la minería ilegal en el Perú.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">El Problema</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  La minería ilegal representa una de las actividades más perjudiciales para el medio ambiente y la sociedad en el Perú, con consecuencias ambientales, sociales, económicas y legales de gran escala.
                </p>
                <p>
                  Según el Ministerio del Ambiente (MINAM, 2013), esta actividad ha contribuido significativamente a la deforestación de la Amazonía peruana, la contaminación de ríos y suelos por mercurio, y el deterioro de comunidades vulnerables.
                </p>
                <p>
                  Entre 2021 y 2022, se deforestaron más de 18,000 hectáreas de bosques amazónicos solo en Madre de Dios como consecuencia directa de esta práctica.
                </p>
              </div>
            </div>
            <div className="bg-red-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Impactos Principales</h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Deforestación masiva de la Amazonía peruana
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Contaminación de ríos y suelos por mercurio
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Deterioro de comunidades vulnerables
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Vinculación con trabajo informal y crimen organizado
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Asimetría tecnológica entre redes ilegales y el Estado
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Solución</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MineTech conecta a estudiantes, profesionales, organizaciones y expertos comprometidos con la lucha contra la minería ilegal, a través de una plataforma web gratuita, educativa y colaborativa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Objetivo General</h3>
              <p className="text-gray-600 mb-4">
                Conectar a estudiantes, profesionales, organizaciones y expertos comprometidos con la lucha contra la minería ilegal, a través de una plataforma web gratuita, educativa y colaborativa que centraliza información confiable y actualizada sobre tecnologías emergentes aplicadas a esta problemática.
              </p>
              <p className="text-gray-600">
                Esta propuesta es innovadora porque no se limita a informar, sino que integra funciones clave en un solo espacio digital, fomentando la educación abierta, la colaboración activa y el aprendizaje colectivo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Público Objetivo</h3>
              <div className="space-y-3 text-gray-600">
                <p><strong>Principal:</strong> Jóvenes entre 18 y 35 años con interés en sostenibilidad, innovación y justicia social.</p>
                <p><strong>Secundario:</strong> ONG's ambientales, colectivos activistas, académicos e investigadores.</p>
                <p><strong>Especialistas:</strong> Profesionales del sector tecnológico o ambiental, docentes e investigadores.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
            <p className="text-lg text-gray-600">
              Grupo 6 - Proyectos Interdisciplinarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Mathias Castro</h3>
              <p className="text-gray-600">202410164</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">VC</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Valentino Contreras</h3>
              <p className="text-gray-600">Estudiante</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">VM</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Vera Lucía Moran</h3>
              <p className="text-gray-600">202410177</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">CP</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">César Picasso 🖌️🎨🖼️</h3>
              <p className="text-gray-600">202410207</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">JM</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Joaquín Mercado 🛍️</h3>
              <p className="text-gray-600">202410202</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Profesor</h3>
            <p className="text-lg text-gray-600">Kenny Neira</p>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Modelo de Negocio</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MineTech opera bajo un modelo de sostenibilidad progresiva que mantiene la gratuidad del servicio mientras genera ingresos para su operación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fuentes de Ingresos</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Publicidad responsable vinculada a universidades y ONG's
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Contenido descargable bajo licencia (infografías, manuales)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Donaciones voluntarias mediante medios digitales
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Sistema de intermediación con expertos y asesores
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Viabilidad Financiera</h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-semibold">TIR Mensual: 10.45%</p>
                  <p className="text-sm">La inversión inicial se recupera en un año</p>
                </div>
                <div>
                  <p className="font-semibold">VAN (24 meses): S/. 91</p>
                  <p className="text-sm">Valor económico adicional generado</p>
                </div>
                <div>
                  <p className="font-semibold">Flujo Neto Mensual: S/. 45</p>
                  <p className="text-sm">Excedente para reinversión y mejoras</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Análisis de Mercado</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              El mercado objetivo incluye jóvenes digitalmente activos interesados en temas de sostenibilidad y tecnología.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-700 font-semibold">TAM</div>
              <div className="text-sm text-gray-600">Total Addressable Market</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">25K</div>
              <div className="text-gray-700 font-semibold">SAM</div>
              <div className="text-sm text-gray-600">Serviceable Available Market</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">3-5K</div>
              <div className="text-gray-700 font-semibold">SOM</div>
              <div className="text-sm text-gray-600">Serviceable Obtainable Market</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 