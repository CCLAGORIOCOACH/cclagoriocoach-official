import { ClientRecord, PublicAggregatedMetrics, LIFE_AREAS } from '../types/coaching';

export const INITIAL_MOCK_CLIENTS: ClientRecord[] = [
  {
    id: 'CL-2026-000',
    anonymousCode: 'CL-T01',
    clientName: 'Mariana R. (Confidencial)',
    contactEmail: 'mariana.r@privado.com',
    contactPhone: '+54 9 11 9882-3341',
    programType: 'sesion_unica_75',
    totalSessionsPlanned: 1,
    startDate: '2026-10-02',
    status: 'completed',
    isPubliclyAggregated: true,
    baseline: {
      enneatype: 2,
      enneatypeWing: 'Ala 3 (Ayudadora Exitosa)',
      dominantDrainArea: 'trabajo',
      isWorkAlignedWithVocation: 'parcial',
      workVocationNotes: 'Socia fundadora de agencia. Lleva 2 años cargando con la operatividad de sus socios sin atreverse a exigir reparto equitativo de carga.',
      lifeWheel: {
        cuerpo_mente: 4.0,
        pareja: 6.0,
        familia: 5.5,
        amigos: 5.0,
        vocacion: 3.5,
        trabajo: 3.5,
                finanzas: 6.0,
        ocio: 2.5,
      },
      beliefs: {
        cuerpo_mente: {
          limitingPercentage: 70,
          empoweredPercentage: 30,
          limitingBeliefSnippet: 'Si me duele el cuello y la mandíbula es porque tengo que aguantar más.',
          empoweredBeliefSnippet: 'El síntoma en mi mandíbula es un semáforo biológico que me pide límites firmes.',
        },
        pareja: {
          limitingPercentage: 40,
          empoweredPercentage: 60,
          limitingBeliefSnippet: 'Tengo que cuidar el clima para no generar asperezas.',
          empoweredBeliefSnippet: 'Puedo expresar mi desacuerdo sin perder el amor.',
        },
        familia: {
          limitingPercentage: 50,
          empoweredPercentage: 50,
          limitingBeliefSnippet: 'Soy la que siempre resuelve los problemas familiares.',
          empoweredBeliefSnippet: 'Cada integrante es responsable de su propio destino.',
        },
        amigos: {
          limitingPercentage: 45,
          empoweredPercentage: 55,
          limitingBeliefSnippet: 'No los molesto con mis angustias de trabajo.',
          empoweredBeliefSnippet: 'Compartirme en vulnerabilidad nutre mi sistema nervioso.',
        },
        vocacion: {
          limitingPercentage: 80,
          empoweredPercentage: 20,
          limitingBeliefSnippet: 'Si digo que no o pongo límites duros, me dejarán sola y todo se vendrá abajo.',
          empoweredBeliefSnippet: 'Mis límites claros protegen mi paz interior y aumentan el respeto en mis vínculos.',
        },
        trabajo: {
          limitingPercentage: 80,
          empoweredPercentage: 20,
          limitingBeliefSnippet: 'Si digo que no o pongo límites duros, me dejarán sola y todo se vendrá abajo.',
          empoweredBeliefSnippet: 'Mis límites claros protegen mi paz interior y aumentan el respeto en mis vínculos.',
        },
        finanzas: {
          limitingPercentage: 55,
          empoweredPercentage: 45,
          limitingBeliefSnippet: 'Pedir el dinero que me corresponde parece codicia.',
          empoweredBeliefSnippet: 'Cobrar y exigir mi parte justa es un acto de soberanía ética.',
        },
        ocio: {
          limitingPercentage: 75,
          empoweredPercentage: 25,
          limitingBeliefSnippet: 'Descansar cuando otros tienen problemas me hace sentir culpable.',
          empoweredBeliefSnippet: 'La pausa lúcida protege mi neuroplasticidad y mi bienestar integral.',
        },
      },
      childhoodStimuli: [
        {
          figure: 'madre',
          figureLabel: 'Madre sobrecargada',
          words: ['Exigente', 'Amorosa', 'Sobrecargada'],
          notes: '"Sé una nena buena y no des más trabajo del que ya hay". Respuesta somática: apretarse hacia adentro, volverse hiper-útil y servicial para no ser una molestia.',
        },
      ],
      initialVitalDecisions: {
        nutrition: 5,
        exercise: 4,
        rest: 3,
        overallDecisionsQuality: 4,
        notes: 'Dormía 4 horas despertando con bruxismo severo y contractura en trapecios.',
      },
      initialPredominantEmotion: 'Angustia y sobrecarga por complacencia',
      hardestEmotionToManage: 'Culpa al poner un límite',
      generalObservations: 'Cliente con proceso terapéutico previo. Necesitaba un quiebre vivencial y reconfiguración somática en 75 minutos para destrabar un límite vincular crucial que la venía enfermando.',
    },
    sessions: [],
    transformationalSession: {
      specificTopic: 'Incapacidad de poner límites a mis socios de negocio por terror a ser rechazada y vista como egoísta (Quiebre para la asamblea de directorio).',
      backgroundProcessSummary: 'Viene de 2 años de terapia individual donde comprende intelectualmente su patrón pero en el cuerpo seguía congelándose ante la confrontación.',
      sessionDurationMinutes: 75,
      date: '2026-10-02',
      howClientDecidedInitially: 'Decidías desde la herida del Eneatipo 2: sobre-asumiendo responsabilidades ajenas para comprar aprobación y evitar el conflicto a cualquier costo. Al solicitar la sesión, estabas asumiendo el 80% de la carga de trabajo de la sociedad cobrando lo mismo que socios inactivos.',
      initialImpactNotes: 'Desde que solicitaste la sesión venías con 3 semanas de insomnio a las 3:00 AM, bruxismo grado 2 y taquicardia anticipatoria ante cada llamada del socio mayoritario.',
      activeEnneatypeWound: 'Eneatipo 2 · Herida de No Ser Amada / Rechazada si pone límites y deja de ser la salvadora complaciente.',
      dominantLimitingBelief: '"Si reclamo lo que me corresponde y me pongo firme, el vínculo se destruye y soy una mala persona."',
      initialVitalEnergy: 3.8,
      initialEmotion: 'Angustia opresiva en el pecho y culpa paralizante',
      selfDiscovery: 'En esta sesión descubriste vos misma que no estabas protegiendo a tu empresa ni a tus socios: estabas anestesiando el terror infantil a que te dejen de querer. Al darte cuenta de que tu auto-sacrificio no generaba gratitud sino abuso, tu cuerpo soltó la respiración superficial y sentiste por primera vez un calor de arraigo visceral en el bajo vientre.',
      breakthroughSomaticMoment: 'Minuto 42 de la sesión de espejo: Al confrontar la frase "¿Quién se muere si decís que NO?", pasaste de la lágrima de víctima a una carcajada de lucidez rotunda, relajando hombros y abriendo la mandíbula con un suspiro profundo.',
      transformationDuringSession: 'Entraste con hombros encogidos, respiración clavicular corta y voz quebradiza (energía vital 3.8/10). Saliste erguida, con mirada firme, pulsaciones estabilizadas y un libreto quirúrgico de 3 puntos claros para plantarte en la asamblea sin pedir disculpas por existir (energía vital 8.5/10).',
      mindsetDirectives: [
        '1. Regla de Oro Decisional: "Mi dignidad y mi descanso no se negocian para sostener la comodidad ajena."',
        '2. Chequeo Somático previo a cada acuerdo: Si siento mandíbula apretada o nudo en la garganta, la respuesta es NO hasta recalcular.',
        '3. Desarme de la Culpa: La culpa no es una señal de que hice algo malo; es la resistencia de mi viejo patrón de complacencia ante un límite sano.',
      ],
      newEmpoweredDecisionRule: '"Pongo límites con serenidad implacable: la sociedad solo continúa con contratos claros y métricas equitativas. Si no aceptan, elijo mi libertad financiera y paz biológica."',
      concreteActionAnchor: 'Antes de entrar a la reunión de directorio: 3 minutos de exhalación doble prolongada, pies descalzos apoyados firmes, y leer en voz alta la directiva en su teléfono antes de hablar.',
      finalVitalEnergy: 8.5,
      finalEmotion: 'Claridad Serena y Firmeza Soberana',
      diagnosticSnapshot: {
        enneatype: 2,
        areaKey: 'trabajo',
        beforeSatisfaction: 3.5,
        afterClarity: 9.0,
      },
      coachNotesPrivate: 'Excelente capacidad de introspección empírica. La intervención somática de espejo funcionó al 100%. Reportó a las 48 hs que presentó su pliego de condiciones en la asamblea con serenidad total y los socios aceptaron la reestructuración sin objeciones.',
      completedAt: '2026-10-02T19:15:00Z',
    },
    createdAt: '2026-10-02T18:00:00Z',
    updatedAt: '2026-10-02T19:30:00Z',
  },
  {
    id: 'CL-2026-001',
    anonymousCode: 'CL-01',
    clientName: 'Valeria M. (Confidencial)',
    contactEmail: 'valeria@privado.com',
    contactPhone: '+54 9 11 4455-6677',
    totalSessionsPlanned: 10,
    startDate: '2026-08-10',
    status: 'completed',
    isPubliclyAggregated: true,
    baseline: {
      enneatype: 3,
      enneatypeWing: 'Ala 2 (Triunfadora Servicial)',
      dominantDrainArea: 'trabajo',
      isWorkAlignedWithVocation: 'no',
      workVocationNotes: 'Directora de operaciones corporativa. Siente un vacío existencial; su trabajo le exige 14 horas al día y no responde a su vocación pedagógica.',
      lifeWheel: {
        cuerpo_mente: 3.5,
        pareja: 5.0,
        familia: 4.5,
        amigos: 4.0,
        vocacion: 2.8,
        trabajo: 2.8,
                finanzas: 7.5,
        ocio: 2.0,
      },
      beliefs: {
        cuerpo_mente: {
          limitingPercentage: 75,
          empoweredPercentage: 25,
          limitingBeliefSnippet: 'Si me detengo a descansar, soy débil y pierdo mi valor.',
          empoweredBeliefSnippet: 'El descanso estratégico es el combustible biológico de mi salud y bienestar integral.',
        },
        pareja: {
          limitingPercentage: 55,
          empoweredPercentage: 45,
          limitingBeliefSnippet: 'Debo resolverlo todo yo sola para que me valoren.',
          empoweredBeliefSnippet: 'La intimidad real nace de mostrarme vulnerable sin producir.',
        },
        familia: {
          limitingPercentage: 60,
          empoweredPercentage: 40,
          limitingBeliefSnippet: 'Tengo que ser el orgullo incansable de la familia.',
          empoweredBeliefSnippet: 'Mi valor es intrínseco, no depende de mis títulos ni logros.',
        },
        amigos: {
          limitingPercentage: 65,
          empoweredPercentage: 35,
          limitingBeliefSnippet: 'No tengo tiempo para charlas banales.',
          empoweredBeliefSnippet: 'La risa y los vínculos seguros reducen mi cortisol y amplían mi visión.',
        },
        vocacion: {
          limitingPercentage: 85,
          empoweredPercentage: 15,
          limitingBeliefSnippet: 'Si no me mantengo en constante actividad y éxito, seré un fracaso total.',
          empoweredBeliefSnippet: 'Mi vitalidad y creatividad florecen cuando sirvo a mi vocación genuina.',
        },
        trabajo: {
          limitingPercentage: 85,
          empoweredPercentage: 15,
          limitingBeliefSnippet: 'Si no me mantengo en constante actividad y éxito, seré un fracaso total.',
          empoweredBeliefSnippet: 'Mi vitalidad y creatividad florecen cuando sirvo a mi vocación genuina.',
        },
        finanzas: {
          limitingPercentage: 40,
          empoweredPercentage: 60,
          limitingBeliefSnippet: 'Solo el dinero abundante me garantiza no estar a merced de nadie.',
          empoweredBeliefSnippet: 'Construyo riqueza desde la serenidad y la soberanía interior.',
        },
        ocio: {
          limitingPercentage: 90,
          empoweredPercentage: 10,
          limitingBeliefSnippet: 'El ocio es una pérdida de tiempo culpable.',
          empoweredBeliefSnippet: 'El juego y la pausa regeneran mi neuroplasticidad y creatividad.',
        },
      },
      childhoodStimuli: [
        {
          figure: 'madre',
          figureLabel: 'Madre',
          words: ['Exigente', 'Impecable', 'Distante'],
          notes: 'Madre que solo felicitaba si obtenía el promedio más alto.',
        },
        {
          figure: 'padre',
          figureLabel: 'Padre',
          words: ['Trabajador', 'Severo', 'Protector'],
          notes: 'Trabajaba sin descanso; el mensaje implícito era: no pares nunca.',
        },
        {
          figure: 'hermanos',
          figureLabel: 'Hermano mayor',
          words: ['Rival', 'Rápido', 'Cuestionador'],
          notes: 'Competencia constante por la aprobación paterna.',
        },
      ],
      initialVitalDecisions: {
        nutrition: 3.5,
        exercise: 2.0,
        rest: 3.0,
        notes: 'Comía de pie entre llamadas, café en exceso, insomnio de mantenimiento.',
      },
      initialPredominantEmotion: 'Ansiedad por autoexigencia constante',
      generalObservations: 'Cuadro de agotamiento suprarrenal con alta somatización digestiva y contracturas cervicales.',
    },
    sessions: [
      {
        id: 's-1',
        sessionNumber: 1,
        date: '2026-08-17',
        vitalDecisions: {
          nutrition: 4.5,
          exercise: 3.0,
          rest: 4.0,
          vitalEnergyScore: 3.8,
          decisionNotes: 'Introducción de hidratación matutina antes del café y corte de pantallas a las 23:00.',
        },
        emotionalManagement: {
          predominantEmotion: 'Ansiedad',
          intensity: 8,
          neuroplasticityToolApplied: 'Pausa de interocepción de 3 minutos + respiración diafragmática 4-7-8 al sentir urgencia.',
          interferedWithDecisions: 'parcial',
          emotionalNotes: 'Sintió culpa al dejar correos sin responder a la noche, pero logró sostener la pausa.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 4.0,
          pareja: 5.0,
          familia: 4.5,
          amigos: 4.0,
          vocacion: 3.0,
          trabajo: 3.0,
                    finanzas: 7.5,
          ocio: 2.5,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 35,
          pareja: 45,
          familia: 42,
          amigos: 38,
          vocacion: 20,
          trabajo: 20,
                    finanzas: 60,
          ocio: 20,
        },
        coachObservations: 'Valeria empezó a registrar el impulso compulsivo de responder inmediatamente para calmar su sistema nervioso.',
        actionCommitment: 'Caminar 20 minutos sin podcast ni teléfono los martes y jueves.',
      },
      {
        id: 's-2',
        sessionNumber: 3,
        date: '2026-09-02',
        vitalDecisions: {
          nutrition: 6.0,
          exercise: 5.5,
          rest: 6.0,
          vitalEnergyScore: 5.8,
          decisionNotes: 'Almuerzos sentada sin laptop. Incorporó caminata matutina con luz solar.',
        },
        emotionalManagement: {
          predominantEmotion: 'Frustración',
          intensity: 6,
          neuroplasticityToolApplied: 'Reencuadre cognitivo: pasar de "tengo que hacer" a "elijo enfocar mi energía en".',
          interferedWithDecisions: 'no',
          emotionalNotes: 'Ante un conflicto en el directorio, frenó el impulso reactivo y respiró antes de contestar.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 5.5,
          pareja: 5.8,
          familia: 5.0,
          amigos: 5.0,
          vocacion: 4.5,
          trabajo: 4.5,
                    finanzas: 7.5,
          ocio: 4.0,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 55,
          pareja: 55,
          familia: 50,
          amigos: 50,
          vocacion: 40,
          trabajo: 40,
                    finanzas: 65,
          ocio: 45,
        },
        coachObservations: 'Gran salto en el eje cuerpo-mente. Desapareció el reflujo gástrico diario.',
        actionCommitment: 'Establecer agenda de bloque inviolable para ocio personal de 2 horas el fin de semana.',
      },
      {
        id: 's-3',
        sessionNumber: 6,
        date: '2026-09-23',
        vitalDecisions: {
          nutrition: 7.5,
          exercise: 7.0,
          rest: 7.5,
          vitalEnergyScore: 7.3,
          decisionNotes: 'Rutina de sueño regular de 7.5 horas. Fuerza 3 veces por semana con constancia.',
        },
        emotionalManagement: {
          predominantEmotion: 'Calma / Confianza',
          intensity: 4,
          neuroplasticityToolApplied: 'Etiquetado emocional somático y mapa de opciones conscientes.',
          interferedWithDecisions: 'no',
          emotionalNotes: 'Pudo negociar la delegación de 3 proyectos que drenaban su foco sin sentir que perdía control.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 7.5,
          pareja: 7.0,
          familia: 6.5,
          amigos: 6.5,
          vocacion: 6.8,
          trabajo: 6.8,
                    finanzas: 8.0,
          ocio: 6.5,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 75,
          pareja: 70,
          familia: 65,
          amigos: 65,
          vocacion: 65,
          trabajo: 65,
                    finanzas: 75,
          ocio: 70,
        },
        coachObservations: 'Empieza a planificar su proyecto vocacional de mentoring y asesoría estratégica propia.',
        actionCommitment: 'Dedicar 1 sesión semanal a estructurar su nuevo modelo vocacional alineado.',
      },
      {
        id: 's-4',
        sessionNumber: 10,
        date: '2026-10-14',
        vitalDecisions: {
          nutrition: 8.5,
          exercise: 8.0,
          rest: 8.5,
          vitalEnergyScore: 8.3,
          decisionNotes: 'Estilo de vida consolidado. Su energía vital se sostiene de forma autónoma sin esfuerzo mental.',
        },
        emotionalManagement: {
          predominantEmotion: 'Entusiasmo sereno',
          intensity: 3,
          neuroplasticityToolApplied: 'Protocolo de anclaje de logros y barrera de prevención de boicot.',
          interferedWithDecisions: 'no',
          emotionalNotes: 'Identifica las señales sutiles de la vieja voz perfeccionista y se ríe amorosamente.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 8.8,
          pareja: 8.2,
          familia: 7.5,
          amigos: 7.8,
          vocacion: 8.5,
          trabajo: 8.5,
                    finanzas: 8.5,
          ocio: 8.0,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 90,
          pareja: 85,
          familia: 80,
          amigos: 80,
          vocacion: 85,
          trabajo: 85,
                    finanzas: 85,
          ocio: 85,
        },
        coachObservations: 'Transformación total de la relación cuerpo-mente y re-alineación vocacional.',
        actionCommitment: 'Mantener protocolo de chequeo semanal de energía vital de 10 minutos.',
      },
    ],
    finalEvaluation: {
      completedAt: '2026-10-15',
      enneatypeFinal: 3,
      lifeWheelFinal: {
        cuerpo_mente: 8.8,
        pareja: 8.2,
        familia: 7.5,
        amigos: 7.8,
        vocacion: 8.5,
        trabajo: 8.5,
                finanzas: 8.5,
        ocio: 8.0,
      },
      empoweredBeliefsFinal: {
        cuerpo_mente: 90,
        pareja: 85,
        familia: 80,
        amigos: 80,
        vocacion: 85,
        trabajo: 85,
                finanzas: 85,
        ocio: 85,
      },
      finalVitalDecisions: {
        nutrition: 8.5,
        exercise: 8.0,
        rest: 8.5,
        vitalEnergyScore: 8.3,
      },
      predominantEmotionConsolidated: 'Serenidad y claridad vocacional',
      keyMilestones: [
        'Aumento del 196% en energía vital (de 2.8 a 8.3).',
        'Transición de trabajo drenante a vocación alineada con plan de negocio propio.',
        'Eliminación de la somatización gástrica y regulación del ciclo circadiano.',
        'Desmantelamiento de la creencia central "si paro, no valgo".',
      ],
      preventiveBoicotProtocol: 'Al notar tensión en cuello o pensamientos de "no llego a todo", activar pausa obligatoria de 10 minutos y registrar en la app AliveGamers.',
      coachSummary: 'El re-mapeo final demuestra que la neuroplasticidad aplicada a las decisiones de alimentación, descanso y ejercicio desarticuló el patrón de sobre-exigencia y autosuficiencia defensiva del Eneatipo 3.',
    },
    createdAt: '2026-08-10T10:00:00Z',
    updatedAt: '2026-10-15T12:00:00Z',
  },
  {
    id: 'CL-2026-002',
    anonymousCode: 'CL-02',
    clientName: 'Rodrigo S. (Confidencial)',
    contactEmail: 'rodrigo@privado.com',
    contactPhone: '+54 9 11 9988-7766',
    totalSessionsPlanned: 6,
    startDate: '2026-09-01',
    status: 'active',
    isPubliclyAggregated: true,
    baseline: {
      enneatype: 1,
      enneatypeWing: 'Ala 9 (Perfeccionista Tranquilo)',
      dominantDrainArea: 'cuerpo_mente',
      isWorkAlignedWithVocation: 'parcial',
      workVocationNotes: 'Arquitecto y socio de estudio. Obsesionado con el detalle técnico, posterga su salud y tiene bruxismo severo.',
      lifeWheel: {
        cuerpo_mente: 2.5,
        pareja: 6.0,
        familia: 5.5,
        amigos: 4.5,
        vocacion: 7.0,
        trabajo: 7.0,
                finanzas: 6.5,
        ocio: 2.5,
      },
      beliefs: {
        cuerpo_mente: {
          limitingPercentage: 80,
          empoweredPercentage: 20,
          limitingBeliefSnippet: 'Si las cosas no son perfectas, no tienen valor.',
          empoweredBeliefSnippet: 'Acepto la imperfección como parte viva de la evolución biológica.',
        },
        pareja: {
          limitingPercentage: 50,
          empoweredPercentage: 50,
          limitingBeliefSnippet: 'Tengo que corregir los errores de los demás.',
          empoweredBeliefSnippet: 'Elijo acompañar y conectar antes que tener la razón.',
        },
        familia: {
          limitingPercentage: 55,
          empoweredPercentage: 45,
          limitingBeliefSnippet: 'La responsabilidad familiar recae únicamente sobre mis hombros.',
          empoweredBeliefSnippet: 'Confío en la capacidad resolutiva de mi clan.',
        },
        amigos: {
          limitingPercentage: 60,
          empoweredPercentage: 40,
          limitingBeliefSnippet: 'No puedo relajarme del todo en reuniones sociales.',
          empoweredBeliefSnippet: 'La ligereza y el humor son medicina para mi sistema nervioso.',
        },
        vocacion: {
          limitingPercentage: 45,
          empoweredPercentage: 55,
          limitingBeliefSnippet: 'Si no superviso cada línea del plano, habrá una catástrofe.',
          empoweredBeliefSnippet: 'Empodero a mi equipo y cuido mi ancho de banda cognitivo.',
        },
        trabajo: {
          limitingPercentage: 45,
          empoweredPercentage: 55,
          limitingBeliefSnippet: 'Si no superviso cada línea del plano, habrá una catástrofe.',
          empoweredBeliefSnippet: 'Empodero a mi equipo y cuido mi ancho de banda cognitivo.',
        },
        finanzas: {
          limitingPercentage: 40,
          empoweredPercentage: 60,
          limitingBeliefSnippet: 'El dinero debe cuidarse con rigidez extrema.',
          empoweredBeliefSnippet: 'Administro con prudencia y disfruto los frutos de mi trabajo.',
        },
        ocio: {
          limitingPercentage: 85,
          empoweredPercentage: 15,
          limitingBeliefSnippet: 'Descansar antes de terminar todas las tareas es pecado.',
          empoweredBeliefSnippet: 'El descanso no es un premio, es una necesidad fisiológica.',
        },
      },
      childhoodStimuli: [
        {
          figure: 'padre',
          figureLabel: 'Padre',
          words: ['Intransigente', 'Formal', 'Recto'],
          notes: 'Cualquier error de conducta recibía castigo inmediato.',
        },
        {
          figure: 'madre',
          figureLabel: 'Madre',
          words: ['Sumisa', 'Preocupada', 'Silenciosa'],
          notes: 'Madre que evitaba contradecir al padre.',
        },
      ],
      initialVitalDecisions: {
        nutrition: 4.0,
        exercise: 2.5,
        rest: 3.0,
        notes: 'Comidas a destiempo, nula actividad física, dolores lumbares intensos.',
      },
      initialPredominantEmotion: 'Frustración / Ira contenida',
      generalObservations: 'Mucha tensión mandibular. Rigidez postural.',
    },
    sessions: [
      {
        id: 's-201',
        sessionNumber: 1,
        date: '2026-09-08',
        vitalDecisions: {
          nutrition: 5.0,
          exercise: 4.0,
          rest: 4.5,
          vitalEnergyScore: 4.5,
          decisionNotes: 'Estiramientos suaves de cuello y espalda 10 min por la mañana.',
        },
        emotionalManagement: {
          predominantEmotion: 'Frustración',
          intensity: 7,
          neuroplasticityToolApplied: 'Técnica de respiración de suspiro fisiológico doble + relajar mandíbula conscientemente.',
          interferedWithDecisions: 'parcial',
          emotionalNotes: 'Notó cuántas veces al día aprieta los dientes por pequeños desvíos de otros.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 3.5,
          pareja: 6.0,
          familia: 5.5,
          amigos: 4.8,
          vocacion: 7.0,
          trabajo: 7.0,
                    finanzas: 6.5,
          ocio: 3.2,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 35,
          pareja: 55,
          familia: 48,
          amigos: 45,
          vocacion: 58,
          trabajo: 58,
                    finanzas: 62,
          ocio: 28,
        },
        coachObservations: 'Reconoció el coste biológico de querer tener todo bajo control milimétrico.',
        actionCommitment: 'Dejar pasar deliberadamente un detalle no crítico en el estudio cada día.',
      },
      {
        id: 's-202',
        sessionNumber: 3,
        date: '2026-09-22',
        vitalDecisions: {
          nutrition: 6.5,
          exercise: 6.0,
          rest: 6.5,
          vitalEnergyScore: 6.3,
          decisionNotes: 'Paseos diarios de 30 min, cena liviana 2 horas antes de dormir.',
        },
        emotionalManagement: {
          predominantEmotion: 'Calma naciente',
          intensity: 5,
          neuroplasticityToolApplied: 'Desafío cognitivo: "¿Es esto vital o es mi juez interno exigiendo perfección?"',
          interferedWithDecisions: 'no',
          emotionalNotes: 'Pudo salir un viernes del estudio a las 18:00 sin sentimiento de culpa.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 5.8,
          pareja: 6.8,
          familia: 6.0,
          amigos: 5.5,
          vocacion: 7.5,
          trabajo: 7.5,
                    finanzas: 6.8,
          ocio: 5.0,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 55,
          pareja: 65,
          familia: 58,
          amigos: 55,
          vocacion: 68,
          trabajo: 68,
                    finanzas: 65,
          ocio: 48,
        },
        coachObservations: 'Disminución notable del bruxismo. Mejor humor y presencia con su pareja.',
        actionCommitment: 'Integrar 1 actividad lúdica no estructurada el fin de semana.',
      },
    ],
    createdAt: '2026-09-01T14:00:00Z',
    updatedAt: '2026-09-22T16:00:00Z',
  },
  {
    id: 'CL-2026-003',
    anonymousCode: 'CL-03',
    clientName: 'Carla T. (Confidencial)',
    contactEmail: 'carla@privado.com',
    contactPhone: '+54 9 11 3322-1100',
    totalSessionsPlanned: 6,
    startDate: '2026-07-15',
    status: 'completed',
    isPubliclyAggregated: true,
    baseline: {
      enneatype: 6,
      enneatypeWing: 'Ala 7 (Leal con búsqueda de escape)',
      dominantDrainArea: 'finanzas',
      isWorkAlignedWithVocation: 'si',
      workVocationNotes: 'Diseñadora independiente con excelente talento, pero vive en terror permanente de quedarse sin dinero.',
      lifeWheel: {
        cuerpo_mente: 4.0,
        pareja: 4.5,
        familia: 5.0,
        amigos: 6.0,
        vocacion: 7.5,
        trabajo: 7.5,
                finanzas: 2.5,
        ocio: 3.0,
      },
      beliefs: {
        cuerpo_mente: {
          limitingPercentage: 65,
          empoweredPercentage: 35,
          limitingBeliefSnippet: 'Mi cuerpo en cualquier momento fallará y colapsaré.',
          empoweredBeliefSnippet: 'Mi organismo es sabio, resiliente y se autorregula a diario.',
        },
        pareja: {
          limitingPercentage: 60,
          empoweredPercentage: 40,
          limitingBeliefSnippet: 'Si me muestro independiente, mi pareja se alejará.',
          empoweredBeliefSnippet: 'El amor sano florece desde la seguridad personal mutua.',
        },
        familia: {
          limitingPercentage: 50,
          empoweredPercentage: 50,
          limitingBeliefSnippet: 'Debo estar alerta a los problemas de mis padres.',
          empoweredBeliefSnippet: 'Acompaño con amor respetando sus propios procesos.',
        },
        amigos: {
          limitingPercentage: 40,
          empoweredPercentage: 60,
          limitingBeliefSnippet: 'Necesito consultar todas mis decisiones con amigos.',
          empoweredBeliefSnippet: 'Tengo mi propio criterio interno para guiarme.',
        },
        vocacion: {
          limitingPercentage: 50,
          empoweredPercentage: 50,
          limitingBeliefSnippet: 'Mis clientes me abandonarán si cobro tarifas justas.',
          empoweredBeliefSnippet: 'Mi valor profesional resuelve problemas reales de alto impacto.',
        },
        trabajo: {
          limitingPercentage: 50,
          empoweredPercentage: 50,
          limitingBeliefSnippet: 'Mis clientes me abandonarán si cobro tarifas justas.',
          empoweredBeliefSnippet: 'Mi valor profesional resuelve problemas reales de alto impacto.',
        },
        finanzas: {
          limitingPercentage: 85,
          empoweredPercentage: 15,
          limitingBeliefSnippet: 'El dinero se esfuma y siempre viene una catástrofe.',
          empoweredBeliefSnippet: 'Gestiono mis finanzas con estructura, previsión y gratitud.',
        },
        ocio: {
          limitingPercentage: 70,
          empoweredPercentage: 30,
          limitingBeliefSnippet: 'Gastar en mí misma es irresponsable.',
          empoweredBeliefSnippet: 'Invertir en mi bienestar multiplica mi creatividad.',
        },
      },
      childhoodStimuli: [
        {
          figure: 'madre',
          figureLabel: 'Madre',
          words: ['Miedosa', 'Inestable', 'Afectuosa'],
          notes: 'Vivía pronosticando accidentes y crisis económicas.',
        },
        {
          figure: 'padre',
          figureLabel: 'Padre',
          words: ['Ausente', 'Negativo', 'Bohemio'],
          notes: 'Problemas crónicos de quiebras financieras familiares.',
        },
      ],
      initialVitalDecisions: {
        nutrition: 4.5,
        exercise: 3.5,
        rest: 3.0,
        notes: 'Despertares nocturnos con taquicardia por pensamientos financieros intrusivos.',
      },
      initialPredominantEmotion: 'Miedo / Alerta ansiosa',
      generalObservations: 'Amígdala hiperactivada. Dependencia de validación externa.',
    },
    sessions: [
      {
        id: 's-301',
        sessionNumber: 1,
        date: '2026-07-22',
        vitalDecisions: {
          nutrition: 5.5,
          exercise: 4.5,
          rest: 4.5,
          vitalEnergyScore: 4.8,
          decisionNotes: 'Estableció presupuesto semanal claro para apagar la incertidumbre mental.',
        },
        emotionalManagement: {
          predominantEmotion: 'Miedo',
          intensity: 8,
          neuroplasticityToolApplied: 'Escaneo corporal y anclaje sensorial "Aquí y ahora estoy a salvo".',
          interferedWithDecisions: 'parcial',
          emotionalNotes: 'Comenzó a usar AliveGamers al sentir el impulso de hiper-trabajar por pánico.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 5.0,
          pareja: 5.0,
          familia: 5.2,
          amigos: 6.2,
          vocacion: 7.8,
          trabajo: 7.8,
                    finanzas: 4.0,
          ocio: 3.8,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 45,
          pareja: 48,
          familia: 52,
          amigos: 65,
          vocacion: 58,
          trabajo: 58,
                    finanzas: 35,
          ocio: 40,
        },
        coachObservations: 'La objetivación numérica de sus finanzas calmó la fantasía catastrófica.',
        actionCommitment: 'Mirar el extracto bancario solo una vez a la semana en horario diurno.',
      },
      {
        id: 's-302',
        sessionNumber: 6,
        date: '2026-08-26',
        vitalDecisions: {
          nutrition: 8.0,
          exercise: 7.5,
          rest: 8.0,
          vitalEnergyScore: 7.8,
          decisionNotes: 'Dormir continuo 8 horas. Retomó pilates y alimentación ordenada.',
        },
        emotionalManagement: {
          predominantEmotion: 'Seguridad / Paz',
          intensity: 3,
          neuroplasticityToolApplied: 'Foco en soberanía decisional y registro de evidencias empíricas.',
          interferedWithDecisions: 'no',
          emotionalNotes: 'Aumentó sus honorarios un 40% con éxito total de aceptación de clientes.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 8.0,
          pareja: 7.5,
          familia: 6.8,
          amigos: 7.8,
          vocacion: 8.8,
          trabajo: 8.8,
                    finanzas: 7.8,
          ocio: 7.2,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 80,
          pareja: 78,
          familia: 75,
          amigos: 82,
          vocacion: 85,
          trabajo: 85,
                    finanzas: 80,
          ocio: 78,
        },
        coachObservations: 'Carla recuperó su centro de autoridad interior. Final del programa con honores.',
        actionCommitment: 'Apertura de fondo de reserva de tranquilidad para 6 meses.',
      },
    ],
    finalEvaluation: {
      completedAt: '2026-08-28',
      enneatypeFinal: 6,
      lifeWheelFinal: {
        cuerpo_mente: 8.0,
        pareja: 7.5,
        familia: 6.8,
        amigos: 7.8,
        vocacion: 8.8,
        trabajo: 8.8,
                finanzas: 7.8,
        ocio: 7.2,
      },
      empoweredBeliefsFinal: {
        cuerpo_mente: 80,
        pareja: 78,
        familia: 75,
        amigos: 82,
        vocacion: 85,
        trabajo: 85,
                finanzas: 80,
        ocio: 78,
      },
      finalVitalDecisions: {
        nutrition: 8.0,
        exercise: 7.5,
        rest: 8.0,
        vitalEnergyScore: 7.8,
      },
      predominantEmotionConsolidated: 'Confianza y serenidad financiera',
      keyMilestones: [
        'Aumento del 111% en energía vital (de 3.7 a 7.8).',
        'El área finanzas pasó de 2.5 a 7.8 en la Rueda de la Vida (+212%).',
        'Incremento de honorarios del 40% sin pérdida de clientes.',
        'Sueño reparador sin taquicardia.',
      ],
      preventiveBoicotProtocol: 'Si reaparece la duda en bucle, verificar la lista de hechos objetivos y no tomar decisiones financieras en estado de cansancio.',
      coachSummary: 'El trabajo de neuroplasticidad permitió calmar la amígdala y habilitar la autorregulación prefrontal y la claridad lúcida.',
    },
    createdAt: '2026-07-15T09:00:00Z',
    updatedAt: '2026-08-28T18:00:00Z',
  },
  {
    id: 'CL-2026-004',
    anonymousCode: 'CL-04',
    clientName: 'Gonzalo P. (Confidencial)',
    contactEmail: 'gonzalo@privado.com',
    contactPhone: '+54 9 11 5566-7788',
    totalSessionsPlanned: 10,
    startDate: '2026-09-12',
    status: 'active',
    isPubliclyAggregated: true,
    baseline: {
      enneatype: 9,
      enneatypeWing: 'Ala 8 (Pacificador con fuerza soterrada)',
      dominantDrainArea: 'ocio',
      isWorkAlignedWithVocation: 'parcial',
      workVocationNotes: 'Gerente comercial con dificultad para decir que no. Llega al fin de semana sin energía para nada personal.',
      lifeWheel: {
        cuerpo_mente: 3.8,
        pareja: 6.2,
        familia: 6.0,
        amigos: 5.5,
        vocacion: 5.0,
        trabajo: 5.0,
                finanzas: 6.8,
        ocio: 2.2,
      },
      beliefs: {
        cuerpo_mente: {
          limitingPercentage: 70,
          empoweredPercentage: 30,
          limitingBeliefSnippet: 'No tengo energía para entrenar; ya es tarde para cambiar mi cuerpo.',
          empoweredBeliefSnippet: 'Cada micro-movimiento oxigena mi cerebro y despierta mi vitalidad.',
        },
        pareja: {
          limitingPercentage: 50,
          empoweredPercentage: 50,
          limitingBeliefSnippet: 'Es mejor ceder en todo para no generar discusiones.',
          empoweredBeliefSnippet: 'Decir lo que necesito fortalece el vínculo verdadero.',
        },
        familia: {
          limitingPercentage: 55,
          empoweredPercentage: 45,
          limitingBeliefSnippet: 'Debo complacer las expectativas familiares para estar en paz.',
          empoweredBeliefSnippet: 'Mi paz empieza cuando respeto mis propios límites.',
        },
        amigos: {
          limitingPercentage: 45,
          empoweredPercentage: 55,
          limitingBeliefSnippet: 'Me adapto a lo que el grupo elija, me da igual.',
          empoweredBeliefSnippet: 'Comparto mis preferencias y enriquezco los encuentros.',
        },
        vocacion: {
          limitingPercentage: 60,
          empoweredPercentage: 40,
          limitingBeliefSnippet: 'Aceptar tareas extras me evita conflictos con mis superiores.',
          empoweredBeliefSnippet: 'Establecer prioridades claras me hace más respetado y eficiente.',
        },
        trabajo: {
          limitingPercentage: 60,
          empoweredPercentage: 40,
          limitingBeliefSnippet: 'Aceptar tareas extras me evita conflictos con mis superiores.',
          empoweredBeliefSnippet: 'Establecer prioridades claras me hace más respetado y eficiente.',
        },
        finanzas: {
          limitingPercentage: 45,
          empoweredPercentage: 55,
          limitingBeliefSnippet: 'Mientras alcance para el día a día, prefiero no complicarme.',
          empoweredBeliefSnippet: 'Planifico con visión activa para crear abundancia y libertad.',
        },
        ocio: {
          limitingPercentage: 80,
          empoweredPercentage: 20,
          limitingBeliefSnippet: 'Mi tiempo libre es para dormir o mirar pantallas sin pensar.',
          empoweredBeliefSnippet: 'El ocio consciente y activo me recarga el alma y el entusiasmo.',
        },
      },
      childhoodStimuli: [
        {
          figure: 'padre',
          figureLabel: 'Padre',
          words: ['Enojón', 'Distante', 'Impredecible'],
          notes: 'Para no despertar la ira del padre, aprendió a hacerse invisible.',
        },
        {
          figure: 'madre',
          figureLabel: 'Madre',
          words: ['Sacrificada', 'Sobreprotectora', 'Quejosa'],
          notes: 'Madre que transmitía que la vida es dura y hay que resignarse.',
        },
      ],
      initialVitalDecisions: {
        nutrition: 4.2,
        exercise: 2.0,
        rest: 3.5,
        notes: 'Alimentación pesada nocturna, sedentarismo prolongado, despertar con fatiga.',
      },
      initialPredominantEmotion: 'Apatía / Resignación',
      generalObservations: 'Postura colapsada, mirada evasiva ante preguntas sobre deseos propios.',
    },
    sessions: [
      {
        id: 's-401',
        sessionNumber: 1,
        date: '2026-09-19',
        vitalDecisions: {
          nutrition: 5.0,
          exercise: 3.5,
          rest: 4.5,
          vitalEnergyScore: 4.3,
          decisionNotes: 'Poner el despertador a la misma hora y tomar 1 vaso de agua grande antes del café.',
        },
        emotionalManagement: {
          predominantEmotion: 'Apatía',
          intensity: 6,
          neuroplasticityToolApplied: 'Micro-decisión de activación de 5 segundos (Regla de Mel Robbins + interocepción).',
          interferedWithDecisions: 'parcial',
          emotionalNotes: 'Notó el peso de la inercia corporal y cómo su cerebro busca postergar.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 4.2,
          pareja: 6.2,
          familia: 6.0,
          amigos: 5.5,
          vocacion: 5.2,
          trabajo: 5.2,
                    finanzas: 6.8,
          ocio: 2.8,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 38,
          pareja: 52,
          familia: 48,
          amigos: 58,
          vocacion: 45,
          trabajo: 45,
                    finanzas: 58,
          ocio: 28,
        },
        coachObservations: 'Primer paso dado: reconoció que la "paz" que buscaba era en realidad anestesia.',
        actionCommitment: 'Elegir qué cenar y comunicarlo a su pareja en lugar de decir "lo que vos quieras".',
      },
      {
        id: 's-402',
        sessionNumber: 3,
        date: '2026-10-03',
        vitalDecisions: {
          nutrition: 6.2,
          exercise: 5.8,
          rest: 6.0,
          vitalEnergyScore: 6.0,
          decisionNotes: 'Comenzó a entrenar natación 2 veces por semana. Cena más liviana.',
        },
        emotionalManagement: {
          predominantEmotion: 'Entusiasmo incipiente',
          intensity: 5,
          neuroplasticityToolApplied: 'Registro de voz propia: afirmar un deseo personal antes de la jornada.',
          interferedWithDecisions: 'no',
          emotionalNotes: 'Dijo que no a un proyecto no remunerado en el trabajo sin culpa.',
        },
        lifeWheelSnapshot: {
          cuerpo_mente: 5.8,
          pareja: 6.8,
          familia: 6.2,
          amigos: 6.0,
          vocacion: 6.0,
          trabajo: 6.0,
                    finanzas: 7.0,
          ocio: 4.8,
        },
        empoweredBeliefsSnapshot: {
          cuerpo_mente: 55,
          pareja: 60,
          familia: 55,
          amigos: 65,
          vocacion: 58,
          trabajo: 58,
                    finanzas: 65,
          ocio: 50,
        },
        coachObservations: 'Gran cambio en el tono de voz y energía corporal. Está despertando su Eneatipo 8 de integración.',
        actionCommitment: 'Planificar una salida de sábado dedicada 100% a un hobby personal.',
      },
    ],
    createdAt: '2026-09-12T11:00:00Z',
    updatedAt: '2026-10-03T17:00:00Z',
  },
];

