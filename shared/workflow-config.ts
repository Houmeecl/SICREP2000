/**
 * Configuración del Workflow de Certificación REP
 * Basado en SICREP_Workflow_Completo con SLAs oficiales
 */

export type WorkflowPhase =
  | 'solicitud_inicial'
  | 'revision_documental'
  | 'evaluacion_preliminar'
  | 'visita_terreno'
  | 'analisis_cumplimiento'
  | 'dictamen_tecnico'
  | 'aprobacion_comite'
  | 'emision_certificado'
  | 'publicacion'
  | 'seguimiento';

export interface PhaseConfig {
  id: WorkflowPhase;
  name: string;
  description: string;
  duration: string;
  hours: number | null;
  responsable: string;
  alertAt: number | null; // Horas antes de vencimiento para alertar
  requiredDocuments?: string[];
  requiredScore?: number;
  nextPhase?: WorkflowPhase;
  canSkip: boolean;
}

/**
 * Configuración oficial de SLA por fase del workflow
 * Duración total estimada: 15-25 días hábiles
 */
export const WORKFLOW_SLA: Record<WorkflowPhase, PhaseConfig> = {
  solicitud_inicial: {
    id: 'solicitud_inicial',
    name: 'Solicitud Inicial',
    description: 'Cliente envía solicitud, sistema crea proyecto y asigna ID automático',
    duration: '1 día',
    hours: 24,
    responsable: 'Sistema/Comercial',
    alertAt: 18,
    requiredDocuments: [
      'Certificado de Inicio de Actividades',
      'Registro de Marca',
      'Memoria Técnica',
    ],
    nextPhase: 'revision_documental',
    canSkip: false,
  },

  revision_documental: {
    id: 'revision_documental',
    name: 'Revisión Documental',
    description: 'Verificación de documentos legales, validación RUT y certificados con checklist automático',
    duration: '2-3 días',
    hours: 72,
    responsable: 'Analista Documental',
    alertAt: 48,
    requiredDocuments: [
      'RUT validado',
      'Certificados vigentes',
      'Documentación completa',
    ],
    nextPhase: 'evaluacion_preliminar',
    canSkip: false,
  },

  evaluacion_preliminar: {
    id: 'evaluacion_preliminar',
    name: 'Evaluación Preliminar',
    description: 'Análisis de cumplimiento inicial, evaluación documental (40 pts) e identificación de brechas',
    duration: '3-4 días',
    hours: 96,
    responsable: 'Evaluador',
    alertAt: 72,
    requiredScore: 20, // Mínimo 20/40 puntos documentales para continuar
    nextPhase: 'visita_terreno',
    canSkip: false,
  },

  visita_terreno: {
    id: 'visita_terreno',
    name: 'Visita en Terreno',
    description: 'Coordinación de visita, evaluación operativa (40 pts), captura de evidencias y entrevistas',
    duration: '1-2 días + viaje',
    hours: 120, // 5 días incluyendo viaje
    responsable: 'Auditor de Campo',
    alertAt: 96,
    requiredDocuments: [
      'Acta de visita',
      'Fotografías evidencia',
      'Entrevistas registradas',
    ],
    nextPhase: 'analisis_cumplimiento',
    canSkip: false,
  },

  analisis_cumplimiento: {
    id: 'analisis_cumplimiento',
    name: 'Análisis de Cumplimiento',
    description: 'Consolidación de evaluaciones, cálculo de puntaje total (100 pts) y categorización',
    duration: '2-3 días',
    hours: 72,
    responsable: 'Analista Senior',
    alertAt: 60,
    requiredScore: 60, // Mínimo 60/100 para aprobar
    nextPhase: 'dictamen_tecnico',
    canSkip: false,
  },

  dictamen_tecnico: {
    id: 'dictamen_tecnico',
    name: 'Dictamen Técnico',
    description: 'Elaboración de informe técnico, recomendaciones de mejora y plan de acción si aplica',
    duration: '2 días',
    hours: 48,
    responsable: 'Jefe Técnico',
    alertAt: 36,
    requiredDocuments: [
      'Informe técnico',
      'Recomendaciones',
      'Plan de acción (si aplica)',
    ],
    nextPhase: 'aprobacion_comite',
    canSkip: false,
  },

  aprobacion_comite: {
    id: 'aprobacion_comite',
    name: 'Aprobación Comité',
    description: 'Revisión por Comité de Certificación, votación y resolución de observaciones',
    duration: '3-5 días',
    hours: 120,
    responsable: 'Comité de Certificación',
    alertAt: 96,
    requiredDocuments: [
      'Acta de comité',
      'Votación registrada',
      'Observaciones resueltas',
    ],
    nextPhase: 'emision_certificado',
    canSkip: false,
  },

  emision_certificado: {
    id: 'emision_certificado',
    name: 'Emisión de Certificado',
    description: 'Generación de certificado oficial REP con NFC, QR y blockchain hash',
    duration: '1 día',
    hours: 24,
    responsable: 'Sistema/Admin',
    alertAt: 20,
    requiredDocuments: [
      'Certificado PDF oficial',
      'NFC Tag asignado',
      'Blockchain hash generado',
    ],
    nextPhase: 'publicacion',
    canSkip: false,
  },

  publicacion: {
    id: 'publicacion',
    name: 'Publicación',
    description: 'Publicación en registro público y notificación a stakeholders',
    duration: '1 día',
    hours: 24,
    responsable: 'Coordinador',
    alertAt: 20,
    requiredDocuments: [
      'Publicación en registro',
      'Notificación enviada',
    ],
    nextPhase: 'seguimiento',
    canSkip: false,
  },

  seguimiento: {
    id: 'seguimiento',
    name: 'Seguimiento',
    description: 'Monitoreo continuo post-certificación, auditorías periódicas y renovación',
    duration: 'Continuo',
    hours: null, // Sin límite temporal
    responsable: 'Supervisor',
    alertAt: null,
    requiredDocuments: [
      'Auditorías periódicas',
      'Reportes de cumplimiento',
    ],
    nextPhase: undefined,
    canSkip: false,
  },
};

