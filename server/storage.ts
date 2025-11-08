import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  type User, type InsertUser,
  type Provider, type InsertProvider,
  type CPS, type InsertCPS,
  type Certification, type InsertCertification,
  type WorkflowHistory, type InsertWorkflowHistory,
  type NFCEvent, type InsertNFCEvent,
  type ESGMetric, type InsertESGMetric,
  type ActivityLog, type InsertActivityLog,
  users, providers, cpsCatalog, certifications,
  workflowHistory, nfcEvents, esgMetrics, activityLog
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // Providers
  getProvider(id: string): Promise<Provider | undefined>;
  getAllProviders(): Promise<Provider[]>;
  createProvider(provider: InsertProvider): Promise<Provider>;
  updateProvider(id: string, provider: Partial<InsertProvider>): Promise<Provider | undefined>;

  // CPS Catalog
  getCPS(id: string): Promise<CPS | undefined>;
  getCPSByCode(code: string): Promise<CPS | undefined>;
  getAllCPS(): Promise<CPS[]>;
  createCPS(cps: InsertCPS): Promise<CPS>;
  updateCPS(id: string, cps: Partial<InsertCPS>): Promise<CPS | undefined>;

  // Certifications
  getCertification(id: string): Promise<Certification | undefined>;
  getAllCertifications(): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: string, certification: Partial<InsertCertification>): Promise<Certification | undefined>;

  // Workflow History
  getWorkflowHistory(certificationId: string): Promise<WorkflowHistory[]>;
  createWorkflowHistory(history: InsertWorkflowHistory): Promise<WorkflowHistory>;

  // NFC Events
  getNFCEvents(certificationId: string): Promise<NFCEvent[]>;
  createNFCEvent(event: InsertNFCEvent): Promise<NFCEvent>;

  // ESG Metrics
  getAllESGMetrics(): Promise<ESGMetric[]>;
  createESGMetric(metric: InsertESGMetric): Promise<ESGMetric>;

  // Activity Log
  getRecentActivity(limit?: number): Promise<ActivityLog[]>;
  createActivity(activity: InsertActivityLog): Promise<ActivityLog>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async updateUser(id: string, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(userData).where(eq(users.id, id)).returning();
    return user;
  }

  // Providers
  async getProvider(id: string): Promise<Provider | undefined> {
    const [provider] = await db.select().from(providers).where(eq(providers.id, id));
    return provider;
  }

  async getAllProviders(): Promise<Provider[]> {
    return await db.select().from(providers);
  }

  async createProvider(insertProvider: InsertProvider): Promise<Provider> {
    const [provider] = await db.insert(providers).values(insertProvider).returning();
    return provider;
  }

  async updateProvider(id: string, providerData: Partial<InsertProvider>): Promise<Provider | undefined> {
    const [provider] = await db.update(providers).set(providerData).where(eq(providers.id, id)).returning();
    return provider;
  }

  // CPS Catalog
  async getCPS(id: string): Promise<CPS | undefined> {
    const [cps] = await db.select().from(cpsCatalog).where(eq(cpsCatalog.id, id));
    return cps;
  }

  async getCPSByCode(code: string): Promise<CPS | undefined> {
    const [cps] = await db.select().from(cpsCatalog).where(eq(cpsCatalog.code, code));
    return cps;
  }

  async getAllCPS(): Promise<CPS[]> {
    return await db.select().from(cpsCatalog);
  }

  async createCPS(insertCPS: InsertCPS): Promise<CPS> {
    const [cps] = await db.insert(cpsCatalog).values(insertCPS).returning();
    return cps;
  }

  async updateCPS(id: string, cpsData: Partial<InsertCPS>): Promise<CPS | undefined> {
    const [cps] = await db.update(cpsCatalog).set(cpsData).where(eq(cpsCatalog.id, id)).returning();
    return cps;
  }

  // Certifications
  async getCertification(id: string): Promise<Certification | undefined> {
    const [cert] = await db.select().from(certifications).where(eq(certifications.id, id));
    return cert;
  }

  async getAllCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }

  async createCertification(insertCert: InsertCertification): Promise<Certification> {
    const [cert] = await db.insert(certifications).values(insertCert).returning();
    return cert;
  }

  async updateCertification(id: string, certData: Partial<InsertCertification>): Promise<Certification | undefined> {
    const [cert] = await db.update(certifications).set(certData).where(eq(certifications.id, id)).returning();
    return cert;
  }

  // Workflow History
  async getWorkflowHistory(certificationId: string): Promise<WorkflowHistory[]> {
    return await db.select().from(workflowHistory).where(eq(workflowHistory.certificationId, certificationId));
  }

  async createWorkflowHistory(insertHistory: InsertWorkflowHistory): Promise<WorkflowHistory> {
    const [history] = await db.insert(workflowHistory).values(insertHistory).returning();
    return history;
  }

  // NFC Events
  async getNFCEvents(certificationId: string): Promise<NFCEvent[]> {
    return await db.select().from(nfcEvents).where(eq(nfcEvents.certificationId, certificationId));
  }

  async createNFCEvent(insertEvent: InsertNFCEvent): Promise<NFCEvent> {
    const [event] = await db.insert(nfcEvents).values(insertEvent).returning();
    return event;
  }

  // ESG Metrics
  async getAllESGMetrics(): Promise<ESGMetric[]> {
    return await db.select().from(esgMetrics);
  }

  async createESGMetric(insertMetric: InsertESGMetric): Promise<ESGMetric> {
    const [metric] = await db.insert(esgMetrics).values(insertMetric).returning();
    return metric;
  }

  // Activity Log
  async getRecentActivity(limit: number = 10): Promise<ActivityLog[]> {
    return await db.select().from(activityLog).orderBy(activityLog.createdAt).limit(limit);
  }

  async createActivity(insertActivity: InsertActivityLog): Promise<ActivityLog> {
    const [activity] = await db.insert(activityLog).values(insertActivity).returning();
    return activity;
  }
}

export const storage = new DatabaseStorage();
