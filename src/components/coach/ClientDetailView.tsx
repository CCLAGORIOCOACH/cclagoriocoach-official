import React, { useState } from 'react';
import {
  ClientRecord,
  LIFE_AREAS,
  SessionRecord,
  FinalEvaluation,
  ENNEAGRAM_TYPES,
} from '../../types/coaching';
import { RadarChart } from '../charts/RadarChart';
import { VitalEnergyTrendChart } from '../charts/VitalEnergyTrendChart';
import { BeliefsComparisonBar } from '../charts/BeliefsComparisonBar';
import { MirrorEvolutionReport } from '../client/MirrorEvolutionReport';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Heart,
  Plus,
  Eye,
  EyeOff,
  Brain,
  ShieldCheck,
  Trash2,
  Clock,
  Printer,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Award,
} from 'lucide-react';

interface ClientDetailViewProps {
  client: ClientRecord;
  onBack: () => void;
  onOpenAddSession: () => void; // Abre Sesión de Feedback
  onStartLiveGuide: (sessionNumber: number) => void;
  onOpenTestsModal: () => void; // Abre Cuestionario de Mapa Interno
  onOpenFinalize: () => void;
  onTogglePublicAggregation: (clientId: string, newValue: boolean) => void;
  onPurgeClientData: (clientId: string) => void;
  onDeleteClient: (clientId: string) => void;
}

