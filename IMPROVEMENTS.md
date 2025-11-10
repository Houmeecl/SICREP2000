# 🚀 Mejoras Identificadas y Roadmap - SICREP

**Basado en análisis de documentos técnicos en `attached_assets/`**

---

## 📊 Análisis de Documentos Técnicos

He revisado los siguientes documentos clave:

### Documentos Analizados
1. ✅ `SICREP_Workflow_Completo` - Workflow de 10 fases con SLAs
2. ✅ `SICREP_Funciones_Por_Rol` - Matriz de responsabilidades
3. ✅ `sistema_de_trazabilidad_de_embalajes_con_adhesivo_nfc` - Sistema NFC avanzado
4. ✅ `SICREP_Documentacion_Completa_Mejorada` - Especificaciones técnicas
5. ✅ `SICREP_Manual_Tecnico_Completo` - Manual operativo

---

## 🎯 Mejoras Críticas Identificadas

### 1. ⏱️ SLA y Tiempos por Fase (PRIORITARIO)

**Estado Actual**: El workflow existe pero sin SLAs definidos en el código.

**Mejora Propuesta**:
```typescript
// shared/workflow-config.ts
export const WORKFLOW_SLA = {
  solicitud_inicial: {
    duration: '1 día',
    hours: 24,
    responsable: 'Sistema/Comercial',
    alertAt: 18, // Alerta a las 18 horas
  },
  revision_documental: {
    duration: '2-3 días',
    hours: 72,
    responsable: 'Analista Documental',
    alertAt: 48,
  },
  evaluacion_preliminar: {
    duration: '3-4 días',
    hours: 96,
    responsable: 'Evaluador',
    alertAt: 72,
  },
  visita_terreno: {
    duration: '1-2 días + viaje',
    hours: 120, // 5 días con viaje
    responsable: 'Auditor de Campo',
    alertAt: 96,
  },
  analisis_cumplimiento: {
    duration: '2-3 días',
    hours: 72,
    responsable: 'Analista Senior',
    alertAt: 60,
  },
  dictamen_tecnico: {
    duration: '2 días',
    hours: 48,
    responsable: 'Jefe Técnico',
    alertAt: 36,
  },
  aprobacion_comite: {
    duration: '3-5 días',
    hours: 120,
    responsable: 'Comité de Certificación',
    alertAt: 96,
  },
  emision_certificado: {
    duration: '1 día',
    hours: 24,
    responsable: 'Sistema/Admin',
    alertAt: 20,
  },
  publicacion: {
    duration: '1 día',
    hours: 24,
    responsable: 'Coordinador',
    alertAt: 20,
  },
  seguimiento: {
    duration: 'Continuo',
    hours: null,
    responsable: 'Supervisor',
    alertAt: null,
  },
};
```

**Implementación**:
- Agregar campo `slaDeadline` en `certifications` table
- Crear tabla `sla_alerts` para notificaciones
- Dashboard con certificaciones en riesgo de incumplir SLA
- Sistema de notificaciones automáticas

---

### 2. 👥 Jerarquía de Roles Mejorada

**Estado Actual**: 14 roles planos sin jerarquía.

**Mejora Propuesta**:
```typescript
// shared/role-hierarchy.ts
export const ROLE_HIERARCHY = {
  super_admin: {
    level: 1,
    parent: null,
    canManage: ['all'],
    dashboardType: 'executive',
  },
  gerente_general: {
    level: 2,
    parent: 'super_admin',
    canManage: ['manager_comercial', 'manager_operaciones', 'gerente_tecnico'],
    dashboardType: 'executive',
  },
  gerente_tecnico: {
    level: 2,
    parent: 'super_admin',
    canManage: ['jefe_tecnico', 'auditor', 'evaluador'],
    dashboardType: 'technical',
  },
  manager_operaciones: {
    level: 3,
    parent: 'gerente_general',
    canManage: ['auditor', 'evaluador', 'coordinador'],
    dashboardType: 'operational',
  },
  jefe_tecnico: {
    level: 3,
    parent: 'gerente_tecnico',
    canManage: ['evaluador', 'analista', 'tecnico'],
    dashboardType: 'technical',
  },
  // ... resto de roles
};

export function canUserManageRole(userRole: string, targetRole: string): boolean {
  const user = ROLE_HIERARCHY[userRole];
  const target = ROLE_HIERARCHY[targetRole];

  if (!user || !target) return false;
  if (user.level >= target.level) return false;

  return user.canManage.includes(targetRole) || user.canManage.includes('all');
}
```

