import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, QrCode, BarChart3 } from "lucide-react";
import { Link } from "wouter";

export default function ViewerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Visualización</h1>
        <p className="text-muted-foreground">Consulta de información y reportes (solo lectura)</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificaciones Totales</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Emitidas a la fecha</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores Activos</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Con certificados vigentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Disponibles</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Para descarga</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Opciones de Consulta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/certifications">
            <Button className="w-full justify-start" variant="outline" data-testid="button-view-certifications">
              <FileText className="h-4 w-4 mr-2" />
              Ver Certificaciones
            </Button>
          </Link>
          <Link href="/providers">
            <Button className="w-full justify-start" variant="outline" data-testid="button-view-providers">
              <Eye className="h-4 w-4 mr-2" />
              Consultar Proveedores
            </Button>
          </Link>
          <Link href="/validate">
            <Button className="w-full justify-start" variant="outline" data-testid="button-validate-qr">
              <QrCode className="h-4 w-4 mr-2" />
              Validar Código QR
            </Button>
          </Link>
          <Link href="/esg">
            <Button className="w-full justify-start" variant="outline" data-testid="button-view-reports">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Reportes ESG
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
