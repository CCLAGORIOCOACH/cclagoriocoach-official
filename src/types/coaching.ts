export type LifeAreaKey =
  | 'cuerpo_mente'
  | 'finanzas'
  | 'pareja'
  | 'vocacion'
  | 'trabajo'
  | 'ocio'
  | 'familia'
  | 'amigos';

export interface LifeAreaConfig {
  key: LifeAreaKey;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
}

export const LIFE_AREAS: LifeAreaConfig[] = [
  {
    key: 'cuerpo_mente',
    label: 'Vínculo Cuerpo - Mente',
    shortLabel: 'Cuerpo-Mente',
    description: 'Somatización, escucha biológica, autocuidado y salud física.',
    iconName: 'Activity',
  },
  {
    key: 'finanzas',
    label: 'Vínculo con Finanzas',
    shortLabel: 'Finanzas',
    description: 'Relación con el dinero, seguridad material y toma de decisiones económicas.',
    iconName: 'Coins',
  },
  {
    key: 'pareja',
    label: 'Vínculo de Pareja o Vida Afectiva',
    shortLabel: 'Pareja / Afectiva',
    description: 'Vínculo íntimo afectivo, comunicación y disponibilidad emocional.',
    iconName: 'Heart',
  },
  {
    key: 'vocacion',
    label: 'Vínculo con Vocación',
    shortLabel: 'Vocación',
    description: 'Propósito profundo, dones personales y sentido trascendente de vida.',
    iconName: 'Compass',
  },
  {
    key: 'trabajo',
    label: 'Vínculo con Trabajo',
    shortLabel: 'Trabajo',
    description: 'Actividad laboral cotidiana, clima y desenvolvimiento profesional.',
    iconName: 'Briefcase',
  },
  {
    key: 'ocio',
    label: 'Vínculo con Ocio y Recreación',
    shortLabel: 'Ocio / Goce',
    description: 'Espacio para desconectar, disfrute sin culpa y regeneración creativa.',
    iconName: 'Sparkles',
  },
  {
    key: 'familia',
    label: 'Vínculo con Familia',
    shortLabel: 'Familia',
    description: 'Lazos de origen, mandatos heredados y vínculos familiares.',
    iconName: 'Users',
  },
  {
    key: 'amigos',
    label: 'Vínculo con Amigos y Vida Social',
    shortLabel: 'Amigos / Social',
    description: 'Red de apoyo, pertenencia y vínculos sociales nutritivos.',
    iconName: 'UserCheck',
  },
];

export interface EnneagramType {
  number: number;
  name: string;
  triad: 'visceral' | 'emocional' | 'mental';
  triadName: string;
  coreWound: string;
  descriptor: string;
  neuroPattern: string;
  defenseMechanism: string;
  somaticSignal: string;
  personalitySummary: string;
  growthDirection: string;
  sessionExplorerTip: string;
}

