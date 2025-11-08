import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, FileCheck, QrCode, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function ProveedorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Proveedor</h1>
        <p className="text-muted-foreground">Gestión de certificaciones y despachos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despachos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reciclabilidad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Generados</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/packaging">
              <Button className="w-full justify-start" data-testid="button-new-shipment">
                <Package className="h-4 w-4 mr-2" />
                Crear Nuevo Despacho
              </Button>
            </Link>
            <Link href="/shipments">
              <Button className="w-full justify-start" variant="outline" data-testid="button-view-shipments">
                <FileCheck className="h-4 w-4 mr-2" />
                Ver Mis Despachos
              </Button>
            </Link>
            <Link href="/certifications">
              <Button className="w-full justify-start" variant="outline" data-testid="button-my-certifications">
                <FileCheck className="h-4 w-4 mr-2" />
                Mis Certificaciones
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Certificación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Certificado REP Principal</p>
                  <p className="text-sm text-muted-foreground">CERT-2024-0012</p>
                </div>
                <Badge>Activo</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Vencimiento</p>
                  <p className="text-sm text-muted-foreground">30 Diciembre 2025</p>
                </div>
                <Badge variant="secondary">340 días</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Cumplimiento</p>
                  <p className="text-sm text-muted-foreground">Score general</p>
                </div>
                <div className="text-2xl font-bold text-primary">92/100</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
