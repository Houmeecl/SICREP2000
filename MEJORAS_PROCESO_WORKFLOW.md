# 🔄 Mejoras del Proceso de Certificación y Workflow

**Sistema**: SICREP v2.1
**Fecha**: 2025-11-10
**Estado**: Diseño para implementación

---

## 📋 Resumen de Mejoras Solicitadas

### 1️⃣ Solicitud Simplificada con Auto-registro
**Antes**: Solicitud manual → Esperar aprobación → Crear usuario
**Después**: Botón "Iniciar Certificación" → Pagar → Usuario automático

### 2️⃣ Sistema de Autorizaciones por Rol
**Antes**: Flujo lineal, cada fase avanza manualmente
**Después**: Cada rol autoriza/aprueba su parte del proceso

### 3️⃣ Certificación de Embalajes por Proveedor
**Antes**: SICREP certifica cada embalaje
**Después**: Proveedor certifica directamente con paquete de 30 NFC

### 4️⃣ Sistema de Agenda para Terreno
**Antes**: Coordinación manual de visitas
**Después**: Agenda integrada con slots disponibles

---

## 🚀 MEJORA 1: Flujo de Solicitud Simplificado

### Diagrama del Nuevo Flujo

```
┌─────────────────────────────────────────────────────────────┐
│           FLUJO DE SOLICITUD AUTO-REGISTRO                   │
└─────────────────────────────────────────────────────────────┘

USUARIO (Sin cuenta)
    │
    ▼
┌──────────────────────────────┐
│  🌐 Landing Page SICREP      │
│  www.sicrep.cl               │
│                               │
│  [Iniciar Certificación] ◄───── BOTÓN PRINCIPAL
│  [Ver Manual]                │
│  [Auto-evaluación]           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  📝 PASO 1: Datos Empresa    │
│                               │
│  RUT: [_______________]      │
│  → Valida en SII automático  │
│                               │
│  Si existe:                   │
│  • Pre-llena razón social    │
│  • Pre-llena dirección        │
│  • Pre-llena giro             │
│                               │
│  Razón Social: [____________]│
│  Giro: [____________________]│
│  Dirección: [_______________]│
│  Comuna: [__________________]│
│  Región: [__________________]│
│                               │
│  Representante Legal:         │
│  Nombre: [__________________]│
│  RUT: [_____________________]│
│  Email: [___________________]│ ◄─── Email del usuario
│  Teléfono: [________________]│
│                               │
│  [Siguiente paso →]          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  📄 PASO 2: Tipo Certificación│
│                               │
│  Seleccione:                  │
│  ( ) Certificación REP Básica │
│      $800,000 CLP             │
│      • 10 fases estándar      │
│      • Visita terreno         │
│      • 1 certificado          │
│                               │
│  (•) Cert. REP + Embalajes    │
│      $1,200,000 CLP           │
│      • Incluye básica         │
│      • 30 NFC tags            │
│      • Cert. embalajes ilim.  │
│                               │
│  ( ) Solo Embalajes           │
│      $400,000 CLP             │
│      • Sin visita terreno     │
│      • 30 NFC tags            │
│      • Panel simplificado     │
│                               │
│  [← Volver] [Siguiente →]    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  📋 PASO 3: Documentos       │
│                               │
│  Adjunte documentos iniciales:│
│                               │
│  ✓ Certificado Inicio Act.   │
│    [Subir archivo] [✓]       │
│                               │
│  ✓ Escritura de Constitución │
│    [Subir archivo] [✓]       │
│                               │
│  ✓ Poder Representante Legal │
│    [Subir archivo] [✓]       │
│                               │
│  ⚠️ Opcionales (puede adjuntar después):
│  □ Plan de manejo residuos   │
│  □ Certificados capacitación │
│  □ Permisos ambientales       │
│                               │
│  [← Volver] [Siguiente →]    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  💰 PASO 4: Pago Inicial     │
│                               │
│  Resumen:                     │
│  Certificación: REP + Embalajes
│  Total: $1,200,000 CLP        │
│                               │
│  Pago Inicial (30%):          │
│  $360,000 CLP                 │
│                               │
│  Método de pago:              │
│  (•) Transferencia bancaria   │
│  ( ) WebPay (Transbank)       │
│  ( ) Orden de compra          │
│                               │
│  Si Transferencia:            │
│  ┌────────────────────────┐  │
│  │ Banco Estado           │  │
│  │ Cuenta Corriente       │  │
│  │ N°: 12345678-9         │  │
│  │ RUT: 76.XXX.XXX-X      │  │
│  │ Titular: SICREP SpA    │  │
│  │                         │  │
│  │ Monto: $360,000        │  │
│  │ Ref: RUT-EMPRESA       │  │
│  └────────────────────────┘  │
│                               │
│  Comprobante:                 │
│  [Subir comprobante]          │
│                               │
│  Si WebPay:                   │
│  [Pagar con Transbank →]     │
│                               │
│  [← Volver] [Enviar solicitud]│
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  ⏳ VALIDANDO PAGO...        │
│                               │
│  Su solicitud ha sido         │
│  recibida con el código:      │
│                               │
│  🎫 CERT-CL-2025-001234       │
│                               │
│  Estado: Pendiente validación │
│                               │
│  Recibirá un email cuando:    │
│  1. Se valide el pago         │
│  2. Se cree su usuario        │
│  3. Pueda acceder al panel    │
│                               │
│  Tiempo estimado: 2-4 horas   │
│  (horario laboral)            │
│                               │
│  [Volver al inicio]           │
└──────────┬───────────────────┘
           │
           │ (Backend - SICREP Admin)
           ▼
┌──────────────────────────────┐
│  🔍 VALIDACIÓN AUTOMÁTICA    │
│  (Panel Admin)               │
│                               │
│  Nueva solicitud recibida:    │
│  CERT-CL-2025-001234          │
│                               │
│  Validaciones automáticas:    │
│  ✓ RUT válido en SII          │
│  ✓ Email único (no duplicado) │
│  ✓ Documentos adjuntos        │
│                               │
│  Validación manual requerida: │
│  ⚠️ Comprobante de pago       │
│                               │
│  [Ver comprobante]            │
│  [✓ Aprobar pago]             │
│  [✗ Rechazar]                 │
└──────────┬───────────────────┘
           │
           │ Admin aprueba
           ▼
┌──────────────────────────────┐
│  🎉 USUARIO CREADO           │
│  (Automático al aprobar)     │
│                               │
│  Se ejecuta:                  │
│  1. Crear usuario en DB       │
│     username: RUT empresa     │
│     password: auto-generada   │
│     role: proveedor           │
│                               │
│  2. Crear certificación       │
│     status: solicitud_inicial │
│     phase: revision_documental│
│                               │
│  3. Si incluye embalajes:     │
│     • Asignar 30 NFC tags     │
│     • Activar panel embalajes │
│                               │
│  4. Enviar email:             │
│     ┌─────────────────────┐  │
│     │ Bienvenido a SICREP │  │
│     │                      │  │
│     │ Usuario: 76XXX-X    │  │
│     │ Pass: XXXX-XXXX     │  │
│     │                      │  │
│     │ Accede en:          │  │
│     │ sicrep.cl/login     │  │
│     └─────────────────────┘  │
│                               │
│  5. Notificar a equipo:       │
│     • Analista Documental     │
│     • Evaluador asignado      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  🔐 USUARIO ACCEDE           │
│  (Primera vez)               │
│                               │
│  Login:                       │
│  Usuario: 76123456-7          │
│  Password: *******            │
│                               │
│  [Ingresar]                   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  🏠 PANEL PROVEEDOR          │
│                               │
│  Bienvenido, Minera del Norte│
│                               │
│  📊 Estado de Certificación:  │
│  Fase 2: Revisión Documental │
│  Progreso: 10% [██░░░░░░░░]  │
│                               │
│  📋 Tareas Pendientes:        │
│  • Completar documentación    │
│  • Subir plan de residuos     │
│                               │
│  🏷️ NFC Tags Disponibles:     │
│  30/30 tags (100%)            │
│  [Certificar embalaje]        │
│                               │
│  💰 Pagos:                    │
│  • Inicial: ✓ Pagado         │
│  • Intermedio: Pendiente      │
│  • Final: Pendiente           │
└──────────────────────────────┘
```

