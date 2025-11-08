/**
 * SICREP - Packaging Certification Calculator
 * Implements the REP calculation algorithm according to technical specifications
 */

export interface PackagingComponent {
  material: string;
  description: string;
  unitWeightGr: number;
  quantity: number;
  isRecyclable: boolean;
}

export interface CalculationResult {
  totalWeightGr: number;
  recyclableWeightGr: number;
  recyclabilityPercent: number;
  recyclabilityLevel: "Alto" | "Medio" | "Bajo";
  components: {
    material: string;
    description: string;
    unitWeightGr: number;
    quantity: number;
    totalWeightGr: number;
    isRecyclable: boolean;
  }[];
}

/**
 * Calculate total weight and recyclability for a packaging shipment
 * Based on the algorithm from technical specification:
 * 
 * pesoTotalGr = Σ(pesoUnitario × cantidad)
 * pesoReciclableGr = Σ(reciclable ? pesoUnitario × cantidad : 0)
 * reciclabilidadPct = (pesoReciclableGr / pesoTotalGr) * 100
 * 
 * Classification:
 * - Alto: >= 70%
 * - Medio: 50-69.9%
 * - Bajo: < 50%
 */
export function calculatePackagingMetrics(
  components: PackagingComponent[]
): CalculationResult {
  if (components.length === 0) {
    throw new Error("No components provided for calculation");
  }

  let totalWeightGr = 0;
  let recyclableWeightGr = 0;

  const processedComponents = components.map((comp) => {
    const totalGr = comp.unitWeightGr * comp.quantity;
    totalWeightGr += totalGr;

    if (comp.isRecyclable) {
      recyclableWeightGr += totalGr;
    }

    return {
      material: comp.material,
      description: comp.description,
      unitWeightGr: comp.unitWeightGr,
      quantity: comp.quantity,
      totalWeightGr: totalGr,
      isRecyclable: comp.isRecyclable,
    };
  });

  // Calculate recyclability percentage
  const recyclabilityPercent = (recyclableWeightGr / totalWeightGr) * 100;

  // Determine recyclability level
  let recyclabilityLevel: "Alto" | "Medio" | "Bajo";
  if (recyclabilityPercent >= 70) {
    recyclabilityLevel = "Alto";
  } else if (recyclabilityPercent >= 50) {
    recyclabilityLevel = "Medio";
  } else {
    recyclabilityLevel = "Bajo";
  }

  return {
    totalWeightGr,
    recyclableWeightGr,
    recyclabilityPercent: Number(recyclabilityPercent.toFixed(2)),
    recyclabilityLevel,
    components: processedComponents,
  };
}

/**
 * Generate a unique shipment code
 * Format: DESP-CL-YYYY-NNNNNN
 */
export function generateShipmentCode(sequence: number): string {
  const year = new Date().getFullYear();
  return `DESP-CL-${year}-${String(sequence).padStart(6, '0')}`;
}

/**
 * Generate NFC tag UID
 * Format: NFC-YYYY-NNNNNN
 */
export function generateNFCTag(sequence: number): string {
  const year = new Date().getFullYear();
  return `NFC-${year}-${String(sequence).padStart(6, '0')}`;
}

/**
 * Generate blockchain hash for traceability
 * This is a simplified version - in production would use actual blockchain
 */
export function generateBlockchainHash(): string {
  return '0x' + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

/**
 * Generate unique QR code identifier
 * Format: QR-[timestamp]-[random]
 */
export function generateQRCode(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `QR-${timestamp}-${random}`.toUpperCase();
}
