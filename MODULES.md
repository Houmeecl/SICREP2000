# 📦 Documentación de Módulos - SICREP

## 🎯 Visión General

SICREP es un sistema integral de certificación según la **Ley REP 20.920** de Chile, que incluye gestión de certificaciones, trazabilidad NFC/QR, métricas ESG y cumplimiento Copper Mark.

---

## 📋 Módulos Principales

### 1. 🏆 Sistema de Certificaciones (`/certifications`)

**Descripción**: Gestión completa del workflow de certificación REP con 10 fases oficiales.

**Características**:
- Workflow de 10 fases según normativa SICREP
- Sistema de puntajes (Documentales, Operativos, Valor Agregado)
- Asignación de evaluadores y auditores
- Generación automática de códigos de certificación
- Historial completo de workflow
- Generación de certificados oficiales en PDF

**Workflow de Fases**:
1. `solicitud_inicial` - Solicitud y recepción de documentos
2. `revision_documental` - Revisión de documentación presentada
3. `evaluacion_preliminar` - Evaluación inicial de cumplimiento
4. `visita_terreno` - Inspección en instalaciones
5. `analisis_cumplimiento` - Análisis detallado de requisitos
6. `dictamen_tecnico` - Dictamen técnico del evaluador
7. `aprobacion_comite` - Aprobación por comité técnico
8. `emision_certificado` - Emisión del certificado oficial
9. `publicacion` - Publicación en registro público
10. `seguimiento` - Monitoreo continuo post-certificación

**Puntajes**:
- Score Documentales (0-40 puntos)
- Score Operativos (0-40 puntos)
- Score Valor Agregado (0-20 puntos)
- **Total mínimo**: 60 puntos para aprobación

**Endpoints**:
```
GET    /api/certifications              - Listar certificaciones
POST   /api/certifications              - Nueva certificación
GET    /api/certifications/:id          - Detalle de certificación
PATCH  /api/certifications/:id          - Actualizar certificación
POST   /api/certifications/:id/advance  - Avanzar a siguiente fase
GET    /api/certifications/:id/pdf      - Generar PDF oficial
POST   /api/certifications/:id/complete - Completar y generar códigos
GET    /api/certifications/:id/history  - Historial de workflow
```

**Roles con Acceso**: admin, evaluador, auditor, comite, proveedor (limitado)

---

### 2. 📦 Sistema CPS - Certificación de Productos y Servicios (`/cps`)

**Descripción**: Catálogo de productos certificables según materiales REP.

**Materiales REP Soportados**:
- Papel y Cartón
- Plásticos (HDPE, PET, PP, etc.)
- Vidrio
- Metales
- Madera
- Compuestos
- Otros

**Características**:
- Catálogo de productos con códigos únicos
- Porcentaje de reciclabilidad por producto
- Peso y dimensiones
- Estado activo/inactivo
- Búsqueda y filtrado avanzado

**Estructura de Código CPS**:
```
CPS-YYYY-XXX
  |   |   |
  |   |   +-- Secuencia (001-999)
  |   +------ Año
  +---------- Prefijo CPS
```

**Endpoints**:
```
GET    /api/cps      - Listar catálogo CPS
POST   /api/cps      - Crear nuevo CPS
GET    /api/cps/:id  - Detalle de CPS
PATCH  /api/cps/:id  - Actualizar CPS
```

**Roles con Acceso**: admin, manager_operaciones, cps, evaluador

---

### 3. 🏢 Gestión de Proveedores (`/providers`)

**Descripción**: Registro y gestión de empresas proveedoras.

**Características**:
- Validación automática de RUT chileno
- Gestión de capacidad (actual/máxima)
- Estados: normal, warning, critical, suspended
- Vinculación con usuarios del sistema
- Historial de certificaciones

**Validación de RUT**:
- Formato: `XX.XXX.XXX-X`
- Validación de dígito verificador
- Unicidad en el sistema

**Estados de Capacidad**:
- **Normal**: < 80% capacidad
- **Warning**: 80-95% capacidad
- **Critical**: > 95% capacidad
- **Suspended**: Proveedor suspendido

**Endpoints**:
```
GET    /api/providers           - Listar proveedores
POST   /api/providers           - Crear proveedor
GET    /api/providers/:id       - Detalle de proveedor
PATCH  /api/providers/:id       - Actualizar proveedor
GET    /api/providers/me        - Datos del proveedor autenticado
GET    /api/providers/:id/esg-report - Generar reporte ESG
```

**Roles con Acceso**: admin, manager_operaciones, auditor, proveedor (propio)

---

### 4. 📦 Certificación de Embalajes (`/packaging`)

**Descripción**: Certificación de materiales de embalaje con cálculo de reciclabilidad.

