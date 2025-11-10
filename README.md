# 🏆 SICREP - Sistema Integral de Certificación REP

![SICREP Logo](client/public/assets/ChatGPT%20Image%203%20nov%202025%2C%2003_29_38%20p.m._1762631913336.png)

**Sistema Profesional de Certificación según Ley REP 20.920 - Chile 🇨🇱**

Plataforma completa de trazabilidad NFC, gestión de cumplimiento ambiental, y métricas ESG con soporte para Copper Mark.

---

## 🌟 Características Principales

### ✅ Certificación REP Completa
- **Workflow de 10 fases** según normativa oficial SICREP
- Sistema de puntajes (Documentales, Operativos, Valor Agregado)
- Generación automática de certificados oficiales en PDF
- Historial completo de auditoría

### 🔗 Trazabilidad Blockchain
- Escaneo de **tags NFC** (NTAG215)
- Generación de **códigos QR** para validación pública
- **Hash blockchain** inmutable por evento
- Registro completo de cadena de custodia

### 🌱 Métricas ESG & Copper Mark
- Cálculo automático de **huella de carbono**
- Métricas de **reciclabilidad** y eficiencia energética
- Reportes **Copper Mark** con scoring
- Informes PDF exportables

### 👥 Sistema de Roles Completo
14 roles según Ley REP:
- Administrador, Gerente General, Manager Operaciones
- CPS, Evaluador, Auditor, Comité
- Proveedor, Cliente Minería, Viewer
- Analista ESG, Coordinador, Técnico, Inspector, Supervisor

### 📦 Gestión de Embalajes
- Certificación de materiales de packaging
- Cálculo automático de reciclabilidad
- Componentes detallados (cartón, plástico, madera, etc.)
- Códigos QR para validación en despachos

### 📊 Dashboard Personalizado
- Paneles modulares por rol
- Gráficos interactivos (Recharts)
- Informes exportables (PDF, Excel, CSV)
- Métricas en tiempo real

---

## 🚀 Quick Start

