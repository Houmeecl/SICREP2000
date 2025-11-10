import { useParams, useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, ArrowRight, FileCheck, Download, Calendar, User, 
  TrendingUp, CheckCircle, Clock, AlertCircle, Play, Shield, ClipboardCheck, Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/lib/auth";

const WORKFLOW_PHASES = [
  { key: "solicitud_inicial", name: "Solicitud Inicial", sla: "1 día", responsible: "Sistema/Comercial" },
  { key: "revision_documental", name: "Revisión Documental Inicial", sla: "2-3 días", responsible: "Analista Documental" },
  { key: "evaluacion_preliminar", name: "Evaluación Preliminar", sla: "3-4 días", responsible: "Evaluador" },
  { key: "visita_terreno", name: "Visita en Terreno", sla: "1-2 días + viaje", responsible: "Auditor de Campo" },
  { key: "analisis_cumplimiento", name: "Análisis de Cumplimiento", sla: "2-3 días", responsible: "Analista Senior" },
  { key: "dictamen_tecnico", name: "Dictamen Técnico", sla: "2 días", responsible: "Jefe Técnico" },
  { key: "aprobacion_comite", name: "Aprobación Comité", sla: "3-5 días", responsible: "Comité de Certificación" },
  { key: "emision_certificado", name: "Emisión de Certificado", sla: "1 día", responsible: "Sistema/Administrador" },
  { key: "publicacion", name: "Publicación", sla: "1 día", responsible: "Sistema" },
  { key: "seguimiento", name: "Seguimiento Post-Certificación", sla: "Continuo (12 meses)", responsible: "Sistema/Área de Calidad" },
];

const PHASE_REQUIREMENTS: Record<string, {
  title: string;
  description: string;
  checklist: string[];
  documentsRequired: string[];
  actions: string[];
}> = {
  "solicitud_inicial": {
    title: "Fase 1: Solicitud Inicial",
    description: "Cliente envía solicitud y sistema crea proyecto de certificación",
    checklist: [
      "Formulario de solicitud completado",
      "Datos empresariales válidos (RUT, nombre, industria)",
      "Contacto responsable identificado",
      "Asignación automática de ID única"
    ],
    documentsRequired: [
      "Formulario de solicitud completo"
    ],
    actions: [
      "Crear proyecto en sistema",
      "Asignar ID único de certificación",
      "Notificar al cliente sobre inicio del proceso",
      "Asignar analista documental responsable"
    ]
  },
  "revision_documental": {
    title: "Fase 2: Revisión Documental Inicial",
    description: "Verificación de documentos legales y cumplimiento inicial",
    checklist: [
      "e-RUT vigente verificado (2 pts)",
      "Certificado de vigencia sociedad < 30 días (2 pts)",
      "Certificado RETC vigente (3 pts)",
      "Certificado SMA sin sanciones (3 pts)",
      "Validación de RUT en SII completada"
    ],
    documentsRequired: [
      "e-RUT vigente",
      "Certificado de vigencia de la sociedad",
      "Certificado RETC",
      "Certificado SMA",
      "Documentos legales completos"
    ],
    actions: [
      "Verificar documentos legales con checklist automático",
      "Validar RUT en sistema SII",
      "Verificar certificado RETC vigente",
      "Verificar certificado SMA (sin sanciones)",
      "Si falta documentación: RECHAZAR o solicitar CON OBSERVACIONES",
      "Si todo está completo: APROBAR y avanzar a Fase 3"
    ]
  },
  "evaluacion_preliminar": {
    title: "Fase 3: Evaluación Preliminar",
    description: "Análisis de cumplimiento documental (40 pts)",
    checklist: [
      "POE información a clientes (4 pts) - CRÍTICO",
      "Plantilla de reporte de envases (2 pts)",
      "Plan de manejo de residuos (2 pts)",
      "Sistema de información documentado (3 pts)",
      "Procedimientos de control de calidad (3 pts)",
      "Sistema ERP/registro de productos (4 pts)",
      "Fichas técnicas completas (3 pts)"
    ],
    documentsRequired: [
      "POE información a clientes",
      "Plantilla reporte envases",
      "Plan manejo residuos",
      "Procedimientos operativos",
      "Fichas técnicas de productos"
    ],
    actions: [
      "Evaluar criterios documentales (40 pts total)",
      "Verificar procedimientos operativos",
      "Revisar trazabilidad de información",
      "Analizar políticas de sostenibilidad",
      "Si puntaje >= 28 pts (70%): APROBAR para Visita en Terreno",
      "Si puntaje < 28 pts: Solicitar Plan de Mejora"
    ]
  },
  "visita_terreno": {
    title: "Fase 4: Visita en Terreno",
    description: "Evaluación operativa in-situ (40 pts)",
    checklist: [
      "Puntos de reciclaje implementados (3 pts)",
      "Señalética adecuada (2 pts)",
      "Personal comercial capacitado (4 pts)",
      "Personal logística capacitado (3 pts)",
      "Instalaciones adecuadas (3 pts)",
      "Equipamiento necesario (3 pts)",
      "Permisos operacionales vigentes (3 pts)",
      "Cumplimiento Ley REP (4 pts)"
    ],
    documentsRequired: [
      "Informe de auditoría de campo",
      "Registro fotográfico geolocalizado",
      "Certificados de capacitación del personal",
      "Firma digital del cliente"
    ],
    actions: [
      "Coordinar visita con cliente (48 hrs antes)",
      "Realizar inspección en terreno con checklist",
      "Evaluar criterios operativos (40 pts)",
      "Capturar evidencias fotográficas geolocalizadas",
      "Entrevistar al personal clave",
      "Verificar infraestructura y cumplimiento",
      "Generar reporte preliminar in-situ"
    ]
  },
  "analisis_cumplimiento": {
    title: "Fase 5: Análisis de Cumplimiento",
    description: "Consolidación y categorización (100 pts total)",
    checklist: [
      "Puntaje documental consolidado (40 pts)",
      "Puntaje operativo consolidado (40 pts)",
      "Puntaje valor agregado calculado (20 pts)",
      "Puntaje total >= 70 pts (mínimo certificable)",
      "Categorización aplicada (Verde/Amarillo/Rojo)",
      "No conformidades identificadas"
    ],
    documentsRequired: [
      "Reporte preliminar consolidado",
      "Matriz de evaluación completa"
    ],
    actions: [
      "Consolidar puntajes de fases anteriores",
      "Calcular score total sobre 100 pts",
      "Categorizar: VERDE (>=85), AMARILLO (70-84), ROJO (<70)",
      "Identificar no conformidades y brechas",
      "Generar reporte preliminar para dictamen técnico",
      "Si ROJO: Generar plan de acción correctivo"
    ]
  },
  "dictamen_tecnico": {
    title: "Fase 6: Dictamen Técnico",
    description: "Elaboración de informe técnico completo",
    checklist: [
      "Informe técnico completo elaborado",
      "Recomendaciones de mejora definidas",
      "Plan de acción documentado (si aplica)",
      "Presentación para comité preparada",
      "Evidencias y anexos adjuntos"
    ],
    documentsRequired: [
      "Informe técnico completo",
      "Recomendaciones de mejora",
      "Plan de acción (si categoría Amarilla)",
      "Presentación ejecutiva para comité"
    ],
    actions: [
      "Elaborar informe técnico completo",
      "Redactar recomendaciones específicas",
      "Definir plan de acción (si aplica)",
      "Preparar presentación para Comité de Certificación",
      "Adjuntar todas las evidencias documentales y fotográficas",
      "Enviar a Comité para revisión"
    ]
  },
  "aprobacion_comite": {
    title: "Fase 7: Aprobación Comité",
    description: "Revisión y votación del Comité de Certificación",
    checklist: [
      "Caso presentado al Comité de Certificación",
      "Quórum mínimo alcanzado (3 de 5 miembros)",
      "Deliberación completada",
      "Votación realizada",
      "Observaciones resueltas (si aplica)",
      "Resolución emitida"
    ],
    documentsRequired: [
      "Presentación ejecutiva",
      "Informe técnico completo",
      "Acta de reunión del Comité",
      "Resolución firmada"
    ],
    actions: [
      "Presentar caso al Comité de Certificación",
      "Deliberar y votar (quórum: 3 de 5 miembros)",
      "Resolver observaciones si las hay",
      "Emitir resolución: APROBADO / APROBADO CON CONDICIONES / RECHAZADO / DIFERIDO",
      "Si APROBADO o APROBADO CON CONDICIONES: Avanzar a Emisión",
      "Si RECHAZADO: Notificar cliente con derecho a apelación (15 días)",
      "Si DIFERIDO: Solicitar más información y volver a Dictamen Técnico"
    ]
  },
  "emision_certificado": {
    title: "Fase 8: Emisión de Certificado",
    description: "Generación automática del certificado oficial REP",
    checklist: [
      "Certificado PDF generado con template oficial",
      "Código QR único creado",
      "Hash blockchain registrado (Polygon Mumbai)",
      "Firma digital aplicada",
      "Certificado almacenado en sistema",
      "Vigencia establecida (12 meses)"
    ],
    documentsRequired: [
      "Certificado PDF oficial firmado digitalmente"
    ],
    actions: [
      "Generar certificado PDF con template oficial",
      "Crear QR code único para validación pública",
      "Registrar hash en blockchain (Polygon Mumbai)",
      "Aplicar firma digital al documento",
      "Almacenar certificado en sistema seguro",
      "Tiempo máximo de emisión: 24 horas"
    ]
  },
  "publicacion": {
    title: "Fase 9: Publicación",
    description: "Publicación en portal público y notificación al cliente",
    checklist: [
      "Certificado publicado en portal público",
      "Validación por QR habilitada",
      "Cliente notificado (email + SMS)",
      "Dashboard actualizado",
      "Pasaporte digital público disponible"
    ],
    documentsRequired: [],
    actions: [
      "Publicar certificado en portal público SICREP",
      "Habilitar validación pública por código QR",
      "Notificar al cliente (email + SMS)",
      "Actualizar dashboard y estadísticas",
      "Generar comunicado de prensa (opcional)",
      "Avanzar a Fase 10: Seguimiento Post-Certificación"
    ]
  },
  "seguimiento": {
    title: "Fase 10: Seguimiento Post-Certificación",
    description: "Monitoreo continuo y alertas de renovación (12 meses)",
    checklist: [
      "Certificación activa y válida",
      "Monitoreo de vigencia activo",
      "Sistema de alertas configurado",
      "Sin reportes de incidencias críticas",
      "Auditorías de seguimiento aleatorias"
    ],
    documentsRequired: [],
    actions: [
      "Monitorear vigencia del certificado (12 meses)",
      "Enviar recordatorios automáticos de renovación:",
      "  • 90 días antes: Email recordatorio",
      "  • 60 días antes: Email + SMS",
      "  • 30 días antes: Email + SMS + Llamada",
      "Realizar auditorías aleatorias de seguimiento",
      "Verificar mantenimiento de condiciones de certificación",
      "Si vencido sin renovación: Suspensión automática del certificado"
    ]
  }
};

export default function CertificationDetail() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { goBack } = useBackNavigation();
  const { user } = useAuth();
  const [showAdvanceDialog, setShowAdvanceDialog] = useState(false);

  // Fetch certification data
  const { data: certifications = [], isLoading: certsLoading } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  const certification = certifications.find(c => c.id === id);

  // Fetch provider data
  const { data: providers = [] } = useQuery<any[]>({
    queryKey: ["/api/providers"],
  });

  const provider = providers.find(p => p.id === certification?.providerId);

  // Fetch workflow history
  const { data: workflowHistory = [], isLoading: historyLoading } = useQuery<any[]>({
    queryKey: [`/api/certifications/${id}/workflow-history`],
    enabled: !!id,
  });

  // Fetch certification documents
  const { data: documents = [] } = useQuery<any[]>({
    queryKey: ["/api/certification-documents"],
    select: (data) => data.filter((doc: any) => doc.certificationId === id),
  });

  // Mutation to advance phase
  const advanceMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/certifications/${id}/advance`, { userId: user?.id });
    },
    onSuccess: () => {
      toast({
        title: "Fase avanzada",
        description: "La certificación ha avanzado a la siguiente fase",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/certifications"] });
      queryClient.invalidateQueries({ queryKey: [`/api/certifications/${id}/workflow-history`] });
      setShowAdvanceDialog(false);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo avanzar la certificación",
      });
    },
  });

  // Download document handler
  const handleDownload = async (docId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/certification-documents/${docId}/download`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo descargar el documento",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "publicado" || status === "monitoreo_continuo") {
      return <Badge variant="default" data-testid="badge-status-active">Activo</Badge>;
    } else if (status === "rechazado" || status === "expirado") {
      return <Badge variant="destructive" data-testid="badge-status-expired">Expirado</Badge>;
    } else {
      return <Badge variant="secondary" data-testid="badge-status-process">En Proceso</Badge>;
    }
  };

  const getPhaseIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle className="w-4 h-4 text-primary" />;
    } else if (status === "in-progress") {
      return <Play className="w-4 h-4 text-chart-2" />;
    } else if (status === "delayed") {
      return <AlertCircle className="w-4 h-4 text-destructive" />;
    } else {
      return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const canAdvancePhase = () => {
    if (!user || !certification) return false;
    const allowedRoles = ['admin', 'evaluador', 'auditor'];
    return allowedRoles.includes(user.role);
  };

  const currentPhaseIndex = WORKFLOW_PHASES.findIndex(p => p.key === certification?.currentPhase);
  const isLastPhase = currentPhaseIndex === WORKFLOW_PHASES.length - 1;

  if (certsLoading || historyLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-muted-foreground">Cargando detalles...</div>
        </div>
      </div>
    );
  }

  if (!certification) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-muted-foreground">Certificación no encontrada</div>
          <Button onClick={() => navigate("/certifications")} className="mt-4" data-testid="button-back-to-list">
            Volver a Certificaciones
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={() => goBack()} variant="ghost" size="sm" data-testid="button-back-detail">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Detalle de Certificación</h1>
            <p className="text-muted-foreground">Información completa y gestión de workflow</p>
          </div>
        </div>
        {canAdvancePhase() && !isLastPhase && (
          <Button 
            onClick={() => setShowAdvanceDialog(true)} 
            data-testid="button-advance-phase"
            disabled={advanceMutation.isPending}
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Avanzar Fase
          </Button>
        )}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-6 h-6" />
                Certificación {certification.code}
              </CardTitle>
              <CardDescription>
                Creada el {new Date(certification.createdAt).toLocaleDateString('es-CL')}
              </CardDescription>
            </div>
            {getStatusBadge(certification.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                Proveedor
              </div>
              <div className="font-medium" data-testid="text-provider-name">
                {provider?.name || certification.providerId}
              </div>
              {provider && (
                <div className="text-xs text-muted-foreground">{provider.rut}</div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                Fase Actual
              </div>
              <div className="font-medium" data-testid="text-current-phase">
                {WORKFLOW_PHASES[currentPhaseIndex]?.name || certification.currentPhase}
              </div>
              <div className="text-xs text-muted-foreground">
                SLA: {WORKFLOW_PHASES[currentPhaseIndex]?.sla}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                Puntuación
              </div>
              <div className="text-2xl font-bold font-mono" data-testid="text-score-total">
                {certification.scoreTotal || 0}
              </div>
              <div className="text-xs text-muted-foreground">de 100 puntos</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Válido Hasta
              </div>
              <div className="font-medium" data-testid="text-expires-at">
                {certification.expiresAt 
                  ? new Date(certification.expiresAt).toLocaleDateString('es-CL')
                  : "Pendiente"
                }
              </div>
              {certification.nfcTag && (
                <div className="text-xs font-mono text-primary">{certification.nfcTag}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones Requeridas */}
      {certification.currentPhase && PHASE_REQUIREMENTS[certification.currentPhase] && (
        <Alert className="border-primary bg-primary/5">
          <ClipboardCheck className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold mb-2">
            {PHASE_REQUIREMENTS[certification.currentPhase].title}
          </AlertTitle>
          <AlertDescription>
            <p className="text-sm mb-4">{PHASE_REQUIREMENTS[certification.currentPhase].description}</p>
            
            {/* Checklist */}
            <div className="space-y-3 mb-4">
              <p className="font-semibold text-sm">✓ Checklist de Verificación:</p>
              <ul className="space-y-1.5">
                {PHASE_REQUIREMENTS[certification.currentPhase].checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documentos Requeridos */}
            {PHASE_REQUIREMENTS[certification.currentPhase].documentsRequired.length > 0 && (
              <div className="space-y-3 mb-4">
                <p className="font-semibold text-sm">📄 Documentos Requeridos:</p>
                <ul className="space-y-1.5">
                  {PHASE_REQUIREMENTS[certification.currentPhase].documentsRequired.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <FileCheck className="w-4 h-4 mt-0.5 text-chart-2 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Acciones */}
            <div className="space-y-3">
              <p className="font-semibold text-sm">🎯 Acciones a Realizar:</p>
              <ol className="space-y-2">
                {PHASE_REQUIREMENTS[certification.currentPhase].actions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary shrink-0">{idx + 1}.</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Workflow Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Workflow</CardTitle>
          <CardDescription>
            Progreso a través de las 10 fases de certificación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {WORKFLOW_PHASES.map((phase, index) => {
              const historyItem = workflowHistory.find((h: any) => h.phase === phase.key);
              const isCompleted = historyItem?.status === "completed";
              const isCurrent = certification.currentPhase === phase.key;
              
              return (
                <div
                  key={phase.key}
                  className={`flex items-center gap-4 p-3 rounded-md border ${
                    isCurrent ? 'bg-primary/5 border-primary' : ''
                  }`}
                  data-testid={`workflow-item-${phase.key}`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-mono font-semibold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : isCurrent ? (
                        <Play className="w-4 h-4 text-chart-2" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <h4 className="font-medium text-sm">{phase.name}</h4>
                      {isCurrent && <Badge variant="secondary">Actual</Badge>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">SLA: {phase.sla}</span>
                      <span>•</span>
                      <span>{phase.responsible}</span>
                      {historyItem?.completedAt && (
                        <>
                          <span>•</span>
                          <span>Completado: {new Date(historyItem.completedAt).toLocaleDateString('es-CL')}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Badge variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}>
                    {isCompleted ? "Completado" : isCurrent ? "En Progreso" : "Pendiente"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Adjuntos</CardTitle>
          <CardDescription>
            Documentos técnicos y certificados relacionados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay documentos adjuntos para esta certificación
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-md border hover-elevate"
                  data-testid={`document-${doc.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{doc.fileName}</div>
                    <div className="text-xs text-muted-foreground">
                      {doc.category} • {(doc.fileSize / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(doc.id, doc.fileName)}
                    data-testid={`button-download-${doc.id}`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advance Phase Dialog */}
      <Dialog open={showAdvanceDialog} onOpenChange={setShowAdvanceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avanzar Fase de Certificación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de avanzar esta certificación a la siguiente fase?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fase Actual:</span>
                <span className="font-medium">{WORKFLOW_PHASES[currentPhaseIndex]?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Siguiente Fase:</span>
                <span className="font-medium text-primary">
                  {WORKFLOW_PHASES[currentPhaseIndex + 1]?.name}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdvanceDialog(false)} data-testid="button-cancel-advance">
              Cancelar
            </Button>
            <Button 
              onClick={() => advanceMutation.mutate()} 
              disabled={advanceMutation.isPending}
              data-testid="button-confirm-advance"
            >
              {advanceMutation.isPending ? "Avanzando..." : "Confirmar Avance"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
