import { LifeAreaKey } from '../types/coaching';

// -------------------------------------------------------------------------
// 1. CUESTIONARIO COMPLETO DE ENEATIPO & HERIDA DECISIONAL (18 PREGUNTAS)
// -------------------------------------------------------------------------
export interface EnneagramDiagnosticItem {
  id: string;
  triad: 'visceral' | 'emocional' | 'mental';
  triadLabel: string;
  question: string;
  coachInstruction: string;
  options: {
    enneatype: number;
    wound: string; // Herida raíz
    text: string;
    somaticSignal: string; // Dónde se siente en el cuerpo
  }[];
}

export const ENNEAGRAM_QUESTIONNAIRE: EnneagramDiagnosticItem[] = [
  // --- TRÍADA VISCERAL / INSTINTIVA (1, 8, 9) ---
  {
    id: 'q_error_reaction',
    triad: 'visceral',
    triadLabel: 'Tríada del Cuerpo & Instinto (Centro Visceral)',
    question: '1. Ante un error, imprevisto o situación que no sale como esperabas en tu vida, ¿cuál es tu primera reacción visceral?',
    coachInstruction: 'Pídele que no racionalice, que responda su primer movimiento instintivo corporal.',
    options: [
      {
        enneatype: 1,
        wound: 'Herida de Defecto / Imperfección',
        text: 'Siento irritación interna inmediata, tensión en mandíbula y el impulso urgente de corregirlo para que quede impecable.',
        somaticSignal: 'Mandíbula apretada y rigidez cervical.',
      },
      {
        enneatype: 8,
        wound: 'Herida de Vulnerabilidad / Sometimiento',
        text: 'Reacciono con firmeza o enfado explícito, tomo el control de inmediato y me planto ante la situación sin titubear.',
        somaticSignal: 'Calor en el pecho y postura de confrontación.',
      },
      {
        enneatype: 9,
        wound: 'Herida de Fragmentación / Conflicto',
        text: 'Minimizo el impacto para calmar el ambiente; prefiero adaptarme y no generar fricción, discusiones ni malestar.',
        somaticSignal: 'Pesadez corporal y deseo de evadir el problema.',
      },
    ],
  },
  {
    id: 'q_control_limits',
    triad: 'visceral',
    triadLabel: 'Tríada del Cuerpo & Instinto (Centro Visceral)',
    question: '2. En cuanto a tus límites personales y la relación con tu entorno y tus tiempos:',
    coachInstruction: 'Detecta cómo defiende su espacio personal y maneja la autonomía.',
    options: [
      {
        enneatype: 1,
        wound: 'Herida de Juicio / Crítica',
        text: 'Me auto-exijo estándares muy rigurosos en mi conducta diaria; me irrita internamente cuando los demás no respetan el orden o la ética.',
        somaticSignal: 'Hipervigilancia postural recta y suspiros contenidos.',
      },
      {
        enneatype: 8,
        wound: 'Herida de Traición / Dependencia',
        text: 'No permito que nadie me domine ni me diga qué hacer; protejo mi soberanía y a las personas que quiero con fuerza e intensidad.',
        somaticSignal: 'Blindaje muscular y voz rotunda sin dudas.',
      },
      {
        enneatype: 9,
        wound: 'Herida de Invisibilidad / Desconexión',
        text: 'Cedo con facilidad ante las preferencias ajenas; me cuesta decir que no para preservar la paz y la armonía del vínculo.',
        somaticSignal: 'Desconexión de las sensaciones de hambre, sed o cansancio.',
      },
    ],
  },
  {
    id: 'q_visceral_body',
    triad: 'visceral',
    triadLabel: 'Tríada del Cuerpo & Instinto (Centro Visceral)',
    question: '3. Respecto a tu energía física, tus descansos y las señales de tu cuerpo:',
    coachInstruction: 'Observa la relación con el descanso biológico y la escucha corporal.',
    options: [
      {
        enneatype: 1,
        wound: 'Intolerancia a la Relajación / Deber',
        text: 'Me cuesta relajarme profundamente; siento que antes debo dejar todo en perfecto orden y corregido, o me invade la culpa.',
        somaticSignal: 'Contracturas constantes en cuello y hombros.',
      },
      {
        enneatype: 8,
        wound: 'Exceso de Carga y Fuerza',
        text: 'Voy al frente con mucha energía e intensidad, empujando mi cuerpo al límite hasta que una contractura o dolor me frena de golpe.',
        somaticSignal: 'Presión en el pecho y tono simpático permanentemente acelerado.',
      },
      {
        enneatype: 9,
        wound: 'Inercia y Procrastinación Somática',
        text: 'Tiende a ganarme la inercia o el adormecimiento físico; postergo decisiones de autocuidado quedándome en mi zona de confort.',
        somaticSignal: 'Sensación de pesadez corporal y somnolencia reactiva.',
      },
    ],
  },

  // --- TRÍADA DEL CORAZÓN / EMOCIONAL (2, 3, 4) ---
  {
    id: 'q_worth_identity',
    triad: 'emocional',
    triadLabel: 'Tríada del Corazón & Identidad (Centro Emocional)',
    question: '4. ¿De qué depende prioritariamente tu sensación íntima de valor personal y autoimagen?',
    coachInstruction: 'Observa la herida de reconocimiento vs. autenticidad.',
    options: [
      {
        enneatype: 2,
        wound: 'Herida de No Ser Amado / Rechazo',
        text: 'De sentirme una persona cariñosa, querida e indispensable para quienes quiero, ayudándolos incluso postergando mi propio bienestar.',
        somaticSignal: 'Agotamiento suprarrenal con dolor de hombros y pesadez en el pecho.',
      },
      {
        enneatype: 3,
        wound: 'Herida de Fracaso / Falta de Valor Intrínseco',
        text: 'De sentir que soy una persona valiosa, capaz y resolutiva ante la vida, evitando a toda costa mostrar vulnerabilidad, duda o debilidad frente a otros.',
        somaticSignal: 'Picos de adrenalina, palpitaciones y respiración clavicular superficial.',
      },
      {
        enneatype: 4,
        wound: 'Herida de Inadecuación / Falta',
        text: 'De sentirme fiel a mi sensibilidad única y auténtica, aunque a menudo me sienta diferente, incomprendido/a o fuera de lugar.',
        somaticSignal: 'Opresión en el centro del pecho y nudo en la garganta.',
      },
    ],
  },
  {
    id: 'q_burnout_pace',
    triad: 'emocional',
    triadLabel: 'Tríada del Corazón & Identidad (Centro Emocional)',
    question: '5. Cuando te sientes al borde del agotamiento emocional o de una crisis personal:',
    coachInstruction: 'Detecta cómo anestesia su mundo interno y qué hace con la vulnerabilidad.',
    options: [
      {
        enneatype: 2,
        wound: 'Herida de Ingratitud / Abandono',
        text: 'Siento que me desvivo por los demás sin recibir el mismo cuidado o reciprocidad; me invade una angustia silenciosa y sensación de vacío.',
        somaticSignal: 'Cansancio visceral y somatizaciones en garganta o estómago.',
      },
      {
        enneatype: 3,
        wound: 'Herida de Vacío y Desconexión',
        text: 'Acelero aún más el ritmo de actividades para no tomar contacto con la tristeza o la fragilidad, anestesiando el cansancio de mi cuerpo.',
        somaticSignal: 'Bruxismo e insomnio por hiper-actividad mental y física.',
      },
      {
        enneatype: 4,
        wound: 'Herida de Carencia / Melancolía',
        text: 'Me retiro a rumiar la tristeza, el dolor o la nostalgia, sintiendo que me falta algo fundamental que los demás sí tienen para ser felices.',
        somaticSignal: 'Baja energía motriz, desgano y tendencia al aislamiento.',
      },
    ],
  },
  {
    id: 'q_heart_needs',
    triad: 'emocional',
    triadLabel: 'Tríada del Corazón & Identidad (Centro Emocional)',
    question: '6. En cuanto a expresar tus verdaderas necesidades emocionales y pedir contención:',
    coachInstruction: 'Observa la facilidad o bloqueo para mostrarse necesitado de afecto y apoyo.',
    options: [
      {
        enneatype: 2,
        wound: 'Auto-Postergación Vinculada',
        text: 'Percibo las necesidades de otros al instante, pero me cuesta enormemente pedir ayuda o manifestar lo que yo realmente necesito.',
        somaticSignal: 'Garganta cerrada y tensión en el plexo solar.',
      },
      {
        enneatype: 3,
        wound: 'Coraza de Autosuficiencia',
        text: 'Prefiero resolver mis asuntos en soledad; pedir ayuda me hace sentir expuesto/a o insuficiente ante los ojos de los demás.',
        somaticSignal: 'Hipertonía muscular en cuello y postura de "yo puedo con todo".',
      },
      {
        enneatype: 4,
        wound: 'Incomprensión Emocional',
        text: 'Expreso mi sentir con intensidad, pero suelo sentir que nadie alcanza a comprender la profundidad o la complejidad de lo que vivo.',
        somaticSignal: 'Sensación de vacío en el pecho y suspiros continuos.',
      },
    ],
  },

  // --- TRÍADA DE LA MENTE / CABEZA (5, 6, 7) ---
  {
    id: 'q_fear_uncertainty',
    triad: 'mental',
    triadLabel: 'Tríada de la Mente & Seguridad (Centro Mental)',
    question: '7. Ante la incertidumbre, el miedo o los cambios imprevistos en tu vida:',
    coachInstruction: 'Observa la relación con el miedo y la toma de decisiones.',
    options: [
      {
        enneatype: 5,
        wound: 'Herida de Invasión / Incompetencia',
        text: 'Me repliego a analizar y reflexionar en soledad; siento que las demandas de los demás me agotan la batería vital.',
        somaticSignal: 'Frío en extremidades y respiración contenida.',
      },
      {
        enneatype: 6,
        wound: 'Herida de Desamparo / Peligro',
        text: 'Anticipo mentalmente los peores escenarios posibles, dudo constantemente de mis pasos y busco certezas antes de actuar.',
        somaticSignal: 'Nudo en la boca del estómago y sobresaltos de alerta.',
      },
      {
        enneatype: 7,
        wound: 'Herida de Privación / Dolor',
        text: 'Planifico opciones placenteras, compras o proyectos estimulantes; no tolero la sensación de aburrimiento, dolor o encierro emocional.',
        somaticSignal: 'Inquietud motora en piernas y búsqueda compulsiva de estímulos.',
      },
    ],
  },
  {
    id: 'q_decisions_driver',
    triad: 'mental',
    triadLabel: 'Tríada de la Mente & Seguridad (Centro Mental)',
    question: '8. ¿Cuál es el freno interno o mecanismo que más suele sabotear tus decisiones de cambio y hábitos?',
    coachInstruction: 'Esta es la clave para fijar los anclajes de neuroplasticidad en el día a día.',
    options: [
      {
        enneatype: 5,
        wound: 'Retención de Recursos y Energía',
        text: '"No tengo energía física ni tiempo suficiente ahora; prefiero conservar mi batería y no comprometerme con más exigencias."',
        somaticSignal: 'Letargo y postergación analítica.',
      },
      {
        enneatype: 6,
        wound: 'Parálisis por Duda y Temor al Error',
        text: '"¿Y si este cambio no funciona o me genera un problema mayor? Me lleno de dudas y postergo el compromiso."',
        somaticSignal: 'Ansiedad anticipatoria y rumiación mental.',
      },
      {
        enneatype: 7,
        wound: 'Dispersión por Búsqueda de Novedad',
        text: '"La constancia me resulta monótona; me entusiasmo rápidamente con algo nuevo en lugar de sostener el proceso a largo plazo."',
        somaticSignal: 'Impulsividad por recompensas inmediatas y falta de arraigo.',
      },
    ],
  },
  {
    id: 'q_mental_solitude',
    triad: 'mental',
    triadLabel: 'Tríada de la Mente & Seguridad (Centro Mental)',
    question: '9. Respecto a tu mundo mental y la gestión de tus pensamientos cotidianos:',
    coachInstruction: 'Observa la relación entre pensamiento abstracto y presencia somática.',
    options: [
      {
        enneatype: 5,
        wound: 'Desconexión del Cuerpo por Intelectualización',
        text: 'Vivo mucho en mi cabeza, analizando teorías e información; a veces me desconecto por completo de lo que siente mi cuerpo físico.',
        somaticSignal: 'Respiración torácica inmóvil y mirada fija.',
      },
      {
        enneatype: 6,
        wound: 'Alerta y Rumiación Continua',
        text: 'Mi mente rara vez se apaga: el escaneo continuo de riesgos y la hipervigilancia me generan tensión permanente en estómago y mandíbula.',
        somaticSignal: 'Tensión en la boca del estómago y sensación de sobresalto.',
      },
      {
        enneatype: 7,
        wound: 'Evasión Mental del Presente',
        text: 'Mi mente va a mil por hora saltando de una idea a otra para mantenerse estimulada, costándome mucho habitar el silencio y la quietud.',
        somaticSignal: 'Incapacidad de quedarse quieto/a y fatiga por sobre-estimulación.',
      },
    ],
  },
];