export const ENNEAGRAM_TYPES: EnneagramType[] = [
  {
    number: 1,
    name: 'El Perfeccionista / Reformador',
    triad: 'visceral',
    triadName: 'Centro Visceral / Instintivo (Cuerpo & Límites)',
    coreWound: 'Miedo a ser defectuoso, cometer faltas o ser juzgado/a como culpable.',
    descriptor: 'Rigidez corporal, autoexigencia interna severa y búsqueda de corrección moral y orden.',
    neuroPattern: 'Hipervigilancia a errores, tensión cervical y mandibular constante, inhibición de impulsos biológicos.',
    defenseMechanism: 'Formación reactiva y juicio interno: reprime el enojo transformándolo en rectitud y auto-crítica.',
    somaticSignal: 'Mandíbula apretada (bruxismo), trapecios tensos y contracturas cervicales.',
    personalitySummary: 'Persona con un estándar ético muy elevado que siente que debe sostener la rectitud y el orden. Le cuesta relajarse, delegar o tolerar que las cosas no salgan según su expectativa, experimentando una irritación silenciosa que drena su vitalidad.',
    growthDirection: 'Integración al 7: Permitirse la imperfección amorosa, el juego espontáneo, la flexibilidad y el disfrute sin culpa.',
    sessionExplorerTip: 'Explorar en sesión en qué área de vida (pareja, hábitos, descanso o familia) el juez interno está paralizando el bienestar y exigiendo perfección imposible.',
  },
  {
    number: 2,
    name: 'El Ayudador / Altruista Afectivo',
    triad: 'emocional',
    triadName: 'Centro Emocional / Corazón (Identidad & Vínculos)',
    coreWound: 'Miedo a no ser amado/a, ser rechazado/a o considerado/a prescindible si pone límites.',
    descriptor: 'Foco constante en las necesidades ajenas, postergando la propia biología y el autocuidado.',
    neuroPattern: 'Agotamiento suprarrenal crónico por hiper-sintonía con las emociones de los demás sin registro de sus propios límites.',
    defenseMechanism: 'Represión de las propias necesidades: siente que solo tiene valor a través de lo que brinda a su entorno.',
    somaticSignal: 'Pesadez y dolor en la parte alta de la espalda, opresión en el pecho y fatiga por desvelo.',
    personalitySummary: 'Personalidad afectuosa y empática que busca sentirse querida e indispensable. Le cuesta pedir ayuda o reconocer su cansancio físico, acumulando a menudo un resentimiento silencioso cuando su entrega no es correspondida.',
    growthDirection: 'Integración al 4: Contacto profundo con el dolor propio, expresión honesta de sus deseos y autocuidado radical.',
    sessionExplorerTip: 'Explorar en sesión en qué relaciones o áreas de su vida está asumiendo responsabilidades ajenas que no le corresponden a costa de su propia salud.',
  },
  {
    number: 3,
    name: 'El Realizador / Enfocado en la Eficacia',
    triad: 'emocional',
    triadName: 'Centro Emocional / Corazón (Identidad & Vínculos)',
    coreWound: 'Miedo al fracaso, a no valer nada si no está resolviendo o produciendo, y a mostrar vulnerabilidad.',
    descriptor: 'Sensación de valor atada al hacer constante y a proyectar solvencia. Desconexión del cuerpo para no detenerse.',
    neuroPattern: 'Picos de adrenalina y cortisol por activación simpática continua; ansiedad ante los momentos de pausa o silencio.',
    defenseMechanism: 'Identificación con la imagen de suficiencia: adormece las emociones y el cansancio físico para seguir funcionando.',
    somaticSignal: 'Bruxismo, respiración clavicular superficial, taquicardias ocasionales e insomnio por rumiación de pendientes.',
    personalitySummary: 'Personalidad resolutiva y dinámica que confunde su valor como persona con su capacidad de resolver y rendir. Teme ser visto/a en momentos de fragilidad o fracaso, lo que le lleva a colocarse una coraza de "yo puedo con todo" que termina aislándolo emocionalmente.',
    growthDirection: 'Integración al 6: Autenticidad, vulnerabilidad compartida, presencia pausada en los vínculos y descanso reparador sin culpa.',
    sessionExplorerTip: 'Explorar en sesión qué costo corporal y emocional está pagando por sostener la máscara de autosuficiencia y en qué área teme aflojar el control.',
  },
  {
    number: 4,
    name: 'El Individualista / Sensible y Auténtico',
    triad: 'emocional',
    triadName: 'Centro Emocional / Corazón (Identidad & Vínculos)',
    coreWound: 'Miedo a ser una persona ordinaria, defectuosa o a carecer de una identidad y significado genuinos.',
    descriptor: 'Anhelo de lo que falta, intensidad emocional profunda, hipersensibilidad y tendencia a la melancolía.',
    neuroPattern: 'Rumiación límbica acentuada, reactividad neurovegetativa ante la percepción de abandono o incomprensión.',
    defenseMechanism: 'Introyección y dramatización del vacío: magnifica la herida para preservar una sensación de singularidad única.',
    somaticSignal: 'Nudo en la garganta, opresión en el esternón, pesadez en extremidades y fluctuaciones bruscas de energía.',
    personalitySummary: 'Personalidad con rica vida interior y gran sensibilidad estética y humana. Puede sentirse con frecuencia incomprendida o con un dolor íntimo de carencia, supeditando sus hábitos y decisiones al estado anímico fluctuante del momento.',
    growthDirection: 'Integración al 1: Disciplina amorosa, estructura estable en hábitos cotidianos y anclaje en la realidad del presente.',
    sessionExplorerTip: 'Explorar en sesión en qué área de su vida se frena por esperar "tener ganas" o "sentirse inspirado/a", y cómo construir hábitos estables.',
  },
  {
    number: 5,
    name: 'El Investigador / Observador Analítico',
    triad: 'mental',
    triadName: 'Centro Mental / Cabeza (Miedo & Seguridad)',
    coreWound: 'Miedo a ser invadido/a, abrumado/a o a no contar con la suficiente energía o capacidad para el entorno.',
    descriptor: 'Retiro a la mente, avaricia de energía personal, desapego emocional y minimización de necesidades biológicas.',
    neuroPattern: 'Hiper-activación del neocórtex en detrimento de la propiocepción; desconexión de las señales biológicas corporales.',
    defenseMechanism: 'Aislamiento cognitivo: separa el pensamiento del sentir para no ser perturbado por el mundo exterior.',
    somaticSignal: 'Extremidades frías, respiración contenida, tono postural laxo y fatiga sensorial rápida.',
    personalitySummary: 'Personalidad reflexiva y autónoma que percibe el mundo como demandante y agotador. Tiende a reducir sus necesidades al mínimo y a refugiarse en sus pensamientos antes que implicarse de lleno en la acción o el contacto vincular directo.',
    growthDirection: 'Integración al 8: Enraizamiento visceral en el cuerpo, expresión directa y audaz de sus necesidades y toma de acción en el mundo real.',
    sessionExplorerTip: 'Explorar en sesión qué vínculos o situaciones experimenta como una fuga energética insoportable y cómo recuperar presencia física y vital.',
  },
  {
    number: 6,
    name: 'El Leal / Previsor Escéptico',
    triad: 'mental',
    triadName: 'Centro Mental / Cabeza (Miedo & Seguridad)',
    coreWound: 'Miedo al desamparo, al peligro, a la incertidumbre y a ser traicionado/a sin recursos de defensa.',
    descriptor: 'Anticipación de amenazas, duda continua, escaneo del entorno y búsqueda de certezas o respaldos firmes.',
    neuroPattern: 'Amígdala cerebral en alerta constante, sistema nervioso simpático sobreestimulado por pensamientos de peligro.',
    defenseMechanism: 'Proyección y anticipación del peor escenario posible para intentar neutralizar el miedo antes de que ocurra.',
    somaticSignal: 'Nudo en la boca del estómago, sobresaltos, tensión ocular y mandíbula apretada.',
    personalitySummary: 'Personalidad leal, perceptiva y protectora que vive con una alarma interna encendida ante lo que podría salir mal. La duda recurrente sabotea su confianza intuitiva, haciéndole postergar decisiones hasta sentir que cuenta con garantías absolutas.',
    growthDirection: 'Integración al 9: Confianza orgánica, serenidad interior, aceptación de la incertidumbre y anclaje en la paz corporal.',
    sessionExplorerTip: 'Explorar en sesión qué decisión de vida tiene postergada por miedo a equivocarse o por esperar una certeza externa que nunca llega.',
  },
  {
    number: 7,
    name: 'El Entusiasta / Explorador Vital',
    triad: 'mental',
    triadName: 'Centro Mental / Cabeza (Miedo & Seguridad)',
    coreWound: 'Miedo a quedar atrapado/a en el dolor emocional, la tristeza, la privación o los límites que frustran.',
    descriptor: 'Huida de la incomodidad hacia planes placenteros, múltiples proyectos abiertos y dopamina rápida.',
    neuroPattern: 'Dispersión atencional, búsqueda compulsiva de novedad para regular neurotransmisores y baja tolerancia al aburrimiento.',
    defenseMechanism: 'Racionalización placentera: resignifica lo doloroso en positivo para evitar transitar el duelo o la incomodidad.',
    somaticSignal: 'Inquietud psicomotriz en piernas, masticación acelerada, superficialidad en la respiración y cansancio disperso.',
    personalitySummary: 'Personalidad carismática, alegre y curiosa que busca mantener siempre abiertas opciones ilimitadas para no experimentar encierro o dolor. Le resulta difícil sostener la constancia en procesos monótonos o enfrentar conversaciones difíciles.',
    growthDirection: 'Integración al 5: Profundización sosegada, presencia plena en el aquí y ahora, y templanza para habitar la incomodidad sin huir.',
    sessionExplorerTip: 'Explorar en sesión de qué conversación o incomodidad emocional está huyendo a través de planes, compras o distracciones placenteras.',
  },
  {
    number: 8,
    name: 'El Desafiador / Protector Autónomo',
    triad: 'visceral',
    triadName: 'Centro Visceral / Instintivo (Cuerpo & Límites)',
    coreWound: 'Miedo a ser vulnerable, débil, manipulado/a o sometido/a al arbitrio de otros.',
    descriptor: 'Necesidad de autonomía férrea, control del territorio, intensidad emocional y resistencia a mostrar fragilidad.',
    neuroPattern: 'Impulso simpático visceral de confrontación; umbral del dolor alto y blindaje muscular defensivo.',
    defenseMechanism: 'Negación de la propia debilidad: convierte el miedo o la tristeza en fuerza, enojo activo o toma de mando.',
    somaticSignal: 'Presión en el pecho, tensión en cuello y hombros, voz imperativa y rigidez en la columna.',
    personalitySummary: 'Personalidad intensa, directa y protectora que defiende con vehemencia su autonomía y a quienes ama. Percibe el mundo como un terreno donde los débiles son lastimados, por lo que le cuesta enormemente mostrar ternura, pedir contención o dejarse cuidar.',
    growthDirection: 'Integración al 2: Apertura del corazón, compasión, aceptación de la interdependencia amorosa y permiso para soltar las armas y descansar.',
    sessionExplorerTip: 'Explorar en sesión en qué vínculo está reaccionando a la defensiva o imponiendo su postura por temor a sentirse desprotegido/a.',
  },
  {
    number: 9,
    name: 'El Pacificador / Mediador Armónico',
    triad: 'visceral',
    triadName: 'Centro Visceral / Instintivo (Cuerpo & Límites)',
    coreWound: 'Miedo al conflicto, a la desunión, al rechazo o a la fragmentación de la paz y el vínculo.',
    descriptor: 'Narcotización de los propios deseos para evitar fricciones. Inercia, mimetización y auto-olvido.',
    neuroPattern: 'Hipo-activación del sistema de alerta; lentitud metabólica reactiva para amortiguar el impacto del estrés exterior.',
    defenseMechanism: 'Narcotización: se sumerge en rutinas tranquilizantes o tareas secundarias para anestesiar sus prioridades reales.',
    somaticSignal: 'Sensación de pesadez corporal, somnolencia tras discusiones, fatiga al tomar decisiones y respiración lenta.',
    personalitySummary: 'Personalidad afable, comprensiva y serena que valora la tranquilidad por encima de todo. Para evitar cualquier desacuerdo, suele amoldarse a los demás hasta perder registro de lo que realmente quiere, postergando cambios esenciales de su propia vida.',
    growthDirection: 'Integración al 3: Despertar de la vitalidad, autodesarrollo activo, toma de decisiones decidida y poner voz propia a sus sueños.',
    sessionExplorerTip: 'Explorar en sesión qué decisión o deseo personal está postergando para no tener que afrontar un desacuerdo con alguien cercano.',
  },
];

