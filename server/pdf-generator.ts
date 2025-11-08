import jsPDF from "jspdf";
import QRCode from "qrcode";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export interface CertificationPDFData {
  code: string;
  providerName: string;
  providerRut: string;
  cpsCode: string;
  materialType: string;
  weight: string;
  recyclability: number;
  scoreDocumentales: number;
  scoreOperativos: number;
  scoreValorAgregado: number;
  scoreTotal: number;
  nfcTag: string;
  blockchainHash: string;
  qrCode: string;
  issuedAt: Date;
  expiresAt: Date;
  evaluatorName?: string;
  auditorName?: string;
}

/**
 * Generates an official REP certification PDF according to Chilean Law 20.920
 * Format includes official headers, scoring breakdown, NFC/QR codes, and legal compliance
 */
export async function generateOfficialREPCertificate(data: CertificationPDFData): Promise<Buffer> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // =============== HEADER - Official REP Logo & Title ===============
  doc.setFillColor(22, 101, 52); // Dark green
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("REPÚBLICA DE CHILE", pageWidth / 2, 12, { align: "center" });

  doc.setFontSize(16);
  doc.text("MINISTERIO DEL MEDIO AMBIENTE", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(14);
  doc.text("CERTIFICACIÓN REP - LEY 20.920", pageWidth / 2, 28, { align: "center" });

  yPos = 45;

  // =============== Document Title ===============
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO DE CUMPLIMIENTO REP", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`N° ${data.code}`, pageWidth / 2, yPos, { align: "center" });
  yPos += 15;

  // =============== Company Information Section ===============
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 30, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  yPos += 8;
  doc.text("INFORMACIÓN DEL PROVEEDOR", margin + 5, yPos);

  doc.setFont("helvetica", "normal");
  yPos += 7;
  doc.text(`Razón Social: ${data.providerName}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`RUT: ${data.providerRut}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`Certificado CPS: ${data.cpsCode}`, margin + 5, yPos);
  yPos += 12;

  // =============== Material Information Section ===============
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 24, "F");

  doc.setFont("helvetica", "bold");
  yPos += 8;
  doc.text("INFORMACIÓN DEL MATERIAL", margin + 5, yPos);

  doc.setFont("helvetica", "normal");
  yPos += 7;
  doc.text(`Tipo de Material: ${data.materialType}`, margin + 5, yPos);
  yPos += 6;
  doc.text(`Peso (kg): ${data.weight}`, margin + 5, yPos);
  doc.text(`Reciclabilidad: ${data.recyclability}%`, pageWidth / 2 + 10, yPos);
  yPos += 12;

  // =============== Scoring Section - REP Compliance ===============
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  yPos += 6;
  doc.text("EVALUACIÓN DE CUMPLIMIENTO REP", margin + 5, yPos);

  yPos += 8;
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Score table header
  const scoreTableY = yPos;
  const colWidth = (pageWidth - 2 * margin) / 4;

  doc.setFillColor(230, 230, 230);
  doc.rect(margin, scoreTableY, pageWidth - 2 * margin, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.text("CRITERIO", margin + 5, scoreTableY + 5);
  doc.text("PUNTAJE", margin + colWidth * 2, scoreTableY + 5);
  doc.text("MAX", margin + colWidth * 3, scoreTableY + 5);
  doc.text("CUMPLE", margin + colWidth * 3.3, scoreTableY + 5);

  yPos = scoreTableY + 8;

  // Score rows
  doc.setFont("helvetica", "normal");
  const scoreRows = [
    { label: "Documentales", score: data.scoreDocumentales, max: 30 },
    { label: "Operativos", score: data.scoreOperativos, max: 40 },
    { label: "Valor Agregado", score: data.scoreValorAgregado, max: 30 },
  ];

  scoreRows.forEach((row) => {
    yPos += 6;
    doc.text(row.label, margin + 5, yPos);
    doc.text(row.score.toString(), margin + colWidth * 2 + 5, yPos);
    doc.text(row.max.toString(), margin + colWidth * 3 + 5, yPos);
    
    const compliance = row.score >= row.max * 0.6 ? "SÍ" : "NO";
    const complianceColor = compliance === "SÍ" ? [0, 128, 0] : [255, 0, 0];
    doc.setTextColor(complianceColor[0], complianceColor[1], complianceColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text(compliance, margin + colWidth * 3.4, yPos);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
  });

  // Total Score
  yPos += 8;
  doc.setFillColor(22, 101, 52);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  yPos += 6;
  doc.text("PUNTAJE TOTAL", margin + 5, yPos);
  doc.text(`${data.scoreTotal} / 100`, margin + colWidth * 2, yPos);
  
  const totalCompliance = data.scoreTotal >= 60 ? "APROBADO" : "RECHAZADO";
  doc.text(totalCompliance, margin + colWidth * 3.2, yPos);

  yPos += 12;
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // =============== Blockchain & NFC Section ===============
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 24, "F");

  doc.setFont("helvetica", "bold");
  yPos += 8;
  doc.text("TRAZABILIDAD BLOCKCHAIN & NFC", margin + 5, yPos);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  yPos += 6;
  doc.text(`Tag NFC: ${data.nfcTag}`, margin + 5, yPos);
  yPos += 5;
  doc.text(`Hash Blockchain: ${data.blockchainHash.substring(0, 42)}...`, margin + 5, yPos);
  yPos += 5;
  doc.text(`Código QR: ${data.qrCode}`, margin + 5, yPos);
  yPos += 12;

  // =============== QR Code ===============
  try {
    const qrDataUrl = await QRCode.toDataURL(
      `https://sicrep.cl/validate/${data.code}`,
      {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 200,
      }
    );
    
    doc.addImage(qrDataUrl, "PNG", pageWidth - margin - 35, yPos - 35, 30, 30);
    
    doc.setFontSize(8);
    doc.text("Escanear para validar", pageWidth - margin - 35, yPos - 2, { align: "left" });
  } catch (error) {
    console.error("Error generating QR code:", error);
  }

  // =============== Dates Section ===============
  yPos += 5;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("VIGENCIA DEL CERTIFICADO", margin, yPos);

  doc.setFont("helvetica", "normal");
  yPos += 6;
  doc.text(
    `Fecha de Emisión: ${format(data.issuedAt, "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    margin,
    yPos
  );
  yPos += 6;
  doc.text(
    `Fecha de Expiración: ${format(data.expiresAt, "dd 'de' MMMM 'de' yyyy", { locale: es })}`,
    margin,
    yPos
  );

  // =============== Signatures Section ===============
  yPos += 15;
  const signatureY = yPos;

  // Evaluator signature
  doc.line(margin, signatureY, margin + 60, signatureY);
  doc.setFontSize(9);
  yPos += 5;
  doc.text(data.evaluatorName || "EVALUADOR AUTORIZADO", margin, yPos);
  yPos += 4;
  doc.setFontSize(8);
  doc.text("Evaluador REP", margin, yPos);

  // Auditor signature
  if (data.auditorName) {
    doc.setFontSize(10);
    yPos = signatureY;
    doc.line(pageWidth - margin - 60, signatureY, pageWidth - margin, signatureY);
    yPos += 5;
    doc.setFontSize(9);
    doc.text(data.auditorName, pageWidth - margin - 60, yPos);
    yPos += 4;
    doc.setFontSize(8);
    doc.text("Auditor REP", pageWidth - margin - 60, yPos);
  }

  // =============== Footer - Legal Notice ===============
  yPos = pageHeight - 30;
  doc.setFillColor(240, 240, 240);
  doc.rect(0, yPos, pageWidth, 30, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  yPos += 5;
  doc.text(
    "Este certificado es emitido bajo los términos de la Ley 20.920 sobre Gestión de Residuos,",
    pageWidth / 2,
    yPos,
    { align: "center" }
  );
  yPos += 4;
  doc.text(
    "Responsabilidad Extendida del Productor y Fomento al Reciclaje de la República de Chile.",
    pageWidth / 2,
    yPos,
    { align: "center" }
  );
  yPos += 4;
  doc.text(
    "La autenticidad de este documento puede ser verificada mediante el código QR o en https://sicrep.cl",
    pageWidth / 2,
    yPos,
    { align: "center" }
  );

  doc.setFontSize(7);
  yPos += 5;
  doc.text(
    `Documento generado el ${format(new Date(), "dd/MM/yyyy HH:mm:ss")} - Sistema SICREP v1.0`,
    pageWidth / 2,
    yPos,
    { align: "center" }
  );

  // Convert to buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  return pdfBuffer;
}

/**
 * Generate a simple evaluation report for internal use
 */
export async function generateEvaluationReport(data: CertificationPDFData): Promise<Buffer> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Reporte de Evaluación REP", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 15;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Código: ${data.code}`, 20, yPos);
  yPos += 8;
  doc.text(`Proveedor: ${data.providerName}`, 20, yPos);
  yPos += 8;
  doc.text(`RUT: ${data.providerRut}`, 20, yPos);
  
  yPos += 15;
  doc.setFont("helvetica", "bold");
  doc.text("Resultados de Evaluación:", 20, yPos);
  yPos += 8;
  doc.setFont("helvetica", "normal");
  doc.text(`Documentales: ${data.scoreDocumentales}/30`, 20, yPos);
  yPos += 6;
  doc.text(`Operativos: ${data.scoreOperativos}/40`, 20, yPos);
  yPos += 6;
  doc.text(`Valor Agregado: ${data.scoreValorAgregado}/30`, 20, yPos);
  yPos += 6;
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: ${data.scoreTotal}/100`, 20, yPos);

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
  return pdfBuffer;
}
