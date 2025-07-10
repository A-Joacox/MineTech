import React, { useState } from 'react';

interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  category: string;
  downloadUrl?: string;
  externalUrl?: string;
  fileSize?: string;
  tags: string[];
  icon: string;
  color: string;
}

const Resources: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const resources: Resource[] = [
    {
      id: 'manual-monitoreo',
      title: 'Manual de Monitoreo Ambiental',
      type: 'PDF',
      description: 'Guía completa sobre técnicas de monitoreo ambiental aplicadas a la detección de minería ilegal.',
      category: 'guides',
      downloadUrl: '#',
      fileSize: '2.5 MB',
      tags: ['monitoreo', 'ambiental', 'manual', 'técnicas'],
      icon: '📖',
      color: 'blue'
    },
    {
      id: 'infografia-tecnologias',
      title: 'Infografía: Tecnologías Emergentes',
      type: 'PNG',
      description: 'Infografía visual que resume las principales tecnologías aplicadas a la lucha contra la minería ilegal.',
      category: 'infographics',
      downloadUrl: '#',
      fileSize: '1.2 MB',
      tags: ['tecnologías', 'infografía', 'visual', 'resumen'],
      icon: '📊',
      color: 'green'
    },
    {
      id: 'caso-estudio-madre-dios',
      title: 'Caso de Estudio: Madre de Dios',
      type: 'PDF',
      description: 'Análisis detallado del uso de tecnologías satelitales para monitorear la minería ilegal en Madre de Dios.',
      category: 'case-studies',
      downloadUrl: '#',
      fileSize: '3.8 MB',
      tags: ['caso estudio', 'Madre de Dios', 'satelital', 'análisis'],
      icon: '🔍',
      color: 'purple'
    },
    {
      id: 'tutorial-gis',
      title: 'Tutorial: Introducción a GIS',
      type: 'Video',
      description: 'Video tutorial sobre el uso de Sistemas de Información Geográfica para análisis de minería ilegal.',
      category: 'tutorials',
      externalUrl: 'https://youtube.com',
      fileSize: '45 min',
      tags: ['GIS', 'tutorial', 'video', 'análisis espacial'],
      icon: '🎥',
      color: 'orange'
    },
    {
      id: 'dataset-actividades',
      title: 'Dataset: Actividades Mineras Ilegales',
      type: 'CSV',
      description: 'Conjunto de datos georreferenciados de actividades de minería ilegal detectadas en el Perú.',
      category: 'datasets',
      downloadUrl: '#',
      fileSize: '850 KB',
      tags: ['dataset', 'datos', 'georreferenciados', 'actividades'],
      icon: '📊',
      color: 'red'
    },
    {
      id: 'presentacion-ia',
      title: 'Presentación: IA en Monitoreo',
      type: 'PPTX',
      description: 'Presentación sobre el uso de inteligencia artificial para el monitoreo de minería ilegal.',
      category: 'presentations',
      downloadUrl: '#',
      fileSize: '5.2 MB',
      tags: ['IA', 'presentación', 'monitoreo', 'inteligencia artificial'],
      icon: '📋',
      color: 'teal'
    },
    {
      id: 'webinar-drones',
      title: 'Webinar: Uso de Drones',
      type: 'Video',
      description: 'Webinar sobre el uso de drones y UAVs para vigilancia de zonas afectadas por minería ilegal.',
      category: 'webinars',
      externalUrl: 'https://zoom.us',
      fileSize: '1h 15min',
      tags: ['drones', 'webinar', 'vigilancia', 'UAVs'],
      icon: '🚁',
      color: 'indigo'
    },
    {
      id: 'checklist-evaluacion',
      title: 'Checklist de Evaluación',
      type: 'PDF',
      description: 'Lista de verificación para evaluar el impacto ambiental de actividades mineras.',
      category: 'tools',
      downloadUrl: '#',
      fileSize: '450 KB',
      tags: ['checklist', 'evaluación', 'impacto', 'ambiental'],
      icon: '✅',
      color: 'pink'
    },
    {
      id: 'reporte-anual-2024',
      title: 'Reporte Anual 2024',
      type: 'PDF',
      description: 'Reporte anual sobre el estado de la minería ilegal en el Perú y las tecnologías aplicadas.',
      category: 'reports',
      downloadUrl: '#',
      fileSize: '8.1 MB',
      tags: ['reporte', 'anual', '2024', 'estado'],
      icon: '📈',
      color: 'yellow'
    },
    {
      id: 'guia-ciudadana',
      title: 'Guía Ciudadana de Denuncia',
      type: 'PDF',
      description: 'Guía para ciudadanos sobre cómo reportar actividades de minería ilegal de manera efectiva.',
      category: 'guides',
      downloadUrl: '#',
      fileSize: '1.8 MB',
      tags: ['guía', 'ciudadana', 'denuncia', 'reporte'],
      icon: '👥',
      color: 'green'
    },
    {
      id: 'mapa-interactivo',
      title: 'Mapa Interactivo de Zonas Afectadas',
      type: 'Web App',
      description: 'Aplicación web interactiva que muestra las zonas afectadas por minería ilegal en tiempo real.',
      category: 'tools',
      externalUrl: 'https://mapa-mineria-ilegal.pe',
      fileSize: 'Web App',
      tags: ['mapa', 'interactivo', 'tiempo real', 'zonas afectadas'],
      icon: '🗺️',
      color: 'blue'
    },
    {
      id: 'curso-online',
      title: 'Curso Online: Tecnologías Ambientales',
      type: 'Course',
      description: 'Curso completo sobre tecnologías aplicadas a la protección ambiental y lucha contra la minería ilegal.',
      category: 'courses',
      externalUrl: 'https://coursera.org',
      fileSize: '8 semanas',
      tags: ['curso', 'online', 'tecnologías', 'ambientales'],
      icon: '🎓',
      color: 'purple'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', color: 'gray' },
    { id: 'guides', name: 'Guías', color: 'blue' },
    { id: 'infographics', name: 'Infografías', color: 'green' },
    { id: 'case-studies', name: 'Casos de Estudio', color: 'purple' },
    { id: 'tutorials', name: 'Tutoriales', color: 'orange' },
    { id: 'datasets', name: 'Datasets', color: 'red' },
    { id: 'presentations', name: 'Presentaciones', color: 'teal' },
    { id: 'webinars', name: 'Webinars', color: 'indigo' },
    { id: 'tools', name: 'Herramientas', color: 'pink' },
    { id: 'reports', name: 'Reportes', color: 'yellow' },
    { id: 'courses', name: 'Cursos', color: 'purple' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Recursos Educativos</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Accede a materiales educativos, herramientas y recursos para aprender sobre tecnologías aplicadas a la lucha contra la minería ilegal.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className={`p-6 border-l-4 ${getColorClasses(resource.color)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{resource.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.type}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {resource.fileSize}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {resource.downloadUrl && (
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200">
                        Descargar
                      </button>
                    )}
                    {resource.externalUrl && (
                      <a
                        href={resource.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                      >
                        Ver
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron recursos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Disponibles</h2>
            <p className="text-lg text-gray-600">
              Más de 50 recursos educativos gratuitos para tu aprendizaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{resources.filter(r => r.type === 'PDF').length}</div>
              <div className="text-gray-700">Documentos PDF</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{resources.filter(r => r.type === 'Video').length}</div>
              <div className="text-gray-700">Videos Tutoriales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{resources.filter(r => r.type === 'CSV').length}</div>
              <div className="text-gray-700">Datasets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{resources.filter(r => r.type === 'Web App').length}</div>
              <div className="text-gray-700">Herramientas Web</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes Recursos para Compartir?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y comparte tus conocimientos, herramientas y experiencias con otros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/community"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Unirse a la Comunidad
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources; 