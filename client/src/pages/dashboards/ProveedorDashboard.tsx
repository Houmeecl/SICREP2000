import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, FileCheck, QrCode, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";

export default function ProveedorDashboard() {
  const { user } = useAuth();

  const { data: provider } = useQuery<any>({
    queryKey: ["/api/providers/me"],
    enabled: !!user,
  });

  const { data: certifications = [] } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  const { data: allShipments = [] } = useQuery<any[]>({
    queryKey: ["/api/shipments"],
  });

  // Filter user's certifications and shipments
  const myCertifications = certifications.filter(c => c.createdBy === user?.id);
  const myShipments = provider ? allShipments.filter(s => s.providerId === provider.id) : [];
  const activeCertifications = myCertifications.filter(c => 
    c.status === 'publicado' || c.status === 'activacion_nfc' || c.status === 'emision_certificado'
  );

  // Calculate recyclability average
  const recyclabilityAvg = myCertifications.length > 0
    ? Math.round(myCertifications.reduce((sum, c) => sum + (c.scoreTotal || 0), 0) / myCertifications.length)
    : 0;

  // Count QR codes
  const qrCodeCount = myCertifications.filter(c => c.qrCode).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Proveedor</h1>
        <p className="text-muted-foreground">Gestión de certificaciones y despachos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despachos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myShipments.length}</div>
            <p className="text-xs text-muted-foreground">Mis despachos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCertifications.length}</div>
            <p className="text-xs text-muted-foreground">Activos de {myCertifications.length} totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recyclabilityAvg}/100</div>
            <p className="text-xs text-muted-foreground">Promedio certificaciones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Generados</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{qrCodeCount}</div>
            <p className="text-xs text-muted-foreground">Total con QR</p>
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
            <CardTitle>Últimas Certificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            {myCertifications.length > 0 ? (
              <div className="space-y-3">
                {myCertifications.slice(0, 5).map((cert: any) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg hover-elevate">
                    <div>
                      <p className="font-medium">{cert.code}</p>
                      <p className="text-sm text-muted-foreground">
                        {cert.currentPhase ? cert.currentPhase.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Sin fase'}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={cert.status === 'publicado' ? 'default' : 'secondary'}>
                        {cert.status === 'publicado' ? 'Activo' : cert.status}
                      </Badge>
                      {cert.scoreTotal > 0 && (
                        <div className="text-sm font-bold text-primary mt-1">{cert.scoreTotal}/100</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tienes certificaciones aún</p>
                <Link href="/packaging">
                  <Button size="sm" className="mt-4">
                    Crear Primera Certificación
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
