import React, { useState } from 'react';
import { PublicAggregatedMetrics } from '../../types/coaching';
import { PublicLandingDashboard } from './PublicLandingDashboard';
import ccPerfilImg from './CC PERFIL.png';
import {
  Sparkles,
  Zap,
  Brain,
  Heart,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  MessageCircle,
  Play,
  Award,
} from 'lucide-react';

interface LandingPageProps {
  metrics: PublicAggregatedMetrics;
  onGoToAdmin?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ metrics, onGoToAdmin }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const WHATSAPP_URL =
    'https://wa.me/5491155030361?text=Hola%20Cecilia%2C%20quiero%20conversar%20sobre%20un%20proceso';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2B231F] font-sans antialiased selection:bg-[#C38B3A]/20 selection:text-[#581420] pb-20 sm:pb-0">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6DFD3] px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              onClick={onGoToAdmin}
              className="w-10 h-10 rounded-2xl bg-[#581420] text-[#E4B062] flex items-center justify-center font-serif font-bold text-xl shadow-sm border border-[#C38B3A]/30 cursor-pointer select-none"
              title="cclagoriocoach.com/admin"
            >
              C
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg text-[#581420] block leading-tight">
                Cecilia Lagorio
              </span>
              <span className="text-[10px] text-[#8C8176] uppercase tracking-wider font-semibold block">
                ICF Neurocoach (ACC) · ALIVE GAME
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#5E534C]">
            <button onClick={() => scrollTo('metodo')} className="hover:text-[#581420] transition-colors">
              El Método
            </button>
            <button onClick={() => scrollTo('neurocoaching')} className="hover:text-[#581420] transition-colors">
              Neurocoaching
            </button>
            <button onClick={() => scrollTo('sesiones')} className="hover:text-[#581420] transition-colors">
              Cómo Trabajo
            </button>
            <button onClick={() => scrollTo('vitrina')} className="hover:text-[#581420] transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C38B3A]" />
              <span>Vitrina en Tiempo Real</span>
            </button>
            <button onClick={() => scrollTo('formatos')} className="hover:text-[#581420] transition-colors">
              Formatos
            </button>
            <button onClick={() => scrollTo('faq')} className="hover:text-[#581420] transition-colors">
              Preguntas
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-full transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#E4B062]" />
              <span>Escribime</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. DANIEL GOLEMAN BANNER */}
      <section className="bg-[#FAF7F2] border-b border-[#E6DFD3] py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#C38B3A]/20 flex items-center justify-center text-[#581420] shrink-0">
              <Award className="w-4 h-4 text-[#C38B3A]" />
            </div>
            <p className="m-0 font-serif text-sm sm:text-base text-[#2B231F] font-medium">
              Alive Game tuvo el honor de acompañar a <strong>Daniel Goleman</strong> en Argentina.
            </p>
          </div>
          <a
            href="https://youtu.be/QszbAgZrhbo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-semibold rounded-full transition-colors shadow-2xs"
          >
            <Play className="w-3 h-3 text-[#E4B062] fill-[#E4B062]" />
            <span>Ver la entrevista</span>
          </a>
        </div>
      </section>

      {/* 3. HERO SECTION (Mobile-First) */}
      <section className="pt-8 pb-14 sm:pt-16 sm:pb-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-gradient-to-b from-[#F3EADF]/60 to-[#FDFBF7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6DFD3] text-[#581420] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C38B3A]" />
              <span>Gestioná tus emociones a favor tuyo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-serif font-medium text-[#2B231F] leading-[1.18] tracking-tight">
              Si ya sabés qué hacer y aun así hacés otra cosa, <span className="text-[#581420]">no te falta voluntad.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5E534C] leading-relaxed max-w-xl">
              Soy Cecilia Lagorio, ICF Neurocoach especialista en Hábitos & Gestión Emocional. Te acompaño a descubrir tu mundo interno, gestionar tus emociones y hacer que tus hábitos trabajen a favor de tus objetivos de vida. Elegí distinto: sin culpa y sin agotarte.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#581420] hover:bg-[#6D1B29] text-white text-sm font-medium rounded-full transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Quiero conversar</span>
                <ArrowRight className="w-4 h-4 text-[#E4B062]" />
              </a>

              <button
                onClick={() => scrollTo('sesiones')}
                className="px-6 py-3.5 bg-transparent hover:bg-white text-[#2B231F] border border-[#2B231F]/30 text-sm font-medium rounded-full transition-all"
              >
                Cómo trabajo
              </button>
            </div>

            <p className="text-xs text-[#8C8176] font-medium pt-1">
              Primero conversamos, después decidís.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col items-center md:items-end">
            <div className="bg-white rounded-3xl p-6 border border-[#E6DFD3] shadow-xl w-full max-w-sm space-y-5">
              <div className="relative w-44 h-56 mx-auto rounded-2xl overflow-hidden border-2 border-[#C38B3A] shadow-md">
                <img
                  src={ccPerfilImg}
                  alt="Cecilia Lagorio, neurocoach ICF"
                  className="w-full h-full object-cover"
                />
              </div>

              <ul className="space-y-3.5 text-left border-t border-[#F1EEE4] pt-4 text-xs text-[#5E534C]">
                <li className="border-l-3 border-[#C38B3A] pl-3">
                  <strong className="text-2xl font-serif text-[#581420] font-medium block leading-none">
                    +15.000
                  </strong>
                  <span className="text-[11px] text-[#5E534C] mt-0.5 block">
                    horas de coaching y +500 procesos acompañados
                  </span>
                </li>

                <li className="flex items-center gap-3 border-l-3 border-[#C38B3A] pl-3">
                  <div>
                    <strong className="text-base font-serif text-[#2B231F] font-bold block leading-tight">
                      ACC ICF
                    </strong>
                    <span className="text-[11px] text-[#5E534C]">
                      Credencial de la International Coaching Federation
                    </span>
                  </div>
                </li>

                <li className="border-l-3 border-[#C38B3A] pl-3">
                  <strong className="text-base font-serif text-[#581420] font-bold block leading-tight">
                    ALIVE GAME
                  </strong>
                  <span className="text-[11px] text-[#5E534C]">
                    Método propio para sanar el vínculo entre cuerpo y mente
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DOLOR & PATRONES */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F] leading-tight">
              Tus hábitos son respuestas rápidas a días que pesan.
            </h2>
            <p className="text-sm sm:text-base text-[#5E534C] mt-3 leading-relaxed">
              No son defectos de carácter. Son emociones empujando decisiones chiquitas, una detrás de otra, hasta formar patrones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FDFBF7] border border-[#E6DFD3] rounded-2xl p-5 space-y-1.5 hover:border-[#C38B3A] transition-colors">
              <strong className="text-base font-serif text-[#581420] block font-medium">
                El mensaje que leés y no respondés
              </strong>
              <p className="text-xs text-[#5E534C] m-0">
                Evitar también es una forma de protegerte cuando sentís sobrecarga.
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#E6DFD3] rounded-2xl p-5 space-y-1.5 hover:border-[#C38B3A] transition-colors">
              <strong className="text-base font-serif text-[#581420] block font-medium">
                La compra para calmarte
              </strong>
              <p className="text-xs text-[#5E534C] m-0">
                Alivio inmediato, culpa después. Tu sistema busca dopamina rápida.
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#E6DFD3] rounded-2xl p-5 space-y-1.5 hover:border-[#C38B3A] transition-colors">
              <strong className="text-base font-serif text-[#581420] block font-medium">
                El “mañana empiezo”
              </strong>
              <p className="text-xs text-[#5E534C] m-0">
                Se repite porque la emoción llega antes que la intención consciente.
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#E6DFD3] rounded-2xl p-5 space-y-1.5 hover:border-[#C38B3A] transition-colors">
              <strong className="text-base font-serif text-[#581420] block font-medium">
                La reunión que sale bien
              </strong>
              <p className="text-xs text-[#5E534C] m-0">
                Y te deja con la sensación agotadora de que nunca es suficiente.
              </p>
            </div>
          </div>

          <blockquote className="font-serif italic text-xl sm:text-2xl text-[#581420] border-l-4 border-[#C38B3A] pl-5 py-1 max-w-2xl leading-snug">
            “No es que no sabés. Es que, a veces, tu emoción llega antes que tu intención.”
          </blockquote>
        </div>
      </section>

      {/* 5. PARA QUIÉN ES ESTE TRABAJO */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
            Para quién es este trabajo.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#581420] shadow-md space-y-4">
              <div className="flex items-center gap-2 text-[#581420]">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-serif font-bold">Es para vos si…</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A413B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Sabés qué te conviene hacer y aun así repetís el mismo patrón.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Sentís que la emoción decide por vos: comida, gastos, límites, postergación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Querés un cambio sostenible, sin culpa ni autoexigencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Estás dispuesta/o a practicar entre sesiones.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#8C3A49]">
                <XCircle className="w-5 h-5 text-[#8C3A49]" />
                <h3 className="text-lg font-serif font-bold text-[#2B231F]">No es para vos si…</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A413B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8C3A49] font-bold">✕</span>
                  <span>Buscás un diagnóstico o un tratamiento clínico psiquiátrico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C3A49] font-bold">✕</span>
                  <span>Querés una fórmula mágica rápida sin mirar lo que sentís en tu cuerpo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8C3A49] font-bold">✕</span>
                  <span>Esperás que el cambio ocurra sin tu participación en el día a día.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EL MÉTODO (3 Pasos de Cecilia) */}
      <section id="metodo" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C38B3A]">
              Metodología ALIVE
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F] mt-1">
              Un proceso simple para dejar de reaccionar en piloto automático.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="border-t-2 border-[#2B231F] pt-4 space-y-2">
              <span className="text-4xl font-serif text-[#581420] font-medium leading-none block">1</span>
              <h3 className="text-lg font-serif font-bold text-[#2B231F]">Registrar</h3>
              <p className="text-xs sm:text-sm text-[#5E534C] leading-relaxed">
                Aprendés a frenar y a notar qué sentís en el cuerpo antes de actuar.
              </p>
            </div>

            <div className="border-t-2 border-[#2B231F] pt-4 space-y-2">
              <span className="text-4xl font-serif text-[#C38B3A] font-medium leading-none block">2</span>
              <h3 className="text-lg font-serif font-bold text-[#2B231F]">Entender el para qué</h3>
              <p className="text-xs sm:text-sm text-[#5E534C] leading-relaxed">
                Miramos qué necesita tu emoción y qué intenta resolver ese hábito.
              </p>
            </div>

            <div className="border-t-2 border-[#2B231F] pt-4 space-y-2">
              <span className="text-4xl font-serif text-[#6B705C] font-medium leading-none block">3</span>
              <h3 className="text-lg font-serif font-bold text-[#2B231F]">Elegir distinto</h3>
              <p className="text-xs sm:text-sm text-[#5E534C] leading-relaxed">
                Armamos herramientas posibles para tu día real, no para uno ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HISTORIA PERSONAL DE CECILIA */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#F3EADF]/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <aside className="md:col-span-5 font-serif text-2xl sm:text-3xl text-[#581420] leading-snug">
            Yo también conozco el momento en que entendés todo… y aun así hacés otra cosa.
          </aside>

          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-[#4A413B] leading-relaxed">
            <p>
              Como profesora de lengua inglesa entendí algo fundamental: el clic no aparece por memorizar datos externos, sino cuando la emoción actúa como el pegamento del conocimiento. El verdadero aprendizaje siempre es una construcción interna.
            </p>
            <p>
              La vida me obligó a llevar esa idea al extremo. Fui diagnosticada con estrés postraumático y me encontré sola, fingiendo fortaleza y felicidad frente a mis hijos. La fuerza de voluntad ya no bastaba. Para evitar que mi vida colapsara, necesité desarticular mis pensamientos destructivos y aprender a gestionar mi propia biología.
            </p>
            <p>
              Esa crisis me convirtió en la profesional que soy hoy. Hice carne todo lo que había estudiado: lo sentí, lo sufrí y lo transformé. Hoy acompaño tus procesos con ciencia, escucha honesta y empatía, porque conozco el camino de regreso desde adentro.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/cc.lagorio.coach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#581420] font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Conocer mi mirada en @cc.lagorio.coach</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEUROCOACHING VS PSICOANÁLISIS */}
      <section id="neurocoaching" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
              Qué es el neurocoaching y qué hace un neurocoach.
            </h2>
            <p className="text-xs sm:text-sm text-[#5E534C] mt-3 leading-relaxed">
              Es coaching que usa lo que sabemos del cerebro y del cuerpo (neuroplasticidad, emoción, estrés) para cambiar decisiones y hábitos. Un neurocoach no diagnostica ni trata: te ayuda a registrar qué sentís antes de actuar, entender qué intenta resolver ese patrón y practicar respuestas nuevas en tu vida diaria.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-[#581420] mb-4">
              ¿En qué se diferencia del psicoanálisis?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#581420] space-y-3">
                <h4 className="text-base font-serif font-bold text-[#581420]">Neurocoaching</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#4A413B]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B705C] font-bold">•</span>
                    <span>No es clínico: acompaña procesos de cambio.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B705C] font-bold">•</span>
                    <span>Se enfoca en el presente y en lo que querés construir.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B705C] font-bold">•</span>
                    <span>Trabaja hábitos, decisiones y emociones cotidianas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B705C] font-bold">•</span>
                    <span>Usa herramientas concretas y práctica entre sesiones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#6B705C] font-bold">•</span>
                    <span>Procesos acotados: una sesión profunda o un pack de 6.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-3">
                <h4 className="text-base font-serif font-bold text-[#2B231F]">Psicoanálisis</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5E534C]">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <span>Es una terapia a cargo de profesionales de la salud mental.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <span>Explora el inconsciente y la historia personal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <span>Trabaja el sufrimiento psíquico y sus síntomas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <span>Es un proceso abierto, muchas veces largo.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="font-serif italic text-sm sm:text-base text-[#5E534C] mt-6">
              No compiten: muchas personas hacen ambos. Si lo que traés necesita atención clínica, te lo digo y lo trabajamos en red.
            </p>
          </div>
        </div>
      </section>

      {/* 9. CÓMO TRABAJO & POR QUÉ USAR UNA APP ENTRE SESIONES */}
      <section id="sesiones" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
              Cómo trabajo: sesiones profundas y práctica diaria.
            </h2>
            <p className="text-xs sm:text-sm text-[#5E534C] mt-2">
              Trabajo con sesiones de 75 minutos o con un pack de 6 sesiones, para procesos puntuales aplicables a cada área de tu vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-3">
              <h3 className="text-base font-serif font-bold text-[#581420]">Qué hacemos en las sesiones</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A413B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Mapeamos tu punto de partida: emociones, creencias que te frenan y rueda de la vida.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Tomamos conciencia de cómo se activa el patrón en tu cuerpo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Transformamos creencias limitantes en creencias que te sostienen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Definimos una regla clara para decidir distinto.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#581420] shadow-md space-y-3">
              <h3 className="text-base font-serif font-bold text-[#581420]">Qué te llevás de cada sesión</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A413B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Un informe personalizado de lo que descubriste.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Tu regla para decidir en ese tema.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Una tarea de anclaje para los próximos 7 días.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>En los packs, tu rueda de la vida inicial y actual para ver el avance.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] space-y-3 mt-4">
            <h3 className="text-lg font-serif font-bold text-[#581420]">
              ¿Por qué trabajar con una app entre sesiones?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A413B] leading-relaxed">
              Porque está diseñada para que veas por fuera tu transformación interna. Eso fija tu conocimiento de vos, y te genera un refuerzo dopaminérgico ligado a logros reales, no a un micro segundo de felicidad ficticia.
            </p>
            <p className="text-xs sm:text-sm text-[#4A413B] leading-relaxed">
              Sentirte acompañado/a en el instante preciso en que la emoción te secuestra, y que te guíen para romper el círculo, es fundamental para tu empoderamiento personal y la gestión de tus hábitos.
            </p>
            <div className="pt-2">
              <a
                href="https://alivegamers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-lg text-[#581420] font-bold hover:underline inline-flex items-center gap-1.5"
              >
                <span>alivegamers.com</span>
                <ExternalLink className="w-4 h-4 text-[#C38B3A]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIOS REALES */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-white">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
            Lo que cuentan quienes hicieron el proceso.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-[#C38B3A] space-y-2">
              <p className="font-serif text-sm sm:text-base text-[#2B231F] leading-snug m-0 italic">
                “Cumplí mi objetivo de empezar los 50 en un estado saludable y volviendo a ser yo, que no es poco.”
              </p>
              <cite className="text-xs font-semibold text-[#8C8176] not-italic block">— Yanina W.</cite>
            </blockquote>

            <blockquote className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-[#C38B3A] space-y-2">
              <p className="font-serif text-sm sm:text-base text-[#2B231F] leading-snug m-0 italic">
                “A cada persona que le cuento mi experiencia le digo: este proceso no fue solo un cambio de peso, todo lo que arrastró es tremendo.”
              </p>
              <cite className="text-xs font-semibold text-[#8C8176] not-italic block">— Nataly D.</cite>
            </blockquote>

            <blockquote className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-[#C38B3A] space-y-2">
              <p className="font-serif text-sm sm:text-base text-[#2B231F] leading-snug m-0 italic">
                “Me ayudaste a cambiar mi vida. Me enseñaste a mirarla desde otro lugar y aprendí de a poco a ser feliz de nuevo.”
              </p>
              <cite className="text-xs font-semibold text-[#8C8176] not-italic block">— Betiana</cite>
            </blockquote>

            <blockquote className="bg-[#FAF7F2] p-6 rounded-2xl border-l-4 border-[#C38B3A] space-y-2">
              <p className="font-serif text-sm sm:text-base text-[#2B231F] leading-snug m-0 italic">
                “Es el primer mes que puedo ahorrar. La paz que siento no la puedo expresar y me siento más linda que nunca.”
              </p>
              <cite className="text-xs font-semibold text-[#8C8176] not-italic block">— Clienta de Cecilia</cite>
            </blockquote>
          </div>

          <div className="pt-2 text-xs text-[#8C8176] space-x-3">
            <a href="https://instagram.com/cc.lagorio.coach" target="_blank" rel="noopener noreferrer" className="text-[#581420] font-bold hover:underline">
              Más historias reales en @cc.lagorio.coach
            </a>
            <span>·</span>
            <a href="https://instagram.com/alive.arg" target="_blank" rel="noopener noreferrer" className="text-[#581420] font-bold hover:underline">
              Método ALIVE en @alive.arg
            </a>
          </div>
        </div>
      </section>

      {/* 11. VITRINA DE RESULTADOS EN TIEMPO REAL (Integrated Dashboard) */}
      <section id="vitrina" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#581420]">
              Evidencia Empírica Verificable
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F] mt-1">
              Resultados que se miden mientras el proceso ocurre.
            </h2>
            <p className="text-xs sm:text-sm text-[#5E534C] mt-2">
              En cada proceso registramos cómo empezás y cómo avanzás: energía vital, creencias que te frenan y satisfacción en cada área de tu rueda de la vida. Son autoevaluaciones de 1 a 10, no un diagnóstico. Los datos son agregados, anónimos y con consentimiento.
            </p>
          </div>

          {/* Embedded Full Metrics Vitrina */}
          <PublicLandingDashboard metrics={metrics} isEmbedMode={false} />
        </div>
      </section>

      {/* 12. FORMATOS: ELEGÍ CÓMO EMPEZAR */}
      <section id="formatos" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-white">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C38B3A] block mb-1">
              Modalidades de Trabajo
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F] leading-tight">
              Elegí cómo empezar tu transformación.
            </h2>
            <p className="text-xs sm:text-sm text-[#5E534C] mt-2 leading-relaxed">
              Formatos diseñados para llevar la neurociencia y la gestión emocional a tu día a día, con acompañamiento empírico y herramientas que sanan el vínculo con tu cuerpo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Formato 1: Sesión Transformadora de 75 min */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#581420] shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C38B3A]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#581420] text-[#E4B062] px-3.5 py-1 rounded-full inline-flex items-center gap-1 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-[#E4B062]" />
                    Punto de Quiebre
                  </span>
                  <span className="text-xs font-mono font-bold text-[#8C8176]">
                    75 Minutos
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#581420] leading-tight">
                    Sesión transformadora de 75 minutos
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E534C] mt-2 leading-relaxed">
                    Una sesión profunda sobre un tema puntual, con diagnóstico ágil, informe personalizado y tarea de 7 días. Ideal para empezar.
                  </p>
                </div>

                {/* Features */}
                <div className="border-t border-[#E6DFD3] pt-4 space-y-2.5 text-xs text-[#4A413B]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#581420] shrink-0 mt-0.5" />
                    <span>Mapeo inicial de mundo emocional y rueda de la vida.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#581420] shrink-0 mt-0.5" />
                    <span>Detección de la creencia raíz limitante y reencuadre biológico.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#581420] shrink-0 mt-0.5" />
                    <span>Informe personalizado + regla para decidir distinto.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#581420] shrink-0 mt-0.5" />
                    <span>Tarea de anclaje de neuroplasticidad para los próximos 7 días.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://alivegamers.com/personal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 text-center bg-[#581420] hover:bg-[#6D1B29] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md active:scale-95 block"
                >
                  Más info de sesión transformadora
                </a>
                <p className="text-[11px] text-[#8C8176] text-center mt-2">
                  Agendá directo online en alivegamers.com/personal
                </p>
              </div>
            </div>

            {/* Formato 2: Pack de 6 Sesiones */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#581420]/30 hover:border-[#581420] shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden transition-all hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#581420] border border-[#DACDC0] px-3.5 py-1 rounded-full inline-flex items-center gap-1 font-semibold">
                    <Brain className="w-3 h-3 text-[#C38B3A]" />
                    Seguimiento Continuo
                  </span>
                  <span className="text-xs font-mono font-bold text-[#8C8176]">
                    6 Sesiones
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231F] leading-tight">
                    Pack de 6 sesiones
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E534C] mt-2 leading-relaxed">
                    Un proceso integral para trabajar un área de tu vida con seguimiento profundo, mapa de creencias y rueda de la vida antes y después. <strong className="text-[#581420]">Incluye ALIVE 24</strong> para tu práctica diaria.
                  </p>
                </div>

                {/* Inclusion Highlight: ALIVE 24 */}
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#C38B3A]/40 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#C38B3A] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#581420] leading-snug">
                    <strong className="block text-[#581420] font-bold">¡Incluye ALIVE 24!</strong>
                    <span>Acceso completo para entrenar tus hábitos entre sesiones y Botón Anti-Boicot 24/7.</span>
                  </div>
                </div>

                {/* Features based on ALIVE 3 steps */}
                <div className="border-t border-[#E6DFD3] pt-4 space-y-2.5 text-xs text-[#4A413B]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C38B3A] shrink-0 mt-0.5" />
                    <span><strong>Paso 1:</strong> Mapeo general del mundo emocional interno.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C38B3A] shrink-0 mt-0.5" />
                    <span><strong>Paso 2:</strong> Entrenamientos semanales de neuroplasticidad.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C38B3A] shrink-0 mt-0.5" />
                    <span><strong>Paso 3:</strong> Re-mapeo final para medir evolución e impacto.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C38B3A] shrink-0 mt-0.5" />
                    <span>Informe Espejo evolutivo y comparativa de rueda de la vida.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href="https://alivegamers.com/personal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 text-center bg-[#581420] hover:bg-[#6D1B29] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-md active:scale-95 block"
                >
                  Más info del programa de 6 sesiones
                </a>
                <a
                  href="https://wa.me/5491155030361?text=Hola%20Cecilia%2C%20quiero%20consultar%20por%20el%20pack%20de%206%20sesiones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-center bg-white hover:bg-[#FAF7F2] text-[#581420] border border-[#DACDC0] text-xs font-semibold rounded-full transition-all block text-center"
                >
                  O consultame por WhatsApp
                </a>
              </div>
            </div>

            {/* Formato 3: ALIVE24 Programa de 21 Días */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] hover:border-[#6B705C] shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden transition-all hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#6B705C] border border-[#DACDC0] px-3.5 py-1 rounded-full inline-flex items-center gap-1 font-semibold">
                    <Zap className="w-3 h-3 text-[#6B705C]" />
                    Programa de 21 Días
                  </span>
                  <span className="text-xs font-mono font-bold text-[#6B705C]">
                    Hábitos & Cuerpo
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B231F] leading-tight">
                    ALIVE24
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E534C] mt-2 leading-relaxed">
                    Programa de 21 días. Diseñado para que en 21 días generes los hábitos necesarios para sanar el vínculo con tu cuerpo.
                  </p>
                </div>

                {/* Features */}
                <div className="border-t border-[#E6DFD3] pt-4 space-y-2.5 text-xs text-[#4A413B]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                    <span>Tu guía diaria para frenar y registrar lo que sentís antes de actuar.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                    <span><strong>Botón Anti-Boicot 24/7</strong> en el instante exacto de la tentación.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                    <span>Refuerzo dopaminérgico ligado a logros reales y no ficticios.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#6B705C] shrink-0 mt-0.5" />
                    <span>Acceso continuo desde tu celular con soporte mobile nativo.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://alivegamers.com/antiboicot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 text-center bg-[#FAF7F2] hover:bg-[#F3EADF] text-[#2B231F] border border-[#DACDC0] text-xs sm:text-sm font-bold rounded-full transition-all active:scale-95 block"
                >
                  Más info de ALIVE 24 (Anti-Boicot)
                </a>
                <p className="text-[11px] text-[#8C8176] text-center mt-2">
                  alivegamers.com/antiboicot
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. ALIVE INTERDISCIPLINARIO 360° */}
      <section id="alive360" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
              ALIVE Interdisciplinario 360°: un equipo integral para sanar el vínculo con tu cuerpo.
            </h2>
            <p className="text-xs sm:text-sm text-[#5E534C] mt-2 leading-relaxed">
              Equipo médico, nutricional y neurocognitivo que trabaja en conjunto, para que dejes de ir de un profesional a otro. Es un protocolo integral de 3 meses para recuperar tu vitalidad física y mental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#581420] shadow-md space-y-3">
              <h3 className="text-base font-serif font-bold text-[#581420]">El programa completo incluye:</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A413B]">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>2 sesiones con médico clínico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>6 sesiones de neurocoaching conmigo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>6 sesiones con nutricionista funcional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>Entrenamiento de fuerza y soporte nutricional con QCH ALIVE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B705C] font-bold">✓</span>
                  <span>ALIVE24 para hábitos y gestión emocional 24/7, con su Botón Anti-Boicot.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DFD3] shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-serif font-bold text-[#2B231F]">Cómo se empieza</h3>
                <p className="text-xs sm:text-sm text-[#5E534C] leading-relaxed">
                  Arrancamos con una consulta informativa diagnóstica individual de <strong>AR$ 149.000</strong>. Ese importe se descuenta al 100% si contratás el programa integral.
                </p>
              </div>
              <a
                href="https://alivegamers.com/interdisciplinario"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-center bg-[#581420] hover:bg-[#6D1B29] text-white text-xs font-bold rounded-full transition-all shadow-md block"
              >
                Más info de ALIVE Interdisciplinario
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 14. PREGUNTAS FRECUENTES */}
      <section id="faq" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
            Preguntas frecuentes
          </h2>

          <div className="divide-y divide-[#E6DFD3] pt-2">
            {[
              {
                q: '¿Cuál elijo, sesión única o pack?',
                a: 'Si querés trabajar un tema puntual, empezá por la sesión de 75 minutos. Si querés sostener el cambio en un área de tu vida, el pack de 6 te da seguimiento. Lo definimos juntas en la primera charla.',
              },
              {
                q: '¿Esto es terapia?',
                a: 'No. Es coaching con base en neurociencia aplicada. Si tu proceso necesita atención clínica, lo trabajamos en red con profesionales de la salud.',
              },
              {
                q: '¿Cómo es la primera conversación?',
                a: 'Me escribís por WhatsApp, me contás brevemente qué te pasa y coordinamos una charla para ver si puedo acompañarte.',
              },
              {
                q: '¿Trabajás de forma online?',
                a: 'Sí. Podés escribirme desde cualquier lugar y coordinamos el formato que mejor te quede.',
              },
              {
                q: '¿Y si ya probé de todo?',
                a: 'Justo por eso. Los planes fallan cuando ignoran la emoción. Acá empezamos por ahí.',
              },
            ].map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg font-medium text-[#2B231F] hover:text-[#581420] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C8176] transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <p className="mt-2 text-xs sm:text-sm text-[#5E534C] leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. EMPEZAR ES SIMPLE */}
      <section id="empezar" className="py-14 sm:py-20 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto space-y-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-medium text-[#2B231F]">
            Empezar es simple.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-t-2 border-[#2B231F] pt-4 space-y-2">
              <span className="text-3xl font-serif text-[#581420] font-medium block">1</span>
              <h3 className="text-lg font-serif font-bold text-[#2B231F]">Me escribís</h3>
              <p className="text-xs sm:text-sm text-[#5E534C]">
                Me contás en pocas líneas qué te está pasando.
              </p>
            </div>

            <div className="border-t-2 border-[#2B231F] pt-4 space-y-2">
              <span className="text-3xl font-serif text-[#C38B3A] font-medium block">2</span>
              <h3 className="text-lg font-serif font-bold text-[#2B231F]">Conversamos</h3>
              <p className="text-xs sm:text-sm text-[#5E534C]">
                Vemos si puedo acompañarte y qué formato te conviene: sesión de 75 minutos o pack de 6.
              </p>
            </div>

            <div className="border-t-2 border-[#2B231F] pt-4 space-y-2">
              <span className="text-3xl font-serif text-[#6B705C] font-medium block">3</span>
              <h3 className="text-lg font-serif font-bold text-[#2B231F]">Reservás y arrancamos</h3>
              <p className="text-xs sm:text-sm text-[#5E534C]">
                Pagás y agendás tu sesión desde un link, sin vueltas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a
              href="https://alivegamers.com/personal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#581420] hover:bg-[#6D1B29] text-white text-sm font-medium rounded-full transition-all shadow-md active:scale-95"
            >
              Reservar mi sesión
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-transparent hover:bg-white text-[#2B231F] border border-[#2B231F]/30 text-sm font-medium rounded-full transition-all"
            >
              Conversar primero
            </a>
          </div>
        </div>
      </section>

      {/* 16. FINAL CIERRE */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 border-b border-[#E6DFD3] bg-[#F1EEE4]">
        <div className="max-w-4xl mx-auto space-y-4 text-left">
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#2B231F] leading-tight">
            Una conversación puede cambiar el tono de todo.
          </h2>
          <p className="text-sm sm:text-base text-[#5E534C] max-w-xl">
            No necesitás hacerlo perfecto. Necesitás dejar de estar tan sola/o adentro de lo que te pasa.
          </p>
          <div className="pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#581420] hover:bg-[#6D1B29] text-white text-sm font-medium rounded-full transition-all shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#E4B062]" />
              <span>Quiero conversar</span>
            </a>
          </div>
        </div>
      </section>

      {/* 17. FOOTER */}
      <footer className="py-8 px-4 sm:px-8 bg-[#FDFBF7] text-xs text-[#8C8176]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span
              onClick={onGoToAdmin}
              className="cursor-pointer select-none hover:text-[#581420] transition-colors"
              title="cclagoriocoach.com/admin"
            >
              © 2026 Cecilia Lagorio
            </span>{' '}
            · cclagoriocoach.com ·{' '}
            <a href="https://alivegamers.com" className="hover:underline">
              alivegamers.com
            </a>{' '}
            ·{' '}
            <a href="https://instagram.com/cc.lagorio.coach" className="hover:underline">
              @cc.lagorio.coach
            </a>{' '}
            ·{' '}
            <a href="https://instagram.com/alive.arg" className="hover:underline">
              @alive.arg
            </a>{' '}
            ·{' '}
            <a href="https://www.youtube.com/@C.C.LagorioILifeCoach" className="hover:underline">
              YouTube
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8C8176] text-[11px]">
              Neurocoaching & Gestión Emocional
            </span>
          </div>
        </div>
      </footer>

      {/* 18. STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E6DFD3] sm:hidden z-30 shadow-lg">
        <a
          href="https://alivegamers.com/personal"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-[#581420] text-white text-xs font-bold rounded-full text-center block shadow-md active:scale-95"
        >
          Reservar mi sesión
        </a>
      </div>
    </div>
  );
};
