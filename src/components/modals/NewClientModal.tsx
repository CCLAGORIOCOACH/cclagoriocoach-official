import React, { useState } from 'react';
import {
  ClientRecord,
  InitialBaseline,
  LIFE_AREAS,
  LifeAreaKey,
  ENNEAGRAM_TYPES,
  AreaBelief,
  ProgramType,
} from '../../types/coaching';
import { X, Sparkles, AlertCircle, Target, Clock } from 'lucide-react';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newClient: ClientRecord) => void;
  existingCount: number;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingCount,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // General client details
  const generatedId = `CL-2026-${String(existingCount + 1).padStart(3, '0')}`;
  const generatedAnonCode = `CL-${String(existingCount + 1).padStart(2, '0')}`;

  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [programType, setProgramType] = useState<ProgramType>('programa_10');
  const [totalSessionsPlanned, setTotalSessionsPlanned] = useState<1 | 6 | 10>(10);
  const [transformationalTopic, setTransformationalTopic] = useState('');
  const [transformationalBackground, setTransformationalBackground] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPubliclyAggregated, setIsPubliclyAggregated] = useState(true);

  // Baseline data
  const [enneatype, setEnneatype] = useState<number>(3);
  const [enneatypeWing, setEnneatypeWing] = useState('');
  const [dominantDrainArea, setDominantDrainArea] = useState<LifeAreaKey>('cuerpo_mente');
  const [isWorkAlignedWithVocation, setIsWorkAlignedWithVocation] = useState<'si' | 'parcial' | 'no'>('parcial');
  const [workVocationNotes, setWorkVocationNotes] = useState('');

  // Life Wheel initial
  const [lifeWheel, setLifeWheel] = useState<Record<LifeAreaKey, number>>({
    cuerpo_mente: 4,
    pareja: 5,
    familia: 5,
    amigos: 5,
    trabajo_vocacion: 4,
    finanzas: 6,
    ocio: 3,
  });

  // Beliefs initial
  const [beliefs, setBeliefs] = useState<Record<LifeAreaKey, AreaBelief>>({
    cuerpo_mente: {
      limitingPercentage: 70,
      empoweredPercentage: 30,
      limitingBeliefSnippet: 'Si me detengo, soy débil.',
      empoweredBeliefSnippet: 'El descanso recarga mi sistema nervioso.',
    },
    pareja: {
      limitingPercentage: 50,
      empoweredPercentage: 50,
      limitingBeliefSnippet: '',
      empoweredBeliefSnippet: '',
    },
    familia: {
      limitingPercentage: 50,
      empoweredPercentage: 50,
      limitingBeliefSnippet: '',
      empoweredBeliefSnippet: '',
    },
    amigos: {
      limitingPercentage: 50,
      empoweredPercentage: 50,
      limitingBeliefSnippet: '',
      empoweredBeliefSnippet: '',
    },
    trabajo_vocacion: {
      limitingPercentage: 60,
      empoweredPercentage: 40,
      limitingBeliefSnippet: '',
      empoweredBeliefSnippet: '',
    },
    finanzas: {
      limitingPercentage: 50,
      empoweredPercentage: 50,
      limitingBeliefSnippet: '',
      empoweredBeliefSnippet: '',
    },
    ocio: {
      limitingPercentage: 75,
      empoweredPercentage: 25,
      limitingBeliefSnippet: 'Descansar me hace sentir culpable.',
      empoweredBeliefSnippet: 'El ocio amplifica mi neuroplasticidad.',
    },
  });

  // Childhood stimuli
  const [motherWords, setMotherWords] = useState<[string, string, string]>(['Exigente', 'Amorosa', 'Presente']);
  const [fatherWords, setFatherWords] = useState<[string, string, string]>(['Trabajador', 'Distante', 'Fuerte']);
  const [siblingsWords, setSiblingsWords] = useState<[string, string, string]>(['Compañero', 'Rival', 'Alejador']);

  // Initial vital decisions
  const [nutrition, setNutrition] = useState(4);
  const [exercise, setExercise] = useState(3);
  const [rest, setRest] = useState(3);
  const [vitalNotes, setVitalNotes] = useState('');
  const [initialPredominantEmotion, setInitialPredominantEmotion] = useState('Ansiedad por sobrecarga');
  const [generalObservations, setGeneralObservations] = useState('');

  if (!isOpen) return null;

  const handleWheelChange = (area: LifeAreaKey, val: number) => {
    setLifeWheel(prev => ({ ...prev, [area]: val }));
  };

  const handleBeliefChange = (area: LifeAreaKey, limiting: number) => {
    setBeliefs(prev => ({
      ...prev,
      [area]: {
        ...prev[area],
        limitingPercentage: limiting,
        empoweredPercentage: 100 - limiting,
      },
    }));
  };

  const handleSave = () => {
    const baselineData: InitialBaseline = {
      enneatype,
      enneatypeWing,
      dominantDrainArea,
      isWorkAlignedWithVocation,
      workVocationNotes,
      lifeWheel,
      beliefs,
      childhoodStimuli: [
        { figure: 'madre', figureLabel: 'Madre', words: motherWords },
        { figure: 'padre', figureLabel: 'Padre', words: fatherWords },
        { figure: 'hermanos', figureLabel: 'Hermanos / Entorno', words: siblingsWords },
      ],
      initialVitalDecisions: {
        nutrition,
        exercise,
        rest,
        notes: vitalNotes,
      },
      initialPredominantEmotion,
      generalObservations,
    };

    const newClient: ClientRecord = {
      id: generatedId,
      anonymousCode: generatedAnonCode,
      clientName: clientName || `Cliente ${generatedAnonCode}`,
      contactEmail,
      contactPhone,
      programType,
      totalSessionsPlanned,
      startDate,
      status: 'active',
      isPubliclyAggregated,
      baseline: baselineData,
      sessions: [],
      transformationalSession: programType === 'sesion_unica_75' ? {
        specificTopic: transformationalTopic || 'Tema específico planteado en consulta',
        backgroundProcessSummary: transformationalBackground || 'Cliente con proceso analítico o personal previo.',
        sessionDurationMinutes: 75,
        date: startDate,
        howClientDecidedInitially: '',
        initialImpactNotes: '',
        activeEnneatypeWound: '',
        dominantLimitingBelief: '',
        initialVitalEnergy: 4,
        initialEmotion: initialPredominantEmotion,
        selfDiscovery: '',
        breakthroughSomaticMoment: '',
        transformationDuringSession: '',
        mindsetDirectives: [],
        newEmpoweredDecisionRule: '',
        concreteActionAnchor: '',
        finalVitalEnergy: 8,
        finalEmotion: 'Claridad y Empoderamiento',
        completedAt: '',
      } : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#F9F6F0] rounded-2xl border border-[#E4DACD] shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#581420] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#E4B062] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Alta de Historia Clínica Evolutiva</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              Nuevo Cliente · Expediente {generatedId}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-[#FAF7F2] border-b border-[#EADBCA] px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium">
            <button
              onClick={() => setStep(1)}
              className={`px-3 py-1 rounded-md transition-colors ${
                step === 1 ? 'bg-[#581420] text-white font-semibold' : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              1. Ficha Privada
            </button>
            <span>/</span>
            <button
              onClick={() => setStep(2)}
              className={`px-3 py-1 rounded-md transition-colors ${
                step === 2 ? 'bg-[#581420] text-white font-semibold' : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              2. Eneatipo & Vínculos
            </button>
            <span>/</span>
            <button
              onClick={() => setStep(3)}
              className={`px-3 py-1 rounded-md transition-colors ${
                step === 3 ? 'bg-[#581420] text-white font-semibold' : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              3. Rueda & Creencias
            </button>
            <span>/</span>
            <button
              onClick={() => setStep(4)}
              className={`px-3 py-1 rounded-md transition-colors ${
                step === 4 ? 'bg-[#581420] text-white font-semibold' : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              4. Energía Vital Inicial
            </button>
          </div>

          <span className="text-xs font-mono text-[#8C8176]">Paso {step} de 4</span>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#2B231F]">
          {/* STEP 1: General Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3 bg-[#C38B3A]/10 border border-[#C38B3A]/30 rounded-xl flex items-start gap-2.5 text-xs text-[#581420]">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#C38B3A] mt-0.5" />
                <p>
                  <strong>Privacidad Garantizada (RGPD y Ley 25.326):</strong> El nombre y datos de contacto solo son visibles para ti en este panel de coach. En la landing pública de cclagoriocoach.com solo figurará como <strong>"{generatedAnonCode}"</strong> o de forma agregada estadística.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    Nombre o Referencia Interna (Privado) *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Ej. Valeria M."
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    Código Anónimo Asignado
                  </label>
                  <input
                    type="text"
                    disabled
                    value={generatedAnonCode}
                    className="w-full px-3 py-2 bg-[#EFE8DE] rounded-lg border border-[#DACDC0] text-sm font-mono font-bold text-[#581420]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    Email de Contacto (Privado)
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="cliente@ejemplo.com"
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    Teléfono / WhatsApp (Privado)
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="+54 9 11 ..."
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1.5">
                    Modalidad y Formato del Programa
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProgramType('sesion_unica_75');
                        setTotalSessionsPlanned(1);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all relative ${
                        programType === 'sesion_unica_75'
                          ? 'bg-[#581420] text-white border-[#581420] shadow-sm'
                          : 'bg-white text-[#4A413B] border-[#DACDC0] hover:border-[#581420]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Sesión Única (75 min)</span>
                        <Clock className={`w-3.5 h-3.5 ${programType === 'sesion_unica_75' ? 'text-[#E4B062]' : 'text-[#8C8176]'}`} />
                      </div>
                      <p className={`text-[10px] leading-tight ${programType === 'sesion_unica_75' ? 'text-white/80' : 'text-[#6A6057]'}`}>
                        Sesión espejo transformadora para temas específicos con clientes de recorrido previo.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProgramType('programa_6');
                        setTotalSessionsPlanned(6);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        programType === 'programa_6'
                          ? 'bg-[#581420] text-white border-[#581420] shadow-sm'
                          : 'bg-white text-[#4A413B] border-[#DACDC0] hover:border-[#581420]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Programa 6 Sesiones</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${programType === 'programa_6' ? 'bg-white/20' : 'bg-gray-100'}`}>6 S</span>
                      </div>
                      <p className={`text-[10px] leading-tight ${programType === 'programa_6' ? 'text-white/80' : 'text-[#6A6057]'}`}>
                        Enfoque acelerado de neuroplasticidad y consolidación de hábitos esenciales.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProgramType('programa_10');
                        setTotalSessionsPlanned(10);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        programType === 'programa_10'
                          ? 'bg-[#581420] text-white border-[#581420] shadow-sm'
                          : 'bg-white text-[#4A413B] border-[#DACDC0] hover:border-[#581420]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">Programa 10 Sesiones</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${programType === 'programa_10' ? 'bg-white/20' : 'bg-gray-100'}`}>10 S</span>
                      </div>
                      <p className={`text-[10px] leading-tight ${programType === 'programa_10' ? 'text-white/80' : 'text-[#6A6057]'}`}>
                        Proceso completo e integral de re-mapeo del mundo emocional, neuroplasticidad y hábitos.
                      </p>
                    </button>
                  </div>
                </div>

                {programType === 'sesion_unica_75' && (
                  <div className="sm:col-span-2 bg-[#FAF7F2] p-4 rounded-xl border border-[#C38B3A]/40 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#581420]">
                      <Target className="w-4 h-4 text-[#C38B3A]" />
                      <span>Configuración de la Sesión Transformadora de 75 Minutos</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                        Tema Puntual en Específico que trae a destrabar *
                      </label>
                      <input
                        type="text"
                        value={transformationalTopic}
                        onChange={e => setTransformationalTopic(e.target.value)}
                        placeholder="Ej. Bloqueo para poner límites a socios de negocio y terror al rechazo"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                        Antecedentes y Proceso Previo del Cliente
                      </label>
                      <input
                        type="text"
                        value={transformationalBackground}
                        onChange={e => setTransformationalBackground(e.target.value)}
                        placeholder="Ej. Viene de 2 años de terapia analítica; necesita un quiebre somático y directivas claras."
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-xs"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    Fecha de Inicio / Sesión
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-sm"
                  />
                </div>
              </div>

              {/* Public aggregation toggle */}
              <div className="p-4 bg-white rounded-xl border border-[#EADBCA] flex items-center justify-between">
                <div>
                  <span className="font-semibold text-xs text-[#2B231F] block">
                    Publicar métricas evolutivas anónimas en cclagoriocoach.com
                  </span>
                  <span className="text-[11px] text-[#6A6057]">
                    Tú tienes el control absoluto: activa para que los avances de este proceso sumen al promedio global.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isPubliclyAggregated}
                  onChange={e => setIsPubliclyAggregated(e.target.checked)}
                  className="w-5 h-5 accent-[#581420] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Enneagram & Childhood */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                  Eneatipo Inicial Identificado *
                </label>
                <select
                  value={enneatype}
                  onChange={e => setEnneatype(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] focus:border-[#581420] outline-none text-sm font-medium"
                >
                  {ENNEAGRAM_TYPES.map(type => (
                    <option key={type.number} value={type.number}>
                      Eneatipo {type.number}: {type.name}
                    </option>
                  ))}
                </select>

                <div className="mt-2 p-3 bg-[#FAF7F2] rounded-lg border border-[#EADBCA] text-xs text-[#5C524C] space-y-1">
                  <p>
                    <strong>Patrón Neurobiológico:</strong>{' '}
                    {ENNEAGRAM_TYPES.find(t => t.number === enneatype)?.neuroPattern}
                  </p>
                  <p>
                    <strong>Dirección de Integración:</strong>{' '}
                    {ENNEAGRAM_TYPES.find(t => t.number === enneatype)?.growthDirection}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                  Ala o Subtipo (Opcional)
                </label>
                <input
                  type="text"
                  value={enneatypeWing}
                  onChange={e => setEnneatypeWing(e.target.value)}
                  placeholder="Ej. Ala 2 (Conservación)"
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    Área que Drena más Energía Actualmente *
                  </label>
                  <select
                    value={dominantDrainArea}
                    onChange={e => setDominantDrainArea(e.target.value as LifeAreaKey)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-sm font-medium text-[#581420]"
                  >
                    {LIFE_AREAS.map(a => (
                      <option key={a.key} value={a.key}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                    ¿Actividades diarias y Vocación están alineadas?
                  </label>
                  <select
                    value={isWorkAlignedWithVocation}
                    onChange={e => setIsWorkAlignedWithVocation(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-sm"
                  >
                    <option value="si">Sí (Plena alineación con propósito)</option>
                    <option value="parcial">Parcial (Le agrada pero le drena energía)</option>
                    <option value="no">No (Desalineación severa / crisis de sentido)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                  Notas sobre Propósito, Ocupación y Sentido de Vida
                </label>
                <textarea
                  rows={2}
                  value={workVocationNotes}
                  onChange={e => setWorkVocationNotes(e.target.value)}
                  placeholder="Describir las ocupaciones actuales, el sentir vocacional y el sentido de vida..."
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs"
                />
              </div>

              {/* Childhood 3 words */}
              <div className="border-t border-[#EADBCA] pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] mb-2">
                  Mapa de Estímulos de la Infancia (3 Palabras por Figura)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                      Madre (3 palabras)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={motherWords[0]}
                        onChange={e => setMotherWords([e.target.value, motherWords[1], motherWords[2]])}
                        placeholder="Palabra 1"
                        className="px-2 py-1.5 bg-white rounded border border-[#DACDC0] text-xs"
                      />
                      <input
                        type="text"
                        value={motherWords[1]}
                        onChange={e => setMotherWords([motherWords[0], e.target.value, motherWords[2]])}
                        placeholder="Palabra 2"
                        className="px-2 py-1.5 bg-white rounded border border-[#DACDC0] text-xs"
                      />
                      <input
                        type="text"
                        value={motherWords[2]}
                        onChange={e => setMotherWords([motherWords[0], motherWords[1], e.target.value])}
                        placeholder="Palabra 3"
                        className="px-2 py-1.5 bg-white rounded border border-[#DACDC0] text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                      Padre (3 palabras)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={fatherWords[0]}
                        onChange={e => setFatherWords([e.target.value, fatherWords[1], fatherWords[2]])}
                        placeholder="Palabra 1"
                        className="px-2 py-1.5 bg-white rounded border border-[#DACDC0] text-xs"
                      />
                      <input
                        type="text"
                        value={fatherWords[1]}
                        onChange={e => setFatherWords([fatherWords[0], e.target.value, fatherWords[2]])}
                        placeholder="Palabra 2"
                        className="px-2 py-1.5 bg-white rounded border border-[#DACDC0] text-xs"
                      />
                      <input
                        type="text"
                        value={fatherWords[2]}
                        onChange={e => setFatherWords([fatherWords[0], fatherWords[1], e.target.value])}
                        placeholder="Palabra 3"
                        className="px-2 py-1.5 bg-white rounded border border-[#DACDC0] text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Life Wheel & Beliefs */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] mb-3">
                  Rueda de la Vida Inicial (Satisfacción 1 - 10)
                </h4>
                <div className="space-y-3">
                  {LIFE_AREAS.map(a => (
                    <div key={a.key} className="p-2.5 bg-white rounded-xl border border-[#EADBCA]">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#2B231F]">{a.label}</span>
                        <span className="font-mono font-bold text-[#581420]">{lifeWheel[a.key]} / 10</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.5"
                        value={lifeWheel[a.key]}
                        onChange={e => handleWheelChange(a.key, parseFloat(e.target.value))}
                        className="w-full accent-[#581420] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Beliefs split */}
              <div className="border-t border-[#EADBCA] pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420] mb-3">
                  Porcentaje de Creencias: Limitantes vs Empoderadas por Área
                </h4>
                <div className="space-y-3">
                  {LIFE_AREAS.map(a => {
                    const b = beliefs[a.key];
                    return (
                      <div key={a.key} className="p-3 bg-white rounded-xl border border-[#EADBCA] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#2B231F]">{a.label}</span>
                          <div className="flex items-center gap-2 font-mono text-[11px]">
                            <span className="text-[#8C3A49] font-bold">Lim: {b.limitingPercentage}%</span>
                            <span className="text-[#6B705C] font-bold">Emp: {b.empoweredPercentage}%</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={b.limitingPercentage}
                          onChange={e => handleBeliefChange(a.key, parseInt(e.target.value))}
                          className="w-full accent-[#8C3A49] cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Vital Decisions & Initial Emotion */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 bg-white rounded-xl border border-[#EADBCA] space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#581420]">
                  Pilares de la Energía Vital Inicial (Decisiones Cotidianas)
                </h4>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#2B231F]">🥗 Calificación de Alimentación (1 - 10)</span>
                    <span className="font-mono font-bold text-[#581420]">{nutrition} / 10</span>
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

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#2B231F]">🏃 Ejercicio Físico & Movimiento (1 - 10)</span>
                    <span className="font-mono font-bold text-[#581420]">{exercise} / 10</span>
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

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#2B231F]">💤 Descanso & Calidad de Sueño (1 - 10)</span>
                    <span className="font-mono font-bold text-[#581420]">{rest} / 10</span>
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

                <div className="pt-2 border-t border-[#F2EDE4] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6B705C]">
                    Energía Vital Inicial Computada:
                  </span>
                  <span className="text-base font-mono font-bold text-[#581420] bg-[#FAF7F2] px-3 py-1 rounded-lg border border-[#EADBCA]">
                    {((nutrition + exercise + rest) / 3).toFixed(1)} / 10
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                  Emoción Predominante de Inicio *
                </label>
                <input
                  type="text"
                  required
                  value={initialPredominantEmotion}
                  onChange={e => setInitialPredominantEmotion(e.target.value)}
                  placeholder="Ej. Ansiedad por autoexigencia, Culpa al poner límites, Miedo al rechazo, Apatía..."
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A413B] mb-1">
                  Observaciones Clínicas Generales de Partida
                </label>
                <textarea
                  rows={3}
                  value={generalObservations}
                  onChange={e => setGeneralObservations(e.target.value)}
                  placeholder="Señales de somatización, lenguaje corporal, alertas de auto-boicot inicial..."
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#DACDC0] text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-between shrink-0">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 border border-[#DACDC0] text-xs font-semibold text-[#4A413B] rounded-lg hover:bg-white transition-colors"
              >
                Anterior
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

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="px-5 py-2 bg-[#581420] text-white text-xs font-semibold rounded-lg hover:bg-[#6D1B29] transition-colors"
              >
                Siguiente Paso
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-[#C38B3A] text-[#2B231F] text-xs font-bold rounded-lg hover:bg-[#D49C4B] transition-colors shadow-md"
              >
                Guardar e Iniciar Programa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
