# Manual de Usuario - SICREP
## Sistema Integral de Certificación REP

### Introducción
SICREP es una plataforma profesional de certificación REP para cumplimiento ambiental bajo la Ley 20.920 de Chile. Incluye trazabilidad NFC, gestión de certificaciones, métricas ESG y Copper Mark para la industria minera.

---

## Credenciales de Acceso por Rol

### 👤 Roles Administrativos

#### **Administrador General**
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Acceso a:**
  - Dashboard completo
  - Gestión de usuarios y roles
  - Todas las certificaciones
  - Configuración del sistema
  - Métricas ESG y reportes
  - Directorio de proveedores
  - Sistema de trazabilidad NFC/QR

#### **Gerente General**
- **Usuario:** `gerente`
- **Contraseña:** `gerente123`
- **Acceso a:**
  - Dashboard ejecutivo
  - Certificaciones y proveedores
  - Métricas ESG
  - Trazabilidad
  - Directorio de proveedores certificados

#### **Manager de Operaciones**
- **Usuario:** `manager_ops`
- **Contraseña:** `manager123`
- **Acceso a:**
  - Dashboard operacional
  - Certificaciones y embalajes
  - Sistemas CPS
  - Despachos
  - Trazabilidad

---

### 🔍 Roles Técnicos y Evaluación

#### **Evaluador**
- **Usuario:** `evaluador1`
- **Contraseña:** `evaluador123`
- **Acceso a:**
  - Dashboard de evaluación
  - Certificaciones pendientes
  - Sistemas CPS para evaluación
  - Revisión de documentación

#### **Certificador CPS (Certificación de Productos y Servicios)**
- **Usuario:** `cps1`
- **Contraseña:** `cps123`
- **Acceso a:**
  - Dashboard CPS
  - Gestión de sistemas CPS
  - Certificaciones de embalajes
  - Certificaciones activas

#### **Auditor**
- **Usuario:** `auditor1`
- **Contraseña:** `auditor123`
- **Acceso a:**
  - Dashboard de auditoría
  - Certificaciones completas
  - Proveedores certificados
  - Métricas ESG para verificación
  - Sistema de trazabilidad

#### **Analista**
- **Usuario:** `analista1`
- **Contraseña:** `analista123`
- **Acceso a:**
  - Dashboard analítico
  - Métricas ESG detalladas
  - Certificaciones para análisis
  - Trazabilidad y reportes

---

### 🏢 Roles Empresariales

#### **Proveedor Certificado**
- **Usuario:** `proveedor1`
- **Contraseña:** `proveedor123`
- **Acceso a:**
  - Dashboard de proveedor
  - Sus despachos propios
  - Sus certificaciones
  - Validación de QR de sus productos

#### **Cliente Minería (Consumidor Industrial)**
- **Usuario:** `mineria1`
- **Contraseña:** `mineria123`
- **Acceso a:**
  - Dashboard industrial
  - Sus despachos recibidos
  - Métricas ESG de su operación
  - Directorio de proveedores certificados

---

### 👥 Roles de Coordinación

#### **Comité de Evaluación**
- **Usuario:** `comite1`
- **Contraseña:** `comite123`
- **Acceso a:**
  - Dashboard del comité
  - Certificaciones para revisión
  - Directorio de proveedores
  - Métricas ESG

#### **Coordinador**
- **Usuario:** `coordinador1`
- **Contraseña:** `coordinador123`
- **Acceso a:**
  - Dashboard de coordinación
  - Certificaciones asignadas
  - Proveedores
  - Despachos

#### **Supervisor**
- **Usuario:** `supervisor1`
- **Contraseña:** `supervisor123`
- **Acceso a:**
  - Dashboard de supervisión
  - Certificaciones bajo supervisión
  - Proveedores y despachos
  - Trazabilidad completa

---

### 🔧 Roles Operativos