**Componentes de Embalaje**:
- Cartón corrugado
- Plástico (stretch, burbujas, bolsas)
- Madera (pallets)
- Straps metálicos
- Esquineros
- Separadores

**Cálculo de Reciclabilidad**:
```typescript
recyclabilityPercent = (recyclableWeight / totalWeight) * 100

Niveles:
- Excelente: ≥ 80%
- Bueno: 60-79%
- Regular: 40-59%
- Bajo: < 40%
```

**Características**:
- Composición detallada por material
- Peso unitario y cantidad
- Cálculo automático de reciclabilidad
- Generación de código de despacho
- QR y blockchain hash

**Endpoints**:
```
POST /api/shipments              - Crear despacho con componentes
GET  /api/shipments/:id          - Detalle de despacho
POST /api/shipments/:id/certify  - Certificar despacho (genera NFC)
```

**Roles con Acceso**: admin, manager_operaciones, proveedor

---

### 5. 🚚 Gestión de Despachos (`/shipments`)

**Descripción**: Certificación y seguimiento de despachos de productos.

**Estados de Despacho**:
- `draft` - Borrador sin certificar
- `certified` - Certificado con NFC/QR
- `in_transit` - En tránsito
- `delivered` - Entregado
- `cancelled` - Cancelado

**Características**:
- Generación automática de código de despacho
- QR Code para validación pública
- NFC Tag al certificar
- Blockchain hash único
- Componentes de embalaje detallados
- Datos de cliente (nombre, RUT)

**Estructura de Código**:
```
DISP-YYYYMMDD-XXXX
  |      |      |
  |      |      +-- Secuencia del día
  |      +--------- Fecha (año, mes, día)
  +---------------- Prefijo DISP (Despacho)
```

**Endpoints**:
```
GET  /api/shipments              - Listar despachos (filtrado por rol)
GET  /api/shipments/:id          - Detalle con componentes
POST /api/shipments              - Crear despacho
POST /api/shipments/:id/certify  - Certificar (genera NFC/QR)
GET  /api/shipments/:id/qr-image - Obtener imagen QR
```

**Roles con Acceso**: admin, manager_operaciones, proveedor, cliente_mineria

---

### 6. 🔗 Sistema de Trazabilidad (`/traceability`)

**Descripción**: Trazabilidad completa con NFC, QR y blockchain.

**Características**:
- Escaneo de tags NFC (NTAG215)
- Validación de códigos QR
- Hash blockchain inmutable
- Historial completo de eventos
- Geolocalización de escaneos
- Metadata JSON por evento

**Tipos de Tags NFC**:
- `certification` - Asociado a certificación REP
- `shipment` - Asociado a despacho
- `product` - Asociado a producto

**Eventos Rastreables**:
- Certificación inicial
- Despacho
- Recepción
- Verificación en terreno
- Entrega final

**Estructura de Blockchain Hash**:
```
0x[64 caracteres hexadecimales]
```

**Endpoints**:
```
GET  /api/nfc-tags                    - Listar tags NFC
GET  /api/nfc-tags/:tagId             - Detalle de tag
POST /api/nfc-tags/:tagId/scan        - Registrar escaneo
GET  /api/certifications/:id/nfc-events - Eventos de certificación
POST /api/nfc-events                  - Crear evento NFC
```

**Validación Pública** (sin autenticación):
```
GET  /validate/:qrCode    - Validar código QR
GET  /validate-nfc        - Interfaz para validar NFC
```

**Roles con Acceso**: Todos (validación pública), admin, inspector, tecnico

---

### 7. 🌱 Métricas ESG y Copper Mark (`/esg`)

**Descripción**: Cálculo de métricas ambientales y cumplimiento Copper Mark.

**Métricas Calculadas**:

1. **Huella de Carbono**
   - Por material y peso
   - Emisiones CO₂eq totales
   - Comparación con baseline

2. **Eficiencia Energética**
   - kWh por tonelada producida
   - Porcentaje de energía renovable

3. **Reciclabilidad**
   - Porcentaje reciclable
   - Porcentaje reciclado post-consumo

4. **Gestión de Residuos**
   - Toneladas de residuos evitados
   - Tasa de desvío de relleno sanitario

**Factores de Emisión** (kg CO₂eq por kg material):
```typescript
const EMISSION_FACTORS = {
  papel_carton: 0.9,
  plasticos: 2.1,
  vidrio: 0.8,
  metales: 1.5,
  madera: 0.3,
  compuestos: 1.8,
  otros: 1.0
};
```

**Copper Mark Scoring**:
- **80-100**: Approved ✅
- **60-79**: Conditional ⚠️
- **< 60**: Not Approved ❌

**Endpoints**:
```
GET  /api/esg-metrics                 - Listar métricas
POST /api/esg-metrics                 - Crear métrica
GET  /api/esg-metrics/aggregated      - Métricas consolidadas
GET  /api/providers/:id/esg-report    - Reporte ESG en PDF
```

