import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, Leaf, Shield, TrendingUp, QrCode, Scan, Package, Award, Lock, GitBranch, Calendar, MapPin, User } from "lucide-react";
import pasaporteDigitalLogo from "@assets/ChatGPT Image 5 nov 2025, 11_44_49 p.m._1762632997486.png";
import { useQuery } from "@tanstack/react-query";

export default function TraceabilityLanding() {
  const [searchCode, setSearchCode] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchWorkflow, setSearchWorkflow] = useState<any[]>([]);
  const [searchNFCEvents, setSearchNFCEvents] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchCode.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`/api/certifications?code=${searchCode}`);
      const data = await response.json();
      
      if (data.length > 0) {
        const cert = data[0];
        setSearchResult(cert);
        
        // Obtener workflow history
        const workflowRes = await fetch(`/api/workflow-history?certificationId=${cert.id}`);
        const workflowData = await workflowRes.json();
        setSearchWorkflow(workflowData);
        
        // Obtener eventos NFC
        const nfcRes = await fetch(`/api/nfc-events?certificationId=${cert.id}`);
        const nfcData = await nfcRes.json();
        setSearchNFCEvents(nfcData);
      } else {
        setSearchResult(null);
        setSearchWorkflow([]);
        setSearchNFCEvents([]);
      }
    } catch (error) {
      console.error("Error searching certification:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="w-full max-w-2xl">
            <img 
              src={pasaporteDigitalLogo} 
              alt="Pasaporte Digital REP" 
              className="w-full h-auto"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              SISTEMA DE CERTIFICACIÓN LEY REP PARA CUMPLIR INDUSTRIA MINERA Y ENERGÍA
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental. Sistema completo de certificación de envases y embalajes. Proveedor Productor -300kg
            </p>
          </div>

          {/* Search Card */}
          <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <QrCode className="h-6 w-6 text-green-600" />
                Verificar Certificación
              </CardTitle>
              <CardDescription>
                Ingresa el código de certificación o escanea el código QR/NFC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Ejemplo: CERT-CL-2025-000001"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 text-lg"
                  data-testid="input-search-code"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !searchCode.trim()}
                  size="lg"
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5 mr-2" />
                  {isSearching ? "Buscando..." : "Verificar"}
                </Button>
              </div>

              {/* Alternative Methods */}
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Scan className="h-4 w-4" />
                  <span>Escaneo NFC</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <span>Código QR</span>
                </div>
              </div>

              {/* Search Result */}
              {searchResult && (
                <div className="mt-6 p-6 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-500">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                          ✓ Certificación Verificada
                        </h3>
                        <p className="text-green-700 dark:text-green-300">
                          Este producto cuenta con certificación REP válida
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Código</div>
                          <div className="font-bold">{searchResult.code}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Estado</div>
                          <Badge variant="default" className="bg-green-600">
                            {searchResult.status}
                          </Badge>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Fecha Certificación</div>
                          <div className="font-semibold">
                            {new Date(searchResult.createdAt).toLocaleDateString('es-CL')}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Blockchain</div>
                          <div className="font-mono text-xs truncate">
                            {searchResult.blockchainHash?.substring(0, 20)}...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {searchResult === null && searchCode && !isSearching && (
                <div className="mt-6 p-6 bg-red-50 dark:bg-red-950 rounded-lg border-2 border-red-500">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                      Certificación No Encontrada
                    </h3>
                    <p className="text-red-700 dark:text-red-300">
                      No se encontró una certificación con el código ingresado
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="w-full max-w-5xl mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tecnología, Trazabilidad y Sostenibilidad
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover-elevate">
                <CardHeader>
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Seguridad Blockchain</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Cada certificación está respaldada por tecnología blockchain para garantizar inmutabilidad y transparencia
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover-elevate">
                <CardHeader>
                  <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Impacto Ambiental</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Métricas reales de huella de carbono, agua conservada y energía ahorrada con estándares Copper Mark
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover-elevate">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Cumplimiento Ley 20.920</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Certificaciones oficiales que cumplen con todos los requisitos legales de responsabilidad extendida del productor
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center text-muted-foreground">
            <p className="text-sm">
              Sistema SICREP - Plataforma de Certificación REP para Chile
            </p>
            <p className="text-xs mt-2">
              Powered by PasaporteDigitalREP © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
