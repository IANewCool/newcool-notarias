'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Notarias por region
const NOTARIAS = [
  // Region Metropolitana
  { id: 1, nombre: '1a Notaria de Santiago', notario: 'Eduardo Avello Concha', direccion: 'Agustinas 1442', comuna: 'Santiago', region: 'Metropolitana', telefono: '22 672 5000', tipo: 'Primera Categoria' },
  { id: 2, nombre: '2a Notaria de Santiago', notario: 'Rene Benavente Cash', direccion: 'Huerfanos 979, Of. 611', comuna: 'Santiago', region: 'Metropolitana', telefono: '22 639 1033', tipo: 'Primera Categoria' },
  { id: 3, nombre: '3a Notaria de Santiago', notario: 'Jose Musalem Saffie', direccion: 'Monjitas 565', comuna: 'Santiago', region: 'Metropolitana', telefono: '22 638 7891', tipo: 'Primera Categoria' },
  { id: 4, nombre: '4a Notaria de Santiago', notario: 'Humberto Quezada Moreno', direccion: 'Agustinas 1235', comuna: 'Santiago', region: 'Metropolitana', telefono: '22 671 4700', tipo: 'Primera Categoria' },
  { id: 5, nombre: '5a Notaria de Santiago', notario: 'Cosme Gomila Gatica', direccion: 'Estado 360, Of. 51', comuna: 'Santiago', region: 'Metropolitana', telefono: '22 633 3255', tipo: 'Primera Categoria' },
  { id: 6, nombre: 'Notaria de Providencia', notario: 'Patricio Zaldivar Mackenna', direccion: 'Providencia 2594, Of. 81', comuna: 'Providencia', region: 'Metropolitana', telefono: '22 231 0700', tipo: 'Primera Categoria' },
  { id: 7, nombre: 'Notaria de Las Condes', notario: 'Raul Undurraga Laso', direccion: 'Apoquindo 3000, Of. 901', comuna: 'Las Condes', region: 'Metropolitana', telefono: '22 245 4400', tipo: 'Primera Categoria' },
  { id: 8, nombre: 'Notaria de Nunoa', notario: 'Felix Jara Cadot', direccion: 'Av. Irarrazaval 2401', comuna: 'Nunoa', region: 'Metropolitana', telefono: '22 225 5000', tipo: 'Segunda Categoria' },
  { id: 9, nombre: 'Notaria de Maipu', notario: 'Juan Gonzalez Morales', direccion: '5 de Abril 399', comuna: 'Maipu', region: 'Metropolitana', telefono: '22 531 8200', tipo: 'Segunda Categoria' },
  { id: 10, nombre: 'Notaria de Puente Alto', notario: 'Carolina Silva Pizarro', direccion: 'Concha y Toro 461', comuna: 'Puente Alto', region: 'Metropolitana', telefono: '22 850 3300', tipo: 'Segunda Categoria' },
  // Valparaiso
  { id: 11, nombre: '1a Notaria de Valparaiso', notario: 'Ricardo Reveco Hormazabal', direccion: 'Prat 846', comuna: 'Valparaiso', region: 'Valparaiso', telefono: '32 221 3500', tipo: 'Primera Categoria' },
  { id: 12, nombre: 'Notaria de Vina del Mar', notario: 'German Ovalle Marin', direccion: 'Arlegui 340', comuna: 'Vina del Mar', region: 'Valparaiso', telefono: '32 268 8200', tipo: 'Primera Categoria' },
  { id: 13, nombre: 'Notaria de Quilpue', notario: 'Andrea Morales Figueroa', direccion: 'Diego Portales 157', comuna: 'Quilpue', region: 'Valparaiso', telefono: '32 292 4100', tipo: 'Segunda Categoria' },
  // Biobio
  { id: 14, nombre: '1a Notaria de Concepcion', notario: 'Sergio Illanes Edwards', direccion: "O'Higgins 564", comuna: 'Concepcion', region: 'Biobio', telefono: '41 222 7800', tipo: 'Primera Categoria' },
  { id: 15, nombre: '2a Notaria de Concepcion', notario: 'Cristian Salvo Romero', direccion: 'Barros Arana 810', comuna: 'Concepcion', region: 'Biobio', telefono: '41 224 5600', tipo: 'Primera Categoria' },
  { id: 16, nombre: 'Notaria de Talcahuano', notario: 'Mauricio Pena Saavedra', direccion: 'Colon 556', comuna: 'Talcahuano', region: 'Biobio', telefono: '41 254 3200', tipo: 'Segunda Categoria' },
  // La Araucania
  { id: 17, nombre: '1a Notaria de Temuco', notario: 'Pablo Rioseco Vasquez', direccion: 'Manuel Bulnes 590', comuna: 'Temuco', region: 'La Araucania', telefono: '45 220 5400', tipo: 'Primera Categoria' },
  { id: 18, nombre: 'Notaria de Villarrica', notario: 'Lorena Munoz Bustos', direccion: 'Valentin Letelier 650', comuna: 'Villarrica', region: 'La Araucania', telefono: '45 241 1200', tipo: 'Segunda Categoria' },
  // Los Lagos
  { id: 19, nombre: '1a Notaria de Puerto Montt', notario: 'Fernando Rosas Vial', direccion: 'Urmeneta 506', comuna: 'Puerto Montt', region: 'Los Lagos', telefono: '65 225 3800', tipo: 'Primera Categoria' },
  { id: 20, nombre: 'Notaria de Osorno', notario: 'Roberto Astorga Munoz', direccion: "O'Higgins 951", comuna: 'Osorno', region: 'Los Lagos', telefono: '64 223 1500', tipo: 'Primera Categoria' },
  // Antofagasta
  { id: 21, nombre: '1a Notaria de Antofagasta', notario: 'Alejandro Cerda Munoz', direccion: 'Prat 461', comuna: 'Antofagasta', region: 'Antofagasta', telefono: '55 226 4100', tipo: 'Primera Categoria' },
  { id: 22, nombre: 'Notaria de Calama', notario: 'Patricia Soto Diaz', direccion: 'Ramirez 1845', comuna: 'Calama', region: 'Antofagasta', telefono: '55 234 2200', tipo: 'Segunda Categoria' },
  // Coquimbo
  { id: 23, nombre: '1a Notaria de La Serena', notario: 'Jaime Peralta Silva', direccion: 'Cordovez 399', comuna: 'La Serena', region: 'Coquimbo', telefono: '51 221 5700', tipo: 'Primera Categoria' },
  { id: 24, nombre: 'Notaria de Coquimbo', notario: 'Elena Marin Lagos', direccion: 'Aldunate 520', comuna: 'Coquimbo', region: 'Coquimbo', telefono: '51 231 2800', tipo: 'Segunda Categoria' },
  // Maule
  { id: 25, nombre: '1a Notaria de Talca', notario: 'Jorge Vera Sanchez', direccion: '1 Sur 850', comuna: 'Talca', region: 'Maule', telefono: '71 222 5500', tipo: 'Primera Categoria' },
];