export interface ChildhoodStimulus {
  figure: 'madre' | 'padre' | 'hermanos' | 'abuelos_otros';
  figureLabel: string;
  words: [string, string, string];
  notes?: string;
}

export interface AreaBelief {
  limitingPercentage: number; // 0 - 100
  empoweredPercentage: number; // 100 - limiting
  limitingBeliefSnippet: string;
  empoweredBeliefSnippet: string;
}

export interface TaskFeedback {
  taskDescription: string;
  completionStatus: 'cumplida_total' | 'cumplida_parcial' | 'boicot_bloqueo';
  clientFeedbackNotes: string;
  boicotPatternIdentified?: string;
}

export interface InitialBaseline {
  consultationReason?: string; // Motivo de consulta principal explorado en Sesión 1
  sessionIntroduction?: string; // Introducción y encuadre clínico
  enneatype: number; // 1 - 9
  enneatypeWing?: string;
  enneatypeTestAnswers?: Record<string, any>;
  dominantDrainArea: LifeAreaKey;
  isWorkAlignedWithVocation: 'si' | 'parcial' | 'no';
  workVocationNotes: string;
  lifeWheel: Record<LifeAreaKey, number>; // 1 - 10
  beliefs: Record<LifeAreaKey, AreaBelief>;
  childhoodStimuli: ChildhoodStimulus[];
  initialVitalDecisions: {
    nutrition: number; // 1 - 10
    exercise: number; // 1 - 10
    rest: number; // 1 - 10
    overallDecisionsQuality?: number; // 1 - 10
    notes: string;
  };
  initialPredominantEmotion: string;
  hardestEmotionToManage?: string;
  generalObservations: string;
  sessionOneTaskForSessionTwo?: string; // Tarea de neuroplasticidad fijada en Sesión 1 para la Sesión 2
}

