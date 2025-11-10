import { db } from "../db";
import { type IStorage } from "../storage";
import { type InsertCertificationRequest, type CertificationRequest } from "@shared/schema";
import { validateChileanRUT, generateUsername } from "../utils/rut";
import { generateSecurePassword } from "../utils/password";
import { emailService } from "./emailService";
import bcrypt from "bcrypt";

export interface ApprovalResult {
  success: boolean;
  userId?: string;
  providerId?: string;
  certificationId?: string;
  username?: string;
  tempPassword?: string;
  error?: string;
}

export class CertificationRequestService {
  constructor(private storage: IStorage) {}

  async createRequest(
    requestData: InsertCertificationRequest,
    documents: Array<{ fileName: string; fileSize: number; fileType: string; fileData: string; category?: string }>
  ): Promise<CertificationRequest> {
    // Validate RUT
    if (!validateChileanRUT(requestData.companyRut)) {
      throw new Error("RUT inválido");
    }

    // Create request
    const request = await this.storage.createCertificationRequest(requestData);

    // Create documents
    if (documents.length > 0) {
      const docsToCreate = documents.map(doc => ({
        ...doc,
        requestId: request.id,
      }));
      await this.storage.createMultipleRequestDocuments(docsToCreate);
    }

    return request;
  }

  async approveRequest(requestId: string, reviewerId: string, reviewNotes?: string): Promise<ApprovalResult> {
    const request = await this.storage.getCertificationRequest(requestId);

    if (!request) {
      return { success: false, error: "Solicitud no encontrada" };
    }

    if (request.status !== "pending" && request.status !== "reviewing") {
      return { success: false, error: "La solicitud ya fue procesada" };
    }

    try {
      // Use transaction to ensure atomicity
      const result = await db.transaction(async (tx) => {
        // 1. Create provider
        const [provider] = await tx.insert(await import("@shared/schema").then(m => m.providers)).values({
          name: request.companyName,
          rut: request.companyRut,
          email: request.companyEmail,
          phone: request.companyPhone,
          address: request.companyAddress,
          active: true,
        }).returning();

        // 2. Generate user credentials
        const username = generateUsername(request.companyRut, request.contactEmail);
        const tempPassword = generateSecurePassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // 3. Create user
        const [user] = await tx.insert(await import("@shared/schema").then(m => m.users)).values({
          username,
          password: hashedPassword,
          email: request.contactEmail,
          fullName: request.contactName,
          rut: request.companyRut,
          role: "proveedor",
          active: true,
        }).returning();

        // 4. Get first available CPS (or null for manual assignment)
        const allCPS = await this.storage.getAllCPS();
        const defaultCPS = allCPS.find(cps => cps.status === "active");

        if (!defaultCPS) {
          throw new Error("No hay sistemas CPS disponibles");
        }

        // 5. Generate certification code
        const certCode = `CERT-${Date.now()}-${provider.id.slice(0, 8).toUpperCase()}`;

        // 6. Create certification
        const [certification] = await tx.insert(await import("@shared/schema").then(m => m.certifications)).values({
          code: certCode,
          providerId: provider.id,
          cpsId: defaultCPS.id,
          status: "solicitud_inicial",
          currentPhase: "solicitud_inicial",
          createdBy: user.id,
          assignedTo: reviewerId,
        }).returning();

        // 7. Create workflow history entry
        await tx.insert(await import("@shared/schema").then(m => m.workflowHistory)).values({
          certificationId: certification.id,
          phase: "solicitud_inicial",
          status: "Solicitud aprobada y certificación creada",
          userId: reviewerId,
          notes: reviewNotes || "Solicitud aprobada desde panel de administración",
        });

        // 8. Create activity log
        await tx.insert(await import("@shared/schema").then(m => m.activityLog)).values({
          type: "certification_request_approved",
          title: "Solicitud de Certificación Aprobada",
          description: `Nueva empresa: ${request.companyName} (RUT: ${request.companyRut})`,
          userId: reviewerId,
          relatedId: certification.id,
          status: "success",
        });

        // 9. Update request status
        const { certificationRequests: certReqTable } = await import("@shared/schema");
        const { eq: eqFn } = await import("drizzle-orm");
        await tx.update(certReqTable)
          .set({
            status: "approved",
            reviewedBy: reviewerId,
            reviewedAt: new Date(),
            reviewNotes: reviewNotes || "Aprobado",
            createdUserId: user.id,
            createdProviderId: provider.id,
            createdCertificationId: certification.id,
          })
          .where(eqFn(certReqTable.id, requestId));

        return {
          userId: user.id,
          providerId: provider.id,
          certificationId: certification.id,
          username,
          tempPassword,
        };
      });

      // 10. Send email (outside transaction)
      await emailService.sendCredentials(
        request.contactEmail,
        result.username,
        result.tempPassword,
        request.companyName
      );

      return {
        success: true,
        ...result,
      };
    } catch (error) {
      console.error("Error approving request:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al aprobar solicitud",
      };
    }
  }

  async rejectRequest(requestId: string, reviewerId: string, reviewNotes: string): Promise<{success: boolean, error?: string}> {
    const request = await this.storage.getCertificationRequest(requestId);

    if (!request) {
      return { success: false, error: "Solicitud no encontrada" };
    }

    if (request.status !== "pending" && request.status !== "reviewing") {
      return { success: false, error: "La solicitud ya fue procesada" };
    }

    try {
      await this.storage.updateCertificationRequest(requestId, {
        status: "rejected",
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
        reviewNotes,
      });

      await emailService.sendRejectionNotice(
        request.contactEmail,
        request.companyName,
        reviewNotes
      );

      await this.storage.createActivity({
        type: "certification_request_rejected",
        title: "Solicitud de Certificación Rechazada",
        description: `Empresa: ${request.companyName} (RUT: ${request.companyRut})`,
        userId: reviewerId,
        relatedId: requestId,
        status: "error",
      });

      return { success: true };
    } catch (error) {
      console.error("Error rejecting request:", error);
      return { success: false, error: error instanceof Error ? error.message : "Error al rechazar solicitud" };
    }
  }
}

// Export singleton instance
export const certificationRequestService = new CertificationRequestService(
  await import("../storage").then(m => m.storage)
);
