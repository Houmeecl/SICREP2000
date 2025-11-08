import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Target, TrendingUp } from "lucide-react";

export default function SupervisorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Supervisor</h1>
        <p className="text-muted-foreground">Supervisión y control de calidad</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipo Supervisado</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Técnicos e inspectores</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actividades Hoy</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">En curso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento Meta</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productividad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">Vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento del Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Inspecciones Completadas</p>
                  <p className="text-sm text-muted-foreground">Última semana</p>
                </div>
                <div className="text-2xl font-bold">87</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Calidad Promedio</p>
                  <p className="text-sm text-muted-foreground">Evaluaciones</p>
                </div>
                <div className="text-2xl font-bold text-primary">9.2/10</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Tiempo de Respuesta</p>
                  <p className="text-sm text-muted-foreground">Promedio</p>
                </div>
                <div className="text-2xl font-bold">2.3h</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas y Notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-destructive/5">
                <div>
                  <p className="font-medium">Inspección atrasada</p>
                  <p className="text-sm text-muted-foreground">Inspector: Juan Pérez</p>
                </div>
                <span className="text-destructive font-medium">Urgente</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Solicitud de apoyo</p>
                  <p className="text-sm text-muted-foreground">Técnico: María González</p>
                </div>
                <span className="text-muted-foreground font-medium">Normal</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                <div>
                  <p className="font-medium">Meta mensual alcanzada</p>
                  <p className="text-sm text-muted-foreground">Equipo completo</p>
                </div>
                <span className="text-primary font-medium">Positivo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