export interface SessionRecord {
  id: string;
  sessionNumber: number;
  date: string;
  sessionType?: 'mapa_interno' | 'feedback'; // Tipo de sesión: Mapa Interno (anclaje/re-mapeo) o Feedback
  sessionTopic?: string; // Tema que trae por sesión el cliente
  previousTaskFeedback?: TaskFeedback; // Feedback de la tarea de la sesión anterior
  vitalDecisions: {
    nutrition: number; // 1 - 10
    exercise: number; // 1 - 10
    rest: number; // 1 - 10
    overallDecisionsQuality?: number; // 1 - 10 ("Del 1 al 10, ¿cómo calificarías la calidad de tus decisiones hoy?")
    vitalEnergyScore: number; // computed avg (1 - 10)
    decisionNotes: string;
  };
  emotionalManagement: {
    predominantEmotion: string;
    hardestEmotionToManage?: string; // ("¿Cuál fue la emoción que más te costó entender o gestionar?")
    intensity: number; // 1 - 10
    neuroplasticityToolApplied: string;
    interferedWithDecisions: 'no' | 'parcial' | 'si';
    emotionalNotes: string;
  };
  lifeWheelSnapshot: Record<LifeAreaKey, number>; // 1 - 10
  empoweredBeliefsSnapshot: Record<LifeAreaKey, number>; // % empoderadas (0 - 100)
  coachObservations: string;
  actionCommitment: string; // Tarea / compromiso para la siguiente sesión
}

