import { db } from "./db";
import { eq, and } from "drizzle-orm";
import {
  type User, type InsertUser,
  type Company, type InsertCompany,
  type NFCTag, type InsertNFCTag,
  type Provider, type InsertProvider,
  type CPS, type InsertCPS,
  type Certification, type InsertCertification,
  type WorkflowHistory, type InsertWorkflowHistory,
  type NFCEvent, type InsertNFCEvent,
  type ESGMetric, type InsertESGMetric,
  type ActivityLog, type InsertActivityLog,
  type Shipment, type InsertShipment,
  type PackagingComponent, type InsertPackagingComponent,
  type ProductCatalog, type InsertProductCatalog,
  type ProductionBatch, type InsertProductionBatch,
  type NFCValidation, type InsertNFCValidation,
  type CertificationDocument, type InsertCertificationDocument,
  type LoginConfig, type InsertLoginConfig,
  type CertificationRequest, type InsertCertificationRequest,
  type RequestDocument, type InsertRequestDocument,
  users, companies, nfcTags, providers, cpsCatalog, certifications,
  workflowHistory, nfcEvents, esgMetrics, activityLog,
  shipments, packagingComponents, productCatalog, productionBatches, nfcValidations,
  certificationDocuments, loginConfig, certificationRequests, requestDocuments
} from "@shared/schema";