**Roles con Acceso**: admin, analista, auditor, gerente_general

---

### 8. 📊 Sistema de Informes (`/reports`)

**Descripción**: Dashboard gráfico con reportes exportables.

**Tipos de Reportes**:
1. **Certificaciones por Estado** (Gráfico de torta)
2. **Tendencia Temporal** (Gráfico de línea)
3. **Top Proveedores** (Gráfico de barras)
4. **Métricas ESG** (Cards y gráficos)
5. **Reciclabilidad Promedio** (Gauge)

**Filtros Disponibles**:
- Rango de fechas
- Estado de certificación
- Proveedor específico
- Material REP
- Fase de workflow

**Exportación**:
- PDF con gráficos
- Excel con datos tabulares
- CSV para análisis externo

**Endpoints**:
```
GET /api/reports/certifications      - Reporte de certificaciones
GET /api/reports/providers           - Reporte de proveedores
GET /api/reports/esg                 - Reporte ESG consolidado
```

**Roles con Acceso**: admin, gerente_general, manager_operaciones, analista

---

### 9. 👥 Gestión de Usuarios y Roles (`/user-management`)

**Descripción**: Administración de usuarios y asignación de roles.

**14 Roles del Sistema**:

| # | Rol | Código | Nivel Acceso |
|---|-----|--------|--------------|
| 1 | Administrador | `admin` | Total |
| 2 | Gerente General | `gerente_general` | Ejecutivo |
| 3 | Manager Operaciones | `manager_operaciones` | Operativo |
| 4 | CPS | `cps` | Especialista |
| 5 | Evaluador | `evaluador` | Certificación |
| 6 | Auditor | `auditor` | Auditoría |
| 7 | Comité | `comite` | Revisión |
| 8 | Proveedor | `proveedor` | Externo |
| 9 | Cliente Minería | `cliente_mineria` | Cliente |
| 10 | Viewer | `viewer` | Lectura |
| 11 | Analista ESG | `analista` | Análisis |
| 12 | Coordinador | `coordinador` | Coordinación |
| 13 | Técnico | `tecnico` | Soporte |
| 14 | Inspector | `inspector` | Inspección |
| 15 | Supervisor | `supervisor` | Supervisión |

**Paneles Personalizados**:
- Cada usuario puede tener paneles custom
- Si no, usa paneles por defecto del rol
- Definidos en `shared/panel-permissions.ts`

**Endpoints**:
```
GET    /api/users           - Listar usuarios (admin)
POST   /api/users           - Crear usuario (admin)
PATCH  /api/users/:id       - Actualizar usuario (admin)
GET    /api/auth/me         - Usuario actual
POST   /api/auth/login      - Login
POST   /api/auth/logout     - Logout
POST   /api/auth/register   - Registro (público)
```

**Roles con Acceso**: admin (gestión), todos (ver propio)

---

### 10. 📝 Solicitudes de Certificación Públicas (`/solicitar-certificacion`)

**Descripción**: Formulario público para empresas que desean certificarse.

**Características**:
- **Sin login requerido** (acceso público)
- Validación de RUT chileno
- Upload de documentos (PDF, JPG, PNG)
- Máximo 5 archivos de 5MB cada uno
- Creación automática de: Proveedor, Usuario, Certificación

**Flujo Automático al Aprobar**:
1. Se crea el **Proveedor** con datos de la empresa
2. Se crea **Usuario** con username basado en RUT
3. Se genera **Contraseña temporal** segura
4. Se crea **Certificación** en fase inicial
5. Se envía **Email** con credenciales (si configurado)

**Documentos Requeridos**:
- Certificado de Inicio de Actividades
- Registro de Marca
- Memoria Técnica
- Plan de Reciclaje
- Otros (opcional)

**Estados de Solicitud**:
- `pending` - Pendiente de revisión
- `reviewing` - En revisión
- `approved` - Aprobada (crea usuario y certificación)
- `rejected` - Rechazada (con motivo)

**Endpoints**:
```
POST /api/public/certification-requests     - Crear solicitud (público)
GET  /api/certification-requests            - Listar (admin)
GET  /api/certification-requests/:id        - Detalle (admin)
POST /api/certification-requests/:id/approve - Aprobar (admin)
POST /api/certification-requests/:id/reject  - Rechazar (admin)
```

**Roles con Acceso**: Público (crear), admin (gestionar)

---

### 11. 📖 Manual y Procedimientos

#### 11.1. Manual del Sistema (`/manual`)

**Descripción**: Guía completa para empresas que desean certificarse.

