import React, { useState } from 'react';
import { ClientRecord, FinalEvaluation, LIFE_AREAS, LifeAreaKey } from '../../types/coaching';
import { X, Award, CheckCircle2 } from 'lucide-react';

interface FinalizeClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientRecord;
  onSaveFinalEvaluation: (finalEval: FinalEvaluation, purgeClinicalData?: boolean) => void;
}

export const FinalizeClientModal: React.FC<FinalizeClientModalProps> = ({
  isOpen,
  onClose,
  client,
  onSaveFinalEvaluation,
}) => {
  const lastSession = client.sessions.length > 0 ? client.sessions[client.sessions.length - 1] : null;

  // Defaults based on last session or baseline
  const [lifeWheelFinal, setLifeWheelFinal] = useState<Record<LifeAreaKey, number>>(() => {
    if (lastSession) return { ...lastSession.lifeWheelSnapshot };
    return { ...client.baseline.lifeWheel };
  });

  const [empoweredBeliefsFinal, setEmpoweredBeliefsFinal] = useState<Record<LifeAreaKey, number>>(() => {
    if (lastSession) return { ...lastSession.empoweredBeliefsSnapshot };
    const emp: Record<LifeAreaKey, number> = {} as any;
    LIFE_AREAS.forEach(a => {
      emp[a.key] = 80;
    });
    return emp;
  });

  const [nutrition, setNutrition] = useState(lastSession ? lastSession.vitalDecisions.nutrition : 8);
  const [exercise, setExercise] = useState(lastSession ? lastSession.vitalDecisions.exercise : 7.5);
  const [rest, setRest] = useState(lastSession ? lastSession.vitalDecisions.rest : 8);

  const [predominantEmotionConsolidated, setPredominantEmotionConsolidated] = useState('Serenidad y claridad vocacional');
  const [milestonesText, setMilestonesText] = useState(
    'Incremento significativo de energía vital.\nTransformación del patrón de autoexigencia defensivo.\nRegulación del ciclo de descanso y eliminación de síntomas digestivos.'
  );
  const [preventiveBoicotProtocol, setPreventiveBoicotProtocol] = useState(
    'Al percibir tensión corporal o impulso de sobre-trabajo, pausar 10 minutos y registrar en la app AliveGamers.'
  );
  const [coachSummary, setCoachSummary] = useState(
    'El proceso de neurocoaching completó con éxito la re-alineación de hábitos y el fortalecimiento de la soberanía interna.'
  );
  const [shouldPurgeClinicalData, setShouldPurgeClinicalData] = useState(true);

  if (!isOpen) return null;

  const vitalEnergyScore = Number(((nutrition + exercise + rest) / 3).toFixed(1));

  const handleSave = () => {
    const keyMilestones = milestonesText
      .split('\n')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const finalEval: FinalEvaluation = {
      completedAt: new Date().toISOString().split('T')[0],
      enneatypeFinal: client.baseline.enneatype,
      lifeWheelFinal,
      empoweredBeliefsFinal,
      finalVitalDecisions: {
        nutrition,
        exercise,
        rest,
        vitalEnergyScore,
      },
      predominantEmotionConsolidated,
      keyMilestones,
      preventiveBoicotProtocol,
      coachSummary,
    };

    onSaveFinalEvaluation(finalEval, shouldPurgeClinicalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#F9F6F0] rounded-2xl border border-[#E4DACD] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#581420] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#E4B062] text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Punto de Llegada · Cierre Evolutivo</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              Re-Mapeo Final & Hitos · {client.clientName} ({client.anonymousCode})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B231F]">
          {/* Vital energy consolidated */}
          <div className="p-4 bg-white rounded-xl border border-[#EADBCA] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420]">
                Energía Vital Consolidada
              </h4>
              <span className="text-base font-mono font-bold text-[#581420] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#EADBCA]">
                {vitalEnergyScore} / 10
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>🥗 Nutrición</span>
                  <span className="font-mono text-[#581420]">{nutrition}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={nutrition}
                  onChange={e => setNutrition(parseFloat(e.target.value))}
                  className="w-full accent-[#581420]"
                />
              </div>

              <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>🏃 Ejercicio</span>
                  <span className="font-mono text-[#581420]">{exercise}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={exercise}
                  onChange={e => setExercise(parseFloat(e.target.value))}
                  className="w-full accent-[#581420]"
                />
              </div>

              <div className="p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>💤 Descanso</span>
                  <span className="font-mono text-[#581420]">{rest}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={rest}
                  onChange={e => setRest(parseFloat(e.target.value))}
                  className="w-full accent-[#581420]"
                />
              </div>
            </div>
          </div>

          {/* Rueda final */}
          <div className="p-4 bg-white rounded-xl border border-[#EADBCA] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420]">
              Rueda de la Vida Final (Satisfacción Consolidada 1 - 10)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {LIFE_AREAS.map(a => (
                <div key={a.key} className="flex items-center justify-between p-2 bg-[#FAF7F2] rounded-lg border border-[#EADBCA] text-xs">
                  <span className="font-medium text-[#2B231F] truncate pr-2">{a.shortLabel}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.5"
                      value={lifeWheelFinal[a.key] ?? 7}
                      onChange={e =>
                        setLifeWheelFinal(prev => ({
                          ...prev,
                          [a.key]: parseFloat(e.target.value),
                        }))
                      }
                      className="w-20 accent-[#581420]"
                    />
                    <span className="font-mono font-bold text-[#581420] w-6 text-right">
                      {lifeWheelFinal[a.key]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emotion & Milestones */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                Estado Emocional Consolidado
              </label>
              <input
                type="text"
                value={predominantEmotionConsolidated}
                onChange={e => setPredominantEmotionConsolidated(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                Hitos Tangibles Alcanzados (uno por línea)
              </label>
              <textarea
                rows={3}
                value={milestonesText}
                onChange={e => setMilestonesText(e.target.value)}
                placeholder="Un hito por renglón..."
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                Protocolo Preventivo de Boicot (para usar con AliveGamers)
              </label>
              <textarea
                rows={2}
                value={preventiveBoicotProtocol}
                onChange={e => setPreventiveBoicotProtocol(e.target.value)}
                placeholder="Acción concreta ante señales de recaída o boicot..."
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                Conclusión Evolutiva del Coach
              </label>
              <textarea
                rows={2}
                value={coachSummary}
                onChange={e => setCoachSummary(e.target.value)}
                placeholder="Resumen del viaje y felicitación final..."
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>

            {/* Privacy Data Minimization Checkbox */}
            <div className="p-4 bg-emerald-50/80 border border-emerald-300 rounded-2xl flex items-start gap-3">
              <input
                type="checkbox"
                id="purge_check"
                checked={shouldPurgeClinicalData}
                onChange={e => setShouldPurgeClinicalData(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#581420] rounded cursor-pointer shrink-0"
              />
              <label htmlFor="purge_check" className="cursor-pointer text-xs">
                <strong className="font-bold text-emerald-950 block">
                  🛡️ Purgar datos clínicos sensibles al finalizar (Política de Retención Mínima)
                </strong>
                <p className="text-[11px] text-emerald-800 leading-snug mt-0.5">
                  Se eliminarán permanentemente las notas de sesiones, estímulos de infancia y observaciones privadas. 
                  <strong> Se conservarán únicamente el Nombre, Correo, Teléfono y Área en conflicto</strong> para tu registro de contactos.
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#6A6057] hover:text-[#2B231F]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-lg transition-colors shadow-md flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E4B062]" />
            Generar Informe & Cerrar Proceso
          </button>
        </div>
      </div>
    </div>
  );
};
