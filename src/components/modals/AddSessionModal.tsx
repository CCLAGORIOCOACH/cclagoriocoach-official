import React, { useState } from 'react';
import { ClientRecord, SessionRecord, LIFE_AREAS, LifeAreaKey } from '../../types/coaching';
import { X, Zap, Heart, CheckCircle2 } from 'lucide-react';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientRecord;
  onSaveSession: (session: SessionRecord) => void;
}

const COMMON_EMOTIONS = [
  'Calma',
  'Ansiedad',
  'Frustración',
  'Alegría',
  'Miedo',
  'Entusiasmo',
  'Tristeza',
  'Culpa',
  'Ira / Rabia',
  'Paz interior',
  'Apatía',
  'Claridad',
];

const COMMON_NEURO_TOOLS = [
  'Pausa de interocepción y respiración diafragmática 4-7-8',
  'Reencuadre cognitivo: pasar de obligación a soberanía',
  'Detención de pensamiento de boicot y anclaje somático',
  'Etiquetado emocional objetivo sin juicio',
  'Micro-decisión de activación (Regla de los 5 segundos)',
  'Desarticulación del juez interno (autocompasión biológica)',
  'Corte de sobre-estimulación digital nocturna',
];

export const AddSessionModal: React.FC<AddSessionModalProps> = ({
  isOpen,
  onClose,
  client,
  onSaveSession,
}) => {
  const nextSessionNumber = client.sessions.length + 1;

  // Previous session or baseline as base for defaults
  const prevSession = client.sessions.length > 0 ? client.sessions[client.sessions.length - 1] : null;

  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);

  // Decisions
  const [overallDecisionsQuality, setOverallDecisionsQuality] = useState<number>(prevSession?.vitalDecisions.overallDecisionsQuality ?? 7);
  const [nutrition, setNutrition] = useState(prevSession ? prevSession.vitalDecisions.nutrition : 5);
  const [exercise, setExercise] = useState(prevSession ? prevSession.vitalDecisions.exercise : 4);
  const [rest, setRest] = useState(prevSession ? prevSession.vitalDecisions.rest : 5);
  const [decisionNotes, setDecisionNotes] = useState('');

  // Emotional Management
  const [predominantEmotion, setPredominantEmotion] = useState('Calma');
  const [hardestEmotionToManage, setHardestEmotionToManage] = useState('');
  const [customEmotion, setCustomEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [neuroplasticityToolApplied, setNeuroplasticityToolApplied] = useState(COMMON_NEURO_TOOLS[0]);
  const [customTool, setCustomTool] = useState('');
  const [interferedWithDecisions, setInterferedWithDecisions] = useState<'no' | 'parcial' | 'si'>('no');
  const [emotionalNotes, setEmotionalNotes] = useState('');

  // Life Wheel update
  const [lifeWheelSnapshot, setLifeWheelSnapshot] = useState<Record<LifeAreaKey, number>>(() => {
    if (prevSession) return { ...prevSession.lifeWheelSnapshot };
    return { ...client.baseline.lifeWheel };
  });

  // Empowered beliefs update
  const [empoweredBeliefsSnapshot, setEmpoweredBeliefsSnapshot] = useState<Record<LifeAreaKey, number>>(() => {
    if (prevSession) return { ...prevSession.empoweredBeliefsSnapshot };
    const initial: Record<LifeAreaKey, number> = {} as any;
    LIFE_AREAS.forEach(a => {
      initial[a.key] = client.baseline.beliefs[a.key]?.empoweredPercentage ?? 40;
    });
    return initial;
  });

  const [coachObservations, setCoachObservations] = useState('');
  const [actionCommitment, setActionCommitment] = useState('');

  if (!isOpen) return null;

  const vitalEnergyScore = Number(((nutrition + exercise + rest) / 3).toFixed(1));

  const handleSave = () => {
    const finalEmotion = customEmotion.trim() || predominantEmotion;
    const finalTool = customTool.trim() || neuroplasticityToolApplied;

    const newSession: SessionRecord = {
      id: `s-${Date.now()}`,
      sessionNumber: nextSessionNumber,
      date: sessionDate,
      vitalDecisions: {
        nutrition,
        exercise,
        rest,
        overallDecisionsQuality,
        vitalEnergyScore,
        decisionNotes,
      },
      emotionalManagement: {
        predominantEmotion: finalEmotion,
        hardestEmotionToManage: hardestEmotionToManage.trim() || undefined,
        intensity,
        neuroplasticityToolApplied: finalTool,
        interferedWithDecisions,
        emotionalNotes,
      },
      lifeWheelSnapshot,
      empoweredBeliefsSnapshot,
      coachObservations,
      actionCommitment,
    };

    onSaveSession(newSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#F9F6F0] rounded-2xl border border-[#E4DACD] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#581420] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#E4B062] text-xs font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Registro de Proceso & Neuroplasticidad</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              Sesión {nextSessionNumber} de {client.totalSessionsPlanned} · {client.clientName} ({client.anonymousCode})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B231F]">
          {/* Date & Quick indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white rounded-xl border border-[#EADBCA]">
            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Fecha de la Sesión
              </label>
              <input
                type="date"
                value={sessionDate}
                onChange={e => setSessionDate(e.target.value)}
                className="px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-medium"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-[#6A6057] block uppercase tracking-wider font-semibold">
                  Energía Vital Calculada
                </span>
                <span className="text-xl font-mono font-bold text-[#581420]">
                  {vitalEnergyScore} <span className="text-xs text-[#8C8176]">/ 10</span>
                </span>
              </div>
            </div>
          </div>

          {/* Module 1: Vital Decisions */}
          <div className="p-4 bg-white rounded-xl border border-[#EADBCA] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#C38B3A]" />
                1. Calificación de Decisiones Diarias
              </h4>
              <span className="font-mono text-xs font-bold text-[#581420] bg-[#FAF7F2] px-2.5 py-0.5 rounded border border-[#EADBCA]">
                Calidad Global: {overallDecisionsQuality}/10
              </span>
            </div>

            <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15">
              <label className="block text-xs font-bold text-[#581420] mb-1">
                Pregunta clave al cliente:
              </label>
              <p className="text-xs font-serif italic text-[#2B231F] mb-2">
                "Del 1 al 10, ¿cómo calificarías la calidad de tus decisiones hoy y entre sesión y sesión?"
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={overallDecisionsQuality}
                  onChange={e => setOverallDecisionsQuality(parseFloat(e.target.value))}
                  className="flex-1 accent-[#581420]"
                />
                <span className="font-mono text-base font-bold text-[#581420] w-12 text-right">
                  {overallDecisionsQuality}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-bold text-[#6A6057] uppercase tracking-wider block">
              Desglose en los 3 Pilares Biológicos:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>🥗 Alimentación</span>
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

              <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
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

              <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#EADBCA]">
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

            <div>
              <input
                type="text"
                value={decisionNotes}
                onChange={e => setDecisionNotes(e.target.value)}
                placeholder="Observaciones de hábitos (ej. cenó liviano, caminó 30 min, durmió 7.5h)..."
                className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>
          </div>

          {/* Module 2: Emotional Management & Neuroplasticity */}
          <div className="p-4 bg-white rounded-xl border border-[#EADBCA] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C38B3A]" />
              2. Gestión Emocional & Neuroplasticidad Aplicada
            </h4>

            <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15">
              <label className="block text-xs font-bold text-[#581420] mb-1">
                Pregunta clave al cliente:
              </label>
              <p className="text-xs font-serif italic text-[#2B231F] mb-1.5">
                "¿Cuál fue la emoción que más te costó entender o gestionar entre sesión y sesión?"
              </p>
              <input
                type="text"
                value={hardestEmotionToManage}
                onChange={e => setHardestEmotionToManage(e.target.value)}
                placeholder="Ej. Frustración al no llegar a tiempo, Ansiedad por sobrecarga laboral..."
                className="w-full px-3 py-1.5 bg-white rounded-lg border border-[#DACDC0] text-xs font-semibold text-[#8C3A49]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                  Emoción Predominante Identificada
                </label>
                <select
                  value={predominantEmotion}
                  onChange={e => setPredominantEmotion(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-medium"
                >
                  {COMMON_EMOTIONS.map(emo => (
                    <option key={emo} value={emo}>
                      {emo}
                    </option>
                  ))}
                  <option value="Otra">Otra emoción específica...</option>
                </select>

                {predominantEmotion === 'Otra' && (
                  <input
                    type="text"
                    value={customEmotion}
                    onChange={e => setCustomEmotion(e.target.value)}
                    placeholder="Escribir emoción..."
                    className="w-full mt-2 px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                  />
                )}
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#6A6057] mb-1">
                  <span>Intensidad Sentida</span>
                  <span className="font-mono text-[#581420] font-bold">{intensity} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={e => setIntensity(parseInt(e.target.value))}
                  className="w-full accent-[#581420] mt-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Técnica de Neuroplasticidad Aplicada
              </label>
              <select
                value={neuroplasticityToolApplied}
                onChange={e => setNeuroplasticityToolApplied(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
              >
                {COMMON_NEURO_TOOLS.map(tool => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                ¿La emoción interfirió negativamente en las decisiones del día?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setInterferedWithDecisions('no')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-semibold ${
                    interferedWithDecisions === 'no'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                  }`}
                >
                  No (Logró gestionarla)
                </button>
                <button
                  type="button"
                  onClick={() => setInterferedWithDecisions('parcial')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-semibold ${
                    interferedWithDecisions === 'parcial'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                  }`}
                >
                  Parcial (Cierta duda)
                </button>
                <button
                  type="button"
                  onClick={() => setInterferedWithDecisions('si')}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-semibold ${
                    interferedWithDecisions === 'si'
                      ? 'bg-[#8C3A49] text-white border-[#8C3A49]'
                      : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                  }`}
                >
                  Sí (Boicot de hábitos)
                </button>
              </div>
            </div>
          </div>

          {/* Module 3: Wheel of life advances */}
          <div className="p-4 bg-white rounded-xl border border-[#EADBCA] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420]">
              3. Avances en Rueda de la Vida (Satisfacción 1 - 10)
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
                      value={lifeWheelSnapshot[a.key] ?? 5}
                      onChange={e =>
                        setLifeWheelSnapshot(prev => ({
                          ...prev,
                          [a.key]: parseFloat(e.target.value),
                        }))
                      }
                      className="w-20 accent-[#581420]"
                    />
                    <span className="font-mono font-bold text-[#581420] w-6 text-right">
                      {lifeWheelSnapshot[a.key]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module 4: Coach Observations & Commitment */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                Observaciones Clínicas del Coach & Alertas de Boicot
              </label>
              <textarea
                rows={2}
                value={coachObservations}
                onChange={e => setCoachObservations(e.target.value)}
                placeholder="Patrón detectado en la sesión, resistencia neurobiológica, avance clave..."
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                Tarea / Compromiso de Neuroplasticidad entre Sesiones
              </label>
              <input
                type="text"
                value={actionCommitment}
                onChange={e => setActionCommitment(e.target.value)}
                placeholder="Ej. Caminar 20 min sin pantallas los martes, registrar impulso de comer en AliveGamers..."
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs font-medium"
              />
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
            Guardar Sesión {nextSessionNumber}
          </button>
        </div>
      </div>
    </div>
  );
};
