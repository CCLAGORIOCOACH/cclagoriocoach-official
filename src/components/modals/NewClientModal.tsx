import React, { useState } from 'react';
import {
  ClientRecord,
  InitialBaseline,
  LifeAreaKey,
  AreaBelief,
  ProgramType,
} from '../../types/coaching';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Brain,
  Zap,
  Printer,
  FileText,
} from 'lucide-react';

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
  const generatedId = `CL-2026-${String(existingCount + 1).padStart(3, '0')}`;
  const generatedAnonCode = `CL-${String(existingCount + 1).padStart(2, '0')}`;

  const [clientName, setClientName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [programType, setProgramType] = useState<ProgramType>('programa_10');
  const [totalSessionsPlanned, setTotalSessionsPlanned] = useState<1 | 6 | 10>(10);
  const [consultationReason, setConsultationReason] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [isPubliclyAggregated, setIsPubliclyAggregated] = useState(true);

  if (!isOpen) return null;

  const handleProgramSelect = (type: ProgramType, sessions: 1 | 6 | 10) => {
    setProgramType(type);
    setTotalSessionsPlanned(sessions);
  };

  const handleSave = () => {
    // Default baseline for the 8 life areas, ready to be calibrated in Session 1
    const defaultWheel: Record<LifeAreaKey, number> = {
      cuerpo_mente: 5,
      finanzas: 5,
      pareja: 5,
      vocacion: 5,
      trabajo: 5,
      ocio: 5,
      familia: 5,
      amigos: 5,
    };

    const defaultBeliefs: Record<LifeAreaKey, AreaBelief> = {
      cuerpo_mente: {
        limitingPercentage: 60,
        empoweredPercentage: 40,
        limitingBeliefSnippet: 'Si me detengo, soy débil y pierdo el control.',
        empoweredBeliefSnippet: 'Mi cuerpo es el templo biológico que sostiene mi vitalidad.',
      },
      finanzas: {
        limitingPercentage: 50,
        empoweredPercentage: 50,
        limitingBeliefSnippet: 'El dinero siempre se esfuma; nunca es suficiente para estar en paz.',
        empoweredBeliefSnippet: 'Gestiono mi economía con visión de abundancia y serenidad.',
      },
      pareja: {
        limitingPercentage: 50,
        empoweredPercentage: 50,
        limitingBeliefSnippet: 'Si muestro debilidad o desacuerdo, me dejarán de querer.',
        empoweredBeliefSnippet: 'Merezco un vínculo auténtico donde pueda ser transparente.',
      },
      vocacion: {
        limitingPercentage: 60,
        empoweredPercentage: 40,
        limitingBeliefSnippet: 'Postergo mis dones y vocación real por miedo a no encajar.',
        empoweredBeliefSnippet: 'Mi vitalidad florece cuando alineo mi vida con mi vocación genuina.',
      },
      trabajo: {
        limitingPercentage: 60,
        empoweredPercentage: 40,
        limitingBeliefSnippet: 'Tengo que cargar con toda la sobrecarga para que las cosas salgan.',
        empoweredBeliefSnippet: 'Ejerzo mi labor con límites firmes, solvencia y bienestar.',
      },
      ocio: {
        limitingPercentage: 70,
        empoweredPercentage: 30,
        limitingBeliefSnippet: 'Dedicar tiempo a actividades que no producen me genera culpa.',
        empoweredBeliefSnippet: 'El juego, la pausa y el descanso regeneran mi neuroplasticidad.',
      },
      familia: {
        limitingPercentage: 50,
        empoweredPercentage: 50,
        limitingBeliefSnippet: 'Debo cargar con los problemas del clan para pertenecer.',
        empoweredBeliefSnippet: 'Honro a mi familia poniendo límites sanos y viviendo desde mi soberanía.',
      },
      amigos: {
        limitingPercentage: 50,
        empoweredPercentage: 50,
        limitingBeliefSnippet: 'No tengo tiempo para vida social; mis pendientes van primero.',
        empoweredBeliefSnippet: 'Los lazos seguros, la risa y la pertenencia regulan mi sistema nervioso.',
      },
    };

    const baselineData: InitialBaseline = {
      consultationReason: consultationReason.trim() || 'Motivo de consulta a explorar en Sesión 1',
      sessionIntroduction: '',
      enneatype: 3,
      dominantDrainArea: 'cuerpo_mente',
      isWorkAlignedWithVocation: 'parcial',
      workVocationNotes: '',
      lifeWheel: defaultWheel,
      beliefs: defaultBeliefs,
      childhoodStimuli: [
        { figure: 'madre', figureLabel: 'Madre', words: ['Exigente', 'Amorosa', 'Presente'] },
        { figure: 'padre', figureLabel: 'Padre', words: ['Trabajador', 'Distante', 'Fuerte'] },
        { figure: 'hermanos', figureLabel: 'Hermanos / Entorno', words: ['Compañero', 'Rival', 'Alejador'] },
      ],
      initialVitalDecisions: {
        nutrition: 5,
        exercise: 5,
        rest: 5,
        overallDecisionsQuality: 5,
        notes: '',
      },
      initialPredominantEmotion: 'Ansiedad por sobrecarga',
      hardestEmotionToManage: 'Ansiedad y autoexigencia',
      generalObservations: '',
      sessionOneTaskForSessionTwo: 'Registro diario de decisiones y pausas de neuroplasticidad en la app',
    };

    const newClient: ClientRecord = {
      id: generatedId,
      anonymousCode: generatedAnonCode,
      clientName: clientName.trim() || `Paciente ${generatedAnonCode}`,
      contactEmail: contactEmail.trim() || `${generatedAnonCode.toLowerCase()}@paciente.privado`,
      contactPhone: contactPhone.trim(),
      consultationReason: consultationReason.trim(),
      programType,
      totalSessionsPlanned,
      startDate,
      status: 'active',
      isPubliclyAggregated,
      baseline: baselineData,
      sessions: [],
      transformationalSession: programType === 'sesion_unica_75' ? {
        specificTopic: consultationReason.trim() || 'Tema específico planteado en consulta',
        backgroundProcessSummary: 'Cliente con proceso analítico o personal previo.',
        sessionDurationMinutes: 75,
        date: startDate,
        howClientDecidedInitially: '',
        initialImpactNotes: '',
        activeEnneatypeWound: 'Eneatipo 3 · Búsqueda de suficiencia',
        dominantLimitingBelief: 'Si me detengo, pierdo el control.',
        initialVitalEnergy: 4,
        initialEmotion: 'Ansiedad y sobrecarga',
        selfDiscovery: '',
        breakthroughSomaticMoment: '',
        transformationDuringSession: '',
        mindsetDirectives: [
          '1. Mi descanso y dignidad biológica no se negocian.',
          '2. Señal somática: si aprieto mandíbula o cuello, la respuesta es pausa.',
          '3. Decidir desde la soberanía, no desde el miedo a la desaprobación.',
        ],
        newEmpoweredDecisionRule: '',
        concreteActionAnchor: '',
        finalVitalEnergy: 8.5,
        finalEmotion: 'Claridad y Firmeza Soberana',
        completedAt: '',
      } : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#F9F6F0] rounded-3xl border border-[#E4DACD] shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#581420] via-[#4A111B] to-[#2B231F] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-[#E4B062] text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Alta de Historia Clínica Evolutiva · ALIVE GAME</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Nuevo Paciente · Expediente {generatedId}
            </h3>
            <p className="text-xs text-white/80 mt-0.5 font-sans">
              Código anónimo para informe: <strong className="text-[#E4B062] font-mono">{generatedAnonCode}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Roadmap banner */}
          <div className="p-4 rounded-2xl bg-[#581420]/5 border border-[#581420]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#581420] font-serif font-bold text-sm">
              <Brain className="w-4 h-4 text-[#C38B3A]" />
              <span>Hoja de Ruta del Proceso con el Paciente</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#6A6057] pt-1">
              <div className="bg-white p-2.5 rounded-xl border border-[#E8DFD3]">
                <strong className="text-[#581420] block mb-0.5">1. Sesión 1: Mapa Interno</strong>
                <span>Motivo de consulta, test de eneatipos, escaneo de creencias (8 áreas) y rueda de satisfacción.</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#E8DFD3]">
                <strong className="text-[#581420] block mb-0.5">2. Todas las Sesiones</strong>
                <span>Decisiones (alimentación, ejercicio, descanso), emoción predominante y tareas de neuroplasticidad.</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-[#E8DFD3]">
                <strong className="text-[#581420] block mb-0.5">3. Última Sesión</strong>
                <span>Re-mapeo final, comparativa empírica e impresión del informe para entrega al paciente.</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Paciente Nombre */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#581420] mb-1.5">
                Nombre y Apellido del Paciente <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Ej. Mariana Rossi (solo visible en tu panel privado)"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#DACDC0] text-sm text-[#2B231F] focus:border-[#581420] focus:ring-1 focus:ring-[#581420] outline-none transition-all font-medium"
                autoFocus
              />
            </div>

            {/* Email & Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  placeholder="paciente@correo.com"
                  className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#DACDC0] text-xs text-[#2B231F] focus:border-[#581420] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6A6057] mb-1">
                  Teléfono / WhatsApp de Contacto
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  placeholder="+54 9 11 1234-5678"
                  className="w-full px-3.5 py-2 bg-white rounded-xl border border-[#DACDC0] text-xs text-[#2B231F] focus:border-[#581420] outline-none"
                />
              </div>
            </div>

            {/* Formato Contratado */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#581420] mb-1.5">
                Formato o Programa Contratado
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleProgramSelect('programa_10', 10)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    programType === 'programa_10'
                      ? 'bg-white border-[#581420] ring-2 ring-[#581420]/20 shadow-sm'
                      : 'bg-white/60 border-[#E4DACD] hover:bg-white text-[#6A6057]'
                  }`}
                >
                  <span className="text-xs font-bold text-[#581420] block">Programa 10 Sesiones</span>
                  <span className="text-[10px] text-[#6A6057] block mt-0.5">
                    Proceso evolutivo completo de neuroplasticidad
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProgramSelect('programa_6', 6)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    programType === 'programa_6'
                      ? 'bg-white border-[#581420] ring-2 ring-[#581420]/20 shadow-sm'
                      : 'bg-white/60 border-[#E4DACD] hover:bg-white text-[#6A6057]'
                  }`}
                >
                  <span className="text-xs font-bold text-[#581420] block">Programa 6 Sesiones</span>
                  <span className="text-[10px] text-[#6A6057] block mt-0.5">
                    Focalizado en hábito y área de quiebre
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProgramSelect('sesion_unica_75', 1)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    programType === 'sesion_unica_75'
                      ? 'bg-white border-[#581420] ring-2 ring-[#581420]/20 shadow-sm'
                      : 'bg-white/60 border-[#E4DACD] hover:bg-white text-[#6A6057]'
                  }`}
                >
                  <span className="text-xs font-bold text-[#581420] block">Sesión Única (75 min)</span>
                  <span className="text-[10px] text-[#6A6057] block mt-0.5">
                    Intervención transformadora y quiebre puntual
                  </span>
                </button>
              </div>
            </div>

            {/* Motivo de Consulta e Introducción del Caso */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#581420]">
                  Motivo de Consulta Inicial & Introducción del Caso <span className="text-red-600">*</span>
                </label>
                <span className="text-[11px] text-[#8C8176]">Punto de partida de la Sesión 1</span>
              </div>
              <textarea
                value={consultationReason}
                onChange={e => setConsultationReason(e.target.value)}
                rows={3}
                placeholder="¿Qué situación, síntoma somático, insatisfacción o quiebre trae al paciente hoy? (ej. Fatiga crónica, conflicto vocacional, sobrecarga en el trabajo, dificultad para poner límites en pareja o familia...)"
                className="w-full p-3 bg-white rounded-xl border border-[#DACDC0] text-xs text-[#2B231F] focus:border-[#581420] outline-none leading-relaxed"
              />
              <p className="text-[11px] text-[#6A6057] mt-1">
                Al abrir la <strong>Sesión 1</strong>, este motivo se utilizará para iniciar la sesión, hacer el test de eneatipos y escanear las creencias en las 8 áreas de vida.
              </p>
            </div>

            {/* Fecha & Switch de visibilidad */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#EADBCA]">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-[#6A6057]">Fecha de inicio:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="px-2.5 py-1 bg-white rounded-lg border border-[#DACDC0] text-xs text-[#2B231F] outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPubliclyAggregated}
                  onChange={e => setIsPubliclyAggregated(e.target.checked)}
                  className="rounded text-[#581420] focus:ring-[#581420] w-4 h-4"
                />
                <span className="text-xs text-[#4A413B]">
                  Computar en estadísticas anónimas de la landing pública
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 sm:p-5 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#6A6057] hover:text-[#2B231F] transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!clientName.trim()}
            className="px-6 py-2.5 bg-[#581420] hover:bg-[#6D1B29] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-[#E4B062]" />
            <span>Dar de Alta Expediente y Preparar Sesión 1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