export function computeAggregatedMetrics(clients: ClientRecord[]): PublicAggregatedMetrics {
  const aggregatedClients = clients.filter(c => c.isPubliclyAggregated);
  const total = aggregatedClients.length;

  if (total === 0) {
    return {
      totalClientsEvaluated: 0,
      totalActiveSessionsCount: 0,
      averageVitalEnergyStart: 0,
      averageVitalEnergyCurrent: 0,
      vitalEnergyImprovementPercentage: 0,
      areaImprovements: LIFE_AREAS.map(a => ({
        areaKey: a.key,
        label: a.label,
        startAvg: 0,
        currentAvg: 0,
        improvementPercent: 0,
      })),
      beliefsEvolution: {
        limitingStartAvg: 0,
        limitingCurrentAvg: 0,
        empoweredStartAvg: 0,
        empoweredCurrentAvg: 0,
      },
      emotionDistribution: [],
      anonymousCaseStudies: [],
    };
  }

  let totalSessions = 0;
  let startEnergySum = 0;
  let currentEnergySum = 0;

  let limitingStartTotal = 0;
  let limitingCurrentTotal = 0;
  let empoweredStartTotal = 0;
  let empoweredCurrentTotal = 0;

  const areaStartSums: Record<string, number> = {};
  const areaCurrentSums: Record<string, number> = {};
  LIFE_AREAS.forEach(a => {
    areaStartSums[a.key] = 0;
    areaCurrentSums[a.key] = 0;
  });

  const emotionCounts: Record<string, number> = {};

  aggregatedClients.forEach(client => {
    totalSessions += client.sessions.length;

    // Vital energy baseline
    const baseEnergy = (
      client.baseline.initialVitalDecisions.nutrition +
      client.baseline.initialVitalDecisions.exercise +
      client.baseline.initialVitalDecisions.rest
    ) / 3;
    startEnergySum += baseEnergy;

    // Latest energy
    let latestEnergy = baseEnergy;
    if (client.transformationalSession) {
      latestEnergy = client.transformationalSession.finalVitalEnergy;
    } else if (client.finalEvaluation) {
      latestEnergy = client.finalEvaluation.finalVitalDecisions.vitalEnergyScore;
    } else if (client.sessions.length > 0) {
      const lastSession = client.sessions[client.sessions.length - 1];
      latestEnergy = lastSession.vitalDecisions.vitalEnergyScore;
    }
    currentEnergySum += latestEnergy;

    // Areas
    LIFE_AREAS.forEach(a => {
      const startVal = client.baseline.lifeWheel[a.key] || 5;
      areaStartSums[a.key] += startVal;

      let curVal = startVal;
      if (client.transformationalSession && client.transformationalSession.diagnosticSnapshot && client.transformationalSession.diagnosticSnapshot.areaKey === a.key) {
        curVal = client.transformationalSession.diagnosticSnapshot.afterClarity;
      } else if (client.finalEvaluation) {
        curVal = client.finalEvaluation.lifeWheelFinal[a.key] || startVal;
      } else if (client.sessions.length > 0) {
        const lastSession = client.sessions[client.sessions.length - 1];
        curVal = lastSession.lifeWheelSnapshot[a.key] || startVal;
      }
      areaCurrentSums[a.key] += curVal;
    });

    // Beliefs
    let clientLimitingStartAvg = 0;
    let clientEmpoweredStartAvg = 0;
    let areaCount = 0;
    Object.values(client.baseline.beliefs).forEach(b => {
      clientLimitingStartAvg += b.limitingPercentage;
      clientEmpoweredStartAvg += b.empoweredPercentage;
      areaCount++;
    });
    if (areaCount > 0) {
      limitingStartTotal += clientLimitingStartAvg / areaCount;
      empoweredStartTotal += clientEmpoweredStartAvg / areaCount;
    }

    // Latest beliefs
    let clientEmpoweredCurAvg = clientEmpoweredStartAvg / (areaCount || 1);
    if (client.transformationalSession) {
      clientEmpoweredCurAvg = Math.min(95, clientEmpoweredStartAvg + 35);
    } else if (client.finalEvaluation) {
      const vals = Object.values(client.finalEvaluation.empoweredBeliefsFinal);
      if (vals.length > 0) {
        clientEmpoweredCurAvg = vals.reduce((acc, v) => acc + v, 0) / vals.length;
      }
    } else if (client.sessions.length > 0) {
      const lastSession = client.sessions[client.sessions.length - 1];
      const vals = Object.values(lastSession.empoweredBeliefsSnapshot);
      if (vals.length > 0) {
        clientEmpoweredCurAvg = vals.reduce((acc, v) => acc + v, 0) / vals.length;
      }
    }
    empoweredCurrentTotal += clientEmpoweredCurAvg;
    limitingCurrentTotal += (100 - clientEmpoweredCurAvg);

    // Emotions
    if (client.transformationalSession) {
      const emo = client.transformationalSession.finalEmotion.split('/')[0].trim();
      emotionCounts[emo] = (emotionCounts[emo] || 0) + 1;
    }
    client.sessions.forEach(s => {
      const emo = s.emotionalManagement.predominantEmotion.split('/')[0].trim();
      emotionCounts[emo] = (emotionCounts[emo] || 0) + 1;
    });
  });

  const avgStartEnergy = Number((startEnergySum / total).toFixed(1));
  const avgCurEnergy = Number((currentEnergySum / total).toFixed(1));
  const vitalImprovement = avgStartEnergy > 0
    ? Number((((avgCurEnergy - avgStartEnergy) / avgStartEnergy) * 100).toFixed(1))
    : 0;

  const areaImprovements = LIFE_AREAS.map(a => {
    const startAvg = Number((areaStartSums[a.key] / total).toFixed(1));
    const currentAvg = Number((areaCurrentSums[a.key] / total).toFixed(1));
    const imp = startAvg > 0 ? Number((((currentAvg - startAvg) / startAvg) * 100).toFixed(1)) : 0;
    return {
      areaKey: a.key,
      label: a.label,
      startAvg,
      currentAvg,
      improvementPercent: imp,
    };
  });

  const totalEmotionEntries = Object.values(emotionCounts).reduce((acc, v) => acc + v, 0) || 1;
  const emotionDistribution = Object.entries(emotionCounts).map(([emotion, count]) => ({
    emotion,
    count,
    percentage: Math.round((count / totalEmotionEntries) * 100),
  })).sort((a, b) => b.count - a.count);

  const anonymousCaseStudies = aggregatedClients.map(c => {
    const baseEnergy = Number(((
      c.baseline.initialVitalDecisions.nutrition +
      c.baseline.initialVitalDecisions.exercise +
      c.baseline.initialVitalDecisions.rest
    ) / 3).toFixed(1));

    let latestEnergy = baseEnergy;
    if (c.finalEvaluation) {
      latestEnergy = Number(c.finalEvaluation.finalVitalDecisions.vitalEnergyScore.toFixed(1));
    } else if (c.sessions.length > 0) {
      latestEnergy = Number(c.sessions[c.sessions.length - 1].vitalDecisions.vitalEnergyScore.toFixed(1));
    }

    // find highest improvement area
    let maxDiff = -99;
    let maxArea = 'Cuerpo - Mente';
    LIFE_AREAS.forEach(a => {
      const startV = c.baseline.lifeWheel[a.key] || 5;
      const endV = c.finalEvaluation
        ? (c.finalEvaluation.lifeWheelFinal[a.key] || startV)
        : (c.sessions.length > 0 ? (c.sessions[c.sessions.length - 1].lifeWheelSnapshot[a.key] || startV) : startV);
      const diff = endV - startV;
      if (diff > maxDiff) {
        maxDiff = diff;
        maxArea = a.label;
      }
    });

    const drainAreaConfig = LIFE_AREAS.find(a => a.key === c.baseline.dominantDrainArea);

    return {
      code: c.anonymousCode,
      sessionsCount: c.sessions.length,
      enneatype: c.baseline.enneatype,
      initialDrainArea: drainAreaConfig ? drainAreaConfig.shortLabel : c.baseline.dominantDrainArea,
      vitalEnergyStart: baseEnergy,
      vitalEnergyCurrent: latestEnergy,
      highestImprovementArea: maxArea,
      status: c.status === 'completed' ? 'Programa Completado' : 'En Desarrollo Activo',
    };
  });

  return {
    totalClientsEvaluated: total,
    totalActiveSessionsCount: totalSessions,
    averageVitalEnergyStart: avgStartEnergy,
    averageVitalEnergyCurrent: avgCurEnergy,
    vitalEnergyImprovementPercentage: vitalImprovement,
    areaImprovements,
    beliefsEvolution: {
      limitingStartAvg: Math.round(limitingStartTotal / total),
      limitingCurrentAvg: Math.round(limitingCurrentTotal / total),
      empoweredStartAvg: Math.round(empoweredStartTotal / total),
      empoweredCurrentAvg: Math.round(empoweredCurrentTotal / total),
    },
    emotionDistribution,
    anonymousCaseStudies,
  };
}