export interface FinalEvaluation {
  completedAt: string;
  enneatypeFinal?: number;
  lifeWheelFinal: Record<LifeAreaKey, number>;
  empoweredBeliefsFinal: Record<LifeAreaKey, number>;
  finalVitalDecisions: {
    nutrition: number;
    exercise: number;
    rest: number;
    vitalEnergyScore: number;
  };
  predominantEmotionConsolidated: string;
  keyMilestones: string[];
  preventiveBoicotProtocol: string;
  coachSummary: string;
}

export interface TransformationalSingleSessionData {
  specificTopic: string; // "Tema puntual en específico" planteado por el cliente
  backgroundProcessSummary: string; // Resumen del proceso previo que ya trae el cliente
  sessionDurationMinutes: number; // 75 minutos estándar
  date: string;

  // 1. Punto de partida & Cómo estabas decidiendo
  howClientDecidedInitially: string; // "Estabas decidiendo de esta manera al solicitar la sesión"
  initialImpactNotes: string; // Cómo impactó en su vida desde que solicitó la sesión
  activeEnneatypeWound: string; // Herida raíz de eneatipo predominante que tomaba el control
  dominantLimitingBelief: string; // Creencia limitante raíz asociada a este tema puntual
  initialVitalEnergy: number; // 1 - 10
  initialEmotion: string; // Emoción con la que llegó

