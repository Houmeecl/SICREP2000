# 📋 ANÁLISIS TÉCNICO SICREP - Gap Analysis
## Documentos Analizados (8 Nov 2025)

### Documentación Oficial Recibida:
1. **Manual Técnico Profesional Extendido v1.1**
2. **Modelo de Negocio Completo (1630 líneas)**
3. **Benchmark Report**
4. **HTML Certificador Ley REP**
5. **Certificado REP PDF**

---

## ✅ FLUJO REP OFICIAL (Según Documentación)

### **Flujo Evaluación & Sello SICREP:**
```
Solicitud → Evaluación documental → Auditoría → Comité → Dictamen
```

**Estados finales:** `Apto` | `En Proceso` | `No apto`

### **Flujo Certificación Embalajes <300kg:**
```
1. Onboarding (30 min - 100% digital)
   ├─ Registro empresa (5 min): RUT, documentos RETC, SMA
   ├─ Setup inicial (15 min): CPS automático, fichas técnicas
   └─ Capacitación (10 min): Videos, quiz validación

2. Operación Diaria (5 min por despacho)
   ├─ Preparar despacho con embalajes
   ├─ Escanear código CPS embalajes
   ├─ Sistema calcula peso automático (ISO 1043)
   ├─ Confirmar: Cliente, Fecha, N° Guía
   ├─ Generar QR único + hash blockchain (Polygon)
   ├─ Imprimir etiqueta QR adhesiva
   └─ Minera escanea → valida trazabilidad

3. Validación Minera (1 min)
   └─ App pública escanea QR → muestra certificado

4. Consolidación Anual (2 hrs)
   ├─ Sistema consolida 12 meses
   ├─ Genera pre-declaración RETC formato XML
   ├─ Emite Certificado Anual PDF (sello ECA)
   └─ Cliente declara en SISREP MMA
```

---

## 🔍 RESPUESTA: ¿QUIÉN ASIGNA CPS?

### **Según Especificación Oficial:**

#### ✅ **EL PROVEEDOR CREA EL CPS**
- **Paso 2 Onboarding:** "Sistema genera código único empresa: CPS-[RUT]-001"
- **Cliente define tipos de embalajes:** cartón, plástico, madera
- **Sistema crea fichas técnicas CPS automáticamente**

#### ✅ **ROL "MANAGER/CPS" (Coordinador)**
- **NO crea CPS**, el proveedor lo hace
- **Orquesta proyectos**: gestión SLA, aprobar etiquetas, reportes
- **Es un rol SICREP interno**, no es el que asigna códigos a proveedores

#### ✅ **ROL "EVALUADOR/AUDITOR"**
- **NO asigna CPS**
- **Función:** Revisar documentación, auditoría terreno, calificar matriz, emitir informes
- **Fases:** Evaluación documental (Fase 2) → Auditoría (Fase 3)

---

## ⚠️ GAP ANALYSIS: Implementación Actual vs Especificación

| Componente | Estado Actual | Especificación Oficial | Gap |
|------------|--------------|------------------------|-----|
| **CPS Creation** | ✅ Proveedor crea en `/cps` | ✅ Proveedor crea automático en onboarding | 🟡 Falta onboarding wizard |
| **CPS Auto-generation** | ❌ Manual | ✅ `CPS-[RUT]-001` automático | 🔴 **CRÍTICO** |
| **Workflow 10 Fases** | ⚠️ Solo enum visual | ✅ Estados + transiciones + responsables | 🔴 **BLOQUEANTE** |
| **Evaluador Assignment** | ❌ Sin lógica | ✅ Asignación automática pendientes | 🔴 **CRÍTICO** |
| **Blockchain Traceability** | ❌ No implementado | ✅ Polygon Mumbai hash | 🔴 **CRÍTICO** |
| **QR Generation** | ⚠️ Parcial (NFC UI) | ✅ QR único + PDF validación pública | 🟡 Falta validación pública |
| **Backend Authorization** | ❌ **NINGUNA** | ✅ OAuth2/JWT + RBAC | 🔴 **BLOQUEANTE PRODUCCIÓN** |
| **PDF Reports** | ✅ 3 templates (Certificado, Auditoría, ESG) | ✅ Certificado Anual + validación online | 🟢 **COMPLETO** |
| **Dashboard Metrics** | ✅ UI implementado | ✅ Real-time ESG/CO2/compliance | 🟢 **COMPLETO** |
| **Minera Panel** | ⚠️ Parcial | ✅ KPIs, benchmark, ranking ESG exportables | 🟡 Falta benchmark |
| **Derivación >300kg** | ❌ No implementado | ✅ Bloqueo + export JSON + handoff SG | 🔴 **CRÍTICO** |
| **RETC XML Export** | ❌ No implementado | ✅ Pre-declaración XML MMA formato oficial | 🔴 **CRÍTICO** |

