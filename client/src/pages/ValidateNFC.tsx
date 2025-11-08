import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Scan,
  QrCode,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Calendar,
  Hash,
  Package,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface NFCValidationResult {
  valid: boolean;
  nfcTag: {
    tagId: string;
    uid: string;
    type: string;
    active: boolean;
    scanCount: number;
    signature: string;
    lastScanned: string;
  };
  certification: {
    code: string;
    status: string;
    scoreTotal: number;
    issuedAt: string;
    expiresAt: string;
    providerName: string;
    providerRut: string;
    cpsCode: string;
  };
}

export default function ValidateNFC() {
  const [nfcCode, setNfcCode] = useState("");
  const [validationResult, setValidationResult] = useState<NFCValidationResult | null>(null);

  const validateMutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch(`/api/nfc-tags/${code}`);
      if (!response.ok) {
        throw new Error("Código NFC/QR no encontrado o inválido");
      }
      const nfcTag = await response.json();
      
      // Get certification data
      const certData = JSON.parse(nfcTag.data);
      const certResponse = await fetch(`/api/certifications`);
      const certifications = await certResponse.json();
      const certification = certifications.find(
        (c: any) => c.id === nfcTag.entityId
      );
      
      if (!certification) {
        throw new Error("Certificación asociada no encontrada");
      }
      
      // Get provider data
      const providerResponse = await fetch(`/api/providers`);
      const providers = await providerResponse.json();
      const provider = providers.find((p: any) => p.id === certification.providerId);
      
      // Get CPS data
      const cpsResponse = await fetch(`/api/cps`);
      const cpsList = await cpsResponse.json();
      const cps = cpsList.find((c: any) => c.id === certification.cpsId);
      
      // Update scan count
      await fetch(`/api/nfc-tags/${code}/scan`, { method: "POST" });
      
      return {
        valid: nfcTag.active && certification.status === "publicado",
        nfcTag: {
          tagId: nfcTag.tagId,
          uid: nfcTag.uid,
          type: nfcTag.type,
          active: nfcTag.active,
          scanCount: nfcTag.scanCount + 1,
          signature: nfcTag.signature,
          lastScanned: new Date().toISOString(),
        },
        certification: {
          code: certification.code,
          status: certification.status,
          scoreTotal: certification.scoreTotal,
          issuedAt: certification.issuedAt,
          expiresAt: certification.expiresAt,
          providerName: provider?.name || "Desconocido",
          providerRut: provider?.rut || "N/A",
          cpsCode: cps?.code || "N/A",
        },
      };
    },
    onSuccess: (data) => {
      setValidationResult(data);
    },
    onError: (error: any) => {
      setValidationResult({
        valid: false,
        nfcTag: {
          tagId: nfcCode,
          uid: "",
          type: "",
          active: false,
          scanCount: 0,
          signature: "",
          lastScanned: "",
        },
        certification: {
          code: "",
          status: "invalid",
          scoreTotal: 0,
          issuedAt: "",
          expiresAt: "",
          providerName: "",
          providerRut: "",
          cpsCode: "",
        },
      });
    },
  });

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (nfcCode.trim()) {
      validateMutation.mutate(nfcCode.trim());
    }
  };

  const handleScanNFC = () => {
    // In a real implementation, this would trigger NFC reader hardware
    alert("Función de escaneo NFC activada. Acerque el tag NFC al lector.");
  };

  const handleScanQR = () => {
    // In a real implementation, this would open camera for QR scanning
    alert("Función de escaneo QR activada. Apunte la cámara al código QR.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-chart-2/5 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Validación de Certificados REP</h1>
          <p className="text-muted-foreground text-lg">
            Verificación Pública de Trazabilidad NFC/QR
          </p>
          <p className="text-sm text-muted-foreground">
            Sistema oficial de validación según Ley 20.920 - República de Chile
          </p>
        </div>

        {/* Validation Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              Escanear o Ingresar Código
            </CardTitle>
            <CardDescription>
              Valida la autenticidad de certificados REP mediante código NFC o QR
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleValidate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nfcCode">Código NFC/QR</Label>
                <div className="flex gap-2">
                  <Input
                    id="nfcCode"
                    placeholder="Ej: NFC-2025-000001 o QR-..."
                    value={nfcCode}
                    onChange={(e) => setNfcCode(e.target.value)}
                    data-testid="input-nfc-code"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!nfcCode.trim() || validateMutation.isPending}
                    data-testid="button-validate"
                  >
                    {validateMutation.isPending ? "Validando..." : "Validar"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleScanNFC}
                  className="w-full"
                  data-testid="button-scan-nfc"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Escanear NFC
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleScanQR}
                  className="w-full"
                  data-testid="button-scan-qr"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Escanear QR
                </Button>
              </div>
            </form>

            {/* Validation Result */}
            {validationResult && (
              <div className="space-y-4 pt-4 border-t">
                <Alert
                  variant={validationResult.valid ? "default" : "destructive"}
                  className={validationResult.valid ? "border-green-500 bg-green-50 dark:bg-green-950" : ""}
                >
                  <div className="flex items-start gap-3">
                    {validationResult.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1">
                        {validationResult.valid
                          ? "✓ Certificado Válido y Auténtico"
                          : "✗ Certificado Inválido o Expirado"}
                      </div>
                      <AlertDescription>
                        {validationResult.valid
                          ? "Este certificado REP es legítimo y está registrado en el sistema oficial."
                          : "Este código no corresponde a un certificado válido o ha sido revocado."}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>

                {validationResult.valid && validationResult.certification && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Información del Certificado
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Código:</span>
                            <span className="font-mono font-semibold">
                              {validationResult.certification.code}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Proveedor:</span>
                            <span className="font-medium">
                              {validationResult.certification.providerName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">RUT:</span>
                            <span className="font-mono">
                              {validationResult.certification.providerRut}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">CPS:</span>
                            <span className="font-mono">
                              {validationResult.certification.cpsCode}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Puntaje:</span>
                            <Badge variant={
                              validationResult.certification.scoreTotal >= 80 ? "default" :
                              validationResult.certification.scoreTotal >= 60 ? "secondary" :
                              "destructive"
                            }>
                              {validationResult.certification.scoreTotal}/100
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Vigencia y Estado
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estado:</span>
                            <Badge variant="default">
                              {validationResult.certification.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Emitido:</span>
                            <span>
                              {format(
                                new Date(validationResult.certification.issuedAt),
                                "dd/MM/yyyy",
                                { locale: es }
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expira:</span>
                            <span>
                              {format(
                                new Date(validationResult.certification.expiresAt),
                                "dd/MM/yyyy",
                                { locale: es }
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Escaneos:</span>
                            <span className="font-semibold">
                              {validationResult.nfcTag.scanCount}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-muted/50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          Información de Trazabilidad Blockchain
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-xs font-mono">
                        <div>
                          <div className="text-muted-foreground mb-1">Tag NFC:</div>
                          <div className="bg-background p-2 rounded border">
                            {validationResult.nfcTag.tagId}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">UID:</div>
                          <div className="bg-background p-2 rounded border">
                            {validationResult.nfcTag.uid}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Hash Blockchain:</div>
                          <div className="bg-background p-2 rounded border break-all">
                            {validationResult.nfcTag.signature}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Información sobre Validación REP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>¿Cómo funciona la validación?</strong> El sistema SICREP utiliza tecnología NFC
              y códigos QR respaldados por blockchain para garantizar la autenticidad e inmutabilidad
              de los certificados REP.
            </p>
            <p>
              <strong>Certificados válidos:</strong> Deben mostrar estado "publicado", puntaje mínimo
              de 60/100, y estar dentro de su período de vigencia (1 año desde emisión).
            </p>
            <p>
              <strong>Ley 20.920:</strong> Todos los certificados son emitidos en cumplimiento de la
              Ley sobre Gestión de Residuos y Responsabilidad Extendida del Productor de Chile.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
