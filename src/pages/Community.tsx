import React, { useState } from 'react';

interface CommunityMember {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  avatar: string;
  joinedDate: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  replies: number;
  views: number;
  date: string;
  tags: string[];
}

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'discussions' | 'events'>('members');

  const members: CommunityMember[] = [
    {
      id: '1',
      name: 'María González',
      role: 'Investigadora Ambiental',
      organization: 'Universidad Nacional Mayor de San Marcos',
      expertise: ['GIS', 'Monitoreo Satelital', 'Análisis Espacial'],
      avatar: 'MG',
      joinedDate: 'Enero 2024'
    },
    {
      id: '2',
      name: 'Carlos Mendoza',
      role: 'Ingeniero de Sistemas',
      organization: 'ONG Ambiental Perú',
      expertise: ['Machine Learning', 'Drones', 'Desarrollo Web'],
      avatar: 'CM',
      joinedDate: 'Febrero 2024'
    },
    {
      id: '3',
      name: 'Ana Torres',
      role: 'Estudiante de Ingeniería Ambiental',
      organization: 'Universidad de Lima',
      expertise: ['Sensores Ambientales', 'Análisis de Datos'],
      avatar: 'AT',
      joinedDate: 'Marzo 2024'
    },
    {
      id: '4',
      name: 'Luis Ramírez',
      role: 'Especialista en Blockchain',
      organization: 'Startup Tech Verde',
      expertise: ['Blockchain', 'Trazabilidad', 'Smart Contracts'],
      avatar: 'LR',
      joinedDate: 'Abril 2024'
    },
    {
      id: '5',
      name: 'Sofia Herrera',
      role: 'Activista Ambiental',
      organization: 'Colectivo Madre de Dios',
      expertise: ['Monitoreo Comunitario', 'Educación Ambiental'],
      avatar: 'SH',
      joinedDate: 'Mayo 2024'
    },
    {
      id: '6',
      name: 'Roberto Silva',
      role: 'Consultor en Tecnologías Verdes',
      organization: 'Consultora Ambiental Sostenible',
      expertise: ['Evaluación de Impacto', 'Tecnologías Emergentes'],
      avatar: 'RS',
      joinedDate: 'Junio 2024'
    }
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: '¿Cómo implementar monitoreo con drones en zonas remotas?',
      author: 'María González',
      content: 'Estoy trabajando en un proyecto para monitorear zonas afectadas por minería ilegal en Madre de Dios. ¿Alguien tiene experiencia con drones para este tipo de aplicaciones?',
      category: 'Tecnología',
      replies: 8,
      views: 45,
      date: '2024-01-15',
      tags: ['drones', 'monitoreo', 'Madre de Dios']
    },
    {
      id: '2',
      title: 'Análisis de imágenes satelitales con Python',
      author: 'Carlos Mendoza',
      content: 'Comparto un tutorial sobre cómo procesar imágenes satelitales usando Python y librerías como rasterio y geopandas para detectar cambios en el uso del suelo.',
      category: 'Tutorial',
      replies: 12,
      views: 78,
      date: '2024-01-10',
      tags: ['Python', 'satelital', 'análisis']
    },
    {
      id: '3',
      title: 'Experiencias con sensores de calidad del agua',
      author: 'Ana Torres',
      content: 'He estado probando diferentes sensores para monitorear la calidad del agua en ríos afectados por minería ilegal. ¿Qué sensores recomiendan?',
      category: 'Equipamiento',
      replies: 15,
      views: 92,
      date: '2024-01-08',
      tags: ['sensores', 'agua', 'calidad']
    },
    {
      id: '4',
      title: 'Blockchain para trazabilidad de minerales',
      author: 'Luis Ramírez',
      content: 'Estoy desarrollando una solución blockchain para rastrear el origen de minerales y garantizar que provengan de fuentes legales. ¿Interesados en colaborar?',
      category: 'Proyecto',
      replies: 6,
      views: 34,
      date: '2024-01-05',
      tags: ['blockchain', 'trazabilidad', 'minerales']
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Webinar: Tecnologías Emergentes en Monitoreo Ambiental',
      date: '15 de Enero, 2024',
      time: '7:00 PM - 8:30 PM',
      type: 'Online',
      attendees: 45,
      description: 'Presentación sobre las últimas tecnologías aplicadas al monitoreo ambiental y su uso en la lucha contra la minería ilegal.'
    },
    {
      id: '2',
      title: 'Workshop: Introducción a GIS para Activistas',
      date: '22 de Enero, 2024',
      time: '10:00 AM - 2:00 PM',
      type: 'Presencial',
      attendees: 25,
      description: 'Taller práctico sobre el uso de Sistemas de Información Geográfica para mapeo de zonas afectadas.'
    },
    {
      id: '3',
      title: 'Hackathon: Soluciones Tecnológicas para el Medio Ambiente',
      date: '5-7 de Febrero, 2024',
      time: '48 horas',
      type: 'Híbrido',
      attendees: 80,
      description: 'Competencia de desarrollo de soluciones tecnológicas innovadoras para combatir la minería ilegal.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Comunidad MineTech</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Conecta, colabora y aprende con otros profesionales, estudiantes y activistas comprometidos con la lucha contra la minería ilegal.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Miembros Activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Discusiones Mensuales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">8+</div>
              <div className="text-gray-600">Eventos por Mes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
              <div className="text-gray-600">Proyectos Colaborativos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Miembros
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'discussions'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Discusiones
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === 'events'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Eventos
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'members' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Miembros de la Comunidad</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold">{member.avatar}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{member.organization}</p>
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Miembro desde {member.joinedDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discussions' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Discusiones Recientes</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Nueva Discusión
                </button>
              </div>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{discussion.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">por {discussion.author}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {discussion.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{discussion.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{discussion.replies} respuestas</span>
                        <span>{discussion.views} vistas</span>
                        <span>{discussion.date}</span>
                      </div>
                      <div className="flex gap-1">
                        {discussion.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Próximos Eventos</h2>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Crear Evento
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        event.type === 'Online' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Presencial' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <p>{event.date}</p>
                      <p>{event.time}</p>
                      <p>{event.attendees} asistentes</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                      Registrarse
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Conecta con profesionales, estudiantes y activistas comprometidos con la lucha contra la minería ilegal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Registrarse
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200">
              Explorar Más
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community; 