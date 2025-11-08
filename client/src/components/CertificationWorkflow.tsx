import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Play } from "lucide-react";

interface WorkflowPhase {
  id: string;
  name: string;
  status: "completed" | "in-progress" | "pending" | "delayed";
  sla: string;
  responsible: string;
  progress?: number;
}

export default function CertificationWorkflow() {
  //todo: remove mock functionality
  const phases: WorkflowPhase[] = [
    { id: "1", name: "Solicitud Inicial", status: "completed", sla: "24h", responsible: "Cliente Minería", progress: 100 },
    { id: "2", name: "Asignación CPS", status: "completed", sla: "48h", responsible: "Admin", progress: 100 },
    { id: "3", name: "Evaluación Documentos", status: "in-progress", sla: "72h", responsible: "Evaluador", progress: 65 },
    { id: "4", name: "Evaluación Operativa", status: "pending", sla: "96h", responsible: "Auditor" },
    { id: "5", name: "Evaluación Valor Agregado", status: "pending", sla: "48h", responsible: "Comité" },
    { id: "6", name: "Revisión Final", status: "pending", sla: "24h", responsible: "Gerente General" },
    { id: "7", name: "Emisión Certificado", status: "pending", sla: "12h", responsible: "Sistema" },
    { id: "8", name: "Activación NFC", status: "pending", sla: "6h", responsible: "Sistema" },
    { id: "9", name: "Publicación", status: "pending", sla: "1h", responsible: "Sistema" },
    { id: "10", name: "Monitoreo Continuo", status: "pending", sla: "Continuo", responsible: "Sistema" },
  ];

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
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-mono">SLA: {phase.sla}</span>
                  <span>•</span>
                  <span>{phase.responsible}</span>
                </div>
                {phase.progress !== undefined && (
                  <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              <Badge variant={getStatusBadge(phase.status)}>
                {phase.status === "in-progress" ? "En Progreso" : 
                 phase.status === "completed" ? "Completado" :
                 phase.status === "delayed" ? "Retrasado" : "Pendiente"}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button size="sm" data-testid="button-advance-workflow">
            Avanzar Fase
          </Button>
          <Button size="sm" variant="outline" data-testid="button-view-history">
            Ver Historial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
