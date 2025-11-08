import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertCompanySchema,
  insertNFCTagSchema,
  insertProviderSchema,
  insertCPSSchema,
  insertCertificationSchema,
  insertWorkflowHistorySchema,
  insertNFCEventSchema,
  insertESGMetricSchema,
  insertActivityLogSchema,
  insertShipmentSchema,
  insertPackagingComponentSchema,
  insertLoginConfigSchema,
} from "@shared/schema";
import bcrypt from "bcrypt";
import {
  calculatePackagingMetrics,
  generateShipmentCode,
  generateNFCTag as generateNFCTagUtil,
  generateBlockchainHash as generateBlockchainHashUtil,
  generateQRCode as generateQRCodeUtil,
} from "./packaging-calculator";
import QRCode from "qrcode";
import { generateOfficialREPCertificate, generateEvaluationReport } from "./pdf-generator";
import { calculateESGMetrics, calculateAggregatedESG } from "./esg-calculator";
import { generateESGReport } from "./esg-pdf-generator";

// Helper to generate unique codes
function generateCode(prefix: string, year: number, sequence: number): string {
  return `${prefix}-CL-${year}-${String(sequence).padStart(6, '0')}`;
}

// Authentication middleware
function requireAuth(req: Request, res: Response, next: any) {
  if (!req.session.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  next();
}

// Role-based authorization middleware
function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: any) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "No autenticado" });
    }
    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).json({ message: "No autorizado para esta acción" });
    }
    next();
  };
}

