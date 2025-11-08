import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { Download, FileText, TrendingUp, Package, Leaf, FileBarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Reports() {
  const { toast } = useToast();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("all");
  const [selectedCertification, setSelectedCertification] = useState("all");
  const [reportType, setReportType] = useState("executive");

  const { data: certifications = [] } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  const { data: providers = [] } = useQuery<any[]>({
    queryKey: ["/api/providers"],
  });

  const { data: esgMetrics = [] } = useQuery<any[]>({
    queryKey: ["/api/esg"],
  });

  const { data: cpsCatalog = [] } = useQuery<any[]>({
    queryKey: ["/api/cps"],
  });

  // Preparar datos para gráficos
  const certificationsByStatus = Object.entries(
    certifications.reduce((acc: any, cert: any) => {
      const status = cert.status || 'sin_estado';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name: name.replace(/_/g, ' '), value }));

  const certificationsByPhase = Object.entries(
    certifications.reduce((acc: any, cert: any) => {
      const phase = cert.currentPhase || 'sin_fase';
      acc[phase] = (acc[phase] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name: name.replace(/_/g, ' '), value }));

  const providersByCapacity = providers.map((p: any) => ({
    name: p.name.substring(0, 20),
    capacidad: parseFloat(p.currentCapacity),
    limite: parseFloat(p.maxCapacity),
    status: p.status,
  }));

  const avgESGMetrics = esgMetrics.length > 0 ? {
    co2: Math.round(esgMetrics.reduce((sum: number, m: any) => sum + (parseFloat(m.co2EmissionsTons) || 0), 0) / esgMetrics.length),
    reciclabilidad: Math.round(esgMetrics.reduce((sum: number, m: any) => sum + (parseFloat(m.recyclingRate) || 0), 0) / esgMetrics.length),
    agua: Math.round(esgMetrics.reduce((sum: number, m: any) => sum + (parseFloat(m.waterUsageM3) || 0), 0) / esgMetrics.length),
    energia: Math.round(esgMetrics.reduce((sum: number, m: any) => sum + (parseFloat(m.renewableEnergyPercent) || 0), 0) / esgMetrics.length),
  } : { co2: 0, reciclabilidad: 0, agua: 0, energia: 0 };

  const esgData = [
    { name: 'CO2 (tons)', value: avgESGMetrics.co2 },
    { name: 'Reciclabilidad (%)', value: avgESGMetrics.reciclabilidad },
    { name: 'Agua (m³)', value: avgESGMetrics.agua },
    { name: 'Energía Renovable (%)', value: avgESGMetrics.energia },
  ];

  const timelineData = certifications
    .reduce((acc: any[], cert: any) => {
      const month = new Date(cert.createdAt).toLocaleDateString('es-CL', { month: 'short', year: '2-digit' });
      const existing = acc.find(d => d.month === month);
      if (existing) {
        existing.certificaciones += 1;
      } else {
        acc.push({ month, certificaciones: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-6);

  const generateCertificationFlowPDF = async (certificationId: string) => {
    // Obtener datos completos de la certificación
    const cert = certifications.find((c: any) => c.id === certificationId);
    if (!cert) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Certificación no encontrada",
      });
      return;
    }

    // Obtener historial de workflow
    const workflowResponse = await fetch(`/api/certifications/${certificationId}/workflow-history`);
    const workflowHistory = await workflowResponse.json();

    // Obtener proveedor
    const provider = providers.find((p: any) => p.id === cert.providerId);

    // Obtener CPS
    const cps = cpsCatalog.find((c: any) => c.id === cert.cpsId);

    // Obtener ESG si existe
    const esg = esgMetrics.find((e: any) => e.certificationId === certificationId);

    const doc = new jsPDF();
    
    // Header con branding SICREP
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, 210, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("INFORME DE CERTIFICACIÓN SICREP", 105, 18, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Sistema Integral de Certificación REP", 105, 26, { align: "center" });
    doc.text("Ley 20.920 - Fomento al Reciclaje y Responsabilidad Extendida del Productor", 105, 32, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    let yPos = 50;
    
    // Código de Certificación
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Certificación: ${cert.certificationCode}`, 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-CL', { day: '2-digit', month: 'long', year: 'numeric' })}`, 20, yPos);
    
    yPos += 8;
    doc.text(`Estado actual: ${cert.status.replace(/_/g, ' ').toUpperCase()}`, 20, yPos);
    yPos += 5;
    doc.text(`Fase actual: ${cert.currentPhase.replace(/_/g, ' ')}`, 20, yPos);
    
    // Sección 1: Datos del Proveedor
    yPos += 15;
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos - 5, 180, 8, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("1. DATOS DEL PROVEEDOR", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (provider) {
      doc.text(`Razón Social: ${provider.name}`, 25, yPos);
      yPos += 6;
      doc.text(`RUT: ${provider.rut}`, 25, yPos);
      yPos += 6;
      doc.text(`Capacidad Actual: ${provider.currentCapacity} kg`, 25, yPos);
      yPos += 6;
      doc.text(`Capacidad Máxima Legal: ${provider.maxCapacity} kg (Límite Ley 20.920)`, 25, yPos);
      yPos += 6;
      doc.text(`Estado del Proveedor: ${provider.status}`, 25, yPos);
      yPos += 6;
      doc.text(`Tipo REP: ${provider.repType || 'N/A'}`, 25, yPos);
    }
    
    // Sección 2: Sistema CPS Asignado
    yPos += 15;
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos - 5, 180, 8, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("2. SISTEMA CPS ASIGNADO", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (cps) {
      doc.text(`Código CPS: ${cps.cpsCode}`, 25, yPos);
      yPos += 6;
      doc.text(`Tipo de Material: ${cps.materialType}`, 25, yPos);
      yPos += 6;
      doc.text(`Peso Unitario: ${cps.unitWeightGr} gr`, 25, yPos);
      yPos += 6;
      doc.text(`Reciclabilidad: ${cps.recyclabilityPercent}%`, 25, yPos);
      yPos += 6;
      doc.text(`Nivel de Reciclabilidad: ${cps.recyclabilityLevel}`, 25, yPos);
    }
    
    // Sección 3: Workflow de Certificación (10 Fases)
    yPos += 15;
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos - 5, 180, 8, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("3. FLUJO DE CERTIFICACIÓN - 10 FASES", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("El proceso de certificación REP consta de 10 fases evaluativas:", 20, yPos);
    
    yPos += 8;
    const phases = [
      "1. Solicitud Inicial",
      "2. Asignación CPS",
      "3. Evaluación Documentos",
      "4. Evaluación Operativa",
      "5. Evaluación Valor Agregado",
      "6. Revisión Final",
      "7. Emisión Certificado",
      "8. Activación NFC",
      "9. Publicación",
      "10. Monitoreo Continuo"
    ];
    
    phases.forEach((phase) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      const phaseKey = phase.split('. ')[1].toLowerCase().replace(/ /g, '_');
      const isComplete = workflowHistory.some((h: any) => h.phase === phaseKey);
      const phaseHistory = workflowHistory.find((h: any) => h.phase === phaseKey);
      
      if (isComplete && phaseHistory) {
        doc.setTextColor(34, 197, 94);
        doc.text(`✓ ${phase}`, 25, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
        doc.setFontSize(8);
        doc.text(`   Fecha: ${new Date(phaseHistory.timestamp).toLocaleDateString('es-CL')}`, 25, yPos);
        if (phaseHistory.performedBy) {
          yPos += 4;
          doc.text(`   Responsable: ${phaseHistory.performedBy}`, 25, yPos);
        }
        if (phaseHistory.notes) {
          yPos += 4;
          doc.text(`   Observaciones: ${phaseHistory.notes.substring(0, 60)}`, 25, yPos);
        }
        doc.setFontSize(9);
        yPos += 6;
      } else {
        doc.setTextColor(150, 150, 150);
        doc.text(`○ ${phase} - Pendiente`, 25, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 6;
      }
    });
    
    // Sección 4: Métricas ESG
    yPos += 15;
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos - 5, 180, 8, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("4. MÉTRICAS ESG Y SOSTENIBILIDAD", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (esg) {
      doc.text(`Emisiones CO2: ${esg.co2EmissionsTons} toneladas`, 25, yPos);
      yPos += 6;
      doc.text(`Tasa de Reciclabilidad: ${esg.recyclingRate}%`, 25, yPos);
      yPos += 6;
      doc.text(`Uso de Agua: ${esg.waterUsageM3} m³`, 25, yPos);
      yPos += 6;
      doc.text(`Energía Renovable: ${esg.renewableEnergyPercent}%`, 25, yPos);
      yPos += 6;
      doc.text(`Copper Mark Compliant: ${esg.copperMarkCompliant ? 'SÍ' : 'NO'}`, 25, yPos);
    } else {
      doc.text("Sin métricas ESG registradas", 25, yPos);
    }
    
    // Sección 5: Trazabilidad
    yPos += 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos - 5, 180, 8, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("5. TRAZABILIDAD NFC Y BLOCKCHAIN", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (cert.nfcTagId) {
      doc.text(`Código NFC: ${cert.nfcTagId}`, 25, yPos);
      yPos += 6;
    }
    if (cert.blockchainHash) {
      doc.text(`Hash Blockchain: ${cert.blockchainHash.substring(0, 40)}...`, 25, yPos);
      yPos += 6;
      doc.text(`Red: Polygon Mumbai Testnet`, 25, yPos);
    }
    
    // Sección 6: Cumplimiento Legal
    yPos += 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos - 5, 180, 8, "F");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("6. CUMPLIMIENTO LEY 20.920", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Esta certificación cumple con los requisitos establecidos en:", 25, yPos);
    yPos += 6;
    doc.text("• Ley 20.920 - Fomento al Reciclaje y REP", 25, yPos);
    yPos += 6;
    doc.text("• Decreto Supremo 12/2020 - Envases y Embalajes", 25, yPos);
    yPos += 6;
    doc.text("• Registro RETC (Registro de Emisiones y Transferencia de Contaminantes)", 25, yPos);
    yPos += 6;
    doc.text(`• Exención artículo 30: Menos de 300kg anuales (Actual: ${provider?.currentCapacity || 0} kg)`, 25, yPos);
    
    // Footer en todas las páginas
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(34, 197, 94);
      doc.setLineWidth(1);
      doc.line(15, 280, 195, 280);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("SICREP - Sistema Integral de Certificación REP", 105, 285, { align: "center" });
      doc.text("Documento oficial de certificación conforme a Ley 20.920", 105, 290, { align: "center" });
      doc.text(`Página ${i} de ${pageCount}`, 190, 290, { align: "right" });
      doc.text(`Certificación: ${cert.certificationCode}`, 20, 290);
    }
    
    // Guardar
    const fileName = `SICREP_Certificacion_${cert.certificationCode}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast({
      title: "Informe de certificación generado",
      description: `Descargado como ${fileName}`,
    });
  };

  const generatePDF = (type: string) => {
    if (type === "certification-flow") {
      if (selectedCertification === "all") {
        toast({
          variant: "destructive",
          title: "Seleccione una certificación",
          description: "Debe seleccionar una certificación específica para generar este informe",
        });
        return;
      }
      generateCertificationFlowPDF(selectedCertification);
      return;
    }

    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, 210, 35, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("INFORME SICREP", 105, 15, { align: "center" });
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Sistema Integral de Certificación REP", 105, 23, { align: "center" });
    doc.text("Ley 20.920 - Marco para la Gestión de Residuos", 105, 29, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    let yPos = 50;
    
    // Tipo de informe
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    const reportTitles: any = {
      executive: "Informe Ejecutivo General",
      provider: "Informe por Proveedor",
      compliance: "Informe de Cumplimiento REP",
      esg: "Informe ESG y Sostenibilidad",
    };
    doc.text(reportTitles[type] || "Informe General", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-CL')}`, 20, yPos);
    
    if (dateFrom && dateTo) {
      yPos += 5;
      doc.text(`Período: ${dateFrom} - ${dateTo}`, 20, yPos);
    }
    
    // Estadísticas generales
    yPos += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Estadísticas Generales", 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Total Certificaciones: ${certifications.length}`, 25, yPos);
    yPos += 7;
    doc.text(`Proveedores Activos: ${providers.length}`, 25, yPos);
    yPos += 7;
    doc.text(`Métricas ESG Registradas: ${esgMetrics.length}`, 25, yPos);
    
    // Certificaciones por Estado
    if (certificationsByStatus.length > 0) {
      yPos += 15;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Certificaciones por Estado", 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      
      certificationsByStatus.slice(0, 5).forEach((item) => {
        doc.text(`${item.name}: ${item.value}`, 25, yPos);
        yPos += 6;
      });
    }
    
    // Métricas ESG
    if (esgMetrics.length > 0) {
      yPos += 15;
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Métricas ESG Promedio", 20, yPos);
      
      yPos += 10;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      
      doc.text(`Emisiones CO2: ${avgESGMetrics.co2} toneladas`, 25, yPos);
      yPos += 7;
      doc.text(`Tasa de Reciclabilidad: ${avgESGMetrics.reciclabilidad}%`, 25, yPos);
      yPos += 7;
      doc.text(`Uso de Agua: ${avgESGMetrics.agua} m³`, 25, yPos);
      yPos += 7;
      doc.text(`Energía Renovable: ${avgESGMetrics.energia}%`, 25, yPos);
    }
    
    // Proveedores por Capacidad
    if (providersByCapacity.length > 0) {
      yPos += 15;
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Proveedores - Uso de Capacidad", 20, yPos);
      
      yPos += 10;
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Proveedor", 25, yPos);
      doc.text("Capacidad", 100, yPos);
      doc.text("Límite", 140, yPos);
      doc.text("Estado", 170, yPos);
      
      yPos += 6;
      doc.setFont("helvetica", "normal");
      
      providersByCapacity.slice(0, 10).forEach((p: any) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(p.name, 25, yPos);
        doc.text(`${p.capacidad.toFixed(1)} kg`, 100, yPos);
        doc.text(`${p.limite.toFixed(1)} kg`, 140, yPos);
        doc.text(p.status, 170, yPos);
        yPos += 6;
      });
    }
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(20, 280, 190, 280);
      
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("SICREP - Sistema Integral de Certificación REP", 105, 285, { align: "center" });
      doc.text("Documento generado automáticamente", 105, 290, { align: "center" });
      doc.text(`Página ${i} de ${pageCount}`, 190, 290, { align: "right" });
    }
    
    // Guardar
    const fileName = `SICREP_${reportTitles[type]?.replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast({
      title: "Informe generado",
      description: `El informe ha sido descargado como ${fileName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Informes y Reportes</h1>
        <p className="text-muted-foreground">Análisis gráfico y generación de informes oficiales REP</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros de Reporte</CardTitle>
          <CardDescription>Personalice el período y alcance del informe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">Desde</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                data-testid="input-date-from"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">Hasta</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                data-testid="input-date-to"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider-select">Proveedor</Label>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger id="provider-select" data-testid="select-provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los proveedores</SelectItem>
                  {providers.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Informe</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type" data-testid="select-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Ejecutivo General</SelectItem>
                  <SelectItem value="provider">Por Proveedor</SelectItem>
                  <SelectItem value="compliance">Cumplimiento REP</SelectItem>
                  <SelectItem value="esg">ESG y Sostenibilidad</SelectItem>
                  <SelectItem value="certification-flow">Flujo de Certificación</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {reportType === "certification-flow" && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="certification-select">Certificación a Informar *</Label>
              <Select value={selectedCertification} onValueChange={setSelectedCertification}>
                <SelectTrigger id="certification-select" data-testid="select-certification">
                  <SelectValue placeholder="Seleccione una certificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">-- Seleccione --</SelectItem>
                  {certifications.map((cert: any) => (
                    <SelectItem key={cert.id} value={cert.id}>
                      {cert.certificationCode} - {cert.currentPhase.replace(/_/g, ' ')} ({cert.status})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Este informe incluye todas las 10 fases del workflow, datos del proveedor, CPS, ESG y trazabilidad
              </p>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <Button onClick={() => generatePDF(reportType)} data-testid="button-generate-pdf">
              <Download className="w-4 h-4 mr-2" />
              Generar Informe PDF
            </Button>
            <Button 
              variant="secondary" 
              onClick={async () => {
                // Exportar datos a CSV para Excel
                const csvData = certifications.map((cert: any) => ({
                  Código: cert.certificationCode || cert.code,
                  Estado: cert.status,
                  Fase: cert.currentPhase,
                  Proveedor: providers.find((p: any) => p.id === cert.providerId)?.name || 'N/A',
                  Fecha: new Date(cert.createdAt).toLocaleDateString('es-CL')
                }));
                
                const headers = Object.keys(csvData[0] || {}).join(',');
                const rows = csvData.map(row => Object.values(row).join(',')).join('\n');
                const csv = `${headers}\n${rows}`;
                
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `SICREP_Datos_${new Date().toISOString().split('T')[0]}.csv`;
                link.click();
                
                toast({
                  title: "Datos exportados",
                  description: "Archivo CSV descargado para Excel",
                });
              }}
              data-testid="button-export-excel"
            >
              <FileBarChart className="w-4 h-4 mr-2" />
              Exportar a Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de gráficos */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" data-testid="tab-overview">
            <TrendingUp className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="certifications" data-testid="tab-certifications">
            <FileText className="w-4 h-4 mr-2" />
            Certificaciones
          </TabsTrigger>
          <TabsTrigger value="providers" data-testid="tab-providers">
            <Package className="w-4 h-4 mr-2" />
            Proveedores
          </TabsTrigger>
          <TabsTrigger value="esg" data-testid="tab-esg">
            <Leaf className="w-4 h-4 mr-2" />
            ESG
          </TabsTrigger>
        </TabsList>

        {/* Vista General */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Certificaciones</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="certificaciones" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Estado</CardTitle>
                <CardDescription>Certificaciones actuales</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={certificationsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {certificationsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Certificaciones */}
        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificaciones por Fase del Workflow</CardTitle>
              <CardDescription>10 fases del proceso de certificación REP</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={certificationsByPhase}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Proveedores */}
        <TabsContent value="providers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uso de Capacidad por Proveedor</CardTitle>
              <CardDescription>Límite 300kg/año según Ley 20.920</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={providersByCapacity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="capacidad" fill="#3b82f6" name="Capacidad Actual (kg)" />
                  <Bar dataKey="limite" fill="#ef4444" name="Límite Legal (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ESG */}
        <TabsContent value="esg" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Métricas ESG Promedio</CardTitle>
                <CardDescription>Indicadores ambientales y sostenibilidad</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={esgData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen Sostenibilidad</CardTitle>
                <CardDescription>Indicadores clave</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Emisiones CO2 Promedio</p>
                    <p className="text-2xl font-bold">{avgESGMetrics.co2} tons</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Reciclabilidad Promedio</p>
                    <p className="text-2xl font-bold text-primary">{avgESGMetrics.reciclabilidad}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Uso de Agua</p>
                    <p className="text-2xl font-bold">{avgESGMetrics.agua} m³</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Energía Renovable</p>
                    <p className="text-2xl font-bold text-primary">{avgESGMetrics.energia}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
