import React from 'react';
import { ClientRecord, LIFE_AREAS } from '../../types/coaching';
import { RadarChart } from '../charts/RadarChart';
import { Sparkles, TrendingUp, Award, ShieldCheck, Heart, Zap, Brain, ArrowRight } from 'lucide-react';

interface MirrorEvolutionReportProps {
  client: ClientRecord;
  onPrintReport?: () => void;
}

export const MirrorEvolutionReport: React.FC<MirrorEvolutionReportProps> = ({
  client,
  onPrintReport,
}) => {
  const { baseline, finalEvaluation, sessions } = client;

  // Compute values
  const startEnergy = Number((
    (baseline.initialVitalDecisions.nutrition +
      baseline.initialVitalDecisions.exercise +
      baseline.initialVitalDecisions.rest) /
    3
  ).toFixed(1));

  const endEnergy = finalEvaluation
    ? Number(finalEvaluation.finalVitalDecisions.vitalEnergyScore.toFixed(1))
    : (sessions.length > 0 ? Number(sessions[sessions.length - 1].vitalDecisions.vitalEnergyScore.toFixed(1)) : startEnergy);

  const energyDelta = Number((endEnergy - startEnergy).toFixed(1));
  const energyPercent = startEnergy > 0 ? Math.round(((endEnergy - startEnergy) / startEnergy) * 100) : 0;

  // Beliefs average
  let startLimitingSum = 0;
  let startEmpoweredSum = 0;
  const beliefKeys = Object.keys(baseline.beliefs);
  beliefKeys.forEach(k => {
    // @ts-ignore
    const b = baseline.beliefs[k];
    if (b) {
      startLimitingSum += b.limitingPercentage;
      startEmpoweredSum += b.empoweredPercentage;
    }
  });
  const startLimitingAvg = Math.round(startLimitingSum / (beliefKeys.length || 1));
  const startEmpoweredAvg = Math.round(startEmpoweredSum / (beliefKeys.length || 1));

  let endEmpoweredAvg = startEmpoweredAvg;
  if (finalEvaluation) {
    const vals = Object.values(finalEvaluation.empoweredBeliefsFinal);
    endEmpoweredAvg = Math.round(vals.reduce((a, b) => a + b, 0) / (vals.length || 1));
  } else if (sessions.length > 0) {
    const vals = Object.values(sessions[sessions.length - 1].empoweredBeliefsSnapshot);
    endEmpoweredAvg = Math.round(vals.reduce((a, b) => a + b, 0) / (vals.length || 1));
  }
  const endLimitingAvg = 100 - endEmpoweredAvg;

  // Life wheel comparison data
  const currentWheel = finalEvaluation
    ? finalEvaluation.lifeWheelFinal
    : (sessions.length > 0 ? sessions[sessions.length - 1].lifeWheelSnapshot : baseline.lifeWheel);

  return (
    <div className="bg-white rounded-2xl border border-[#E6DBCA] shadow-xl overflow-hidden print:shadow-none print:border-none">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#581420] via-[#45101A] to-[#2B231F] text-white p-6 sm:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#E4B062] text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Informe Clínico Evolutivo · ALIVE GAME</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F9F6F0]">
              Hoja de Ruta & Evolución Neuroplástica
            </h2>
            <p className="text-white/80 text-sm mt-1 max-w-xl font-sans">
              Comparativa empírica del mundo emocional, energía vital auto-gestionada y consolidación de hábitos (Inicio vs Cierre).
            </p>
          </div>

          <div className="flex flex-col items-end justify-center shrink-0">
            <span className="text-xs text-white/60 font-mono">Código de Expediente</span>
            <span className="text-xl font-mono font-bold text-[#E4B062] bg-white/10 px-3 py-1 rounded-lg">
              {client.anonymousCode}
            </span>
            <span className="text-[11px] text-white/70 mt-1">
              {client.sessions.length} sesiones de {client.totalSessionsPlanned} registradas
            </span>
          </div>
        </div>

        {onPrintReport && (
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-end print:hidden">
            <button
              onClick={onPrintReport}
              className="px-4 py-1.5 bg-[#C38B3A] hover:bg-[#D49C4B] text-[#2B231F] font-semibold text-xs rounded-lg transition-colors shadow-sm"
            >
              Exportar / Imprimir Informe
            </button>
          </div>
        )}
      </div>

      {/* Motivo de Consulta & Punto de Partida */}
      {(client.consultationReason || baseline.consultationReason) && (
        <div className="p-6 bg-[#FAF7F2] border-b border-[#EFE7DC]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
            Sesión 1 · Motivo de Consulta & Punto de Partida Emocional
          </span>
          <p className="text-sm font-serif italic text-[#2B231F] mt-1 bg-white p-3.5 rounded-xl border border-[#EADBCA] shadow-2xs">
            "{client.consultationReason || baseline.consultationReason}"
          </p>
        </div>
      )}

      {/* Primary KPI Evolution Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EFE7DC] border-b border-[#EFE7DC] bg-[#FAF7F2]">
        {/* KPI 1: Vital Energy */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#C38B3A]" />
                Energía Vital Consolidada
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-mono">
                +{energyPercent}%
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <div>
                <span className="text-xs text-[#8C8176] block">Inicio</span>
                <span className="text-2xl font-mono font-semibold text-[#8C8176]">
                  {startEnergy}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C38B3A] mb-1" />
              <div>
                <span className="text-xs text-[#581420] font-semibold block">Consolidado</span>
                <span className="text-3xl font-mono font-bold text-[#581420]">
                  {endEnergy}
                </span>
                <span className="text-xs text-[#8C8176] ml-1">/ 10</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#6A6057] mt-3">
            Impacto directo de las decisiones diarias en nutrición, actividad física y arquitectura del sueño.
          </p>
        </div>

        {/* KPI 2: Creencias Empoderadas */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-[#581420]" />
                Inversión de Creencias
              </span>
              <span className="text-xs font-bold text-[#581420] bg-[#581420]/10 px-2 py-0.5 rounded-full font-mono">
                +{endEmpoweredAvg - startEmpoweredAvg}% Empoderadas
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <div>
                <span className="text-xs text-[#8C8176] block">Limitantes</span>
                <span className="text-2xl font-mono text-[#8C3A49] font-bold">
                  {startLimitingAvg}% → {endLimitingAvg}%
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#C38B3A] mb-1" />
              <div>
                <span className="text-xs text-[#6B705C] font-semibold block">Empoderadas</span>
                <span className="text-3xl font-mono text-[#6B705C] font-bold">
                  {endEmpoweredAvg}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-[#6A6057] mt-3">
            Desactivación de circuitos neuronales de miedo/autoexigencia e instauración de soberanía interna.
          </p>
        </div>

        {/* KPI 3: Emoción & Regulación */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B705C] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#C38B3A]" />
                Estado Emocional Central
              </span>
              <span className="text-xs font-bold text-[#C38B3A] bg-[#C38B3A]/10 px-2 py-0.5 rounded-full">
                Eneatipo {baseline.enneatype}
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[11px] text-[#8C8176] block">Emoción de Partida:</span>
              <p className="text-sm font-semibold text-[#8C3A49]">
                {baseline.initialPredominantEmotion}
              </p>
              <span className="text-[11px] text-[#6B705C] block mt-2">Emoción Consolidada:</span>
              <p className="text-base font-serif font-bold text-[#581420]">
                {finalEvaluation?.predominantEmotionConsolidated || 'Gestión emocional serena y autorregulada'}
              </p>
            </div>
          </div>
          <p className="text-xs text-[#6A6057] mt-2">
            La emoción deja de secuestrar la toma de decisiones al día siguiente.
          </p>
        </div>
      </div>

      {/* Main Comparative Content: Radar Mirror + Areas Breakdown */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Chart Espejo (5 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA]">
          <h3 className="text-sm font-serif font-bold text-[#581420] text-center mb-1">
            Gráfico Espejo: Rueda de la Vida (Antes vs Después)
          </h3>
          <p className="text-[11px] text-[#6A6057] text-center mb-2">
            Expansión de la satisfacción en las 8 áreas clave del neurocoaching
          </p>
          <RadarChart
            initialData={baseline.lifeWheel}
            currentData={currentWheel}
            initialLabel="Inicio (Punto de Partida)"
            currentLabel="Actual / Final (Punto de Llegada)"
            size={340}
          />
        </div>

        {/* Detailed Areas List (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-sm font-serif font-bold text-[#581420]">
            Evolución Empírica por Área de Vida
          </h3>
          <div className="space-y-2">
            {LIFE_AREAS.map(area => {
              const startVal = baseline.lifeWheel[area.key] || 0;
              const endVal = currentWheel[area.key] || 0;
              const diff = Number((endVal - startVal).toFixed(1));
              const isDrainArea = baseline.dominantDrainArea === area.key;

              return (
                <div
                  key={area.key}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                    isDrainArea
                      ? 'bg-[#581420]/5 border-[#581420]/30'
                      : 'bg-white border-[#E8DFD3]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#2B231F]">{area.label}</span>
                    {isDrainArea && (
                      <span className="text-[10px] text-[#581420] font-bold bg-[#581420]/10 px-1.5 py-0.5 rounded">
                        Foco de Drenaje Inicial
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 font-mono tabular-nums">
                    <span className="text-[#8C8176]">Inicio: {startVal}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C38B3A]" />
                    <span className="font-bold text-[#581420]">Hoy: {endVal}</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                        diff >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {diff >= 0 ? `+${diff}` : diff} pts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Childhood stimuli & Rewritten Narrative */}
      <div className="p-6 sm:p-8 bg-[#FAF7F2] border-t border-[#EFE7DC]">
        <h3 className="text-sm font-serif font-bold text-[#581420] mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C38B3A]" />
          Reescritura de los Estímulos de la Infancia
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {baseline.childhoodStimuli.map((stim, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-[#EADBCA]">
              <span className="text-xs font-semibold text-[#C38B3A] block">
                {stim.figureLabel}
              </span>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {stim.words.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    className="text-xs bg-[#FAF7F2] text-[#581420] font-medium px-2 py-0.5 rounded border border-[#EADBCA]"
                  >
                    {word}
                  </span>
                ))}
              </div>
              {stim.notes && (
                <p className="text-[11px] text-[#6A6057] mt-2 italic leading-relaxed">
                  "{stim.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Historial Sesión a Sesión: Calidad de Decisiones & Emoción Predominante */}
      {sessions.length > 0 && (
        <div className="p-6 sm:p-8 bg-white border-t border-[#EFE7DC]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#581420] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C38B3A]" />
                Registro Sesión a Sesión: Calidad de Decisiones & Emoción Predominante
              </h3>
              <p className="text-xs text-[#6A6057] mt-0.5">
                Seguimiento empírico de la calidad de decisiones en los 3 pilares biológicos (Alimentación, Ejercicio, Descanso) y el estado emocional sesión a sesión.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#8C8176]">
              {sessions.length} sesiones computadas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#EADBCA] rounded-xl overflow-hidden">
              <thead className="bg-[#FAF7F2] text-[#581420] border-b border-[#EADBCA] font-serif uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-2.5 font-bold">Sesión</th>
                  <th className="p-2.5 font-bold">Fecha</th>
                  <th className="p-2.5 font-bold text-center">🥗 Alimentación</th>
                  <th className="p-2.5 font-bold text-center">🏃 Ejercicio</th>
                  <th className="p-2.5 font-bold text-center">💤 Descanso</th>
                  <th className="p-2.5 font-bold text-center">⚡ Calidad Global</th>
                  <th className="p-2.5 font-bold">Emoción Predominante</th>
                  <th className="p-2.5 font-bold">Herramienta Neuro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE3]">
                {sessions.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="p-2.5 font-bold text-[#581420] whitespace-nowrap">
                      Sesión {s.sessionNumber}
                    </td>
                    <td className="p-2.5 text-[#6A6057] font-mono text-[11px] whitespace-nowrap">
                      {s.date}
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">
                      {s.vitalDecisions.nutrition} <span className="text-gray-400 text-[10px]">/10</span>
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">
                      {s.vitalDecisions.exercise} <span className="text-gray-400 text-[10px]">/10</span>
                    </td>
                    <td className="p-2.5 text-center font-mono font-semibold">
                      {s.vitalDecisions.rest} <span className="text-gray-400 text-[10px]">/10</span>
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-[#581420] bg-[#581420]/5">
                      {s.vitalDecisions.overallDecisionsQuality ?? s.vitalDecisions.vitalEnergyScore} <span className="text-gray-400 text-[10px]">/10</span>
                    </td>
                    <td className="p-2.5 font-semibold text-[#8C3A49]">
                      {s.emotionalManagement.predominantEmotion}
                      <span className="text-[10px] text-gray-500 font-mono ml-1">
                        ({s.emotionalManagement.intensity}/10)
                      </span>
                    </td>
                    <td className="p-2.5 text-[#4A413B] text-[11px] max-w-xs truncate" title={s.emotionalManagement.neuroplasticityToolApplied}>
                      {s.emotionalManagement.neuroplasticityToolApplied}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Key Milestones & Boicot Prevention Protocol */}
      {finalEvaluation && (
        <div className="p-6 sm:p-8 border-t border-[#EFE7DC] space-y-6">
          <div>
            <h3 className="text-sm font-serif font-bold text-[#581420] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C38B3A]" />
              Hitos Tangibles Alcanzados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {finalEvaluation.keyMilestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-[#2B231F] flex items-start gap-2.5"
                >
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span className="leading-relaxed font-medium">{milestone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#581420]/5 border border-[#581420]/20 rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] mb-1.5 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#C38B3A]" />
              Protocolo de Prevención de Boicots (Uso con AliveGamers):
            </h4>
            <p className="text-xs text-[#4A413B] leading-relaxed">
              {finalEvaluation.preventiveBoicotProtocol}
            </p>
          </div>

          <div className="p-4 bg-white border border-[#EADBCA] rounded-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B705C] mb-1">
              Conclusión Evolutiva del Coach:
            </h4>
            <p className="text-xs text-[#2B231F] italic leading-relaxed">
              "{finalEvaluation.coachSummary}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
