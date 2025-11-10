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
  { id: "1", key: "solicitud_inicial", name: "Solicitud Inicial", sla: "1 día", responsible: "Sistema/Comercial" },
  { id: "2", key: "revision_documental", name: "Revisión Documental", sla: "2-3 días", responsible: "Analista Documental" },
  { id: "3", key: "evaluacion_preliminar", name: "Evaluación Preliminar", sla: "3-4 días", responsible: "Evaluador" },
  { id: "4", key: "visita_terreno", name: "Visita en Terreno", sla: "1-2 días", responsible: "Auditor de Campo" },
  { id: "5", key: "analisis_cumplimiento", name: "Análisis Cumplimiento", sla: "2-3 días", responsible: "Analista Senior" },
  { id: "6", key: "dictamen_tecnico", name: "Dictamen Técnico", sla: "2 días", responsible: "Jefe Técnico" },
  { id: "7", key: "aprobacion_comite", name: "Aprobación Comité", sla: "3-5 días", responsible: "Comité Certificación" },
  { id: "8", key: "emision_certificado", name: "Emisión Certificado", sla: "1 día", responsible: "Sistema/Admin" },
  { id: "9", key: "publicacion", name: "Publicación", sla: "1 día", responsible: "Sistema" },
  { id: "10", key: "seguimiento", name: "Seguimiento", sla: "12 meses", responsible: "Área Calidad" },
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