const REGIONES = ['Todas', 'Metropolitana', 'Valparaiso', 'Biobio', 'La Araucania', 'Los Lagos', 'Antofagasta', 'Coquimbo', 'Maule'];

// Tipos de tramites notariales
const TRAMITES = [
  {
    id: 'escrituras',
    nombre: 'Escrituras Publicas',
    icon: '📜',
    descripcion: 'Documentos solemnes que dan fe publica',
    ejemplos: ['Compraventa de inmuebles', 'Hipotecas', 'Constitucion de sociedades', 'Testamentos abiertos', 'Mandatos', 'Cesion de derechos']
  },
  {
    id: 'autorizaciones',
    nombre: 'Autorizaciones de Firmas',
    icon: '✍️',
    descripcion: 'Certificacion de firmas en documentos privados',
    ejemplos: ['Contratos de arriendo', 'Finiquitos laborales', 'Contratos de trabajo', 'Poderes simples', 'Declaraciones juradas']
  },
  {
    id: 'protocolizaciones',
    nombre: 'Protocolizaciones',
    icon: '📁',
    descripcion: 'Incorporacion de documentos al protocolo notarial',
    ejemplos: ['Documentos extranjeros', 'Actas de directorio', 'Estatutos', 'Balances', 'Actas de asamblea']
  },
  {
    id: 'legalizaciones',
    nombre: 'Legalizaciones',
    icon: '✅',
    descripcion: 'Certificacion de documentos y copias',
    ejemplos: ['Fotocopias de documentos', 'Certificados', 'Titulos', 'Contratos', 'Cartas']
  },
  {
    id: 'testamentos',
    nombre: 'Testamentos',
    icon: '📋',
    descripcion: 'Disposicion de bienes para despues de la muerte',
    ejemplos: ['Testamento abierto', 'Testamento cerrado', 'Testamento ante 5 testigos']
  },
  {
    id: 'inventarios',
    nombre: 'Inventarios Solemnes',
    icon: '📦',
    descripcion: 'Registro oficial de bienes',
    ejemplos: ['Inventario de herencia', 'Inventario de menor', 'Inventario de quiebra']
  }
];