export interface IStorage {
  // Companies
  getCompany(id: string): Promise<Company | undefined>;
  getCompanyByRut(rut: string): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, company: Partial<InsertCompany>): Promise<Company | undefined>;

  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;

  // NFC Tags
  getNFCTag(id: string): Promise<NFCTag | undefined>;
  getNFCTagByTagId(tagId: string): Promise<NFCTag | undefined>;
  getAllNFCTags(): Promise<NFCTag[]>;
  getNFCTagsByEntity(entityType: string, entityId: string): Promise<NFCTag[]>;
  createNFCTag(tag: InsertNFCTag): Promise<NFCTag>;
  updateNFCTag(id: string, tag: Partial<InsertNFCTag>): Promise<NFCTag | undefined>;

  // Providers
  getProvider(id: string): Promise<Provider | undefined>;
  getProviderByRut(rut: string): Promise<Provider | undefined>;
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

  // Shipments
  getShipment(id: string): Promise<Shipment | undefined>;
  getShipmentByQRCode(qrCode: string): Promise<Shipment | undefined>;
  getAllShipments(): Promise<Shipment[]>;
  getShipmentsByProvider(providerId: string): Promise<Shipment[]>;
  createShipment(shipment: InsertShipment): Promise<Shipment>;
  updateShipment(id: string, shipment: Partial<InsertShipment>): Promise<Shipment | undefined>;

  // Packaging Components
  getComponentsByShipment(shipmentId: string): Promise<PackagingComponent[]>;
  createPackagingComponent(component: InsertPackagingComponent): Promise<PackagingComponent>;
  createMultipleComponents(components: InsertPackagingComponent[]): Promise<PackagingComponent[]>;

  // Certification Documents
  getCertificationDocuments(certificationId?: string, providerId?: string): Promise<CertificationDocument[]>;
  createCertificationDocument(doc: InsertCertificationDocument): Promise<CertificationDocument>;
  deleteCertificationDocument(id: string): Promise<void>;

  // Product Catalog
  getProduct(id: string): Promise<ProductCatalog | undefined>;
  getProductByCode(code: string): Promise<ProductCatalog | undefined>;
  getProductsByProvider(providerId: string): Promise<ProductCatalog[]>;
  getAllProducts(): Promise<ProductCatalog[]>;
  createProduct(product: InsertProductCatalog): Promise<ProductCatalog>;
  updateProduct(id: string, product: Partial<InsertProductCatalog>): Promise<ProductCatalog | undefined>;

  // Production Batches
  getBatch(id: string): Promise<ProductionBatch | undefined>;
  getBatchByCode(code: string): Promise<ProductionBatch | undefined>;
  getBatchesByProvider(providerId: string): Promise<ProductionBatch[]>;
  getBatchesByProduct(productId: string): Promise<ProductionBatch[]>;
  getAllBatches(): Promise<ProductionBatch[]>;
  createBatch(batch: InsertProductionBatch): Promise<ProductionBatch>;
  updateBatch(id: string, batch: Partial<InsertProductionBatch>): Promise<ProductionBatch | undefined>;

  // NFC Validations
  getValidation(id: string): Promise<NFCValidation | undefined>;
  getValidationsByTag(tagId: string): Promise<NFCValidation[]>;
  getValidationsByBatch(batchId: string): Promise<NFCValidation[]>;
  getValidationsByShipment(shipmentId: string): Promise<NFCValidation[]>;
  getAllValidations(): Promise<NFCValidation[]>;
  createValidation(validation: InsertNFCValidation): Promise<NFCValidation>;

  // Login Configuration
  getLoginConfig(): Promise<LoginConfig | undefined>;
  upsertLoginConfig(config: InsertLoginConfig): Promise<LoginConfig>;

  // Certification Requests
  getCertificationRequest(id: string): Promise<CertificationRequest | undefined>;
  getAllCertificationRequests(): Promise<CertificationRequest[]>;
  getCertificationRequestsByStatus(status: string): Promise<CertificationRequest[]>;
  createCertificationRequest(request: InsertCertificationRequest): Promise<CertificationRequest>;
  updateCertificationRequest(id: string, request: Partial<CertificationRequest>): Promise<CertificationRequest | undefined>;

  // Request Documents
  getRequestDocuments(requestId: string): Promise<RequestDocument[]>;
  createRequestDocument(doc: InsertRequestDocument): Promise<RequestDocument>;
  createMultipleRequestDocuments(docs: InsertRequestDocument[]): Promise<RequestDocument[]>;

  // Dashboard Statistics
  getDashboardStats(): Promise<{
    activeCertifications: number;
    totalProviders: number;
    totalCertifiedPackages: number;
    capacityAlerts: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // Companies
  async getCompany(id: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company;
  }

  async getCompanyByRut(rut: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.rut, rut));
    return company;
  }

  async getAllCompanies(): Promise<Company[]> {
    return await db.select().from(companies);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const [company] = await db.insert(companies).values(insertCompany).returning();
    return company;
  }

  async updateCompany(id: string, companyData: Partial<InsertCompany>): Promise<Company | undefined> {
    const [company] = await db.update(companies).set(companyData).where(eq(companies.id, id)).returning();
    return company;
  }

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

  // NFC Tags
  async getNFCTag(id: string): Promise<NFCTag | undefined> {
    const [tag] = await db.select().from(nfcTags).where(eq(nfcTags.id, id));
    return tag;
  }

  async getNFCTagByTagId(tagId: string): Promise<NFCTag | undefined> {
    const [tag] = await db.select().from(nfcTags).where(eq(nfcTags.tagId, tagId));
    return tag;
  }

  async getAllNFCTags(): Promise<NFCTag[]> {
    return await db.select().from(nfcTags);
  }

  async getNFCTagsByEntity(entityType: string, entityId: string): Promise<NFCTag[]> {
    return await db.select().from(nfcTags)
      .where(and(eq(nfcTags.entityType, entityType), eq(nfcTags.entityId, entityId)));
  }

  async createNFCTag(insertTag: InsertNFCTag): Promise<NFCTag> {
    const [tag] = await db.insert(nfcTags).values(insertTag).returning();
    return tag;
  }

  async updateNFCTag(id: string, tagData: Partial<InsertNFCTag>): Promise<NFCTag | undefined> {
    const [tag] = await db.update(nfcTags).set(tagData).where(eq(nfcTags.id, id)).returning();
    return tag;
  }

  // Providers
  async getProvider(id: string): Promise<Provider | undefined> {
    const [provider] = await db.select().from(providers).where(eq(providers.id, id));
    return provider;
  }

  async getProviderByRut(rut: string): Promise<Provider | undefined> {
    const [provider] = await db.select().from(providers).where(eq(providers.rut, rut));
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

  // Shipments
  async getShipment(id: string): Promise<Shipment | undefined> {
    const [shipment] = await db.select().from(shipments).where(eq(shipments.id, id));
    return shipment;
  }

  async getShipmentByQRCode(qrCode: string): Promise<Shipment | undefined> {
    const [shipment] = await db.select().from(shipments).where(eq(shipments.qrCode, qrCode));
    return shipment;
  }

  async getAllShipments(): Promise<Shipment[]> {
    return await db.select().from(shipments);
  }

  async getShipmentsByProvider(providerId: string): Promise<Shipment[]> {
    return await db.select().from(shipments).where(eq(shipments.providerId, providerId));
  }

  async createShipment(insertShipment: InsertShipment): Promise<Shipment> {
    const [shipment] = await db.insert(shipments).values(insertShipment).returning();
    return shipment;
  }

  async updateShipment(id: string, shipmentData: Partial<InsertShipment>): Promise<Shipment | undefined> {
    const [shipment] = await db.update(shipments).set(shipmentData).where(eq(shipments.id, id)).returning();
    return shipment;
  }

  // Packaging Components
  async getComponentsByShipment(shipmentId: string): Promise<PackagingComponent[]> {
    return await db.select().from(packagingComponents).where(eq(packagingComponents.shipmentId, shipmentId));
  }

  async createPackagingComponent(insertComponent: InsertPackagingComponent): Promise<PackagingComponent> {
    const [component] = await db.insert(packagingComponents).values(insertComponent).returning();
    return component;
  }

  async createMultipleComponents(insertComponents: InsertPackagingComponent[]): Promise<PackagingComponent[]> {
    return await db.insert(packagingComponents).values(insertComponents).returning();
  }

  // Certification Documents
  async getCertificationDocuments(certificationId?: string, providerId?: string): Promise<CertificationDocument[]> {
    if (certificationId) {
      return await db.select().from(certificationDocuments).where(eq(certificationDocuments.certificationId, certificationId));
    } else if (providerId) {
      return await db.select().from(certificationDocuments).where(eq(certificationDocuments.providerId, providerId));
    } else {
      return await db.select().from(certificationDocuments);
    }
  }

  async createCertificationDocument(doc: InsertCertificationDocument): Promise<CertificationDocument> {
    const [document] = await db.insert(certificationDocuments).values(doc).returning();
    return document;
  }

  async deleteCertificationDocument(id: string): Promise<void> {
    await db.delete(certificationDocuments).where(eq(certificationDocuments.id, id));
  }

  // Product Catalog
  async getProduct(id: string): Promise<ProductCatalog | undefined> {
    const [product] = await db.select().from(productCatalog).where(eq(productCatalog.id, id));
    return product;
  }

  async getProductByCode(code: string): Promise<ProductCatalog | undefined> {
    const [product] = await db.select().from(productCatalog).where(eq(productCatalog.code, code));
    return product;
  }

  async getProductsByProvider(providerId: string): Promise<ProductCatalog[]> {
    return await db.select().from(productCatalog).where(eq(productCatalog.providerId, providerId));
  }

  async getAllProducts(): Promise<ProductCatalog[]> {
    return await db.select().from(productCatalog);
  }

  async createProduct(insertProduct: InsertProductCatalog): Promise<ProductCatalog> {
    const [product] = await db.insert(productCatalog).values(insertProduct).returning();
    return product;
  }

  async updateProduct(id: string, productData: Partial<InsertProductCatalog>): Promise<ProductCatalog | undefined> {
    const [product] = await db.update(productCatalog).set(productData).where(eq(productCatalog.id, id)).returning();
    return product;
  }

  // Production Batches
  async getBatch(id: string): Promise<ProductionBatch | undefined> {
    const [batch] = await db.select().from(productionBatches).where(eq(productionBatches.id, id));
    return batch;
  }

  async getBatchByCode(code: string): Promise<ProductionBatch | undefined> {
    const [batch] = await db.select().from(productionBatches).where(eq(productionBatches.batchCode, code));
    return batch;
  }

  async getBatchesByProvider(providerId: string): Promise<ProductionBatch[]> {
    return await db.select().from(productionBatches).where(eq(productionBatches.providerId, providerId));
  }

  async getBatchesByProduct(productId: string): Promise<ProductionBatch[]> {
    return await db.select().from(productionBatches).where(eq(productionBatches.productId, productId));
  }

  async getAllBatches(): Promise<ProductionBatch[]> {
    return await db.select().from(productionBatches);
  }

  async createBatch(insertBatch: InsertProductionBatch): Promise<ProductionBatch> {
    const [batch] = await db.insert(productionBatches).values(insertBatch).returning();
    return batch;
  }

  async updateBatch(id: string, batchData: Partial<InsertProductionBatch>): Promise<ProductionBatch | undefined> {
    const [batch] = await db.update(productionBatches).set(batchData).where(eq(productionBatches.id, id)).returning();
    return batch;
  }

  // NFC Validations
  async getValidation(id: string): Promise<NFCValidation | undefined> {
    const [validation] = await db.select().from(nfcValidations).where(eq(nfcValidations.id, id));
    return validation;
  }

  async getValidationsByTag(tagId: string): Promise<NFCValidation[]> {
    return await db.select().from(nfcValidations).where(eq(nfcValidations.tagId, tagId));
  }

  async getValidationsByBatch(batchId: string): Promise<NFCValidation[]> {
    return await db.select().from(nfcValidations).where(eq(nfcValidations.batchId, batchId));
  }

  async getValidationsByShipment(shipmentId: string): Promise<NFCValidation[]> {
    return await db.select().from(nfcValidations).where(eq(nfcValidations.shipmentId, shipmentId));
  }

  async getAllValidations(): Promise<NFCValidation[]> {
    return await db.select().from(nfcValidations);
  }

  async createValidation(insertValidation: InsertNFCValidation): Promise<NFCValidation> {
    const [validation] = await db.insert(nfcValidations).values(insertValidation).returning();
    return validation;
  }

  // Login Configuration
  async getLoginConfig(): Promise<LoginConfig | undefined> {
    const results = await db.select().from(loginConfig).limit(1);
    return results[0];
  }

  async upsertLoginConfig(config: InsertLoginConfig): Promise<LoginConfig> {
    const existing = await this.getLoginConfig();
    
    if (existing) {
      const [updated] = await db
        .update(loginConfig)
        .set({ ...config, updatedAt: new Date() })
        .where(eq(loginConfig.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(loginConfig).values(config).returning();
      return created;
    }
  }

  // Certification Requests
  async getCertificationRequest(id: string): Promise<CertificationRequest | undefined> {
    const [request] = await db.select().from(certificationRequests).where(eq(certificationRequests.id, id));
    return request;
  }

  async getAllCertificationRequests(): Promise<CertificationRequest[]> {
    return await db.select().from(certificationRequests);
  }

  async getCertificationRequestsByStatus(status: "pending" | "reviewing" | "approved" | "rejected"): Promise<CertificationRequest[]> {
    return await db.select().from(certificationRequests).where(eq(certificationRequests.status, status));
  }

  async createCertificationRequest(insertRequest: InsertCertificationRequest): Promise<CertificationRequest> {
    const [request] = await db.insert(certificationRequests).values(insertRequest).returning();
    return request;
  }

  async updateCertificationRequest(id: string, requestData: Partial<CertificationRequest>): Promise<CertificationRequest | undefined> {
    const [request] = await db.update(certificationRequests).set(requestData).where(eq(certificationRequests.id, id)).returning();
    return request;
  }

  // Request Documents
  async getRequestDocuments(requestId: string): Promise<RequestDocument[]> {
    return await db.select().from(requestDocuments).where(eq(requestDocuments.requestId, requestId));
  }

  async createRequestDocument(insertDoc: InsertRequestDocument): Promise<RequestDocument> {
    const [doc] = await db.insert(requestDocuments).values(insertDoc).returning();
    return doc;
  }

  async createMultipleRequestDocuments(docs: InsertRequestDocument[]): Promise<RequestDocument[]> {
    if (docs.length === 0) return [];
    const created = await db.insert(requestDocuments).values(docs).returning();
    return created;
  }

  // Dashboard Statistics
  async getDashboardStats() {
    const allCertifications = await db.select().from(certifications);
    const allProviders = await db.select().from(providers);
    const allShipments = await db.select().from(shipments);
    
    const activeCertifications = allCertifications.filter(c => 
      c.status === 'publicado' || c.status === 'activacion_nfc' || c.status === 'emision_certificado'
    ).length;

    const capacityAlerts = allProviders.filter(p => p.status === 'warning' || p.status === 'critical').length;

    return {
      activeCertifications,
      totalProviders: allProviders.length,
      totalCertifiedPackages: allShipments.length,
      capacityAlerts,
    };
  }
}

export const storage = new DatabaseStorage();