### Requisitos
- Node.js 20.x+
- PostgreSQL 15.x+ (recomendado: [Neon.tech](https://neon.tech))
- npm 10.x+

### Instalación

```bash
# 1. Clonar repositorio
git clone <tu-repo>
cd sicrep

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Sincronizar base de datos
npm run db:push

# 5. Inicializar datos (usuarios demo)
npm run seed

# 6. Iniciar en desarrollo
npm run dev
```

**Usuarios de prueba creados:**
- `admin` / `admin123` (Administrador)
- `sicrep@sicrep.cl` / `demo123` (Proveedor demo)
- `evaluador1` / `evaluador123` (Evaluador)
- `auditor1` / `auditor123` (Auditor)
- `cps1` / `cps123` (Especialista CPS)

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [DEPLOYMENT.md](DEPLOYMENT.md) | Guía completa de despliegue a producción |
| [SECURITY.md](SECURITY.md) | Guía de seguridad y mejores prácticas |
| [MODULES.md](MODULES.md) | Documentación detallada de todos los módulos |
| [.env.example](.env.example) | Variables de entorno necesarias |

### Documentación In-App
- `/procedimientos` - Manual de procedimientos operativos
- `/manual` - Guía para empresas solicitantes
- `/auto-evaluacion` - Formulario de pre-evaluación

---

## 🏗️ Arquitectura

### Stack Tecnológico

**Frontend**
- React 18 + TypeScript
- Wouter (routing)
- TanStack Query (estado servidor)
- Shadcn/UI + Tailwind CSS
- Recharts (gráficos)

**Backend**
- Express.js + TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- Zod (validación)
- bcrypt (seguridad)

**Herramientas**
- Vite (build)
- esbuild (bundler)
- PM2 (producción)

### Estructura del Proyecto

```
sicrep/
├── client/
│   └── src/
│       ├── pages/          # Páginas de la aplicación
│       ├── components/     # Componentes reutilizables
│       ├── lib/            # Utilidades (auth, queryClient)
│       └── hooks/          # Custom hooks
├── server/
│   ├── routes.ts           # Rutas API REST
│   ├── storage.ts          # Capa de datos
│   ├── db.ts               # Configuración Drizzle
│   └── services/           # Servicios (emails, certificaciones)
├── shared/
│   ├── schema.ts           # Schema de base de datos
│   └── panel-permissions.ts # Permisos por rol
└── docs/
    ├── DEPLOYMENT.md       # Guía de despliegue
    ├── SECURITY.md         # Guía de seguridad
    └── MODULES.md          # Documentación de módulos
```

---

## 📦 Módulos del Sistema

### 🎯 Módulos Principales

1. **Certificaciones REP** (`/certifications`)
   - Workflow completo de 10 fases
   - Evaluación por puntajes
   - Generación de PDFs oficiales

2. **CPS** (`/cps`)
   - Catálogo de productos certificables
   - Materiales REP soportados
   - Niveles de reciclabilidad

3. **Proveedores** (`/providers`)
   - Registro y gestión de empresas
   - Validación de RUT chileno
   - Directorio público de certificados

4. **Embalajes** (`/packaging`)
   - Certificación de materiales
   - Cálculo de reciclabilidad
   - Generación de QR/NFC

5. **Despachos** (`/shipments`)
   - Gestión de envíos certificados
   - Trazabilidad completa
   - Validación pública

6. **Trazabilidad** (`/traceability`)
   - Escaneo NFC/QR
   - Blockchain inmutable
   - Historial de eventos

7. **ESG & Copper Mark** (`/esg`)
   - Métricas ambientales
   - Huella de carbono
   - Reportes Copper Mark

8. **Informes** (`/reports`)
   - Dashboard gráfico
   - Exportación PDF/Excel
   - Métricas consolidadas

### 🌐 Módulos Públicos (sin login)

- **Solicitar Certificación** (`/solicitar-certificacion`)
- **Auto-evaluación** (`/auto-evaluacion`)
- **Validar QR** (`/validate/:code`)
- **Validar NFC** (`/validate-nfc`)
- **Procedimientos** (`/procedimientos`)
- **Manual** (`/manual`)

---

## 🔒 Seguridad

### Características de Seguridad

✅ **Autenticación y Sesiones**
- Hash bcrypt (factor 10) para contraseñas
- Sesiones seguras con express-session
- Cookies httpOnly y sameSite

✅ **Validación de Datos**
- Validación con Zod en todos los endpoints
- Validación de RUT chileno con dígito verificador
- Sanitización automática de inputs

✅ **Prevención de Vulnerabilidades**
- Queries parametrizadas (Drizzle ORM)
- Protección XSS en React
- CORS configurado
- Rate limiting recomendado

✅ **Gestión de Archivos**
- Validación de tipo MIME
- Límite de tamaño (5MB por archivo)
- Máximo 5 archivos simultáneos
- Solo PDF, JPG, PNG permitidos

### Checklist Pre-Producción

```bash
# 1. Generar SESSION_SECRET seguro
openssl rand -base64 32

# 2. Configurar .env
NODE_ENV=production
SESSION_SECRET=<tu-secret-generado>
DATABASE_URL=<tu-neon-database-url>

# 3. Cambiar contraseñas por defecto
# Ver DEPLOYMENT.md para más detalles
```

---

## 🧪 Testing

```bash
# Build de producción
npm run build

# Iniciar en producción
npm start

# Verificar endpoints
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 🚀 Despliegue a Producción

### Opción 1: PM2 (Recomendado)

```bash
# Build
npm run build

# Iniciar con PM2
pm2 start dist/index.js --name sicrep

# Configurar auto-inicio
pm2 startup
pm2 save

# Monitorear
pm2 logs sicrep
pm2 monit
```

### Opción 2: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
docker build -t sicrep .
docker run -d -p 5000:5000 --env-file .env sicrep
```

**Ver [DEPLOYMENT.md](DEPLOYMENT.md) para guía completa.**

---

## 📊 Base de Datos

### Schema Principal

- **users** - Usuarios del sistema
- **providers** - Proveedores certificables
- **certifications** - Certificaciones REP
- **cps_catalog** - Catálogo de productos
- **shipments** - Despachos certificados
- **nfc_tags** - Tags NFC registrados
- **nfc_events** - Eventos de trazabilidad
- **esg_metrics** - Métricas ambientales
- **certification_requests** - Solicitudes públicas

### Migrations

```bash
# Sincronizar schema
npm run db:push

# Inicializar datos
npm run seed
```

---

## 🤝 Contribuir

### Reportar Issues
1. Verificar que el issue no existe
2. Proveer descripción detallada
3. Incluir pasos para reproducir
4. Adjuntar logs si es posible

### Pull Requests
1. Fork del repositorio
2. Crear branch feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

## 📝 Changelog

### v1.0.0 (2025-01-10)

**Características Iniciales**
- ✅ Sistema completo de autenticación
- ✅ 14 roles según Ley REP 20.920
- ✅ Workflow de certificación (10 fases)
- ✅ Trazabilidad NFC/QR/Blockchain
- ✅ Métricas ESG y Copper Mark
- ✅ Certificación de embalajes
- ✅ Gestión de despachos
- ✅ Solicitud pública de certificación
- ✅ Dashboard personalizado por rol
- ✅ Generación de PDFs oficiales
- ✅ Validación de RUT chileno
- ✅ Sistema de paneles modulares
- ✅ Documentación completa

---

## 📜 Licencia

Este proyecto está desarrollado para cumplimiento de la **Ley REP 20.920** en Chile.

---

## 📞 Soporte y Contacto

- **Email**: soporte@sicrep.cl
- **Documentación**: Ver `/manual` en la aplicación
- **Procedimientos**: Ver `/procedimientos` en la aplicación
- **GitHub Issues**: [Reportar problema]

---

## 🙏 Agradecimientos

Desarrollado según la normativa de la **Ley REP 20.920** de Chile para la gestión de residuos de envases y embalajes.

Con el objetivo de promover la **economía circular** y el **cumplimiento ambiental** en la industria chilena.

---

**Hecho con ❤️ en Chile 🇨🇱**

**Última actualización**: 2025-01-10
