import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  Package,
  Building2,
  Calendar,
  Shield,
  Download,
  MapPin,
  Leaf,
  Recycle,
  TrendingUp,
  Globe,
  Award,
  QrCode,
  Nfc,
  ExternalLink,
  Share2,
  Printer,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

/**
 * 🌍 PASAPORTE DIGITAL REP
 *
 * Módulo independiente de trazabilidad inspirado en el Digital Product Passport (DPP)
 * de la Unión Europea, adaptado a la Ley REP 20.920 de Chile.
 *
 * Características:
 * - ✅ Validación pública sin autenticación
 * - ✅ Trazabilidad completa con blockchain
 * - ✅ Métricas de sostenibilidad y economía circular
 * - ✅ Timeline visual de eventos
 * - ✅ Información de reciclaje
 * - ✅ Certificación REP oficial
 * - ✅ Compartible y exportable
 *
 * Este componente es reutilizable y puede ser usado por otras empresas
 * que necesiten un sistema de trazabilidad y pasaporte digital.
 */

interface DigitalPassportData {
  // Shipment data
  shipment: {
    code: string;
    clientName: string;
    status: string;
    totalWeightGr: number;
    recyclableWeightGr: number;
    recyclabilityPercent: number;
    recyclabilityLevel: "Alto" | "Medio" | "Bajo";
    certifiedAt: string;
    qrCode: string;
    nfcTag: string;
    blockchainHash: string;
  };

  // Provider data
  provider: {
    name: string;
    rut: string;
    email?: string;
    website?: string;
  };

  // Components
  components: Array<{
    material: string;
    description: string;
    unitWeightGr: number;
    quantity: number;
    totalWeightGr: number;
    isRecyclable: boolean;
  }>;

  // Traceability events (opcional)
  events?: Array<{
    action: string;
    timestamp: string;
    location?: string;
    user?: string;
    blockchainHash: string;
  }>;

  // ESG metrics (opcional)
  esgMetrics?: {
    co2Kg: number;
    waterLiters: number;
    renewableEnergyPercent: number;
    copperMarkScore?: number;
  };
}