// -------------------------------------------------------------------------
// 2. CUESTIONARIO DIAGNÓSTICO DE CREENCIAS POR ÁREA DE VIDA (7 ÁREAS)
// -------------------------------------------------------------------------
export interface BeliefDiagnosticItem {
  id: string;
  areaKey: LifeAreaKey;
  areaLabel: string;
  statement: string;
  type: 'limiting' | 'empowered';
  interpretation: string;
}

export const BELIEFS_QUESTIONNAIRE: BeliefDiagnosticItem[] = [
  // 1. Cuerpo - Mente
  {
    id: 'bel_cm_1',
    areaKey: 'cuerpo_mente',
    areaLabel: 'Vínculo Cuerpo - Mente',
    statement: 'Siento que detenerme a descansar o cuidarme es una señal de debilidad o pérdida de tiempo.',
    type: 'limiting',
    interpretation: 'Exigencia sobre el organismo sin pausas regenerativas.',
  },
  {
    id: 'bel_cm_2',
    areaKey: 'cuerpo_mente',
    areaLabel: 'Vínculo Cuerpo - Mente',
    statement: 'Mi cuerpo es el templo biológico que sostiene con salud, vitalidad y calma todas mis elecciones diarias.',
    type: 'empowered',
    interpretation: 'Soberanía biológica y respeto por los ciclos circadianos y de descanso.',
  },

  // 2. Pareja
  {
    id: 'bel_par_1',
    areaKey: 'pareja',
    areaLabel: 'Pareja o Vida Amorosa',
    statement: 'Si muestro mi cansancio o debilidad ante mi pareja, perderé su admiración o me abandonará.',
    type: 'limiting',
    interpretation: 'Vínculo condicionado por el desempeño y miedo al rechazo.',
  },
  {
    id: 'bel_par_2',
    areaKey: 'pareja',
    areaLabel: 'Pareja o Vida Amorosa',
    statement: 'La intimidad amorosa profunda nace de poder ser vulnerable y auténtico sin caretas.',
    type: 'empowered',
    interpretation: 'Disponibilidad afectiva segura e interdependiente.',
  },

  // 3. Familia
  {
    id: 'bel_fam_1',
    areaKey: 'familia',
    areaLabel: 'Familia Primaria y Secundaria',
    statement: 'Tengo que cargar con las demandas y expectativas familiares para no sentir culpa.',
    type: 'limiting',
    interpretation: 'Mandatos heredados que asfixian la autonomía.',
  },
  {
    id: 'bel_fam_2',
    areaKey: 'familia',
    areaLabel: 'Familia Primaria y Secundaria',
    statement: 'Honro a mi familia poniendo límites sanos y viviendo desde mi propia soberanía personal.',
    type: 'empowered',
    interpretation: 'Diferenciación sana y lazos afectivos libres de culpa.',
  },

  // 4. Amigos
  {
    id: 'bel_ami_1',
    areaKey: 'amigos',
    areaLabel: 'Amigos y Vida Social',
    statement: 'No tengo tiempo para vida social; compartir con otros me parece secundario frente a mis exigencias o tareas pendientes.',
    type: 'limiting',
    interpretation: 'Aislamiento defensivo y postergación del goce vincular.',
  },
  {
    id: 'bel_ami_2',
    areaKey: 'amigos',
    areaLabel: 'Amigos y Vida Social',
    statement: 'La risa, la pertenencia y las conversaciones genuinas regulan mi sistema nervioso.',
    type: 'empowered',
    interpretation: 'Red de apoyo nutritiva que reduce el cortisol.',
  },

  // 5. Trabajo y Vocación
  {
    id: 'bel_trab_1',
    areaKey: 'trabajo_vocacion',
    areaLabel: 'Propósito y Vocación',
    statement: 'Siento que dedico mi energía diaria a ocupaciones que me drenan por miedo a perder seguridad o aprobación.',
    type: 'limiting',
    interpretation: 'Desalineación vocacional y falta de coherencia con el propio sentido de vida.',
  },
  {
    id: 'bel_trab_2',
    areaKey: 'trabajo_vocacion',
    areaLabel: 'Propósito y Vocación',
    statement: 'Mi vitalidad, dones y serenidad florecen cuando lo que elijo hacer cada día está alineado con mi vocación y propósito genuino.',
    type: 'empowered',
    interpretation: 'Coherencia interna entre talentos, sentido de vida y decisiones diarias.',
  },

  // 6. Finanzas
  {
    id: 'bel_fin_1',
    areaKey: 'finanzas',
    areaLabel: 'Finanzas Personales',
    statement: 'El dinero es fuente constante de estrés; nunca siento que sea suficiente para estar tranquilo.',
    type: 'limiting',
    interpretation: 'Ansiedad por escasez o mala relación con la abundancia.',
  },
  {
    id: 'bel_fin_2',
    areaKey: 'finanzas',
    areaLabel: 'Finanzas Personales',
    statement: 'Gestiono mi economía con estructura, visión de abundancia y serenidad interior.',
    type: 'empowered',
    interpretation: 'Soberanía financiera sin reactividad emocional.',
  },

  // 7. Ocio
  {
    id: 'bel_oc_1',
    areaKey: 'ocio',
    areaLabel: 'Ocio y Tiempo Libre',
    statement: 'Dedicar tiempo a actividades que no producen un resultado útil me genera profunda culpa.',
    type: 'limiting',
    interpretation: 'Intolerancia al no-hacer; boicot de la regeneración celular.',
  },
  {
    id: 'bel_oc_2',
    areaKey: 'ocio',
    areaLabel: 'Ocio y Tiempo Libre',
    statement: 'El juego, la pausa y el descanso regeneran mi neuroplasticidad y mi bienestar integral.',
    type: 'empowered',
    interpretation: 'El descanso como necesidad biológica vital y fuente de equilibrio emocional.',
  },
];