/**
 * Orden de las fases en el workflow
 */
export const PHASE_ORDER: WorkflowPhase[] = [
  'solicitud_inicial',
  'revision_documental',
  'evaluacion_preliminar',
  'visita_terreno',
  'analisis_cumplimiento',
  'dictamen_tecnico',
  'aprobacion_comite',
  'emision_certificado',
  'publicacion',
  'seguimiento',
];

/**
 * Obtiene la siguiente fase del workflow
 */
export function getNextPhase(currentPhase: WorkflowPhase): WorkflowPhase | null {
  const currentIndex = PHASE_ORDER.indexOf(currentPhase);
  if (currentIndex === -1 || currentIndex === PHASE_ORDER.length - 1) {
    return null;
  }
  return PHASE_ORDER[currentIndex + 1];
}

/**
 * Obtiene la fase anterior del workflow
 */
export function getPreviousPhase(currentPhase: WorkflowPhase): WorkflowPhase | null {
  const currentIndex = PHASE_ORDER.indexOf(currentPhase);
  if (currentIndex <= 0) {
    return null;
  }
  return PHASE_ORDER[currentIndex - 1];
}

/**
 * Calcula el deadline de SLA para una fase
 */
export function calculateSLADeadline(
  startDate: Date,
  phase: WorkflowPhase
): Date | null {
  const config = WORKFLOW_SLA[phase];
  if (!config.hours) return null;

  const deadline = new Date(startDate);
  deadline.setHours(deadline.getHours() + config.hours);
  return deadline;
}

/**
 * Verifica si una fase está en riesgo de incumplir SLA
 */
export function isPhaseAtRisk(
  startDate: Date,
  phase: WorkflowPhase
): boolean {
  const config = WORKFLOW_SLA[phase];
  if (!config.hours || !config.alertAt) return false;

  const now = new Date();
  const elapsed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60); // horas
  return elapsed >= config.alertAt;
}

/**
 * Verifica si una fase ha incumplido el SLA
 */
export function hasPhaseExpired(
  startDate: Date,
  phase: WorkflowPhase
): boolean {
  const config = WORKFLOW_SLA[phase];
  if (!config.hours) return false;

  const now = new Date();
  const elapsed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60); // horas
  return elapsed > config.hours;
}

/**
 * Calcula el porcentaje de tiempo transcurrido de una fase
 */
export function getPhaseProgress(
  startDate: Date,
  phase: WorkflowPhase
): number {
  const config = WORKFLOW_SLA[phase];
  if (!config.hours) return 0;

  const now = new Date();
  const elapsed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const progress = (elapsed / config.hours) * 100;

  return Math.min(Math.max(progress, 0), 100);
}

/**
 * Estados terminales que no pueden avanzar
 */
export const TERMINAL_STATES = ['rechazado', 'expirado', 'seguimiento'];

/**
 * Verifica si un estado es terminal
 */
export function isTerminalState(status: string): boolean {
  return TERMINAL_STATES.includes(status);
}

/**
 * Categorización por puntaje total
 */
export interface ScoreCategory {
  name: string;
  color: 'green' | 'yellow' | 'red';
  description: string;
}

export function getScoreCategory(score: number): ScoreCategory {
  if (score >= 80) {
    return {
      name: 'Verde - Excelente',
      color: 'green',
      description: 'Cumplimiento excepcional de requisitos REP',
    };
  } else if (score >= 60) {
    return {
      name: 'Amarillo - Aceptable',
      color: 'yellow',
      description: 'Cumplimiento aceptable con observaciones menores',
    };
  } else {
    return {
      name: 'Rojo - Insuficiente',
      color: 'red',
      description: 'No cumple requisitos mínimos REP',
    };
  }
}

/**
 * Duración total estimada del proceso completo
 */
export const TOTAL_PROCESS_DURATION = {
  min: 15, // días hábiles
  max: 25, // días hábiles
  average: 20, // días hábiles
};