  // 2. Lo que descubriste vos mismo/a durante la sesión (Quiebre / Espejo)
  selfDiscovery: string; // "En esta sesión lo que descubriste vos mismo/a es tal cosa"
  breakthroughSomaticMoment: string; // Momento de insight, revelación y cambio somático
  transformationDuringSession: string; // "Cómo fue el cambio que realizó durante la sesión de transformación"

  // 3. Seteo del Mindset & Claves a tener en cuenta de ahora en más
  mindsetDirectives: string[]; // Qué tiene que tener en cuenta, setear el mindset en ese tema
  newEmpoweredDecisionRule: string; // Nueva regla de oro para decidir en este tema particular
  concreteActionAnchor: string; // Anclaje neuroplástico / tarea de integración para los próximos 7 días
  finalVitalEnergy: number; // 1 - 10
  finalEmotion: string; // Emoción de cierre (ej. Claridad Serena, Alivio Profundo)

  // Diagnóstico rápido del tema
  diagnosticSnapshot?: {
    enneatype: number;
    areaKey: LifeAreaKey;
    beforeSatisfaction: number;
    afterClarity: number;
  };

  coachNotesPrivate?: string;
  completedAt: string;
}

export type ProgramType = 'sesion_unica_75' | 'programa_6' | 'programa_10';

export interface ClientRecord {
  id: string; // e.g. "CL-2026-001"
  anonymousCode: string; // for public display, e.g. "CL-01"
  clientName: string; // PRIVATE: only seen in coach private dashboard
  contactEmail: string; // PRIVATE
  contactPhone: string; // PRIVATE
  consultationReason?: string; // Motivo de consulta introducido al alta
  programType?: ProgramType;
  totalSessionsPlanned: 1 | 6 | 10;
  startDate: string;
  status: 'active' | 'completed' | 'on_hold';
  isPubliclyAggregated: boolean; // Coach control: true = enters public landing metrics
  isDataPurged?: boolean; // Privacy & data minimization: sensitive clinical notes deleted, retaining only contact & conflict area
  purgedAt?: string;
  retainedConflictArea?: LifeAreaKey; // Preserved conflict area (Area de vida en conflicto)
  baseline: InitialBaseline;
  sessions: SessionRecord[];
  finalEvaluation?: FinalEvaluation;
  transformationalSession?: TransformationalSingleSessionData;
  createdAt: string;
  updatedAt: string;
}

export interface PublicAggregatedMetrics {
  totalClientsEvaluated: number;
  totalActiveSessionsCount: number;
  averageVitalEnergyStart: number;
  averageVitalEnergyCurrent: number;
  vitalEnergyImprovementPercentage: number;
  areaImprovements: {
    areaKey: LifeAreaKey;
    label: string;
    startAvg: number;
    currentAvg: number;
    improvementPercent: number;
  }[];
  beliefsEvolution: {
    limitingStartAvg: number;
    limitingCurrentAvg: number;
    empoweredStartAvg: number;
    empoweredCurrentAvg: number;
  };
  emotionDistribution: {
    emotion: string;
    count: number;
    percentage: number;
  }[];
  anonymousCaseStudies: {
    code: string;
    sessionsCount: number;
    enneatype: number;
    initialDrainArea: string;
    vitalEnergyStart: number;
    vitalEnergyCurrent: number;
    highestImprovementArea: string;
    status: string;
  }[];
}