// -------------------------------------------------------------------------
// 3. CUESTIONARIO DE SATISFACCIÓN (RUEDA DE LA VIDA OBJETIVA - 7 ÁREAS)
// -------------------------------------------------------------------------
export interface LifeSatisfactionDiagnosticItem {
  areaKey: LifeAreaKey;
  label: string;
  diagnosticQuestion: string;
  lowScoreAnchor: string; // 1 - 3
  mediumScoreAnchor: string; // 4 - 6
  highScoreAnchor: string; // 7 - 10
}

export const LIFE_SATISFACTION_ITEMS: LifeSatisfactionDiagnosticItem[] = [
  {
    areaKey: 'cuerpo_mente',
    label: 'Vínculo Cuerpo - Mente',
    diagnosticQuestion: '¿En qué medida sientes que tu cuerpo te acompaña hoy con energía sostenida, sin dolores crónicos ni somatizaciones?',
    lowScoreAnchor: 'Agotamiento crónico, insomnio o síntomas digestivos diarios (1-3).',
    mediumScoreAnchor: 'Funciono bien pero con momentos de fatiga y tensión recurrente (4-6).',
    highScoreAnchor: 'Vitalidad plena, sueño reparador y conexión intuitiva con mi cuerpo (7-10).',
  },
  {
    areaKey: 'pareja',
    label: 'Pareja o Vida Amorosa',
    diagnosticQuestion: '¿Cómo calificarías el nivel de complicidad, comunicación honesta y disfrute en tu vida amorosa?',
    lowScoreAnchor: 'Distancia emocional, discusiones continuas o soledad dolorosa (1-3).',
    mediumScoreAnchor: 'Estable pero con falta de intimidad o temas no hablados (4-6).',
    highScoreAnchor: 'Vínculo seguro, disfrute mutuo y apoyo incondicional (7-10).',
  },
  {
    areaKey: 'familia',
    label: 'Familia Primaria y Secundaria',
    diagnosticQuestion: '¿Qué grado de paz y libertad sientes en la relación con tu familia de origen?',
    lowScoreAnchor: 'Tensión pesada, mandatos asfixiantes o discusiones no resueltas (1-3).',
    mediumScoreAnchor: 'Relación cordial pero con límites frágiles (4-6).',
    highScoreAnchor: 'Paz profunda, respeto mutuo y límites saludables (7-10).',
  },
  {
    areaKey: 'amigos',
    label: 'Amigos y Vida Social',
    diagnosticQuestion: '¿En qué medida cuentas con amistades seguras con quienes reír, desahogarte y ser tú mismo/a?',
    lowScoreAnchor: 'Aislamiento casi total o vínculos superficiales por compromiso (1-3).',
    mediumScoreAnchor: 'Pocos momentos para compartir pero con personas valiosas (4-6).',
    highScoreAnchor: 'Red de contención afectuosa, risas y encuentros periódicos (7-10).',
  },
  {
    areaKey: 'trabajo_vocacion',
    label: 'Propósito y Vocación',
    diagnosticQuestion: '¿En qué porcentaje sientes que tus actividades diarias encienden tu vocación y nutren tu energía vital?',
    lowScoreAnchor: 'Vacío existencial, estrés crónico o profunda desalineación (1-3).',
    mediumScoreAnchor: 'Ocupaciones que sostienen mi economía pero no me realizan del todo (4-6).',
    highScoreAnchor: 'Plena alineación con mi propósito, sentido de vida y satisfacción profunda (7-10).',
  },
  {
    areaKey: 'finanzas',
    label: 'Finanzas Personales',
    diagnosticQuestion: '¿Cuál es tu grado de tranquilidad, control y perspectiva de crecimiento económico?',
    lowScoreAnchor: 'Miedo constante a la escasez, deudas o descontrol (1-3).',
    mediumScoreAnchor: 'Cubro mis gastos pero me falta previsión o ahorro sólido (4-6).',
    highScoreAnchor: 'Soberanía financiera, orden patrimonial y tranquilidad (7-10).',
  },
  {
    areaKey: 'ocio',
    label: 'Ocio y Tiempo Libre',
    diagnosticQuestion: '¿Disfrutas de espacios semanales de recreación, naturaleza y juego sin culpa?',
    lowScoreAnchor: 'Cero tiempo de ocio o con culpa permanente de producir (1-3).',
    mediumScoreAnchor: 'Algún momento el fin de semana pero con la mente en pendientes (4-6).',
    highScoreAnchor: 'Tiempo lúdico sagrado, hobbies activos y regeneración mental (7-10).',
  },
];
