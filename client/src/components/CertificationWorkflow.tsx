import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Play } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

interface WorkflowPhase {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "pending" | "delayed";
  sla: string;
  responsible: string;
  progress?: number;
  count?: number;
}

const WORKFLOW_PHASES = [
  { id: "1", key: "solicitud_inicial", name: "Solicitud Inicial", sla: "24h", responsible: "Cliente Minería" },
  { id: "2", key: "asignacion_cps", name: "Asignación CPS", sla: "48h", responsible: "Admin" },
  { id: "3", key: "evaluacion_documentos", name: "Evaluación Documentos", sla: "72h", responsible: "Evaluador" },
  { id: "4", key: "evaluacion_operativa", name: "Evaluación Operativa", sla: "96h", responsible: "Auditor" },
  { id: "5", key: "evaluacion_valor_agregado", name: "Evaluación Valor Agregado", sla: "48h", responsible: "Comité" },
  { id: "6", key: "revision_final", name: "Revisión Final", sla: "24h", responsible: "Gerente General" },
  { id: "7", key: "emision_certificado", name: "Emisión Certificado", sla: "12h", responsible: "Sistema" },
  { id: "8", key: "activacion_nfc", name: "Activación NFC", sla: "6h", responsible: "Sistema" },
  { id: "9", key: "publicado", name: "Publicación", sla: "1h", responsible: "Sistema" },
  { id: "10", key: "monitoreo_continuo", name: "Monitoreo Continuo", sla: "Continuo", responsible: "Sistema" },
];

export default function CertificationWorkflow() {
  const { data: certifications = [] } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  // Count certifications by phase
  const phaseCounts = WORKFLOW_PHASES.map(phase => {
    const count = certifications.filter(c => c.currentPhase === phase.key || c.status === phase.key).length;
    return {
      ...phase,
      count,
      status: count > 0 ? "in-progress" as const : "pending" as const,
      progress: count > 0 ? Math.min(100, (count / certifications.length) * 100) : undefined,
    };
  });

  const phases: WorkflowPhase[] = phaseCounts;

  const getStatusIcon = (status: WorkflowPhase["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-primary" />;
      case "in-progress":
        return <Play className="w-4 h-4 text-chart-2" />;
      case "delayed":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: WorkflowPhase["status"]) => {
    const variants = {
      completed: "default",
      "in-progress": "default",
      pending: "secondary",
      delayed: "destructive",
    };
    return variants[status] as "default" | "secondary" | "destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flujo de Certificación (10 Fases)</CardTitle>
        <CardDescription>
          Sistema de 100 puntos: Documentales 40pts • Operativos 40pts • Valor Agregado 20pts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className="flex items-center gap-4 p-3 rounded-md border hover-elevate"
              data-testid={`workflow-phase-${phase.id}`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-mono font-semibold">
                {phase.id}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(phase.status)}
                  <h4 className="font-medium text-sm">{phase.name}</h4>
                  {phase.count !== undefined && phase.count > 0 && (
                    <Badge variant="secondary" className="text-xs">{phase.count}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-mono">SLA: {phase.sla}</span>
                  <span>•</span>
                  <span>{phase.responsible}</span>
                </div>
              </div>
              
              <Badge variant={getStatusBadge(phase.status)}>
                {phase.count && phase.count > 0 ? `${phase.count} Activas` : "Sin Certificaciones"}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Link href="/certifications">
            <Button size="sm" data-testid="button-view-certifications">
              Ver Todas las Certificaciones
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