**Contenido**:
- Introducción a la Ley REP 20.920
- Requisitos de certificación
- Documentación necesaria
- Proceso paso a paso
- Preguntas frecuentes
- Costos y plazos
- Contacto y soporte

**Acceso**: Público y usuarios autenticados

#### 11.2. Procedimientos Operativos (`/procedimientos`)

**Descripción**: Manual técnico para operadores del sistema.

**Secciones**:
1. **Para Solicitantes**: Cómo solicitar certificación
2. **Para Administradores**: Gestión de solicitudes
3. **Workflow de Certificación**: 10 fases detalladas
4. **Roles y Permisos**: Responsabilidades
5. **Trazabilidad**: Uso de NFC/QR
6. **Preguntas Frecuentes**: FAQ técnico

**Acceso**: Público y usuarios autenticados

---

### 12. 🔍 Auto-evaluación (`/auto-evaluacion`)

**Descripción**: Formulario de pre-evaluación para empresas.

**Características**:
- 20 preguntas de evaluación
- Categorías:
  - Requisitos Documentales
  - Capacidad Operativa
  - Gestión Ambiental
- Puntaje automático
- Recomendaciones personalizadas
- Sin login requerido

**Puntaje**:
- 80-100: Excelente, listo para certificar
- 60-79: Bueno, mejorar algunos aspectos
- 40-59: Regular, trabajo adicional requerido
- < 40: Insuficiente, preparación necesaria

**Acceso**: Público

---

## 🔒 Seguridad por Módulo

### Públicos (sin autenticación)
- `/` - Home
- `/login` - Login
- `/solicitar-certificacion` - Solicitud
- `/auto-evaluacion` - Auto-evaluación
- `/procedimientos` - Procedimientos
- `/validate/:code` - Validación QR
- `/validate-nfc` - Validación NFC
- `/manual` - Manual (accesible también autenticado)

### Requieren Autenticación
- `/dashboard` - Dashboard personalizado
- `/certifications` - Certificaciones
- `/cps` - Catálogo CPS
- `/providers` - Proveedores
- `/packaging` - Embalajes
- `/shipments` - Despachos
- `/traceability` - Trazabilidad
- `/esg` - Métricas ESG
- `/reports` - Informes

### Solo Administradores
- `/user-management` - Usuarios
- `/roles` - Roles (solo visualización)
- `/login-settings` - Config. login
- `/admin/solicitudes` - Gestión solicitudes

---

## 📊 Base de Datos

### Tablas Principales

1. **users** - Usuarios del sistema
2. **companies** - Empresas
3. **providers** - Proveedores certificables
4. **cps_catalog** - Catálogo CPS
5. **certifications** - Certificaciones REP
6. **workflow_history** - Historial de workflow
7. **nfc_tags** - Tags NFC registrados
8. **nfc_events** - Eventos de trazabilidad
9. **shipments** - Despachos
10. **packaging_components** - Componentes de embalaje
11. **esg_metrics** - Métricas ESG
12. **activity_log** - Log de actividades
13. **certification_requests** - Solicitudes públicas
14. **certification_documents** - Documentos adjuntos

### Relaciones Clave

```
users ──┐
        ├─→ certifications ──→ workflow_history
providers ──┘                  └─→ nfc_events

providers ──→ shipments ──→ packaging_components

certifications ──→ cps_catalog

users ──→ certification_requests ──→ certification_documents
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Wouter** para routing
- **TanStack Query** para estado servidor
- **Shadcn/UI** componentes
- **Tailwind CSS** estilos
- **Recharts** para gráficos
- **html2canvas** para capturas
- **jsPDF** para PDFs

### Backend
- **Express.js** servidor
- **PostgreSQL** base de datos (Neon)
- **Drizzle ORM** manejo de BD
- **Zod** validación
- **bcrypt** hash de contraseñas
- **express-session** sesiones
- **multer** upload de archivos

### DevOps
- **Vite** build tool
- **esbuild** bundler servidor
- **tsx** TypeScript execution
- **PM2** process manager (producción)

---

## 📈 Roadmap Futuro

### Funcionalidades Planificadas
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Dashboard personalizable por usuario
- [ ] Integración con blockchain real (Ethereum/Polygon)
- [ ] App móvil para escaneo NFC
- [ ] API pública para integraciones
- [ ] Multi-idioma (Español/Inglés)
- [ ] Firma digital de certificados
- [ ] Renovación automática de certificados
- [ ] Integración con servicios de pago
- [ ] Análisis predictivo con IA

---

## 📞 Soporte y Contacto

- **Email**: soporte@sicrep.cl
- **Documentación**: [/manual](/manual)
- **Procedimientos**: [/procedimientos](/procedimientos)
- **GitHub**: [Repositorio del proyecto]

---

**Desarrollado según Ley REP 20.920 - Chile 🇨🇱**
**Última actualización**: 2025-01-10
