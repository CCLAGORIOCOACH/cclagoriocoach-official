import React, { useState } from 'react';
import { ClientRecord, LIFE_AREAS, SessionRecord, FinalEvaluation } from '../../types/coaching';
import { RadarChart } from '../charts/RadarChart';
import { VitalEnergyTrendChart } from '../charts/VitalEnergyTrendChart';
import { BeliefsComparisonBar } from '../charts/BeliefsComparisonBar';
import { MirrorEvolutionReport } from '../client/MirrorEvolutionReport';
import { TransformationalSessionReport } from '../client/TransformationalSessionReport';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Zap,
  Heart,
  Plus,
  Award,
  CheckCircle,
  Eye,
  EyeOff,
  UserCheck,
  Brain,
  ShieldCheck,
  Trash2,
  Share2,
  Clock,
  Target,
  X,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface ClientDetailViewProps {
  client: ClientRecord;
  onBack: () => void;
  onOpenAddSession: () => void;
  onStartLiveGuide: (sessionNumber: number) => void;
  onOpenTestsModal: () => void;
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
  const isTransformational = client.programType === 'sesion_unica_75' || client.totalSessionsPlanned === 1;
  const [activeTab, setActiveTab] = useState<'proceso' | 'partida' | 'graficos' | 'cierre' | 'transformadora'>(
    isTransformational ? 'transformadora' : 'proceso'
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPurgeModalOpen, setIsPurgeModalOpen] = useState(false);

  const conflictAreaKey =
    client.retainedConflictArea ||
    client.transformationalSession?.diagnosticSnapshot?.areaKey ||
    client.baseline?.dominantDrainArea ||
    'cuerpo_mente';
  const conflictAreaConfig = LIFE_AREAS.find(a => a.key === conflictAreaKey) || LIFE_AREAS[0];

  const { baseline, sessions, finalEvaluation } = client;

  // Compute latest scores
  const baseEnergy = Number((
    (baseline.initialVitalDecisions.nutrition +
      baseline.initialVitalDecisions.exercise +
      baseline.initialVitalDecisions.rest) /
    3
  ).toFixed(1));

  const latestEnergy = isTransformational && client.transformationalSession
    ? client.transformationalSession.finalVitalEnergy
    : finalEvaluation
    ? Number(finalEvaluation.finalVitalDecisions.vitalEnergyScore.toFixed(1))
    : (sessions.length > 0 ? Number(sessions[sessions.length - 1].vitalDecisions.vitalEnergyScore.toFixed(1)) : baseEnergy);

  // Latest wheel
  const latestWheel = finalEvaluation
    ? finalEvaluation.lifeWheelFinal
    : (sessions.length > 0 ? sessions[sessions.length - 1].lifeWheelSnapshot : baseline.lifeWheel);

  // Latest empowered snapshot
  const latestEmpowered = finalEvaluation
    ? finalEvaluation.empoweredBeliefsFinal
    : (sessions.length > 0 ? sessions[sessions.length - 1].empoweredBeliefsSnapshot : undefined);

  return (
    <div className="space-y-6">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#E8DFD3] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#581420] transition-colors"
            title="Volver al listado"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-[#581420]">
                {client.clientName}
              </h2>
              <span className="font-mono text-xs font-bold bg-[#581420]/10 text-[#581420] px-2 py-0.5 rounded-md">
                {client.anonymousCode}
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  client.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {client.status === 'completed' ? 'Programa Completado' : 'En Curso Activo'}
              </span>
              {isTransformational && (
                <span className="bg-[#E4B062]/20 text-[#581420] border border-[#C38B3A]/30 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C38B3A]" />
                  <span>Sesión Única (75 min)</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6A6057] mt-1">
              <span>{client.contactEmail}</span>
              {client.contactPhone && <span>· {client.contactPhone}</span>}
              <span>· Fecha: {client.startDate}</span>
              <span>· Formato: {isTransformational ? 'Sesión Transformadora de 75 min' : `${client.totalSessionsPlanned} Sesiones`}</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Public toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Public aggregation toggle */}
          <button
            onClick={() => onTogglePublicAggregation(client.id, !client.isPubliclyAggregated)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              client.isPubliclyAggregated
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            }`}
            title="Determina si este cliente se computa en el promedio de la landing pública de cclagoriocoach.com"
          >
            {client.isPubliclyAggregated ? (
              <>
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Visible en Landing Pública</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                <span>Oculto de Landing Pública</span>
              </>
            )}
          </button>

          {/* Add session or finalize */}
          {isTransformational ? (
            <>
              <button
                onClick={onOpenTestsModal}
                className="px-3.5 py-2 bg-white hover:bg-[#FAF7F2] text-[#581420] text-xs font-bold rounded-xl transition-all shadow-sm border border-[#DACDC0] flex items-center gap-1.5"
                title="Abrir la batería de cuestionarios diagnósticos completa"
              >
                <Brain className="w-4 h-4 text-[#C38B3A]" />
                <span className="hidden sm:inline">Cuestionarios</span>
              </button>

              <button
                onClick={() => onStartLiveGuide(1)}
                className="px-4 py-2 bg-gradient-to-r from-[#581420] to-[#771C2E] hover:from-[#45101A] hover:to-[#581420] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 border border-[#C38B3A]/40 active:scale-95"
                title="Abre el protocolo guiado de sesión de 75 minutos en vivo"
              >
                <span className="w-2 h-2 rounded-full bg-[#E4B062] animate-pulse" />
                <span>▶ {client.transformationalSession ? 'Editar Guía de Sesión (75 min)' : 'Iniciar Sesión en Vivo (75 min)'}</span>
              </button>

              {client.transformationalSession && (
                <button
                  onClick={() => setActiveTab('transformadora')}
                  className="px-3 py-2 bg-[#C38B3A] hover:bg-[#D49C4B] text-[#2B231F] text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Ver Informe 75 min</span>
                </button>
              )}
            </>
          ) : client.status !== 'completed' && (
            <>
              <button
                onClick={onOpenTestsModal}
                className="px-3.5 py-2 bg-white hover:bg-[#FAF7F2] text-[#581420] text-xs font-bold rounded-xl transition-all shadow-sm border border-[#DACDC0] flex items-center gap-1.5"
                title="Abrir la batería de cuestionarios diagnósticos completa (Eneatipo, Creencias en las 7 Áreas y Rueda)"
              >
                <Brain className="w-4 h-4 text-[#C38B3A]" />
                <span className="hidden sm:inline">Cuestionarios</span>
                <span>Mapa Interno</span>
              </button>

              <button
                onClick={() => onStartLiveGuide(sessions.length + 1)}
                className="px-4 py-2 bg-gradient-to-r from-[#581420] to-[#771C2E] hover:from-[#45101A] hover:to-[#581420] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 border border-[#C38B3A]/40 active:scale-95"
                title="Abre el protocolo guiado de sesión de coaching en vivo"
              >
                <span className="w-2 h-2 rounded-full bg-[#E4B062] animate-pulse" />
                <span>▶ Iniciar Sesión {sessions.length + 1} en Vivo (Guía Coach)</span>
              </button>

              <button
                onClick={onOpenFinalize}
                className="px-3 py-2 bg-[#C38B3A] hover:bg-[#D49C4B] text-[#2B231F] text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Cierre Evolutivo</span>
              </button>
            </>
          )}

          {/* Purge clinical data button if not yet purged */}
          {!client.isDataPurged && (
            <button
              onClick={() => setIsPurgeModalOpen(true)}
              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition-colors border border-emerald-300 shadow-2xs flex items-center gap-1.5"
              title="Elimina permanentemente notas de sesión y cuestionarios, reteniendo únicamente Nombre, Correo, Teléfono y Área en conflicto"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Purgar Expediente</span>
              <span className="sm:hidden">Purgar</span>
            </button>
          )}

          {/* Delete prompt */}
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDeleteClient(client.id)}
                className="px-2.5 py-1.5 bg-red-600 text-white text-xs rounded-lg font-bold"
              >
                Confirmar
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-2 py-1.5 text-xs text-gray-500"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Eliminar cliente"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Retained Minimal Card if data was purged */}
      {client.isDataPurged && (
        <div className="bg-gradient-to-br from-emerald-50 via-[#FAF7F2] to-amber-50/40 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-emerald-200/80">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-bold text-emerald-950">
                    Ficha Mínima Retenida Post-Proceso
                  </h3>
                  <span className="text-[10px] font-mono font-bold bg-emerald-200/90 text-emerald-900 px-2.5 py-0.5 rounded-full">
                    Política de Retención Mínima Cumplida
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Las notas clínicas, cuestionarios, estímulos de infancia y observaciones privadas han sido eliminados de forma irreversible.
                </p>
              </div>
            </div>

            <div className="text-right text-[11px] text-emerald-900 font-mono">
              <span>Depurado: </span>
              <strong>{client.purgedAt ? new Date(client.purgedAt).toLocaleDateString() : 'Proceso Finalizado'}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                1. Nombre del Cliente
              </span>
              <span className="text-base font-bold text-[#2B231F] mt-1 block">
                {client.clientName}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Código anónimo: {client.anonymousCode}</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                2. Correo Electrónico
              </span>
              <a href={`mailto:${client.contactEmail}`} className="text-xs font-semibold text-[#581420] hover:underline mt-1 block truncate">
                {client.contactEmail}
              </a>
              <span className="text-[10px] text-gray-500">Para tu base de contactos</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                3. Teléfono de Contacto
              </span>
              <span className="text-xs font-semibold text-[#2B231F] mt-1 block">
                {client.contactPhone || 'No registrado'}
              </span>
              <span className="text-[10px] text-gray-500">Móvil / WhatsApp</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                4. Área de Vida en Conflicto
              </span>
              <span className="text-xs font-bold text-[#581420] mt-1 block">
                {conflictAreaConfig.label}
              </span>
              <span className="text-[10px] text-[#6A6057] block truncate">{conflictAreaConfig.description}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8DFD3] pb-2 text-xs font-semibold overflow-x-auto">
        {isTransformational ? (
          <>
            <button
              onClick={() => setActiveTab('transformadora')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'transformadora'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#E4B062]" />
              <span>Informe Sesión Transformadora (75 min)</span>
            </button>

            <button
              onClick={() => setActiveTab('partida')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'partida'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              Punto de Partida (Diagnóstico)
            </button>

            <button
              onClick={() => setActiveTab('graficos')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'graficos'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              Métricas & Rueda
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('proceso')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'proceso'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              Proceso & Sesiones ({sessions.length})
            </button>

            <button
              onClick={() => setActiveTab('partida')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'partida'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              Punto de Partida (Evaluación Inicial)
            </button>

            <button
              onClick={() => setActiveTab('graficos')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'graficos'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              Gráficos Evolutivos
            </button>

            <button
              onClick={() => setActiveTab('cierre')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeTab === 'cierre'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F] hover:bg-white'
              }`}
            >
              Punto de Llegada (Informe Espejo)
            </button>
          </>
        )}
      </div>

      {/* TAB TRANSFORMADORA (75 MIN) */}
      {isTransformational && activeTab === 'transformadora' && (
        <div className="space-y-6">
          <TransformationalSessionReport client={client} />
        </div>
      )}

      {/* TAB 1: PROCESO & SESIONES */}
      {activeTab === 'proceso' && (
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFD3] shadow-sm space-y-3">
              <Zap className="w-12 h-12 text-[#C38B3A] mx-auto opacity-70" />
              <h3 className="text-lg font-serif font-bold text-[#581420]">
                Aún no hay sesiones intermedias registradas
              </h3>
              <p className="text-xs text-[#6A6057] max-w-md mx-auto">
                Registra la primera sesión para medir los hábitos biológicos (nutrición, ejercicio, descanso) y la emoción predominante.
              </p>
              <button
                onClick={() => onStartLiveGuide(1)}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-[#581420] to-[#771C2E] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-all flex items-center gap-2 mx-auto"
              >
                <span>▶ Iniciar Sesión 1 con Guía Coach (Cuestionario Mapa Interno)</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session, idx) => (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl p-5 border border-[#E8DFD3] shadow-sm hover:border-[#C38B3A]/40 transition-colors space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2ECE3] gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#581420] text-white font-serif font-bold text-xs flex items-center justify-center">
                        {session.sessionNumber}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#581420]">
                          Sesión {session.sessionNumber}
                        </h4>
                        <span className="text-xs text-[#8C8176]">Fecha: {session.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      {session.vitalDecisions.overallDecisionsQuality && (
                        <div className="text-right bg-[#581420]/5 px-2.5 py-1 rounded-lg border border-[#581420]/15">
                          <span className="text-[10px] text-[#581420] block uppercase font-semibold">
                            Calidad Decisiones
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

                      <div className="text-right">
                        <span className="text-[10px] text-[#8C8176] block uppercase font-semibold">
                          Emoción
                        </span>
                        <span className="font-semibold text-[#8C3A49]">
                          {session.emotionalManagement.predominantEmotion} ({session.emotionalManagement.intensity}/10)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Previous Task Feedback banner if present */}
                  {session.previousTaskFeedback && (
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-[#C38B3A] shrink-0 uppercase text-[10px] mt-0.5">
                          Feedback Tarea Anterior:
                        </span>
                        <div>
                          <p className="font-medium text-[#2B231F]">
                            "{session.previousTaskFeedback.taskDescription}"
                          </p>
                          {session.previousTaskFeedback.clientFeedbackNotes && (
                            <p className="text-[11px] text-[#6A6057] italic mt-0.5">
                              Respuesta: {session.previousTaskFeedback.clientFeedbackNotes}
                            </p>
                          )}
                          {session.previousTaskFeedback.boicotPatternIdentified && (
                            <p className="text-[11px] text-[#8C3A49] font-semibold mt-0.5">
                              Boicot detectado: {session.previousTaskFeedback.boicotPatternIdentified}
                            </p>
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                          session.previousTaskFeedback.completionStatus === 'cumplida_total'
                            ? 'bg-emerald-100 text-emerald-800'
                            : session.previousTaskFeedback.completionStatus === 'cumplida_parcial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {session.previousTaskFeedback.completionStatus === 'cumplida_total'
                          ? '✓ Cumplida'
                          : session.previousTaskFeedback.completionStatus === 'cumplida_parcial'
                          ? '⚠ Parcial'
                          : '✕ Boicot'}
                      </span>
                    </div>
                  )}

                  {/* Session Grid Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
                    {/* Decisions */}
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] space-y-2">
                      <span className="font-bold text-[#581420] block uppercase tracking-wider text-[10px]">
                        Decisiones Vitales
                      </span>
                      <div className="flex justify-between text-[#4A413B]">
                        <span>🥗 Nutrición:</span>
                        <b className="font-mono">{session.vitalDecisions.nutrition}/10</b>
                      </div>
                      <div className="flex justify-between text-[#4A413B]">
                        <span>🏃 Ejercicio:</span>
                        <b className="font-mono">{session.vitalDecisions.exercise}/10</b>
                      </div>
                      <div className="flex justify-between text-[#4A413B]">
                        <span>💤 Descanso:</span>
                        <b className="font-mono">{session.vitalDecisions.rest}/10</b>
                      </div>
                      {session.vitalDecisions.decisionNotes && (
                        <p className="text-[11px] text-[#6A6057] italic pt-1 border-t border-[#EADBCA]">
                          "{session.vitalDecisions.decisionNotes}"
                        </p>
                      )}
                    </div>

                    {/* Emotional Management */}
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] space-y-2">
                      <span className="font-bold text-[#581420] block uppercase tracking-wider text-[10px]">
                        Neuroplasticidad Aplicada
                      </span>
                      <p className="text-[#2B231F] font-medium">
                        {session.emotionalManagement.neuroplasticityToolApplied}
                      </p>
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-[#8C8176]">¿Interfirió en decisiones?:</span>
                        <span
                          className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                            session.emotionalManagement.interferedWithDecisions === 'no'
                              ? 'bg-emerald-100 text-emerald-800'
                              : session.emotionalManagement.interferedWithDecisions === 'parcial'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {session.emotionalManagement.interferedWithDecisions === 'no'
                            ? 'No (Regulada)'
                            : session.emotionalManagement.interferedWithDecisions === 'parcial'
                            ? 'Parcial'
                            : 'Sí (Boicot)'}
                        </span>
                      </div>
                    </div>

                    {/* Coach Observations & Commitment */}
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] space-y-2">
                      <span className="font-bold text-[#581420] block uppercase tracking-wider text-[10px]">
                        Observación & Compromiso
                      </span>
                      {session.coachObservations && (
                        <p className="text-[#4A413B] text-[11px] leading-relaxed">
                          {session.coachObservations}
                        </p>
                      )}
                      {session.actionCommitment && (
                        <div className="bg-white p-2 rounded-lg border border-[#EADBCA] text-[11px]">
                          <span className="font-bold text-[#6B705C] block text-[10px] uppercase">
                            Acción Semanal:
                          </span>
                          {session.actionCommitment}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PUNTO DE PARTIDA */}
      {activeTab === 'partida' && (
        <div className="space-y-6">
          {/* Cuestionarios Diagnósticos Callout */}
          <div className="p-4 bg-gradient-to-r from-[#FAF7F2] to-white rounded-2xl border border-[#C38B3A]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#581420] text-[#E4B062] flex items-center justify-center font-bold shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-[#581420]">
                  Cuestionarios Clínicos Integrados (Preguntas en Vivo)
                </h4>
                <p className="text-xs text-[#6A6057]">
                  Abre las preguntas completas para diagnosticar el Eneatipo, Creencias en las 7 áreas y Rueda de Satisfacción.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenTestsModal}
              className="px-4 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Abrir Cuestionario en Vivo</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E4B062]" />
            </button>
          </div>

          {/* Baseline summary card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                Eneatipo Inicial
              </span>
              <h3 className="text-xl font-serif font-bold text-[#581420] mt-0.5">
                Eneatipo {baseline.enneatype}
              </h3>
              {baseline.enneatypeWing && (
                <span className="text-xs text-[#6A6057] block">{baseline.enneatypeWing}</span>
              )}
              <div className="mt-3 text-xs text-[#581420] bg-[#581420]/5 p-3 rounded-xl border border-[#581420]/15">
                <span className="font-bold block text-[10px] uppercase">Foco de Drenaje Actual:</span>
                {LIFE_AREAS.find(a => a.key === baseline.dominantDrainArea)?.label}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                Alineación Actividades vs Vocación
              </span>
              <div className="mt-1">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md inline-block ${
                    baseline.isWorkAlignedWithVocation === 'si'
                      ? 'bg-emerald-100 text-emerald-800'
                      : baseline.isWorkAlignedWithVocation === 'parcial'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {baseline.isWorkAlignedWithVocation === 'si'
                    ? 'Alineados con Plenitud'
                    : baseline.isWorkAlignedWithVocation === 'parcial'
                    ? 'Parcialmente Alineados'
                    : 'Desalineados (Drenaje Severo)'}
                </span>
              </div>
              {baseline.workVocationNotes && (
                <p className="text-xs text-[#6A6057] mt-2 italic">
                  "{baseline.workVocationNotes}"
                </p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                Energía Vital Inicial (Base)
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-mono font-bold text-[#581420]">
                  {baseEnergy}
                </span>
                <span className="text-xs text-[#8C8176]">/ 10</span>
              </div>
              <div className="mt-2 text-xs text-[#6A6057] space-y-0.5">
                <div>Nutrición: {baseline.initialVitalDecisions.nutrition}</div>
                <div>Ejercicio: {baseline.initialVitalDecisions.exercise}</div>
                <div>Descanso: {baseline.initialVitalDecisions.rest}</div>
              </div>
            </div>
          </div>

          {/* Childhood stimuli */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm">
            <h4 className="text-sm font-serif font-bold text-[#581420] mb-3">
              Mapa de Estímulos de la Infancia (3 Palabras por Figura)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {baseline.childhoodStimuli.map((stim, i) => (
                <div key={i} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                  <span className="text-xs font-semibold text-[#C38B3A] block">
                    {stim.figureLabel}
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {stim.words.map((w, wIdx) => (
                      <span
                        key={wIdx}
                        className="text-xs bg-white text-[#581420] font-medium px-2 py-0.5 rounded border border-[#EADBCA]"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                  {stim.notes && (
                    <p className="text-[11px] text-[#6A6057] mt-2 italic">
                      "{stim.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Beliefs initial bar */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm">
            <BeliefsComparisonBar initialBeliefs={baseline.beliefs} showSnippets={true} />
          </div>
        </div>
      )}

      {/* TAB 3: GRAFICOS EVOLUTIVOS */}
      {activeTab === 'graficos' && (
        <div className="space-y-6">
          {/* Radar Chart */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-serif font-bold text-[#581420]">
                Rueda de la Vida (Satisfacción Inicial vs Evolución Actual)
              </h3>
              <p className="text-xs text-[#6A6057]">
                Pasa el ratón sobre los vértices para ver el avance puntual en cada una de las 7 áreas
              </p>
            </div>
            <RadarChart
              initialData={baseline.lifeWheel}
              currentData={latestWheel}
              size={360}
            />
          </div>

          {/* Vital Energy Trend */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-serif font-bold text-[#581420]">
                Curva de Energía Vital Sesión a Sesión
              </h3>
              <p className="text-xs text-[#6A6057]">
                Evolución de los pilares biológicos (Alimentación, Ejercicio y Descanso)
              </p>
            </div>
            <VitalEnergyTrendChart
              baseline={baseline}
              sessions={sessions}
              finalEnergyScore={finalEvaluation?.finalVitalDecisions.vitalEnergyScore}
            />
          </div>

          {/* Beliefs with current snapshot */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm">
            <BeliefsComparisonBar
              initialBeliefs={baseline.beliefs}
              currentEmpoweredSnapshots={latestEmpowered}
              showSnippets={true}
            />
          </div>
        </div>
      )}

      {/* TAB 4: PUNTO DE LLEGADA / INFORME ESPEJO */}
      {activeTab === 'cierre' && (
        <div className="space-y-4">
          <MirrorEvolutionReport
            client={client}
            onPrintReport={() => window.print()}
          />
        </div>
      )}

      {/* Purge Confirmation Modal */}
      {isPurgeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#F9F6F0] rounded-2xl border border-[#E4DACD] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#581420] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#E4B062]" />
                <h3 className="font-serif font-bold text-base text-white">
                  Depurar Expediente Clínico (Política de Retención Mínima)
                </h3>
              </div>
              <button
                onClick={() => setIsPurgeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-[#4A413B]">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-900 leading-relaxed">
                  <strong>Acción permanente e irreversible:</strong> Se eliminarán definitivamente todas las notas de sesiones, cuestionarios, estímulos infantiles y observaciones privadas de <strong>{client.clientName}</strong>.
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] space-y-2">
                <span className="font-bold text-[#581420] block text-xs">
                  ÚNICOS 4 DATOS QUE SE CONSERVARÁN:
                </span>
                <ul className="space-y-1.5 text-xs text-[#2B231F]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>1. Nombre:</strong> {client.clientName}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>2. Correo:</strong> {client.contactEmail}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>3. Teléfono:</strong> {client.contactPhone || 'No registrado'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>4. Área en Conflicto:</strong> {conflictAreaConfig.label}</span>
                  </li>
                </ul>
              </div>

              <p className="text-[11px] text-[#6A6057] italic">
                El estado del cliente pasará a "Completado" y su ficha quedará limpia para tu registro de contactos.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPurgeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#6A6057] hover:text-[#2B231F]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  onPurgeClientData(client.id);
                  setIsPurgeModalOpen(false);
                }}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#E4B062]" />
                <span>Confirmar y Purgar Ahora</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
