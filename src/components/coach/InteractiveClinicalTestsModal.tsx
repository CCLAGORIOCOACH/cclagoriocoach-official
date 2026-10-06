import React, { useState } from 'react';
import {
  LifeAreaKey,
  LIFE_AREAS,
  AreaBelief,
  ENNEAGRAM_TYPES,
} from '../../types/coaching';
import {
  ENNEAGRAM_QUESTIONNAIRE,
  BELIEFS_QUESTIONNAIRE,
  LIFE_SATISFACTION_ITEMS,
} from '../../data/clinicalQuestionnaires';
import {
  X,
  Brain,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Heart,
  Activity,
  Award,
  Copy,
  Check,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface InteractiveClinicalTestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  anonymousCode: string;
  initialEnneatype?: number;
  initialWheel?: Record<LifeAreaKey, number>;
  initialBeliefs?: Record<LifeAreaKey, AreaBelief>;
  onApplyResults: (results: {
    enneatype: number;
    dominantDrainArea: LifeAreaKey;
    lifeWheel: Record<LifeAreaKey, number>;
    beliefs: Record<LifeAreaKey, AreaBelief>;
  }) => void;
  title?: string;
  subtitle?: string;
}

export const InteractiveClinicalTestsModal: React.FC<InteractiveClinicalTestsModalProps> = ({
  isOpen,
  onClose,
  clientName,
  anonymousCode,
  initialEnneatype = 3,
  initialWheel,
  initialBeliefs,
  onApplyResults,
  title = 'Batería Diagnóstica · Mapa Interno',
  subtitle = 'Test de Eneatipos, Creencias en las 7 Áreas y Rueda de Satisfacción',
}) => {
  const [activeTab, setActiveTab] = useState<'eneatipo' | 'creencias' | 'rueda'>('eneatipo');

  // 1. ENEATIPO RESPUESTAS
  // Map of questionId -> selectedOptionIndex
  const [enneaAnswers, setEnneaAnswers] = useState<Record<string, number>>({});
  const [manualOverrideEnneatype, setManualOverrideEnneatype] = useState<number | null>(null);
  const [isCopiedProfile, setIsCopiedProfile] = useState(false);

  // 2. CREENCIAS RESPUESTAS
  // Map of beliefId -> Likert score (1 to 5)
  const [beliefScores, setBeliefScores] = useState<Record<string, number>>(() => {
    const defaultScores: Record<string, number> = {};
    BELIEFS_QUESTIONNAIRE.forEach(item => {
      // Default to neutral/moderate
      defaultScores[item.id] = item.type === 'limiting' ? 4 : 2;
    });
    return defaultScores;
  });

  // 3. RUEDA DE SATISFACCIÓN RESPUESTAS
  const [wheelScores, setWheelScores] = useState<Record<LifeAreaKey, number>>(() => {
    if (initialWheel) return { ...initialWheel };
    return {
      cuerpo_mente: 4.5,
      pareja: 5.0,
      familia: 5.0,
      amigos: 5.0,
      trabajo_vocacion: 4.0,
      finanzas: 5.5,
      ocio: 3.5,
    };
  });

  if (!isOpen) return null;

  // --- CÁLCULO DE ENEATIPO ---
  const enneaTally: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  Object.entries(enneaAnswers).forEach(([qId, optIdx]) => {
    const q = ENNEAGRAM_QUESTIONNAIRE.find(item => item.id === qId);
    if (q && q.options[optIdx]) {
      const typeNum = q.options[optIdx].enneatype;
      enneaTally[typeNum] = (enneaTally[typeNum] || 0) + 1;
    }
  });

  // Find max votes or fallback to initialEnneatype
  let computedEnneatype = manualOverrideEnneatype ?? initialEnneatype;
  if (manualOverrideEnneatype === null) {
    let maxVotes = 0;
    Object.entries(enneaTally).forEach(([typeStr, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        computedEnneatype = Number(typeStr);
      }
    });
  }

  const enneaInfo = ENNEAGRAM_TYPES.find(t => t.number === computedEnneatype);

  const handleCopyProfileFeedback = async () => {
    if (!enneaInfo) return;
    const text = `🧠 *DEVOLUCIÓN DE PERSONALIDAD & PATRÓN NEUROBIOLÓGICO · ALIVE GAME*
Cliente: *${clientName}* (${anonymousCode})
Perfil: *Tipo ${computedEnneatype} · ${enneaInfo.name}*
${enneaInfo.triadName}

💥 *HERIDA PRIMARIA INCONSCIENTE:*
"${enneaInfo.coreWound}"

🧬 *PERFIL DE PERSONALIDAD EN GENERAL:*
${enneaInfo.personalitySummary}

🛡️ *MECANISMO DE DEFENSA & BOICOT TRANSVERSAL:*
${enneaInfo.defenseMechanism}

⚡ *PATRÓN NEUROBIOLÓGICO & SEÑAL SOMÁTICA:*
• Neurobiología: ${enneaInfo.neuroPattern}
• Señal en el cuerpo: ${enneaInfo.somaticSignal}

🧭 *GUÍA PARA LAS SESIONES DE NEUROCOACHING:*
${enneaInfo.sessionExplorerTip}
_(Este patrón opera de forma transversal en la personalidad. En las sesiones individuales exploramos su impacto en la problemática puntual: pareja, familia, hábitos, finanzas o vocación)._

🌱 *DIRECCIÓN DE CRECIMIENTO & NEUROPLASTICIDAD:*
${enneaInfo.growthDirection}

_ALIVE GAME · Sanar el vínculo cuerpo-mente con decisiones conscientes._`;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopiedProfile(true);
      setTimeout(() => setIsCopiedProfile(false), 3000);
    } catch (e) {
      console.error('Error copying profile feedback:', e);
    }
  };

  // --- CÁLCULO DE CREENCIAS POR ÁREA ---
  const calculatedBeliefs: Record<LifeAreaKey, AreaBelief> = {} as any;
  const drainRanking: { areaKey: LifeAreaKey; limitingPct: number }[] = [];

  LIFE_AREAS.forEach(area => {
    const limItem = BELIEFS_QUESTIONNAIRE.find(b => b.areaKey === area.key && b.type === 'limiting');
    const empItem = BELIEFS_QUESTIONNAIRE.find(b => b.areaKey === area.key && b.type === 'empowered');

    const limScore = limItem ? (beliefScores[limItem.id] || 3) : 3; // 1 to 5
    const empScore = empItem ? (beliefScores[empItem.id] || 3) : 3; // 1 to 5

    // Total points 2 to 10
    const total = limScore + empScore;
    const limitingPercentage = Math.round((limScore / total) * 100);
    const empoweredPercentage = 100 - limitingPercentage;

    calculatedBeliefs[area.key] = {
      limitingPercentage,
      empoweredPercentage,
      limitingBeliefSnippet: limItem ? limItem.statement : '',
      empoweredBeliefSnippet: empItem ? empItem.statement : '',
    };

    drainRanking.push({ areaKey: area.key, limitingPct: limitingPercentage });
  });

  drainRanking.sort((a, b) => b.limitingPct - a.limitingPct);
  const detectedDrainArea = drainRanking[0]?.areaKey || 'cuerpo_mente';

  const handleApply = () => {
    onApplyResults({
      enneatype: computedEnneatype,
      dominantDrainArea: detectedDrainArea,
      lifeWheel: wheelScores,
      beliefs: calculatedBeliefs,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#F9F6F0] rounded-3xl border border-[#EADBCA] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#581420] via-[#45101A] to-[#2B231F] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C38B3A]/20 border border-[#C38B3A]/40 flex items-center justify-center text-[#E4B062]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E4B062]">
                  Batería Diagnóstica Clínica · Neurocoaching ICF
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                {title}
              </h3>
              <p className="text-xs text-white/80">
                Cliente: <strong className="text-white">{clientName}</strong> ({anonymousCode}) · {subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#FAF7F2] border-b border-[#EADBCA] px-6 py-2.5 flex items-center justify-between shrink-0 text-xs overflow-x-auto">
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={() => setActiveTab('eneatipo')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'eneatipo'
                  ? 'bg-[#581420] text-white font-bold shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-[#E4B062]" />
              <span>1. Test Eneatipo & Personalidad ({Object.keys(enneaAnswers).length}/{ENNEAGRAM_QUESTIONNAIRE.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('creencias')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'creencias'
                  ? 'bg-[#581420] text-white font-bold shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C38B3A]" />
              <span>2. Creencias por Área (7 Áreas)</span>
            </button>

            <button
              onClick={() => setActiveTab('rueda')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'rueda'
                  ? 'bg-[#581420] text-white font-bold shadow-sm'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#6B705C]" />
              <span>3. Rueda de Satisfacción Objetiva</span>
            </button>
          </div>

          {/* Quick live indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#581420] bg-white px-3 py-1 rounded-lg border border-[#EADBCA]">
            <span>Eneatipo: <strong>Tipo {computedEnneatype}</strong></span>
            <span>·</span>
            <span>Drenaje: <strong>{LIFE_AREAS.find(a => a.key === detectedDrainArea)?.shortLabel}</strong></span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B231F]">
          {/* ========================================================================= */}
          {/* TAB 1: TEST DE ENEATIPO & HERIDA DECISIONAL */}
          {/* ========================================================================= */}
          {activeTab === 'eneatipo' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3 text-xs text-[#581420]">
                <Brain className="w-5 h-5 text-[#C38B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#581420] mb-0.5">
                    Metodología de Diagnóstico de Personalidad & Eneatipos en Sesión
                  </strong>
                  Léele cada una de las {ENNEAGRAM_QUESTIONNAIRE.length} situaciones diagnósticas al cliente. Pídele que elija la opción que más describe su impulso biológico o reacción defensiva automática. El sistema sumará los puntos y determinará su Eneatipo de personalidad, herida primaria y patrón somático transversal.
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                {ENNEAGRAM_QUESTIONNAIRE.map((item, qIdx) => (
                  <div
                    key={item.id}
                    className="p-5 bg-white rounded-2xl border border-[#EADBCA] shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#F2ECE3] gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                        {item.triadLabel}
                      </span>
                      <span className="text-[11px] text-[#8C8176] italic">
                        Guía Coach: {item.coachInstruction}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#581420]">
                      {item.question}
                    </h4>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {item.options.map((opt, optIdx) => {
                        const isSelected = enneaAnswers[item.id] === optIdx;
                        return (
                          <button
                            key={opt.enneatype}
                            type="button"
                            onClick={() =>
                              setEnneaAnswers(prev => ({ ...prev, [item.id]: optIdx }))
                            }
                            className={`p-3.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#581420] text-white border-[#581420] shadow-md'
                                : 'bg-[#FAF7F2] text-[#2B231F] border-[#EADBCA] hover:border-[#C38B3A]'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className={`font-serif font-bold text-xs ${isSelected ? 'text-[#E4B062]' : 'text-[#581420]'}`}>
                                  Eneatipo {opt.enneatype}
                                </span>
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/10 text-white' : 'bg-[#581420]/10 text-[#581420]'}`}>
                                  {opt.wound}
                                </span>
                              </div>
                              <p className="leading-snug text-xs mt-1">
                                "{opt.text}"
                              </p>
                            </div>

                            <div className={`mt-2 pt-2 border-t text-[10px] italic ${isSelected ? 'border-white/15 text-white/80' : 'border-[#EADBCA] text-[#6A6057]'}`}>
                              Señal biológica: {opt.somaticSignal}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comprehensive Clinical Feedback on Personality & Neurobiology */}
              <div className="p-6 bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EEE6] rounded-3xl border-2 border-[#581420]/30 shadow-lg space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EADBCA] gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#581420] text-white px-2.5 py-0.5 rounded-full">
                        {enneaInfo?.triadName}
                      </span>
                      {manualOverrideEnneatype !== null && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C38B3A] text-[#2B231F] px-2 py-0.5 rounded-full">
                          Ajuste Manual Fijado
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#581420]">
                      Eneatipo {computedEnneatype}: {enneaInfo?.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyProfileFeedback}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isCopiedProfile
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-[#581420] border-[#DACDC0] hover:bg-[#FAF7F2]'
                      }`}
                      title="Copiar devolución completa del perfil para WhatsApp o notas"
                    >
                      {isCopiedProfile ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#C38B3A]" />
                          <span>Copiar Devolución</span>
                        </>
                      )}
                    </button>

                    <select
                      value={computedEnneatype}
                      onChange={e => setManualOverrideEnneatype(Number(e.target.value))}
                      className="px-3 py-1.5 bg-white rounded-xl border border-[#DACDC0] text-xs font-bold text-[#581420]"
                      title="Cambiar o fijar eneatipo manualmente"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <option key={n} value={n}>
                          Fijar Tipo {n}
                        </option>
                      ))}
                    </select>

                    {manualOverrideEnneatype !== null && (
                      <button
                        type="button"
                        onClick={() => setManualOverrideEnneatype(null)}
                        className="text-[11px] text-[#8C8176] hover:text-[#581420] underline"
                      >
                        Reiniciar
                      </button>
                    )}
                  </div>
                </div>

                {/* Grid with Core Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Herida Primaria */}
                  <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200/80 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A49] block flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#8C3A49]" />
                      <span>Herida Primaria Inconsciente</span>
                    </span>
                    <p className="font-serif font-bold text-sm text-[#581420]">
                      "{enneaInfo?.coreWound}"
                    </p>
                    <p className="text-[11px] text-[#4A413B] leading-relaxed">
                      <strong>Mecanismo de defensa:</strong> {enneaInfo?.defenseMechanism}
                    </p>
                  </div>

                  {/* Patrón Neurobiológico & Somático */}
                  <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-[#C38B3A]" />
                      <span>Patrón Neurobiológico & Somático</span>
                    </span>
                    <p className="text-xs text-[#2B231F] leading-relaxed">
                      {enneaInfo?.neuroPattern}
                    </p>
                    <p className="text-[11px] text-[#6A6057] pt-1 border-t border-amber-200/50">
                      <strong>Señal en el cuerpo:</strong> {enneaInfo?.somaticSignal}
                    </p>
                  </div>
                </div>

                {/* Perfil de Personalidad en General */}
                <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] shadow-sm space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#581420] block">
                    Perfil de Personalidad Integral (Válido para cualquier área de vida)
                  </span>
                  <p className="text-xs text-[#2B231F] leading-relaxed">
                    {enneaInfo?.personalitySummary}
                  </p>
                </div>

                {/* Explorer tip in session */}
                <div className="p-4 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3 text-xs text-[#581420]">
                  <Compass className="w-5 h-5 text-[#C38B3A] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block font-bold">
                      Orientación de Neurocoaching para la Sesión:
                    </strong>
                    <p className="text-xs text-[#4A413B] leading-relaxed">
                      {enneaInfo?.sessionExplorerTip}
                    </p>
                    <span className="text-[11px] text-[#8C8176] italic block">
                      📌 Regla del Método ALIVE GAME: Este perfil describe el funcionamiento de personalidad global. En las sesiones no etiquetamos, sino que vemos cómo este patrón genera bloqueos concretos en el área específica que el cliente traiga a consulta.
                    </span>
                  </div>
                </div>

                {/* Dirección de Crecimiento */}
                <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900">
                  <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-emerald-800">
                      Dirección de Integración y Neuroplasticidad:
                    </strong>
                    <p className="text-xs leading-relaxed mt-0.5">
                      {enneaInfo?.growthDirection}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: CUESTIONARIO DIAGNÓSTICO DE CREENCIAS EN LAS 7 ÁREAS */}
          {/* ========================================================================= */}
          {activeTab === 'creencias' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3 text-xs text-[#581420]">
                <Layers className="w-5 h-5 text-[#C38B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#581420] mb-0.5">
                    Diagnóstico de Creencias Limitantes vs. Empoderadas
                  </strong>
                  Léele cada una de las afirmaciones al cliente y pregúntale: <em>"Del 1 al 5, ¿qué tan identificado te sientes con esta frase hoy?"</em> (1: Nada identificado, 5: Totalmente identificado). El sistema calculará el porcentaje exacto y detectará automáticamente cuál es el área que más energía le drena.
                </div>
              </div>

              {/* Areas breakdown */}
              <div className="space-y-4">
                {LIFE_AREAS.map(area => {
                  const limItem = BELIEFS_QUESTIONNAIRE.find(b => b.areaKey === area.key && b.type === 'limiting');
                  const empItem = BELIEFS_QUESTIONNAIRE.find(b => b.areaKey === area.key && b.type === 'empowered');
                  const calc = calculatedBeliefs[area.key];
                  const isDrain = detectedDrainArea === area.key;

                  return (
                    <div
                      key={area.key}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isDrain
                          ? 'bg-[#581420]/5 border-[#581420]/40 shadow-sm'
                          : 'bg-white border-[#EADBCA]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#F2ECE3] gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-base text-[#581420]">
                            {area.label}
                          </h4>
                          {isDrain && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#581420] text-white px-2 py-0.5 rounded-full">
                              ⚠ Foco de Drenaje Máximo
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className="text-[#8C3A49] font-bold">
                            Limitante: {calc.limitingPercentage}%
                          </span>
                          <span className="text-[#6B705C] font-bold">
                            Empoderada: {calc.empoweredPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Statements items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        {/* Limiting statement */}
                        {limItem && (
                          <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-200/80 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A49] block">
                              Afirmación de Creencia Limitante:
                            </span>
                            <p className="text-xs text-[#2B231F] font-medium leading-relaxed">
                              "{limItem.statement}"
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[11px] text-[#6A6057]">Nivel de identificación:</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(rating => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() =>
                                      setBeliefScores(prev => ({ ...prev, [limItem.id]: rating }))
                                    }
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                                      (beliefScores[limItem.id] || 3) === rating
                                        ? 'bg-[#8C3A49] text-white shadow-sm'
                                        : 'bg-white text-[#4A413B] border border-[#DACDC0] hover:bg-gray-50'
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Empowered statement */}
                        {empItem && (
                          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B705C] block">
                              Afirmación de Creencia Empoderada:
                            </span>
                            <p className="text-xs text-[#2B231F] font-medium leading-relaxed">
                              "{empItem.statement}"
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[11px] text-[#6A6057]">Nivel de identificación:</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(rating => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() =>
                                      setBeliefScores(prev => ({ ...prev, [empItem.id]: rating }))
                                    }
                                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                                      (beliefScores[empItem.id] || 3) === rating
                                        ? 'bg-[#6B705C] text-white shadow-sm'
                                        : 'bg-white text-[#4A413B] border border-[#DACDC0] hover:bg-gray-50'
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: RUEDA DE SATISFACCIÓN OBJETIVA (1 A 10) */}
          {/* ========================================================================= */}
          {activeTab === 'rueda' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3 text-xs text-[#581420]">
                <Activity className="w-5 h-5 text-[#C38B3A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#581420] mb-0.5">
                    Evaluación Objetiva de Satisfacción (Rueda de la Vida)
                  </strong>
                  Léele la pregunta diagnóstica de cada área y oriéntalo con los descriptores de anclaje (1-3, 4-6, 7-10) para fijar el puntaje empírico de satisfacción.
                </div>
              </div>

              <div className="space-y-4">
                {LIFE_SATISFACTION_ITEMS.map(item => {
                  const currentScore = wheelScores[item.areaKey] ?? 5;
                  return (
                    <div
                      key={item.areaKey}
                      className="p-5 bg-white rounded-2xl border border-[#EADBCA] shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#F2ECE3]">
                        <h4 className="font-serif font-bold text-base text-[#581420]">
                          {item.label}
                        </h4>
                        <span className="font-mono text-lg font-bold text-[#581420] bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EADBCA]">
                          {currentScore} <span className="text-xs text-[#8C8176]">/ 10</span>
                        </span>
                      </div>

                      <p className="text-xs text-[#2B231F] font-medium leading-relaxed">
                        Pregunta al cliente: <em>"{item.diagnosticQuestion}"</em>
                      </p>

                      {/* Slider bar */}
                      <div className="pt-1">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={currentScore}
                          onChange={e =>
                            setWheelScores(prev => ({
                              ...prev,
                              [item.areaKey]: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full accent-[#581420] cursor-pointer"
                        />
                      </div>

                      {/* Anchors descriptor row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#6A6057] pt-1">
                        <div className="p-2 bg-red-50/50 rounded-lg border border-red-100">
                          <span className="font-bold text-[#8C3A49] block text-[10px]">1 - 3 (Insatisfacción):</span>
                          {item.lowScoreAnchor}
                        </div>
                        <div className="p-2 bg-amber-50/50 rounded-lg border border-amber-100">
                          <span className="font-bold text-amber-800 block text-[10px]">4 - 6 (Funcional / Meseta):</span>
                          {item.mediumScoreAnchor}
                        </div>
                        <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                          <span className="font-bold text-emerald-800 block text-[10px]">7 - 10 (Plenitud / Vitalidad):</span>
                          {item.highScoreAnchor}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Confirmation CTA */}
        <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#6A6057]">
            <span>Resultados calculados: </span>
            <strong className="text-[#581420]">Eneatipo {computedEnneatype}</strong>
            <span> · Mayor drenaje: </span>
            <strong className="text-[#8C3A49]">{LIFE_AREAS.find(a => a.key === detectedDrainArea)?.label}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#6A6057] hover:text-[#2B231F]"
            >
              Cerrar sin guardar
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2.5 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-[#E4B062]" />
              <span>Aplicar Resultados al Expediente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
