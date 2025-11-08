import jsPDF from "jspdf";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ESGMetrics } from "./esg-calculator";

export interface ESGReportData {
  providerName: string;
  providerRut: string;
  reportPeriod: string;
  generatedDate: Date;
  certifications: Array<{
    code: string;
    material: string;
    weight: string;
    recyclability: number;
  }>;
  esgMetrics: ESGMetrics;
  copperMarkCompliance: {
    score: number;
    status: "Approved" | "Conditional" | "Not Approved";
    validUntil: Date;
  };
}

/**
 * Generate comprehensive ESG Report with Copper Mark compliance
 * Based on real carbon footprint calculations and mining industry standards
 */
export async function generateESGReport(data: ESGReportData): Promise<Buffer> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  // =============== HEADER ===============
  doc.setFillColor(22, 101, 52);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("INFORME ESG - HUELLA DE CARBONO", pageWidth / 2, 14, { align: "center" });

  doc.setFontSize(14);
  doc.text("SISTEMA SICREP - LEY 20.920", pageWidth / 2, 22, { align: "center" });

  doc.setFontSize(12);
  doc.text("Copper Mark Compliance Framework", pageWidth / 2, 32, { align: "center" });

  yPos = 50;

  // =============== PROVIDER INFO ===============
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Información del Proveedor", margin, yPos);
  yPos += 8;

  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 22, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  yPos += 7;
  doc.text(`Proveedor: ${data.providerName}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`RUT: ${data.providerRut}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`Período: ${data.reportPeriod}`, margin + 5, yPos);
  doc.text(
    `Generado: ${format(data.generatedDate, "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    pageWidth - margin - 70,
    yPos
  );
  yPos += 12;

  // =============== COPPER MARK STATUS ===============
  doc.setFillColor(255, 193, 7);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F");
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  yPos += 6;
  doc.text("COPPER MARK COMPLIANCE STATUS", margin + 5, yPos);

  yPos += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const statusColor =
    data.copperMarkCompliance.status === "Approved"
      ? [34, 139, 34]
      : data.copperMarkCompliance.status === "Conditional"
      ? [255, 165, 0]
      : [220, 20, 60];

  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.setFont("helvetica", "bold");
  doc.text(`Estado: ${data.copperMarkCompliance.status}`, margin + 5, yPos);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  yPos += 6;
  doc.text(`Puntaje Copper Mark: ${data.copperMarkCompliance.score.toFixed(2)}/100`, margin + 5, yPos);
  doc.text(
    `Válido hasta: ${format(data.copperMarkCompliance.validUntil, "dd/MM/yyyy")}`,
    pageWidth / 2 + 10,
    yPos
  );
  yPos += 12;

  // =============== ESG METRICS SUMMARY ===============
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Métricas Ambientales (ESG)", margin, yPos);
  yPos += 8;

  const metricsBoxHeight = 50;
  const boxWidth = (pageWidth - 2 * margin - 6) / 2;

  // Left column - Carbon & Water
  doc.setFillColor(240, 248, 255);
  doc.rect(margin, yPos, boxWidth, metricsBoxHeight, "F");
  doc.setDrawColor(100, 149, 237);
  doc.rect(margin, yPos, boxWidth, metricsBoxHeight);

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Huella de Carbono", margin + 5, yPos + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Emisiones Absolutas:`, margin + 5, yPos + 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(220, 38, 38);
  doc.text(`${data.esgMetrics.absoluteEmissions.toFixed(2)} kg CO₂e`, margin + 5, yPos + 18);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`CO₂ Evitado:`, margin + 5, yPos + 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(34, 139, 34);
  doc.text(`${data.esgMetrics.avoidedEmissions.toFixed(2)} kg`, margin + 5, yPos + 32);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Reducción CO₂:`, margin + 5, yPos + 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(34, 139, 34);
  doc.text(`${data.esgMetrics.carbonReductionPercent.toFixed(1)}%`, margin + 5, yPos + 46);

  // Right column - Water, Energy & Copper Mark
  const rightX = margin + boxWidth + 6;
  doc.setFillColor(255, 250, 240);
  doc.rect(rightX, yPos, boxWidth, metricsBoxHeight, "F");
  doc.setDrawColor(255, 140, 0);
  doc.rect(rightX, yPos, boxWidth, metricsBoxHeight);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Recursos Conservados", rightX + 5, yPos + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Agua Ahorrada:`, rightX + 5, yPos + 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(0, 119, 182);
  doc.text(`${data.esgMetrics.waterSaved.toLocaleString()} L`, rightX + 5, yPos + 19);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Energía Ahorrada:`, rightX + 5, yPos + 27);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 140, 0);
  doc.text(`${data.esgMetrics.energySaved.toFixed(2)} kWh`, rightX + 5, yPos + 34);

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Score Copper Mark:`, rightX + 5, yPos + 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 193, 7);
  doc.text(`${data.esgMetrics.copperMarkScore.toFixed(1)}/100`, rightX + 5, yPos + 49);

  yPos += metricsBoxHeight + 10;

  // =============== MATERIAL BREAKDOWN ===============
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Desglose por Material", margin, yPos);
  yPos += 8;

  // Table header
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  const colX1 = margin + 5;
  const colX2 = margin + 50;
  const colX3 = margin + 90;
  const colX4 = margin + 120;
  const colX5 = margin + 150;

  doc.text("Material", colX1, yPos + 5);
  doc.text("Peso (kg)", colX2, yPos + 5);
  doc.text("CO₂ (kg)", colX3, yPos + 5);
  doc.text("Agua (L)", colX4, yPos + 5);
  doc.text("Energía (kWh)", colX5, yPos + 5);
  yPos += 8;

  // Table rows
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  data.esgMetrics.details.materialBreakdown.forEach((mat, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPos, pageWidth - 2 * margin, 6, "F");
    }

    doc.text(mat.material, colX1, yPos + 4);
    doc.text(mat.weight.toFixed(2), colX2, yPos + 4);
    doc.text(mat.co2Impact.toFixed(2), colX3, yPos + 4);
    doc.text(mat.waterImpact.toLocaleString(), colX4, yPos + 4);
    doc.text(mat.energyImpact.toFixed(2), colX5, yPos + 4);
    yPos += 6;
  });

  yPos += 6;

  // =============== METHODOLOGY ===============
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Metodología de Cálculo", margin, yPos);
  yPos += 6;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`Fórmula: ${data.esgMetrics.details.calculations.formula}`, margin + 5, yPos);
  yPos += 6;

  doc.setFont("helvetica", "italic");
  doc.text("Supuestos y Fuentes:", margin + 5, yPos);
  yPos += 5;

  data.esgMetrics.details.calculations.assumptions.forEach((assumption) => {
    doc.text(`• ${assumption}`, margin + 8, yPos);
    yPos += 4;
  });

  yPos += 4;
  doc.setFont("helvetica", "bold");
  doc.text("Referencias Científicas:", margin + 5, yPos);
  yPos += 5;

  doc.setFont("helvetica", "normal");
  data.esgMetrics.details.calculations.sources.forEach((source) => {
    doc.text(`• ${source}`, margin + 8, yPos);
    yPos += 4;
  });

  // =============== FOOTER ===============
  const footerY = pageHeight - 25;
  doc.setFillColor(245, 245, 245);
  doc.rect(0, footerY, pageWidth, 25, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Este informe ESG ha sido generado según los estándares de Copper Mark y la Ley 20.920 de Chile.",
    pageWidth / 2,
    footerY + 6,
    { align: "center" }
  );
  doc.text(
    "Los cálculos están basados en datos científicos de IPCC, EPA, ICMM y Water Footprint Network.",
    pageWidth / 2,
    footerY + 11,
    { align: "center" }
  );
  doc.text(
    `Generado: ${format(data.generatedDate, "dd/MM/yyyy HH:mm:ss")} - SICREP v1.0`,
    pageWidth / 2,
    footerY + 16,
    { align: "center" }
  );

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  return pdfBuffer;
}
