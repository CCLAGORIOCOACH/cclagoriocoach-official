import React, { useState } from 'react';
import { ClientRecord, LIFE_AREAS } from '../../types/coaching';
import {
  Users,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  X,
  Lock,
} from 'lucide-react';

interface CoachDashboardProps {
  clients: ClientRecord[];
  onSelectClient: (client: ClientRecord) => void;
  onOpenNewClient: () => void;
  onStartLiveGuide?: (client: ClientRecord, sessionNumber: number) => void;
  onTogglePublicAggregation: (clientId: string, newValue: boolean) => void;
  onResetSeedData: () => void;
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({
  clients,
  onSelectClient,
  onOpenNewClient,
  onStartLiveGuide,
  onTogglePublicAggregation,
  onResetSeedData,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'purged'>('all');
  const [filterProgram, setFilterProgram] = useState<'all' | '1' | '6' | '10'>('all');
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Filtering
  const filteredClients = clients.filter(c => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.anonymousCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.transformationalSession?.specificTopic && c.transformationalSession.specificTopic.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'purged'
        ? Boolean(c.isDataPurged)
        : c.status === filterStatus;

    const matchesProgram =
      filterProgram === 'all'
        ? true
        : c.totalSessionsPlanned === parseInt(filterProgram);

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Macro counters
  const activeCount = clients.filter(c => c.status === 'active').length;
  const completedCount = clients.filter(c => c.status === 'completed').length;
  const publicCount = clients.filter(c => c.isPubliclyAggregated).length;

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#8C8176] block uppercase tracking-wider">
              Total Clientes
            </span>
            <span className="text-2xl font-serif font-bold text-[#581420] mt-0.5 block">
              {clients.length}
            </span>
            <span className="text-[11px] text-[#6A6057]">Expedientes registrados</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#581420]/10 flex items-center justify-center text-[#581420]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#8C8176] block uppercase tracking-wider">
              En Curso Activo
            </span>
            <span className="text-2xl font-serif font-bold text-amber-700 mt-0.5 block">
              {activeCount}
            </span>
            <span className="text-[11px] text-[#6A6057]">Sesiones en progreso</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#8C8176] block uppercase tracking-wider">
              Completados
            </span>
            <span className="text-2xl font-serif font-bold text-emerald-800 mt-0.5 block">
              {completedCount}
            </span>
            <span className="text-[11px] text-[#6A6057]">Con re-mapeo final</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#8C8176] block uppercase tracking-wider">
              Publicación Web
            </span>
            <span className="text-2xl font-serif font-bold text-[#C38B3A] mt-0.5 block">
              {publicCount} / {clients.length}
            </span>
            <span className="text-[11px] text-[#6A6057]">Alimentan landing</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#C38B3A]/10 flex items-center justify-center text-[#C38B3A]">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Control bar: Search, filters, New client CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DFD3] shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#8C8176] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, código anónimo o email..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
          />
        </div>

        {/* Filter controls & Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#DACDC0]">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-white text-[#581420] shadow-sm font-bold'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                filterStatus === 'active'
                  ? 'bg-white text-[#581420] shadow-sm font-bold'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              En Curso
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-white text-[#581420] shadow-sm font-bold'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              Finalizados
            </button>
            <button
              onClick={() => setFilterStatus('purged')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors flex items-center gap-1 ${
                filterStatus === 'purged'
                  ? 'bg-emerald-800 text-white shadow-sm font-bold'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Solo Contacto</span>
            </button>
          </div>

          {/* Program filter */}
          <select
            value={filterProgram}
            onChange={e => setFilterProgram(e.target.value as any)}
            className="px-3 py-1.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-medium text-[#4A413B] outline-none"
          >
            <option value="all">Todos los Programas</option>
            <option value="1">Sesión Única (75 min)</option>
            <option value="6">Programa 6 Sesiones</option>
            <option value="10">Programa 10 Sesiones</option>
          </select>

          {/* Privacy & Storage Explainer Button */}
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
            title="Conoce dónde residen los datos y cómo opera la política de retención mínima"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Privacidad de Datos</span>
          </button>

          {/* Reset seed data button */}
          <button
            onClick={onResetSeedData}
            className="p-2 text-[#8C8176] hover:text-[#581420] rounded-xl hover:bg-[#FAF7F2] transition-colors"
            title="Recargar datos clínicos demo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* New Client CTA */}
          <button
            onClick={onOpenNewClient}
            className="px-4 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#E4B062]" />
            <span>Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* Client List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map(client => {
          const baseEnergy = Number((
            (client.baseline.initialVitalDecisions.nutrition +
              client.baseline.initialVitalDecisions.exercise +
              client.baseline.initialVitalDecisions.rest) /
            3
          ).toFixed(1));

          const curEnergy = client.finalEvaluation
            ? Number(client.finalEvaluation.finalVitalDecisions.vitalEnergyScore.toFixed(1))
            : (client.sessions.length > 0
                ? Number(client.sessions[client.sessions.length - 1].vitalDecisions.vitalEnergyScore.toFixed(1))
                : baseEnergy);

          const energyDiff = Number((curEnergy - baseEnergy).toFixed(1));

          const conflictAreaKey =
            client.retainedConflictArea ||
            client.transformationalSession?.diagnosticSnapshot?.areaKey ||
            client.baseline?.dominantDrainArea ||
            'cuerpo_mente';
          const conflictAreaConfig = LIFE_AREAS.find(a => a.key === conflictAreaKey) || LIFE_AREAS[0];

          return (
            <div
              key={client.id}
              onClick={() => onSelectClient(client)}
              className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-sm hover:shadow-md hover:border-[#C38B3A]/60 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header card info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-[#581420]/10 text-[#581420] px-2 py-0.5 rounded-md">
                        {client.anonymousCode}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          client.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {client.status === 'completed' ? 'Completado' : 'En Curso'}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-[#2B231F] mt-1.5 group-hover:text-[#581420] transition-colors">
                      {client.clientName}
                    </h3>
                    <span className="text-[11px] text-[#8C8176]">
                      {client.programType === 'sesion_unica_75' || client.totalSessionsPlanned === 1
                        ? 'Sesión Única (75 min)'
                        : `Programa ${client.totalSessionsPlanned} Sesiones`} · Eneatipo {client.baseline.enneatype}
                    </span>

                    {/* Conflict area & purged badge */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] font-semibold bg-[#FAF7F2] text-[#581420] border border-[#E8DFD3] px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span>🎯 Conflicto:</span>
                        <strong className="font-bold">{conflictAreaConfig.shortLabel}</strong>
                      </span>
                      {client.isDataPurged && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-700" />
                          <span>Solo Contacto Retenido</span>
                        </span>
                      )}
                    </div>

                    {client.transformationalSession?.specificTopic && (
                      <div className="text-[10px] text-[#581420] italic truncate mt-1 bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFD3]/60 max-w-[200px]" title={client.transformationalSession.specificTopic}>
                        🎯 "{client.transformationalSession.specificTopic}"
                      </div>
                    )}
                  </div>

                  {/* Public Visibility Toggle */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onTogglePublicAggregation(client.id, !client.isPubliclyAggregated);
                    }}
                    className={`p-1.5 rounded-lg border text-xs transition-colors ${
                      client.isPubliclyAggregated
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                    }`}
                    title={
                      client.isPubliclyAggregated
                        ? 'Publicando en métricas agregadas anónimas'
                        : 'Oculto de métricas públicas'
                    }
                  >
                    {client.isPubliclyAggregated ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Progress bar of sessions */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-[#6A6057]">
                    <span>Sesiones Realizadas:</span>
                    <span className="font-mono font-bold text-[#581420]">
                      {client.sessions.length} / {client.totalSessionsPlanned}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#EFE8DE] overflow-hidden">
                    <div
                      style={{
                        width: `${Math.min(
                          100,
                          (client.sessions.length / client.totalSessionsPlanned) * 100
                        )}%`,
                      }}
                      className="h-full bg-[#581420] rounded-full transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Key indicators row */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F2ECE3] text-xs">
                  <div className="bg-[#FAF7F2] p-2 rounded-lg border border-[#EADBCA]">
                    <span className="text-[10px] text-[#8C8176] block uppercase font-semibold">
                      Energía Vital
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-mono font-bold text-[#581420] text-sm">
                        {curEnergy}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 font-bold">
                        ({energyDiff >= 0 ? `+${energyDiff}` : energyDiff})
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] p-2 rounded-lg border border-[#EADBCA]">
                    <span className="text-[10px] text-[#8C8176] block uppercase font-semibold">
                      Área en Conflicto
                    </span>
                    <span className="text-xs font-semibold text-[#8C3A49] block truncate mt-0.5">
                      {conflictAreaConfig ? conflictAreaConfig.shortLabel : conflictAreaKey}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom CTA trigger */}
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-xs font-semibold gap-2">
                <span className="text-[#581420] flex items-center gap-1 group-hover:text-[#771C2E]">
                  <span>Historia Clínica</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#C38B3A]" />
                </span>

                {onStartLiveGuide && client.status !== 'completed' && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      onStartLiveGuide(client, client.sessions.length + 1);
                    }}
                    className="px-2.5 py-1 bg-[#581420] text-white rounded-lg text-[11px] font-bold hover:bg-[#771C2E] transition-all flex items-center gap-1 shadow-sm active:scale-95"
                  >
                    <span>▶ Sesión {client.sessions.length + 1} en Vivo</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredClients.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFD3] shadow-sm space-y-3">
          <Users className="w-12 h-12 text-[#8C8176] mx-auto opacity-50" />
          <h3 className="text-lg font-serif font-bold text-[#581420]">
            No se encontraron clientes con esos filtros
          </h3>
          <p className="text-xs text-[#6A6057] max-w-sm mx-auto">
            Prueba ajustando los términos de búsqueda o registra un nuevo cliente en el programa.
          </p>
          <button
            onClick={onOpenNewClient}
            className="mt-2 px-5 py-2 bg-[#581420] text-white text-xs font-bold rounded-xl shadow-md"
          >
            + Registrar Nuevo Cliente
          </button>
        </div>
      )}

      {/* Privacy & Data Storage Modal for Coach */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#F9F6F0] rounded-3xl border border-[#E4DACD] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#581420] text-white p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-[#C38B3A]/30">
                  <ShieldCheck className="w-6 h-6 text-[#E4B062]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    Almacenamiento de Datos & Privacidad
                  </h3>
                  <p className="text-xs text-[#E4B062]">
                    Arquitectura segura de ALIVE GAME · Política de Retención Mínima
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#4A413B]">
              {/* Question 1: Where is data stored? */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] space-y-2">
                <div className="flex items-center gap-2 text-[#581420] font-bold text-sm font-serif">
                  <Lock className="w-4 h-4 text-[#C38B3A]" />
                  <span>1. ¿Dónde se guardan los datos de cada cliente?</span>
                </div>
                <p className="leading-relaxed text-[#4A413B]">
                  Los datos se guardan en dos capas seguras diseñadas para velocidad y disponibilidad:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[#2B231F]">
                  <li>
                    <strong>Almacenamiento Local Seguro (`localStorage`):</strong> En el navegador de tu dispositivo. Esto permite que la web app cargue de inmediato, funcione fluido como una app móvil nativa y nunca dependa de llamadas lentas a servidores.
                  </li>
                  <li>
                    <strong>Sincronización en la Nube (API REST ALIVE GAME):</strong> Se sincroniza automáticamente con el servicio de backend privado para que no pierdas información si cambias de equipo o recargas la aplicación.
                  </li>
                </ul>
              </div>

              {/* Question 2: Data minimization policy */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm font-serif">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>2. Tu Política de Retención Mínima (Post-Proceso)</span>
                </div>
                <p className="leading-relaxed text-emerald-900">
                  Exactamente como lo solicitas: <strong>una vez que un cliente termina su proceso, no es necesario acumular notas clínicas privadas</strong>. Puedes purgar el expediente con 1 solo clic desde su ficha o en el cierre evolutivo.
                </p>
                <div className="bg-white p-3 rounded-xl border border-emerald-200 mt-2">
                  <strong className="text-emerald-950 block text-[11px] uppercase tracking-wide">
                    ÚNICOS 4 DATOS QUE SE CONSERVAN:
                  </strong>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-medium text-[#2B231F]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 1. Nombre completo
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 2. Correo electrónico
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 3. Teléfono de contacto
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 4. Área de vida en conflicto
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-800 italic mt-1">
                  Todo lo demás (cuestionarios de eneatipos, creencias, notas de sesión, estímulos de infancia y observaciones privadas) es purgado de manera definitiva e irreversible.
                </p>
              </div>

              {/* Question 3: Public Landing privacy */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] space-y-2">
                <div className="flex items-center gap-2 text-[#581420] font-bold text-sm font-serif">
                  <Sparkles className="w-4 h-4 text-[#C38B3A]" />
                  <span>3. ¿Qué ve la Landing Pública (cclagoriocoach.com)?</span>
                </div>
                <p className="leading-relaxed text-[#4A413B]">
                  La landing pública <strong>NUNCA tiene acceso a nombres, correos ni teléfonos</strong> de ningún cliente. La vitrina pública solo consume promedios numéricos agregados y anónimos (ejemplo: +43% en energía vital, 85% de creencias empoderadas, distribución de emociones reguladas) para transmitir confianza empírica y respaldar tu autoridad científica.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-6 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
