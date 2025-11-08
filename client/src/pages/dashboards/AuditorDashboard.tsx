import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSearch, CheckSquare, AlertCircle, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AuditorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Auditor</h1>
        <p className="text-muted-foreground">Auditoría y verificación de cumplimiento</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auditorías Programadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Este trimestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No Conformidades</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Abiertas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auditorías Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 1, provider: "Empaques Industrial Ltda.", date: "15 Nov 2025", type: "Anual" },
              { id: 2, provider: "Plásticos Chile S.A.", date: "20 Nov 2025", type: "Seguimiento" },
              { id: 3, provider: "Cartones del Sur", date: "25 Nov 2025", type: "Renovación" },
            ].map((audit) => (
              <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg hover-elevate">
                <div className="flex items-center gap-4">
                  <FileSearch className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{audit.provider}</p>
                    <p className="text-sm text-muted-foreground">Fecha: {audit.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{audit.type}</Badge>
                  <Button size="sm" data-testid={`button-audit-${audit.id}`}>
                    Iniciar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
