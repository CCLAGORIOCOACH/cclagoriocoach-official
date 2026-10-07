import React, { useState } from 'react';
import { ClientRecord, SessionRecord, LifeAreaKey } from '../../types/coaching';
import { X, CheckCircle2, Zap, Heart, Sparkles, Brain, ArrowRight } from 'lucide-react';

interface FeedbackSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientRecord;
  onSaveSession: (session: SessionRecord) => void;
  targetSessionNumber?: number;
}

const COMMON_EMOTIONS = [
  'Ansiedad por sobrecarga',
  'Frustración al no llegar',
  'Miedo al rechazo / a fallar',
  'Culpa al poner límites',
  'Apatía / Procrastinación defensiva',
  'Ira / Irritación contenida',
  'Tristeza / Desconexión',
  'Calma y serenidad',
  'Claridad mental',
];

const COMMON_NEURO_TOOLS = [
  'Pausa de interocepción y respiración diafragmática 4-7-8',
  'Reencuadre cognitivo: pasar de exigencia externa a soberanía interna',
  'Detención de pensamiento de boicot y anclaje somático',
  'Etiquetado emocional objetivo sin juicio',
  'Micro-decisión de activación (Regla de los 5 segundos)',
  'Desarticulación del juez interno (autocompasión biológica)',
  'Corte de sobre-estimulación digital nocturna',
];

