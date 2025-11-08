# SICREP - ROLES Y PERMISOS COMPLETOS
## Matriz Actualizada de Responsabilidades

**Versión:** 3.0  
**Fecha:** Noviembre 2025  
**Actualización:** Incluye nuevo rol PROVEEDOR + CPS

---

## NOVEDADES VERSIÓN 3.0

### Nuevos Roles Agregados

**1. PROVEEDOR** (Rol Premium)
- Acceso exclusivo al Módulo NFC de Certificación de Embalajes
- Gestión de catálogo de productos
- Asociación de tags NFC a lotes
- Analytics de validaciones
- Reportes de trazabilidad

**2. CPS (Coordinador de Procesos y Servicios)**
- Rol clave en la fase inicial de evaluación
- Coordinación entre áreas comercial y técnica
- Validación preliminar de documentos
- Seguimiento de SLA
- Gestión de clientes en etapa temprana

### Cambios Importantes

- ✨ **Certificación inicial CPS es EVALUACIÓN**: El CPS ahora gestiona la evaluación preliminar completa antes de asignar al equipo técnico
- ✨ **Proveedor certificado puede certificar productos**: Módulo NFC permite certificación a nivel producto
- ✨ **Nuevos permisos de validación**: Clientes pueden validar productos con NFC
- ✨ **Dashboard personalizado por rol**: Cada rol tiene vista específica optimizada

---

## TABLA DE CONTENIDOS

