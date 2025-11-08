import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package2, FileText, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function CPSDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel CPS (Catálogo Productos y Servicios)</h1>
        <p className="text-muted-foreground">Gestión del catálogo de productos certificables</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos en Catálogo</CardTitle>
            <Package2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">Activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Este Mes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">43</div>
            <p className="text-xs text-muted-foreground">Pendientes revisión</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proveedores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Con productos certificados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crecimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">Vs trimestre anterior</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acciones del Catálogo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/cps">
            <Button className="w-full justify-start" data-testid="button-manage-catalog">
              <Package2 className="h-4 w-4 mr-2" />
              Gestionar Catálogo CPS
            </Button>
          </Link>
          <Button className="w-full justify-start" variant="outline" data-testid="button-review-products">
            <FileText className="h-4 w-4 mr-2" />
            Revisar Productos Pendientes
          </Button>
          <Button className="w-full justify-start" variant="outline" data-testid="button-update-specifications">
            <Package2 className="h-4 w-4 mr-2" />
            Actualizar Especificaciones
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
