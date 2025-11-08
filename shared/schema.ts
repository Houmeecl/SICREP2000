import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal, pgEnum, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "gerente_general",
  "manager_operaciones",
  "cps",
  "evaluador",
  "auditor",
  "comite",
  "proveedor",
  "cliente_mineria",
  "viewer",
  "analista",
  "coordinador",
  "tecnico",
  "inspector",
  "supervisor"
]);

export const certificationStatusEnum = pgEnum("certification_status", [
  "draft",
  "solicitud_inicial",
  "asignacion_cps",
  "evaluacion_documentos",
  "evaluacion_operativa",
  "evaluacion_valor_agregado",
  "revision_final",
  "emision_certificado",
  "activacion_nfc",
  "publicado",
  "monitoreo_continuo",
  "rechazado",
  "expirado"
]);

export const workflowPhaseEnum = pgEnum("workflow_phase", [
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
]);

export const providerStatusEnum = pgEnum("provider_status", [
  "normal",
  "warning",
  "critical",
  "suspended"
]);

export const materialREPEnum = pgEnum("material_rep", [
  "papel_carton",
  "plasticos",
  "vidrio",
  "metales",
  "madera",
  "compuestos",
  "otros"
]);

export const shipmentStatusEnum = pgEnum("shipment_status", [
  "draft",
  "certified",
  "in_transit",
  "delivered",
  "cancelled"
]);

export const productStatusEnum = pgEnum("product_status", [
  "active",
  "inactive",
  "discontinued"
]);

export const batchStatusEnum = pgEnum("batch_status", [
  "planning",
  "production",
  "quality_control",
  "certified",
  "shipped",
  "completed"
]);

export const validationTypeEnum = pgEnum("validation_type", [
  "scan",
  "verification",
  "delivery",
  "quality_check"
]);