### Implementación Técnica

#### 1. Nueva Ruta Pública

```typescript
// client/src/App.tsx
<Route path="/iniciar-certificacion" component={IniciarCertificacion} />
```

#### 2. Componente de Auto-registro

```typescript
// client/src/pages/IniciarCertificacion.tsx
import { useState } from 'react';
import { useLocation } from 'wouter';

interface FormData {
  // Paso 1
  rut: string;
  razonSocial: string;
  giro: string;
  direccion: string;
  comuna: string;
  region: string;
  representanteNombre: string;
  representanteRut: string;
  representanteEmail: string;
  representanteTelefono: string;

  // Paso 2
  tipoCertificacion: 'basica' | 'con_embalajes' | 'solo_embalajes';

  // Paso 3
  documentos: {
    inicioActividades: File | null;
    escrituraConstitucion: File | null;
    poderRepresentante: File | null;
  };

  // Paso 4
  metodoPago: 'transferencia' | 'webpay' | 'orden_compra';
  comprobantePago?: File;
}

export default function IniciarCertificacion() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({...});

  // Validar RUT en SII
  const validarRUT = async (rut: string) => {
    const response = await fetch(`/api/validar-rut/${rut}`);
    if (response.ok) {
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        razonSocial: data.razonSocial,
        direccion: data.direccion,
        giro: data.giro
      }));
    }
  };

  // Enviar solicitud
  const enviarSolicitud = async () => {
    const formDataToSend = new FormData();
    // ... agregar todos los campos

    const response = await fetch('/api/solicitudes-publicas', {
      method: 'POST',
      body: formDataToSend
    });

    const data = await response.json();
    // Mostrar código de certificación y esperar aprobación
  };

  return <MultiStepForm />;
}
```

