import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Building2, Factory, Users, Shield, Award, BarChart3, FileCheck, Leaf } from "lucide-react";
import jsPDF from 'jspdf';
import { useToast } from "@/hooks/use-toast";

export default function Manual() {
  const { toast } = useToast();

  const generateBorrador = (tipo: 'proveedor' | 'ejecutivo' | 'auditoria') => {
    const doc = new jsPDF();
    
    // Header con logo
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SICREP', 20, 25);
    doc.setFontSize(10);
    doc.text('Sistema Integral de Certificación REP', 20, 32);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');

    if (tipo === 'proveedor') {
      doc.text('INFORME DE CERTIFICACIÓN PROVEEDOR REP', 20, 55);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Nombre Proveedor: ________________________________', 20, 70);
      doc.text('RUT: ________________________________', 20, 80);
      doc.text('Fecha: ________________________________', 20, 90);
      
      doc.setFont('helvetica', 'bold');
      doc.text('1. DATOS DE CERTIFICACIÓN', 20, 105);
      doc.setFont('helvetica', 'normal');
      doc.text('Código CPS: ________________________________', 25, 115);
      doc.text('Material: ________________________________', 25, 125);
      doc.text('Peso Total (kg): ________________________________', 25, 135);
      doc.text('Reciclabilidad (%): ________________________________', 25, 145);
      
      doc.setFont('helvetica', 'bold');
      doc.text('2. CUMPLIMIENTO LEY 20.920', 20, 160);
      doc.setFont('helvetica', 'normal');
      doc.text('☐ Exento de metas de recolección (<300kg anuales)', 25, 170);
      doc.text('☐ Reportado a RETC (Registro de Emisiones)', 25, 180);
      doc.text('☐ Documentación técnica completa', 25, 190);
      
      doc.setFont('helvetica', 'bold');
      doc.text('3. TRAZABILIDAD NFC', 20, 205);
      doc.setFont('helvetica', 'normal');
      doc.text('Tag NFC: ________________________________', 25, 215);
      doc.text('Hash Blockchain: ________________________________', 25, 225);
      
      doc.setFont('helvetica', 'bold');
      doc.text('4. FIRMA Y VALIDACIÓN', 20, 240);
      doc.setFont('helvetica', 'normal');
      doc.text('Evaluador: ________________________________', 25, 250);
      doc.text('Fecha Emisión: ________________________________', 25, 260);
      doc.text('Firma: ________________________________', 25, 270);

    } else if (tipo === 'ejecutivo') {
      doc.text('INFORME EJECUTIVO - PLATAFORMA SICREP', 20, 55);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('RESUMEN EJECUTIVO', 20, 70);
      doc.setFont('helvetica', 'normal');
      doc.text('SICREP es la plataforma líder en certificación REP para la industria minera chilena,', 20, 80);
      doc.text('transformando el cumplimiento de la Ley 20.920 en ventaja competitiva.', 20, 87);
      
      doc.setFont('helvetica', 'bold');
      doc.text('BENEFICIOS PARA MINERAS', 20, 100);
      doc.setFont('helvetica', 'normal');
      doc.text('• Validación instantánea de proveedores certificados vía NFC/QR', 25, 110);
      doc.text('• Cumplimiento automático de reportes RETC', 25, 118);
      doc.text('• Trazabilidad blockchain inmutable para auditorías', 25, 126);
      doc.text('• Métricas ESG cuantificables (CO₂, reciclaje, agua)', 25, 134);
      doc.text('• Reducción de riesgos SMA (multas 1-10,000 UTA)', 25, 142);
      
      doc.setFont('helvetica', 'bold');
      doc.text('BENEFICIOS PARA PROVEEDORES', 20, 155);
      doc.setFont('helvetica', 'normal');
      doc.text('• Certificación individual por tipo de embalaje', 25, 165);
      doc.text('• Diferenciación competitiva con sello SICREP', 25, 173);
      doc.text('• Acceso a directorio de proveedores certificados', 25, 181);
      doc.text('• Dashboard de capacidad (límite 300kg)', 25, 189);
      
      doc.setFont('helvetica', 'bold');
      doc.text('TECNOLOGÍA Y SEGURIDAD', 20, 202);
      doc.setFont('helvetica', 'normal');
      doc.text('• Tags NFC anti-falsificación', 25, 212);
      doc.text('• Códigos QR únicos por despacho', 25, 220);
      doc.text('• Blockchain Polygon Mumbai', 25, 228);
      doc.text('• Cumplimiento Copper Mark', 25, 236);
      
      doc.setFont('helvetica', 'bold');
      doc.text('CONTACTO', 20, 250);
      doc.setFont('helvetica', 'normal');
      doc.text('Email: contacto@sicrep.cl', 25, 260);
      doc.text('Web: www.sicrep.cl', 25, 268);

    } else if (tipo === 'auditoria') {
      doc.text('INFORME DE AUDITORÍA REP - LEY 20.920', 20, 55);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('1. INFORMACIÓN DE AUDITORÍA', 20, 70);
      doc.setFont('helvetica', 'normal');
      doc.text('Auditor: ________________________________', 25, 80);
      doc.text('Entidad Auditada: ________________________________', 25, 90);
      doc.text('Período: ________________________________', 25, 100);
      
      doc.setFont('helvetica', 'bold');
      doc.text('2. VERIFICACIÓN DE CERTIFICACIONES', 20, 115);
      doc.setFont('helvetica', 'normal');
      doc.text('Total Certificaciones Emitidas: ___________', 25, 125);
      doc.text('Certificaciones Vigentes: ___________', 25, 135);
      doc.text('Certificaciones Expiradas: ___________', 25, 145);
      
      doc.setFont('helvetica', 'bold');
      doc.text('3. CUMPLIMIENTO NORMATIVO', 20, 160);
      doc.setFont('helvetica', 'normal');
      doc.text('☐ Reportes RETC al día', 25, 170);
      doc.text('☐ Documentación técnica completa', 25, 180);
      doc.text('☐ Trazabilidad NFC verificada', 25, 190);
      doc.text('☐ Blockchain hashes validados', 25, 200);
      
      doc.setFont('helvetica', 'bold');
      doc.text('4. MÉTRICAS ESG', 20, 215);
      doc.setFont('helvetica', 'normal');
      doc.text('CO₂ Evitado (ton): ___________', 25, 225);
      doc.text('Tasa Reciclabilidad (%): ___________', 25, 235);
      doc.text('Agua Conservada (L): ___________', 25, 245);
      
      doc.setFont('helvetica', 'bold');
      doc.text('5. RECOMENDACIONES', 20, 260);
      doc.setFont('helvetica', 'normal');
      doc.text('_________________________________________________________________________', 25, 270);
      doc.text('_________________________________________________________________________', 25, 278);
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('SICREP - Sistema Integral de Certificación REP | Ley 20.920 Chile', 105, 290, { align: 'center' });

    doc.save(`SICREP_Borrador_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: "Borrador generado",
      description: `Plantilla de ${tipo} descargada exitosamente`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 border">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Manual SICREP</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Material profesional para presentar a asociaciones, gremios y grandes empresas mineras
          </p>
        </div>
      </div>

      <Tabs defaultValue="empresas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="empresas" data-testid="tab-empresas">
            <Factory className="w-4 h-4 mr-2" />
            Grandes Empresas
          </TabsTrigger>
          <TabsTrigger value="asociaciones" data-testid="tab-asociaciones">
            <Users className="w-4 h-4 mr-2" />
            Asociaciones
          </TabsTrigger>
          <TabsTrigger value="borradores" data-testid="tab-borradores">
            <FileText className="w-4 h-4 mr-2" />
            Borradores
          </TabsTrigger>
        </TabsList>

        {/* Tab para Grandes Empresas Mineras */}
        <TabsContent value="empresas" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>SICREP para Grandes Empresas Mineras</CardTitle>
                  <CardDescription>Solución integral de certificación REP bajo Ley 20.920</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="w-5 h-5 text-primary" />
                      Cumplimiento Normativo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Reportes RETC Automáticos</p>
                        <p className="text-sm text-muted-foreground">Eliminación de multas SMA (1-10,000 UTA)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Auditorías Simplificadas</p>
                        <p className="text-sm text-muted-foreground">Trazabilidad blockchain inmutable</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Validación Instantánea</p>
                        <p className="text-sm text-muted-foreground">Escaneo NFC/QR de proveedores</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Leaf className="w-5 h-5 text-primary" />
                      Métricas ESG Cuantificables
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Huella de Carbono</p>
                        <p className="text-sm text-muted-foreground">Cálculo real de CO₂ evitado</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Certificación Copper Mark</p>
                        <p className="text-sm text-muted-foreground">Alineación con estándares internacionales</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Reportes para Inversionistas</p>
                        <p className="text-sm text-muted-foreground">Dashboard ejecutivo con KPIs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    ROI y Beneficios Tangibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <p className="text-3xl font-bold text-primary">90%</p>
                      <p className="text-sm text-muted-foreground mt-1">Reducción tiempo auditorías</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <p className="text-3xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground mt-1">Cumplimiento Ley 20.920</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <p className="text-3xl font-bold text-primary">$6.2M</p>
                      <p className="text-sm text-muted-foreground mt-1">Ahorro en multas potenciales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={() => generateBorrador('ejecutivo')} data-testid="button-download-ejecutivo">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Presentación Ejecutiva
                </Button>
                <Button variant="outline" onClick={() => generateBorrador('auditoria')} data-testid="button-download-auditoria">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Plantilla Auditoría
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab para Asociaciones y Gremios */}
        <TabsContent value="asociaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>SICREP para Asociaciones y Gremios</CardTitle>
                  <CardDescription>Solución colectiva para pequeños y medianos proveedores</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Propuesta de Valor para Asociaciones</h3>
                <p className="text-muted-foreground">
                  SICREP ofrece un modelo especial para asociaciones gremiales que agrupan proveedores de embalajes,
                  permitiendo certificación colectiva con costos reducidos y beneficios compartidos.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="w-5 h-5 text-primary" />
                      Modelo Asociativo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge className="mt-1">1</Badge>
                      <div>
                        <p className="font-medium">Licencia Corporativa</p>
                        <p className="text-sm text-muted-foreground">Una suscripción para todos los asociados</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="mt-1">2</Badge>
                      <div>
                        <p className="font-medium">Capacitación Grupal</p>
                        <p className="text-sm text-muted-foreground">Talleres de onboarding incluidos</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="mt-1">3</Badge>
                      <div>
                        <p className="font-medium">Soporte Dedicado</p>
                        <p className="text-sm text-muted-foreground">Manager asignado a la asociación</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge className="mt-1">4</Badge>
                      <div>
                        <p className="font-medium">Marca Colectiva</p>
                        <p className="text-sm text-muted-foreground">Sello "Asociación Certificada SICREP"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building2 className="w-5 h-5 text-primary" />
                      Beneficios para Asociados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Acceso Plataforma</p>
                        <p className="text-sm text-muted-foreground">Dashboard individual por proveedor</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Certificación Individual</p>
                        <p className="text-sm text-muted-foreground">Código CPS único por producto</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Directorio Público</p>
                        <p className="text-sm text-muted-foreground">Visibilidad ante mineras</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-1">✓</Badge>
                      <div>
                        <p className="font-medium">Reportes Consolidados</p>
                        <p className="text-sm text-muted-foreground">Métricas agregadas de la asociación</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Casos de Uso Asociativos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="font-medium">Asociación de Fabricantes de Cajas de Cartón</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      25 PYMES certificadas colectivamente, exportando a mineras con sello SICREP
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="font-medium">Gremio de Proveedores Industriales</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Certificación de pallets, strapping y films para toda la cadena de suministro
                    </p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="font-medium">Cámara de Comercio Regional</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Programa de certificación para empresas locales que proveen a la minería
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => generateBorrador('ejecutivo')} data-testid="button-download-asociacion">
                <Download className="w-4 h-4 mr-2" />
                Descargar Propuesta para Asociaciones
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Borradores */}
        <TabsContent value="borradores" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Informes Descargables</CardTitle>
              <CardDescription>Borradores profesionales en formato PDF para diferentes audiencias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover-elevate cursor-pointer" onClick={() => generateBorrador('proveedor')}>
                  <CardHeader>
                    <FileText className="w-12 h-12 text-primary mb-2" />
                    <CardTitle className="text-lg">Informe Proveedor</CardTitle>
                    <CardDescription>Certificado individual de cumplimiento REP</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" data-testid="button-borrador-proveedor">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Borrador
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate cursor-pointer" onClick={() => generateBorrador('ejecutivo')}>
                  <CardHeader>
                    <Building2 className="w-12 h-12 text-primary mb-2" />
                    <CardTitle className="text-lg">Presentación Ejecutiva</CardTitle>
                    <CardDescription>Material para mineras y grandes empresas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" data-testid="button-borrador-ejecutivo">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Borrador
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover-elevate cursor-pointer" onClick={() => generateBorrador('auditoria')}>
                  <CardHeader>
                    <FileCheck className="w-12 h-12 text-primary mb-2" />
                    <CardTitle className="text-lg">Informe Auditoría</CardTitle>
                    <CardDescription>Plantilla para verificación normativa</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" data-testid="button-borrador-auditoria">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Borrador
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Nota:</strong> Estos borradores son plantillas editables en PDF. Personalícelos con los datos
                  específicos de su organización antes de presentarlos a clientes o auditorías.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
