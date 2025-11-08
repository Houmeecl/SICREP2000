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
    setSearchResult(null);
    setSearchWorkflow([]);
    setSearchNFCEvents([]);

    try {
      const response = await fetch(`/api/certifications?code=${searchCode}`);
      if (!response.ok) {
        throw new Error('Error al buscar certificación');
      }
      const data = await response.json();
      
      if (data.length > 0) {
        const cert = data[0];
        setSearchResult(cert);
        
        // Obtener workflow history y NFC events en paralelo
        try {
          const [workflowRes, nfcRes] = await Promise.all([
            fetch(`/api/certifications/${cert.id}/history`),
            fetch(`/api/certifications/${cert.id}/nfc-events`)
          ]);
          
          if (workflowRes.ok) {
            const workflowData = await workflowRes.json();
            setSearchWorkflow(workflowData);
          }
          
          if (nfcRes.ok) {
            const nfcData = await nfcRes.json();
            setSearchNFCEvents(nfcData);
          }
        } catch (historyError) {
          console.error("Error loading history/NFC events:", historyError);
          // Continue showing certification even if history fails
        }
      }
    } catch (error) {
      console.error("Error searching certification:", error);
      setSearchResult(null);
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

              {/* Not Found Message */}
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

          {/* Detailed Results Section */}
          {searchResult && (
            <div className="w-full max-w-6xl space-y-6 mt-8">
              {/* Verification Status Card */}
              <Card className="border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-green-600 rounded-full">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
                        ✓ Certificación Verificada
                      </h2>
                      <p className="text-green-700 dark:text-green-300 text-lg">
                        Este producto cuenta con certificación REP válida bajo Ley 20.920
                      </p>
                    </div>
                    <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                      {searchResult.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Certification Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Información de Certificación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-3">
                      <span className="text-muted-foreground">Código REP</span>
                      <span className="font-mono font-bold text-lg">{searchResult.code}</span>
                    </div>
                    <div className="flex justify-between items-start border-b pb-3">
                      <span className="text-muted-foreground">Fecha Emisión</span>
                      <span className="font-semibold">{new Date(searchResult.createdAt).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between items-start border-b pb-3">
                      <span className="text-muted-foreground">CPS Asignado</span>
                      <span className="font-semibold">{searchResult.cpsCode || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Fase Actual</span>
                      <Badge variant="outline">{searchResult.currentPhase}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Seguridad Blockchain
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-3">
                      <span className="text-muted-foreground">Hash Blockchain</span>
                      <span className="font-mono text-xs">{searchResult.blockchainHash?.substring(0, 12)}...</span>
                    </div>
                    <div className="flex justify-between items-start border-b pb-3">
                      <span className="text-muted-foreground">Tag NFC</span>
                      <span className="font-mono text-xs">{searchResult.nfcTagId || 'Pendiente'}</span>
                    </div>
                    <div className="flex justify-between items-start border-b pb-3">
                      <span className="text-muted-foreground">QR Code</span>
                      <span className="font-mono text-xs">{searchResult.qrCode?.substring(0, 12)}...</span>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm">Inmutable y verificable públicamente</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Workflow Timeline */}
              {searchWorkflow.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-primary" />
                      Historial de Certificación
                    </CardTitle>
                    <CardDescription>Timeline completo del proceso de certificación REP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                      
                      <div className="space-y-6">
                        {searchWorkflow.map((event, idx) => (
                          <div key={event.id} className="relative flex items-start gap-4">
                            {/* Timeline dot */}
                            <div className={`relative z-10 p-3 rounded-full ${
                              idx === 0 ? 'bg-primary' : 'bg-muted'
                            }`}>
                              <Calendar className={`w-4 h-4 ${
                                idx === 0 ? 'text-primary-foreground' : 'text-muted-foreground'
                              }`} />
                            </div>
                            
                            {/* Event content */}
                            <div className="flex-1 pb-6">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-lg">{event.toPhase}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(event.timestamp).toLocaleString('es-CL')}
                                  </p>
                                </div>
                                <Badge variant={idx === 0 ? "default" : "outline"}>
                                  {event.fromPhase} → {event.toPhase}
                                </Badge>
                              </div>
                              {event.notes && (
                                <p className="text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-md">
                                  {event.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* NFC Events Timeline */}
              {searchNFCEvents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scan className="w-5 h-5 text-primary" />
                      Eventos de Trazabilidad NFC
                    </CardTitle>
                    <CardDescription>Historial de escaneos y validaciones del tag NFC</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {searchNFCEvents.map((event, idx) => (
                        <div key={event.id} className="flex items-start gap-4 p-4 bg-muted rounded-lg hover-elevate">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-semibold">{event.eventType}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(event.timestamp).toLocaleString('es-CL')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <User className="w-3 h-3" />
                              <span>{event.scannedBy || 'Sistema'}</span>
                              {event.location && (
                                <>
                                  <span>•</span>
                                  <MapPin className="w-3 h-3" />
                                  <span>{event.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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