// Companies table
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rut: text("rut").notNull().unique(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  industry: text("industry"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  rut: text("rut"),
  role: userRoleEnum("role").notNull().default("viewer"),
  companyId: varchar("company_id").references(() => companies.id),
  customPanels: text("custom_panels").array(), // Paneles personalizados: ['dashboard', 'certifications', 'shipments', 'providers', 'esg', 'traceability']
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// NFC Tags table
export const nfcTags = pgTable("nfc_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tagId: text("tag_id").notNull().unique(),
  uid: text("uid").notNull().unique(),
  type: text("type").notNull().default("NTAG215"),
  entityType: text("entity_type").notNull(),
  entityId: varchar("entity_id").notNull(),
  data: text("data").notNull(),
  signature: text("signature").notNull(),
  active: boolean("active").notNull().default(true),
  lastScanned: timestamp("last_scanned"),
  scanCount: integer("scan_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Providers table
export const providers = pgTable("providers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rut: text("rut").notNull().unique(),
  email: text("email").notNull(),
  phone: text("phone"),
  address: text("address"),
  currentCapacity: decimal("current_capacity", { precision: 10, scale: 2 }).notNull().default("0"),
  maxCapacity: decimal("max_capacity", { precision: 10, scale: 2 }).notNull().default("300"),
  status: providerStatusEnum("status").notNull().default("normal"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// CPS Catalog table
export const cpsCatalog = pgTable("cps_catalog", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  material: text("material").notNull(),
  type: text("type").notNull(),
  weight: text("weight").notNull(),
  recyclability: integer("recyclability").notNull(),
  status: text("status").notNull().default("active"),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Certifications table
export const certifications = pgTable("certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  cpsId: varchar("cps_id").notNull().references(() => cpsCatalog.id),
  status: certificationStatusEnum("status").notNull().default("draft"),
  currentPhase: workflowPhaseEnum("current_phase"),
  scoreDocumentales: integer("score_documentales").default(0),
  scoreOperativos: integer("score_operativos").default(0),
  scoreValorAgregado: integer("score_valor_agregado").default(0),
  scoreTotal: integer("score_total").default(0),
  nfcTag: text("nfc_tag"),
  blockchainHash: text("blockchain_hash"),
  qrCode: text("qr_code"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  issuedAt: timestamp("issued_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Workflow History table
export const workflowHistory = pgTable("workflow_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  certificationId: varchar("certification_id").notNull().references(() => certifications.id),
  phase: workflowPhaseEnum("phase").notNull(),
  status: text("status").notNull(),
  userId: varchar("user_id").notNull().references(() => users.id),
  notes: text("notes"),
  sla: text("sla"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// NFC Events table
export const nfcEvents = pgTable("nfc_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  certificationId: varchar("certification_id").notNull().references(() => certifications.id),
  nfcTag: text("nfc_tag").notNull(),
  action: text("action").notNull(),
  location: text("location").notNull(),
  userId: varchar("user_id").references(() => users.id),
  userName: text("user_name").notNull(),
  blockchainHash: text("blockchain_hash").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ESG Metrics table
export const esgMetrics = pgTable("esg_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  month: text("month").notNull(),
  co2Avoided: decimal("co2_avoided", { precision: 10, scale: 2 }).notNull().default("0"),
  recyclabilityRate: decimal("recyclability_rate", { precision: 5, scale: 2 }).notNull().default("0"),
  waterConserved: decimal("water_conserved", { precision: 10, scale: 2 }).notNull().default("0"),
  renewableEnergyPercent: decimal("renewable_energy_percent", { precision: 5, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Activity Log table
export const activityLog = pgTable("activity_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  userId: varchar("user_id").references(() => users.id),
  relatedId: text("related_id"),
  status: text("status").notNull().default("info"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Shipments table - Despachos certificados
export const shipments = pgTable("shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  clientName: text("client_name").notNull(),
  clientRut: text("client_rut"),
  totalWeightGr: integer("total_weight_gr").notNull(),
  recyclableWeightGr: integer("recyclable_weight_gr").notNull(),
  recyclabilityPercent: decimal("recyclability_percent", { precision: 5, scale: 2 }).notNull(),
  recyclabilityLevel: text("recyclability_level").notNull(), // "Alto", "Medio", "Bajo"
  qrCode: text("qr_code").notNull().unique(),
  nfcTag: text("nfc_tag"),
  blockchainHash: text("blockchain_hash").notNull(),
  status: shipmentStatusEnum("status").notNull().default("draft"),
  certifiedBy: varchar("certified_by").references(() => users.id),
  certifiedAt: timestamp("certified_at"),
  deliveredAt: timestamp("delivered_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Packaging Components table - Componentes de embalaje por despacho
export const packagingComponents = pgTable("packaging_components", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shipmentId: varchar("shipment_id").notNull().references(() => shipments.id),
  material: materialREPEnum("material").notNull(),
  description: text("description").notNull(),
  unitWeightGr: integer("unit_weight_gr").notNull(),
  quantity: integer("quantity").notNull(),
  totalWeightGr: integer("total_weight_gr").notNull(),
  isRecyclable: boolean("is_recyclable").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Product Catalog table - Catálogo de productos del proveedor
export const productCatalog = pgTable("product_catalog", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  material: materialREPEnum("material").notNull(),
  unitWeightGr: integer("unit_weight_gr").notNull(),
  recyclable: boolean("recyclable").notNull().default(true),
  recyclabilityPercent: decimal("recyclability_percent", { precision: 5, scale: 2 }),
  cpsId: varchar("cps_id").references(() => cpsCatalog.id),
  status: productStatusEnum("status").notNull().default("active"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Production Batches table - Lotes de producción con tracking NFC
export const productionBatches = pgTable("production_batches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  batchCode: text("batch_code").notNull().unique(),
  productId: varchar("product_id").notNull().references(() => productCatalog.id),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  quantity: integer("quantity").notNull(),
  totalWeightGr: integer("total_weight_gr").notNull(),
  status: batchStatusEnum("status").notNull().default("planning"),
  productionDate: timestamp("production_date").notNull(),
  certificationId: varchar("certification_id").references(() => certifications.id),
  qrCode: text("qr_code"),
  blockchainHash: text("blockchain_hash"),
  notes: text("notes"),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// NFC Validations table - Registro de validaciones de tags NFC
export const nfcValidations = pgTable("nfc_validations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tagId: text("tag_id").notNull(),
  batchId: varchar("batch_id").references(() => productionBatches.id),
  shipmentId: varchar("shipment_id").references(() => shipments.id),
  validationType: validationTypeEnum("validation_type").notNull(),
  location: text("location"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  scannedBy: varchar("scanned_by").references(() => users.id),
  scannerName: text("scanner_name").notNull(),
  scannerCompany: text("scanner_company"),
  isValid: boolean("is_valid").notNull().default(true),
  validationResult: text("validation_result"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Email inválido"),
  rut: z.string().min(1, "RUT requerido"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).extend({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  email: z.string().email("Email inválido"),
  rut: z.string().optional(),
  companyId: z.string().optional(),
});

export const insertNFCTagSchema = createInsertSchema(nfcTags).omit({
  id: true,
  createdAt: true,
  lastScanned: true,
  scanCount: true,
});

export const insertProviderSchema = createInsertSchema(providers).omit({
  id: true,
  createdAt: true,
});

export const insertCPSSchema = createInsertSchema(cpsCatalog).omit({
  id: true,
  createdAt: true,
});

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertWorkflowHistorySchema = createInsertSchema(workflowHistory).omit({
  id: true,
  createdAt: true,
});

export const insertNFCEventSchema = createInsertSchema(nfcEvents).omit({
  id: true,
  createdAt: true,
});

export const insertESGMetricSchema = createInsertSchema(esgMetrics).omit({
  id: true,
  createdAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLog).omit({
  id: true,
  createdAt: true,
});

export const insertShipmentSchema = createInsertSchema(shipments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPackagingComponentSchema = createInsertSchema(packagingComponents).omit({
  id: true,
  createdAt: true,
});

export const insertProductCatalogSchema = createInsertSchema(productCatalog).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductionBatchSchema = createInsertSchema(productionBatches).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNFCValidationSchema = createInsertSchema(nfcValidations).omit({
  id: true,
  createdAt: true,
});

// Certification Documents table
export const certificationDocuments = pgTable("certification_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  certificationId: varchar("certification_id").references(() => certifications.id),
  providerId: varchar("provider_id").references(() => providers.id),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  fileData: text("file_data").notNull(), // Base64 encoded file content
  uploadedBy: varchar("uploaded_by").notNull().references(() => users.id),
  description: text("description"),
  category: text("category").default("general"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Login Configuration Table
export const loginConfig = pgTable("login_config", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url"),
  title: text("title").default("Sistema de Certificación REP"),
  subtitle: text("subtitle").default("Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental según Ley 20.920"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: varchar("updated_by"),
});

export const insertCertificationDocumentSchema = createInsertSchema(certificationDocuments).omit({
  id: true,
  createdAt: true,
});

export const insertLoginConfigSchema = createInsertSchema(loginConfig).omit({
  id: true,
  updatedAt: true,
});

// Types
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertNFCTag = z.infer<typeof insertNFCTagSchema>;
export type NFCTag = typeof nfcTags.$inferSelect;

export type InsertProvider = z.infer<typeof insertProviderSchema>;
export type Provider = typeof providers.$inferSelect;

export type InsertCPS = z.infer<typeof insertCPSSchema>;
export type CPS = typeof cpsCatalog.$inferSelect;

export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Certification = typeof certifications.$inferSelect;

export type InsertWorkflowHistory = z.infer<typeof insertWorkflowHistorySchema>;
export type WorkflowHistory = typeof workflowHistory.$inferSelect;

export type InsertNFCEvent = z.infer<typeof insertNFCEventSchema>;
export type NFCEvent = typeof nfcEvents.$inferSelect;

export type InsertESGMetric = z.infer<typeof insertESGMetricSchema>;
export type ESGMetric = typeof esgMetrics.$inferSelect;

export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLog.$inferSelect;

export type InsertShipment = z.infer<typeof insertShipmentSchema>;
export type Shipment = typeof shipments.$inferSelect;

export type InsertPackagingComponent = z.infer<typeof insertPackagingComponentSchema>;
export type PackagingComponent = typeof packagingComponents.$inferSelect;

export type InsertProductCatalog = z.infer<typeof insertProductCatalogSchema>;
export type ProductCatalog = typeof productCatalog.$inferSelect;

export type InsertProductionBatch = z.infer<typeof insertProductionBatchSchema>;
export type ProductionBatch = typeof productionBatches.$inferSelect;

export type InsertNFCValidation = z.infer<typeof insertNFCValidationSchema>;
export type NFCValidation = typeof nfcValidations.$inferSelect;

export type InsertCertificationDocument = z.infer<typeof insertCertificationDocumentSchema>;
export type CertificationDocument = typeof certificationDocuments.$inferSelect;

export type InsertLoginConfig = z.infer<typeof insertLoginConfigSchema>;
export type LoginConfig = typeof loginConfig.$inferSelect;
