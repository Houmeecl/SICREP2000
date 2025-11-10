# 🚀 Guía de Despliegue a Producción - SICREP

## 📋 Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Base de Datos](#configuración-de-base-de-datos)
3. [Variables de Entorno](#variables-de-entorno)
4. [Proceso de Despliegue](#proceso-de-despliegue)
5. [Usuarios y Roles](#usuarios-y-roles)
6. [Seguridad](#seguridad)
7. [Mantenimiento](#mantenimiento)

---

## 📦 Requisitos Previos

### Tecnologías
- **Node.js**: v20.x o superior
- **PostgreSQL**: 15.x o superior (recomendado: Neon.tech)
- **npm**: 10.x o superior

### Servicios Externos
- Base de datos PostgreSQL (Neon.tech recomendado)
- Dominio personalizado (opcional)
- Servicio de email (SendGrid/Resend - opcional)

---

## 🗄️ Configuración de Base de Datos

### 1. Crear Base de Datos en Neon.tech

1. Visita [https://neon.tech](https://neon.tech)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto llamado "SICREP"
4. Copia la **DATABASE_URL** proporcionada

### 2. Configurar Schema

```bash
# Instalar dependencias
npm install

# Sincronizar schema con la base de datos
npm run db:push
```

### 3. Inicializar Datos (Seed)

```bash
# Ejecutar seed para crear usuarios iniciales
npm run seed
```

**Usuarios creados por defecto:**
- **Admin**: `admin` / `admin123`
- **Evaluador**: `evaluador1` / `evaluador123`
- **Auditor**: `auditor1` / `auditor123`
- **Demo Proveedor**: `sicrep@sicrep.cl` / `demo123`
- **CPS**: `cps1` / `cps123`

⚠️ **IMPORTANTE**: Cambiar todas las contraseñas después del primer login en producción.

---

## 🔐 Variables de Entorno

### 1. Copiar archivo de ejemplo

```bash
cp .env.example .env
```

### 2. Configurar variables críticas

```env
# CAMBIAR OBLIGATORIAMENTE
NODE_ENV=production
DATABASE_URL=postgresql://user:password@your-neon-host/database?sslmode=require
SESSION_SECRET=<generar-con-openssl-rand-base64-32>
REPLIT_DEV_DOMAIN=https://tu-dominio.com

# OPCIONAL
SENDGRID_API_KEY=tu-api-key
EMAIL_FROM=noreply@tu-dominio.com
```

### 3. Generar SESSION_SECRET seguro

```bash
openssl rand -base64 32
```

---

## 🚀 Proceso de Despliegue

### Opción A: Despliegue Manual

```bash
# 1. Clonar repositorio
git clone <tu-repo>
cd sicrep

# 2. Instalar dependencias
npm install

# 3. Configurar .env
nano .env  # Editar variables de entorno

# 4. Sincronizar base de datos
npm run db:push

# 5. Inicializar datos (solo primera vez)
npm run seed

# 6. Compilar aplicación
npm run build

# 7. Iniciar en producción
npm start
```

### Opción B: Despliegue con PM2 (Recomendado)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar aplicación
pm2 start dist/index.js --name sicrep

# Configurar inicio automático
pm2 startup
pm2 save

# Monitorear
pm2 logs sicrep
pm2 status
```

### Opción C: Despliegue con Docker

```bash
# Construir imagen
docker build -t sicrep .

# Ejecutar contenedor
docker run -d \
  -p 5000:5000 \
  --env-file .env \
  --name sicrep \
  sicrep
```

---

## 👥 Usuarios y Roles

### Roles Disponibles

El sistema incluye 14 roles según la Ley REP 20.920:

| Rol | Código | Descripción |
|-----|--------|-------------|
| **Administrador** | `admin` | Acceso total al sistema |
| **Gerente General** | `gerente_general` | Supervisión general |
| **Manager Operaciones** | `manager_operaciones` | Gestión operativa |
| **CPS** | `cps` | Certificación de Productos y Servicios |
| **Evaluador** | `evaluador` | Evaluación de certificaciones |
| **Auditor** | `auditor` | Auditoría y cumplimiento |
| **Comité** | `comite` | Revisión de comité técnico |
| **Proveedor** | `proveedor` | Empresas que solicitan certificación |
| **Cliente Minería** | `cliente_mineria` | Clientes del sector minero |
| **Viewer** | `viewer` | Visualización solo lectura |
| **Analista** | `analista` | Análisis ESG y métricas |
| **Coordinador** | `coordinador` | Coordinación de procesos |
| **Técnico** | `tecnico` | Soporte técnico |
| **Inspector** | `inspector` | Inspección en terreno |
| **Supervisor** | `supervisor` | Supervisión operativa |

### Permisos por Rol

Cada rol tiene acceso a paneles específicos definidos en `shared/panel-permissions.ts`:

```typescript
// Ejemplo: Paneles para rol 'proveedor'
proveedor: [
  'dashboard',
  'shipments',
  'certifications',
  'procedimientos',
  'validate-qr'
]
```

### Crear Nuevos Usuarios

**Opción 1: Interfaz Web (Admin)**
1. Login como admin
2. Ir a "Administración" > "Usuarios"
3. Clic en "Nuevo Usuario"
4. Completar formulario y asignar rol

**Opción 2: SQL Directo**

```sql
-- Ejemplo: Crear usuario proveedor
INSERT INTO users (username, password, email, full_name, rut, role, active)
VALUES (
  'nueva_empresa',
  '<hash-bcrypt-de-contraseña>',
  'contacto@empresa.cl',
  'Empresa Nueva S.A.',
  '76.123.456-7',
  'proveedor',
  true
);
```

⚠️ **Nota**: Usar bcrypt para hashear contraseñas:
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('password', 10);
```

---

## 🔒 Seguridad

### Checklist de Seguridad Pre-Producción

- [ ] Cambiar `SESSION_SECRET` a valor único y seguro
- [ ] Cambiar todas las contraseñas por defecto
- [ ] Configurar `NODE_ENV=production`
- [ ] Habilitar cookies seguras (HTTPS)
- [ ] Configurar CORS si es necesario
- [ ] Revisar permisos de archivos subidos
- [ ] Habilitar rate limiting (opcional)
- [ ] Configurar firewall y SSL/TLS
- [ ] Realizar backup de base de datos

### Configuración de Sesiones

En producción, las sesiones usan:
- **httpOnly**: true (cookies no accesibles desde JS)
- **secure**: true (solo HTTPS)
- **maxAge**: 24 horas

### Validación de RUT Chileno

El sistema valida automáticamente:
- Formato: `XX.XXX.XXX-X`
- Dígito verificador correcto
- Ver `server/utils/rut.ts`

---

## 🔧 Mantenimiento

### Backup de Base de Datos

```bash
# Backup manual
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restaurar
psql $DATABASE_URL < backup_20250110.sql
```

### Monitoreo

```bash
# Ver logs en tiempo real
pm2 logs sicrep

# Reiniciar aplicación
pm2 restart sicrep

# Ver métricas
pm2 monit
```

### Actualizaciones

```bash
# 1. Backup de base de datos
npm run backup

# 2. Pull cambios
git pull origin main

# 3. Instalar dependencias
npm install

# 4. Sincronizar schema (si cambió)
npm run db:push

# 5. Recompilar
npm run build

# 6. Reiniciar
pm2 restart sicrep
```

---

## 📊 Módulos del Sistema

### Módulos Principales

1. **Certificaciones REP** (`/certifications`)
   - Workflow de 10 fases según Ley 20.920
   - Evaluación por puntajes
   - Generación de certificados PDF

2. **CPS - Certificación de Productos y Servicios** (`/cps`)
   - Catálogo de materiales REP
   - Niveles de reciclabilidad
   - Gestión de inventario

3. **Proveedores** (`/providers`)
   - Registro de empresas
   - Validación de RUT chileno
   - Gestión de capacidad

4. **Embalajes** (`/packaging`)
   - Certificación de embalajes
   - Cálculo de reciclabilidad
   - Componentes de packaging

5. **Despachos** (`/shipments`)
   - Certificación de despachos
   - Generación de QR/NFC
   - Blockchain hash

6. **Trazabilidad** (`/traceability`)
   - Escaneo NFC
   - Validación blockchain
   - Historial completo

7. **ESG & Copper Mark** (`/esg`)
   - Métricas ambientales
   - Cálculo de huella de carbono
   - Reportes Copper Mark

8. **Informes** (`/reports`)
   - Dashboard gráfico
   - Reportes exportables
   - Métricas consolidadas

### Módulos Públicos (sin login)

- **Solicitar Certificación** (`/solicitar-certificacion`)
- **Auto-evaluación** (`/auto-evaluacion`)
- **Procedimientos** (`/procedimientos`)
- **Validar QR** (`/validate/:code`)
- **Validar NFC** (`/validate-nfc`)

---

## 🧪 Testing

### Testing Manual

```bash
# 1. Verificar login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 2. Verificar API
curl http://localhost:5000/api/dashboard/stats

# 3. Verificar build
npm run build
npm start
```

### Endpoints Críticos

- `GET /api/auth/me` - Usuario actual
- `GET /api/certifications` - Lista certificaciones
- `GET /api/providers` - Lista proveedores
- `POST /api/auth/login` - Login
- `POST /api/certifications` - Nueva certificación

---

## 📞 Soporte

Para soporte técnico:
- **Email**: soporte@sicrep.cl
- **Documentación**: Ver `/procedimientos` en la aplicación
- **Manual**: Ver `/manual` en la aplicación

---

## 📝 Changelog de Producción

### v1.0.0 (2025-01-10)
- ✅ Sistema de autenticación completo
- ✅ 14 roles según Ley REP
- ✅ Workflow de 10 fases
- ✅ Generación de PDF oficiales
- ✅ Trazabilidad NFC/QR
- ✅ Métricas ESG y Copper Mark
- ✅ Solicitud pública de certificación
- ✅ Sistema de paneles modulares

---

**Desarrollado con ❤️ para el cumplimiento de la Ley REP 20.920 en Chile**
