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
  { key: "solicitud_inicial", name: "Solicitud Inicial", sla: "24h", responsible: "Cliente Minería" },
  { key: "asignacion_cps", name: "Asignación CPS", sla: "48h", responsible: "Admin" },
  { key: "evaluacion_documentos", name: "Evaluación Documentos", sla: "72h", responsible: "Evaluador" },
  { key: "evaluacion_operativa", name: "Evaluación Operativa", sla: "96h", responsible: "Auditor" },
  { key: "evaluacion_valor_agregado", name: "Evaluación Valor Agregado", sla: "48h", responsible: "Comité" },
  { key: "revision_final", name: "Revisión Final", sla: "24h", responsible: "Gerente General" },
  { key: "emision_certificado", name: "Emisión Certificado", sla: "12h", responsible: "Sistema" },
  { key: "activacion_nfc", name: "Activación NFC", sla: "6h", responsible: "Sistema" },
  { key: "publicado", name: "Publicación", sla: "1h", responsible: "Sistema" },
  { key: "monitoreo_continuo", name: "Monitoreo Continuo", sla: "Continuo", responsible: "Sistema" },
];

const PHASE_REQUIREMENTS: Record<string, {
  title: string;
  description: string;
  checklist: string[];
  documentsRequired: string[];
  actions: string[];
}> = {
  "solicitud_inicial": {
    title: "Recepción de Solicitud",
    description: "Verificar que la solicitud inicial está completa",
    checklist: [
      "Formulario de solicitud completado",
      "Datos empresariales válidos (RUT, nombre, industria)",
      "Contacto responsable identificado",
      "Declaración de envases > 300 kg/año"
    ],
    documentsRequired: [
      "Formulario de solicitud firmado",
      "Certificado SII vigente"
    ],
    actions: [
      "Revisar datos empresariales",
      "Validar RUT en SII",
      "Confirmar contacto responsable",
      "Avanzar a siguiente fase si todo está correcto"
    ]
  },
  "asignacion_cps": {
    title: "Asignar Código CPS",
    description: "Generar y asignar código único de certificación",
    checklist: [
      "Código CPS generado automáticamente",
      "Código único verificado",
      "Proveedor vinculado correctamente"
    ],
    documentsRequired: [],
    actions: [
      "Verificar código CPS asignado",
      "Confirmar vinculación con proveedor",
      "Avanzar a evaluación de documentos"
    ]
  },
  "evaluacion_documentos": {
    title: "Evaluación de Documentación",
    description: "Revisar y validar toda la documentación técnica presentada",
    checklist: [
      "Certificado de Inicio de Actividades (SII) vigente",
      "Declaración jurada de envases/embalajes completa",
      "Fichas técnicas de productos legibles y completas",
      "Comprobante de pago procesado (si aplicable)",
      "Todos los documentos firmados digitalmente"
    ],
    documentsRequired: [
      "Certificado SII",
      "Declaración jurada",
      "Fichas técnicas de productos",
      "Comprobante de pago"
    ],
    actions: [
      "Descargar y revisar cada documento adjunto",
      "Verificar firmas digitales",
      "Confirmar vigencia del Certificado SII",
      "Validar coherencia de fichas técnicas",
      "Si falta documentación, RECHAZAR con motivo específico",
      "Si todo está completo, APROBAR y avanzar fase"
    ]
  },
  "evaluacion_operativa": {
    title: "Auditoría Operativa",
    description: "Verificación in-situ de procesos y operaciones",
    checklist: [
      "Instalaciones visitadas y verificadas",
      "Procesos de manejo de envases documentados",
      "Registros de peso/volumen validados",
      "Cumplimiento de normativa ambiental",
      "Personal capacitado identificado"
    ],
    documentsRequired: [
      "Informe de auditoría",
      "Registro fotográfico de instalaciones",
      "Certificados de capacitación del personal"
    ],
    actions: [
      "Coordinar visita in-situ",
      "Inspeccionar instalaciones",
      "Revisar registros operativos",
      "Documentar hallazgos",
      "Generar informe de auditoría",
      "Subir informe y fotos"
    ]
  },
  "evaluacion_valor_agregado": {
    title: "Evaluación ESG y Valor Agregado",
    description: "Calcular puntuación ESG y analizar impacto ambiental",
    checklist: [
      "Scorecard ESG calculado",
      "Puntos de sostenibilidad asignados",
      "Impacto ambiental cuantificado",
      "Certificaciones adicionales verificadas",
      "Innovaciones documentadas"
    ],
    documentsRequired: [
      "Scorecard ESG",
      "Informe de sostenibilidad",
      "Certificaciones ambientales (si aplica)"
    ],
    actions: [
      "Calcular métricas ESG",
      "Asignar puntuación total",
      "Documentar prácticas sostenibles",
      "Identificar oportunidades de mejora",
      "Generar reporte ESG"
    ]
  },
  "revision_final": {
    title: "Revisión Final y Aprobación",
    description: "Revisión ejecutiva de todo el proceso de certificación",
    checklist: [
      "Todas las fases anteriores completadas",
      "Documentación completa y aprobada",
      "Auditoría operativa satisfactoria",
      "Puntuación ESG asignada",
      "Sin observaciones pendientes"
    ],
    documentsRequired: [
      "Resumen ejecutivo de certificación",
      "Todos los documentos de fases anteriores"
    ],
    actions: [
      "Revisar historial completo de workflow",
      "Verificar cumplimiento de todos los requisitos",
      "Aprobar emisión de certificado",
      "Autorizar avance a emisión"
    ]
  },
  "emision_certificado": {
    title: "Emisión del Certificado REP",
    description: "Generación automática del certificado oficial",
    checklist: [
      "Certificado PDF generado",
      "Código QR incluido",
      "Firma digital aplicada",
      "Fecha de emisión y vencimiento establecidas"
    ],
    documentsRequired: [],
    actions: [
      "El sistema generará automáticamente el certificado",
      "Verificar que el PDF se generó correctamente",
      "Confirmar fecha de vencimiento (1 año)"
    ]
  },
  "activacion_nfc": {
    title: "Activación de Tecnología NFC",
    description: "Generación de tags NFC y códigos blockchain",
    checklist: [
      "Tag NFC generado",
      "Código QR generado",
      "Hash blockchain creado",
      "Trazabilidad activada"
    ],
    documentsRequired: [],
    actions: [
      "El sistema generará tag NFC automáticamente",
      "Verificar código QR y hash blockchain",
      "Confirmar trazabilidad activa"
    ]
  },
  "publicado": {
    title: "Publicación y Entrega",
    description: "Certificación publicada y disponible",
    checklist: [
      "Certificado PDF enviado al cliente",
      "Tag NFC activado",
      "Pasaporte digital público disponible",
      "Cliente notificado"
    ],
    documentsRequired: [],
    actions: [
      "Verificar que el cliente recibió el certificado",
      "Confirmar acceso al pasaporte digital",
      "Avanzar a monitoreo continuo"
    ]
  },
  "monitoreo_continuo": {
    title: "Monitoreo y Mantenimiento",
    description: "Seguimiento continuo de la certificación",
    checklist: [
      "Certificación activa y válida",
      "Sin reportes de incidencias",
      "Renovación programada"
    ],
    documentsRequired: [],
    actions: [
      "Monitorear vencimiento",
      "Alertar al cliente 30 días antes del vencimiento",
      "Procesar renovaciones"
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
