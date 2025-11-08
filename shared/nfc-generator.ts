import crypto from "crypto";

export interface NFCTag {
  tagId: string;
  uid: string;
  type: string;
  data: string;
  signature: string;
  createdAt: Date;
}

/**
 * Genera un tag NFC único con firma digital
 */
export function generateNFCTag(
  entityType: string,
  entityId: string,
  additionalData?: Record<string, any>
): NFCTag {
  // Generar UID único (similar a NFC real)
  const uid = crypto.randomBytes(7).toString("hex").toUpperCase();
  
  // Generar ID del tag
  const tagId = `NFC-${entityType.toUpperCase()}-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  
  // Preparar datos
  const data = JSON.stringify({
    entityType,
    entityId,
    timestamp: new Date().toISOString(),
    ...additionalData,
  });
  
  // Generar firma digital (HMAC-SHA256)
  const signature = crypto
    .createHmac("sha256", process.env.SESSION_SECRET || "sicrep-nfc-secret")
    .update(`${uid}:${data}`)
    .digest("hex");
  
  return {
    tagId,
    uid,
    type: "NTAG215", // Tipo común de NFC compatible
    data,
    signature,
    createdAt: new Date(),
  };
}

/**
 * Valida un tag NFC verificando su firma
 */
export function validateNFCTag(tag: NFCTag): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.SESSION_SECRET || "sicrep-nfc-secret")
    .update(`${tag.uid}:${tag.data}`)
    .digest("hex");
  
  return tag.signature === expectedSignature;
}

/**
 * Decodifica los datos de un tag NFC
 */
export function decodeNFCData(tag: NFCTag): Record<string, any> | null {
  try {
    return JSON.parse(tag.data);
  } catch (error) {
    return null;
  }
}

/**
 * Genera URL de validación para tag NFC
 */
export function generateNFCValidationUrl(tagId: string, baseUrl: string = ""): string {
  return `${baseUrl}/validate/nfc/${tagId}`;
}