export const FeedbackSessionModal: React.FC<FeedbackSessionModalProps> = ({
  isOpen,
  onClose,
  client,
  onSaveSession,
  targetSessionNumber,
}) => {
  const sessionNumber = targetSessionNumber || client.sessions.length + 1;
  const prevSession = client.sessions.length > 0 ? client.sessions[client.sessions.length - 1] : null;

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // 1. Tema específico
  const [sessionTopic, setSessionTopic] = useState('');

  // 2. Calidad de decisiones en alimentación, ejercicio, descanso
  const [overallDecisionsQuality, setOverallDecisionsQuality] = useState<number>(
    prevSession?.vitalDecisions.overallDecisionsQuality ?? 7
  );
  const [nutrition, setNutrition] = useState<number>(prevSession?.vitalDecisions.nutrition ?? 7);
  const [exercise, setExercise] = useState<number>(prevSession?.vitalDecisions.exercise ?? 6);
  const [rest, setRest] = useState<number>(prevSession?.vitalDecisions.rest ?? 7);
  const [decisionNotes, setDecisionNotes] = useState('');

  // 3. Gestión emocional & emoción desafiante a entender
  const [hardestEmotionToManage, setHardestEmotionToManage] = useState('');
  const [predominantEmotion, setPredominantEmotion] = useState(COMMON_EMOTIONS[0]);
  const [customEmotion, setCustomEmotion] = useState('');
  const [intensity, setIntensity] = useState<number>(6);
  const [interferedWithDecisions, setInterferedWithDecisions] = useState<'no' | 'parcial' | 'si'>('no');
  const [neuroTool, setNeuroTool] = useState(COMMON_NEURO_TOOLS[0]);
  const [customNeuroTool, setCustomNeuroTool] = useState('');
  const [emotionalNotes, setEmotionalNotes] = useState('');

  // 4. Tarea pendiente
  const [nextTask, setNextTask] = useState('');

  // 5. Notas del coach
  const [coachNotes, setCoachNotes] = useState('');

  if (!isOpen) return null;

  const vitalEnergyScore = Number(((nutrition + exercise + rest) / 3).toFixed(1));

  const handleSave = () => {
    const finalEmotion = customEmotion.trim() || hardestEmotionToManage.trim() || predominantEmotion;
    const finalTool = customNeuroTool.trim() || neuroTool;

    // Use latest life wheel or baseline
    const wheelSnapshot: Record<LifeAreaKey, number> = prevSession
      ? { ...prevSession.lifeWheelSnapshot }
      : { ...client.baseline.lifeWheel };

    // Use latest empowered beliefs or baseline
    const empoweredSnapshot: Record<LifeAreaKey, number> = prevSession
      ? { ...prevSession.empoweredBeliefsSnapshot }
      : (() => {
          const emp: Record<LifeAreaKey, number> = {} as any;
          Object.entries(client.baseline.beliefs).forEach(([k, b]) => {
            emp[k as LifeAreaKey] = b.empoweredPercentage;
          });
          return emp;
        })();

    const newSession: SessionRecord = {
      id: `session-${Date.now()}`,
      sessionNumber,
      date,
      sessionType: 'feedback',
      sessionTopic: sessionTopic.trim() || 'Sesión de Feedback & Hábitos',
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
        hardestEmotionToManage: hardestEmotionToManage.trim() || finalEmotion,
        intensity,
        neuroplasticityToolApplied: finalTool,
        interferedWithDecisions,
        emotionalNotes,
      },
      lifeWheelSnapshot: wheelSnapshot,
      empoweredBeliefsSnapshot: empoweredSnapshot,
      coachObservations: coachNotes,
      actionCommitment: nextTask.trim() || 'Continuar registro diario en AliveGamers',
    };

    onSaveSession(newSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#F9F6F0] rounded-3xl border border-[#EADBCA] shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#581420] via-[#45101A] to-[#2B231F] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C38B3A]/20 border border-[#C38B3A]/40 flex items-center justify-center text-[#E4B062]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E4B062] bg-[#E4B062]/20 px-2 py-0.5 rounded-full">
                  Sesión de Feedback
                </span>
                <span className="text-xs text-white/70 font-mono">
                  Sesión #{sessionNumber}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                Registro de Sesión de Feedback · {client.clientName} ({client.anonymousCode})
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B231F]">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-[#EADBCA] shadow-2xs">
            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Fecha de la Sesión:
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-mono font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#581420] mb-1">
                Tema Específico que Trae el Cliente a esta Sesión *
              </label>
              <input
                type="text"
                required
                value={sessionTopic}
                onChange={e => setSessionTopic(e.target.value)}
                placeholder="Ej. Conflicto con socios sobre carga horaria, ansiedad ante nuevo proyecto..."
                className="w-full px-3 py-1.5 bg-white rounded-lg border border-[#DACDC0] text-xs font-medium text-[#581420] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#581420]/20"
              />
            </div>
          </div>

          {/* 1. DECISIONES EN ALIMENTACIÓN, EJERCICIO Y DESCANSO */}
          <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE3]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#581420]/10 text-[#581420] flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="font-serif font-bold text-[#581420] text-sm">
                  Decisiones con respecto a Alimentación, Ejercicio Físico y Descanso
                </h4>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#6A6057] uppercase font-bold block">
                  Energía Vital Autogestionada (Promedio 3 Decisiones)
                </span>
                <span className="font-mono text-xs font-bold text-[#581420] bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EADBCA] inline-block">
                  ({nutrition} + {exercise} + {rest}) ÷ 3 = <strong>{vitalEnergyScore} / 10</strong>
                </span>
              </div>
            </div>

            {/* Overall question */}
            <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15">
              <label className="block text-xs font-bold text-[#581420] mb-0.5">
                Pregunta clave de medición:
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
                <span className="font-mono text-lg font-bold text-[#581420] w-12 text-right">
                  {overallDecisionsQuality}
                </span>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>🥗 Alimentación</span>
                  <span className="font-mono font-bold text-[#581420] text-sm">{nutrition}/10</span>
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

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>🏃 Ejercicio Físico</span>
                  <span className="font-mono font-bold text-[#581420] text-sm">{exercise}/10</span>
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

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>💤 Descanso</span>
                  <span className="font-mono font-bold text-[#581420] text-sm">{rest}/10</span>
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
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Detalle empírico de hábitos (cómo decidió el cliente):
              </label>
              <input
                type="text"
                value={decisionNotes}
                onChange={e => setDecisionNotes(e.target.value)}
                placeholder="Ej. Caminó 30 min por la mañana, cenó liviano antes de las 21hs, reguló café..."
                className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>
          </div>

          {/* 2. GESTIÓN EMOCIONAL CON EL TEMA QUE TRAE */}
          <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F2ECE3]">
              <div className="w-7 h-7 rounded-lg bg-[#C38B3A]/20 text-[#581420] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="font-serif font-bold text-[#581420] text-sm">
                Gestión Emocional con el Tema que Trae en esta Sesión
              </h4>
            </div>

            <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15">
              <label className="block text-xs font-bold text-[#581420] mb-0.5">
                Pregunta clave de indagación:
              </label>
              <p className="text-xs font-serif italic text-[#2B231F] mb-2">
                "¿Cuál fue la emoción desafiante que más te costó entender o gestionar entre sesión y sesión?"
              </p>
              <input
                type="text"
                value={hardestEmotionToManage}
                onChange={e => setHardestEmotionToManage(e.target.value)}
                placeholder="Ej. Frustración por sobrecarga, Miedo al rechazo si pongo límites, Ansiedad..."
                className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs font-bold text-[#8C3A49]"
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
                  className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-medium"
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
                    placeholder="Escribir nombre de la emoción..."
                    className="w-full mt-2 px-3 py-1.5 bg-white rounded-lg border border-[#DACDC0] text-xs"
                  />
                )}
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-[#6A6057] mb-1">
                  <span>Intensidad Sentida de la Emoción</span>
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
                ¿Esta emoción intervino o boicoteó tus decisiones del día siguiente?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setInterferedWithDecisions('no')}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    interferedWithDecisions === 'no'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0] hover:bg-white'
                  }`}
                >
                  ✓ No (Pudo gestionarla)
                </button>
                <button
                  type="button"
                  onClick={() => setInterferedWithDecisions('parcial')}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    interferedWithDecisions === 'parcial'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0] hover:bg-white'
                  }`}
                >
                  ⚠ Parcialmente
                </button>
                <button
                  type="button"
                  onClick={() => setInterferedWithDecisions('si')}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    interferedWithDecisions === 'si'
                      ? 'bg-[#8C3A49] text-white border-[#8C3A49] shadow-sm'
                      : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0] hover:bg-white'
                  }`}
                >
                  ✕ Sí (Boicoteó hábitos)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Herramienta de Neuroplasticidad Aplicada para Gestionarla:
              </label>
              <select
                value={neuroTool}
                onChange={e => setNeuroTool(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-medium"
              >
                {COMMON_NEURO_TOOLS.map(tool => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
                <option value="Otra">Otra técnica específica...</option>
              </select>

              {neuroTool === 'Otra' && (
                <input
                  type="text"
                  value={customNeuroTool}
                  onChange={e => setCustomNeuroTool(e.target.value)}
                  placeholder="Escribir técnica aplicada..."
                  className="w-full mt-2 px-3 py-1.5 bg-white rounded-lg border border-[#DACDC0] text-xs"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Notas de cómo se gestionó:
              </label>
              <input
                type="text"
                value={emotionalNotes}
                onChange={e => setEmotionalNotes(e.target.value)}
                placeholder="¿Qué conversación interna tuvo? ¿Pudo frenar a tiempo el impulso automático?..."
                className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
              />
            </div>
          </div>

          {/* 3. TAREA PENDIENTE & NOTAS DE SESIÓN */}
          <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F2ECE3]">
              <div className="w-7 h-7 rounded-lg bg-[#581420]/10 text-[#581420] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="font-serif font-bold text-[#581420] text-sm">
                Tarea Pendiente para la Próxima Sesión & Notas Clínicas
              </h4>
            </div>

            <div className="p-4 bg-[#581420]/5 border-2 border-[#581420]/25 rounded-2xl space-y-1.5">
              <label className="block text-xs font-bold text-[#581420]">
                Tarea que queda pendiente para la próxima sesión / día siguiente:
              </label>
              <p className="text-[11px] text-[#6A6057]">
                Compromiso de neuroplasticidad acordado para entrenar con la app AliveGamers:
              </p>
              <textarea
                rows={2}
                value={nextTask}
                onChange={e => setNextTask(e.target.value)}
                placeholder="Ej. Caminar 20 min los martes y jueves, registrar en AliveGamers antes de responder correos..."
                className="w-full px-3 py-2 bg-white rounded-xl border border-[#DACDC0] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                Notas y observaciones de sesión del Coach (Cecilia):
              </label>
              <textarea
                rows={3}
                value={coachNotes}
                onChange={e => setCoachNotes(e.target.value)}
                placeholder="Observaciones clínicas, reencuadres realizados, avances en neuroplasticidad..."
                className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#6A6057] hover:text-[#2B231F]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E4B062]" />
            <span>Guardar Sesión #{sessionNumber} de Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
};
