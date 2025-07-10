import React, { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  applications: string[];
  examples: string[];
  icon: string;
  color: string;
}

const Technologies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const technologies: Technology[] = [
    {
      id: 'satellite-imaging',
      name: 'Imágenes Satelitales',
      category: 'monitoring',
      description: 'Tecnología de teledetección que permite identificar cambios en el uso del suelo y detectar actividades mineras ilegales desde el espacio.',
      applications: [
        'Detección de deforestación en tiempo real',
        'Monitoreo de cambios en el paisaje',
        'Identificación de campamentos mineros',
        'Análisis de patrones de actividad'
      ],
      examples: [
        'NASA Landsat Program',
        'European Space Agency (ESA)',
        'Planet Labs',
        'Maxar Technologies'
      ],
      icon: '🛰️',
      color: 'blue'
    },
    {
      id: 'drones',
      name: 'Drones y UAVs',
      category: 'monitoring',
      description: 'Vehículos aéreos no tripulados equipados con cámaras y sensores para vigilancia aérea de zonas afectadas por minería ilegal.',
      applications: [
        'Vigilancia aérea de zonas remotas',
        'Fotogrametría y mapeo 3D',
        'Detección de actividad minera',
        'Monitoreo de rehabilitación'
      ],
      examples: [
        'DJI Phantom series',
        'Parrot Anafi',
        'Autel Robotics',
        'Custom UAVs con sensores especializados'
      ],
      icon: '🚁',
      color: 'green'
    },
    {
      id: 'ai-ml',
      name: 'Inteligencia Artificial y Machine Learning',
      category: 'analysis',
      description: 'Algoritmos de IA que analizan grandes volúmenes de datos para identificar patrones y predecir actividades de minería ilegal.',
      applications: [
        'Análisis automático de imágenes satelitales',
        'Detección de patrones sospechosos',
        'Predicción de zonas de riesgo',
        'Clasificación automática de actividades'
      ],
      examples: [
        'Google Earth Engine',
        'TensorFlow para análisis de imágenes',
        'OpenCV para procesamiento visual',
        'Modelos de deep learning personalizados'
      ],
      icon: '🤖',
      color: 'purple'
    },
    {
      id: 'gis',
      name: 'Sistemas de Información Geográfica (GIS)',
      category: 'analysis',
      description: 'Herramientas para capturar, almacenar, analizar y visualizar datos geográficos relacionados con la minería ilegal.',
      applications: [
        'Mapeo de zonas afectadas',
        'Análisis espacial de datos',
        'Visualización de patrones',
        'Planificación de intervenciones'
      ],
      examples: [
        'ArcGIS',
        'QGIS (open source)',
        'Google Earth Pro',
        'GRASS GIS'
      ],
      icon: '🗺️',
      color: 'orange'
    },
    {
      id: 'sensors',
      name: 'Sensores Ambientales',
      category: 'monitoring',
      description: 'Dispositivos que monitorean parámetros ambientales como calidad del agua, aire y suelo en zonas afectadas por minería ilegal.',
      applications: [
        'Monitoreo de calidad del agua',
        'Detección de contaminantes',
        'Medición de parámetros ambientales',
        'Alertas tempranas de contaminación'
      ],
      examples: [
        'Sensores de pH y turbidez',
        'Monitores de calidad del aire',
        'Sensores de metales pesados',
        'Estaciones meteorológicas'
      ],
      icon: '📡',
      color: 'teal'
    },
    {
      id: 'blockchain',
      name: 'Blockchain y Trazabilidad',
      category: 'tracking',
      description: 'Tecnología de cadena de bloques para rastrear el origen de minerales y garantizar que provengan de fuentes legales.',
      applications: [
        'Trazabilidad de minerales',
        'Certificación de origen',
        'Transparencia en la cadena de suministro',
        'Prevención de lavado de minerales'
      ],
      examples: [
        'IBM Blockchain Platform',
        'Everledger',
        'Proyectos de trazabilidad de oro',
        'Certificaciones digitales'
      ],
      icon: '⛓️',
      color: 'indigo'
    },
    {
      id: 'mobile-apps',
      name: 'Aplicaciones Móviles',
      category: 'reporting',
      description: 'Apps que permiten a ciudadanos y autoridades reportar actividades sospechosas de minería ilegal en tiempo real.',
      applications: [
        'Reportes ciudadanos',
        'Geolocalización de incidentes',
        'Fotografía y documentación',
        'Comunicación con autoridades'
      ],
      examples: [
        'Apps de reporte ciudadano',
        'Sistemas de denuncia digital',
        'Plataformas de mapeo colaborativo',
        'Apps de monitoreo comunitario'
      ],
      icon: '📱',
      color: 'pink'
    },
    {
      id: 'big-data',
      name: 'Big Data y Analytics',
      category: 'analysis',
      description: 'Análisis de grandes volúmenes de datos para identificar tendencias y patrones en la minería ilegal.',
      applications: [
        'Análisis de tendencias',
        'Predicción de actividades',
        'Correlación de datos múltiples',
        'Optimización de recursos'
      ],
      examples: [
        'Apache Hadoop',
        'Apache Spark',
        'Tableau para visualización',
        'Python con pandas y numpy'
      ],
      icon: '📊',
      color: 'red'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', color: 'gray' },
    { id: 'monitoring', name: 'Monitoreo', color: 'blue' },
    { id: 'analysis', name: 'Análisis', color: 'green' },
    { id: 'tracking', name: 'Trazabilidad', color: 'purple' },
    { id: 'reporting', name: 'Reportes', color: 'orange' }
  ];

  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      teal: 'bg-teal-50 border-teal-200 text-teal-800',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      pink: 'bg-pink-50 border-pink-200 text-pink-800',
      red: 'bg-red-50 border-red-200 text-red-800'
    };
    return colorMap[color] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Tecnologías Emergentes</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Descubre las herramientas tecnológicas más avanzadas aplicadas a la prevención, detección y mitigación de la minería ilegal en el Perú.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
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
      </section>

      {/* Technologies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnologies.map((tech) => (
              <div key={tech.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className={`p-6 border-l-4 ${getColorClasses(tech.color)}`}>
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{tech.icon}</span>
                    <h3 className="text-xl font-semibold">{tech.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{tech.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Aplicaciones:</h4>
                    <ul className="space-y-1">
                      {tech.applications.map((app, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ejemplos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.examples.map((example, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTechnologies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron tecnologías en esta categoría.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres Aprender Más?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explora nuestros recursos educativos y únete a la comunidad para compartir conocimientos sobre estas tecnologías.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resources"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Explorar Recursos
            </a>
            <a
              href="/community"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              Unirse a la Comunidad
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technologies; 