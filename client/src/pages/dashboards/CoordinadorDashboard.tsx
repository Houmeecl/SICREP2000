import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, CheckSquare, Clock } from "lucide-react";

export default function CoordinadorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Coordinador</h1>
        <p className="text-muted-foreground">Coordinación de actividades y equipos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tareas Activas</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Asignadas a equipo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipo</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Miembros activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Entregas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2d</div>
            <p className="text-xs text-muted-foreground">Por tarea</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividades de la Semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { day: "Lunes", tasks: 8, completed: 6 },
              { day: "Martes", tasks: 10, completed: 7 },
              { day: "Miércoles", tasks: 12, completed: 9 },
              { day: "Jueves", tasks: 7, completed: 4 },
              { day: "Viernes", tasks: 9, completed: 2 },
            ].map((day) => (
              <div key={day.day} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{day.day}</p>
                  <p className="text-sm text-muted-foreground">{day.tasks} tareas asignadas</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{day.completed}/{day.tasks}</p>
                  <p className="text-xs text-muted-foreground">Completadas</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