#### 3. Endpoint de Backend

```typescript
// server/routes.ts
app.post("/api/solicitudes-publicas", async (req: Request, res: Response) => {
  try {
    const {
      rut,
      razonSocial,
      representanteEmail,
      tipoCertificacion,
      metodoPago
    } = req.body;

    // 1. Validar que el RUT no esté duplicado
    const existingProvider = await storage.getProviderByRut(rut);
    if (existingProvider) {
      return res.status(400).json({
        message: "Ya existe una empresa con este RUT"
      });
    }

    // 2. Validar que el email no esté duplicado
    const existingUser = await storage.getUserByUsername(representanteEmail);
    if (existingUser) {
      return res.status(400).json({
        message: "Ya existe un usuario con este email"
      });
    }

    // 3. Generar código de certificación
    const allCerts = await storage.getAllCertifications();
    const sequence = allCerts.length + 1;
    const code = `CERT-CL-${new Date().getFullYear()}-${String(sequence).padStart(6, '0')}`;

    // 4. Calcular montos
    const montos = {
      basica: { total: 800000, inicial: 240000 },
      con_embalajes: { total: 1200000, inicial: 360000 },
      solo_embalajes: { total: 400000, inicial: 120000 }
    };
    const monto = montos[tipoCertificacion];

    // 5. Crear solicitud en estado "pendiente_validacion"
    const solicitud = await storage.createCertificationRequest({
      code,
      rut,
      razonSocial,
      representanteEmail,
      tipoCertificacion,
      metodoPago,
      montoTotal: monto.total,
      montoInicial: monto.inicial,
      status: 'pendiente_validacion',
      createdAt: new Date()
    });

    // 6. Guardar documentos
    // ... (upload a storage)

    // 7. Notificar a admin
    await sendEmailToAdmin({
      subject: `Nueva solicitud: ${code}`,
      body: `Se ha recibido una nueva solicitud de certificación.\n\nCódigo: ${code}\nEmpresa: ${razonSocial}\nMonto inicial: $${monto.inicial.toLocaleString()}\n\nValidar en: https://sicrep.cl/admin/solicitudes`
    });

    res.json({
      code,
      message: "Solicitud recibida. Recibirá un email cuando se valide el pago.",
      estimatedTime: "2-4 horas"
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
```

#### 4. Panel de Admin para Validar Pagos

```typescript
// client/src/pages/admin/ValidarSolicitudes.tsx
export default function ValidarSolicitudes() {
  const { data: solicitudes } = useQuery({
    queryKey: ['solicitudes-pendientes'],
    queryFn: async () => {
      const res = await fetch('/api/solicitudes-pendientes');
      return res.json();
    }
  });

  const aprobarSolicitud = useMutation({
    mutationFn: async (solicitudId: string) => {
      const res = await fetch(`/api/solicitudes/${solicitudId}/aprobar`, {
        method: 'POST'
      });
      return res.json();
    },
    onSuccess: () => {
      // Refetch solicitudes
    }
  });

  return (
    <div>
      {solicitudes?.map(sol => (
        <Card key={sol.id}>
          <CardHeader>
            <CardTitle>{sol.code}</CardTitle>
            <p>{sol.razonSocial}</p>
          </CardHeader>
          <CardContent>
            <p>Monto inicial: ${sol.montoInicial.toLocaleString()}</p>
            <p>Método: {sol.metodoPago}</p>
            <Button onClick={() => aprobarSolicitud.mutate(sol.id)}>
              ✓ Aprobar y crear usuario
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

#### 5. Aprobación Automática de Usuario

```typescript
// server/routes.ts
app.post("/api/solicitudes/:id/aprobar", requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const solicitud = await storage.getCertificationRequest(id);

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // 1. Crear proveedor
    const provider = await storage.createProvider({
      rut: solicitud.rut,
      name: solicitud.razonSocial,
      email: solicitud.representanteEmail,
      // ... otros datos
    });

    // 2. Generar contraseña temporal
    const password = generateSecurePassword(); // Ej: "SICREP-2025-ABC123"

    // 3. Crear usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await storage.createUser({
      username: solicitud.representanteEmail,
      password: hashedPassword,
      name: solicitud.representanteNombre,
      role: 'proveedor',
      providerId: provider.id
    });

    // 4. Crear certificación
    const certification = await storage.createCertification({
      code: solicitud.code,
      providerId: provider.id,
      cpsId: null, // Se asignará después
      status: 'solicitud_inicial',
      currentPhase: 'revision_documental',
      createdAt: new Date()
    });

    // 5. Si incluye embalajes, asignar NFC tags
    if (solicitud.tipoCertificacion !== 'basica') {
      await storage.assignNFCPackage({
        providerId: provider.id,
        quantity: 30,
        type: 'embalaje'
      });
    }

    // 6. Enviar email con credenciales
    await sendEmail({
      to: solicitud.representanteEmail,
      subject: 'Bienvenido a SICREP - Credenciales de acceso',
      html: `
        <h1>¡Bienvenido a SICREP!</h1>
        <p>Su pago ha sido validado y su cuenta ha sido creada.</p>

        <h2>Datos de acceso:</h2>
        <ul>
          <li><strong>Usuario:</strong> ${solicitud.representanteEmail}</li>
          <li><strong>Contraseña temporal:</strong> ${password}</li>
        </ul>

        <p><a href="https://sicrep.cl/login">Acceder al panel</a></p>

        <p>Su certificación <strong>${solicitud.code}</strong> está en proceso.</p>
        <p>Estado actual: Fase 2 - Revisión Documental</p>

        ${solicitud.tipoCertificacion !== 'basica' ? `
          <p>✓ Tiene 30 NFC tags disponibles para certificar embalajes</p>
        ` : ''}
      `
    });

    // 7. Actualizar solicitud
    await storage.updateCertificationRequest(id, {
      status: 'aprobada',
      userId: user.id,
      approvedAt: new Date()
    });

    // 8. Notificar a equipo asignado
    await notifyTeam({
      certification: solicitud.code,
      phase: 'revision_documental',
      assignedTo: ['analista_documental', 'evaluador']
    });

    res.json({
      message: "Solicitud aprobada. Usuario creado.",
      userId: user.id,
      certificationCode: solicitud.code
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
```

---

## 🔐 MEJORA 2: Sistema de Autorizaciones por Rol

### Concepto

Cada fase requiere autorización específica del rol responsable antes de avanzar.

### Matriz de Autorizaciones

```
┌─────────────────────────────────────────────────────────────┐
│         MATRIZ DE AUTORIZACIONES POR FASE                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Fase 1: Solicitud Inicial                                  │
│  ├─ Autoriza: Sistema (automático al pagar)                │
│  └─ Acción: Crear certificación                            │
│                                                              │
│  Fase 2: Revisión Documental                                │
│  ├─ Autoriza: Analista Documental                          │
│  ├─ Valida: Documentos completos y válidos                  │
│  └─ Acción: [Aprobar] o [Solicitar correcciones]          │
│           Si aprueba → Fase 3                               │
│           Si rechaza → Notifica a proveedor                 │
│                                                              │
│  Fase 3: Evaluación Preliminar                              │
│  ├─ Autoriza: Evaluador                                     │
│  ├─ Valida: Puntaje documental ≥ 24/40                     │
│  └─ Acción: [Aprobar] o [Rechazar]                        │
│           Si ≥24 pts → Fase 4                              │
│           Si <24 pts → Plan de Acción                      │
│                                                              │
│  Fase 4: Visita en Terreno                                  │
│  ├─ Autoriza: Auditor de Campo                             │
│  ├─ Valida: Puntaje operativo ≥ 24/40                      │
│  └─ Acción: [Aprobar visita] o [Re-agendar]               │
│           Si aprueba → Fase 5                               │
│                                                              │
│  Fase 5: Análisis de Cumplimiento                          │
│  ├─ Autoriza: Analista Senior                              │
│  ├─ Valida: Puntaje total ≥ 60/100                         │
│  └─ Acción: [Aprobar] o [Rechazar]                        │
│           Si ≥60 pts → Fase 6                              │
│           Si <60 pts → Plan Correctivo                     │
│                                                              │
│  Fase 6: Dictamen Técnico                                   │
│  ├─ Autoriza: Jefe Técnico                                  │
│  ├─ Valida: Informe técnico completo                       │
│  └─ Acción: [Enviar a Comité]                             │
│                                                              │
│  Fase 7: Aprobación Comité                                  │
│  ├─ Autoriza: Comité Certificación (votación)              │
│  ├─ Valida: Mayoría simple (≥50% votos)                   │
│  └─ Acción: [Aprobar] [Rechazar] [Condicionar]           │
│           Si aprueba → Fase 8                               │
│           Si rechaza → Notifica motivos                     │
│           Si condiciona → Lista de pendientes               │
│                                                              │
│  Fase 8: Emisión de Certificado                            │
│  ├─ Autoriza: Administrador                                 │
│  ├─ Valida: Pagos completos                                │
│  └─ Acción: [Generar certificado]                         │
│           Automático → PDF + QR + NFC                       │
│                                                              │
│  Fase 9: Publicación                                        │
│  ├─ Autoriza: Coordinador                                   │
│  ├─ Valida: Certificado generado                           │
│  └─ Acción: [Publicar] en registro oficial                │
│                                                              │
│  Fase 10: Seguimiento                                       │
│  ├─ Autoriza: Supervisor                                    │
│  ├─ Valida: Auditorías periódicas                          │
│  └─ Acción: [Renovar] o [Suspender]                       │
└─────────────────────────────────────────────────────────────┘
```

### Implementación del Sistema de Autorizaciones

#### Schema de Base de Datos

```typescript
// shared/schema.ts

// Nueva tabla: workflow_authorizations
export const workflowAuthorizations = pgTable("workflow_authorizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  certificationId: varchar("certification_id").notNull().references(() => certifications.id),
  phase: workflowPhaseEnum("phase").notNull(),
  authorizedBy: varchar("authorized_by").references(() => users.id),
  decision: decisionEnum("decision").notNull(), // "approved", "rejected", "pending", "conditional"
  comments: text("comments"),
  attachments: text("attachments"), // JSON array de archivos
  votingResults: text("voting_results"), // JSON para votación de comité
  authorizedAt: timestamp("authorized_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Nueva tabla: workflow_conditions
export const workflowConditions = pgTable("workflow_conditions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorizationId: varchar("authorization_id").notNull().references(() => workflowAuthorizations.id),
  condition: text("condition").notNull(),
  status: conditionStatusEnum("status").notNull(), // "pending", "completed", "rejected"
  completedBy: varchar("completed_by").references(() => users.id),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Enums
export const decisionEnum = pgEnum("decision", [
  "approved",
  "rejected",
  "pending",
  "conditional"
]);

export const conditionStatusEnum = pgEnum("condition_status", [
  "pending",
  "completed",
  "rejected"
]);
```

#### API de Autorizaciones

```typescript
// server/routes.ts

// Endpoint para autorizar una fase
app.post("/api/certifications/:id/authorize-phase",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { decision, comments, conditions } = req.body;
      const user = req.session.user!;

      const cert = await storage.getCertification(id);
      if (!cert) {
        return res.status(404).json({ message: "Certificación no encontrada" });
      }

      // Validar que el usuario tiene el rol apropiado para esta fase
      const phaseRoles = {
        'revision_documental': ['admin', 'analista'],
        'evaluacion_preliminar': ['admin', 'evaluador'],
        'visita_terreno': ['admin', 'auditor'],
        'analisis_cumplimiento': ['admin', 'analista_senior'],
        'dictamen_tecnico': ['admin', 'jefe_tecnico'],
        'aprobacion_comite': ['admin', 'comite'],
        'emision_certificado': ['admin'],
        'publicacion': ['admin', 'coordinador'],
        'seguimiento': ['admin', 'supervisor']
      };

      const allowedRoles = phaseRoles[cert.currentPhase as keyof typeof phaseRoles];
      if (!allowedRoles?.includes(user.role)) {
        return res.status(403).json({
          message: `No tiene permisos para autorizar esta fase. Roles permitidos: ${allowedRoles.join(', ')}`
        });
      }

      // Crear autorización
      const authorization = await storage.createWorkflowAuthorization({
        certificationId: id,
        phase: cert.currentPhase,
        authorizedBy: user.id,
        decision,
        comments,
        authorizedAt: new Date()
      });

      // Si es condicional, crear las condiciones
      if (decision === 'conditional' && conditions) {
        for (const condition of conditions) {
          await storage.createWorkflowCondition({
            authorizationId: authorization.id,
            condition,
            status: 'pending'
          });
        }
      }

      // Si es aprobado, avanzar a siguiente fase
      if (decision === 'approved') {
        const nextPhase = getNextPhase(cert.currentPhase);
        if (nextPhase) {
          await storage.updateCertification(id, {
            currentPhase: nextPhase,
            status: nextPhase === 'emision_certificado' ? 'aprobado' : cert.status
          });

          // Notificar al siguiente responsable
          await notifyNextResponsible(nextPhase, cert);
        }
      }

      // Si es rechazado
      if (decision === 'rejected') {
        await storage.updateCertification(id, {
          status: 'rechazado'
        });

        // Notificar al proveedor
        await notifyProvider(cert, 'rejected', comments);
      }

      // Log de actividad
      await storage.createActivity({
        type: 'Autorización',
        title: `Fase ${cert.currentPhase} ${decision}`,
        description: comments || '',
        userId: user.id,
        relatedId: id,
        status: decision === 'approved' ? 'success' : decision === 'rejected' ? 'error' : 'warning'
      });

      res.json({
        message: "Autorización registrada",
        authorization,
        nextPhase: decision === 'approved' ? getNextPhase(cert.currentPhase) : null
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Endpoint para votación de comité
app.post("/api/certifications/:id/committee-vote",
  requireRole('comite'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { vote, comments } = req.body; // vote: "approve" | "reject" | "abstain"
      const user = req.session.user!;

      // Registrar voto individual
      await storage.createCommitteeVote({
        certificationId: id,
        userId: user.id,
        vote,
        comments,
        votedAt: new Date()
      });

      // Obtener todos los votos
      const votes = await storage.getCommitteeVotes(id);
      const totalVotes = votes.length;
      const approveVotes = votes.filter(v => v.vote === 'approve').length;
      const rejectVotes = votes.filter(v => v.vote === 'reject').length;

      // Si todos los miembros del comité han votado
      const committeeSize = await storage.getCommitteeSize();
      if (totalVotes >= committeeSize) {
        const decision = approveVotes > (committeeSize / 2) ? 'approved' : 'rejected';

        // Crear autorización con resultado de votación
        await storage.createWorkflowAuthorization({
          certificationId: id,
          phase: 'aprobacion_comite',
          authorizedBy: null, // Comité completo
          decision,
          votingResults: JSON.stringify({
            total: totalVotes,
            approve: approveVotes,
            reject: rejectVotes,
            abstain: totalVotes - approveVotes - rejectVotes
          }),
          authorizedAt: new Date()
        });

        // Avanzar o rechazar
        if (decision === 'approved') {
          await storage.updateCertification(id, {
            currentPhase: 'emision_certificado',
            status: 'aprobado'
          });
        } else {
          await storage.updateCertification(id, {
            status: 'rechazado'
          });
        }
      }

      res.json({
        message: "Voto registrado",
        currentVotes: {
          total: totalVotes,
          approve: approveVotes,
          reject: rejectVotes
        },
        pending: committeeSize - totalVotes
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
```

---

## 🏷️ MEJORA 3: Paquetes de 30 NFC para Proveedores

### Concepto

El proveedor recibe un paquete de 30 NFC tags al contratar certificación con embalajes. Puede certificar embalajes ilimitadamente, pero solo puede tener 30 activos simultáneamente.

### Diagrama del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│        SISTEMA DE PAQUETES NFC PARA PROVEEDORES              │
└─────────────────────────────────────────────────────────────┘

PROVEEDOR CONTRATA                  SICREP ASIGNA
    │                                    │
    ▼                                    ▼
┌──────────────────┐              ┌──────────────────┐
│ Certificación    │              │ Paquete NFC      │
│ REP + Embalajes  │──────────────▶ 30 tags          │
│ $1,200,000       │              │ ASIGNADOS        │
└──────────────────┘              └────────┬─────────┘
                                           │
                                           ▼
                              ┌────────────────────────┐
                              │ Estado del Paquete:     │
                              │                         │
                              │ Total asignado: 30      │
                              │ En uso: 0               │
                              │ Disponibles: 30         │
                              │ Histórico: 0            │
                              └────────┬───────────────┘
                                       │
      ┌────────────────────────────────┴────────────────────────────────┐
      │                                                                  │
      ▼                                                                  ▼
PROVEEDOR CERTIFICA                                           PROVEEDOR REUTILIZA
   EMBALAJE                                                       TAG
      │                                                                  │
      ▼                                                                  ▼
┌──────────────────┐                                          ┌──────────────────┐
│ Selecciona NFC   │                                          │ Tag completó     │
│ del paquete      │                                          │ su ciclo         │
│                  │                                          │ (embalaje usado) │
│ NFC-2025-000001  │                                          │                  │
└────────┬─────────┘                                          │ NFC-2025-000001  │
         │                                                    └────────┬─────────┘
         │                                                             │
         ▼                                                             ▼
┌──────────────────┐                                          ┌──────────────────┐
│ Ingresa datos:   │                                          │ Marcar como      │
│ • Tipo embalaje  │                                          │ "disponible"     │
│ • Dimensiones    │                                          │                  │
│ • Cliente        │                                          │ Vuelve al pool   │
│ • Orden compra   │                                          └────────┬─────────┘
└────────┬─────────┘                                                   │
         │                                                             │
         ▼                                                             ▼
┌──────────────────┐                                          ┌──────────────────┐
│ Sistema calcula: │                                          │ Ahora disponible │
│ • Peso automático│                                          │ para reutilizar  │
│ • Reciclabilidad │                                          │                  │
│ • Código QR      │                                          │ En uso: 24       │
└────────┬─────────┘                                          │ Disponibles: 6   │
         │                                                    └──────────────────┘
         ▼
┌──────────────────┐
│ NFC asignado     │
│ Estado: EN USO   │
│                  │
│ En uso: 25       │
│ Disponibles: 5   │
└──────────────────┘
```

### Schema de Base de Datos

```typescript
// shared/schema.ts

// Nueva tabla: nfc_packages
export const nfcPackages = pgTable("nfc_packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  totalAssigned: integer("total_assigned").notNull().default(30),
  inUse: integer("in_use").notNull().default(0),
  available: integer("available").notNull().default(30),
  historicalUsage: integer("historical_usage").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"), // Si tiene vencimiento
});

// Nueva tabla: nfc_tag_assignments
export const nfcTagAssignments = pgTable("nfc_tag_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nfcTagId: varchar("nfc_tag_id").notNull().references(() => nfcTags.id),
  packageId: varchar("package_id").notNull().references(() => nfcPackages.id),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  shipmentId: varchar("shipment_id").references(() => shipments.id),
  status: nfcStatusEnum("status").notNull().default("available"), // "available", "in_use", "completed"
  assignedAt: timestamp("assigned_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const nfcStatusEnum = pgEnum("nfc_status", [
  "available",
  "in_use",
  "completed"
]);
```

### API de Gestión de NFC

```typescript
// server/routes.ts

// Obtener paquete NFC del proveedor
app.get("/api/providers/:id/nfc-package",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const package = await storage.getNFCPackage(id);

      if (!package) {
        return res.status(404).json({ message: "No tiene paquete NFC asignado" });
      }

      // Obtener tags disponibles
      const availableTags = await storage.getAvailableNFCTags(id);

      res.json({
        package: {
          totalAssigned: package.totalAssigned,
          inUse: package.inUse,
          available: package.available,
          historicalUsage: package.historicalUsage,
          percentageUsed: (package.inUse / package.totalAssigned) * 100
        },
        availableTags: availableTags.map(tag => ({
          id: tag.id,
          tagId: tag.tagId,
          assignedAt: tag.assignedAt
        }))
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Asignar NFC a un embalaje
app.post("/api/shipments/:shipmentId/assign-nfc",
  requireRole('proveedor', 'admin'),
  async (req: Request, res: Response) => {
    try {
      const { shipmentId } = req.params;
      const user = req.session.user!;

      // Obtener proveedor del usuario
      const userWithProvider = await storage.getUserWithProvider(user.id);
      if (!userWithProvider?.providerId) {
        return res.status(403).json({ message: "Usuario no asociado a proveedor" });
      }

      // Verificar que tiene tags disponibles
      const package = await storage.getNFCPackage(userWithProvider.providerId);
      if (!package || package.available === 0) {
        return res.status(400).json({
          message: "No tiene NFC tags disponibles. Complete un ciclo para liberar tags."
        });
      }

      // Obtener un tag disponible
      const availableTag = await storage.getOneAvailableNFCTag(userWithProvider.providerId);
      if (!availableTag) {
        return res.status(500).json({ message: "Error al obtener tag disponible" });
      }

      // Asignar tag al shipment
      await storage.assignNFCTagToShipment({
        nfcTagId: availableTag.id,
        packageId: package.id,
        providerId: userWithProvider.providerId,
        shipmentId,
        status: 'in_use',
        assignedAt: new Date()
      });

      // Actualizar contadores del paquete
      await storage.updateNFCPackage(package.id, {
        inUse: package.inUse + 1,
        available: package.available - 1,
        historicalUsage: package.historicalUsage + 1
      });

      // Actualizar shipment con NFC
      await storage.updateShipment(shipmentId, {
        nfcTag: availableTag.tagId
      });

      res.json({
        message: "NFC asignado exitosamente",
        nfcTag: availableTag.tagId,
        remaining: package.available - 1
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Marcar NFC como completado (liberar para reutilizar)
app.post("/api/nfc-tags/:tagId/complete",
  requireRole('proveedor', 'admin'),
  async (req: Request, res: Response) => {
    try {
      const { tagId } = req.params;
      const { reason } = req.body; // Motivo: "producto_entregado", "ciclo_completado", etc.

      const assignment = await storage.getNFCTagAssignment(tagId);
      if (!assignment) {
        return res.status(404).json({ message: "Asignación no encontrada" });
      }

      // Marcar como completado
      await storage.updateNFCTagAssignment(assignment.id, {
        status: 'completed',
        completedAt: new Date()
      });

      // Crear nuevo registro disponible
      await storage.createNFCTagAssignment({
        nfcTagId: assignment.nfcTagId,
        packageId: assignment.packageId,
        providerId: assignment.providerId,
        status: 'available',
        createdAt: new Date()
      });

      // Actualizar contadores
      const package = await storage.getNFCPackage(assignment.packageId);
      await storage.updateNFCPackage(package.id, {
        inUse: package.inUse - 1,
        available: package.available + 1
      });

      res.json({
        message: "NFC liberado y disponible para reutilizar",
        available: package.available + 1
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);
```

### UI de Panel Proveedor

```typescript
// client/src/components/NFCPackageStatus.tsx
export function NFCPackageStatus({ providerId }: { providerId: string }) {
  const { data: nfcPackage } = useQuery({
    queryKey: ['nfc-package', providerId],
    queryFn: async () => {
      const res = await fetch(`/api/providers/${providerId}/nfc-package`);
      return res.json();
    }
  });

  if (!nfcPackage) return null;

  const { package: pkg } = nfcPackage;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Nfc className="h-5 w-5" />
          Paquete de NFC Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Asignado</p>
            <p className="text-3xl font-bold">{pkg.totalAssigned}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">En Uso</p>
            <p className="text-3xl font-bold text-orange-600">{pkg.inUse}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Disponibles</p>
            <p className="text-3xl font-bold text-green-600">{pkg.available}</p>
          </div>
        </div>

        <Progress value={pkg.percentageUsed} className="h-3" />
        <p className="text-sm text-muted-foreground text-center">
          {pkg.percentageUsed.toFixed(0)}% en uso
        </p>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm">
            <strong>Uso histórico:</strong> {pkg.historicalUsage} certificaciones
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Puedes reutilizar los tags al completar el ciclo de vida del embalaje
          </p>
        </div>

        {pkg.available === 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              No tienes tags disponibles. Marca embalajes como completados para liberar tags.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 💰 MEJORA 4: Sistema de Cobro/Estado de Certificación de Embalajes

### Concepto

Control de estado de pago y certificaciones de embalaje por proveedor.

### Schema

```typescript
// Nueva tabla: packaging_certifications
export const packagingCertifications = pgTable("packaging_certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  providerId: varchar("provider_id").notNull().references(() => providers.id),
  shipmentId: varchar("shipment_id").references(() => shipments.id),
  code: text("code").notNull().unique(),
  status: packagingStatusEnum("status").notNull().default("draft"),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  paidAt: timestamp("paid_at"),
  nfcTagUsed: text("nfc_tag_used"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const packagingStatusEnum = pgEnum("packaging_status", [
  "draft",
  "pending_payment",
  "paid",
  "certified",
  "active",
  "completed"
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "paid",
  "overdue",
  "free" // Si está incluido en el paquete
]);
```

### Panel de Control de Embalajes

```typescript
// client/src/pages/PackagingControl.tsx
export default function PackagingControl() {
  const { data: certifications } = useQuery({
    queryKey: ['packaging-certifications'],
    queryFn: async () => {
      const res = await fetch('/api/packaging-certifications');
      return res.json();
    }
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Control de Certificaciones de Embalaje</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado Cert.</TableHead>
                <TableHead>Estado Pago</TableHead>
                <TableHead>NFC</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certifications?.map(cert => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono">{cert.code}</TableCell>
                  <TableCell>{format(new Date(cert.createdAt), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={
                      cert.status === 'certified' ? 'default' :
                      cert.status === 'active' ? 'secondary' :
                      'outline'
                    }>
                      {cert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      cert.paymentStatus === 'paid' ? 'default' :
                      cert.paymentStatus === 'free' ? 'secondary' :
                      'destructive'
                    }>
                      {cert.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {cert.nfcTagUsed || '-'}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Ver detalle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 📅 MEJORA 5: Sistema de Agenda para Auditorías en Terreno

### Concepto

Sistema de calendario compartido donde auditores publican slots disponibles y proveedores reservan visitas.

### Schema

```typescript
// Nueva tabla: field_visit_slots
export const fieldVisitSlots = pgTable("field_visit_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  auditorId: varchar("auditor_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  startTime: text("start_time").notNull(), // "09:00"
  endTime: text("end_time").notNull(), // "13:00"
  region: text("region"),
  city: text("city"),
  status: slotStatusEnum("status").notNull().default("available"),
  certificationId: varchar("certification_id").references(() => certifications.id),
  reservedBy: varchar("reserved_by").references(() => users.id),
  reservedAt: timestamp("reserved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const slotStatusEnum = pgEnum("slot_status", [
  "available",
  "reserved",
  "confirmed",
  "completed",
  "cancelled"
]);
```

### UI de Agenda

```typescript
// client/src/pages/FieldVisitScheduler.tsx
import { Calendar } from '@/components/ui/calendar';

export default function FieldVisitScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: slots } = useQuery({
    queryKey: ['field-visit-slots', selectedDate],
    queryFn: async () => {
      const res = await fetch(`/api/field-visit-slots?date=${selectedDate?.toISOString()}`);
      return res.json();
    }
  });

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Calendario */}
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Fecha</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
          />
        </CardContent>
      </Card>

      {/* Slots disponibles */}
      <Card>
        <CardHeader>
          <CardTitle>
            Horarios Disponibles
            {selectedDate && ` - ${format(selectedDate, 'dd/MM/yyyy')}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {slots?.map(slot => (
              <div key={slot.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-semibold">{slot.startTime} - {slot.endTime}</p>
                  <p className="text-sm text-muted-foreground">
                    Auditor: {slot.auditorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {slot.city}, {slot.region}
                  </p>
                </div>
                <Button
                  disabled={slot.status !== 'available'}
                  onClick={() => reserveSlot(slot.id)}
                >
                  {slot.status === 'available' ? 'Reservar' : 'No disponible'}
                </Button>
              </div>
            ))}

            {(!slots || slots.length === 0) && (
              <p className="text-center text-muted-foreground py-8">
                No hay horarios disponibles para esta fecha
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

**Documento**: MEJORAS_PROCESO_WORKFLOW.md
**Versión**: 2.1
**Fecha**: 2025-11-10
**Estado**: ✅ Diseñado - Listo para implementación

---

**Sistema SICREP - Mejoras del Workflow**
