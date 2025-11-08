import DashboardStats from "@/components/DashboardStats";
import CertificationWorkflow from "@/components/CertificationWorkflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, FileText, TrendingUp } from "lucide-react";

export default function Dashboard() {
  //todo: remove mock functionality
  const recentActivity = [
    { id: "1", type: "Certificación", title: "CERT-CL-2025-000127 aprobada", time: "Hace 2 horas", status: "success" },
    { id: "2", type: "Alerta", title: "Proveedor Packaging Industrial cerca del límite", time: "Hace 3 horas", status: "warning" },
    { id: "3", type: "NFC", title: "Nuevo escaneo en Faena Escondida", time: "Hace 5 horas", status: "info" },
    { id: "4", type: "Evaluación", title: "Evaluación documentos en curso CPS-2025-042", time: "Hace 6 horas", status: "info" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen de actividad del sistema SICREP</p>
        </div>
        <Button size="sm" variant="outline" data-testid="button-notifications">
          <Bell className="w-4 h-4 mr-2" />
          Notificaciones
          <Badge variant="destructive" className="ml-2">3</Badge>
        </Button>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <CertificationWorkflow />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-md border hover-elevate"
                  data-testid={`activity-${activity.id}`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    activity.status === "success" ? "bg-primary/10 text-primary" :
                    activity.status === "warning" ? "bg-destructive/10 text-destructive" :
                    "bg-chart-2/10 text-chart-2"
                  }`}>
                    {activity.status === "success" ? <FileText className="w-4 h-4" /> :
                     activity.status === "warning" ? <Bell className="w-4 h-4" /> :
                     <TrendingUp className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