export function registerRoutes(app: Express): Server {
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      // Create session
      req.session.userId = user.id;
      req.session.user = userWithoutPassword;
      
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.clearCookie('connect.sid');
      res.json({ message: "Sesión cerrada exitosamente" });
    });
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "No autenticado" });
    }
    res.json(req.session.user);
  });

  // Users routes
  app.get("/api/users", requireRole('admin'), async (_req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPassword = users.map(({ password: _, ...user }) => user);
      res.json(usersWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/users", requireRole('admin'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });
      
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/users/:id", requireRole('admin'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };
      
      // Hash password if it's being updated
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      
      const user = await storage.updateUser(id, updateData);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Login Configuration routes
  app.get("/api/login-config", async (_req: Request, res: Response) => {
    try {
      const config = await storage.getLoginConfig();
      res.json(config || {
        imageUrl: null,
        title: "Sistema de Certificación REP",
        subtitle: "Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental según Ley 20.920"
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/login-config", requireRole('admin'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertLoginConfigSchema.parse(req.body);
      const config = await storage.upsertLoginConfig(validatedData);
      res.json(config);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Dashboard Statistics
  app.get("/api/dashboard/stats", requireAuth, async (_req: Request, res: Response) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Companies routes
  app.get("/api/companies", requireAuth, async (_req: Request, res: Response) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/companies/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await storage.getCompany(id);
      if (!company) {
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      res.json(company);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/companies", requireRole('admin'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/companies/:id", requireRole('admin'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = await storage.updateCompany(id, req.body);
      if (!company) {
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      res.json(company);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // NFC Tags routes
  app.get("/api/nfc-tags", requireAuth, async (_req: Request, res: Response) => {
    try {
      const tags = await storage.getAllNFCTags();
      res.json(tags);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/nfc-tags/:tagId", async (req: Request, res: Response) => {
    try {
      const { tagId } = req.params;
      const tag = await storage.getNFCTagByTagId(tagId);
      if (!tag) {
        return res.status(404).json({ message: "Tag NFC no encontrado" });
      }
      res.json(tag);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/nfc-tags", requireAuth, async (req: Request, res: Response) => {
    try {
      const validatedData = insertNFCTagSchema.parse(req.body);
      const tag = await storage.createNFCTag(validatedData);
      res.status(201).json(tag);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/nfc-tags/:tagId/scan", async (req: Request, res: Response) => {
    try {
      const { tagId } = req.params;
      const tag = await storage.getNFCTagByTagId(tagId);
      
      if (!tag) {
        return res.status(404).json({ message: "Tag NFC no encontrado" });
      }
      
      // Update last scanned time
      const updatedTag = await storage.updateNFCTag(tag.id, {
        lastScanned: new Date(),
      });
      
      res.json(updatedTag);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Providers routes
  app.get("/api/providers", requireAuth, async (_req: Request, res: Response) => {
    try {
      const providers = await storage.getAllProviders();
      res.json(providers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/providers/me", requireAuth, async (req: Request, res: Response) => {
    try {
      const user = req.session.user;
      if (!user || !user.rut) {
        return res.status(404).json({ message: "Usuario sin RUT asociado" });
      }
      const provider = await storage.getProviderByRut(user.rut);
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }
      res.json(provider);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/providers", requireRole('admin', 'manager_operaciones'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertProviderSchema.parse(req.body);
      const provider = await storage.createProvider(validatedData);
      res.status(201).json(provider);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/providers/:id", requireRole('admin', 'manager_operaciones'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const provider = await storage.updateProvider(id, req.body);
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }
      res.json(provider);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // CPS Catalog routes
  app.get("/api/cps", requireAuth, async (_req: Request, res: Response) => {
    try {
      const catalog = await storage.getAllCPS();
      res.json(catalog);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/cps", requireRole('admin', 'manager_operaciones', 'cps'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertCPSSchema.parse(req.body);
      const cps = await storage.createCPS(validatedData);
      
      await storage.createActivity({
        type: "CPS",
        title: `Nuevo CPS creado: ${cps.code}`,
        description: `${cps.material} - ${cps.type}`,
        status: "info",
      });
      
      res.status(201).json(cps);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Certifications routes
  app.get("/api/certifications", requireAuth, async (_req: Request, res: Response) => {
    try {
      const certs = await storage.getAllCertifications();
      res.json(certs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/certifications", requireAuth, async (req: Request, res: Response) => {
    try {
      const allCerts = await storage.getAllCertifications();
      const sequence = allCerts.length + 1;
      const year = new Date().getFullYear();
      
      const certificationData = {
        ...req.body,
        code: generateCode('CERT', year, sequence),
        status: "solicitud_inicial" as const,
        currentPhase: "solicitud_inicial" as const,
      };
      
      const validatedData = insertCertificationSchema.parse(certificationData);
      const certification = await storage.createCertification(validatedData);
      
      await storage.createWorkflowHistory({
        certificationId: certification.id,
        phase: "solicitud_inicial",
        status: "completed",
        userId: certification.createdBy,
        sla: "24h",
        completedAt: new Date(),
      });
      
      await storage.createActivity({
        type: "Certificación",
        title: `Nueva solicitud de certificación: ${certification.code}`,
        relatedId: certification.id,
        status: "info",
      });
      
      res.status(201).json(certification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/certifications/:id", requireRole('admin', 'evaluador', 'auditor'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const cert = await storage.updateCertification(id, req.body);
      if (!cert) {
        return res.status(404).json({ message: "Certificación no encontrada" });
      }
      res.json(cert);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Advance certification to next phase
  app.post("/api/certifications/:id/advance", requireRole('admin', 'evaluador', 'auditor'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      
      const cert = await storage.getCertification(id);
      if (!cert) {
        return res.status(404).json({ message: "Certificación no encontrada" });
      }
      
      const phaseOrder = [
        "solicitud_inicial",
        "asignacion_cps",
        "evaluacion_documentos",
        "evaluacion_operativa",
        "evaluacion_valor_agregado",
        "revision_final",
        "emision_certificado",
        "activacion_nfc",
        "publicacion",
        "monitoreo_continuo"
      ];
      
      const currentIndex = phaseOrder.indexOf(cert.currentPhase || "solicitud_inicial");
      const nextPhase = phaseOrder[currentIndex + 1];
      
      if (!nextPhase) {
        return res.status(400).json({ message: "La certificación ya está en la fase final" });
      }
      
      let updates: any = {
        currentPhase: nextPhase,
        status: nextPhase,
      };
      
      // Generate NFC tag and blockchain hash when activating NFC
      if (nextPhase === "activacion_nfc") {
        const allCerts = await storage.getAllCertifications();
        const sequence = allCerts.length;
        updates.nfcTag = generateNFCTag(sequence);
        updates.blockchainHash = generateBlockchainHash();
        updates.qrCode = `QR-${updates.nfcTag}`;
      }
      
      // Set issued date when emitting certificate
      if (nextPhase === "emision_certificado") {
        updates.issuedAt = new Date();
        updates.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
      }
      
      const updatedCert = await storage.updateCertification(id, updates);
      
      await storage.createWorkflowHistory({
        certificationId: id,
        phase: nextPhase as any,
        status: "completed",
        userId: userId,
        completedAt: new Date(),
      });
      
      await storage.createActivity({
        type: "Certificación",
        title: `Certificación ${cert.code} avanzó a: ${nextPhase}`,
        relatedId: id,
        status: "success",
      });
      
      res.json(updatedCert);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Generate PDF certificate
  app.get("/api/certifications/:id/pdf", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const cert = await storage.getCertification(id);
      
      if (!cert) {
        return res.status(404).json({ message: "Certificación no encontrada" });
      }
      
      if (!cert.issuedAt) {
        return res.status(400).json({ message: "El certificado aún no ha sido emitido" });
      }
      
      // Get provider and CPS data
      const provider = await storage.getProvider(cert.providerId);
      const cps = await storage.getCPS(cert.cpsId);
      
      if (!provider || !cps) {
        return res.status(404).json({ message: "Datos de proveedor o CPS no encontrados" });
      }
      
      // Get evaluator and auditor info if available
      let evaluatorName = "EVALUADOR AUTORIZADO";
      let auditorName = undefined;
      
      if (cert.assignedTo) {
        const evaluator = await storage.getUser(cert.assignedTo);
        if (evaluator) {
          evaluatorName = evaluator.fullName;
        }
      }
      
      const pdfData = {
        code: cert.code,
        providerName: provider.name,
        providerRut: provider.rut,
        cpsCode: cps.code,
        materialType: cps.material,
        weight: cps.weight,
        recyclability: cps.recyclability,
        scoreDocumentales: cert.scoreDocumentales || 0,
        scoreOperativos: cert.scoreOperativos || 0,
        scoreValorAgregado: cert.scoreValorAgregado || 0,
        scoreTotal: cert.scoreTotal || 0,
        nfcTag: cert.nfcTag || "Pendiente",
        blockchainHash: cert.blockchainHash || "Pendiente",
        qrCode: cert.qrCode || "Pendiente",
        issuedAt: cert.issuedAt,
        expiresAt: cert.expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        evaluatorName,
        auditorName,
      };
      
      const pdfBuffer = await generateOfficialREPCertificate(pdfData);
      
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="Certificado-REP-${cert.code}.pdf"`);
      res.send(pdfBuffer);
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Complete certification flow - generates evaluation and certificate
  app.post("/api/certifications/:id/complete", requireRole('admin', 'evaluador', 'auditor'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { scoreDocumentales, scoreOperativos, scoreValorAgregado } = req.body;
      
      const cert = await storage.getCertification(id);
      if (!cert) {
        return res.status(404).json({ message: "Certificación no encontrada" });
      }
      
      const scoreTotal = (scoreDocumentales || 0) + (scoreOperativos || 0) + (scoreValorAgregado || 0);
      
      // Generate NFC/QR codes
      const allCerts = await storage.getAllCertifications();
      const sequence = allCerts.length;
      const nfcTag = generateNFCTag(sequence);
      const blockchainHash = generateBlockchainHash();
      const qrCode = `QR-${nfcTag}`;
      
      // Update certification with scores and codes
      const updatedCert = await storage.updateCertification(id, {
        scoreDocumentales: scoreDocumentales || 0,
        scoreOperativos: scoreOperativos || 0,
        scoreValorAgregado: scoreValorAgregado || 0,
        scoreTotal,
        nfcTag,
        blockchainHash,
        qrCode,
        status: scoreTotal >= 60 ? "publicado" : "rechazado",
        currentPhase: scoreTotal >= 60 ? "monitoreo_continuo" : undefined,
        issuedAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
      
      // Create NFC tag in system
      await storage.createNFCTag({
        tagId: nfcTag,
        uid: `UID-${nfcTag}`,
        type: "NTAG215",
        entityType: "certification",
        entityId: id,
        data: JSON.stringify({
          certificationCode: cert.code,
          providerId: cert.providerId,
          issuedAt: new Date().toISOString(),
        }),
        signature: blockchainHash,
        active: true,
      });
      
      // Log activity
      await storage.createActivity({
        type: "Certificación",
        title: `Certificación ${cert.code} completada`,
        description: `Puntaje total: ${scoreTotal}/100 - ${scoreTotal >= 60 ? 'APROBADO' : 'RECHAZADO'}`,
        userId: req.session.user?.id,
        relatedId: id,
        status: scoreTotal >= 60 ? "success" : "warning",
      });
      
      res.json(updatedCert);
    } catch (error: any) {
      console.error("Error completing certification:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Workflow History routes
  app.get("/api/certifications/:id/history", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const history = await storage.getWorkflowHistory(id);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // NFC Events routes
  app.get("/api/certifications/:id/nfc-events", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const events = await storage.getNFCEvents(id);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/nfc-events", requireAuth, async (req: Request, res: Response) => {
    try {
      const eventData = {
        ...req.body,
        blockchainHash: generateBlockchainHash(),
      };
      
      const validatedData = insertNFCEventSchema.parse(eventData);
      const event = await storage.createNFCEvent(validatedData);
      
      await storage.createActivity({
        type: "NFC",
        title: `Nuevo escaneo NFC: ${event.action}`,
        description: event.location,
        relatedId: event.certificationId,
        status: "info",
      });
      
      res.status(201).json(event);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // ESG Metrics routes
  app.get("/api/esg-metrics", requireAuth, async (_req: Request, res: Response) => {
    try {
      const metrics = await storage.getAllESGMetrics();
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/esg-metrics", requireRole('admin', 'analista'), async (req: Request, res: Response) => {
    try {
      const validatedData = insertESGMetricSchema.parse(req.body);
      const metric = await storage.createESGMetric(validatedData);
      res.status(201).json(metric);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Generate ESG Report for provider with real carbon footprint calculations
  app.get("/api/providers/:id/esg-report", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const provider = await storage.getProvider(id);
      
      if (!provider) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }

      // Get all certifications for this provider
      const allCerts = await storage.getAllCertifications();
      const providerCerts = allCerts.filter(c => c.providerId === id && c.status === "publicado");

      if (providerCerts.length === 0) {
        return res.status(400).json({ message: "El proveedor no tiene certificaciones activas" });
      }

      // Collect material data from all certifications
      const certificationsData = [];
      for (const cert of providerCerts) {
        const cps = await storage.getCPS(cert.cpsId);
        if (cps) {
          // Parse weight (remove "kg" if present)
          const weight = parseFloat(cps.weight.replace(/[^\d.]/g, ''));
          
          certificationsData.push({
            code: cert.code,
            material: cps.material,
            weight: cps.weight,
            recyclability: cps.recyclability,
          });

          // Add to materials array for calculation
        }
      }

      // Calculate real ESG metrics
      const materials = certificationsData.map(cd => ({
        material: cd.material,
        weight: parseFloat(cd.weight.replace(/[^\d.]/g, '')),
        recyclability: cd.recyclability,
      }));

      const esgMetrics = calculateESGMetrics(materials);

      // Determine Copper Mark status
      const copperMarkStatus = 
        esgMetrics.copperMarkScore >= 80 ? "Approved" :
        esgMetrics.copperMarkScore >= 60 ? "Conditional" :
        "Not Approved";

      const reportData = {
        providerName: provider.name,
        providerRut: provider.rut,
        reportPeriod: `Enero - Diciembre ${new Date().getFullYear()}`,
        generatedDate: new Date(),
        certifications: certificationsData,
        esgMetrics,
        copperMarkCompliance: {
          score: esgMetrics.copperMarkScore,
          status: copperMarkStatus as "Approved" | "Conditional" | "Not Approved",
          validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      };

      const pdfBuffer = await generateESGReport(reportData);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="Informe-ESG-${provider.name.replace(/\s/g, '-')}.pdf"`);
      res.send(pdfBuffer);
    } catch (error: any) {
      console.error("Error generating ESG report:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Calculate aggregated ESG metrics for dashboard
  app.get("/api/esg-metrics/aggregated", requireAuth, async (_req: Request, res: Response) => {
    try {
      const allCerts = await storage.getAllCertifications();
      const activeCerts = allCerts.filter(c => c.status === "publicado");

      const certificationsData = [];
      for (const cert of activeCerts) {
        const cps = await storage.getCPS(cert.cpsId);
        if (cps) {
          const weight = parseFloat(cps.weight.replace(/[^\d.]/g, ''));
          certificationsData.push({
            materials: [{
              material: cps.material,
              weight,
              recyclability: cps.recyclability,
            }]
          });
        }
      }

      const aggregated = calculateAggregatedESG(certificationsData);

      res.json({
        totalCertifications: activeCerts.length,
        ...aggregated,
      });
    } catch (error: any) {
      console.error("Error calculating aggregated ESG:", error);
      res.status(500).json({ message: error.message });
    }
  });

  // Activity Log routes
  app.get("/api/activity", requireAuth, async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getRecentActivity(limit);
      res.json(activities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", requireAuth, async (_req: Request, res: Response) => {
    try {
      const certifications = await storage.getAllCertifications();
      const providers = await storage.getAllProviders();
      
      const activeCerts = certifications.filter(c => 
        c.status === 'publicado' || c.status === 'monitoreo_continuo'
      ).length;
      
      const warningProviders = providers.filter(p => p.status === 'warning' || p.status === 'critical').length;
      
      res.json({
        activeCertifications: activeCerts,
        totalProviders: providers.length,
        totalCertifiedPackages: certifications.length * 100, // Mock calculation
        capacityAlerts: warningProviders,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Shipments routes - Certificación de Embalajes
  app.get("/api/shipments", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.user?.id;
      const role = req.session.user?.role;
      
      const allShipments = await storage.getAllShipments();
      
      // Filter by role: proveedores only see their shipments
      if (role === 'proveedor') {
        // Get provider by user's RUT
        const user = await storage.getUserById(userId!);
        if (!user || !user.rut) {
          return res.json([]);
        }
        
        const provider = await storage.getProviderByRut(user.rut);
        if (!provider) {
          return res.json([]);
        }
        
        // Solo mostrar despachos de este proveedor
        const filteredShipments = allShipments.filter(s => s.providerId === provider.id);
        res.json(filteredShipments);
      } else {
        // Admin y otros roles ven todos los despachos
        res.json(allShipments);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/shipments/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const shipment = await storage.getShipment(id);
      
      if (!shipment) {
        return res.status(404).json({ message: "Despacho no encontrado" });
      }
      
      const components = await storage.getComponentsByShipment(id);
      
      res.json({
        ...shipment,
        components,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/shipments", requireAuth, async (req: Request, res: Response) => {
    try {
      const { providerId, clientName, clientRut, components, notes } = req.body;
      
      if (!components || components.length === 0) {
        return res.status(400).json({ message: "Se requiere al menos un componente de embalaje" });
      }
      
      // Calculate metrics using the algorithm
      const calculation = calculatePackagingMetrics(components);
      
      // Generate unique codes
      const allShipments = await storage.getAllShipments();
      const sequence = allShipments.length + 1;
      const code = generateShipmentCode(sequence);
      const qrCode = generateQRCodeUtil();
      const blockchainHash = generateBlockchainHashUtil();
      
      // Create shipment
      const shipment = await storage.createShipment({
        code,
        providerId,
        clientName,
        clientRut,
        totalWeightGr: calculation.totalWeightGr,
        recyclableWeightGr: calculation.recyclableWeightGr,
        recyclabilityPercent: calculation.recyclabilityPercent.toString(),
        recyclabilityLevel: calculation.recyclabilityLevel,
        qrCode,
        blockchainHash,
        status: 'draft' as any,
        notes,
      });
      
      // Create packaging components
      const componentsData = calculation.components.map(comp => ({
        shipmentId: shipment.id,
        material: comp.material as any,
        description: comp.description,
        unitWeightGr: comp.unitWeightGr,
        quantity: comp.quantity,
        totalWeightGr: comp.totalWeightGr,
        isRecyclable: comp.isRecyclable,
      }));
      
      await storage.createMultipleComponents(componentsData);
      
      // Create activity log
      await storage.createActivity({
        type: "Despacho",
        title: `Nuevo despacho creado: ${code}`,
        description: `Cliente: ${clientName}, Peso total: ${calculation.totalWeightGr}g, Reciclabilidad: ${calculation.recyclabilityPercent}%`,
        userId: req.session.user?.id,
        relatedId: shipment.id,
        status: "info",
      });
      
      res.status(201).json({
        ...shipment,
        components: calculation.components,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/shipments/:id/certify", requireRole('admin', 'manager_operaciones', 'proveedor'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const shipment = await storage.getShipment(id);
      
      if (!shipment) {
        return res.status(404).json({ message: "Despacho no encontrado" });
      }
      
      if (shipment.status !== 'draft') {
        return res.status(400).json({ message: "El despacho ya está certificado" });
      }
      
      // Generate NFC tag
      const allShipments = await storage.getAllShipments();
      const nfcTag = generateNFCTagUtil(allShipments.length);
      
      // Update shipment to certified
      const updatedShipment = await storage.updateShipment(id, {
        status: 'certified' as any,
        nfcTag,
        certifiedBy: req.session.user?.id,
        certifiedAt: new Date(),
      });
      
      // Create NFC event
      await storage.createNFCEvent({
        certificationId: id,
        nfcTag,
        action: "Certificación de despacho",
        location: "Bodega",
        userName: req.session.user?.fullName || "Sistema",
        blockchainHash: shipment.blockchainHash,
        metadata: JSON.stringify({
          totalWeightGr: shipment.totalWeightGr,
          recyclabilityPercent: shipment.recyclabilityPercent,
        }),
      });
      
      // Create activity log
      await storage.createActivity({
        type: "Certificación",
        title: `Despacho certificado: ${shipment.code}`,
        description: `NFC Tag: ${nfcTag}`,
        userId: req.session.user?.id,
        relatedId: id,
        status: "success",
      });
      
      res.json(updatedShipment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Public validation endpoint (no auth required)
  app.get("/api/validate/:qrCode", async (req: Request, res: Response) => {
    try {
      const { qrCode } = req.params;
      const shipment = await storage.getShipmentByQRCode(qrCode);
      
      if (!shipment) {
        return res.status(404).json({ message: "Código QR no válido" });
      }
      
      const components = await storage.getComponentsByShipment(shipment.id);
      const provider = await storage.getProvider(shipment.providerId);
      
      res.json({
        shipment: {
          code: shipment.code,
          clientName: shipment.clientName,
          totalWeightGr: shipment.totalWeightGr,
          recyclableWeightGr: shipment.recyclableWeightGr,
          recyclabilityPercent: shipment.recyclabilityPercent,
          recyclabilityLevel: shipment.recyclabilityLevel,
          status: shipment.status,
          certifiedAt: shipment.certifiedAt,
          blockchainHash: shipment.blockchainHash,
          nfcTag: shipment.nfcTag,
        },
        provider: {
          name: provider?.name,
          rut: provider?.rut,
        },
        components: components.map(c => ({
          material: c.material,
          description: c.description,
          totalWeightGr: c.totalWeightGr,
          isRecyclable: c.isRecyclable,
        })),
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Generate QR Code image
  app.get("/api/shipments/:id/qr-image", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const shipment = await storage.getShipment(id);
      
      if (!shipment) {
        return res.status(404).json({ message: "Despacho no encontrado" });
      }
      
      // Generate QR code as data URL
      const qrDataUrl = await QRCode.toDataURL(
        `${process.env.REPLIT_DEV_DOMAIN || 'https://sicrep.cl'}/validate/${shipment.qrCode}`,
        {
          errorCorrectionLevel: 'H',
          type: 'image/png',
          width: 300,
          margin: 2,
        }
      );
      
      res.json({ qrCodeDataUrl: qrDataUrl });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Certification Documents endpoints
  app.get("/api/certification-documents", requireAuth, async (req: Request, res: Response) => {
    try {
      const { certificationId, providerId } = req.query;
      
      const documents = await storage.getCertificationDocuments(
        certificationId as string,
        providerId as string
      );
      
      res.json(documents);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/certification-documents", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.session.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "No autenticado" });
      }

      const { fileName, fileSize, fileType, certificationId, providerId, description, category } = req.body;

      // En producción real, aquí se subiría el archivo a Replit Object Storage
      // Por ahora, simulamos la URL del archivo
      const fileUrl = `/uploads/${Date.now()}-${fileName}`;

      const document = await storage.createCertificationDocument({
        fileName,
        fileSize,
        fileType,
        fileUrl,
        certificationId: certificationId || null,
        providerId: providerId || null,
        uploadedBy: userId,
        description: description || null,
        category: category || 'general',
      });

      res.json(document);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/certification-documents/:id", requireAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await storage.deleteCertificationDocument(id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Login Configuration
  app.get("/api/login-config", async (_req: Request, res: Response) => {
    try {
      const config = await storage.getLoginConfig();
      res.json(config || {
        imageUrl: null,
        title: "Sistema de Certificación REP",
        subtitle: "Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental según Ley 20.920"
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/login-config", requireRole('admin'), async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const updatedBy = req.session.user?.username || 'system';
      
      const config = await storage.upsertLoginConfig({
        ...data,
        updatedBy,
      });
      
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
