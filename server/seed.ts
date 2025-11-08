import { db } from "./db";
import { users, providers, cpsCatalog, certifications, workflowHistory, nfcEvents, esgMetrics, activityLog } from "@shared/schema";
import bcrypt from "bcrypt";

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const [adminUser] = await db.insert(users).values({
    username: "admin",
    password: hashedPassword,
    email: "admin@sicrep.cl",
    fullName: "Administrador SICREP",
    role: "admin",
    active: true,
  }).returning();

  console.log("✓ Admin user created");

  // Create additional users with different roles
  const evaluadorPassword = await bcrypt.hash("evaluador123", 10);
  const [evaluador] = await db.insert(users).values({
    username: "evaluador1",
    password: evaluadorPassword,
    email: "evaluador@sicrep.cl",
    fullName: "María Evaluadora",
    role: "evaluador",
    active: true,
  }).returning();

  const auditorPassword = await bcrypt.hash("auditor123", 10);
  const [auditor] = await db.insert(users).values({
    username: "auditor1",
    password: auditorPassword,
    email: "auditor@sicrep.cl",
    fullName: "Juan Auditor",
    role: "auditor",
    active: true,
  }).returning();

  console.log("✓ Additional users created");

  // Create providers
  const providersData = [
    {
      name: "Envases del Norte S.A.",
      rut: "76.543.210-K",
      email: "contacto@envasesnorte.cl",
      phone: "+56 2 2345 6789",
      address: "Av. Grecia 5500, Antofagasta",
      currentCapacity: "245.00",
      maxCapacity: "300.00",
      status: "warning" as const,
    },
    {
      name: "Embalajes Sustentables Ltda.",
      rut: "77.123.456-8",
      email: "ventas@embasusten.cl",
      phone: "+56 2 3456 7890",
      address: "Parque Industrial Los Andes, Santiago",
      currentCapacity: "185.00",
      maxCapacity: "300.00",
      status: "normal" as const,
    },
    {
      name: "Packaging Industrial Chile",
      rut: "78.987.654-3",
      email: "info@packingchile.cl",
      phone: "+56 2 4567 8901",
      address: "Ruta 68 Km 20, Pudahuel",
      currentCapacity: "295.00",
      maxCapacity: "300.00",
      status: "critical" as const,
    },
    {
      name: "EcoPack Solutions",
      rut: "79.456.789-1",
      email: "contacto@ecopack.cl",
      phone: "+56 2 5678 9012",
      address: "Av. Libertador Bernardo O'Higgins 1234, Santiago",
      currentCapacity: "120.00",
      maxCapacity: "300.00",
      status: "normal" as const,
    },
  ];

  const createdProviders = await db.insert(providers).values(providersData).returning();
  console.log("✓ Providers created");

  // Create CPS Catalog items
  const cpsData = [
    {
      code: "CPS-2025-001",
      material: "HDPE",
      type: "Bidón 20L",
      weight: "850g",
      recyclability: 95,
      status: "active",
      description: "Bidón de polietileno de alta densidad para líquidos industriales",
    },
    {
      code: "CPS-2025-002",
      material: "Cartón Corrugado",
      type: "Caja 60x40x30",
      weight: "1.2kg",
      recyclability: 88,
      status: "active",
      description: "Caja de cartón corrugado triple pared para transporte pesado",
    },
    {
      code: "CPS-2025-003",
      material: "PET",
      type: "Botella 2L",
      weight: "45g",
      recyclability: 92,
      status: "active",
      description: "Botella PET grado alimentario para líquidos",
    },
    {
      code: "CPS-2024-128",
      material: "PP",
      type: "Contenedor Industrial",
      weight: "2.5kg",
      recyclability: 78,
      status: "active",
      description: "Contenedor de polipropileno para almacenamiento industrial",
    },
    {
      code: "CPS-2024-089",
      material: "Aluminio",
      type: "Lata 500ml",
      weight: "15g",
      recyclability: 98,
      status: "deprecated",
      description: "Lata de aluminio para bebidas (descontinuado)",
    },
  ];

  const createdCPS = await db.insert(cpsCatalog).values(cpsData).returning();
  console.log("✓ CPS Catalog created");

  // Create certifications
  const certificationsData = [
    {
      code: "CERT-CL-2025-000127",
      providerId: createdProviders[0].id,
      cpsId: createdCPS[0].id,
      status: "publicado" as const,
      currentPhase: "monitoreo_continuo" as const,
      scoreDocumentales: 38,
      scoreOperativos: 37,
      scoreValorAgregado: 17,
      scoreTotal: 92,
      nfcTag: "NFC-2025-000127",
      blockchainHash: "0x7a9f3e2b1c4d5e6f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f",
      qrCode: "QR-NFC-2025-000127",
      createdBy: adminUser.id,
      issuedAt: new Date("2025-01-15"),
      expiresAt: new Date("2026-01-15"),
    },
    {
      code: "CERT-CL-2025-000126",
      providerId: createdProviders[3].id,
      cpsId: createdCPS[1].id,
      status: "publicado" as const,
      currentPhase: "monitoreo_continuo" as const,
      scoreDocumentales: 36,
      scoreOperativos: 35,
      scoreValorAgregado: 17,
      scoreTotal: 88,
      nfcTag: "NFC-2025-000126",
      blockchainHash: "0x8b0a4f3c2d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1",
      qrCode: "QR-NFC-2025-000126",
      createdBy: adminUser.id,
      issuedAt: new Date("2025-01-14"),
      expiresAt: new Date("2026-01-14"),
    },
    {
      code: "CERT-CL-2025-000125",
      providerId: createdProviders[2].id,
      cpsId: createdCPS[3].id,
      status: "evaluacion_documentos" as const,
      currentPhase: "evaluacion_documentos" as const,
      scoreDocumentales: 26,
      scoreOperativos: 0,
      scoreValorAgregado: 0,
      scoreTotal: 26,
      assignedTo: evaluador.id,
      createdBy: adminUser.id,
    },
    {
      code: "CERT-CL-2024-000089",
      providerId: createdProviders[1].id,
      cpsId: createdCPS[4].id,
      status: "publicado" as const,
      currentPhase: "monitoreo_continuo" as const,
      scoreDocumentales: 40,
      scoreOperativos: 38,
      scoreValorAgregado: 17,
      scoreTotal: 95,
      nfcTag: "NFC-2024-000089",
      blockchainHash: "0x9c1b5g4d3e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
      qrCode: "QR-NFC-2024-000089",
      createdBy: adminUser.id,
      issuedAt: new Date("2024-12-20"),
      expiresAt: new Date("2025-12-20"),
    },
  ];

  const createdCertifications = await db.insert(certifications).values(certificationsData).returning();
  console.log("✓ Certifications created");

  // Create workflow history for completed certification
  const workflowData = [
    {
      certificationId: createdCertifications[0].id,
      phase: "solicitud_inicial" as const,
      status: "completed",
      userId: adminUser.id,
      sla: "24h",
      completedAt: new Date("2025-01-15T10:00:00"),
    },
    {
      certificationId: createdCertifications[0].id,
      phase: "asignacion_cps" as const,
      status: "completed",
      userId: adminUser.id,
      sla: "48h",
      completedAt: new Date("2025-01-15T12:00:00"),
    },
    {
      certificationId: createdCertifications[0].id,
      phase: "evaluacion_documentos" as const,
      status: "completed",
      userId: evaluador.id,
      sla: "72h",
      completedAt: new Date("2025-01-15T14:00:00"),
    },
  ];

  await db.insert(workflowHistory).values(workflowData);
  console.log("✓ Workflow history created");

  // Create NFC events
  const nfcEventsData = [
    {
      certificationId: createdCertifications[0].id,
      nfcTag: "NFC-2025-000127",
      action: "Emisión Certificado",
      location: "Planta Antofagasta",
      userName: "Sistema SICREP",
      blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      createdAt: new Date("2025-01-15T14:23:45"),
    },
    {
      certificationId: createdCertifications[0].id,
      nfcTag: "NFC-2025-000127",
      action: "Registro NFC",
      location: "Bodega Central",
      userName: "Operador: J. González",
      blockchainHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
      createdAt: new Date("2025-01-15T16:45:12"),
    },
    {
      certificationId: createdCertifications[0].id,
      nfcTag: "NFC-2025-000127",
      action: "Verificación QR",
      location: "Centro Distribución",
      userName: "Auditor: M. Silva",
      blockchainHash: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
      createdAt: new Date("2025-01-16T09:12:33"),
    },
    {
      certificationId: createdCertifications[0].id,
      nfcTag: "NFC-2025-000127",
      action: "Escaneo NFC",
      location: "Faena Minera Escondida",
      userName: "Cliente: P. Rojas",
      blockchainHash: "0xj1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c",
      createdAt: new Date("2025-01-16T11:34:56"),
    },
  ];

  await db.insert(nfcEvents).values(nfcEventsData);
  console.log("✓ NFC events created");

  // Create ESG metrics
  const esgData = [
    {
      month: "2025-01",
      co2Avoided: "1150.00",
      recyclabilityRate: "82.00",
      waterConserved: "42000.00",
      renewableEnergyPercent: "58.00",
    },
    {
      month: "2025-02",
      co2Avoided: "1180.00",
      recyclabilityRate: "84.00",
      waterConserved: "43000.00",
      renewableEnergyPercent: "60.00",
    },
    {
      month: "2025-03",
      co2Avoided: "1200.00",
      recyclabilityRate: "85.00",
      waterConserved: "44000.00",
      renewableEnergyPercent: "61.00",
    },
    {
      month: "2025-04",
      co2Avoided: "1220.00",
      recyclabilityRate: "86.00",
      waterConserved: "45000.00",
      renewableEnergyPercent: "61.50",
    },
    {
      month: "2025-05",
      co2Avoided: "1234.00",
      recyclabilityRate: "87.50",
      waterConserved: "45678.00",
      renewableEnergyPercent: "62.00",
    },
  ];

  await db.insert(esgMetrics).values(esgData);
  console.log("✓ ESG metrics created");

  // Create activity log
  const activityData = [
    {
      type: "Certificación",
      title: "CERT-CL-2025-000127 aprobada",
      description: "Certificación completada exitosamente",
      relatedId: createdCertifications[0].id,
      status: "success",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      type: "Alerta",
      title: "Proveedor Packaging Industrial cerca del límite",
      description: "Capacidad al 98%",
      relatedId: createdProviders[2].id,
      status: "warning",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    {
      type: "NFC",
      title: "Nuevo escaneo en Faena Escondida",
      description: "Tag NFC-2025-000127",
      relatedId: createdCertifications[0].id,
      status: "info",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      type: "Evaluación",
      title: "Evaluación documentos en curso CPS-2025-042",
      description: "Asignado a María Evaluadora",
      relatedId: createdCertifications[2].id,
      status: "info",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    },
  ];

  await db.insert(activityLog).values(activityData);
  console.log("✓ Activity log created");

  console.log("\n✅ Database seeded successfully!");
  console.log("\nTest credentials:");
  console.log("  Admin: username=admin, password=admin123");
  console.log("  Evaluador: username=evaluador1, password=evaluador123");
  console.log("  Auditor: username=auditor1, password=auditor123");
  
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
