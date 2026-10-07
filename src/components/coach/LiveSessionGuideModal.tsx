import React, { useState } from 'react';
import {
  ClientRecord,
  SessionRecord,
  LIFE_AREAS,
  LifeAreaKey,
  TaskFeedback,
  FinalEvaluation,
  AreaBelief,
  TransformationalSingleSessionData,
} from '../../types/coaching';
import {
  ENNEATYPE_DECISION_QUESTIONS,
  AREA_DIAGNOSTIC_PROMPTS,
} from '../../data/mapaInternoTest';
import { LIFE_SATISFACTION_ITEMS } from '../../data/clinicalQuestionnaires';
import { RadarChart } from '../charts/RadarChart';
import {
  X,
  Play,
  CheckCircle2,
  Brain,
  Zap,
  Heart,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  AlertTriangle,
  Award,
  HelpCircle,
  Clock,
  Target,
  Compass,
  Printer,
  FileText,
} from 'lucide-react';

interface LiveSessionGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ClientRecord;
  targetSessionNumber: number; // e.g. 1, 2, 3...
  onSaveSession: (session: SessionRecord) => void;
  onSaveBaselineUpdate?: (updatedBaseline: any) => void;
  onSaveFinalEvaluation?: (finalEval: FinalEvaluation) => void;
  onSaveTransformationalSession?: (data: TransformationalSingleSessionData) => void;
}