export const ClientDetailView: React.FC<ClientDetailViewProps> = ({
  client,
  onBack,
  onOpenAddSession,
  onStartLiveGuide,
  onOpenTestsModal,
  onOpenFinalize,
  onTogglePublicAggregation,
  onPurgeClientData,
  onDeleteClient,
}) => {
  // Always default to 'partida' (Mapa Interno) or 'proceso' (Sesiones) - no hardcoded mock reports!
  const [activeTab, setActiveTab] = useState<'partida' | 'proceso' | 'cierre' | 'graficos'>('partida');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);

  const { baseline, sessions, finalEvaluation } = client;

  const conflictAreaKey =
    client.retainedConflictArea ||
    baseline?.dominantDrainArea ||
    'cuerpo_mente';
  const conflictAreaConfig = LIFE_AREAS.find(a => a.key === conflictAreaKey) || LIFE_AREAS[0];

  const enneaInfo = ENNEAGRAM_TYPES.find(t => t.number === baseline.enneatype);

  // Vital decisions calculation
  const baseEnergy = Number((
    (baseline.initialVitalDecisions.nutrition +
      baseline.initialVitalDecisions.exercise +
      baseline.initialVitalDecisions.rest) /
    3
  ).toFixed(1));

  const latestEnergy = finalEvaluation
    ? Number(finalEvaluation.finalVitalDecisions.vitalEnergyScore.toFixed(1))
    : sessions.length > 0
    ? Number(sessions[sessions.length - 1].vitalDecisions.vitalEnergyScore.toFixed(1))
    : baseEnergy;

  const latestWheel = finalEvaluation
    ? finalEvaluation.lifeWheelFinal
    : sessions.length > 0
    ? sessions[sessions.length - 1].lifeWheelSnapshot
    : baseline.lifeWheel;

  const latestEmpowered = finalEvaluation
    ? finalEvaluation.empoweredBeliefsFinal
    : sessions.length > 0
    ? sessions[sessions.length - 1].empoweredBeliefsSnapshot
    : undefined;

  const consultationReasonText =
    client.consultationReason ||
    baseline.consultationReason ||
    'Exploración general de hábitos y gestión emocional';

  return (
    <div className="space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E8DFD3] shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#581420] transition-colors shrink-0"
              title="Volver al listado de clientes"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#581420]">
                  {client.clientName}
                </h2>
                <span className="font-mono text-xs font-bold bg-[#581420]/10 text-[#581420] px-2.5 py-0.5 rounded-lg">
                  {client.anonymousCode}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    client.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {client.status === 'completed' ? 'Proceso Finalizado' : 'En Curso Activo'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#6A6057] mt-1 font-sans">
                <span>{client.contactEmail}</span>
                {client.contactPhone && <span>· Tel: {client.contactPhone}</span>}
                <span>· Inicio: {client.startDate}</span>
                <span>· Programa: <strong>{client.totalSessionsPlanned} Sesiones Planificadas</strong></span>
              </div>
            </div>
          </div>

          {/* Action buttons: Las 2 Sesiones (Feedback y Mapa Interno) + Imprimir */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* BOTÓN 1: Sumar Sesión Feedback */}
            <button
              onClick={onOpenAddSession}
              className="px-4 py-2.5 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
              title="Registrar una nueva sesión de feedback con decisiones (alimentación, ejercicio, descanso) y emoción desafiante"
            >
              <Zap className="w-4 h-4 text-[#E4B062]" />
              <span>+ Sumar Sesión Feedback</span>
            </button>

            {/* BOTÓN 2: Sumar Sesión Mapa Interno */}
            <button
              onClick={onOpenTestsModal}
              className="px-4 py-2.5 bg-gradient-to-r from-[#C38B3A] to-[#D49C4B] hover:opacity-95 text-[#2B231F] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
              title="Realizar o actualizar el cuestionario de Mapa Interno (Eneatipos, Creencias en las 8 Áreas y Rueda)"
            >
              <Brain className="w-4 h-4 text-[#2B231F]" />
              <span>+ Sumar Sesión Mapa Interno</span>
            </button>

            {/* BOTÓN 3: Imprimir Informe Final */}
            <button
              onClick={() => {
                setActiveTab('cierre');
                setTimeout(() => window.print(), 250);
              }}
              className="px-3.5 py-2.5 bg-white hover:bg-[#FAF7F2] text-[#581420] border border-[#DACDC0] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
              title="Imprimir el Informe Evolutivo Comparativo para entregar al paciente"
            >
              <Printer className="w-4 h-4 text-[#C38B3A]" />
              <span className="hidden sm:inline">Imprimir Informe</span>
            </button>

            {/* Public landing toggle */}
            <button
              onClick={() => onTogglePublicAggregation(client.id, !client.isPubliclyAggregated)}
              className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                client.isPubliclyAggregated
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
              }`}
              title={client.isPubliclyAggregated ? 'Visible en métricas públicas (anónimo)' : 'Oculto de métricas públicas'}
            >
              {client.isPubliclyAggregated ? (
                <Eye className="w-4 h-4 text-emerald-600" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Motivo de Consulta Destacado */}
        <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] shrink-0 mt-0.5 bg-[#C38B3A]/10 px-2 py-0.5 rounded">
              Sesión 1 · Motivo de Consulta:
            </span>
            <p className="font-serif italic text-[#2B231F] font-medium leading-relaxed">
              "{consultationReasonText}"
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 font-mono text-[11px] text-[#6A6057]">
            <span>Sesiones registradas: <strong>{sessions.length}</strong></span>
            <span>·</span>
            <span>Energía Vital: <strong className="text-[#581420]">{latestEnergy}/10</strong></span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-2 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('partida')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'partida'
              ? 'bg-[#581420] text-white shadow-sm'
              : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
          }`}
        >
          <Brain className="w-4 h-4 text-[#E4B062]" />
          <span>1. Mapa Interno (Punto de Partida)</span>
        </button>

        <button
          onClick={() => setActiveTab('proceso')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'proceso'
              ? 'bg-[#581420] text-white shadow-sm'
              : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
          }`}
        >
          <Zap className="w-4 h-4 text-[#C38B3A]" />
          <span>2. Sesiones de Feedback ({sessions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cierre')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'cierre'
              ? 'bg-[#581420] text-white shadow-sm'
              : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
          }`}
        >
          <Printer className="w-4 h-4 text-[#C38B3A]" />
          <span>3. Informe Final & Comparativa (Entrega al Paciente)</span>
        </button>

        <button
          onClick={() => setActiveTab('graficos')}
          className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'graficos'
              ? 'bg-[#581420] text-white shadow-sm'
              : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
          }`}
        >
          <Activity className="w-4 h-4 text-[#6B705C]" />
          <span>4. Gráficos Evolutivos</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MAPA INTERNO (PUNTO DE PARTIDA) */}
      {/* ========================================================================= */}
      {activeTab === 'partida' && (
        <div className="space-y-6">
          {/* Banner de llamada al Cuestionario de Mapa Interno */}
          <div className="p-5 bg-gradient-to-r from-white to-[#FAF7F2] rounded-3xl border border-[#C38B3A]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#581420] text-[#E4B062] flex items-center justify-center font-bold shrink-0 shadow-sm">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                  Metodología ALIVE GAME · Sesión de Anclaje
                </span>
                <h3 className="font-serif font-bold text-base text-[#581420]">
                  Cuestionario de Mapa Interno (Sesión 1 & Re-Mapeo)
                </h3>
                <p className="text-xs text-[#6A6057] mt-0.5">
                  Test de Eneatipos (1 al 9), Escaneo de Creencias en las 8 Áreas de Vida y Rueda de Satisfacción.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenTestsModal}
              className="px-5 py-3 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-2xl transition-all shadow-md shrink-0 flex items-center gap-2 self-start md:self-auto active:scale-95"
            >
              <Brain className="w-4 h-4 text-[#E4B062]" />
              <span>Realizar / Modificar Cuestionario de Mapa Interno</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E4B062]" />
            </button>
          </div>

          {/* Triad Diagnostic Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Eneatipo */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DFD3] shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                Herida Decisional & Personalidad
              </span>
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-serif font-bold text-[#581420]">
                  Eneatipo {baseline.enneatype}
                </h4>
                {enneaInfo && (
                  <span className="text-xs text-[#6A6057] font-medium font-sans">
                    · {enneaInfo.name}
                  </span>
                )}
              </div>

              {enneaInfo && (
                <div className="space-y-2 text-xs text-[#2B231F] pt-1">
                  <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                    <span className="text-[10px] font-bold text-[#581420] block uppercase">Herida Nuclear Inconsciente:</span>
                    <p className="italic text-[#4A413B] mt-0.5 font-serif">"{enneaInfo.coreWound}"</p>
                  </div>
                  <div className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-200">
                    <span className="text-[10px] font-bold text-rose-900 block uppercase">Señal Somática en el Cuerpo:</span>
                    <p className="text-rose-950 mt-0.5">{enneaInfo.somaticSignal}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Área de Drenaje */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DFD3] shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                Foco Principal de Drenaje Inicial
              </span>
              <h4 className="text-xl font-serif font-bold text-[#8C3A49]">
                {conflictAreaConfig.label}
              </h4>
              <p className="text-xs text-[#6A6057] leading-relaxed">
                {conflictAreaConfig.description}
              </p>

              <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15 text-xs text-[#581420]">
                <span className="font-bold block text-[10px] uppercase">Creencia Limitante Central:</span>
                <p className="italic mt-0.5 font-serif">
                  "{baseline.beliefs[conflictAreaConfig.key]?.limitingBeliefSnippet || 'Por determinar en cuestionario'}"
                </p>
              </div>
            </div>

            {/* Card 3: Hábitos Biológicos Iniciales */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8DFD3] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                    Energía Vital de Partida
                  </span>
                  <span className="text-[10px] text-[#8C8176] font-mono">
                    ({baseline.initialVitalDecisions.nutrition} + {baseline.initialVitalDecisions.exercise} + {baseline.initialVitalDecisions.rest}) ÷ 3
                  </span>
                </div>
                <span className="text-2xl font-mono font-bold text-[#581420]">
                  {baseEnergy} <span className="text-xs text-[#8C8176]">/ 10</span>
                </span>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex justify-between items-center p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                  <span>🥗 Nutrición:</span>
                  <strong className="font-mono text-[#581420]">{baseline.initialVitalDecisions.nutrition} / 10</strong>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                  <span>🏃 Ejercicio Físico:</span>
                  <strong className="font-mono text-[#581420]">{baseline.initialVitalDecisions.exercise} / 10</strong>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                  <span>💤 Descanso:</span>
                  <strong className="font-mono text-[#581420]">{baseline.initialVitalDecisions.rest} / 10</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Radar Chart (Rueda del Mapa Interno) & Creencias */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Rueda en Radar (8 ejes) */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#E8DFD3] shadow-sm flex flex-col items-center">
              <div className="text-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                  Mapa Interno · Rueda de la Vida
                </span>
                <h4 className="text-base font-serif font-bold text-[#581420]">
                  Nivel de Satisfacción en las 8 Áreas de Vida
                </h4>
                <p className="text-xs text-[#6A6057]">
                  Evaluación inicial que conforma el punto de partida emocional
                </p>
              </div>

              <RadarChart
                initialData={baseline.lifeWheel}
                currentData={latestWheel}
                initialLabel="Inicio (Punto de Partida)"
                currentLabel="Actual / Re-Mapeo"
                size={340}
              />
            </div>

            {/* Creencias Limitantes vs Empoderadas */}
            <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#E8DFD3] shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                  Escaneo de Creencias por Área
                </span>
                <h4 className="text-base font-serif font-bold text-[#581420]">
                  Porcentaje de Creencias Limitantes vs Empoderadas
                </h4>
              </div>

              <BeliefsComparisonBar
                initialBeliefs={baseline.beliefs}
                currentEmpoweredSnapshots={latestEmpowered}
                showSnippets={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SESIONES DE FEEDBACK */}
      {/* ========================================================================= */}
      {activeTab === 'proceso' && (
        <div className="space-y-5">
          {/* Header of Tab 2 with Direct Buttons */}
          <div className="bg-white p-5 rounded-3xl border border-[#E8DFD3] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-base text-[#581420]">
                Historial de Sesiones Registradas
              </h3>
              <p className="text-xs text-[#6A6057]">
                Medición sesión a sesión de decisiones (alimentación, ejercicio, descanso), gestión emocional y tareas pendientes.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenAddSession}
                className="px-4 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-[#E4B062]" />
                <span>+ Sumar Sesión Feedback</span>
              </button>

              <button
                onClick={onOpenTestsModal}
                className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EADBCA] text-[#581420] border border-[#DACDC0] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
              >
                <Brain className="w-3.5 h-3.5 text-[#C38B3A]" />
                <span>+ Sumar Sesión Mapa Interno</span>
              </button>
            </div>
          </div>

          {sessions.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DFD3] shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#581420]/10 text-[#581420] flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-[#C38B3A]" />
              </div>
              <h4 className="text-lg font-serif font-bold text-[#581420]">
                Aún no hay sesiones de feedback intermedias registradas
              </h4>
              <p className="text-xs text-[#6A6057] max-w-md mx-auto">
                Suma una sesión de feedback para medir cómo estuvieron sus decisiones con respecto a la alimentación, el ejercicio físico y el descanso, y la emoción que necesitó gestionar.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onOpenAddSession}
                  className="px-5 py-2.5 bg-[#581420] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#6D1B29] transition-all flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-[#E4B062]" />
                  <span>+ Sumar Primera Sesión Feedback</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-3xl p-6 border border-[#E8DFD3] shadow-sm hover:border-[#C38B3A]/40 transition-all space-y-4"
                >
                  {/* Session Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2ECE3] gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#581420] text-white font-serif font-bold text-sm flex items-center justify-center shadow-2xs">
                        #{session.sessionNumber}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base text-[#581420]">
                            Sesión {session.sessionNumber}
                          </h4>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              session.sessionType === 'mapa_interno'
                                ? 'bg-[#C38B3A]/20 text-[#581420]'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {session.sessionType === 'mapa_interno' ? 'Sesión de Mapa Interno' : 'Sesión de Feedback'}
                          </span>
                        </div>
                        <span className="text-xs text-[#8C8176]">Fecha: {session.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {session.vitalDecisions.overallDecisionsQuality && (
                        <div className="text-right bg-[#581420]/5 px-3 py-1 rounded-xl border border-[#581420]/15">
                          <span className="text-[10px] text-[#581420] block uppercase font-bold">
                            Calidad Global
                          </span>
                          <span className="font-mono font-bold text-[#581420] text-sm">
                            {session.vitalDecisions.overallDecisionsQuality} / 10
                          </span>
                        </div>
                      )}

                      <div className="text-right">
                        <span className="text-[10px] text-[#8C8176] block uppercase font-semibold">
                          Energía Vital
                        </span>
                        <span className="font-mono font-bold text-[#581420] text-base">
                          {session.vitalDecisions.vitalEnergyScore} / 10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Topic banner if exists */}
                  {session.sessionTopic && (
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] text-xs">
                      <span className="text-[10px] font-bold text-[#C38B3A] uppercase block">
                        Tema Abordado en la Sesión:
                      </span>
                      <p className="font-serif italic font-medium text-[#2B231F] mt-0.5">
                        "{session.sessionTopic}"
                      </p>
                    </div>
                  )}

                  {/* Session Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Decisions */}
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA] space-y-2">
                      <span className="font-bold text-[#581420] block uppercase tracking-wider text-[10px]">
                        Decisiones en Hábitos
                      </span>
                      <div className="flex justify-between text-[#4A413B]">
                        <span>🥗 Alimentación:</span>
                        <b className="font-mono">{session.vitalDecisions.nutrition} / 10</b>
                      </div>
                      <div className="flex justify-between text-[#4A413B]">
                        <span>🏃 Ejercicio:</span>
                        <b className="font-mono">{session.vitalDecisions.exercise} / 10</b>
                      </div>
                      <div className="flex justify-between text-[#4A413B]">
                        <span>💤 Descanso:</span>
                        <b className="font-mono">{session.vitalDecisions.rest} / 10</b>
                      </div>
                      {session.vitalDecisions.decisionNotes && (
                        <p className="text-[11px] text-[#6A6057] italic pt-1 border-t border-[#E8DFD3]">
                          "{session.vitalDecisions.decisionNotes}"
                        </p>
                      )}
                    </div>

                    {/* Emotional Management */}
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA] space-y-2">
                      <span className="font-bold text-[#8C3A49] block uppercase tracking-wider text-[10px]">
                        Gestión Emocional
                      </span>
                      <div className="text-[#2B231F]">
                        <span className="text-[#8C8176] block text-[10px]">Emoción desafiante a entender:</span>
                        <b className="text-sm font-serif text-[#8C3A49]">
                          {session.emotionalManagement.hardestEmotionToManage || session.emotionalManagement.predominantEmotion}
                        </b>
                        <span className="font-mono text-xs ml-1 text-gray-500">
                          ({session.emotionalManagement.intensity}/10)
                        </span>
                      </div>
                      {session.emotionalManagement.neuroplasticityToolApplied && (
                        <div className="text-[11px] text-[#4A413B] pt-1">
                          <span className="text-[10px] text-[#8C8176] block">Técnica aplicada:</span>
                          <p className="font-medium">{session.emotionalManagement.neuroplasticityToolApplied}</p>
                        </div>
                      )}
                    </div>

                    {/* Next Task & Coach Notes */}
                    <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA] space-y-2">
                      <span className="font-bold text-[#581420] block uppercase tracking-wider text-[10px]">
                        Tarea Pendiente & Notas
                      </span>
                      {session.actionCommitment && (
                        <div className="p-2.5 bg-white rounded-xl border border-[#EADBCA]">
                          <span className="text-[10px] font-bold text-[#6B705C] uppercase block">
                            Tarea para el día siguiente:
                          </span>
                          <p className="font-medium text-[#2B231F] mt-0.5">{session.actionCommitment}</p>
                        </div>
                      )}
                      {session.coachObservations && (
                        <p className="text-[11px] text-[#6A6057] italic">
                          "{session.coachObservations}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INFORME FINAL & COMPARATIVA (ENTREGA AL PACIENTE) */}
      {/* ========================================================================= */}
      {activeTab === 'cierre' && (
        <div className="space-y-4">
          <MirrorEvolutionReport
            client={client}
            onPrintReport={() => window.print()}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GRÁFICOS EVOLUTIVOS */}
      {/* ========================================================================= */}
      {activeTab === 'graficos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD3] shadow-sm">
            <h4 className="font-serif font-bold text-base text-[#581420] mb-2">
              Tendencia de Energía Vital & Calidad de Decisiones
            </h4>
            <VitalEnergyTrendChart
              baseline={baseline}
              sessions={sessions}
            />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD3] shadow-sm">
            <h4 className="font-serif font-bold text-base text-[#581420] mb-2">
              Rueda de la Vida (Satisfacción Inicial vs Evolución Actual en las 8 Áreas)
            </h4>
            <RadarChart
              initialData={baseline.lifeWheel}
              currentData={latestWheel}
              size={360}
            />
          </div>
        </div>
      )}
    </div>
  );
};