---

## 🎯 MATRIZ DE ROLES OFICIAL

| Rol | Ámbito | Permisos Clave | Implementado |
|-----|--------|----------------|--------------|
| **ADMIN** | Global SICREP | Usuarios/empresas, config, dictámenes, auditoría | ✅ |
| **MANAGER/CPS** | Operación certificación | Orquestar proyectos, crear CPS, aprobar etiquetas | ⚠️ Rol existe, sin funciones |
| **EVALUADOR/AUDITOR** | Evaluación ECA | Revisar docs, auditoría terreno, calificar, informes | ⚠️ UI existe, sin workflow |
| **COMITÉ CERTIFICACIÓN** | Gobernanza | Dictamen final, aprobar/rechazar, observaciones | ⚠️ Rol existe, sin voting |
| **PROVEEDOR** | Portal cliente | CPS, certificar despachos, etiquetas NFC/QR, descargas | ✅ Funcional |
| **CONSUMIDOR INDUSTRIAL** | Recepción/validación | Escanear NFC/QR, ver/descargar PDF (sin edición) | ❌ No implementado |
| **VIEWER MINERA** | Análisis | Panel ESG/huella/reciclabilidad, reportes (sin edición) | ✅ Funcional |
| **ANALISTA** | Insights/BI | Dashboards avanzados, exportar reportes | ⚠️ Rol existe, sin analytics |
| **SOPORTE/DPO** | Soporte & datos | Tickets, revocaciones, retención, privacidad | ❌ No implementado |

---

## 📊 MODELO DE NEGOCIO (Pricing Oficial)

### Planes SaaS para Proveedores <300kg:

| Plan | Rango kg/año | Target | Precio/año | Features |
|------|--------------|--------|-----------|----------|
| **MICRO Express** | 50-100 kg | 800 ferreteras | **280,000 CLP** | 30 QR/mes, dashboard básico, RETC anual |
| **MICRO Plus** | 101-200 kg | 300 distribuidores | **450,000 CLP** | 50 QR/mes, app móvil, analytics, consultora trimestral |
| **PYME Starter** | 201-290 kg | 150 proveedores mineros | **680,000 CLP** | 80 QR/mes, API, adhesión SG, auditoría anual |
| **COMERCIALIZADORA Pro** | Reembalaje | 80 comercializadoras | **1,200,000 CLP** | QR ilimitados, multi-tier, auditorías trimestrales, API ERP |

### Servicios Adicionales:
- **Setup Especializado:** 380,000 CLP (one-time)
- **Consultora Técnica:** 185,000 CLP/hora
- **Auditorías Express:** 450,000 CLP (48hrs)

---

## 🔴 GAPS CRÍTICOS BLOQUEANTES

### 1. **Seguridad Backend (PRIORIDAD 1)**
**Estado:** ❌ Completamente ausente
**Impacto:** Sistema NO apto para producción ni datos reales
**Solución requerida:**
```
- express-session + PostgreSQL store
- Middleware RBAC por rol/empresa
- JWT tokens para API pública validación QR
- Audit logging operaciones críticas
```

### 2. **Workflow de Certificación (PRIORIDAD 2)**
**Estado:** ⚠️ Solo UI mockup, sin lógica backend
**Impacto:** No se pueden certificar proveedores
**Solución requerida:**
```
- Tabla certifications con fases + responsables
- Asignación automática evaluadores
- Transiciones controladas entre fases
- SLA tracking por fase
```