#### **Técnico**
- **Usuario:** `tecnico1`
- **Contraseña:** `tecnico123`
- **Acceso a:**
  - Dashboard técnico
  - Certificaciones técnicas
  - Validación QR/NFC

#### **Inspector**
- **Usuario:** `inspector1`
- **Contraseña:** `inspector123`
- **Acceso a:**
  - Dashboard de inspección
  - Certificaciones para inspección
  - Trazabilidad NFC
  - Validación en campo

---

### 👀 Rol de Solo Lectura

#### **Viewer (Observador)**
- **Usuario:** `viewer1`
- **Contraseña:** `viewer123`
- **Acceso a:**
  - Dashboard básico
  - Directorio de proveedores (solo lectura)
  - Validación de QR/NFC públicos

---

## Funcionalidades Principales

### 1. Sistema de Certificaciones REP
- Gestión completa del ciclo de certificación
- Flujo: Borrador → En Evaluación → Evaluado → Certificado
- Generación automática de PDFs en formato oficial REP
- Asignación de evaluadores y auditores

### 2. Certificación de Embalajes
- Algoritmo de cálculo de peso y reciclabilidad
- Clasificación automática según composición de materiales
- Validación de cumplimiento normativo

### 3. Trazabilidad NFC/QR
- Generación de códigos QR únicos por certificación
- Simulación de lectura NFC
- Landing pública de verificación (PasaporteDigitalREP)
- Blockchain de trazabilidad

### 4. Métricas ESG
- **Huella de carbono real** usando factores de emisión científicos
- **Copper Mark** para minería responsable (32 indicadores)
- Cálculo de emisiones absolutas y evitadas
- Consumo de agua y energía
- Generación de reportes PDF con estándares internacionales

### 5. Gestión de Despachos
- Control de despachos certificados
- **Filtrado por empresa**: cada minera/proveedor solo ve sus propios despachos
- Trazabilidad completa de la cadena de suministro

### 6. Directorio de Proveedores Certificados
- Catálogo público de proveedores certificados
- Filtros por industria y categoría
- Información de contacto y certificaciones vigentes

---

## Arquitectura de Paneles Personalizados

SICREP implementa un **sistema modular de paneles** donde cada usuario puede tener acceso personalizado:

### Paneles Disponibles
- Dashboard
- Certificaciones
- Sistemas CPS
- Proveedores
- Directorio de Proveedores Certificados
- Trazabilidad
- Métricas ESG
- Embalajes
- Despachos
- Gestión de Roles (admin)
- Gestión de Usuarios (admin)
- Validación QR
- Validación NFC

### Configuración
Los administradores pueden crear usuarios con paneles personalizados desde:
**Roles & Usuarios → Crear Usuario → Usar Paneles Personalizados**

---

## Seguridad y Privacidad

### Filtrado de Datos por Rol
- **Mineras y Consumidores**: Solo ven sus propios despachos (filtrado por companyId)
- **Proveedores**: Solo acceden a sus certificaciones y despachos
- **Evaluadores/Auditores**: Acceso según asignaciones
- **Administradores**: Acceso completo

### Autenticación
- Sistema de sesiones seguro
- Contraseñas encriptadas con bcrypt
- Tokens de sesión con expiración

---

## Soporte Técnico

Para soporte o consultas:
- **Email**: soporte@sicrep.cl
- **Teléfono**: +56 2 1234 5678
- **Horario**: Lunes a Viernes, 9:00 - 18:00 hrs

---

## Versión del Sistema

**v3.2.0** - Noviembre 2025
- Sistema de paneles personalizados
- Filtrado de datos por rol
- ESG con cálculos científicos reales
- Copper Mark integrado
- Trazabilidad NFC mejorada

---

**IMPORTANTE**: Este manual contiene credenciales de demostración. En producción, todos los usuarios deben cambiar sus contraseñas tras el primer acceso.

---

© 2025 SICREP - Sistema Integral de Certificación REP | Ley 20.920 - Chile
