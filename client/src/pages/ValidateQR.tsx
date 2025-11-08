import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Package, Building2, Calendar, Shield, Download } from "lucide-react";
import { generateCertificatePDF } from "@/lib/pdf-generator";

export default function ValidateQR() {
  const [, params] = useRoute("/validate/:qrCode");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.qrCode) {
      fetch(`/api/validate/${params.qrCode}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Código QR no válido");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [params?.qrCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Validando certificado...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Certificado No Válido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { shipment, provider, components } = data;
  const recyclabilityColor =
    shipment.recyclabilityLevel === "Alto"
      ? "text-green-600"
      : shipment.recyclabilityLevel === "Medio"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-20 w-20 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Certificado Válido</h1>
          <p className="text-lg text-muted-foreground">
            Sistema Integrado de Certificación REP - Chile
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Información del Despacho
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Código de Despacho</p>
                <p className="text-lg font-mono font-bold" data-testid="text-shipment-code">
                  {shipment.code}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="font-semibold" data-testid="text-client-name">
                  {shipment.clientName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge variant="default" data-testid="badge-status">
                  {shipment.status === "certified" ? "Certificado" : shipment.status}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Fecha de Certificación</p>
                <p className="text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {shipment.certifiedAt
                    ? new Date(shipment.certifiedAt).toLocaleDateString("es-CL")
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Métricas de Embalaje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Peso Total</p>
                <p className="text-3xl font-bold" data-testid="text-total-weight-display">
                  {Number(shipment.totalWeightGr).toLocaleString()}
                  <span className="text-lg text-muted-foreground ml-1">g</span>
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Peso Reciclable</p>
                <p className="text-3xl font-bold text-green-600" data-testid="text-recyclable-weight-display">
                  {Number(shipment.recyclableWeightGr).toLocaleString()}
                  <span className="text-lg text-muted-foreground ml-1">g</span>
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Reciclabilidad</p>
                <div className="space-y-2">
                  <p className={`text-3xl font-bold ${recyclabilityColor}`} data-testid="text-recyclability-display">
                    {Number(shipment.recyclabilityPercent).toFixed(1)}%
                  </p>
                  <Badge
                    variant={
                      shipment.recyclabilityLevel === "Alto"
                        ? "default"
                        : shipment.recyclabilityLevel === "Medio"
                        ? "secondary"
                        : "destructive"
                    }
                    data-testid="badge-recyclability-display"
                  >
                    Nivel {shipment.recyclabilityLevel}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Proveedor Certificado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="font-semibold" data-testid="text-provider-name">
                  {provider.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">RUT</p>
                <p className="font-mono" data-testid="text-provider-rut">
                  {provider.rut}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Componentes de Embalaje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {components.map((comp: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  data-testid={`component-display-${index}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold capitalize">
                        {comp.material.replace("_", " ")}
                      </span>
                      {comp.isRecyclable && (
                        <Badge variant="secondary" className="text-xs">
                          Reciclable
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{comp.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-semibold">
                      {comp.totalWeightGr.toLocaleString()}g
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trazabilidad Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hash de Blockchain</p>
                <p className="text-xs font-mono break-all bg-muted p-2 rounded" data-testid="text-blockchain-hash">
                  {shipment.blockchainHash}
                </p>
              </div>
              {shipment.nfcTag && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tag NFC</p>
                  <p className="text-sm font-mono" data-testid="text-nfc-tag">
                    {shipment.nfcTag}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={async () => {
                try {
                  const qrResponse = await fetch(`/api/shipments/${shipment.code}/qr-image`);
                  const qrData = await qrResponse.json();
                  generateCertificatePDF(shipment, provider, components, qrData.qrCodeDataUrl);
                } catch (error) {
                  console.error("Error generating PDF:", error);
                }
              }}
              className="w-full"
              size="lg"
              data-testid="button-download-pdf"
            >
              <Download className="h-5 w-5 mr-2" />
              Descargar Certificado PDF
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground py-8">
          <p>Este certificado es válido y ha sido verificado en el sistema SICREP</p>
          <p className="mt-2">
            Ley 20.920 - Marco para la Gestión de Residuos, Responsabilidad Extendida del
            Productor y Fomento al Reciclaje
          </p>
        </div>
      </div>
    </div>
  );
}
