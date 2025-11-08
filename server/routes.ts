import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertProviderSchema,
  insertCPSSchema,
  insertCertificationSchema,
  insertWorkflowHistorySchema,
  insertNFCEventSchema,
  insertESGMetricSchema,
  insertActivityLogSchema,
} from "@shared/schema";
import bcrypt from "bcrypt";

// Helper to generate unique codes
function generateCode(prefix: string, year: number, sequence: number): string {
  return `${prefix}-CL-${year}-${String(sequence).padStart(6, '0')}`;
}

function generateNFCTag(sequence: number): string {
  return `NFC-2025-${String(sequence).padStart(6, '0')}`;
}

function generateBlockchainHash(): string {
  return '0x' + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
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
      res.json(userWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Users routes
  app.get("/api/users", async (_req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPassword = users.map(({ password: _, ...user }) => user);
      res.json(usersWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Providers routes
  app.get("/api/providers", async (_req: Request, res: Response) => {
    try {
      const providers = await storage.getAllProviders();
      res.json(providers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/providers", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProviderSchema.parse(req.body);
      const provider = await storage.createProvider(validatedData);
      res.status(201).json(provider);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.patch("/api/providers/:id", async (req: Request, res: Response) => {
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
  app.get("/api/cps", async (_req: Request, res: Response) => {
    try {
      const catalog = await storage.getAllCPS();
      res.json(catalog);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/cps", async (req: Request, res: Response) => {
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
  app.get("/api/certifications", async (_req: Request, res: Response) => {
    try {
      const certs = await storage.getAllCertifications();
      res.json(certs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/certifications", async (req: Request, res: Response) => {
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

  app.patch("/api/certifications/:id", async (req: Request, res: Response) => {
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
  app.post("/api/certifications/:id/advance", async (req: Request, res: Response) => {
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

  // Workflow History routes
  app.get("/api/certifications/:id/history", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const history = await storage.getWorkflowHistory(id);
      res.json(history);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // NFC Events routes
  app.get("/api/certifications/:id/nfc-events", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const events = await storage.getNFCEvents(id);
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/nfc-events", async (req: Request, res: Response) => {
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
  app.get("/api/esg-metrics", async (_req: Request, res: Response) => {
    try {
      const metrics = await storage.getAllESGMetrics();
      res.json(metrics);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/esg-metrics", async (req: Request, res: Response) => {
    try {
      const validatedData = insertESGMetricSchema.parse(req.body);
      const metric = await storage.createESGMetric(validatedData);
      res.status(201).json(metric);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Activity Log routes
  app.get("/api/activity", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getRecentActivity(limit);
      res.json(activities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (_req: Request, res: Response) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