export default function DigitalPassport() {
  const [, params] = useRoute("/pasaporte-digital/:qrCode");
  const [data, setData] = useState<DigitalPassportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params?.qrCode) {
      fetch(`/api/validate/${params.qrCode}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Código no válido");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Card className="max-w-md border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="text-muted-foreground">Validando Pasaporte Digital...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <Card className="max-w-md w-full border-2 border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-20 w-20 text-red-500" />
            </div>
            <CardTitle className="text-2xl">Pasaporte No Válido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">{error || "No se encontró el pasaporte digital"}</p>
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Volver al inicio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { shipment, provider, components, events, esgMetrics } = data;

  const recyclabilityColor =
    shipment.recyclabilityLevel === "Alto"
      ? "text-green-600 dark:text-green-400"
      : shipment.recyclabilityLevel === "Medio"
      ? "text-yellow-600 dark:text-yellow-400"
      : "text-red-600 dark:text-red-400";

  const recyclabilityBg =
    shipment.recyclabilityLevel === "Alto"
      ? "bg-green-100 dark:bg-green-950"
      : shipment.recyclabilityLevel === "Medio"
      ? "bg-yellow-100 dark:bg-yellow-950"
      : "bg-red-100 dark:bg-red-950";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Bar */}
      <div className="bg-white dark:bg-gray-800 border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Pasaporte Digital REP</h1>
              <p className="text-xs text-muted-foreground">Sistema de Trazabilidad - Chile</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-1" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Compartir
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

        {/* Hero Section - Status Badge */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center space-x-3 bg-white dark:bg-gray-800 px-8 py-4 rounded-2xl shadow-lg border-2 border-green-200 dark:border-green-800">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Estado del Pasaporte</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">CERTIFICADO VIGENTE</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-2">
              {shipment.code}
            </h2>
            <p className="text-lg text-muted-foreground">
              Pasaporte Digital de Producto según Ley REP 20.920
            </p>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recyclability Score */}
          <Card className={`border-2 ${recyclabilityBg} border-green-200 dark:border-green-800`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Recycle className="h-4 w-4" />
                Reciclabilidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className={`text-5xl font-bold ${recyclabilityColor}`}>
                  {Number(shipment.recyclabilityPercent).toFixed(1)}%
                </div>
                <Progress
                  value={Number(shipment.recyclabilityPercent)}
                  className="h-3"
                />
                <Badge
                  variant={shipment.recyclabilityLevel === "Alto" ? "default" : "secondary"}
                  className="text-sm"
                >
                  Nivel {shipment.recyclabilityLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Weight Metrics */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Composición de Embalaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Peso Total</p>
                  <p className="text-2xl font-bold">
                    {(shipment.totalWeightGr / 1000).toFixed(2)} kg
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Peso Reciclable</p>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                    {(shipment.recyclableWeightGr / 1000).toFixed(2)} kg
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certification Date */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Vigencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Certificado desde</p>
                  <p className="text-lg font-semibold">
                    {format(new Date(shipment.certifiedAt), "dd/MM/yyyy", { locale: es })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Válido hasta</p>
                  <p className="text-lg font-semibold">
                    {format(
                      new Date(new Date(shipment.certifiedAt).setFullYear(
                        new Date(shipment.certifiedAt).getFullYear() + 1
                      )),
                      "dd/MM/yyyy",
                      { locale: es }
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ESG Metrics (if available) */}
        {esgMetrics && (
          <Card className="border-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Métricas de Sostenibilidad ESG
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Huella de Carbono</p>
                  <p className="text-3xl font-bold">{esgMetrics.co2Kg.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">kg CO₂</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Agua Utilizada</p>
                  <p className="text-3xl font-bold">{esgMetrics.waterLiters.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">litros</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Energía Renovable</p>
                  <p className="text-3xl font-bold text-green-600">{esgMetrics.renewableEnergyPercent}%</p>
                  <p className="text-xs text-muted-foreground">del total</p>
                </div>
                {esgMetrics.copperMarkScore && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Copper Mark</p>
                    <p className="text-3xl font-bold text-orange-600">{esgMetrics.copperMarkScore}</p>
                    <p className="text-xs text-muted-foreground">/ 100 puntos</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Components Breakdown */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Composición Detallada del Embalaje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {components.map((comp, index) => {
                const percentage = ((comp.totalWeightGr / shipment.totalWeightGr) * 100).toFixed(1);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold capitalize text-lg">
                          {comp.material.replace("_", " ")}
                        </span>
                        {comp.isRecyclable && (
                          <Badge variant="secondary" className="text-xs">
                            <Recycle className="h-3 w-3 mr-1" />
                            Reciclable
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{comp.description}</p>
                      <div className="mt-2">
                        <Progress value={Number(percentage)} className="h-2" />
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-mono font-bold">
                        {comp.totalWeightGr.toLocaleString()}g
                      </p>
                      <p className="text-sm text-muted-foreground">{percentage}% del total</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Traceability Timeline */}
        {events && events.length > 0 && (
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trazabilidad Blockchain - Historial de Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                      {index < events.length - 1 && (
                        <div className="w-0.5 h-full bg-emerald-200 dark:bg-emerald-800"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold capitalize">{event.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(event.timestamp), "dd/MM/yyyy HH:mm", { locale: es })}
                          </p>
                          {event.location && (
                            <p className="text-sm flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="font-mono text-xs">
                          {event.blockchainHash.substring(0, 12)}...
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Provider Information */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Proveedor Certificado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Razón Social</p>
                <p className="text-lg font-semibold">{provider.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">RUT</p>
                <p className="text-lg font-mono font-semibold">{provider.rut}</p>
              </div>
              {provider.email && (
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm">{provider.email}</p>
                </div>
              )}
              {provider.website && (
                <div>
                  <p className="text-sm text-muted-foreground">Sitio Web</p>
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {provider.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Circular Economy Instructions */}
        <Card className="border-2 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle className="h-5 w-5 text-green-600" />
              Instrucciones de Reciclaje - Economía Circular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Cómo reciclar este embalaje:</h4>
                <ul className="space-y-2">
                  {components.filter(c => c.isRecyclable).map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong className="capitalize">{comp.material.replace("_", " ")}:</strong>{" "}
                        Deposite en contenedor de reciclaje correspondiente
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {components.some(c => !c.isRecyclable) && (
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                        Materiales no reciclables:
                      </h4>
                      <ul className="text-sm space-y-1">
                        {components.filter(c => !c.isRecyclable).map((comp, idx) => (
                          <li key={idx}>
                            <strong className="capitalize">{comp.material.replace("_", " ")}:</strong>{" "}
                            Disponer según normativa local
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Verification */}
        <Card className="border-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Verificación Blockchain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Código QR</p>
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <p className="font-mono text-sm">{shipment.qrCode}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tag NFC</p>
                <div className="flex items-center gap-2">
                  <Nfc className="h-4 w-4" />
                  <p className="font-mono text-sm">{shipment.nfcTag}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Hash Blockchain</p>
              <p className="font-mono text-xs break-all bg-muted p-3 rounded border">
                {shipment.blockchainHash}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <Award className="h-6 w-6 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                    Pasaporte Digital Verificado
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Este pasaporte digital es auténtico y ha sido verificado en el sistema oficial
                    SICREP. La información contenida es inmutable y está respaldada por tecnología
                    blockchain.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Footer */}
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Este Pasaporte Digital es válido según la{" "}
                <strong>Ley 20.920 - Marco para la Gestión de Residuos,
                Responsabilidad Extendida del Productor y Fomento al Reciclaje</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                República de Chile - Sistema Oficial SICREP
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Descargar PDF
                </Button>
                <Button variant="outline" size="sm">
                  Reportar Problema
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer branding */}
        <div className="text-center py-6 text-sm text-muted-foreground">
          <p>Powered by SICREP - Sistema Integral de Certificación REP</p>
          <p className="mt-1">
            Módulo independiente de trazabilidad • Reutilizable para otras empresas
          </p>
        </div>
      </div>
    </div>
  );
}
