import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, decimal, pgEnum } from "drizzle-orm/pg-core";
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

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  rut: text("rut"),
  role: userRoleEnum("role").notNull().default("viewer"),
  active: boolean("active").notNull().default(true),
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

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
}).extend({
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  email: z.string().email("Email inválido"),
  rut: z.string().optional(),
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

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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