**Beneficios**:
- Delegación de responsabilidades clara
- Control de acceso jerárquico
- Auditoría de cambios por nivel

---

### 3. 📦 Niveles de Embalaje (Primario/Secundario/Terciario)

**Estado Actual**: Sistema de embalajes sin niveles REP.

**Mejora Propuesta**:
```typescript
// shared/schema.ts - Agregar enum
export const nivelEmbalajeEnum = pgEnum("nivel_embalaje", [
  "primario",    // Contacto directo con producto
  "secundario",  // Agrupa unidades primarias
  "terciario"    // Transporte y distribución
]);

// Actualizar shipments table
export const shipments = pgTable("shipments", {
  // ... campos existentes
  nivelEmbalaje: nivelEmbalajeEnum("nivel_embalaje").notNull(),
  capacidadMaxKg: decimal("capacidad_max_kg", { precision: 10, scale: 2 }),
  unidadesContenidas: integer("unidades_contenidas"),
  // ... resto
});

// packagingComponents también
export const packagingComponents = pgTable("packaging_components", {
  // ... campos existentes
  nivelEmbalaje: nivelEmbalajeEnum("nivel_embalaje").notNull(),
  // ... resto
});
```

**Reglas de Negocio**:
```typescript
// server/packaging-calculator.ts
export const LIMITES_POR_NIVEL = {
  primario: { maxKg: 5, descripcion: 'Contacto directo con producto' },
  secundario: { maxKg: 50, descripcion: 'Agrupa unidades primarias' },
  terciario: { maxKg: 300, descripcion: 'Pallets y transporte' },
};

export function validarNivelEmbalaje(
  nivel: 'primario' | 'secundario' | 'terciario',
  pesoKg: number
): { valid: boolean; error?: string } {
  const limite = LIMITES_POR_NIVEL[nivel];
  if (pesoKg > limite.maxKg) {
    return {
      valid: false,
      error: `Peso ${pesoKg}kg excede límite de ${limite.maxKg}kg para nivel ${nivel}`,
    };
  }
  return { valid: true };
}
```

---

### 4. 🔔 Sistema de Notificaciones

**Estado Actual**: No existe sistema de notificaciones.

**Mejora Propuesta**:
```typescript
// Nueva tabla: notifications
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // 'sla_warning', 'phase_change', 'assignment', etc.
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: text("severity").notNull(), // 'info', 'warning', 'error', 'success'
  relatedId: varchar("related_id"), // ID de certificación, despacho, etc.
  relatedType: text("related_type"), // 'certification', 'shipment', etc.
  read: boolean("read").notNull().default(false),
  actionUrl: text("action_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Servicio de notificaciones
// server/services/notificationService.ts
export class NotificationService {
  async createNotification(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    relatedId?: string;
    relatedType?: string;
    actionUrl?: string;
  }) {
    return await storage.createNotification(data);
  }

  async notifySLAWarning(certificationId: string, phase: string, hoursRemaining: number) {
    const cert = await storage.getCertification(certificationId);
    if (!cert || !cert.assignedTo) return;

    await this.createNotification({
      userId: cert.assignedTo,
      type: 'sla_warning',
      title: `⚠️ SLA en riesgo: ${phase}`,
      message: `La certificación ${cert.code} tiene ${hoursRemaining}h restantes para completar la fase ${phase}`,
      severity: 'warning',
      relatedId: certificationId,
      relatedType: 'certification',
      actionUrl: `/certifications/${certificationId}`,
    });
  }

  async notifyPhaseChange(certificationId: string, fromPhase: string, toPhase: string) {
    const cert = await storage.getCertification(certificationId);
    if (!cert) return;

    // Notificar al asignado
    if (cert.assignedTo) {
      await this.createNotification({
        userId: cert.assignedTo,
        type: 'phase_change',
        title: `✅ Certificación avanzó a ${toPhase}`,
        message: `La certificación ${cert.code} avanzó de ${fromPhase} a ${toPhase}`,
        severity: 'success',
        relatedId: certificationId,
        relatedType: 'certification',
        actionUrl: `/certifications/${certificationId}`,
      });
    }
  }
}
```

**Endpoints API**:
```typescript
// GET /api/notifications - Listar notificaciones del usuario
// PATCH /api/notifications/:id/read - Marcar como leída
// DELETE /api/notifications/:id - Eliminar notificación
// GET /api/notifications/unread-count - Contador
```

