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

      <Tabs defaultValue="arquitectura" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="arquitectura" data-testid="tab-arquitectura">
            <BarChart3 className="w-4 h-4 mr-2" />
            Arquitectura
          </TabsTrigger>
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

        {/* Tab para Arquitectura del Sistema */}
        <TabsContent value="arquitectura" className="space-y-6">
          {/* Diagrama de Arquitectura */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Arquitectura del Sistema SICREP
              </CardTitle>
              <CardDescription>
                Diagrama de componentes, módulos y flujos de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Diagrama SVG de Arquitectura */}
              <div className="border rounded-lg p-6 bg-muted/20">
                <h3 className="text-lg font-semibold mb-4 text-center">Diagrama de Arquitectura</h3>
                <svg viewBox="0 0 800 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Frontend Layer */}
                  <rect x="50" y="50" width="700" height="100" fill="hsl(var(--primary))" fillOpacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" rx="8"/>
                  <text x="400" y="85" textAnchor="middle" className="fill-foreground font-bold text-lg">CAPA FRONTEND</text>
                  <text x="120" y="110" className="fill-foreground text-sm">React + TypeScript</text>
                  <text x="350" y="110" className="fill-foreground text-sm">TanStack Query</text>
                  <text x="550" y="110" className="fill-foreground text-sm">shadcn/ui</text>
                  <text x="120" y="130" className="fill-foreground text-sm">Wouter Router</text>
                  <text x="350" y="130" className="fill-foreground text-sm">Vite Build</text>
                  <text x="550" y="130" className="fill-foreground text-sm">Tailwind CSS</text>
                  
                  {/* Backend Layer */}
                  <rect x="50" y="200" width="700" height="100" fill="hsl(var(--accent))" fillOpacity="0.1" stroke="hsl(var(--accent))" strokeWidth="2" rx="8"/>
                  <text x="400" y="235" textAnchor="middle" className="fill-foreground font-bold text-lg">CAPA BACKEND</text>
                  <text x="120" y="260" className="fill-foreground text-sm">Express.js</text>
                  <text x="300" y="260" className="fill-foreground text-sm">REST API</text>
                  <text x="450" y="260" className="fill-foreground text-sm">bcrypt Auth</text>
                  <text x="600" y="260" className="fill-foreground text-sm">PDF Generator</text>
                  <text x="120" y="280" className="fill-foreground text-sm">Drizzle ORM</text>
                  <text x="300" y="280" className="fill-foreground text-sm">Storage Layer</text>
                  <text x="450" y="280" className="fill-foreground text-sm">ESG Calculator</text>
                  <text x="600" y="280" className="fill-foreground text-sm">QR Generator</text>
                  
                  {/* Database Layer */}
                  <rect x="50" y="350" width="340" height="100" fill="hsl(var(--chart-1))" fillOpacity="0.1" stroke="hsl(var(--chart-1))" strokeWidth="2" rx="8"/>
                  <text x="220" y="385" textAnchor="middle" className="fill-foreground font-bold text-lg">BASE DE DATOS</text>
                  <text x="100" y="410" className="fill-foreground text-sm">PostgreSQL (Neon)</text>
                  <text x="100" y="430" className="fill-foreground text-sm">15+ Tablas</text>
                  
                  {/* Blockchain Layer */}
                  <rect x="410" y="350" width="340" height="100" fill="hsl(var(--chart-2))" fillOpacity="0.1" stroke="hsl(var(--chart-2))" strokeWidth="2" rx="8"/>
                  <text x="580" y="385" textAnchor="middle" className="fill-foreground font-bold text-lg">TRAZABILIDAD</text>
                  <text x="460" y="410" className="fill-foreground text-sm">Blockchain (Polygon)</text>
                  <text x="460" y="430" className="fill-foreground text-sm">NFC Tags + QR Codes</text>
                  
                  {/* External Integrations */}
                  <rect x="50" y="500" width="700" height="60" fill="hsl(var(--chart-3))" fillOpacity="0.1" stroke="hsl(var(--chart-3))" strokeWidth="2" rx="8"/>
                  <text x="400" y="525" textAnchor="middle" className="fill-foreground font-bold text-lg">INTEGRACIONES EXTERNAS</text>
                  <text x="150" y="545" className="fill-foreground text-sm">RETC</text>
                  <text x="320" y="545" className="fill-foreground text-sm">Copper Mark</text>
                  <text x="500" y="545" className="fill-foreground text-sm">Replit Auth</text>
                  <text x="650" y="545" className="fill-foreground text-sm">Email</text>
                  
                  {/* Arrows */}
                  <path d="M 400 150 L 400 200" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 220 300 L 220 350" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 580 300 L 580 350" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 220 450 L 220 500" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 580 450 L 580 500" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <polygon points="0 0, 10 5, 0 10" fill="hsl(var(--muted-foreground))" />
                    </marker>
                  </defs>
                </svg>
              </div>

              {/* Módulos y Paneles del Sistema */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Módulos y Paneles Disponibles</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Métricas clave</li>
                        <li>• Actividad reciente</li>
                        <li>• Alertas de capacidad</li>
                        <li>• KPIs ESG</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Certificaciones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Gestión de solicitudes</li>
                        <li>• Workflow 10 fases</li>
                        <li>• Generación de PDFs</li>
                        <li>• Historial completo</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Factory className="w-4 h-4 text-primary" />
                        Proveedores
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Directorio certificado</li>
                        <li>• Control 300kg/año</li>
                        <li>• Estados y alertas</li>
                        <li>• Métricas individuales</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-primary" />
                        CPS Catalog
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Catálogo de productos</li>
                        <li>• Especificaciones REP</li>
                        <li>• Códigos únicos CPS</li>
                        <li>• Reciclabilidad</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        ESG Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• CO₂ evitado</li>
                        <li>• Tasa reciclabilidad</li>
                        <li>• Agua conservada</li>
                        <li>• Energía renovable</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-primary" />
                        Trazabilidad NFC
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Tags NFC únicos</li>
                        <li>• Eventos de escaneo</li>
                        <li>• Blockchain hash</li>
                        <li>• Pasaporte digital</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Despachos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Envíos certificados</li>
                        <li>• Componentes embalaje</li>
                        <li>• QR por despacho</li>
                        <li>• Control de peso</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Gestión Usuarios
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• 15+ roles disponibles</li>
                        <li>• Control de acceso (RBAC)</li>
                        <li>• Paneles personalizados</li>
                        <li>• Auditoría de actividad</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30 hover-elevate">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        Reportes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Informes ESG</li>
                        <li>• Exportación CSV</li>
                        <li>• PDFs oficiales</li>
                        <li>• SICREP Insights</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Flujos de Trabajo */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Flujos de Trabajo Principales</h3>
                <div className="space-y-4">
                  {/* Flujo de Certificación */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Flujo de Certificación REP (10 Fases)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {[
                          { id: 1, name: "Solicitud", icon: "📝" },
                          { id: 2, name: "Asignación CPS", icon: "📋" },
                          { id: 3, name: "Eval. Docs", icon: "📄" },
                          { id: 4, name: "Eval. Operativa", icon: "🏭" },
                          { id: 5, name: "Eval. Valor", icon: "💎" },
                          { id: 6, name: "Revisión Final", icon: "✅" },
                          { id: 7, name: "Emisión Cert.", icon: "🏆" },
                          { id: 8, name: "Activación NFC", icon: "📡" },
                          { id: 9, name: "Publicación", icon: "📢" },
                          { id: 10, name: "Monitoreo", icon: "📊" },
                        ].map((step, idx) => (
                          <div key={step.id} className="flex items-center">
                            <div className="flex flex-col items-center min-w-[100px]">
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                                {step.icon}
                              </div>
                              <p className="text-xs mt-2 text-center font-medium">{step.name}</p>
                            </div>
                            {idx < 9 && (
                              <div className="text-primary text-xl mx-2">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Flujo de Trazabilidad NFC */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Flujo de Trazabilidad NFC</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {[
                          { id: 1, name: "Generación Tag", icon: "🏷️" },
                          { id: 2, name: "Asignación", icon: "🔗" },
                          { id: 3, name: "Blockchain", icon: "⛓️" },
                          { id: 4, name: "Escaneo NFC/QR", icon: "📱" },
                          { id: 5, name: "Validación", icon: "✓" },
                          { id: 6, name: "Registro Evento", icon: "📝" },
                        ].map((step, idx) => (
                          <div key={step.id} className="flex items-center">
                            <div className="flex flex-col items-center min-w-[100px]">
                              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-lg">
                                {step.icon}
                              </div>
                              <p className="text-xs mt-2 text-center font-medium">{step.name}</p>
                            </div>
                            {idx < 5 && (
                              <div className="text-accent text-xl mx-2">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Flujo de Despacho */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-base">Flujo de Despacho Certificado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {[
                          { id: 1, name: "Crear Despacho", icon: "📦" },
                          { id: 2, name: "Agregar Componentes", icon: "🧩" },
                          { id: 3, name: "Calcular Métricas", icon: "📊" },
                          { id: 4, name: "Certificar", icon: "✅" },
                          { id: 5, name: "Generar QR", icon: "📱" },
                          { id: 6, name: "Envío", icon: "🚛" },
                        ].map((step, idx) => (
                          <div key={step.id} className="flex items-center">
                            <div className="flex flex-col items-center min-w-[100px]">
                              <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center text-lg">
                                {step.icon}
                              </div>
                              <p className="text-xs mt-2 text-center font-medium">{step.name}</p>
                            </div>
                            {idx < 5 && (
                              <div className="text-chart-1 text-xl mx-2">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Roles del Sistema */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Roles y Permisos del Sistema</h3>
                <div className="grid md:grid-cols-4 gap-3">
                  {[
                    { role: "Admin", desc: "Control total del sistema", color: "text-red-500" },
                    { role: "Gerente General", desc: "Supervisión ejecutiva", color: "text-orange-500" },
                    { role: "Manager Operaciones", desc: "Gestión operativa", color: "text-yellow-500" },
                    { role: "CPS", desc: "Coordinador de producto", color: "text-green-500" },
                    { role: "Evaluador", desc: "Evaluación técnica", color: "text-blue-500" },
                    { role: "Auditor", desc: "Auditorías y compliance", color: "text-indigo-500" },
                    { role: "Comité", desc: "Revisión y aprobación", color: "text-purple-500" },
                    { role: "Proveedor", desc: "Gestión de productos", color: "text-pink-500" },
                    { role: "Cliente Minería", desc: "Acceso a certificados", color: "text-cyan-500" },
                    { role: "Viewer", desc: "Solo lectura", color: "text-gray-500" },
                    { role: "Analista", desc: "Reportes y métricas", color: "text-teal-500" },
                    { role: "Coordinador", desc: "Coordinación general", color: "text-lime-500" },
                    { role: "Técnico", desc: "Soporte técnico", color: "text-amber-500" },
                    { role: "Inspector", desc: "Inspección y validación", color: "text-emerald-500" },
                    { role: "Supervisor", desc: "Supervisión operativa", color: "text-sky-500" },
                  ].map((item) => (
                    <Badge key={item.role} variant="outline" className={`justify-start py-2 px-3 ${item.color}`}>
                      <div>
                        <p className="font-semibold text-xs">{item.role}</p>
                        <p className="text-[10px] opacity-70 font-normal">{item.desc}</p>
                      </div>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Modelo de Pricing */}
              <Card className="bg-primary/5 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Modelo de Pricing SICREP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Setup Inicial</h4>
                      <p className="text-3xl font-bold text-primary mb-1">15 UF</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Onboarding completo</li>
                        <li>• Configuración de empresa</li>
                        <li>• Capacitación de usuarios</li>
                        <li>• Migración de datos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Operación Mensual</h4>
                      <p className="text-3xl font-bold text-primary mb-1">5 UF/mes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Certificaciones ilimitadas</li>
                        <li>• Soporte técnico incluido</li>
                        <li>• Actualizaciones automáticas</li>
                        <li>• Trazabilidad blockchain</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

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
