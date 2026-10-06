import { LifeAreaKey } from '../types/coaching';

export interface EnneatypeQuestion {
  id: string;
  category: string;
  prompt: string;
  coachTip: string;
  options: {
    enneatypeNumber: number;
    text: string;
    decisionStyle: string;
  }[];
}

export const ENNEATYPE_DECISION_QUESTIONS: EnneatypeQuestion[] = [
  {
    id: 'decision_driver',
    category: 'Motor de Decisión',
    prompt: '¿Cuál es el impulso invisible que guía prioritariamente tus decisiones diarias?',
    coachTip: 'Observa la velocidad con la que responde y si su centro es visceral, emocional o mental.',
    options: [
      {
        enneatypeNumber: 1,
        text: 'Hacer lo correcto e impecable, evitando cometer cualquier error o falta moral.',
        decisionStyle: 'Perfeccionista / Rigidez ética',
      },
      {
        enneatypeNumber: 2,
        text: 'Asegurar que las personas importantes para mí estén bien, postergando mi propia biología.',
        decisionStyle: 'Ayudador / Enfoque externo',
      },
      {
        enneatypeNumber: 3,
        text: 'Sentirme una persona valiosa, capaz y resolutiva ante la vida, evitando mostrar debilidad, duda o fracaso ante los demás.',
        decisionStyle: 'Realizador / Búsqueda de suficiencia y autoimagen',
      },
      {
        enneatypeNumber: 4,
        text: 'Ser fiel a mi sensibilidad única y no caer en lo ordinario ni en lo falso.',
        decisionStyle: 'Sensible / Intensidad emocional',
      },
      {
        enneatypeNumber: 5,
        text: 'Preservar mi energía y tiempo, analizando a fondo antes de involucrarme.',
        decisionStyle: 'Observador / Retiro mental',
      },
      {
        enneatypeNumber: 6,
        text: 'Prever riesgos, buscar certezas y estar preparado ante cualquier imprevisto.',
        decisionStyle: 'Previsor / Hipervigilancia',
      },
      {
        enneatypeNumber: 7,
        text: 'Mantener abiertas múltiples opciones placenteras y no quedar atrapado en el dolor.',
        decisionStyle: 'Visionario / Dopamina rápida',
      },
      {
        enneatypeNumber: 8,
        text: 'Tener el control de la situación, defender lo mío y no mostrar debilidad jamás.',
        decisionStyle: 'Protector / Firmeza asertiva',
      },
      {
        enneatypeNumber: 9,
        text: 'Mantener la tranquilidad y armonía, cediendo para evitar fricciones o discusiones.',
        decisionStyle: 'Pacificador / Inercia acomodaticia',
      },
    ],
  },
  {
    id: 'stress_reaction',
    category: 'Reacción Somática & Boicot',
    prompt: 'Cuando te sientes bajo presión o a punto de boicotearte, ¿qué pasa en tu cuerpo y mente?',
    coachTip: 'Pídele que localice la tensión corporal (mandíbula, pecho, estómago o cabeza).',
    options: [
      {
        enneatypeNumber: 1,
        text: 'Tensión en cuello y mandíbula, irritación interna silenciosa y juicio severo.',
        decisionStyle: 'Represión de la ira',
      },
      {
        enneatypeNumber: 2,
        text: 'Sensación de vacío o agotamiento por dar sin límites, esperando que lo noten.',
        decisionStyle: 'Sobre-involucramiento',
      },
      {
        enneatypeNumber: 3,
        text: 'Acelero aún más el ritmo diario, me hiper-activo para no tomar contacto con el dolor o la duda y anestesio el cansancio físico.',
        decisionStyle: 'Hiper-activación y desconexión somática',
      },
      {
        enneatypeNumber: 4,
        text: 'Me retiro a rumiar la emoción, sintiendo que nadie comprende realmente mi dolor.',
        decisionStyle: 'Bucle melancólico',
      },
      {
        enneatypeNumber: 5,
        text: 'Cierro la puerta, me aíslo y me quedo sin palabras para defender mis recursos.',
        decisionStyle: 'Desconexión somática',
      },
      {
        enneatypeNumber: 6,
        text: 'Taquicardia o nudo en el estómago, bucles de dudas y sobre-análisis del peor escenario.',
        decisionStyle: 'Amígdala hiperreactiva',
      },
      {
        enneatypeNumber: 7,
        text: 'Busco distracciones inmediatas (compras, comida, series, proyectos nuevos) para no sentir incomodidad.',
        decisionStyle: 'Evasión placentera',
      },
      {
        enneatypeNumber: 8,
        text: 'Exploto o impongo mi postura con vehemencia; la pasividad de otros me enfurece.',
        decisionStyle: 'Ataque frontal defensivo',
      },
      {
        enneatypeNumber: 9,
        text: 'Me adormezco, postergo decisiones importantes y me sumerjo en tareas secundarias sin apuro.',
        decisionStyle: 'Narcotización e inercia',
      },
    ],
  },
  {
    id: 'habit_barrier',
    category: 'Obstáculo para el Cambio de Hábitos',
    prompt: '¿Cuál es la creencia que te frena cuando intentas sostener hábitos de alimentación, ejercicio o descanso?',
    coachTip: 'Esta creencia es el pilar que abordaremos en las sesiones intermedias.',
    options: [
      {
        enneatypeNumber: 1,
        text: '"Si no lo hago perfecto todos los días sin fallar, no sirve de nada empezar."',
        decisionStyle: 'Todo o nada perfeccionista',
      },
      {
        enneatypeNumber: 2,
        text: '"Cuidar primero de mí misma es egoísta; los demás necesitan mi atención."',
        decisionStyle: 'Auto-postergación culposa',
      },
      {
        enneatypeNumber: 3,
        text: '"Detenerme a descansar o cuidarme me genera culpa o vacío; siento que si no estoy haciendo algo productivo, pierdo valor."',
        decisionStyle: 'Valor atado al hacer constante',
      },
      {
        enneatypeNumber: 4,
        text: '"La rutina me asfixia; solo puedo cuidarme cuando tengo la inspiración emocional."',
        decisionStyle: 'Dependencia del estado de ánimo',
      },
      {
        enneatypeNumber: 5,
        text: '"No tengo suficiente energía física para el ejercicio; prefiero conservar mi batería."',
        decisionStyle: 'Economía de energía extrema',
      },
      {
        enneatypeNumber: 6,
        text: '"¿Y si este cambio me genera un desequilibrio o no es el método adecuado? Dudo."',
        decisionStyle: 'Parálisis por análisis',
      },
      {
        enneatypeNumber: 7,
        text: '"La disciplina me aburre; necesito variedad constante o abandono a los pocos días."',
        decisionStyle: 'Intolerancia a la monotonía',
      },
      {
        enneatypeNumber: 8,
        text: '"No me gusta que me impongan reglas externas; yo decido cuándo y cómo me cuido."',
        decisionStyle: 'Resistencia a la pauta',
      },
      {
        enneatypeNumber: 9,
        text: '"Mañana empiezo; hoy estoy cansado y prefiero quedarme en mi zona de confort."',
        decisionStyle: 'Procrastinación por confort',
      },
    ],
  },
];