**UI Component**:
```tsx
// client/src/components/NotificationBell.tsx
export function NotificationBell() {
  const { data: notifications } = useQuery({
    queryKey: ['/api/notifications'],
    refetchInterval: 30000, // Cada 30 segundos
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {/* Lista de notificaciones */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

### 5. 📍 Trazabilidad NFC Avanzada

**Estado Actual**: Sistema básico de NFC.

**Mejoras Propuestas** (basadas en SICREP-TRACE):

#### 5.1. Modo Offline-First
```typescript
// client/src/lib/offline-queue.ts
import Dexie from 'dexie';

class OfflineQueue extends Dexie {
  pendingOperations: Dexie.Table<{
    id: string;
    operation: string;
    payload: any;
    timestamp: number;
    retries: number;
  }, string>;

  constructor() {
    super('SICREPOfflineQueue');
    this.version(1).stores({
      pendingOperations: 'id,operation,timestamp',
    });
  }

  async addOperation(operation: string, payload: any) {
    await this.pendingOperations.add({
      id: crypto.randomUUID(),
      operation,
      payload,
      timestamp: Date.now(),
      retries: 0,
    });
  }

  async syncPendingOperations() {
    const pending = await this.pendingOperations.toArray();

    for (const op of pending) {
      try {
        await fetch('/api/trazabilidad/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(op.payload),
        });

        await this.pendingOperations.delete(op.id);
      } catch (error) {
        op.retries++;
        if (op.retries > 5) {
          // Marcar como fallido permanentemente
          console.error('Failed to sync operation after 5 retries:', op);
        } else {
          await this.pendingOperations.update(op.id, { retries: op.retries });
        }
      }
    }
  }
}

export const offlineQueue = new OfflineQueue();
```

#### 5.2. Niveles de Embalaje en NFC
```typescript
// Actualizar estructura NDEF
export interface NFCTagData {
  uid: string;
  cpsId: string;
  nivel: 'primario' | 'secundario' | 'terciario';
  companyId: string;
  taraGr?: number;
  checksum: string;
}

export function generateNDEFMessage(data: NFCTagData): NDEFMessage {
  return {
    records: [
      {
        recordType: 'url',
        data: `https://sicrep.cl/trace/${data.uid}`,
      },
      {
        recordType: 'text',
        data: `CPS:${data.cpsId}|NIVEL:${data.nivel}|CHK:${data.checksum.substring(0, 8)}`,
      },
    ],
  };
}
```

#### 5.3. Geolocalización en Escaneos
```typescript
// Agregar a nfc_events
export const nfcEvents = pgTable("nfc_events", {
  // ... campos existentes
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  accuracy: decimal("accuracy", { precision: 6, scale: 2 }), // en metros
  altitude: decimal("altitude", { precision: 8, scale: 2 }),
  // ... resto
});

// En el escaneo
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    eventData.latitude = position.coords.latitude;
    eventData.longitude = position.coords.longitude;
    eventData.accuracy = position.coords.accuracy;
    eventData.altitude = position.coords.altitude;
  });
}
```

---

### 6. 📊 Dashboard con KPIs Mejorados

**Nuevos KPIs propuestos**:

```typescript
// GET /api/dashboard/kpis
export interface DashboardKPIs {
  // Existentes
  activeCertifications: number;
  totalProviders: number;
  totalCertifiedPackages: number;
  capacityAlerts: number;

  // Nuevos
  slaCompliance: {
    percentage: number;
    onTime: number;
    delayed: number;
    atRisk: number;
  };

  avgProcessingTime: {
    days: number;
    byPhase: Record<string, number>;
  };

  certificationsByStatus: {
    draft: number;
    inProgress: number;
    approved: number;
    rejected: number;
    expired: number;
  };

  recyclabilityMetrics: {
    average: number;
    excellent: number; // >= 80%
    good: number;      // 60-79%
    regular: number;   // 40-59%
    low: number;       // < 40%
  };

  nfcActivity: {
    totalScans: number;
    scansToday: number;
    uniqueTags: number;
    avgScansPerTag: number;
  };

