import React, { useState } from 'react';
import { PublicAggregatedMetrics, LIFE_AREAS } from '../../types/coaching';
import { RadarChart } from '../charts/RadarChart';
import { EmotionsDonutChart } from '../charts/EmotionsDonutChart';
import {
  Sparkles,
  TrendingUp,
  Brain,
  Zap,
  Heart,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Share2,
  Code,
  ExternalLink,
  X,
  Layers,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface PublicLandingDashboardProps {
  metrics: PublicAggregatedMetrics;
  isEmbedMode?: boolean;
  showEmbedTools?: boolean;
}

export const PublicLandingDashboard: React.FC<PublicLandingDashboardProps> = ({
  metrics,
  isEmbedMode = false,
  showEmbedTools = false,
}) => {
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [simulationPhase, setSimulationPhase] = useState<'before' | 'after'>('after');
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  // Construct start vs current wheel for global average
  const globalStartWheel: Record<string, number> = {};
  const globalCurrentWheel: Record<string, number> = {};
  metrics.areaImprovements.forEach(a => {
    globalStartWheel[a.areaKey] = a.startAvg;
    globalCurrentWheel[a.areaKey] = a.currentAvg;
  });

  const embedCode = `<iframe src="${window.location.origin}?mode=public&embed=true" width="100%" height="860" frameborder="0" style="border:none; border-radius:24px; overflow:hidden; width:100%; box-shadow:0 10px 30px rgba(0,0,0,0.08);"></iframe>`;
  const embedUrl = `${window.location.origin}?mode=public&embed=true`;

  const handleCopyIframe = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(embedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-8 ${isEmbedMode ? 'p-2' : 'p-4 sm:p-8'}`}>
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#581420] via-[#45101A] to-[#2B231F] text-white p-6 sm:p-12 shadow-2xl border border-[#C38B3A]/30">
        {/* Subtle decorative gold light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C38B3A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E4B062] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evidencia Empírica en Tiempo Real · cclagoriocoach.com</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F9F6F0] leading-tight tracking-tight">
            Historia Clínica Evolutiva & Impacto Neuroplástico
          </h1>

          <p className="mt-4 text-white/85 text-sm sm:text-base leading-relaxed font-sans">
            Métricas agregadas y 100% anónimas de los procesos de transformación de hábitos, gestión emocional y alineación cuerpo-mente basados en neurociencia y coaching de alta performance.
          </p>

          {/* Verification Badge */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-white/70">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#C38B3A]" />
              <span>Privacidad Auditada (RGPD & Ley 25.326)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Actualización en Tiempo Real al Cargar Sesiones</span>
            </div>
          </div>
        </div>

        {/* Floating Metrics Pillbox on the right on larger screens */}
        {!isEmbedMode && (
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-white/70">
              <span>Metodología oficial de </span>
              <strong className="text-white">Cecilia Lagorio</strong>
              <span> · ICF Neurocoach & Directora de Estrategia</span>
            </div>

            {showEmbedTools && (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsEmbedModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-all border border-white/20 active:scale-95"
                >
                  <Code className="w-4 h-4 text-[#E4B062]" />
                  <span>Integrar en mi Landing (Guía & Código)</span>
                </button>

                <button
                  onClick={handleCopyIframe}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C38B3A] hover:bg-[#D49C4B] text-[#2B231F] font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  {copiedEmbed ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmbed ? '¡Código Copiado!' : 'Copiar Iframe Rápido'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Triad of Core Macro Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* KPI 1: Vital Energy */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-md hover:shadow-lg transition-all relative overflow-hidden">
          <div className="w-2 h-full bg-[#C38B3A] absolute left-0 top-0" />
          <div className="flex items-center justify-between text-[#6B705C]">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#C38B3A]" />
              Aumento de Energía Vital
            </span>
            <span className="font-mono text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              +{metrics.vitalEnergyImprovementPercentage}%
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-[#581420]">
              +{metrics.vitalEnergyImprovementPercentage}%
            </span>
            <span className="text-xs text-[#8C8176] font-medium">promedio global</span>
          </div>

          <p className="text-xs text-[#6A6057] mt-3 leading-relaxed">
            Medido de forma objetiva a través de decisiones diarias en alimentación, ejercicio y calidad del descanso reparador.
          </p>

          <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-xs font-mono text-[#8C8176]">
            <span>Inicio: {metrics.averageVitalEnergyStart} / 10</span>
            <span className="text-[#581420] font-bold">Actual: {metrics.averageVitalEnergyCurrent} / 10</span>
          </div>
        </div>

        {/* KPI 2: Creencias Invertidas */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-md hover:shadow-lg transition-all relative overflow-hidden">
          <div className="w-2 h-full bg-[#581420] absolute left-0 top-0" />
          <div className="flex items-center justify-between text-[#6B705C]">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-[#581420]" />
              Inversión de Creencias
            </span>
            <span className="font-mono text-xs font-bold bg-[#581420]/10 text-[#581420] px-2 py-0.5 rounded-full">
              Neuroplasticidad
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-[#581420]">
              {metrics.beliefsEvolution.empoweredCurrentAvg}%
            </span>
            <span className="text-xs text-[#8C8176] font-medium">empoderadas</span>
          </div>

          <p className="text-xs text-[#6A6057] mt-3 leading-relaxed">
            Las creencias limitantes que drenaban energía cayeron del {metrics.beliefsEvolution.limitingStartAvg}% al {metrics.beliefsEvolution.limitingCurrentAvg}% en las 8 áreas clave.
          </p>

          <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-xs font-mono text-[#8C8176]">
            <span className="text-[#8C3A49]">Limitantes: {metrics.beliefsEvolution.limitingStartAvg}% → {metrics.beliefsEvolution.limitingCurrentAvg}%</span>
            <span className="text-[#6B705C] font-bold">Empoderadas: {metrics.beliefsEvolution.empoweredCurrentAvg}%</span>
          </div>
        </div>

        {/* KPI 3: Procesos Auditados */}
        <div className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-md hover:shadow-lg transition-all relative overflow-hidden">
          <div className="w-2 h-full bg-[#6B705C] absolute left-0 top-0" />
          <div className="flex items-center justify-between text-[#6B705C]">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-[#6B705C]" />
              Procesos & Sesiones
            </span>
            <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              {metrics.totalClientsEvaluated} Clientes
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif font-bold text-[#581420]">
              {metrics.totalActiveSessionsCount}
            </span>
            <span className="text-xs text-[#8C8176] font-medium">sesiones computadas</span>
          </div>

          <p className="text-xs text-[#6A6057] mt-3 leading-relaxed">
            Seguimiento sesión a sesión de decisiones, emociones y satisfacción evaluada en tiempo real.
          </p>

          <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#8C8176]">
            <span>100% Sin Datos Personales</span>
            <span className="text-[#6B705C] font-bold">Evidencia Verificable</span>
          </div>
        </div>
      </div>

      {/* Interactive Global Wheel & Improvements Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Global */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA]">
          <div className="text-center mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C38B3A]">
              Evolución Colectiva
            </span>
            <h3 className="text-lg font-serif font-bold text-[#581420]">
              Rueda de la Vida Global (Antes vs Después)
            </h3>
            <p className="text-xs text-[#6A6057]">
              Promedio empírico de satisfacción en las 8 áreas clave del programa
            </p>
          </div>

          <RadarChart
            initialData={globalStartWheel}
            currentData={globalCurrentWheel}
            initialLabel="Nivel al Iniciar Programa"
            currentLabel="Nivel Consolidado Actual"
            size={330}
          />
        </div>

        {/* Improvements Table */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#581420]">
              Mejora Porcentual por Área de Vida
            </h3>
            <p className="text-xs text-[#6A6057]">
              Cada sesión mide avances específicos transformando creencias y decisiones:
            </p>
          </div>

          <div className="space-y-2.5">
            {metrics.areaImprovements.map(area => (
              <div
                key={area.areaKey}
                className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EADBCA] flex items-center justify-between text-xs hover:border-[#C38B3A] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#2B231F]">{area.label}</span>
                </div>

                <div className="flex items-center gap-3 font-mono tabular-nums">
                  <span className="text-[#8C8176]">{area.startAvg} →</span>
                  <span className="text-[#581420] font-bold">{area.currentAvg}</span>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    +{area.improvementPercent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emotions Distribution & Alive Game Methodology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Emotions Donut */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#C38B3A] text-xs font-bold uppercase tracking-wider mb-1">
              <Heart className="w-4 h-4" />
              <span>Gestión Emocional</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-[#581420]">
              Distribución de Emociones Gestionadas
            </h3>
            <p className="text-xs text-[#6A6057] mt-1 mb-4">
              Frecuencia de estados emocionales regulados mediante herramientas neuroplásticas durante el proceso:
            </p>
          </div>

          <EmotionsDonutChart distribution={metrics.emotionDistribution} size={230} />

          <p className="text-[11px] text-[#8C8176] mt-4 pt-3 border-t border-[#F2ECE3] text-center italic">
            El objetivo no es suprimir emociones, sino interpretarlas para que no saboteen las decisiones al día siguiente.
          </p>
        </div>

        {/* The 3-Step Method (Cecilia's ALIVE GAME Pillars) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EADBCA] shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#581420] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-[#C38B3A]" />
              <span>Metodología del Producto · ALIVE GAME</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-[#581420]">
              El Método en 3 Pasos
            </h3>
            <p className="text-xs text-[#6A6057] mt-1">
              Cómo acompaña Cecilia a cada cliente hacia la neuroplasticidad y el cambio de hábitos:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 my-4">
            <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#581420] text-white flex items-center justify-center font-serif font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wide">
                  Punto de Partida: Mapeo del Mundo Emocional Interno
                </h4>
                <p className="text-xs text-[#4A413B] mt-1 leading-relaxed">
                  Test de eneatipos, porcentaje de creencias limitantes vs empoderadas por área, rueda de la vida, mapa de estímulos de la infancia y detección del área que está drenando energía.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#C38B3A] text-[#2B231F] flex items-center justify-center font-serif font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wide">
                  Proceso: Entrenamientos Diarios de Neuroplasticidad
                </h4>
                <p className="text-xs text-[#4A413B] mt-1 leading-relaxed">
                  Calificación diaria de decisiones (alimentación, ejercicio, descanso) para gestionar la energía vital, identificación de la emoción del día y aplicación de guías para evitar boicots con la app AliveGamers.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#6B705C] text-white flex items-center justify-center font-serif font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#581420] uppercase tracking-wide">
                  Punto de Llegada: Re-Mapeo Final & Impacto Empírico
                </h4>
                <p className="text-xs text-[#4A413B] mt-1 leading-relaxed">
                  Medición final de la evolución interna (gráfico espejo antes/después), consolidación de la energía vital, informe de hitos y hoja de ruta con protocolo preventivo de boicots.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#EADBCA] text-xs text-[#6A6057]">
            <span>Respaldado en neurobiología y coaching ICF</span>
            <span className="text-[#581420] font-semibold">
              Metodología ALIVE GAME
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Transformation Simulator: How the process is lived with Cecilia */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#581420]/10 text-[#581420] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C38B3A]" />
              <span>Simulador de Transformación en Métricas Reales</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#581420]">
              Cómo se vive un proceso con Cecilia Lagorio
            </h3>
            <p className="text-xs text-[#6A6057] mt-1 max-w-2xl">
              Comprueba el impacto empírico medido en el sistema nervioso, las creencias y las decisiones diarias de un cliente:
            </p>
          </div>

          {/* Segmented Phase Switcher */}
          <div className="p-1.5 bg-[#FAF7F2] rounded-2xl border border-[#DACDC0] flex items-center gap-1 self-start md:self-center shrink-0">
            <button
              onClick={() => setSimulationPhase('before')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                simulationPhase === 'before'
                  ? 'bg-[#581420] text-white shadow-md'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>1. Punto de Partida (Día 1)</span>
            </button>
            <button
              onClick={() => setSimulationPhase('after')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                simulationPhase === 'after'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'text-[#6A6057] hover:text-[#2B231F]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>2. Cierre Evolutivo (Final)</span>
            </button>
          </div>
        </div>

        {/* Dynamic State Display */}
        {simulationPhase === 'before' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                Energía Vital Inicial
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-rose-900">4.6</span>
                <span className="text-xs text-rose-700 font-mono">/ 10</span>
              </div>
              <p className="text-xs text-rose-900/90 leading-relaxed">
                Agotamiento somático, tensión muscular, sueño no reparador y sensación de no dar abasto con las exigencias.
              </p>
            </div>

            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                Creencias en Área en Conflicto
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-rose-900">74%</span>
                <span className="text-xs text-rose-700 font-mono">limitantes</span>
              </div>
              <p className="text-xs text-rose-900/90 leading-relaxed italic">
                "Si me detengo o pongo límites me quedo sola, fallo a los demás o pierdo mi valor como persona."
              </p>
            </div>

            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                Respuesta al Estrés
              </span>
              <span className="text-base font-bold text-rose-900 block mt-1">
                Reactividad & Boicot
              </span>
              <p className="text-xs text-rose-900/90 leading-relaxed">
                El sistema de alerta secuestra las decisiones: sobre-exigencia o procrastinación inconsciente como anestesia emocional.
              </p>
            </div>

            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                Satisfacción en Rueda de la Vida
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-rose-900">3.8</span>
                <span className="text-xs text-rose-700 font-mono">en área de drenaje</span>
              </div>
              <p className="text-xs text-rose-900/90 leading-relaxed">
                Desequilibrio agudo en una de las 8 áreas que absorbe el foco y la vitalidad del resto de la vida.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Energía Vital Consolidada
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-emerald-950">8.5</span>
                <span className="text-xs text-emerald-700 font-mono">/ 10 (+85%)</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Descanso reparador continuo, nutrición consciente y escucha biológica activa ante el primer semáforo corporal.
              </p>
            </div>

            <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Creencias en Área en Conflicto
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-emerald-950">88%</span>
                <span className="text-xs text-emerald-700 font-mono">empoderadas</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed italic">
                "Mis límites claros protegen mi paz interior, elevan mi valor intrínseco y fortalecen mis relaciones."
              </p>
            </div>

            <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Respuesta al Estrés
              </span>
              <span className="text-base font-bold text-emerald-950 block mt-1">
                Pausa Lúcida & Soberanía
              </span>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Herramientas de neuroplasticidad y protocolo anti-boicot con AliveGamers para desactivar recaídas en minutos.
              </p>
            </div>

            <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-300 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Satisfacción en Rueda de la Vida
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold text-emerald-950">8.2</span>
                <span className="text-xs text-emerald-700 font-mono">armonía global</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Re-mapeo espejo equilibrado, sin drenajes crónicos de energía y con soberanía emocional consolidada.
              </p>
            </div>
          </div>
        )}

        <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#581420]">
            <CheckCircle className="w-4 h-4 text-[#C38B3A]" />
            <span className="font-semibold">
              Cada métrica es verificada sesión a sesión en la historia clínica privada de coaching.
            </span>
          </div>

          {showEmbedTools && (
            <button
              onClick={() => setIsEmbedModalOpen(true)}
              className="text-[#581420] font-bold hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Ver cómo incrustar estas métricas en tu web</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Anonymous Case Studies Carousel / Selector */}
      {metrics.anonymousCaseStudies.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C38B3A]">
                Casos Reales Anonimizados
              </span>
              <h3 className="text-xl font-serif font-bold text-[#581420]">
                Hojas de Ruta Evolutivas en Vivo
              </h3>
              <p className="text-xs text-[#6A6057]">
                Selecciona un expediente anónimo para examinar su trayectoria de neuroplasticidad:
              </p>
            </div>

            {/* Selector buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {metrics.anonymousCaseStudies.map((cs, idx) => (
                <button
                  key={cs.code}
                  onClick={() => setSelectedCaseIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                    selectedCaseIndex === idx
                      ? 'bg-[#581420] text-white font-bold shadow-md'
                      : 'bg-[#FAF7F2] text-[#4A413B] hover:bg-[#EFE8DE] border border-[#E8DFD3]'
                  }`}
                >
                  Expediente #{cs.code}
                </button>
              ))}
            </div>
          </div>

          {/* Active Case Card */}
          {metrics.anonymousCaseStudies[selectedCaseIndex] && (
            <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#EADBCA] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div>
                <span className="text-[10px] text-[#8C8176] uppercase font-semibold block">
                  Perfil de Inicio
                </span>
                <span className="text-xl font-serif font-bold text-[#581420]">
                  Eneatipo {metrics.anonymousCaseStudies[selectedCaseIndex].enneatype}
                </span>
                <span className="text-xs text-[#8C3A49] block mt-1">
                  Drenaje: {metrics.anonymousCaseStudies[selectedCaseIndex].initialDrainArea}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#8C8176] uppercase font-semibold block">
                  Salto en Energía Vital
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-mono font-bold text-[#581420]">
                    {metrics.anonymousCaseStudies[selectedCaseIndex].vitalEnergyStart} →{' '}
                    {metrics.anonymousCaseStudies[selectedCaseIndex].vitalEnergyCurrent}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    (+
                    {Math.round(
                      ((metrics.anonymousCaseStudies[selectedCaseIndex].vitalEnergyCurrent -
                        metrics.anonymousCaseStudies[selectedCaseIndex].vitalEnergyStart) /
                        metrics.anonymousCaseStudies[selectedCaseIndex].vitalEnergyStart) *
                        100
                    )}
                    %)
                  </span>
                </div>
                <span className="text-[11px] text-[#6A6057]">Escala de 1 a 10</span>
              </div>

              <div>
                <span className="text-[10px] text-[#8C8176] uppercase font-semibold block">
                  Mayor Transformación
                </span>
                <span className="text-sm font-semibold text-[#2B231F] block mt-0.5">
                  {metrics.anonymousCaseStudies[selectedCaseIndex].highestImprovementArea}
                </span>
                <span className="text-[11px] text-[#6B705C] font-medium">
                  {metrics.anonymousCaseStudies[selectedCaseIndex].sessionsCount} sesiones completadas
                </span>
              </div>

              <div className="flex flex-col items-start md:items-end justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{metrics.anonymousCaseStudies[selectedCaseIndex].status}</span>
                </span>
                <span className="text-[10px] text-[#8C8176] mt-2">
                  100% Confidencial y anónimo
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Call to Action for cclagoriocoach.com */}
      <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#EADBCA] text-center space-y-4">
        <h3 className="text-2xl font-serif font-bold text-[#581420]">
          ¿Deseas iniciar tu propio proceso evolutivo?
        </h3>
        <p className="text-xs sm:text-sm text-[#4A413B] max-w-xl mx-auto leading-relaxed">
          Los programas de coaching de 6 o 10 sesiones con Cecilia Lagorio combinan mapeo eneatípico, neuroplasticidad y la tecnología de soporte de ALIVE GAME.
        </p>
        <div className="pt-2">
          <a
            href="https://cclagoriocoach.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#581420] hover:bg-[#6E1C2B] text-white font-serif font-bold text-sm transition-all shadow-lg active:scale-95"
          >
            <span>Postular a un Programa en cclagoriocoach.com</span>
            <ExternalLink className="w-4 h-4 text-[#E4B062]" />
          </a>
        </div>
      </div>

      {/* Embed Modal for Landing Page Integration */}
      {isEmbedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#F9F6F0] rounded-3xl border border-[#E4DACD] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#581420] text-white p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-[#C38B3A]/30">
                  <Code className="w-6 h-6 text-[#E4B062]" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white">
                    Integrar en tu Landing Page · cclagoriocoach.com
                  </h3>
                  <p className="text-xs text-[#E4B062]">
                    Transmite confianza empírica con tus métricas de transformación en tiempo real
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEmbedModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-[#4A413B]">
              {/* Box 1: Iframe snippet */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DFD3] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#581420] uppercase text-[11px] tracking-wider">
                    Código Iframe Responsivo (Recomendado)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyUrl}
                      className="px-2.5 py-1 rounded-lg border border-[#DACDC0] text-[#581420] hover:bg-[#FAF7F2] font-semibold text-[11px] transition-colors flex items-center gap-1"
                    >
                      {copiedUrl ? <Check className="w-3 h-3 text-emerald-600" /> : <ExternalLink className="w-3 h-3" />}
                      <span>{copiedUrl ? 'URL Copiada' : 'Copiar URL'}</span>
                    </button>
                    <button
                      onClick={handleCopyIframe}
                      className="px-3 py-1 bg-[#581420] hover:bg-[#6D1B29] text-white font-bold rounded-lg text-[11px] transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      {copiedEmbed ? <Check className="w-3.5 h-3.5 text-[#E4B062]" /> : <Copy className="w-3.5 h-3.5 text-[#E4B062]" />}
                      <span>{copiedEmbed ? '¡Copiado!' : 'Copiar Código'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADBCA] font-mono text-[11px] text-[#2B231F] break-all select-all">
                  {embedCode}
                </div>
                <p className="text-[11px] text-[#6A6057]">
                  Se adapta automáticamente al ancho de tu sitio web (100% responsivo para móviles, tablets y ordenadores).
                </p>
              </div>

              {/* Box 2: Instructions per CMS */}
              <div className="space-y-3">
                <span className="font-bold text-[#581420] uppercase text-[11px] tracking-wider block">
                  Instrucciones Paso a Paso (Fricción Cero)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <strong className="text-xs text-[#2B231F] block">WordPress / Elementor</strong>
                    <p className="text-[11px] text-[#6A6057] leading-relaxed">
                      1. Abre tu landing page en Elementor.<br />
                      2. Arrastra el bloque <strong>"HTML"</strong>.<br />
                      3. Pega este código y pulsa <strong>Actualizar</strong>.
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <strong className="text-xs text-[#2B231F] block">Wix / Squarespace</strong>
                    <p className="text-[11px] text-[#6A6057] leading-relaxed">
                      1. Añade un bloque de tipo <strong>"Embed"</strong> o <strong>"Código"</strong>.<br />
                      2. Pega el código iframe y ajusta la altura.<br />
                      3. Publica tu sitio web.
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <strong className="text-xs text-[#2B231F] block">Webflow</strong>
                    <p className="text-[11px] text-[#6A6057] leading-relaxed">
                      1. Añade un componente <strong>"Embed"</strong> en tu canvas.<br />
                      2. Pega el código HTML y guarda.<br />
                      3. Publica en tu dominio.
                    </p>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <strong className="text-xs text-[#2B231F] block">HTML Puro / Notion / Web Propia</strong>
                    <p className="text-[11px] text-[#6A6057] leading-relaxed">
                      1. Pega la etiqueta iframe en cualquier sección.<br />
                      2. Funciona de inmediato sin librerías externas ni dependencias.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 3: Privacy & Security Assurance */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-300 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Seguridad & Privacidad Garantizada</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Tus clientes están protegidos. La landing pública <strong>NUNCA muestra nombres, correos ni teléfonos privados</strong>. Solo proyecta los promedios numéricos agregados (+43% en energía vital, 88% de creencias empoderadas) para respaldar tu autoridad y generar alta conversión de prospectos.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#FAF7F2] border-t border-[#EADBCA] p-4 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#8C8176]">
                Desplegado en alivegamers.com / cclagoriocoach.com
              </span>
              <button
                type="button"
                onClick={() => setIsEmbedModalOpen(false)}
                className="px-6 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