### 3. **Blockchain Traceability (PRIORIDAD 3)**
**Estado:** ❌ No implementado
**Impacto:** No cumple con spec Copper Mark ni Ley REP trazabilidad inmutable
**Solución requerida:**
```
- Web3.js + Ethers.js
- Polygon Mumbai testnet (gas <$0.01)
- Hash inmutable por despacho
- API pública validación QR sin login
```

### 4. **Auto-derivación >300kg (PRIORIDAD 4)**
**Estado:** ❌ No implementado
**Impacto:** Proveedores no saben cuándo deben migrar a Sistema de Gestión
**Solución requerida:**
```
- Alertas 80% umbral
- Bloqueo módulos operativos al superar 300kg
- Export JSON/XML para handoff a ProREP/ReSimple
```

---

## ✅ COMPONENTES YA IMPLEMENTADOS CORRECTAMENTE

1. ✅ **Sistema CPS** - CRUD completo, materiales, pesos
2. ✅ **Despachos** - Tracking anual, validación 300kg
3. ✅ **PDFs Profesionales** - 3 templates con Puppeteer
4. ✅ **Dashboards ESG** - Métricas real-time, CO2, scores
5. ✅ **12 Cuentas Demo** - Todos los roles del sistema
6. ✅ **Schema NFC** - Tablas listas (falta backend APIs)
7. ✅ **Frontend PWA** - React, Tailwind, responsive

---

## 📅 PLAN DE ACCIÓN RECOMENDADO

### **Fase 1: Fundamentos de Seguridad (URGENTE - 3 horas)**
1. Implementar express-session + PostgreSQL store
2. Middleware RBAC protegiendo todas las rutas API
3. Audit logging de operaciones críticas
4. Test con cuentas demo

### **Fase 2: Workflow Certificación (3 horas)**
1. Tabla certifications con 10 fases + responsables
2. Lógica asignación automática evaluadores
3. API transiciones de fase con validación RBAC
4. UI actualización para workflow real

### **Fase 3: Blockchain + QR Público (4 horas)**
1. Integración Polygon Mumbai
2. Hash generation en dispatch creation
3. API pública `/api/validar/{hash}` (sin auth)
4. UI pública escaneo QR (landing page)

### **Fase 4: Auto-derivación >300kg (2 horas)**
1. Alertas automáticas 80% umbral
2. Bloqueo módulos al superar 300kg
3. Export XML RETC format MMA
4. UI derivación + tracking SG

### **Fase 5: Features Avanzadas (opcional)**
- Onboarding wizard 30 min
- App móvil React Native
- Benchmark comparativo mineras
- Marketplace eco-insumos

---

## 💰 VALOR DE NEGOCIO

### Proyección Año 1 (según modelo):
- **Clientes objetivo:** 420 proveedores
- **Ingresos recurrentes:** 252M CLP/año
- **Servicios profesionales:** 28M CLP/año
- **Total ingresos:** 288M CLP/año
- **EBITDA:** 61M CLP (21% margen)

### ROI Cliente Proveedor (150kg/año):
- **Sin SICREP:** Costo 1,710,000 CLP/año (tiempo + consultor + riesgo multa)
- **Con SICREP:** Costo 280,000 CLP - Beneficio +850,000 CLP contratos nuevos
- **ROI Neto:** +1,970,000 CLP (**531% retorno**)

---

## 🎯 PRÓXIMO PASO INMEDIATO

**DECISIÓN CRÍTICA:**

**Opción A: Implementar Fase 1+2 (Seguridad + Workflow) - 6 horas**
- Sistema funcional y seguro
- Workflow certificación operativo
- Listo para clientes reales beta

**Opción B: Solo documentar análisis técnico - 0 horas**
- Mantener sistema sin seguridad
- Continuar con features secundarios
- NO apto para producción

---

**Recomendación:** Ejecutar **Opción A** inmediatamente para tener MVP funcional según especificación oficial y cumplir con Ley REP 20.920.