  topProviders: Array<{
    name: string;
    certifications: number;
    avgScore: number;
  }>;
}
```

---

### 7. 🔍 Búsqueda Avanzada y Filtros

**Mejora Propuesta**:
```typescript
// GET /api/certifications/search
export interface SearchFilters {
  query?: string;              // Búsqueda texto libre
  status?: string[];           // Múltiples estados
  phase?: string[];            // Múltiples fases
  providerId?: string;
  assignedTo?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  scoreRange?: {
    min: number;
    max: number;
  };
  slaStatus?: 'on_time' | 'at_risk' | 'delayed';
  material?: string[];         // Materiales REP
  recyclabilityLevel?: 'excellent' | 'good' | 'regular' | 'low';
  sortBy?: 'createdAt' | 'updatedAt' | 'score' | 'sla';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
```

---

## 📅 Roadmap de Implementación

### Fase 1: Funcionalidad Core (Completado ✅)
- [x] Sistema de autenticación
- [x] 14 roles básicos
- [x] Workflow de 10 fases
- [x] Certificación de embalajes
- [x] Trazabilidad NFC básica
- [x] Métricas ESG

### Fase 2: SLA y Notificaciones (Próximo)
- [ ] Implementar SLA por fase
- [ ] Sistema de notificaciones
- [ ] Dashboard con alertas SLA
- [ ] Emails automáticos
- [ ] **Duración estimada**: 2 semanas

### Fase 3: Mejoras de Trazabilidad (Siguiente)
- [ ] Niveles de embalaje (P/S/T)
- [ ] Modo offline-first
- [ ] Geolocalización en escaneos
- [ ] Mejora de NDEF tags
- [ ] **Duración estimada**: 2 semanas

### Fase 4: Jerarquía y Roles Avanzados
- [ ] Jerarquía de roles
- [ ] Delegación de responsabilidades
- [ ] Dashboards personalizados
- [ ] **Duración estimada**: 1 semana

### Fase 5: Búsqueda y Reportes Avanzados
- [ ] Búsqueda avanzada con filtros
- [ ] Exportaciones mejoradas
- [ ] Reportes personalizables
- [ ] KPIs ampliados
- [ ] **Duración estimada**: 2 semanas

### Fase 6: Integraciones
- [ ] OpenKM para documentos
- [ ] Integración con ERP
- [ ] Balanzas Bluetooth
- [ ] Blockchain (anclaje de hash)
- [ ] **Duración estimada**: 3-4 semanas

---

## 🎯 Prioridades Recomendadas

### Alta Prioridad (Implementar Ya)
1. ✅ **SLA y tiempos** - Crítico para cumplimiento
2. ✅ **Notificaciones** - Mejora UX significativa
3. ✅ **Niveles de embalaje** - Requisito REP

### Media Prioridad (Próximas Semanas)
4. **Modo offline** - Para operaciones en terreno
5. **Jerarquía de roles** - Mejor delegación
6. **Búsqueda avanzada** - Productividad

### Baja Prioridad (Futuro)
7. **Integraciones externas** - Nice to have
8. **Blockchain** - Diferenciador pero no crítico

---

## 💡 Recomendaciones Técnicas

### Performance
- Implementar paginación en todas las listas
- Cache con Redis para queries frecuentes
- Optimizar imágenes (WebP, lazy loading)
- CDN para assets estáticos

### Seguridad
- Rate limiting en endpoints críticos
- Audit log de todas las operaciones
- 2FA para administradores
- Encriptación de documentos sensibles

### Escalabilidad
- Separar API en microservicios (opcional)
- Queue system para operaciones pesadas (Bull/BullMQ)
- Load balancer para múltiples instancias
- Monitoreo con Prometheus + Grafana

---

## 📈 Métricas de Éxito

### KPIs de Implementación
- ✅ Reducción de tiempo de certificación: objetivo -30%
- ✅ Cumplimiento de SLA: objetivo >90%
- ✅ Satisfacción de usuarios: objetivo >4.5/5
- ✅ Uptime del sistema: objetivo >99.5%
- ✅ Reducción de errores manuales: objetivo -80%

---

## 🤝 Siguientes Pasos

1. **Revisar y aprobar** este documento de mejoras
2. **Priorizar** funcionalidades según necesidades del negocio
3. **Crear issues** en GitHub para cada mejora
4. **Asignar recursos** y establecer timeline
5. **Comenzar implementación** por Fase 2 (SLA y Notificaciones)

---

**Última actualización**: 2025-01-10
**Preparado por**: Equipo de Desarrollo SICREP
**Basado en**: Análisis de documentos técnicos y mejores prácticas REP