1. [Jerarquía de Roles Actualizada](#jerarquia)
2. [Nuevos Roles: PROVEEDOR y CPS](#nuevos-roles)
3. [Matriz de Permisos Completa](#matriz-permisos)
4. [Funciones Detalladas por Rol](#funciones-detalladas)
5. [Workflows Actualizados](#workflows)
6. [Dashboards Personalizados](#dashboards)
7. [Comparativa de Roles](#comparativa)

---

<a name="jerarquia"></a>
## 1. JERARQUÍA DE ROLES ACTUALIZADA

```
                    SUPER_ADMIN
                         │
            ┌────────────┴────────────┐
            │                          │
      GERENTE_GENERAL          GERENTE_TECNICO
            │                          │
    ┌───────┴───────┐          ┌──────┴──────┐
    │               │          │              │
MANAGER_COMERCIAL  MANAGER_OPERACIONES  JEFE_TECNICO
    │               │                         │
    │          ┌────┴────┐              ┌────┴────┐
    │          │         │              │         │
VENDEDOR    AUDITOR  EVALUADOR   ANALISTA   MIEMBRO_COMITE
    │                  │                         │
    │              ┌───┴───┐                     │
    │              │       │                     │
   CPS        CLIENTE   PROVEEDOR           VIEWER
    │
    └─────[NUEVO ROL COORDINACIÓN]
```

**Cambios en la Jerarquía:**
1. **CPS** ahora reporta a Vendedor pero tiene funciones técnicas
2. **PROVEEDOR** es un rol especial: Cliente certificado + permisos extras
3. **VIEWER** ahora puede validar productos con NFC (solo lectura)

---

<a name="nuevos-roles"></a>
## 2. NUEVOS ROLES: PROVEEDOR Y CPS

### 2.1 CPS (Coordinador de Procesos y Servicios)

**Nivel:** 4  
**Descripción:** Rol híbrido entre comercial y técnico. Gestiona la evaluación preliminar completa antes de asignar proyectos al equipo técnico.

```yaml
Responsabilidades Principales:
  - Recibir y validar solicitudes iniciales de certificación
  - Realizar evaluación preliminar documental (40 puntos)
  - Coordinar con cliente para completar documentación
  - Asignar proyectos a evaluadores técnicos
  - Monitorear SLA de fase inicial
  - Primer contacto técnico del cliente

Habilidades Requeridas:
  - Conocimiento de Ley REP y decretos
  - Manejo de documentación legal empresarial
  - Comunicación efectiva con clientes
  - Análisis documental básico
  - Uso de sistemas CRM y ERP

Indicadores de Desempeño (KPIs):
  - Tiempo promedio de evaluación inicial: < 3 días
  - % proyectos con documentación completa: > 90%
  - Satisfacción del cliente en fase inicial: > 4.5/5
  - Proyectos rechazados por documentación: < 10%
```

**Accesos del Sistema:**

```yaml
Módulos:
  ✅ Dashboard CPS (personalizado)
  ✅ Módulo de Clientes (lectura)
  ✅ Módulo de Proyectos (crear, editar fase 1-3)
  ✅ Módulo de Documentos (upload, review, aprobar)
  ✅ Módulo de Evaluación Preliminar
  ✅ Comunicaciones (email, SMS)
  ✅ Reportes CPS
  🚫 Auditorías en terreno
  🚫 Dictamen técnico
  🚫 Comité de certificación
  🚫 Emisión de certificados

Permisos Específicos:
  PROYECTOS:
    - Crear nuevo proyecto desde solicitud
    - Editar: Fase 1 (Solicitud), Fase 2 (Revisión), Fase 3 (Evaluación Preliminar)
    - Ver todos los proyectos en fase inicial (1-3)
    - Asignar a Evaluador (para fase 4+)
    - Rechazar solicitud (con justificación)
    
  DOCUMENTOS:
    - Subir documentos del cliente
    - Revisar y validar documentos
    - Aprobar/Rechazar documentos legales
    - Solicitar documentos faltantes
    - Ver documentos de fase inicial
    
  EVALUACIÓN:
    - Evaluar criterios documentales (40 pts)
    - Completar checklist de cumplimiento
    - Identificar brechas documentales
    - Generar reporte preliminar
    - Recomendar: Continuar/Rechazar/Solicitar info
    
  CLIENTES:
    - Ver perfil completo
    - Actualizar información de contacto
    - Registrar comunicaciones
    - Ver historial de interacciones
```

**Workflow del CPS:**

```
NUEVA SOLICITUD DE CERTIFICACIÓN
        │
        ▼
[1] CPS REVISA SOLICITUD (30 min)
    - Datos básicos completos
    - RUT válido
    - Contacto verificado
        │
        ▼
[2] CPS SOLICITA DOCUMENTOS (1 día)
    - Email con checklist
    - Portal de carga habilitado
    - Plazo: 5 días hábiles
        │
        ▼
[3] CLIENTE SUBE DOCUMENTOS
    - RUT electrónico
    - Certificado vigencia
    - Certificado RETC
    - Certificado SMA
    - Políticas de sostenibilidad
    - Procedimientos operativos
        │
        ▼
[4] CPS VALIDA DOCUMENTOS (2 días)
    - Verificación de vigencia
    - Verificación de autenticidad
    - Completitud
    - Conformidad legal
        │
        ├─ ❌ DOCUMENTOS INCOMPLETOS/INVÁLIDOS
        │   └─ Volver a paso [2]
        │
        ├─ ✅ DOCUMENTOS OK
        │   └─ Continúa ↓
        │
        ▼
[5] CPS REALIZA EVALUACIÓN PRELIMINAR (1-2 días)
    ┌─────────────────────────────────────┐
    │ EVALUACIÓN DOCUMENTAL (40 pts)      │
    │                                     │
    │ Documentos Legales (10 pts):        │
    │  ☑ RUT vigente: 2 pts              │
    │  ☑ Cert. vigencia: 2 pts           │
    │  ☑ Cert. RETC: 3 pts               │
    │  ☑ Cert. SMA: 3 pts                │
    │                                     │
    │ Procedimientos Operativos (10 pts): │
    │  ☑ POE información: 4 pts          │
    │  ☑ Plantilla reporte: 2 pts        │
    │  ☑ Plan manejo: 2 pts              │
    │  ☑ Registros capacitación: 2 pts   │
    │                                     │
    │ Trazabilidad Información (10 pts):  │
    │  ☑ Sistema trazabilidad: 5 pts     │
    │  ☑ Registros digitales: 3 pts      │
    │  ☑ Integración RETC: 2 pts         │
    │                                     │
    │ Política Sostenibilidad (10 pts):   │
    │  ☑ Política documentada: 4 pts     │
    │  ☑ Metas cuantificables: 3 pts     │
    │  ☑ Revisión periódica: 3 pts       │
    └─────────────────────────────────────┘
        │
        ▼
[6] RESULTADO EVALUACIÓN PRELIMINAR
    │
    ├─ ❌ SCORE < 28 pts (70%)
    │   └─ CPS RECHAZA SOLICITUD
    │       - Notifica al cliente
    │       - Explica motivos
    │       - Ofrece asesoría (opcional)
    │
    ├─ ⚠️ SCORE 28-32 pts (70-80%)
    │   └─ CPS SOLICITA MEJORAS
    │       - Identifica brechas
    │       - Plazo: 10 días
    │       - Re-evaluación
    │
    └─ ✅ SCORE ≥ 32 pts (80%)
        └─ CPS APRUEBA PARA CONTINUAR
            │
            ▼
[7] CPS ASIGNA A EVALUADOR TÉCNICO
    - Selecciona evaluador disponible
    - Transfiere documentación
    - Notifica al cliente
    - Proyecto pasa a Fase 4 (Visita Terreno)
            │
            ▼
    EVALUADOR TOMA EL CASO
```

**Dashboard del CPS:**

```yaml
Widgets:

1. Mis Proyectos en Evaluación:
   - Total en fase 1-3: 12 proyectos
   - Pendientes de documentos: 5
   - En evaluación: 4
   - Listos para asignar: 3
   - [Gráfico de embudo]

2. SLA Monitor:
   - En tiempo: 9 (75%) ✅
   - En riesgo: 2 (17%) ⚠️
   - Atrasados: 1 (8%) ❌
   - Tiempo promedio: 2.5 días

3. Documentos Pendientes:
   - Empresa ABC: RUT + RETC (vence en 2 días)
   - Empresa XYZ: Plan de manejo (vence hoy)
   - Empresa 123: Certificado vigencia
   - [Ordenado por urgencia]

4. Estadísticas del Mes:
   - Solicitudes recibidas: 28
   - Aprobadas para continuar: 22 (79%)
   - Rechazadas: 3 (11%)
   - En proceso: 3 (11%)
   - Tiempo promedio evaluación: 2.8 días

5. Próximas Acciones:
   - [Hoy 14:00] Reunión con Empresa ABC (aclarar documentos)
   - [Mañana] Vencimiento documentos Empresa XYZ
   - [Jueves] Asignar 5 proyectos a evaluadores

6. Alertas:
   🔴 Empresa ABC sin respuesta hace 5 días
   ⚠️ Proyecto PROJ-2025-045 cerca de vencer SLA
   ✅ Empresa XYZ completó documentos
```

---

### 2.2 PROVEEDOR (Rol Premium)

**Nivel:** Especial (Cliente certificado + permisos extra)  
**Descripción:** Cliente certificado por SICREP que tiene acceso al Módulo NFC para certificar sus productos individuales.

```yaml
Requisitos para ser Proveedor:
  - Certificado SICREP vigente (Verde o Amarillo)
  - Sin sanciones SMA en últimos 12 meses
  - Certificado RETC actualizado
  - Producción de embalajes/envases REP
  - Solicitar activación del Módulo Proveedor

Beneficios:
  - Certificación de productos individuales con NFC
  - Trazabilidad completa de lotes
  - Analytics de validaciones
  - API de integración con ERP
  - Reportes de cumplimiento automáticos
  - Badge "Proveedor Certificado SICREP" para marketing

Costos:
  - Activación: Gratis
  - Uso del portal: Gratis
  - Tags NFC: Desde $350 CLP/unidad
  - Integración API: Desde $500,000 CLP (opcional)
```

**Accesos del Sistema:**

```yaml
Módulos:
  ✅ Dashboard Proveedor (especializado)
  ✅ Portal del Proveedor (completo)
  ✅ Catálogo de Productos
  ✅ Gestión de Lotes
  ✅ Asociación de Tags NFC
  ✅ Analytics de Validaciones
  ✅ Reportes de Trazabilidad
  ✅ API de Proveedor
  ✅ Mis Certificados (renovación)
  🚫 Proyectos de otros clientes
  🚫 Información de otros proveedores
  🚫 Configuración global del sistema

Permisos Específicos:

  PRODUCTOS:
    - Crear productos en catálogo
    - Editar/eliminar productos propios
    - Subir imágenes de productos
    - Definir composición (% reciclado)
    - Asociar certificaciones adicionales
    
  LOTES:
    - Crear lotes de producción
    - Asociar lotes a productos
    - Registrar materiales usados
    - Subir documentación de lote
    - Cerrar lotes completados
    - Exportar trazabilidad
    
  TAGS NFC:
    - Comprar tags NFC
    - Asociar tags a lotes (manual/API)
    - Ver estado de cada tag
    - Desactivar tags (producto dañado)
    - Exportar lista de tags
    
  VALIDACIONES:
    - Ver validaciones en tiempo real
    - Analytics de validaciones (dashboards)
    - Filtrar por producto/fecha/región
    - Exportar reportes de validaciones
    - Configurar webhooks
    
  API:
    - Generar API keys
    - Ver documentación API
    - Monitorear uso de API
    - Configurar rate limits
    
  CERTIFICADO:
    - Ver certificado vigente
    - Descargar certificado PDF
    - Iniciar renovación
    - Ver historial de certificaciones
```

**Dashboard del Proveedor:**

```yaml
Widgets:

1. Estado de Certificación:
   ┌─────────────────────────────────┐
   │ ✅ CERTIFICACIÓN VIGENTE         │
   │                                  │
   │ Categoría: Verde (92/100 pts)   │
   │ Válido hasta: 06 Nov 2026       │
   │ Días restantes: 365             │
   │                                  │
   │ [Descargar Certificado]         │
   │ [Renovar Ahora]                 │
   └─────────────────────────────────┘

2. Productos Certificados:
   - SKUs en catálogo: 24
   - Lotes activos: 8
   - Tags asociados (mes): 45,230
   - Tags disponibles: 12,450
   - [Comprar más Tags]

3. Validaciones del Mes:
   ┌─────────────────────────────────┐
   │ 15,847 validaciones             │
   │ ↑ +23% vs mes anterior          │
   │                                  │
   │ [Gráfico línea temporal]        │
   │                                  │
   │ Pico: 1,234 (06 Nov, 14:00)     │
   │ Valle: 89 (12 Nov, 02:00)       │
   └─────────────────────────────────┘

4. Top 5 Productos:
   CAJ-CART-100L-80R  ▓▓▓▓▓▓▓▓▓▓ 5,234 (33%)
   SAC-PLAS-50KG-60R  ▓▓▓▓▓▓▓░░░ 3,456 (22%)
   BID-PET-20L-50R    ▓▓▓▓▓░░░░░ 2,890 (18%)
   PAL-MAD-120-100R   ▓▓▓▓░░░░░░ 2,123 (13%)
   FILM-PE-500M-30R   ▓▓▓▓░░░░░░ 2,144 (14%)

5. Mapa de Validaciones:
   [Mapa interactivo de Chile]
   - Marcadores por región
   - Intensidad de color por volumen
   - Click → Detalle de validaciones

6. Lotes en Producción:
   LOT-2025-11-001  [████████████] 100% ✅
   LOT-2025-11-002  [████████░░░░]  62% 🕐
   LOT-2025-11-003  [███░░░░░░░░░]  25% 🕐
   
7. Alertas:
   🔔 Lote LOT-2025-10-045 casi agotado (150 tags)
   ⚠️ Certificado vence en 30 días - Iniciar renovación
   ✅ Nuevo cliente validó 500 productos (Empresa XYZ)

8. Acciones Rápidas:
   [+ Nuevo Lote]  [📦 Catálogo]  [🏷️ Tags]  [📊 Reportes]
```

**Flujo Típico del Proveedor:**

```
PROVEEDOR CERTIFICADO ACTIVA MÓDULO
        │
        ▼
[1] CONFIGURAR CATÁLOGO (1-2 días)
    - Agregar productos (SKUs)
    - Subir imágenes
    - Definir composición
    - Asociar certificaciones
        │
        ▼
[2] COMPRAR TAGS NFC
    - Solicitar paquete (1,000-50,000 tags)
    - Pagar por transferencia/tarjeta
    - Recibir en 3-5 días hábiles
        │
        ▼
[3] CREAR LOTE DE PRODUCCIÓN
    - Seleccionar producto (SKU)
    - Definir cantidad
    - Registrar fechas
    - Documentar materiales
    - Sistema registra en blockchain
        │
        ▼
[4] ASOCIAR TAGS A LOTE
    │
    ├─ OPCIÓN A: Manual (App Móvil)
    │   - Operario escanea cada tag
    │   - ~10-15 tags/minuto
    │
    ├─ OPCIÓN B: CSV (Portal Web)
    │   - Subir archivo con UIDs
    │   - ~100-200 tags/minuto
    │
    └─ OPCIÓN C: API (Automatizado)
        - Integración con MES/ERP
        - ~1,000+ tags/minuto
        │
        ▼
[5] APLICAR TAGS EN PRODUCTOS
    - Operarios pegan tags físicamente
    - En ubicaciones estratégicas
    - Productos salen de planta
        │
        ▼
[6] MONITOREAR VALIDACIONES
    - Ver en tiempo real
    - Dashboard actualizado
    - Recibir webhooks
    - Exportar reportes
        │
        ▼
[7] GESTIÓN CONTINUA
    - Crear nuevos lotes
    - Comprar más tags
    - Responder consultas
    - Renovar certificado anualmente
```

---

<a name="matriz-permisos"></a>
## 3. MATRIZ DE PERMISOS COMPLETA

```
Leyenda:
✅ = Acceso completo (C-R-U-D)
📖 = Solo lectura (R)
✏️ = Crear y Editar (C-U)
🚫 = Sin acceso

                    │ SA │ GG │ GT │ MC │ MO │ JT │ AU │ EV │ AN │ VE │ CP │ CM │ PR │ CL │ VW │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
CLIENTES            │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ ✏️ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Leer            │ ✅ │ ✅ │ 📖 │ ✅ │ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │ ✅ │ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │
  - Editar          │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ ✏️ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Eliminar        │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
PROYECTOS           │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ ✏️ │ ✏️ │ 🚫 │ 🚫 │ ✅ │ 🚫 │
  - Leer            │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 📖 │ 📖 │ ✅ │ 📖 │ ✅ │ 📖 │
  - Editar Fase 1-3 │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✏️ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Editar Fase 4+  │ ✅ │ ✅ │ ✅ │ 🚫 │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │
  - Avanzar Fase    │ ✅ │ ✅ │ ✅ │ 🚫 │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✏️ │ ✅ │ 🚫 │ 🚫 │ 🚫 │
  - Eliminar        │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
MÓDULO PROVEEDOR    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Activar módulo  │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✏️ │ 🚫 │ 🚫 │
  - Catálogo        │ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 📖 │
  - Crear lotes     │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │
  - Asociar tags NFC│ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │
  - Ver validaciones│ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 📖 │ 📖 │
  - API Proveedor   │ 📖 │ 📖 │ 📖 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
VALIDACIÓN NFC      │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Validar producto│ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │
  - Ver trazabilidad│ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
CERTIFICADOS        │    │    │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Leer propios    │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 📖 │ 📖 │ 🚫 │ 🚫 │ ✅ │ ✅ │ ✅ │ 📖 │
  - Renovar         │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✏️ │ ✏️ │ 🚫 │
  - Revocar         │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
```

**Leyenda de abreviaciones:**
- SA = SUPER_ADMIN
- GG = GERENTE_GENERAL
- GT = GERENTE_TECNICO
- MC = MANAGER_COMERCIAL
- MO = MANAGER_OPERACIONES
- JT = JEFE_TECNICO
- AU = AUDITOR
- EV = EVALUADOR
- AN = ANALISTA
- VE = VENDEDOR
- **CP = CPS** *(NUEVO)*
- CM = MIEMBRO_COMITE
- **PR = PROVEEDOR** *(NUEVO)*
- CL = CLIENTE
- VW = VIEWER

---

<a name="funciones-detalladas"></a>
## 4. FUNCIONES DETALLADAS POR ROL

*(Los roles existentes mantienen sus funciones. Aquí solo se detallan los nuevos roles)*

### 4.1 CPS (Coordinador de Procesos y Servicios)

```yaml
Día Típico del CPS:

08:00 - 08:30 | Revisar dashboard
              - Proyectos pendientes
              - Alertas de SLA
              - Nuevas solicitudes
              
08:30 - 10:00 | Gestión de documentos
              - Revisar docs subidos ayer
              - Aprobar/rechazar documentos
              - Solicitar docs faltantes
              - Responder consultas de clientes
              
10:00 - 12:00 | Evaluaciones preliminares
              - Evaluar Proyecto #1 (40 pts)
              - Evaluar Proyecto #2 (40 pts)
              - Identificar brechas
              - Generar reportes
              
12:00 - 13:00 | ALMUERZO

13:00 - 14:30 | Coordinación con equipo
              - Reunión con evaluadores técnicos
              - Asignar proyectos aprobados
              - Resolver casos complejos
              - Actualizar estado de proyectos
              
14:30 - 16:00 | Atención a clientes
              - Llamadas de seguimiento
              - Reuniones virtuales
              - Explicar requisitos
              - Apoyar en documentación
              
16:00 - 17:00 | Seguimiento y reportes
              - Actualizar sistema
              - Generar reportes diarios
              - Coordinar próximas acciones
              - Planificar día siguiente
              
17:00 - 18:00 | Cierre del día
              - Resolver urgencias
              - Responder emails pendientes
              - Dejar todo listo para mañana

Meta Semanal:
- 15-20 evaluaciones preliminares completadas
- 90%+ proyectos con documentación completa
- Tiempo promedio < 3 días por evaluación
- Satisfacción cliente > 4.5/5
```

**Indicadores de Desempeño (KPIs):**

| KPI | Meta | Actual | Estado |
|---|---|---|---|
| Tiempo promedio evaluación | < 3 días | 2.8 días | ✅ |
| Proyectos con docs completos | > 90% | 94% | ✅ |
| Proyectos aprobados | 70-85% | 79% | ✅ |
| Satisfacción cliente | > 4.5/5 | 4.6/5 | ✅ |
| SLA cumplido | > 95% | 92% | ⚠️ |

---

### 4.2 PROVEEDOR

```yaml
Actividades Principales:

CONFIGURACIÓN INICIAL (Primera semana):
  Día 1-2: Configurar catálogo de productos
    - Agregar todos los SKUs
    - Subir imágenes de productos
    - Definir composición (% reciclado)
    - Asociar certificaciones
    
  Día 3: Comprar tags NFC
    - Calcular cantidad necesaria
    - Solicitar paquete en portal
    - Pagar por transferencia/tarjeta
    
  Día 4-5: Capacitación del equipo
    - Ver videos tutoriales
    - Practicar con app móvil
    - Configurar integración (si aplica)
    - Probar asociación de tags

OPERACIÓN DIARIA (Una vez configurado):
  Al iniciar lote de producción:
    - Crear lote en portal (5 min)
    - Registrar materiales y fechas
    - Sistema registra en blockchain
    
  Durante producción:
    - Asociar tags a productos (método elegido)
    - Monitorear progreso en tiempo real
    - Aplicar tags físicamente en productos
    
  Después de producción:
    - Cerrar lote completado
    - Verificar asociaciones
    - Exportar reporte de trazabilidad

MONITOREO CONTINUO:
  Diario:
    - Ver validaciones en dashboard
    - Responder consultas de clientes
    - Resolver alertas
    
  Semanal:
    - Revisar analytics
    - Exportar reportes
    - Planificar compra de más tags
    
  Mensual:
    - Analizar tendencias
    - Reportar a gerencia
    - Optimizar procesos
    
  Anual:
    - Renovar certificado SICREP
    - Revisar contrato
    - Evaluar ROI

Tiempo Invertido:
  Setup inicial: 40 horas (1 semana)
  Operación diaria: 1-2 horas/día
  Monitoreo: 30 min/día
  Reportes mensuales: 2 horas/mes
```

**Casos de Uso del Proveedor:**

**CASO 1: Proveedor Pequeño (< 10,000 uds/mes)**
```yaml
Perfil:
  Empresa: Taller de Cartón Ltda.
  Productos: Cajas de cartón personalizadas
  Volumen: 5,000 cajas/mes
  Empleados: 15

Implementación:
  - Tags: 5,000/mes ($1,600,000)
  - Método: Asociación manual con app móvil
  - Tiempo: 2 horas/día (1 operario)
  - Integración: Sin API (portal web)

Beneficios:
  - Aumento ventas: +15%
  - Premium precio: +10%
  - Menos auditorías: 50%
  - ROI: 3 meses
```

**CASO 2: Proveedor Mediano (10,000-50,000 uds/mes)**
```yaml
Perfil:
  Empresa: Empaques Industriales S.A.
  Productos: Sacos plásticos, cajas, bidones
  Volumen: 30,000 unidades/mes
  Empleados: 50

Implementación:
  - Tags: 30,000/mes ($8,400,000)
  - Método: CSV + Lector USB
  - Tiempo: 4 horas/día (2 operarios)
  - Integración: Parcial (exportación CSV desde ERP)

Beneficios:
  - Aumento ventas: +25%
  - Premium precio: +15%
  - Menos auditorías: 70%
  - ROI: 1-2 meses
```

**CASO 3: Proveedor Grande (> 50,000 uds/mes)**
```yaml
Perfil:
  Empresa: Packaging Solutions Corp.
  Productos: Todo tipo de embalajes
  Volumen: 150,000 unidades/mes
  Empleados: 200

Implementación:
  - Tags: 150,000/mes ($37,500,000)
  - Método: API integrada con MES
  - Tiempo: Automático (sin intervención manual)
  - Integración: Completa (MES + ERP + WMS)

Beneficios:
  - Aumento ventas: +30%
  - Premium precio: +20%
  - Menos auditorías: 90%
  - ROI: < 1 mes
  - Acceso a licitaciones premium
```

---

<a name="workflows"></a>
## 5. WORKFLOWS ACTUALIZADOS

### 5.1 Workflow de Certificación Inicial con CPS

```
CLIENTE SOLICITA CERTIFICACIÓN
        │
        ▼
┌─────────────────────────────────────┐
│ FASE 1: SOLICITUD INICIAL (1 día)   │
│ Responsable: CPS                    │
└─────────────────────────────────────┘
        │
        ├─ CPS revisa solicitud
        ├─ Valida datos básicos
        └─ Habilita portal de carga
        │
        ▼
┌─────────────────────────────────────┐
│ FASE 2: REVISIÓN DOCUMENTAL (2-3d)  │
│ Responsable: CPS                    │
└─────────────────────────────────────┘
        │
        ├─ Cliente sube documentos
        ├─ CPS valida documentos
        │  • RUT
        │  • Certificados
        │  • Políticas
        │  • Procedimientos
        │
        ├─ ❌ Docs incompletos → Volver
        └─ ✅ Docs OK → Continuar
        │
        ▼
┌─────────────────────────────────────┐
│ FASE 3: EVALUACIÓN PRELIMINAR (2d)  │
│ Responsable: CPS ⭐ NUEVO            │
└─────────────────────────────────────┘
        │
        ├─ CPS evalúa 40 puntos:
        │  • Documentos legales (10)
        │  • Procedimientos (10)
        │  • Trazabilidad (10)
        │  • Política sostenibilidad (10)
        │
        ├─ Score < 28 pts → ❌ RECHAZADO
        ├─ Score 28-32 → ⚠️ MEJORAS
        └─ Score ≥ 32 → ✅ APROBADO
        │
        ▼
CPS ASIGNA A EVALUADOR TÉCNICO
        │
        ▼
┌─────────────────────────────────────┐
│ FASE 4-10: PROCESO TÉCNICO          │
│ Responsable: Evaluador/Auditor/etc  │
└─────────────────────────────────────┘
        │
        └─ (Flujo estándar existente)
```

**Ventajas del nuevo workflow con CPS:**
1. ✅ Filtro temprano: Solo proyectos viables pasan a evaluadores
2. ✅ Documentación completa: Cliente tiene todo antes de auditoría
3. ✅ Mejor uso de recursos: Evaluadores solo ven casos sólidos
4. ✅ Tiempo reducido: Menos idas y vueltas por documentos
5. ✅ Satisfacción cliente: Proceso más claro y guiado

---

### 5.2 Workflow de Certificación de Productos (Proveedor)

```
PROVEEDOR CERTIFICADO
        │
        ▼
[1] ACTIVAR MÓDULO PROVEEDOR
    - Solicitar en portal
    - Aprobación automática (si certificado vigente)
        │
        ▼
[2] CONFIGURAR CATÁLOGO
    - Agregar productos (SKUs)
    - Subir imágenes
    - Definir composición
        │
        ▼
[3] COMPRAR TAGS NFC
    - Pedir paquete (1,000-50,000)
    - Pagar
    - Recibir en 3-5 días
        │
        ▼
[4] CREAR LOTE DE PRODUCCIÓN
    - Al iniciar fabricación
    - Registrar materiales
    - Sistema → Blockchain
        │
        ▼
[5] ASOCIAR TAGS NFC
    │
    ├─ [A] Manual: App móvil
    ├─ [B] CSV: Portal web
    └─ [C] API: Automático
        │
        ▼
[6] APLICAR TAGS EN PRODUCTOS
    - Operarios pegan físicamente
    - En ubicaciones estratégicas
        │
        ▼
[7] PRODUCTOS SALEN DE PLANTA
        │
        ▼
[8] CLIENTES VALIDAN PRODUCTOS
    - Escanean NFC con smartphone
    - O integración API en su ERP
        │
        ▼
[9] PROVEEDOR MONITOREA
    - Ve validaciones en tiempo real
    - Dashboard actualizado
    - Analytics y reportes
        │
        ▼
[10] CICLO CONTINUO
     - Crear nuevos lotes
     - Monitorear validaciones
     - Renovar certificado anual
```

---

<a name="dashboards"></a>
## 6. DASHBOARDS PERSONALIZADOS

### 6.1 Dashboard del CPS

```yaml
┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD CPS - Coordinador de Procesos                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────┬─────────────┬─────────────┬─────────────────┐
│ Solicitudes │  En Rev.    │  En Eval.   │  Listos para    │
│  Nuevas     │ Documental  │ Preliminar  │  Asignar        │
│             │             │             │                 │
│      3      │      5      │      4      │      3          │
│   ↑ +2     │   ↓ -1      │   → 0       │   ↑ +1          │
└─────────────┴─────────────┴─────────────┴─────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MIS PROYECTOS EN EVALUACIÓN                                  │
├──────────────────────────────────────────────────────────────┤
│ [🕐] PROJ-2025-456 | Empresa ABC S.A.                       │
│      Fase 2 | Documentos: 6/8 ⚠️ | Vence en 2 días          │
│      [Ver Proyecto] [Solicitar Docs]                         │
├──────────────────────────────────────────────────────────────┤
│ [✅] PROJ-2025-457 | Empresa XYZ Ltda.                      │
│      Fase 3 | Score preliminar: 35/40 (88%)                 │
│      [Asignar a Evaluador]                                   │
├──────────────────────────────────────────────────────────────┤
│ [⚠️] PROJ-2025-458 | Empresa 123 SpA                        │
│      Fase 2 | Sin respuesta hace 5 días ❌                  │
│      [Enviar Recordatorio] [Rechazar]                        │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ DOCUMENTOS PENDIENTES DE REVISIÓN                            │
├──────────────────────────────────────────────────────────────┤
│ ● Empresa ABC: RUT + Certificado RETC (vence en 2 días)     │
│ ● Empresa XYZ: Plan de manejo de residuos (vence hoy)       │
│ ● Empresa 123: Certificado vigencia < 30 días               │
│                                                               │
│ [Ordenado por urgencia]                                      │
└──────────────────────────────────────────────────────────────┘

┌───────────────────────┬─────────────────────────────────────┐
│ ESTADÍSTICAS DEL MES  │  TIEMPO PROMEDIO POR FASE           │
│                       │                                     │
│ Solicitudes: 28       │ [Gráfico de barras]                │
│ Aprobadas: 22 (79%)   │                                    │
│ Rechazadas: 3 (11%)   │ Revisión docs: 1.5 días            │
│ En proceso: 3 (11%)   │ Evaluación: 1.3 días               │
│                       │                                     │
│ Tiempo promedio: 2.8d │ Total promedio: 2.8 días           │
└───────────────────────┴─────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PRÓXIMAS ACCIONES                                            │
├──────────────────────────────────────────────────────────────┤
│ [Hoy 14:00] Reunión con Empresa ABC (aclarar documentos)    │
│ [Mañana] Vencimiento documentos Empresa XYZ                  │
│ [Jueves] Asignar 5 proyectos aprobados a evaluadores        │
│ [Viernes] Reunión semanal con equipo técnico                │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ALERTAS Y NOTIFICACIONES                                     │
├──────────────────────────────────────────────────────────────┤
│ 🔴 Empresa ABC sin respuesta hace 5 días                     │
│ ⚠️ Proyecto PROJ-2025-045 cerca de vencer SLA (1 día)       │
│ ✅ Empresa XYZ completó todos los documentos                 │
│ 📊 Reporte semanal disponible para descarga                  │
└──────────────────────────────────────────────────────────────┘
```

---

### 6.2 Dashboard del Proveedor

```yaml
┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD PROVEEDOR - Cartones Sustentables S.A.            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ESTADO DE CERTIFICACIÓN                                      │
│                                                               │
│    ✅ CERTIFICACIÓN VIGENTE                                  │
│                                                               │
│    Categoría: Verde (92/100 pts)                             │
│    Certificado: SICREP-2025-001234                           │
│    Válido hasta: 06 Nov 2026                                 │
│    Días restantes: 365                                       │
│                                                               │
│    [Descargar Certificado PDF]  [Renovar Ahora]             │
└─────────────────────────────────────────────────────────────┘

┌───────────────┬─────────────────┬─────────────────┬─────────┐
│  Productos    │  Lotes Activos  │  Tags Asociados │  Tags   │
│  Certificados │                 │    (Este Mes)   │ Dispon. │
│               │                 │                 │         │
│      24       │        8        │     45,230      │ 12,450  │
│    ↑ +2      │     → 0         │   ↑ +23%        │         │
└───────────────┴─────────────────┴─────────────────┴─────────┘

[Comprar más Tags]

┌─────────────────────────────────────────────────────────────┐
│ VALIDACIONES DEL MES                                         │
│                                                               │
│    15,847 validaciones                                       │
│    ↑ +23% vs mes anterior                                    │
│                                                               │
│    [Gráfico de línea temporal últimos 30 días]              │
│                                                               │
│    Pico: 1,234 validaciones (06 Nov, 14:00 hrs)             │
│    Valle: 89 validaciones (12 Nov, 02:00 hrs)               │
│                                                               │
│    Promedio diario: 528 validaciones                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ TOP 5 PRODUCTOS MÁS VALIDADOS                                │
├──────────────────────────────────────────────────────────────┤
│ 1. CAJ-CART-100L-80R    ▓▓▓▓▓▓▓▓▓▓  5,234 (33%)            │
│ 2. SAC-PLAS-50KG-60R    ▓▓▓▓▓▓▓░░░  3,456 (22%)            │
│ 3. BID-PET-20L-50R      ▓▓▓▓▓░░░░░  2,890 (18%)            │
│ 4. PAL-MAD-120-100R     ▓▓▓▓░░░░░░  2,123 (13%)            │
│ 5. FILM-PE-500M-30R     ▓▓▓▓░░░░░░  2,144 (14%)            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MAPA DE VALIDACIONES                                         │
│                                                               │
│    [Mapa interactivo de Chile]                              │
│                                                               │
│    ● RM:    6,234 (39%)                                      │
│    ● V:     2,345 (15%)                                      │
│    ● VIII:  1,890 (12%)                                      │
│    ● X:     1,234 (8%)                                       │
│    ● Otras: 4,144 (26%)                                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ LOTES EN PRODUCCIÓN                                          │
├──────────────────────────────────────────────────────────────┤
│ LOT-2025-11-001  [████████████] 100% ✅ Completado          │
│ CAJ-CART-100L-80R | 5,000/5,000 tags | 1,234 validaciones   │
│                                                               │
│ LOT-2025-11-002  [████████░░░░]  62% 🕐 En progreso         │
│ SAC-PLAS-50KG-60R | 1,850/3,000 tags | 0 validaciones       │
│                                                               │
│ LOT-2025-11-003  [███░░░░░░░░░]  25% 🕐 En progreso         │
│ BID-PET-20L-50R | 500/2,000 tags | 0 validaciones           │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ALERTAS Y NOTIFICACIONES                                     │
├──────────────────────────────────────────────────────────────┤
│ 🔔 Lote LOT-2025-10-045 casi agotado (150 tags restantes)   │
│ ⚠️ Certificado vence en 30 días - Iniciar renovación        │
│ ✅ Nuevo cliente validó 500 productos (Empresa XYZ S.A.)     │
│ 📊 Reporte mensual de noviembre disponible para descarga    │
│ 🎉 ¡Felicitaciones! Superaste las 15,000 validaciones       │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ACCIONES RÁPIDAS                                             │
│                                                               │
│  [+ Nuevo Lote]  [📦 Ver Catálogo]  [🏷️ Asociar Tags]       │
│  [📊 Reportes]   [💰 Comprar Tags]  [⚙️ Configuración]       │
└─────────────────────────────────────────────────────────────┘
```

---

<a name="comparativa"></a>
## 7. COMPARATIVA DE ROLES

### 7.1 CPS vs Vendedor vs Evaluador

| Aspecto | Vendedor | CPS | Evaluador |
|---|---|---|---|
| **Enfoque** | Comercial | Híbrido | Técnico |
| **Objetivo** | Cerrar ventas | Validar viabilidad | Certificar |
| **Fase** | Pre-venta | Fase 1-3 | Fase 4+ |
| **Contacto cliente** | Alto | Medio | Bajo |
| **Conocimiento técnico** | Básico | Intermedio | Avanzado |
| **Evaluación documental** | No | Sí (40 pts) | Sí (completa) |
| **Visita en terreno** | No | No | Sí |
| **KPI principal** | Revenue | Tiempo eval | Calidad cert |

**Flujo de Responsabilidad:**

```
VENDEDOR → CPS → EVALUADOR → AUDITOR → JEFE_TECNICO → COMITÉ
   │        │        │           │            │             │
   │        │        │           │            │             │
  Lead   Docs OK  Eval Prelim  Visita    Dictamen      Aprobación
          40 pts  Terreno     Técnico    Final
```

---

### 7.2 Proveedor vs Cliente Regular

| Aspecto | Cliente Regular | Proveedor Certificado |
|---|---|---|
| **Puede** | | |
| Solicitar certificación | ✅ | ✅ |
| Ver su certificado | ✅ | ✅ |
| Renovar certificado | ✅ | ✅ |
| Acceder Módulo Proveedor | ❌ | ✅ |
| Certificar productos | ❌ | ✅ |
| Asociar tags NFC | ❌ | ✅ |
| Ver validaciones | ❌ | ✅ |
| Analytics avanzados | ❌ | ✅ |
| API de integración | ❌ | ✅ |
| **Costo** | | |
| Certificación | $120K-$300K | $120K-$300K |
| Módulo Proveedor | N/A | Gratis |
| Tags NFC | N/A | $350/unidad |
| **ROI** | | |
| Cumplimiento normativo | ✅ | ✅ |
| Diferenciación | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Premium en precios | - | +10-20% |
| Aumento ventas | - | +15-30% |

---

## 8. MATRIZ DE TRANSICIÓN DE ROLES

### 8.1 ¿Cómo Convertirse en Proveedor?

```yaml
PASO 1: Obtener Certificado SICREP
  - Solicitar certificación estándar
  - Completar proceso de 10 fases
  - Obtener categoría Verde o Amarillo
  - Tiempo: 15-18 días hábiles
  - Costo: $120,000 - $300,000

PASO 2: Activar Módulo Proveedor
  - Login en portal SICREP
  - Ir a "Módulo Proveedor" → "Activar"
  - Completar formulario:
    • Tipo de productos
    • Volumen mensual
    • Plantas de producción
    • Contacto técnico
  - Aprobación automática (si requisitos OK)
  - Tiempo: Inmediato o 24-48 hrs
  - Costo: Gratis

PASO 3: Configurar Sistema
  - Crear catálogo de productos
  - Capacitar equipo
  - Comprar tags NFC
  - Configurar integración (opcional)
  - Tiempo: 1 semana
  - Costo: Desde $350,000 (tags)

PASO 4: Iniciar Operación
  - Crear primer lote
  - Asociar tags
  - Monitorear validaciones
  - Tiempo: Continuo
```

---

### 8.2 ¿Cómo Convertirse en CPS?

```yaml
PASO 1: Requisitos Mínimos
  - Experiencia en atención al cliente: 1+ año
  - Conocimiento de Ley REP y decretos
  - Manejo de documentación legal
  - Habilidades de comunicación
  - Manejo de Excel y sistemas web

PASO 2: Proceso de Selección
  - Postular en portal de empleos SICREP
  - Entrevista con Manager Comercial
  - Entrevista técnica con Gerente Técnico
  - Evaluación de conocimientos REP
  - Tiempo: 2-3 semanas

PASO 3: Capacitación
  - Onboarding general SICREP: 1 semana
  - Capacitación Ley REP: 2 semanas
  - Práctica supervisada: 2 semanas
  - Evaluación final
  - Tiempo total: 5 semanas

PASO 4: Asignación de Rol
  - Alta en sistema como CPS
  - Asignación de primeros casos
  - Seguimiento por Manager
  - Evaluación a 30, 60, 90 días
```

---

## 9. CASOS DE USO PRÁCTICOS

### 9.1 Caso: Nueva Solicitud de Certificación (CPS)

**Escenario:**  
Empresa ABC S.A. (fabricante de cajas) solicita certificación SICREP por primera vez.

**Workflow:**

```
T+0h | Solicitud recibida
     ↓
     CPS Juan revisa dashboard
     → Nueva solicitud PROJ-2025-456
     → Empresa ABC S.A. (RUT: 76.123.456-7)
     
T+1h | CPS valida datos básicos
     ✅ RUT válido en SII
     ✅ Contacto: María González (Gerente Sostenibilidad)
     ✅ Email: contacto@abc.cl
     ✅ Teléfono: +56 2 2345 6789
     → Habilita portal de carga
     → Envía email con instrucciones
     
T+1d | Cliente comienza a subir documentos
     Recibidos:
     ✅ RUT electrónico
     ✅ Certificado vigencia (15 días antiguedad)
     ⚠️ Falta: Certificado RETC
     ⚠️ Falta: Certificado SMA
     ⚠️ Falta: Plan de manejo
     
     → CPS envía recordatorio automático
     
T+2d | Cliente completa documentos
     ✅ Todos los documentos recibidos
     
     → CPS inicia validación
     
T+3d | CPS valida documentos
     ✅ RUT vigente
     ✅ Certificado vigencia OK (< 30 días)
     ✅ Certificado RETC vigente
     ✅ Sin sanciones SMA
     ✅ Plan de manejo completo
     
     → Todos aprobados → Continúa
     
T+4d | CPS realiza evaluación preliminar
     
     Documentos Legales: 10/10 ✅
     Procedimientos: 8/10 ⚠️
       ↳ Falta plantilla reporte envases
     Trazabilidad: 9/10 ⚠️
       ↳ Sistema trazabilidad sin integración RETC
     Política: 10/10 ✅
     
     TOTAL: 37/40 (93%) ✅
     
T+5d | CPS genera reporte y asigna
     → Score: 37/40 - APROBADO
     → Observaciones: 2 mejoras menores
     → Asignar a: Evaluador Carlos Ramírez
     → Notificar cliente
     
     Proyecto pasa a Fase 4 (Visita Terreno)
     
RESULTADO:
✅ Tiempo total: 5 días
✅ Cliente satisfecho
✅ Documentación completa
✅ Evaluador recibe caso sólido
```

---

### 9.2 Caso: Certificación de Lote de Productos (Proveedor)

**Escenario:**  
Cartones Sustentables S.A. (proveedor certificado) produce 5,000 cajas de cartón con 80% reciclado.

**Workflow:**

```
Lunes 08:00 | Inicio de producción
            ↓
            Jefe de planta crea lote en portal:
            - SKU: CAJ-CART-100L-80R
            - Cantidad: 5,000 cajas
            - Fecha inicio: 01 Nov 2025
            - Planta: Santiago - Quilicura
            
            Sistema:
            → Genera ID: LOT-2025-11-001
            → Registra en blockchain: 0x7d3a9f...
            → Habilita asociación de tags
            
Lunes 10:00 | Operario A comienza asociación
            - Abre app SICREP Proveedor en tablet
            - Login y selecciona LOT-2025-11-001
            - Activa modo "Escaneo NFC"
            
            Por cada caja producida:
            1. Caja sale de línea
            2. Operario acerca tablet a tag NFC
            3. App lee UID: 04:E1:23:A2:3D:6F:80
            4. Envía a API SICREP
            5. API valida y asocia: ✅
            6. App vibra + sonido
            7. Operario pega tag en caja
            8. Caja pasa a siguiente estación
            
            Velocidad: ~12 tags/minuto
            
Lunes-Jueves | Producción continua
            → 5,000 tags asociados
            → Progreso visible en portal
            → Alertas si hay errores
            
Viernes 18:00 | Producción completada
              → Jefe cierra lote en portal
              → Sistema verifica: 5,000/5,000 ✅
              → Genera reporte de trazabilidad
              
Lunes siguiente | Primeras validaciones
                Cliente XYZ recibe mercancía
                → Operario escanea tag con smartphone
                → Sistema muestra:
                   ✅ Certificación vigente
                   ✅ 80% reciclado verificado
                   ✅ Producido: 01-05 Nov 2025
                   ✅ Lote: LOT-2025-11-001
                
                → Cliente integra validación en su ERP
                → Proveedor ve validación en dashboard
                → +1 validación registrada
                
RESULTADOS:
✅ 5,000 cajas certificadas individualmente
✅ Trazabilidad completa documentada
✅ Cliente satisfecho (certificación instantánea)
✅ Proveedor monitoreando validaciones
✅ Cumplimiento normativo verificable
```

---

## 10. PRÓXIMAS ACTUALIZACIONES

### En Desarrollo para V4.0 (Q1 2026):

**Nuevos Roles:**
- 🔜 **RECICLADOR**: Rol para empresas recicladoras certificadas
- 🔜 **AUDITOR_SMA**: Auditor gubernamental con acceso de solo lectura
- 🔜 **PARTNER_INTEGRACION**: Empresas que integran SICREP vía API

**Mejoras para Roles Existentes:**
- Dashboard con IA predictiva
- Notificaciones por WhatsApp
- App móvil nativa mejorada
- Flujos de trabajo personalizables
- Integraciones con más ERPs

**Módulos Adicionales:**
- Módulo de Recicladores
- Marketplace de material certificado
- Sistema de créditos REP
- Bolsa de compra-venta de certificados

---

**Documento generado:** Noviembre 2025  
**Versión:** 3.0  
**Próxima revisión:** Febrero 2026  
**Estado:** VIGENTE
