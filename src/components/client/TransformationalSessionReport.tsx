import React, { useState } from 'react';
import { ClientRecord, TransformationalSingleSessionData } from '../../types/coaching';
import {
  Sparkles,
  Zap,
  Heart,
  Brain,
  ArrowRight,
  CheckCircle2,
  Copy,
  Printer,
  ShieldCheck,
  Target,
  Flame,
  Award,
  Calendar,
  Clock,
  Compass,
} from 'lucide-react';

interface TransformationalSessionReportProps {
  client: ClientRecord;
  sessionData?: TransformationalSingleSessionData;
  onPrint?: () => void;
}

export const TransformationalSessionReport: React.FC<TransformationalSessionReportProps> = ({
  client,
  sessionData,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);

  // Fallback to client.transformationalSession if not provided directly
  const data = sessionData || client.transformationalSession;

  if (!data) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-[#E8DFD3] shadow-sm space-y-4">
        <Sparkles className="w-10 h-10 text-[#C38B3A] mx-auto opacity-70" />
        <h3 className="text-lg font-serif font-bold text-[#581420]">
          Sesión Transformadora de 75 Minutos Pendiente
        </h3>
        <p className="text-xs text-[#6A6057] max-w-md mx-auto">
          Este cliente está asignado al formato de Sesión Única Transformadora. Inicia la sesión guiada en vivo de 75 minutos para registrar el quiebre y generar el informe de devolución.
        </p>
      </div>
    );
  }

  // Energy difference calculation
  const energyGain = Number((data.finalVitalEnergy - data.initialVitalEnergy).toFixed(1));
  const energyPercentageGain = data.initialVitalEnergy > 0
    ? Math.round(((data.finalVitalEnergy - data.initialVitalEnergy) / data.initialVitalEnergy) * 100)
    : 0;

  // Generate formatted text for WhatsApp / Email
  const generateShareableText = () => {
    return `✨ *INFORME DE SESIÓN TRANSFORMADORA (75 MIN) · ALIVE GAME* ✨
Coach: Cecilia Lagorio | Alta Performance & Neuroplasticidad
Expediente: ${client.anonymousCode} | Fecha: ${data.date}

🎯 *TEMA PUNTUAL ABORDADO:*
"${data.specificTopic}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *1. TU PUNTO DE PARTIDA (CÓMO ESTABAS DECIDIENDO)*
${data.howClientDecidedInitially}

• *Herida y patrón al mando:* ${data.activeEnneatypeWound}
• *Creencia limitante raíz:* ${data.dominantLimitingBelief}
• *Impacto previo y somatización:* ${data.initialImpactNotes}
• *Energía vital de entrada:* ${data.initialVitalEnergy}/10 (${data.initialEmotion})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🪞 *2. LO QUE DESCUBRISTE VOS MISMO/A EN LA SESIÓN DE ESPEJO*
${data.selfDiscovery}

• *Momento de quiebre somático:* ${data.breakthroughSomaticMoment}
• *La transformación durante los 75 min:* ${data.transformationDuringSession}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 *3. SETEO DEL MINDSET DE AHORA EN MÁS*
${data.mindsetDirectives.map((d) => `• ${d}`).join('\n')}

👑 *TU NUEVA REGLA DE ORO DECISIONAL:*
${data.newEmpoweredDecisionRule}

⚓ *ANCLAJE Y HÁBITO PARA LOS PRÓXIMOS 7 DÍAS:*
${data.concreteActionAnchor}

📈 *EVOLUCIÓN ENERGÉTICA DE LA SESIÓN:*
Entrada: ${data.initialVitalEnergy}/10 ➔ Cierre: ${data.finalVitalEnergy}/10 (${energyPercentageGain > 0 ? `+${energyPercentageGain}% de Vitalidad y Claridad` : ''})
Estado emocional de salida: *${data.finalEmotion}*

_ALIVE GAME · Sanar el vínculo mente-cuerpo a través de decisiones lúcidas._`;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateShareableText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error copying text:', err);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8DFD3] shadow-xl overflow-hidden print:shadow-none print:border-none">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#581420] via-[#45101A] to-[#2B231F] text-white p-6 sm:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#E4B062] text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Informe de Devolución & Feedback · ALIVE GAME</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F9F6F0]">
              Sesión Única Transformadora (75 min)
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl font-sans">
              Feedback clínico de sesión de espejo: toma de conciencia somática, reconfiguración de decisiones y seteo de nuevo mindset.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end justify-center shrink-0 space-y-1">
            <span className="text-[11px] text-[#E4B062] font-mono uppercase tracking-wider">
              Expediente Confidencial
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-xl border border-white/20">
                {client.anonymousCode}
              </span>
              <span className="text-xs bg-[#C38B3A] text-[#2B231F] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>75 min</span>
              </span>
            </div>
            <span className="text-[11px] text-white/70">
              Fecha: {data.date} · Coach: Cecilia Lagorio
            </span>
          </div>
        </div>

        {/* Action buttons (hidden on print) */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <ShieldCheck className="w-4 h-4 text-[#C38B3A]" />
            <span>Documento listo para ser entregado directamente al cliente</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>¡Copiado para WhatsApp/Email!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#E4B062]" />
                  <span>Copiar para WhatsApp / Email</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#C38B3A] hover:bg-[#D49C4B] text-[#2B231F] text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8 text-[#2B231F]">
        {/* CARD 0: TEMA PUNTUAL ABORDADO */}
        <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E8DFD3] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#581420]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#581420] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Target className="w-6 h-6 text-[#E4B062]" />
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-[11px] font-bold text-[#C38B3A] uppercase tracking-wider block">
                Tema Específico Abordado en la Sesión
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#581420] leading-snug">
                "{data.specificTopic}"
              </h3>
              {data.backgroundProcessSummary && (
                <p className="text-xs text-[#6A6057] pt-1">
                  <span className="font-semibold text-[#2B231F]">Contexto previo:</span> {data.backgroundProcessSummary}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* METRIC STRIP: SALTO CUÁNTICO DE ENERGÍA Y CLARIDAD */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8C8176] uppercase tracking-wider block">
                Energía al Iniciar (Punto de Partida)
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-serif font-bold text-amber-700">
                  {data.initialVitalEnergy}
                </span>
                <span className="text-xs text-[#8C8176]">/ 10</span>
              </div>
              <span className="text-[11px] text-[#6A6057] block truncate max-w-[180px]">
                {data.initialEmotion}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8C8176] uppercase tracking-wider block">
                Energía al Finalizar (Cierre 75 min)
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-serif font-bold text-emerald-700">
                  {data.finalVitalEnergy}
                </span>
                <span className="text-xs text-[#8C8176]">/ 10</span>
                {energyPercentageGain > 0 && (
                  <span className="text-[11px] font-bold text-emerald-700 ml-1">
                    (+{energyPercentageGain}%)
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-800 font-medium block truncate max-w-[180px]">
                {data.finalEmotion}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E8DFD3] shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#581420]/10 flex items-center justify-center text-[#581420] shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8C8176] uppercase tracking-wider block">
                Herida Decisional Desactivada
              </span>
              <span className="text-sm font-bold text-[#581420] mt-0.5 block truncate max-w-[180px]">
                {data.activeEnneatypeWound.split('·')[0] || 'Eneatipo al Mando'}
              </span>
              <span className="text-[11px] text-[#6A6057] block truncate max-w-[180px]">
                De la reactividad al centro lúcido
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 1: CÓMO ESTABAS DECIDIENDO (PUNTO DE PARTIDA) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-[#E8DFD3]">
            <div className="w-7 h-7 rounded-lg bg-[#581420] text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h4 className="text-lg font-serif font-bold text-[#581420]">
              Tu Punto de Partida: Cómo Estabas Decidiendo
            </h4>
          </div>

          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFD3] space-y-3">
            <p className="text-sm leading-relaxed text-[#2B231F] font-sans">
              {data.howClientDecidedInitially}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD3] space-y-1">
                <span className="text-[10px] font-bold text-[#C38B3A] uppercase tracking-wider block">
                  Herida Raíz Operando en Automático
                </span>
                <p className="text-xs font-semibold text-[#581420]">
                  {data.activeEnneatypeWound}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD3] space-y-1">
                <span className="text-[10px] font-bold text-[#C38B3A] uppercase tracking-wider block">
                  Creencia Limitante que Sostenía el Síntoma
                </span>
                <p className="text-xs italic text-[#6A6057]">
                  "{data.dominantLimitingBelief}"
                </p>
              </div>
            </div>

            {data.initialImpactNotes && (
              <div className="pt-2 text-xs text-[#6A6057]">
                <strong className="text-[#581420]">Impacto empírico desde la solicitud de la sesión:</strong>{' '}
                {data.initialImpactNotes}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: LO QUE DESCUBRISTE VOS MISMO/A (EL ESPEJO) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-[#E8DFD3]">
            <div className="w-7 h-7 rounded-lg bg-[#C38B3A] text-[#2B231F] flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h4 className="text-lg font-serif font-bold text-[#581420]">
              La Sesión de Espejo: Lo Que Descubriste Vos Mismo/a
            </h4>
          </div>

          <div className="bg-gradient-to-br from-[#581420]/5 to-transparent p-6 rounded-2xl border border-[#581420]/15 space-y-4">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#581420] uppercase tracking-wider block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C38B3A]" />
                <span>La Toma de Conciencia Principal</span>
              </span>
              <blockquote className="text-base sm:text-lg font-serif italic text-[#581420] pl-4 border-l-4 border-[#C38B3A] leading-relaxed">
                "{data.selfDiscovery}"
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C38B3A]">
                  <Heart className="w-4 h-4 text-[#581420]" />
                  <span>El Quiebre Somático & Interoceptivo</span>
                </div>
                <p className="text-xs text-[#2B231F] leading-relaxed">
                  {data.breakthroughSomaticMoment}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E8DFD3] space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>El Cambio Realizado en los 75 Minutos</span>
                </div>
                <p className="text-xs text-[#2B231F] leading-relaxed">
                  {data.transformationDuringSession}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: SETEO DEL MINDSET DE AHORA EN MÁS */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-[#E8DFD3]">
            <div className="w-7 h-7 rounded-lg bg-[#581420] text-white flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h4 className="text-lg font-serif font-bold text-[#581420]">
              Seteo del Mindset: Lo Que Tenés Que Tener en Cuenta de Ahora en Más
            </h4>
          </div>

          <div className="space-y-4">
            {/* Directives */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFD3] space-y-3">
              <span className="text-[11px] font-bold text-[#C38B3A] uppercase tracking-wider block">
                Directivas Neurológicas para este Tema Específico
              </span>
              <ul className="space-y-2.5">
                {data.mindsetDirectives.map((directive, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-[#E8DFD3]">
                    <div className="w-5 h-5 rounded-full bg-[#581420]/10 text-[#581420] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#2B231F] leading-snug">
                      {directive}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GOLDEN RULE CARD */}
            <div className="bg-gradient-to-r from-[#581420] to-[#771C2E] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#E4B062] shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-bold text-[#E4B062] uppercase tracking-wider block">
                    Tu Nueva Regla de Oro para Decidir en este Tema
                  </span>
                  <p className="text-sm sm:text-base font-serif font-bold text-[#F9F6F0] leading-snug">
                    {data.newEmpoweredDecisionRule}
                  </p>
                </div>
              </div>
            </div>

            {/* ACTION ANCHOR */}
            <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>Anclaje Neuroplástico & Tarea de los Próximos 7 Días</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {data.concreteActionAnchor}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER & COACH SIGNATURE */}
        <div className="pt-6 border-t border-[#E8DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#6A6057]">
          <div>
            <span className="font-serif font-bold text-[#581420] text-sm block">
              Cecilia Lagorio
            </span>
            <span className="text-[11px]">
              Directora de Estrategia & Growth Tech · Neurocoaching ALIVE GAME
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-[11px] text-[#C38B3A] block">
              alivegamers.com · cclagoriocoach.com
            </span>
            <span className="text-[10px] text-[#8C8176]">
              Metodología de Neurocoaching, Hábitos y Gestión Emocional Empírica
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