// Aranceles notariales (valores aproximados)
const ARANCELES = {
  escrituraMinima: 25000,
  escrituraPorcentaje: 0.002, // 0.2% del valor
  autorizacionFirma: 3500,
  protocolizacion: 8000,
  legalizacionFotocopia: 1500,
  testamento: 45000,
  poderesSimples: 5000,
  certificadoVigencia: 4500,
  copiaAutorizada: 3000
};

// Documentos requeridos por tramite
const DOCUMENTOS = {
  compraventa: [
    'Cedula de identidad de vendedor y comprador',
    'Certificado de dominio vigente (30 dias)',
    'Certificado de hipotecas y gravamenes',
    'Certificado de prohibiciones',
    'Certificado de litigios',
    'Certificado de avaluo fiscal',
    'Certificado de contribuciones al dia',
    'Certificado de numero municipal',
    'Plano de la propiedad',
    'Copia de inscripcion anterior'
  ],
  sociedad: [
    'Cedula de identidad de los socios',
    'Borrador de estatutos sociales',
    'Definicion de capital social',
    'Objeto social',
    'Domicilio de la sociedad',
    'Distribucion de participaciones',
    'Administracion y representacion'
  ],
  poderes: [
    'Cedula de identidad del mandante',
    'Datos completos del mandatario',
    'Especificacion de facultades',
    'Vigencia del mandato'
  ],
  testamento: [
    'Cedula de identidad del testador',
    'Lista de herederos con RUT',
    'Detalle de bienes a testar',
    'Declaracion de hijos (si corresponde)',
    'Dos testigos habiles'
  ]
};

