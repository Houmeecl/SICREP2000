import jsPDF from "jspdf";

interface ShipmentData {
  code: string;
  clientName: string;
  totalWeightGr: number;
  recyclableWeightGr: number;
  recyclabilityPercent: string | number;
  recyclabilityLevel: string;
  status: string;
  certifiedAt: string | Date | null;
  blockchainHash: string;
  nfcTag?: string | null;
  qrCode: string;
}

interface ProviderData {
  name: string;
  rut: string;
}

interface ComponentData {
  material: string;
  description: string;
  totalWeightGr: number;
  isRecyclable: boolean;
}

export function generateCertificatePDF(
  shipment: ShipmentData,
  provider: ProviderData,
  components: ComponentData[],
  qrCodeDataUrl?: string
) {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(34, 197, 94); // Green
  doc.rect(0, 0, 210, 30, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO REP", 105, 15, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Sistema Integrado de Certificación", 105, 22, { align: "center" });
  
  // Reset to black text
  doc.setTextColor(0, 0, 0);
  
  // Certificate Seal
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(2);
  doc.circle(190, 50, 12);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO", 190, 48, { align: "center" });
  doc.text("VÁLIDO", 190, 53, { align: "center" });
  
  // Main content
  let yPos = 45;
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Información del Despacho", 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  doc.text("Código de Despacho:", 20, yPos);
  doc.setFont("courier", "bold");
  doc.text(shipment.code, 70, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Cliente:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(shipment.clientName, 70, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Estado:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(shipment.status === "certified" ? "Certificado" : shipment.status, 70, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Fecha de Certificación:", 20, yPos);
  doc.setFont("helvetica", "normal");
  const certDate = shipment.certifiedAt 
    ? new Date(shipment.certifiedAt).toLocaleDateString("es-CL")
    : "N/A";
  doc.text(certDate, 70, yPos);
  
  // Provider information
  yPos += 15;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Proveedor Certificado", 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Nombre:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(provider.name, 70, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("RUT:", 20, yPos);
  doc.setFont("courier", "normal");
  doc.text(provider.rut, 70, yPos);
  
  // Metrics
  yPos += 15;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Métricas de Embalaje", 20, yPos);
  
  yPos += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Peso Total:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.text(`${shipment.totalWeightGr.toLocaleString()} g`, 70, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Peso Reciclable:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 197, 94); // Green
  doc.text(`${shipment.recyclableWeightGr.toLocaleString()} g`, 70, yPos);
  doc.setTextColor(0, 0, 0);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  doc.text("Reciclabilidad:", 20, yPos);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  const recyclabilityValue = typeof shipment.recyclabilityPercent === 'string'
    ? parseFloat(shipment.recyclabilityPercent)
    : shipment.recyclabilityPercent;
  doc.text(`${recyclabilityValue.toFixed(1)}%`, 70, yPos);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Nivel ${shipment.recyclabilityLevel}`, 95, yPos);
  
  // Components table
  yPos += 15;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Componentes de Embalaje", 20, yPos);
  
  yPos += 10;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  
  // Table header
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos - 5, 170, 7, "F");
  doc.text("Material", 22, yPos);
  doc.text("Descripción", 55, yPos);
  doc.text("Peso (g)", 125, yPos);
  doc.text("Reciclable", 155, yPos);
  
  yPos += 7;
  doc.setFont("helvetica", "normal");
  
  // Table rows
  components.forEach((comp, index) => {
    if (yPos > 260) { // New page if needed
      doc.addPage();
      yPos = 20;
    }
    
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(20, yPos - 5, 170, 7, "F");
    }
    
    const material = comp.material.replace("_", " ");
    doc.text(material.charAt(0).toUpperCase() + material.slice(1), 22, yPos);
    
    const desc = comp.description.length > 30 
      ? comp.description.substring(0, 27) + "..."
      : comp.description;
    doc.text(desc, 55, yPos);
    
    doc.text(comp.totalWeightGr.toLocaleString(), 125, yPos);
    doc.text(comp.isRecyclable ? "✓ Sí" : "✗ No", 155, yPos);
    
    yPos += 7;
  });
  
  // QR Code
  if (qrCodeDataUrl) {
    yPos += 10;
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Código QR de Validación", 105, yPos, { align: "center" });
    
    yPos += 5;
    try {
      doc.addImage(qrCodeDataUrl, "PNG", 75, yPos, 60, 60);
      yPos += 65;
    } catch (error) {
      console.error("Error adding QR code to PDF:", error);
    }
  }
  
  // Blockchain hash
  yPos += 5;
  if (yPos > 260) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Trazabilidad Blockchain", 20, yPos);
  
  yPos += 7;
  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  const hashLine1 = shipment.blockchainHash.substring(0, 42);
  const hashLine2 = shipment.blockchainHash.substring(42);
  doc.text(hashLine1, 20, yPos);
  doc.text(hashLine2, 20, yPos + 4);
  
  if (shipment.nfcTag) {
    yPos += 12;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Tag NFC:", 20, yPos);
    doc.setFont("courier", "normal");
    doc.text(shipment.nfcTag, 45, yPos);
  }
  
  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(20, 280, 190, 280);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text("SICREP - Sistema Integrado de Certificación REP", 105, 285, { align: "center" });
  doc.text("Ley 20.920 - Marco para la Gestión de Residuos, Responsabilidad Extendida del Productor", 105, 290, { align: "center" });
  
  // Save
  doc.save(`SICREP_Certificado_${shipment.code}.pdf`);
}
