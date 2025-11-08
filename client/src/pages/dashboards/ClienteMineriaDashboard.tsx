import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, Shield, FileText } from "lucide-react";
import { Link } from "wouter";

export default function ClienteMineriaDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel Cliente Minería</h1>
        <p className="text-muted-foreground">Seguimiento de proveedores y métricas ESG</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores Certificados</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">De 22 total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recepciones</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reciclabilidad Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+3% vs trimestre anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes ESG</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Disponibles</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones Disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/validate">
            <Button className="w-full justify-start" data-testid="button-validate-qr">
              <Package className="h-4 w-4 mr-2" />
              Validar QR de Despacho
            </Button>
          </Link>
          <Link href="/providers">
            <Button className="w-full justify-start" variant="outline" data-testid="button-view-providers">
              <Shield className="h-4 w-4 mr-2" />
              Ver Proveedores Certificados
            </Button>
          </Link>
          <Link href="/esg">
            <Button className="w-full justify-start" variant="outline" data-testid="button-esg-reports">
              <TrendingUp className="h-4 w-4 mr-2" />
              Reportes ESG
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