export default function NotariasModule() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [seccionActiva, setSeccionActiva] = useState<'buscador' | 'tramites' | 'aranceles' | 'documentos' | 'proceso' | 'glosario'>('buscador');

  // Calculadora de aranceles
  const [valorOperacion, setValorOperacion] = useState('');
  const [tipoTramite, setTipoTramite] = useState('escritura');

  const notariasFiltradas = NOTARIAS.filter(n => {
    const coincideBusqueda = busqueda === '' ||
      n.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      n.notario.toLowerCase().includes(busqueda.toLowerCase()) ||
      n.comuna.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRegion = regionFiltro === 'Todas' || n.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularArancel = () => {
    const valor = parseFloat(valorOperacion) || 0;

    switch(tipoTramite) {
      case 'escritura':
        const porcentaje = valor * ARANCELES.escrituraPorcentaje;
        return Math.max(porcentaje, ARANCELES.escrituraMinima);
      case 'autorizacion':
        return ARANCELES.autorizacionFirma;
      case 'protocolizacion':
        return ARANCELES.protocolizacion;
      case 'legalizacion':
        return ARANCELES.legalizacionFotocopia;
      case 'testamento':
        return ARANCELES.testamento;
      case 'poder':
        return ARANCELES.poderesSimples;
      default:
        return 0;
    }
  };

  const formatearPesos = (valor: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-3 block">📜</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Notarias <span className="text-amber-400">Chile</span>
            </h1>
            <p className="text-amber-200/70">
              Buscador de notarias, tramites y aranceles notariales
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-black/20 border-b border-amber-500/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {[
              { id: 'buscador', label: '🔍 Buscador', sublabel: 'Notarias' },
              { id: 'tramites', label: '📋 Tramites', sublabel: 'Tipos' },
              { id: 'aranceles', label: '🧮 Aranceles', sublabel: 'Calculadora' },
              { id: 'documentos', label: '📄 Documentos', sublabel: 'Requeridos' },
              { id: 'proceso', label: '📝 Proceso', sublabel: 'Escritura' },
              { id: 'glosario', label: '📖 Glosario', sublabel: 'Terminos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id as typeof seccionActiva)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-amber-500 text-black'
                    : 'text-amber-200 hover:bg-amber-500/20'
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="text-xs opacity-70">{tab.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Notarias */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscar Notaria
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-amber-200 text-sm mb-2">Buscar por nombre, notario o comuna</label>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: Santiago, Providencia, Musalem..."
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-amber-200 text-sm mb-2">Region</label>
                  <select
                    value={regionFiltro}
                    onChange={(e) => setRegionFiltro(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg text-white focus:outline-none focus:border-amber-500"
                  >
                    {REGIONES.map(r => (
                      <option key={r} value={r} className="bg-slate-800">{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-amber-200/60">
                Mostrando {notariasFiltradas.length} de {NOTARIAS.length} notarias
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {notariasFiltradas.map((notaria, i) => (
                <motion.div
                  key={notaria.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur border border-amber-500/20 rounded-xl p-5 hover:border-amber-500/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white">{notaria.nombre}</h3>
                      <p className="text-amber-400 text-sm">{notaria.notario}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      notaria.tipo === 'Primera Categoria' ? 'bg-amber-500/20 text-amber-300' : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {notaria.tipo}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📍</span> {notaria.direccion}, {notaria.comuna}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📞</span> {notaria.telefono}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>🗺️</span> Region {notaria.region}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {notariasFiltradas.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">🔍</span>
                <p className="text-gray-400">No se encontraron notarias con esos criterios</p>
              </div>
            )}
          </motion.section>
        )}

        {/* Tipos de Tramites */}
        {seccionActiva === 'tramites' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Tramites Notariales</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRAMITES.map((tramite, i) => (
                <motion.div
                  key={tramite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur border border-amber-500/20 rounded-xl p-5"
                >
                  <span className="text-3xl mb-3 block">{tramite.icon}</span>
                  <h3 className="font-bold text-white mb-2">{tramite.nombre}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tramite.descripcion}</p>

                  <div className="space-y-1">
                    <p className="text-amber-400 text-xs font-medium">Ejemplos:</p>
                    {tramite.ejemplos.slice(0, 4).map((ej, j) => (
                      <p key={j} className="text-gray-500 text-xs">• {ej}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-xl p-6 border border-amber-500/30">
              <h3 className="font-bold text-white mb-4">📚 Que es una Escritura Publica?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Es un documento otorgado ante notario publico con las formalidades legales, que da fe sobre
                declaraciones y acuerdos entre las partes. Tiene caracter de instrumento publico y hace plena
                fe en juicio respecto de su contenido.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">⚖️</span>
                  <p className="text-white text-sm font-medium">Fe Publica</p>
                  <p className="text-gray-500 text-xs">Valor probatorio pleno</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">📋</span>
                  <p className="text-white text-sm font-medium">Protocolo</p>
                  <p className="text-gray-500 text-xs">Archivo permanente</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3">
                  <span className="text-2xl block mb-1">✅</span>
                  <p className="text-white text-sm font-medium">Ejecutable</p>
                  <p className="text-gray-500 text-xs">Merito ejecutivo</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Calculadora de Aranceles */}
        {seccionActiva === 'aranceles' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-amber-500/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🧮</span> Calculadora de Aranceles
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-200 text-sm mb-2">Tipo de Tramite</label>
                    <select
                      value={tipoTramite}
                      onChange={(e) => setTipoTramite(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="escritura" className="bg-slate-800">Escritura Publica</option>
                      <option value="autorizacion" className="bg-slate-800">Autorizacion de Firma</option>
                      <option value="protocolizacion" className="bg-slate-800">Protocolizacion</option>
                      <option value="legalizacion" className="bg-slate-800">Legalizacion Fotocopia</option>
                      <option value="testamento" className="bg-slate-800">Testamento</option>
                      <option value="poder" className="bg-slate-800">Poder Simple</option>
                    </select>
                  </div>

                  {tipoTramite === 'escritura' && (
                    <div>
                      <label className="block text-amber-200 text-sm mb-2">Valor de la Operacion ($)</label>
                      <input
                        type="number"
                        value={valorOperacion}
                        onChange={(e) => setValorOperacion(e.target.value)}
                        placeholder="Ej: 100000000"
                        className="w-full px-4 py-3 bg-black/30 border border-amber-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">Para compraventa, hipoteca, constitucion sociedad, etc.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-amber-500/20 rounded-xl">
                  <p className="text-amber-200 text-sm mb-1">Arancel Estimado</p>
                  <p className="text-3xl font-bold text-white">{formatearPesos(calcularArancel())}</p>
                  {tipoTramite === 'escritura' && valorOperacion && (
                    <p className="text-xs text-amber-200/60 mt-2">
                      0.2% del valor con minimo de {formatearPesos(ARANCELES.escrituraMinima)}
                    </p>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Valores referenciales. Los aranceles reales pueden variar segun la notaria y complejidad del tramite.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-amber-500/20">
                <h3 className="text-lg font-bold text-white mb-4">📋 Tabla de Aranceles Referenciales</h3>

                <div className="space-y-3">
                  {[
                    { tramite: 'Escritura Publica', valor: '0.2% (min $25.000)', nota: 'Segun valor' },
                    { tramite: 'Autorizacion de Firma', valor: '$3.500', nota: 'Por firma' },
                    { tramite: 'Protocolizacion', valor: '$8.000', nota: 'Por documento' },
                    { tramite: 'Legalizacion Fotocopia', valor: '$1.500', nota: 'Por pagina' },
                    { tramite: 'Testamento Abierto', valor: '$45.000', nota: 'Incluye 2 testigos' },
                    { tramite: 'Poder Simple', valor: '$5.000', nota: 'Por documento' },
                    { tramite: 'Certificado Vigencia', valor: '$4.500', nota: 'Por certificado' },
                    { tramite: 'Copia Autorizada', valor: '$3.000', nota: 'Por pagina' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-amber-500/10">
                      <div>
                        <p className="text-white text-sm">{item.tramite}</p>
                        <p className="text-gray-500 text-xs">{item.nota}</p>
                      </div>
                      <p className="text-amber-400 font-medium">{item.valor}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-300 text-xs">
                    ⚠️ Los aranceles notariales estan regulados por el Arancel del Colegio de Notarios.
                    Algunas notarias pueden cobrar valores diferentes segun complejidad.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Documentos Requeridos */}
        {seccionActiva === 'documentos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Documentos Requeridos</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-amber-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>🏠</span> Compraventa de Inmueble
                </h3>
                <ul className="space-y-2">
                  {DOCUMENTOS.compraventa.map((doc, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">✓</span> {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-amber-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>🏢</span> Constitucion de Sociedad
                </h3>
                <ul className="space-y-2">
                  {DOCUMENTOS.sociedad.map((doc, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">✓</span> {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-amber-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>📝</span> Poderes
                </h3>
                <ul className="space-y-2">
                  {DOCUMENTOS.poderes.map((doc, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">✓</span> {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-amber-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>📋</span> Testamento
                </h3>
                <ul className="space-y-2">
                  {DOCUMENTOS.testamento.map((doc, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">✓</span> {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-blue-500/30">
              <h3 className="font-bold text-white mb-3">💡 Recomendaciones</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p>• Llevar <strong className="text-white">cedula de identidad vigente</strong></p>
                  <p>• Certificados con <strong className="text-white">menos de 30 dias</strong></p>
                  <p>• Confirmar hora con anticipacion</p>
                </div>
                <div>
                  <p>• Llevar <strong className="text-white">fotocopias de respaldo</strong></p>
                  <p>• Revisar documentos antes de firmar</p>
                  <p>• Consultar costos previamente</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Proceso de Escritura */}
        {seccionActiva === 'proceso' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Proceso de Escritura Publica</h2>

            <div className="space-y-4">
              {[
                { paso: 1, titulo: 'Solicitud y Documentos', descripcion: 'Presentar todos los documentos requeridos en la notaria. El notario verificara que esten completos y vigentes.', tiempo: '1-2 dias' },
                { paso: 2, titulo: 'Redaccion de Minuta', descripcion: 'El abogado redacta la minuta o borrador de escritura con los terminos acordados entre las partes.', tiempo: '2-5 dias' },
                { paso: 3, titulo: 'Revision y Ajustes', descripcion: 'Las partes revisan el borrador y solicitan modificaciones si es necesario. El notario verifica la legalidad.', tiempo: '1-3 dias' },
                { paso: 4, titulo: 'Firma de Escritura', descripcion: 'Las partes comparecen ante el notario para firmar. El notario lee el documento y da fe de las firmas.', tiempo: '1 hora' },
                { paso: 5, titulo: 'Pago de Aranceles', descripcion: 'Se cancelan los derechos notariales segun el tipo de escritura y valor de la operacion.', tiempo: 'Inmediato' },
                { paso: 6, titulo: 'Entrega de Copias', descripcion: 'El notario entrega copias autorizadas. El original queda en el protocolo de la notaria.', tiempo: '1-3 dias' },
                { paso: 7, titulo: 'Inscripcion (si aplica)', descripcion: 'Para inmuebles, la escritura debe inscribirse en el Conservador de Bienes Raices correspondiente.', tiempo: '5-15 dias' }
              ].map((item, i) => (
                <motion.div
                  key={item.paso}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {item.paso}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl p-4 border border-amber-500/20">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white">{item.titulo}</h3>
                      <span className="text-amber-400 text-sm">⏱️ {item.tiempo}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{item.descripcion}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-3">✅ Que SI hace el Notario</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Da fe publica de las firmas y declaraciones</li>
                  <li>• Verifica identidad de los comparecientes</li>
                  <li>• Asesora sobre formalidades legales</li>
                  <li>• Conserva el protocolo (archivo permanente)</li>
                  <li>• Emite copias autorizadas</li>
                </ul>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-3">❌ Que NO hace el Notario</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• No es abogado de las partes</li>
                  <li>• No redacta contratos (lo hace un abogado)</li>
                  <li>• No verifica la veracidad de declaraciones</li>
                  <li>• No garantiza el cumplimiento del contrato</li>
                  <li>• No inscribe en Conservador</li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Glosario Notarial</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { termino: 'Escritura Publica', definicion: 'Documento solemne otorgado ante notario que da fe publica. Tiene valor de instrumento publico y plena prueba en juicio.' },
                { termino: 'Protocolo', definicion: 'Registro cronologico donde el notario archiva todas las escrituras otorgadas. Se conserva permanentemente.' },
                { termino: 'Minuta', definicion: 'Borrador o proyecto de escritura redactado por abogado antes de ser formalizado ante notario.' },
                { termino: 'Compareciente', definicion: 'Persona que concurre ante el notario a otorgar o suscribir una escritura publica.' },
                { termino: 'Fe Publica', definicion: 'Atributo del notario que da autenticidad y certeza legal a los actos que autoriza.' },
                { termino: 'Repertorio', definicion: 'Libro donde el notario anota diariamente todos los instrumentos que autoriza.' },
                { termino: 'Protocolizacion', definicion: 'Incorporacion de un documento privado al protocolo notarial para darle fecha cierta.' },
                { termino: 'Certificacion', definicion: 'Acto por el cual el notario da fe de un hecho que le consta personalmente.' },
                { termino: 'Copia Autorizada', definicion: 'Reproduccion de una escritura con la firma y sello del notario que le da valor oficial.' },
                { termino: 'Matriz', definicion: 'Original de la escritura que queda archivado en el protocolo de la notaria.' },
                { termino: 'Indice', definicion: 'Listado alfabetico de las escrituras del protocolo para facilitar su busqueda.' },
                { termino: 'Testigo', definicion: 'Persona que presencia el otorgamiento de una escritura y da fe de su realizacion.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-amber-500/20"
                >
                  <h3 className="font-bold text-amber-400 mb-2">{item.termino}</h3>
                  <p className="text-gray-400 text-sm">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Notarias Chile - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-amber-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion referencial. Consulte directamente con la notaria para casos especificos.
          </p>
        </div>
      </footer>
    </div>
  );
}
