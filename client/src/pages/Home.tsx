import { useState } from "react";
import LandingHero from "@/components/LandingHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Leaf, Zap, Users, CheckCircle, ArrowRight, Calculator, QrCode, Truck, Building2, PackageCheck, Blocks, AlertTriangle, Award } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const [kgPerYear, setKgPerYear] = useState([150]);
  const [selectedClient, setSelectedClient] = useState("BHP Escondida");
  const [orderNumber, setOrderNumber] = useState("");
  const [qrGenerated, setQrGenerated] = useState(false);
  const [qrValidated, setQrValidated] = useState(false);

  const isUnder300 = kgPerYear[0] < 300;
  const riskLevel = kgPerYear[0] < 100 ? "Bajo" : kgPerYear[0] < 200 ? "Medio" : "Alto";
  const fineUTA = kgPerYear[0] < 100 ? 500 : kgPerYear[0] < 200 ? 1500 : 3000;
  const fineCLP = (fineUTA * 831180).toLocaleString('es-CL');

  return (
    <div className="min-h-screen">
      <LandingHero />
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué SICREP?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La plataforma más completa para certificación REP bajo Ley 20.920, 
            especializada en la industria minera y energía chilena.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Certificación Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sistema 100% alineado con Ley 20.920 y normativa ambiental chilena
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-chart-3 mb-2" />
              <CardTitle>Trazabilidad NFC</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seguimiento inmutable con blockchain y verificación instantánea por QR/NFC
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-chart-2 mb-2" />
              <CardTitle>15 Roles de Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Workflow completo para todos los actores del proceso de certificación
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Leaf className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Métricas ESG</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Reportes completos de impacto ambiental y sostenibilidad para minería y energía
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 rounded-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Sistema de 100 Puntos</h3>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-md">
                <div className="text-3xl font-bold text-primary mb-1">40 pts</div>
                <div className="text-sm font-medium">Documentales</div>
              </div>
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-md">
                <div className="text-3xl font-bold text-chart-2 mb-1">40 pts</div>
                <div className="text-sm font-medium">Operativos</div>
              </div>
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-md">
                <div className="text-3xl font-bold text-chart-3 mb-1">20 pts</div>
                <div className="text-sm font-medium">Valor Agregado</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Evaluación integral con tres pilares complementarios para garantizar cumplimiento total
            </p>
          </div>
        </div>
        
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Flujo de Certificación en 10 Fases</CardTitle>
            <CardDescription>
              Proceso completo desde solicitud hasta monitoreo continuo con SLA definidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Solicitud Inicial",
                "Asignación CPS",
                "Eval. Documentos",
                "Eval. Operativa",
                "Eval. Valor Agregado",
                "Revisión Final",
                "Emisión Certificado",
                "Activación NFC",
                "Publicación",
                "Monitoreo Continuo"
              ].map((phase, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium">{phase}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-card border rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Precios Transparentes</h3>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-6">
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">15 UF</div>
              <div className="font-medium mb-2">Certificación Inicial</div>
              <div className="text-sm text-muted-foreground">Pago único por certificado</div>
            </div>
            <div className="p-6 rounded-lg bg-chart-2/5 border border-chart-2/20">
              <div className="text-4xl font-bold text-chart-2 mb-2">5 UF/mes</div>
              <div className="font-medium mb-2">Acceso Plataforma</div>
              <div className="text-sm text-muted-foreground">Trazabilidad y reportes</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/solicitar-certificacion">
              <Button size="lg" data-testid="button-start-certification">
                Iniciar Certificación
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" data-testid="button-contact-sales">
              Contactar Ventas
            </Button>
          </div>
        </div>

        {/* Calculadora de Cumplimiento REP */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Calculator className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Calculadora de Cumplimiento REP</CardTitle>
            <CardDescription>
              Descubre tus obligaciones según la cantidad de embalajes que introduces al mercado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Cantidad de embalajes por año</Label>
                <Badge variant="secondary" className="text-lg font-bold">
                  {kgPerYear[0]} kg/año
                </Badge>
              </div>
              <Slider
                value={kgPerYear}
                onValueChange={setKgPerYear}
                max={500}
                step={10}
                className="w-full"
                data-testid="slider-kg-per-year"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 kg</span>
                <span className="font-medium text-primary">300 kg (límite)</span>
                <span>500 kg</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className={isUnder300 ? "border-chart-2" : "border-destructive"}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    {isUnder300 ? (
                      <CheckCircle className="w-4 h-4 text-chart-2" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                    )}
                    Categoría
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {isUnder300 ? "< 300 kg" : "> 300 kg"}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isUnder300
                      ? "Exento de metas de reciclaje"
                      : "Debe cumplir metas de recolección"}
                  </p>
                </CardContent>
              </Card>

              <Card className={riskLevel === "Bajo" ? "border-chart-2" : riskLevel === "Medio" ? "border-chart-3" : "border-destructive"}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${riskLevel === "Bajo" ? "text-chart-2" : riskLevel === "Medio" ? "text-chart-3" : "text-destructive"}`} />
                    Riesgo de Multa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{riskLevel}</div>
                  <p className="text-sm text-muted-foreground">
                    Hasta {fineUTA.toLocaleString('es-CL')} UTA
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Tus Obligaciones REP
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Declaración RETC anual</strong> - Antes del 31 de mayo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Información peso y materialidad exacta</strong> por tipo de embalaje</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Trazabilidad documentada</strong> - Registros por 7 años</span>
                </li>
                {isUnder300 && (
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                    <span><strong>Certificación para clientes mineros</strong> - The Copper Mark 2026</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-chart-2/10 rounded-lg p-6 text-center">
              <h4 className="font-bold text-lg mb-2">💰 Multa Potencial por Incumplimiento</h4>
              <div className="text-4xl font-bold text-destructive mb-2">
                ${fineCLP}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {fineUTA.toLocaleString('es-CL')} UTA por no declarar RETC o información falsa
              </p>
              <Link href="/certifications">
                <Button size="lg" data-testid="button-start-from-calculator">
                  <Award className="w-4 h-4 mr-2" />
                  Certificarme con SICREP
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Interactivo de Trazabilidad NFC/QR */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <QrCode className="w-12 h-12 text-chart-3" />
            </div>
            <CardTitle className="text-2xl">Demo Trazabilidad NFC/QR</CardTitle>
            <CardDescription>
              Simula el flujo completo de certificación digital de tus despachos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="generate" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generate" data-testid="tab-generate-qr">
                  1. Generar QR
                </TabsTrigger>
                <TabsTrigger value="label" disabled={!qrGenerated} data-testid="tab-view-label">
                  2. Ver Etiqueta
                </TabsTrigger>
                <TabsTrigger value="validate" disabled={!qrGenerated} data-testid="tab-validate-qr">
                  3. Validar QR
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-4 mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-select">Cliente Minero</Label>
                    <select
                      id="client-select"
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      data-testid="select-client"
                    >
                      <option>BHP Escondida</option>
                      <option>Codelco Norte</option>
                      <option>Antofagasta Minerals</option>
                      <option>Anglo American Sur</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order-number">Orden de Compra</Label>
                    <Input
                      id="order-number"
                      placeholder="Ej: OC-BHP-245801"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      data-testid="input-order-number"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm">Embalajes del Despacho</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>12 Cajas cartón</span>
                      <span className="font-medium">5.4 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 Film stretch</span>
                      <span className="font-medium">0.085 kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3 Pallets</span>
                      <span className="font-medium">54 kg</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                      <span>Peso Total</span>
                      <span className="text-primary">59.485 kg</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setQrGenerated(true)}
                  disabled={!orderNumber}
                  data-testid="button-generate-qr"
                >
                  <PackageCheck className="w-4 h-4 mr-2" />
                  Generar Código QR
                </Button>
              </TabsContent>

              <TabsContent value="label" className="mt-6">
                <div className="max-w-md mx-auto">
                  <Card className="border-2 border-dashed">
                    <CardContent className="pt-6 text-center space-y-4">
                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-background border-2 border-foreground/20 rounded-lg flex items-center justify-center">
                          <QrCode className="w-32 h-32 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Badge variant="default" className="mb-2">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          SICREP CERTIFICADO
                        </Badge>
                        <div className="font-bold text-lg">PRV-2025-00187-{selectedClient.split(' ')[0].toUpperCase()}</div>
                        <div className="text-sm text-muted-foreground">{selectedClient}</div>
                        <div className="text-sm font-medium">59.5kg | {new Date().toLocaleDateString('es-CL')}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Escanea para validar trazabilidad
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" data-testid="button-print-label">
                          Imprimir
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" data-testid="button-download-label">
                          Descargar PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="validate" className="mt-6">
                {!qrValidated ? (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Simula escanear el código QR para validar
                    </p>
                    <Button onClick={() => setQrValidated(true)} size="lg" data-testid="button-simulate-scan">
                      <QrCode className="w-4 h-4 mr-2" />
                      Simular Escaneo
                    </Button>
                  </div>
                ) : (
                  <Card className="border-chart-2 bg-chart-2/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-chart-2">
                        <CheckCircle className="w-6 h-6" />
                        CERTIFICADO VÁLIDO
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Proveedor:</span>
                          <span className="font-medium">Envases del Norte S.A.</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">RUT:</span>
                          <span className="font-medium">76.543.210-K</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cliente:</span>
                          <span className="font-medium">{selectedClient}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">OC:</span>
                          <span className="font-medium">{orderNumber || "OC-BHP-245801"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha:</span>
                          <span className="font-medium">{new Date().toLocaleString('es-CL')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Peso:</span>
                          <span className="font-medium">59.5 kg</span>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <h5 className="font-semibold text-sm mb-2">Materiales:</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Cartón</span>
                            <Badge variant="secondary">90.7%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Plástico</span>
                            <Badge variant="secondary">7.1%</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Madera</span>
                            <Badge variant="secondary">2.2%</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Trazabilidad:</span>
                          <Badge variant="default">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            COMPLETA
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Certificado:</span>
                          <span className="text-xs font-mono">SICREP-CERT-2025-00022</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Vigencia:</span>
                          <span className="text-xs">31/12/2025</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Blockchain:</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-mono">0x7a8f9e2b...c5d6</span>
                            <CheckCircle className="w-3 h-3 text-chart-2" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-3 border">
                        <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <Blocks className="w-4 h-4 text-chart-3" />
                          Flujo de Trazabilidad
                        </h5>
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-full bg-chart-2 text-white flex items-center justify-center mx-auto mb-1">
                              <PackageCheck className="w-5 h-5" />
                            </div>
                            <div className="font-medium">Bodega</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-full bg-chart-3 text-white flex items-center justify-center mx-auto mb-1">
                              <Truck className="w-5 h-5" />
                            </div>
                            <div className="font-medium">Despacho</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-1">
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div className="font-medium">Minera</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <div className="text-center">
                            <div className="w-10 h-10 rounded-full bg-chart-1 text-white flex items-center justify-center mx-auto mb-1">
                              <Blocks className="w-5 h-5" />
                            </div>
                            <div className="font-medium">Blockchain</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
      
      <footer className="border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 SICREP - Sistema de Certificación REP | Ley 20.920 - República de Chile</p>
          <p className="mt-2">Especializado en Industria Minera y Energía • Trazabilidad NFC • Métricas ESG</p>
        </div>
      </footer>
    </div>
  );
}