export const LiveSessionGuideModal: React.FC<LiveSessionGuideModalProps> = ({
  isOpen,
  onClose,
  client,
  targetSessionNumber,
  onSaveSession,
  onSaveBaselineUpdate,
  onSaveFinalEvaluation,
  onSaveTransformationalSession,
}) => {
  const isTransformational = client.programType === 'sesion_unica_75' || client.totalSessionsPlanned === 1;
  const isSessionOne = !isTransformational && targetSessionNumber === 1 && client.sessions.length === 0;
  const isFinalSession = !isTransformational && targetSessionNumber === client.totalSessionsPlanned;

  // Previous task to review
  const previousTask = isSessionOne
    ? ''
    : client.sessions.length > 0
    ? client.sessions[client.sessions.length - 1].actionCommitment
    : client.baseline.sessionOneTaskForSessionTwo || 'Iniciar registro diario en la app AliveGamers';

  const [step, setStep] = useState<number>(1);

  // --- Intermediate session fields ---
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);

  // Step 1: Task Feedback
  const [taskStatus, setTaskStatus] = useState<'cumplida_total' | 'cumplida_parcial' | 'boicot_bloqueo'>('cumplida_total');
  const [taskFeedbackNotes, setTaskFeedbackNotes] = useState('');
  const [boicotPattern, setBoicotPattern] = useState('');

  // Step 2: Vital Decisions
  const [overallDecisionsQuality, setOverallDecisionsQuality] = useState<number>(7);
  const [nutrition, setNutrition] = useState<number>(7);
  const [exercise, setExercise] = useState<number>(6);
  const [rest, setRest] = useState<number>(7);
  const [decisionNotes, setDecisionNotes] = useState('');

  // Step 3: Hardest Emotion & Neuroplasticity
  const [hardestEmotion, setHardestEmotion] = useState('Ansiedad por sobrecarga');
  const [emotionIntensity, setEmotionIntensity] = useState<number>(6);
  const [interferedWithDecisions, setInterferedWithDecisions] = useState<'no' | 'parcial' | 'si'>('no');
  const [neuroTool, setNeuroTool] = useState('Pausa de interocepción y respiración diafragmática 4-7-8');
  const [emotionNotes, setEmotionNotes] = useState('');

  // Step 4: Life Wheel & Notes
  const [lifeWheel, setLifeWheel] = useState<Record<LifeAreaKey, number>>(() => {
    if (client.sessions.length > 0) {
      return { ...client.sessions[client.sessions.length - 1].lifeWheelSnapshot };
    }
    return { ...client.baseline.lifeWheel };
  });

  const [coachNotes, setCoachNotes] = useState('');

  // Step 5: Next Session Task
  const [nextTask, setNextTask] = useState('');

  // --- Session 1 Questionnaire state ---
  const [s1ConsultationReason, setS1ConsultationReason] = useState(
    client.consultationReason || client.baseline.consultationReason || ''
  );
  const [s1SessionIntroduction, setS1SessionIntroduction] = useState(
    client.baseline.sessionIntroduction || ''
  );
  const [s1ExpectedOutcomes, setS1ExpectedOutcomes] = useState('');
  const [enneaAnswers, setEnneaAnswers] = useState<Record<string, number>>({});
  const [enneaCalculated, setEnneaCalculated] = useState<number>(client.baseline.enneatype || 3);
  const [s1Beliefs, setS1Beliefs] = useState<Record<LifeAreaKey, AreaBelief>>(() => {
    const base: Record<LifeAreaKey, AreaBelief> = { ...client.baseline.beliefs };
    LIFE_AREAS.forEach(area => {
      if (!base[area.key]) {
        base[area.key] = {
          limitingPercentage: 60,
          empoweredPercentage: 40,
          limitingBeliefSnippet: '',
          empoweredBeliefSnippet: '',
        };
      }
    });
    return base;
  });
  const [s1Wheel, setS1Wheel] = useState<Record<LifeAreaKey, number>>(() => {
    return {
      cuerpo_mente: client.baseline.lifeWheel.cuerpo_mente ?? 5,
      finanzas: client.baseline.lifeWheel.finanzas ?? 5,
      pareja: client.baseline.lifeWheel.pareja ?? 5,
      vocacion: client.baseline.lifeWheel.vocacion ?? 5,
      trabajo: client.baseline.lifeWheel.trabajo ?? 5,
      ocio: client.baseline.lifeWheel.ocio ?? 4,
      familia: client.baseline.lifeWheel.familia ?? 5,
      amigos: client.baseline.lifeWheel.amigos ?? 5,
    };
  });
  const [s1DrainArea, setS1DrainArea] = useState<LifeAreaKey>(client.baseline.dominantDrainArea || 'cuerpo_mente');
  const [s1MotherWords, setS1MotherWords] = useState<[string, string, string]>(
    client.baseline.childhoodStimuli.find(s => s.figure === 'madre')?.words || ['Exigente', 'Amorosa', 'Presente']
  );
  const [s1FatherWords, setS1FatherWords] = useState<[string, string, string]>(
    client.baseline.childhoodStimuli.find(s => s.figure === 'padre')?.words || ['Trabajador', 'Distante', 'Fuerte']
  );
  const [s1TaskForS2, setS1TaskForS2] = useState('Identificar 1 momento de impulso automático al día y registrar en AliveGamers');

  // --- Final Session state ---
  const [finalMilestones, setFinalMilestones] = useState(
    'Aumento de energía vital autónoma.\nReencuadre de la creencia central de autoexigencia.\nAlineación entre el quehacer diario y el propósito vocacional.'
  );
  const [finalBoicotProtocol, setFinalBoicotProtocol] = useState(
    'Al notar tensión en cuello o mandíbula, pausar 10 minutos y aplicar protocolo de respiración de AliveGamers.'
  );
  const [finalCoachSummary, setFinalCoachSummary] = useState(
    'El proceso de neurocoaching completó con honores la re-alineación de hábitos y el fortalecimiento de la soberanía interna.'
  );

  // --- Transformational 75-min session state ---
  const [tTopic, setTTopic] = useState(
    client.transformationalSession?.specificTopic || ''
  );
  const [tBackground, setTBackground] = useState(
    client.transformationalSession?.backgroundProcessSummary || ''
  );
  const [tHowDecided, setTHowDecided] = useState(
    client.transformationalSession?.howClientDecidedInitially || ''
  );
  const [tImpact, setTImpact] = useState(
    client.transformationalSession?.initialImpactNotes || ''
  );
  const [tWound, setTWound] = useState(
    client.transformationalSession?.activeEnneatypeWound || `Eneatipo ${client.baseline.enneatype} · Herida activa`
  );
  const [tLimitingBelief, setTLimitingBelief] = useState(
    client.transformationalSession?.dominantLimitingBelief || (client.baseline.beliefs[client.baseline.dominantDrainArea]?.limitingBeliefSnippet || '')
  );
  const [tInitialEnergy, setTInitialEnergy] = useState<number>(
    client.transformationalSession?.initialVitalEnergy || 4
  );
  const [tInitialEmotion, setTInitialEmotion] = useState(
    client.transformationalSession?.initialEmotion || client.baseline.initialPredominantEmotion || 'Angustia y sobrecarga'
  );

  // Phase 2 (40 min)
  const [tSelfDiscovery, setTSelfDiscovery] = useState(
    client.transformationalSession?.selfDiscovery || ''
  );
  const [tSomaticMoment, setTSomaticMoment] = useState(
    client.transformationalSession?.breakthroughSomaticMoment || ''
  );
  const [tTransformation, setTTransformation] = useState(
    client.transformationalSession?.transformationDuringSession || ''
  );

  // Phase 3 (20 min)
  const [tDirectives, setTDirectives] = useState<string[]>(
    client.transformationalSession?.mindsetDirectives?.length ? client.transformationalSession.mindsetDirectives : [
      '1. Regla de Oro: Mi dignidad y descanso no se negocian para complacer a terceros.',
      '2. Chequeo Somático: Si siento mandíbula apretada o nudo en garganta, la respuesta es NO.',
      '3. Desarme de la Culpa: La culpa es el eco del viejo hábito, no una señal de error.',
    ]
  );
  const [tNewRule, setTNewRule] = useState(
    client.transformationalSession?.newEmpoweredDecisionRule || ''
  );
  const [tActionAnchor, setTActionAnchor] = useState(
    client.transformationalSession?.concreteActionAnchor || ''
  );
  const [tFinalEnergy, setTFinalEnergy] = useState<number>(
    client.transformationalSession?.finalVitalEnergy || 8.5
  );
  const [tFinalEmotion, setTFinalEmotion] = useState(
    client.transformationalSession?.finalEmotion || 'Claridad Serena y Firmeza Soberana'
  );
  const [tCoachPrivateNotes, setTCoachPrivateNotes] = useState(
    client.transformationalSession?.coachNotesPrivate || ''
  );

  if (!isOpen) return null;

  const vitalEnergyScore = Number(((nutrition + exercise + rest) / 3).toFixed(1));

  // Handle Enneagram Option Selection in Session 1
  const handleSelectEnneaOption = (qId: string, enneaNum: number) => {
    const updated = { ...enneaAnswers, [qId]: enneaNum };
    setEnneaAnswers(updated);
    setEnneaCalculated(enneaNum);
  };

  const handleFinishSession = () => {
    if (isTransformational && onSaveTransformationalSession) {
      const transData: TransformationalSingleSessionData = {
        specificTopic: tTopic || 'Tema específico abordado en la sesión de 75 minutos',
        backgroundProcessSummary: tBackground,
        sessionDurationMinutes: 75,
        date: sessionDate,
        howClientDecidedInitially: tHowDecided,
        initialImpactNotes: tImpact,
        activeEnneatypeWound: tWound,
        dominantLimitingBelief: tLimitingBelief,
        initialVitalEnergy: tInitialEnergy,
        initialEmotion: tInitialEmotion,
        selfDiscovery: tSelfDiscovery,
        breakthroughSomaticMoment: tSomaticMoment,
        transformationDuringSession: tTransformation,
        mindsetDirectives: tDirectives.filter(d => d.trim().length > 0),
        newEmpoweredDecisionRule: tNewRule,
        concreteActionAnchor: tActionAnchor,
        finalVitalEnergy: tFinalEnergy,
        finalEmotion: tFinalEmotion,
        diagnosticSnapshot: {
          enneatype: enneaCalculated || client.baseline.enneatype,
          areaKey: client.baseline.dominantDrainArea || 'cuerpo_mente',
          beforeSatisfaction: tInitialEnergy,
          afterClarity: tFinalEnergy,
        },
        coachNotesPrivate: tCoachPrivateNotes,
        completedAt: new Date().toISOString(),
      };
      onSaveTransformationalSession(transData);
      onClose();
      return;
    }
    const prevFeedback: TaskFeedback = {
      taskDescription: previousTask || 'Tarea de la sesión anterior',
      completionStatus: taskStatus,
      clientFeedbackNotes: taskFeedbackNotes,
      boicotPatternIdentified: boicotPattern,
    };

    // Calculate empowered snapshots
    const empoweredSnapshot: Record<LifeAreaKey, number> = {} as any;
    LIFE_AREAS.forEach(a => {
      const baseEmp = client.baseline.beliefs[a.key]?.empoweredPercentage ?? 40;
      // Slight progressive nudge based on session number
      empoweredSnapshot[a.key] = Math.min(95, baseEmp + targetSessionNumber * 5);
    });

    const newSession: SessionRecord = {
      id: `s-${Date.now()}`,
      sessionNumber: targetSessionNumber,
      date: sessionDate,
      previousTaskFeedback: isSessionOne ? undefined : prevFeedback,
      vitalDecisions: {
        nutrition,
        exercise,
        rest,
        overallDecisionsQuality,
        vitalEnergyScore,
        decisionNotes,
      },
      emotionalManagement: {
        predominantEmotion: hardestEmotion.split('/')[0].trim() || 'Calma',
        hardestEmotionToManage: hardestEmotion,
        intensity: emotionIntensity,
        neuroplasticityToolApplied: neuroTool,
        interferedWithDecisions,
        emotionalNotes: emotionNotes,
      },
      lifeWheelSnapshot: isSessionOne ? s1Wheel : lifeWheel,
      empoweredBeliefsSnapshot: empoweredSnapshot,
      coachObservations: coachNotes,
      actionCommitment: isSessionOne ? s1TaskForS2 : nextTask,
    };

    // If session 1, update baseline too
    if (isSessionOne && onSaveBaselineUpdate) {
      onSaveBaselineUpdate({
        consultationReason: s1ConsultationReason,
        sessionIntroduction: s1SessionIntroduction,
        enneatype: enneaCalculated,
        lifeWheel: s1Wheel,
        beliefs: s1Beliefs,
        dominantDrainArea: s1DrainArea,
        sessionOneTaskForSessionTwo: s1TaskForS2,
        childhoodStimuli: [
          { figure: 'madre', figureLabel: 'Madre', words: s1MotherWords },
          { figure: 'padre', figureLabel: 'Padre', words: s1FatherWords },
        ],
        initialVitalDecisions: {
          nutrition,
          exercise,
          rest,
          overallDecisionsQuality,
          notes: decisionNotes,
        },
        initialPredominantEmotion: hardestEmotion,
        hardestEmotionToManage: hardestEmotion,
      });
    }

    // If final session, save final evaluation
    if (isFinalSession && onSaveFinalEvaluation) {
      const finalEval: FinalEvaluation = {
        completedAt: sessionDate,
        enneatypeFinal: enneaCalculated,
        lifeWheelFinal: lifeWheel,
        empoweredBeliefsFinal: empoweredSnapshot,
        finalVitalDecisions: {
          nutrition,
          exercise,
          rest,
          vitalEnergyScore,
        },
        predominantEmotionConsolidated: hardestEmotion,
        keyMilestones: finalMilestones.split('\n').filter(m => m.trim().length > 0),
        preventiveBoicotProtocol: finalBoicotProtocol,
        coachSummary: finalCoachSummary,
      };
      onSaveFinalEvaluation(finalEval);
    }

    onSaveSession(newSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#F9F6F0] rounded-3xl border border-[#E4DACD] shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Coach Live Top Header */}
        <div className="bg-gradient-to-r from-[#581420] via-[#45101A] to-[#2B231F] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E4B062]/20 border border-[#E4B062]/40 flex items-center justify-center text-[#E4B062]">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E4B062]">
                  Guía de Sesión en Vivo · Coach Cecilia Lagorio
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                {isTransformational
                  ? 'Sesión Única Transformadora (75 min) · Sesión Espejo'
                  : isSessionOne
                  ? 'Sesión 1: Mapa Interno & Punto de Partida'
                  : isFinalSession
                  ? `Sesión ${targetSessionNumber} (Final): Cierre Evolutivo & Re-Mapeo`
                  : `Sesión ${targetSessionNumber} de ${client.totalSessionsPlanned}: Proceso & Neuroplasticidad`}
              </h3>
              <p className="text-xs text-white/80 font-sans">
                Cliente: <strong className="text-white">{client.clientName}</strong> ({client.anonymousCode})
                {isTransformational && <span className="ml-2 bg-[#E4B062] text-[#2B231F] text-[10px] font-bold px-2 py-0.5 rounded-full">Monotemática Profunda</span>}
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

        {/* Stepper Header Bar */}
        <div className="bg-[#FAF7F2] border-b border-[#EADBCA] px-6 py-2.5 flex items-center justify-between shrink-0 text-xs overflow-x-auto">
          {isTransformational ? (
            <div className="flex items-center gap-2 font-medium">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`px-2.5 py-1 rounded-md transition-colors ${step === 1 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                1. Indagación & Punto de Partida (15 min)
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`px-2.5 py-1 rounded-md transition-colors ${step === 2 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                2. Espejo & Quiebre (40 min)
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`px-2.5 py-1 rounded-md transition-colors ${step === 3 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                3. Mindset Reset & Devolución (20 min)
              </button>
            </div>
          ) : isSessionOne ? (
            <div className="flex items-center gap-1.5 font-medium overflow-x-auto py-0.5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${step === 1 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                1. Motivo & Intro
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${step === 2 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                2. Test Eneatipo
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(3)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${step === 3 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                3. Creencias 8 Áreas
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(4)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${step === 4 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                4. Rueda Satisfacción
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(5)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${step === 5 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                5. Decisiones & Emoción
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={() => setStep(6)}
                className={`px-2 py-1 rounded-md text-[11px] whitespace-nowrap transition-colors ${step === 6 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057] hover:text-[#2B231F]'}`}
              >
                6. Mapa Interno & Tarea S2
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-medium">
              <span className={`px-2.5 py-1 rounded-md ${step === 1 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057]'}`}>
                1. Feedback Tarea Anterior
              </span>
              <span>/</span>
              <span className={`px-2.5 py-1 rounded-md ${step === 2 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057]'}`}>
                2. Calificar Decisiones
              </span>
              <span>/</span>
              <span className={`px-2.5 py-1 rounded-md ${step === 3 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057]'}`}>
                3. Emoción Difícil
              </span>
              <span>/</span>
              <span className={`px-2.5 py-1 rounded-md ${step === 4 ? 'bg-[#581420] text-white font-bold' : 'text-[#6A6057]'}`}>
                4. Notas & Tarea Siguiente
              </span>
              {isFinalSession && (
                <>
                  <span>/</span>
                  <span className={`px-2.5 py-1 rounded-md ${step === 5 ? 'bg-[#C38B3A] text-[#2B231F] font-bold' : 'text-[#6A6057]'}`}>
                    5. Hitos de Cierre
                  </span>
                </>
              )}
            </div>
          )}

          <span className="font-mono text-[#8C8176] ml-4 shrink-0">
            Fase {step}
          </span>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B231F]">
          {/* ========================================================================= */}
          {/* FLOW T: SESIÓN ÚNICA TRANSFORMADORA (75 MINUTOS) */}
          {/* ========================================================================= */}
          {isTransformational && (
            <>
              {/* FASE 1: INDAGACIÓN & PUNTO DE PARTIDA (15 MIN) */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-[#581420]/10 to-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#581420] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wider">
                        Fase 1: Indagación y Punto de Partida (15 Minutos)
                      </h4>
                      <p className="text-xs text-[#6A6057] mt-0.5">
                        Detecta el tema específico que trae a destrabar, cómo estaba decidiendo de esta manera al solicitar la sesión, qué herida de eneatipo y creencia limitante estaban operando en automático.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-4 shadow-sm">
                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        1. Tema Puntual Específico a Abordar en esta Sesión *
                      </label>
                      <input
                        type="text"
                        value={tTopic}
                        onChange={e => setTTopic(e.target.value)}
                        placeholder="Ej. Dificultad para poner límites en vínculos / Ansiedad somatizada en bruxismo / Miedo al conflicto en pareja / Parálisis por autoexigencia"
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        Contexto y Proceso Previo del Cliente
                      </label>
                      <input
                        type="text"
                        value={tBackground}
                        onChange={e => setTBackground(e.target.value)}
                        placeholder="Ej. Viene de un proceso personal o terapéutico previo; busca un quiebre somático vivencial y directivas de mindset claras."
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-4 shadow-sm">
                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        2. ¿Cómo estabas decidiendo de esta manera al solicitar la sesión?
                      </label>
                      <p className="text-[11px] text-[#6A6057] mb-1.5 italic">
                        Guión: "Contame cómo venías decidiendo en este tema. ¿Qué costo vital o biológico te generó?"
                      </p>
                      <textarea
                        rows={3}
                        value={tHowDecided}
                        onChange={e => setTHowDecided(e.target.value)}
                        placeholder="Ej. Decidías postergando tus necesidades biológicas para complacer o evitar el conflicto / Decidías desde la hipervigilancia y el miedo a fallar..."
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        Impacto Empírico desde que solicitó la sesión (Somatización y Síntomas)
                      </label>
                      <input
                        type="text"
                        value={tImpact}
                        onChange={e => setTImpact(e.target.value)}
                        placeholder="Ej. Insomnio a las 3 AM, bruxismo grado 2, contractura cervical..."
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#581420] mb-1">
                          Herida del Eneatipo que Gobernaba este Tema
                        </label>
                        <select
                          value={tWound}
                          onChange={e => setTWound(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-medium focus:border-[#581420] outline-none"
                        >
                          <option value="Eneatipo 1 · Herida de Juicio / Perfeccionismo moral">Eneatipo 1 · Herida de Juicio / Perfeccionismo</option>
                          <option value="Eneatipo 2 · Herida de No Ser Amada / Rechazo si pone límites">Eneatipo 2 · Herida de No Ser Amada / Rechazo</option>
                          <option value="Eneatipo 3 · Herida de Fracaso / Autoexigencia de suficiencia">Eneatipo 3 · Herida de Fracaso / Autoexigencia</option>
                          <option value="Eneatipo 4 · Herida de Inadecuación / Carencia e incomprensión">Eneatipo 4 · Herida de Inadecuación / Carencia</option>
                          <option value="Eneatipo 5 · Herida de Invasión / Falta de energía">Eneatipo 5 · Herida de Invasión / Retención</option>
                          <option value="Eneatipo 6 · Herida de Desamparo / Duda y parálisis">Eneatipo 6 · Herida de Desamparo / Parálisis</option>
                          <option value="Eneatipo 7 · Herida de Privación / Dispersión por dopamina">Eneatipo 7 · Herida de Privación / Dispersión</option>
                          <option value="Eneatipo 8 · Herida de Vulnerabilidad / Control y confrontación">Eneatipo 8 · Herida de Vulnerabilidad / Control</option>
                          <option value="Eneatipo 9 · Herida de Conflicto / Desconexión e invisibilidad">Eneatipo 9 · Herida de Conflicto / Desconexión</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#581420] mb-1">
                          Creencia Limitante Raíz que Sostenía el Síntoma
                        </label>
                        <input
                          type="text"
                          value={tLimitingBelief}
                          onChange={e => setTLimitingBelief(e.target.value)}
                          placeholder='Ej. "Si reclamo lo que me corresponde, destruyo la relación"'
                          className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EADBCA]">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-[#581420]">
                            Energía Vital de Entrada:
                          </label>
                          <span className="font-serif font-bold text-amber-700">{tInitialEnergy}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={tInitialEnergy}
                          onChange={e => setTInitialEnergy(parseFloat(e.target.value))}
                          className="w-full accent-[#581420]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#581420] mb-1">
                          Emoción con la que Entra
                        </label>
                        <input
                          type="text"
                          value={tInitialEmotion}
                          onChange={e => setTInitialEmotion(e.target.value)}
                          placeholder="Ej. Angustia opresiva y culpa"
                          className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FASE 2: ESPEJO PROFUNDO & QUIEBRE TRANSFORMADOR (40 MIN) */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-[#581420]/10 to-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#C38B3A] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wider">
                        Fase 2: Espejo Profundo y Quiebre Transformador (40 Minutos)
                      </h4>
                      <p className="text-xs text-[#6A6057] mt-0.5">
                        El núcleo de los 75 minutos: la confrontación amorosa de espejo, el insight donde el cliente ve su propio auto-engaño y la liberación somática inmediata en el cuerpo.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#581420]/5 border border-[#581420]/15 rounded-2xl text-xs text-[#581420] space-y-1">
                    <span className="font-bold block">Preguntas de Espejo de Cecilia para la Sesión en Vivo:</span>
                    <ul className="list-disc list-inside space-y-1 text-[#2B231F]">
                      <li>"¿Qué estás protegiendo realmente al seguir asumiendo esta carga?"</li>
                      <li>"¿Dónde sentís la tensión física ahora mismo cuando decís que no podés soltarlo?"</li>
                      <li>"¿Quién se muere si decís que NO con serenidad?"</li>
                      <li>"¿Qué descubrís vos mismo/a en este segundo de silencio?"</li>
                    </ul>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#581420]">
                        1. Lo Que Descubriste Vos Mismo/a Durante la Sesión (La Revelación Central) *
                      </label>
                      <span className="text-[10px] text-[#C38B3A] font-semibold">Ir al Informe de Devolución</span>
                    </div>
                    <p className="text-[11px] text-[#6A6057] italic">
                      Escribe la frase de quiebre en las palabras exactas del cliente ("En esta sesión lo que descubriste vos misma fue que no estabas cuidando la empresa, sino anestesiando el terror a no ser amada...").
                    </p>
                    <textarea
                      rows={4}
                      value={tSelfDiscovery}
                      onChange={e => setTSelfDiscovery(e.target.value)}
                      placeholder="Ej. En esta sesión descubriste vos misma que tu auto-sacrificio no generaba gratitud sino abuso. Al darte cuenta de que no necesitabas comprar afecto con trabajo gratis, tu cuerpo soltó la respiración superficial..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs leading-relaxed"
                    />
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-2 shadow-sm">
                    <label className="block text-xs font-bold text-[#581420]">
                      2. El Momento de Quiebre Somático & Interoceptivo
                    </label>
                    <p className="text-[11px] text-[#6A6057] italic">
                      ¿Dónde y cómo se sintió el alivio en el cuerpo durante la sesión? (relajación de mandíbula, calor en plexo, risa lúcida, lágrimas de desahogo).
                    </p>
                    <textarea
                      rows={2}
                      value={tSomaticMoment}
                      onChange={e => setTSomaticMoment(e.target.value)}
                      placeholder="Ej. Al confrontar la frase '¿Quién se muere si decís que NO?', pasó de la lágrima a una carcajada de lucidez, abriendo la mandíbula y exhalando con un suspiro hondo..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                    />
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-2 shadow-sm">
                    <label className="block text-xs font-bold text-[#581420]">
                      3. Cómo Fue el Cambio que Realizó Durante la Sesión de Transformación
                    </label>
                    <p className="text-[11px] text-[#6A6057] italic">
                      Contraste del antes vs después en la misma sesión (postura, voz, mirada, seguridad).
                    </p>
                    <textarea
                      rows={2}
                      value={tTransformation}
                      onChange={e => setTTransformation(e.target.value)}
                      placeholder="Ej. Entró encorvada, con respiración clavicular corta y voz vacilante; terminó erguida, con mirada firme, pulsaciones en calma y un libreto quirúrgico para plantarse sin pedir perdón..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                    />
                  </div>
                </div>
              )}

              {/* FASE 3: MINDSET RESET & DIRECTIVAS DE AHORA EN MÁS (20 MIN) */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-[#581420]/10 to-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3">
                    <Compass className="w-5 h-5 text-[#581420] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wider">
                        Fase 3: Seteo del Mindset & Directivas de Ahora en Más (20 Minutos)
                      </h4>
                      <p className="text-xs text-[#6A6057] mt-0.5">
                        Setea el mindset en ese tema puntual: qué tiene que tener en cuenta en su vida cotidiana, su regla de oro decisional y el anclaje somático para no volver al viejo patrón.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-3 shadow-sm">
                    <label className="block text-xs font-bold text-[#581420]">
                      1. Qué Tiene Que Tener en Cuenta de Ahora en Más (Tus 3 Directivas de Mindset) *
                    </label>
                    {tDirectives.map((directive, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#581420] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={directive}
                          onChange={e => {
                            const updated = [...tDirectives];
                            updated[idx] = e.target.value;
                            setTDirectives(updated);
                          }}
                          className="flex-1 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-medium focus:border-[#581420] outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-2 shadow-sm">
                    <label className="block text-xs font-bold text-[#581420]">
                      2. Tu Nueva Regla de Oro para Decidir en este Tema
                    </label>
                    <p className="text-[11px] text-[#6A6057] italic">
                      La directiva no negociable que el cliente recordará ante cada situación similar.
                    </p>
                    <input
                      type="text"
                      value={tNewRule}
                      onChange={e => setTNewRule(e.target.value)}
                      placeholder='Ej. "Pongo límites con serenidad implacable: la sociedad solo continúa con contratos claros y métricas equitativas. Si no aceptan, elijo mi paz biológica."'
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-semibold focus:border-[#581420] outline-none text-[#581420]"
                    />
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-2 shadow-sm">
                    <label className="block text-xs font-bold text-[#581420]">
                      3. Anclaje Neuroplástico & Hábito de los Próximos 7 Días
                    </label>
                    <input
                      type="text"
                      value={tActionAnchor}
                      onChange={e => setTActionAnchor(e.target.value)}
                      placeholder="Ej. Antes de entrar a la reunión: 3 min de respiración prolongada, pies firmes y leer la directiva en el teléfono."
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                    />
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-[#581420]">
                            Energía Vital de Salida:
                          </label>
                          <span className="font-serif font-bold text-emerald-700">{tFinalEnergy}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={tFinalEnergy}
                          onChange={e => setTFinalEnergy(parseFloat(e.target.value))}
                          className="w-full accent-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#581420] mb-1">
                          Emoción de Cierre
                        </label>
                        <input
                          type="text"
                          value={tFinalEmotion}
                          onChange={e => setTFinalEmotion(e.target.value)}
                          placeholder="Ej. Claridad Serena y Firmeza Soberana"
                          className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        Anotaciones Privadas de la Coach
                      </label>
                      <textarea
                        rows={2}
                        value={tCoachPrivateNotes}
                        onChange={e => setTCoachPrivateNotes(e.target.value)}
                        placeholder="Notas privadas no visibles en el informe de devolución que se envía al cliente."
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================================= */}
          {/* FLOW A: SESIÓN 1 (MAPA INTERNO COMPLETO · HOJA DE RUTA CLINICA) */}
          {/* ========================================================================= */}
          {isSessionOne && (
            <>
              {/* Step 1: Introducción & Motivo de Consulta */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="p-4 bg-gradient-to-r from-[#581420]/10 via-[#C38B3A]/10 to-transparent border border-[#C38B3A]/30 rounded-2xl flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#581420] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wider">
                        Fase 1: Introducción, Encuadre & Motivo de Consulta
                      </h4>
                      <p className="text-xs text-[#6A6057] mt-0.5">
                        Explora la situación que trae a la persona a consulta, sus expectativas de transformación y realiza el encuadre del proceso de neurocoaching.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#EADBCA] space-y-4 shadow-sm">
                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        1. Motivo de Consulta Principal *
                      </label>
                      <textarea
                        rows={3}
                        value={s1ConsultationReason}
                        onChange={e => setS1ConsultationReason(e.target.value)}
                        placeholder="¿Qué situación puntual, síntoma somático, sobrecarga o quiebre trae al paciente hoy? (ej. fatiga crónica, crisis vocacional, problemas para poner límites, insomnio por rumiación...)"
                        className="w-full p-3 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-medium focus:border-[#581420] outline-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        2. ¿Qué Espera Transformar al Finalizar las Sesiones Contratadas?
                      </label>
                      <input
                        type="text"
                        value={s1ExpectedOutcomes}
                        onChange={e => setS1ExpectedOutcomes(e.target.value)}
                        placeholder="Ej. Poder decir que no sin culpa, recuperar mi descanso reparador y definir mi rumbo vocacional..."
                        className="w-full px-3.5 py-2.5 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        3. Notas de Encuadre & Rapport Clínico de la Coach
                      </label>
                      <textarea
                        rows={2}
                        value={s1SessionIntroduction}
                        onChange={e => setS1SessionIntroduction(e.target.value)}
                        placeholder="Observaciones de apertura: disposición corporal, tono de voz, nivel de receptividad y acuerdo de confidencialidad..."
                        className="w-full p-3 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs focus:border-[#581420] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Test de Eneatipos */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="p-3.5 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-xl text-xs text-[#581420] flex items-start gap-2.5">
                    <Brain className="w-4 h-4 text-[#C38B3A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Fase 2: Test de Eneatipos & Herida Decisional:</strong>
                      Pregúntale al cliente cada reactivo para descubrir el eneatipo mediante el cual está decidiendo en este momento y su centro de boicot somático.
                    </div>
                  </div>

                  {ENNEATYPE_DECISION_QUESTIONS.map(q => (
                    <div key={q.id} className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                          {q.category}
                        </span>
                        <span className="text-[11px] text-[#8C8176] italic">
                          Tip coach: {q.coachTip}
                        </span>
                      </div>

                      <p className="font-serif font-bold text-sm text-[#581420]">
                        "{q.prompt}"
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {q.options.map(opt => {
                          const isSelected = enneaAnswers[q.id] === opt.enneatypeNumber;
                          return (
                            <button
                              key={opt.enneatypeNumber}
                              type="button"
                              onClick={() => handleSelectEnneaOption(q.id, opt.enneatypeNumber)}
                              className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#581420] text-white border-[#581420] shadow-sm font-semibold'
                                  : 'bg-[#FAF7F2] text-[#4A413B] border-[#E8DFD3] hover:border-[#C38B3A]'
                              }`}
                            >
                              <span className="font-bold block mb-1">
                                Eneatipo {opt.enneatypeNumber}
                              </span>
                              <span className="text-[11px] leading-snug line-clamp-3">
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-white rounded-xl border border-[#EADBCA] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#6A6057] block">
                        Eneatipo de Partida Detectado:
                      </span>
                      <span className="text-lg font-serif font-bold text-[#581420]">
                        Eneatipo {enneaCalculated}
                      </span>
                    </div>
                    <select
                      value={enneaCalculated}
                      onChange={e => setEnneaCalculated(Number(e.target.value))}
                      className="px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-bold text-[#581420]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                        <option key={n} value={n}>
                          Ajustar a Eneatipo {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Escaneo de Creencias Limitantes vs Empoderadas (8 Áreas de Vida) */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-3.5 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-xl text-xs text-[#581420]">
                    <strong>Fase 3: Escaneo de Creencias (Limitantes vs Empoderadas por Área de Vida):</strong>
                    Calibra con el cliente el porcentaje de creencias limitantes vs empoderadas en cada una de las 8 áreas clave.
                  </div>

                  <div className="space-y-3">
                    {AREA_DIAGNOSTIC_PROMPTS.map(item => {
                      const b = s1Beliefs[item.areaKey] || {
                        limitingPercentage: 60,
                        empoweredPercentage: 40,
                        limitingBeliefSnippet: item.limitingExample,
                        empoweredBeliefSnippet: item.empoweredExample,
                      };

                      const areaConfig = LIFE_AREAS.find(a => a.key === item.areaKey);

                      return (
                        <div key={item.areaKey} className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3 shadow-2xs">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-serif font-bold text-[#581420] text-sm">
                              {areaConfig?.label || item.areaKey}
                            </span>
                            <div className="flex items-center gap-3 font-mono text-[11px]">
                              <span className="text-[#8C3A49] font-bold">Limitante: {b.limitingPercentage}%</span>
                              <span className="text-[#6B705C] font-bold">Empoderada: {b.empoweredPercentage}%</span>
                            </div>
                          </div>

                          <p className="text-xs text-[#4A413B] italic">
                            Pregunta guía: "{item.question}"
                          </p>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={b.limitingPercentage}
                            onChange={e => {
                              const lim = parseInt(e.target.value);
                              setS1Beliefs(prev => ({
                                ...prev,
                                [item.areaKey]: {
                                  ...prev[item.areaKey],
                                  limitingPercentage: lim,
                                  empoweredPercentage: 100 - lim,
                                },
                              }));
                            }}
                            className="w-full accent-[#8C3A49]"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-[10px] text-[#8C3A49] font-bold block mb-0.5">Creencia Limitante Detectada:</span>
                              <input
                                type="text"
                                value={b.limitingBeliefSnippet}
                                onChange={e => {
                                  const val = e.target.value;
                                  setS1Beliefs(prev => ({
                                    ...prev,
                                    [item.areaKey]: { ...prev[item.areaKey], limitingBeliefSnippet: val },
                                  }));
                                }}
                                placeholder={item.limitingExample}
                                className="w-full px-2.5 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#EADBCA] text-xs text-[#4A413B]"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-[#6B705C] font-bold block mb-0.5">Creencia Empoderada a Instalar:</span>
                              <input
                                type="text"
                                value={b.empoweredBeliefSnippet}
                                onChange={e => {
                                  const val = e.target.value;
                                  setS1Beliefs(prev => ({
                                    ...prev,
                                    [item.areaKey]: { ...prev[item.areaKey], empoweredBeliefSnippet: val },
                                  }));
                                }}
                                placeholder={item.empoweredExample}
                                className="w-full px-2.5 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#EADBCA] text-xs text-[#4A413B]"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Cuestionario de Niveles de Satisfacción Actual (8 Áreas de Vida) */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420]">
                      Fase 4: Cuestionario de Niveles de Satisfacción Actual (Rueda de la Vida - 8 Áreas)
                    </h4>
                    <p className="text-xs text-[#6A6057]">
                      Pídele al paciente que califique del 1 al 10 su nivel de satisfacción actual en las mismas 8 áreas de vida:
                    </p>

                    <div className="space-y-3 pt-2">
                      {LIFE_SATISFACTION_ITEMS.map(item => {
                        const curVal = s1Wheel[item.areaKey] ?? 5;
                        return (
                          <div
                            key={item.areaKey}
                            className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] text-xs space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#581420] text-sm">{item.label}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-sm font-bold text-[#581420] bg-white px-2 py-0.5 rounded border border-[#EADBCA]">
                                  {curVal} / 10
                                </span>
                              </div>
                            </div>

                            <p className="text-[11px] text-[#4A413B] italic">
                              "{item.diagnosticQuestion}"
                            </p>

                            <input
                              type="range"
                              min="1"
                              max="10"
                              step="0.5"
                              value={curVal}
                              onChange={e =>
                                setS1Wheel(prev => ({ ...prev, [item.areaKey]: parseFloat(e.target.value) }))
                              }
                              className="w-full accent-[#581420]"
                            />

                            <div className="grid grid-cols-3 gap-1 text-[10px] text-[#6A6057]">
                              <span>Bajo: {item.lowScoreAnchor}</span>
                              <span className="text-center">Medio: {item.mediumScoreAnchor}</span>
                              <span className="text-right">Alto: {item.highScoreAnchor}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-[#EADBCA]">
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        ¿Qué área le está drenando más energía en este momento? (Foco de Quiebre Inicial) *
                      </label>
                      <select
                        value={s1DrainArea}
                        onChange={e => setS1DrainArea(e.target.value as any)}
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-bold text-[#581420]"
                      >
                        {LIFE_AREAS.map(a => (
                          <option key={a.key} value={a.key}>
                            {a.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Calidad de Decisiones Vitales & Emoción Predominante */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420]">
                        Fase 5: Medición de Decisiones Vitales & Emoción Predominante
                      </h4>
                      <span className="text-sm font-mono font-bold text-[#581420] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#EADBCA]">
                        Energía Vital de Partida: {Number(((nutrition + exercise + rest) / 3).toFixed(1))} / 10
                      </span>
                    </div>
                    <p className="text-xs text-[#6A6057]">
                      En todas las sesiones se mide la calidad de las decisiones con respecto a alimentación, ejercicio físico y descanso, y la emoción que predomina:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#581420]">🥗 Alimentación</span>
                          <span className="font-mono text-xs font-bold text-[#581420]">{nutrition}/10</span>
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
                        <span className="text-[10px] text-[#6A6057] block mt-1">Calidad nutricional e hidratación</span>
                      </div>

                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#581420]">🏃 Ejercicio Físico</span>
                          <span className="font-mono text-xs font-bold text-[#581420]">{exercise}/10</span>
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
                        <span className="text-[10px] text-[#6A6057] block mt-1">Movimiento y tono muscular</span>
                      </div>

                      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#581420]">💤 Descanso</span>
                          <span className="font-mono text-xs font-bold text-[#581420]">{rest}/10</span>
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
                        <span className="text-[10px] text-[#6A6057] block mt-1">Sueño y desconexión mental</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#581420]">
                          Calidad Global de las Decisiones al Llegar a Sesión 1:
                        </label>
                        <span className="font-mono font-bold text-xs text-[#581420]">{overallDecisionsQuality}/10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={overallDecisionsQuality}
                        onChange={e => setOverallDecisionsQuality(parseFloat(e.target.value))}
                        className="w-full accent-[#581420]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-[#581420] mb-1">
                          Emoción que Predomina en la Sesión *
                        </label>
                        <input
                          type="text"
                          value={hardestEmotion}
                          onChange={e => setHardestEmotion(e.target.value)}
                          placeholder="Ej. Ansiedad por sobrecarga, Miedo a fallar, Agotamiento..."
                          className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs font-medium focus:border-[#581420] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#581420] mb-1">
                          Intensidad Emocional & Somática (1 al 10)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={emotionIntensity}
                            onChange={e => setEmotionIntensity(parseInt(e.target.value))}
                            className="w-full accent-[#8C3A49]"
                          />
                          <span className="font-mono font-bold text-xs text-[#8C3A49] w-6 text-right">
                            {emotionIntensity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Consolidación del Mapa Interno Inicial & Compromiso para Sesión 2 */}
              {step === 6 && (
                <div className="space-y-5">
                  <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                        Fase 6: Consolidación del Mapa Interno Inicial
                      </span>
                      <span className="text-xs font-bold text-[#581420] bg-white px-2.5 py-0.5 rounded border border-[#EADBCA]">
                        Punto de Partida Emocional
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl border border-[#EADBCA]">
                        <span className="text-[11px] font-serif font-bold text-[#581420] mb-1">
                          Rueda de la Vida Inicial (8 Áreas)
                        </span>
                        <RadarChart initialData={s1Wheel} size={220} showLegend={false} />
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-white rounded-xl border border-[#EADBCA]">
                          <span className="text-[10px] text-[#6A6057] uppercase font-bold block">Eneatipo & Herida Raíz:</span>
                          <strong className="text-sm font-serif text-[#581420]">Eneatipo {enneaCalculated}</strong>
                        </div>

                        <div className="p-2.5 bg-white rounded-xl border border-[#EADBCA]">
                          <span className="text-[10px] text-[#6A6057] uppercase font-bold block">Foco de Mayor Drenaje:</span>
                          <strong className="text-xs text-[#8C3A49]">
                            {LIFE_AREAS.find(a => a.key === s1DrainArea)?.label}
                          </strong>
                        </div>

                        <div className="p-2.5 bg-white rounded-xl border border-[#EADBCA]">
                          <span className="text-[10px] text-[#6A6057] uppercase font-bold block">Energía Vital Inicial:</span>
                          <strong className="text-xs text-[#581420]">
                            {Number(((nutrition + exercise + rest) / 3).toFixed(1))} / 10
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estímulos de Niñez */}
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#581420] block">
                      Estímulos de la Infancia (3 palabras por figura)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] font-semibold text-[#C38B3A] block mb-1">Madre:</span>
                        <div className="grid grid-cols-3 gap-1">
                          <input
                            type="text"
                            value={s1MotherWords[0]}
                            onChange={e => setS1MotherWords([e.target.value, s1MotherWords[1], s1MotherWords[2]])}
                            className="px-2 py-1 bg-[#FAF7F2] rounded border text-xs"
                          />
                          <input
                            type="text"
                            value={s1MotherWords[1]}
                            onChange={e => setS1MotherWords([s1MotherWords[0], e.target.value, s1MotherWords[2]])}
                            className="px-2 py-1 bg-[#FAF7F2] rounded border text-xs"
                          />
                          <input
                            type="text"
                            value={s1MotherWords[2]}
                            onChange={e => setS1MotherWords([s1MotherWords[0], s1MotherWords[1], e.target.value])}
                            className="px-2 py-1 bg-[#FAF7F2] rounded border text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-[#C38B3A] block mb-1">Padre:</span>
                        <div className="grid grid-cols-3 gap-1">
                          <input
                            type="text"
                            value={s1FatherWords[0]}
                            onChange={e => setS1FatherWords([e.target.value, s1FatherWords[1], s1FatherWords[2]])}
                            className="px-2 py-1 bg-[#FAF7F2] rounded border text-xs"
                          />
                          <input
                            type="text"
                            value={s1FatherWords[1]}
                            onChange={e => setS1FatherWords([s1FatherWords[0], e.target.value, s1FatherWords[2]])}
                            className="px-2 py-1 bg-[#FAF7F2] rounded border text-xs"
                          />
                          <input
                            type="text"
                            value={s1FatherWords[2]}
                            onChange={e => setS1FatherWords([s1FatherWords[0], s1FatherWords[1], e.target.value])}
                            className="px-2 py-1 bg-[#FAF7F2] rounded border text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Establecimiento de Tarea para Sesión 2 */}
                  <div className="p-4 bg-[#581420]/5 border-2 border-[#581420]/30 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C38B3A]" />
                      Registro Entre Sesión y Sesión · Compromiso para la Sesión 2 *
                    </h4>
                    <p className="text-xs text-[#6A6057]">
                      Fija con el paciente la tarea de neuroplasticidad para sostener y registrar en la app AliveGamers hasta la siguiente sesión:
                    </p>
                    <textarea
                      rows={2}
                      required
                      value={s1TaskForS2}
                      onChange={e => setS1TaskForS2(e.target.value)}
                      placeholder="Ej. Identificar 1 momento de impulso automático al día y registrar en AliveGamers antes de cenar..."
                      className="w-full px-3 py-2 bg-white rounded-xl border border-[#DACDC0] text-xs font-medium"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================================= */}
          {/* FLOW B: SESIONES INTERMEDIAS (SESIÓN 2 EN ADELANTE) */}
          {/* ========================================================================= */}
          {!isSessionOne && (
            <>
              {/* Step 1: Feedback de la tarea anterior */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#FAF7F2] border border-[#EADBCA] rounded-2xl">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                      Fase 1: Feedback de la Tarea de la Sesión Anterior
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#581420] mt-1">
                      Tarea Fijada en la Sesión Anterior:
                    </h4>
                    <p className="text-xs text-[#2B231F] mt-1 bg-white p-3 rounded-xl border border-[#EADBCA] font-medium italic">
                      "{previousTask || 'No había tarea explícita registrada.'}"
                    </p>
                  </div>

                  {/* Question to client */}
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3">
                    <label className="block text-xs font-bold text-[#581420]">
                      Pregunta al Cliente: "¿Cómo te fue con esta tarea entre sesión y sesión?"
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTaskStatus('cumplida_total')}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          taskStatus === 'cumplida_total'
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                            : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                        }`}
                      >
                        ✓ Cumplida con Éxito
                      </button>

                      <button
                        type="button"
                        onClick={() => setTaskStatus('cumplida_parcial')}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          taskStatus === 'cumplida_parcial'
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                        }`}
                      >
                        ⚠ Cumplida Parcialmente
                      </button>

                      <button
                        type="button"
                        onClick={() => setTaskStatus('boicot_bloqueo')}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          taskStatus === 'boicot_bloqueo'
                            ? 'bg-[#8C3A49] text-white border-[#8C3A49] shadow-sm'
                            : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                        }`}
                      >
                        ✕ Boicot / No pudo sostenerla
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                        Notas del feedback del cliente:
                      </label>
                      <textarea
                        rows={2}
                        value={taskFeedbackNotes}
                        onChange={e => setTaskFeedbackNotes(e.target.value)}
                        placeholder="¿Qué sintió al intentar hacerla? ¿Qué obstáculos aparecieron?..."
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                      />
                    </div>

                    {taskStatus === 'boicot_bloqueo' && (
                      <div>
                        <label className="block text-xs font-semibold text-[#8C3A49] mb-1">
                          Patrón de boicot identificado por el coach:
                        </label>
                        <input
                          type="text"
                          value={boicotPattern}
                          onChange={e => setBoicotPattern(e.target.value)}
                          placeholder="Ej. Procrastinación defensiva, auto-exigencia de perfección..."
                          className="w-full px-3 py-1.5 bg-red-50 rounded-lg border border-red-200 text-xs text-[#8C3A49] font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Calificación de Decisiones del 1 al 10 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                        Fase 2: Calificación de Decisiones
                      </span>
                      <span className="text-base font-mono font-bold text-[#581420] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#EADBCA]">
                        Energía Vital: {vitalEnergyScore} / 10
                      </span>
                    </div>

                    {/* Cecilia's primary question */}
                    <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15">
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        Pregunta clave al cliente:
                      </label>
                      <p className="text-sm font-serif italic text-[#2B231F]">
                        "Del 1 al 10, ¿cómo calificarías la calidad de tus decisiones hoy y entre sesión y sesión?"
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={overallDecisionsQuality}
                          onChange={e => setOverallDecisionsQuality(parseFloat(e.target.value))}
                          className="flex-1 accent-[#581420]"
                        />
                        <span className="font-mono text-xl font-bold text-[#581420] w-12 text-right">
                          {overallDecisionsQuality}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown of decisions */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6A6057] block">
                        Desglose en los 3 Pilares Biológicos:
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span>🥗 Alimentación</span>
                            <span className="font-mono text-[#581420] font-bold">{nutrition}/10</span>
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

                        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span>🏃 Ejercicio</span>
                            <span className="font-mono text-[#581420] font-bold">{exercise}/10</span>
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

                        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA]">
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span>💤 Descanso</span>
                            <span className="font-mono text-[#581420] font-bold">{rest}/10</span>
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

                    <div>
                      <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                        Detalle de decisiones y hábitos:
                      </label>
                      <input
                        type="text"
                        value={decisionNotes}
                        onChange={e => setDecisionNotes(e.target.value)}
                        placeholder="Ej. Caminó 30 min por la mañana, cenó liviano, bajó café..."
                        className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Emoción que más costó entender/gestionar */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                      Fase 3: Gestión Emocional & Neuroplasticidad
                    </span>

                    {/* Question to client */}
                    <div className="p-3 bg-[#581420]/5 rounded-xl border border-[#581420]/15">
                      <label className="block text-xs font-bold text-[#581420] mb-1">
                        Pregunta clave al cliente:
                      </label>
                      <p className="text-sm font-serif italic text-[#2B231F]">
                        "¿Cuál fue la emoción que más te costó entender o gestionar entre sesión y sesión?"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                          Emoción Identificada
                        </label>
                        <input
                          type="text"
                          required
                          value={hardestEmotion}
                          onChange={e => setHardestEmotion(e.target.value)}
                          placeholder="Ej. Frustración, Ansiedad por sobrecarga, Miedo..."
                          className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-bold text-[#8C3A49]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-[#6A6057] mb-1">
                          <span>Intensidad de la Emoción</span>
                          <span className="font-mono text-[#581420] font-bold">{emotionIntensity} / 10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={emotionIntensity}
                          onChange={e => setEmotionIntensity(parseInt(e.target.value))}
                          className="w-full accent-[#581420] mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                        Técnica o Guía de Neuroplasticidad Aplicada:
                      </label>
                      <input
                        type="text"
                        value={neuroTool}
                        onChange={e => setNeuroTool(e.target.value)}
                        placeholder="Ej. Pausa de interocepción 4-7-8, Reencuadre cognitivo..."
                        className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                        ¿Esta emoción intervino o boicoteó tus decisiones del día siguiente?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setInterferedWithDecisions('no')}
                          className={`py-2 px-2 rounded-xl border text-xs font-semibold ${
                            interferedWithDecisions === 'no'
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                          }`}
                        >
                          No (Pudo gestionarla)
                        </button>
                        <button
                          type="button"
                          onClick={() => setInterferedWithDecisions('parcial')}
                          className={`py-2 px-2 rounded-xl border text-xs font-semibold ${
                            interferedWithDecisions === 'parcial'
                              ? 'bg-amber-600 text-white border-amber-600'
                              : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                          }`}
                        >
                          Parcialmente
                        </button>
                        <button
                          type="button"
                          onClick={() => setInterferedWithDecisions('si')}
                          className={`py-2 px-2 rounded-xl border text-xs font-semibold ${
                            interferedWithDecisions === 'si'
                              ? 'bg-[#8C3A49] text-white border-[#8C3A49]'
                              : 'bg-[#FAF7F2] text-[#6A6057] border-[#DACDC0]'
                          }`}
                        >
                          Sí (Boicoteó hábitos)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                        Notas de cómo se gestionó:
                      </label>
                      <input
                        type="text"
                        value={emotionNotes}
                        onChange={e => setEmotionNotes(e.target.value)}
                        placeholder="¿Qué conversación interna tuvo? ¿Pudo frenar a tiempo?..."
                        className="w-full px-3 py-1.5 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Sesión de Coaching & Tarea para la siguiente */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                      Fase 4: Sesión de Coaching & Observaciones Clínicas
                    </span>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                        Observaciones Clínicas del Coach (Cecilia):
                      </label>
                      <textarea
                        rows={3}
                        value={coachNotes}
                        onChange={e => setCoachNotes(e.target.value)}
                        placeholder="Avances en neuroplasticidad, resistencias detectadas, reencuadres realizados..."
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-xl border border-[#DACDC0] text-xs"
                      />
                    </div>
                  </div>

                  {/* Next Task */}
                  <div className="p-4 bg-[#581420]/5 border-2 border-[#581420]/30 rounded-2xl space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#581420] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#C38B3A]" />
                      Fase 5: Tarea Establecida para la Sesión {targetSessionNumber + 1} *
                    </span>
                    <p className="text-xs text-[#6A6057]">
                      Compromiso de neuroplasticidad acordado con el cliente para entrenar en la semana con la app AliveGamers:
                    </p>
                    <textarea
                      rows={2}
                      required
                      value={nextTask}
                      onChange={e => setNextTask(e.target.value)}
                      placeholder="Ej. Caminar 20 min los martes y jueves, registrar en AliveGamers antes de responder correos..."
                      className="w-full px-3 py-2 bg-white rounded-xl border border-[#DACDC0] text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: If Final Session, close evaluation */}
              {isFinalSession && step === 5 && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#EADBCA] space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A] block">
                      Cierre de Desarrollo Evolutivo & Hitos
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#581420]">
                      Re-Mapeo Final para la Hoja de Ruta del Cliente
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                        Hitos Tangibles Alcanzados (uno por línea):
                      </label>
                      <textarea
                        rows={3}
                        value={finalMilestones}
                        onChange={e => setFinalMilestones(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                        Protocolo Preventivo de Boicot (con AliveGamers):
                      </label>
                      <textarea
                        rows={2}
                        value={finalBoicotProtocol}
                        onChange={e => setFinalBoicotProtocol(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                        Conclusión Evolutiva del Coach:
                      </label>
                      <textarea
                        rows={2}
                        value={finalCoachSummary}
                        onChange={e => setFinalCoachSummary(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF7F2] rounded-lg border border-[#DACDC0] text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-between shrink-0">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-[#DACDC0] text-xs font-semibold text-[#4A413B] rounded-xl hover:bg-white flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Paso Anterior</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#6A6057] hover:text-[#2B231F]"
            >
              Cancelar
            </button>

            {/* Next step vs Finish */}
            {(isTransformational && step < 3) || (isSessionOne && step < 6) || (!isTransformational && !isSessionOne && !isFinalSession && step < 4) || (!isTransformational && !isSessionOne && isFinalSession && step < 5) ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-[#581420] text-white text-xs font-bold rounded-xl hover:bg-[#6D1B29] transition-all flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Siguiente Paso</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {isFinalSession && (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2.5 bg-white border border-[#DACDC0] text-[#581420] hover:bg-[#FAF7F2] text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                    title="Imprimir informe final evolutivo para entregar al paciente"
                  >
                    <Printer className="w-4 h-4 text-[#C38B3A]" />
                    <span>Imprimir Informe</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleFinishSession}
                  className="px-6 py-2.5 bg-[#C38B3A] hover:bg-[#D49C4B] text-[#2B231F] text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-1.5 active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isTransformational
                      ? 'Finalizar y Generar Informe de Devolución (75 min)'
                      : isSessionOne
                      ? 'Guardar Sesión 1 & Consolidar Mapa Interno'
                      : isFinalSession
                      ? `Finalizar Proceso & Cerrar Sesión ${targetSessionNumber}`
                      : `Guardar Sesión ${targetSessionNumber} & Registrar Avance`}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