export interface AreaDiagnosticPrompt {
  areaKey: LifeAreaKey;
  question: string;
  limitingExample: string;
  empoweredExample: string;
}

export const AREA_DIAGNOSTIC_PROMPTS: AreaDiagnosticPrompt[] = [
  {
    areaKey: 'cuerpo_mente',
    question: '¿Escuchas las señales biológicas de tu cuerpo o las ignoras para seguir funcionando en automático?',
    limitingExample: 'Si me detengo, soy débil y pierdo el control.',
    empoweredExample: 'Mi cuerpo es el templo biológico que sostiene mi vitalidad, serenidad y bienestar integral.',
  },
  {
    areaKey: 'pareja',
    question: 'En tu vida amorosa o íntima, ¿puedes ser vulnerable o sientes que debes resolverlo todo tú?',
    limitingExample: 'Si muestro mi debilidad o desacuerdo, me dejarán de querer.',
    empoweredExample: 'Merezco un amor donde pueda ser transparente sin miedo al rechazo.',
  },
  {
    areaKey: 'familia',
    question: '¿Cargas con mandatos, culpas o expectativas heredadas de tu familia de origen?',
    limitingExample: 'Debo cargar con los problemas de mi clan para sentir que pertenezco.',
    empoweredExample: 'Honro a mi familia viviendo desde mi propia soberanía y libertad.',
  },
  {
    areaKey: 'amigos',
    question: '¿Tus vínculos sociales te recargan de energía o sientes que vas por compromiso?',
    limitingExample: 'No tengo tiempo para compartir; siempre tengo demasiadas exigencias o pendientes antes que socializar.',
    empoweredExample: 'Los lazos seguros, la presencia y la risa regulan mi sistema nervioso.',
  },
  {
    areaKey: 'trabajo_vocacion',
    question: '¿Tus actividades y ocupaciones diarias están alineadas con tu vocación y propósito genuino?',
    limitingExample: 'Tengo que sostener actividades que drenan mi vitalidad porque no me animo a priorizar lo que de verdad me llena.',
    empoweredExample: 'Mi creatividad y energía vital florecen cuando pongo mis dones al servicio de mi propósito genuino.',
  },
  {
    areaKey: 'finanzas',
    question: '¿Cómo te vinculas con el dinero: desde la serenidad o desde el miedo a la escasez?',
    limitingExample: 'El dinero siempre se esfuma; nunca es suficiente para sentirme a salvo.',
    empoweredExample: 'Administro mi abundancia con claridad, previsión y soberanía.',
  },
  {
    areaKey: 'ocio',
    question: '¿Te permites el juego, la pausa y el descanso sin sentir culpa ni necesidad de producir?',
    limitingExample: 'El tiempo libre que no produce nada tangible es tiempo perdido.',
    empoweredExample: 'El ocio y el juego regeneran mi sistema nervioso, mi neuroplasticidad y mi disfrute por la vida.',
  },
];
