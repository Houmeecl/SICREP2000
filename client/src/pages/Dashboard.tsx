import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { getDashboardForRole } from "@/lib/role-routing";
import DashboardStats from "@/components/DashboardStats";
import CertificationWorkflow from "@/components/CertificationWorkflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, FileText, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirigir automáticamente al dashboard específico según el rol
  useEffect(() => {
    if (user) {
      const specificDashboard = getDashboardForRole(user.role);
      if (specificDashboard !== "/dashboard") {
        setLocation(specificDashboard);
      }
    }
  }, [user, setLocation]);
  const { data: activities = [] } = useQuery<any[]>({
    queryKey: ["/api/activity"],
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "Certificación":
        return <FileText className="w-4 h-4" />;
      case "Alerta":
        return <Bell className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-primary/10 text-primary";
      case "warning":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-chart-2/10 text-chart-2";
    }
  };

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
            {activities.length > 0 ? (
              <div className="space-y-3">
                {activities.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-md border hover-elevate"
                    data-testid={`activity-${activity.id}`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getActivityColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.createdAt).toLocaleString('es-CL')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay actividad reciente
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
