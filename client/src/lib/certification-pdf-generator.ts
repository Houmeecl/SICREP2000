import jsPDF from "jspdf";

interface CertificationData {
  certificationCode: string;
  providerName: string;
  providerRut: string;
  certificationDate: string;
  validUntil: string;
  score: number;
  category: string;
  status: string;
  qrCode?: string;
  nfcTag?: string;
}

interface AuditScores {
  documentary: number;
  operational: number;
  valueAdded: number;
  total: number;
  details: {
    legalDocs: number;
    environmentalCerts: number;
    procedures: number;
    traceability: number;
    wasteManagement: number;
    training: number;
    infrastructure: number;
    compliance: number;
    ecoDesign: number;
    additionalCerts: number;
  };
}

export function generateCertificationPDF(
  certification: CertificationData,
  auditScores?: AuditScores,
  qrCodeDataUrl?: string
) {
  const doc = new jsPDF();
  
  // Header with brand
  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO REP", 105, 15, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Sistema Integral de Certificación", 105, 23, { align: "center" });
  doc.text("Ley 20.920 - Marco para la Gestión de Residuos", 105, 29, { align: "center" });
  
  // Certificate seal
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(3);
  doc.circle(185, 55, 15);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO", 185, 52, { align: "center" });
  doc.text("VÁLIDO", 185, 58, { align: "center" });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  let yPos = 50;
  
  // Certificate information
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Información del Certificado", 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  
  doc.text("Código de Certificación:", 20, yPos);
  doc.setFont("courier", "bold");
  doc.text(certification.certificationCode, 75, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Proveedor:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(certification.providerName, 75, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("RUT:", 20, yPos);
  doc.setFont("courier", "normal");
  doc.text(certification.providerRut, 75, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Fecha de Certificación:", 20, yPos);
  doc.text(certification.certificationDate, 75, yPos);
  
  yPos += 7;
  doc.text("Válido Hasta:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(certification.validUntil, 75, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Estado:", 20, yPos);
  doc.setFont("helvetica", "bold");
  const statusText = certification.status === "active" ? "ACTIVO" : certification.status.toUpperCase();
  doc.text(statusText, 75, yPos);
  
  // Scoring section if available
  if (auditScores) {
    yPos += 15;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Evaluación de Cumplimiento (100 Puntos)", 20, yPos);
    
    yPos += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos - 5, 170, 50, "F");
    
    // Main scores
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Criterios Documentales:", 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${auditScores.documentary}/40 pts`, 100, yPos);
    
    yPos += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Criterios Operativos:", 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${auditScores.operational}/40 pts`, 100, yPos);
    
    yPos += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Valor Agregado:", 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(`${auditScores.valueAdded}/20 pts`, 100, yPos);
    
    yPos += 12;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("PUNTAJE TOTAL:", 25, yPos);
    doc.setTextColor(34, 197, 94);
    doc.text(`${auditScores.total}/100`, 100, yPos);
    doc.setTextColor(0, 0, 0);
    
    yPos += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Categoría:", 25, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(certification.category, 100, yPos);
    
    // Detailed breakdown
    yPos += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Desglose Detallado", 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Criterio", 25, yPos);
    doc.text("Puntos", 140, yPos);
    
    yPos += 6;
    doc.setFont("helvetica", "normal");
    
    const criteria = [
      { name: "Documentos Legales", score: auditScores.details.legalDocs, max: 10 },
      { name: "Certificaciones Ambientales", score: auditScores.details.environmentalCerts, max: 10 },
      { name: "Procedimientos Operativos", score: auditScores.details.procedures, max: 10 },
      { name: "Trazabilidad", score: auditScores.details.traceability, max: 10 },
      { name: "Gestión de Residuos", score: auditScores.details.wasteManagement, max: 10 },
      { name: "Capacitación Personal", score: auditScores.details.training, max: 10 },
      { name: "Infraestructura", score: auditScores.details.infrastructure, max: 10 },
      { name: "Cumplimiento Normativo", score: auditScores.details.compliance, max: 10 },
      { name: "Ecodiseño y Material Reciclado", score: auditScores.details.ecoDesign, max: 10 },
      { name: "Certificaciones Adicionales", score: auditScores.details.additionalCerts, max: 10 },
    ];
    
    criteria.forEach((criterion) => {
      doc.text(criterion.name, 25, yPos);
      doc.text(`${criterion.score}/${criterion.max}`, 140, yPos);
      yPos += 6;
    });
  }
  
  // QR Code section
  if (qrCodeDataUrl) {
    yPos += 15;
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Código QR de Validación", 105, yPos, { align: "center" });
    
    yPos += 8;
    try {
      doc.addImage(qrCodeDataUrl, "PNG", 75, yPos, 60, 60);
      yPos += 65;
    } catch (error) {
      console.error("Error adding QR code to PDF:", error);
    }
  }
  
  // NFC Tag information
  if (certification.nfcTag) {
    yPos += 5;
    if (yPos > 260) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Trazabilidad NFC", 20, yPos);
    
    yPos += 7;
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.text(`Tag NFC: ${certification.nfcTag}`, 20, yPos);
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
    doc.text("Ley 20.920 - Marco para la Gestión de Residuos, Responsabilidad Extendida del Productor", 105, 290, { align: "center" });
    doc.text(`Página ${i} de ${pageCount}`, 190, 290, { align: "right" });
  }
  
  // Save
  doc.save(`SICREP_Certificado_${certification.certificationCode}.pdf`);
}
