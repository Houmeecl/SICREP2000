# 🔒 Guía de Seguridad - SICREP

## 📋 Índice
1. [Seguridad de Autenticación](#seguridad-de-autenticación)
2. [Configuración de Sesiones](#configuración-de-sesiones)
3. [Validación de Datos](#validación-de-datos)
4. [Prevención de Vulnerabilidades](#prevención-de-vulnerabilidades)
5. [Gestión de Archivos](#gestión-de-archivos)
6. [Checklist de Seguridad](#checklist-de-seguridad)

---

## 🔐 Seguridad de Autenticación

### Hash de Contraseñas

El sistema usa **bcrypt** con factor de coste 10:

```typescript
import bcrypt from 'bcrypt';

// Al crear usuario
const hashedPassword = await bcrypt.hash(password, 10);

// Al validar login
const valid = await bcrypt.compare(password, user.password);
```

### Políticas de Contraseñas

**Recomendaciones para producción:**
- Mínimo 8 caracteres
- Combinación de mayúsculas, minúsculas y números
- Cambio obligatorio en primer login
- Expiración cada 90 días (opcional)

### Sesiones

```typescript
// server/index.ts
session({
  secret: process.env.SESSION_SECRET, // ⚠️ Cambiar en producción
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en prod
    httpOnly: true, // No accesible desde JS
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
})
```

**Acciones al logout:**
- Destrucción de sesión en servidor
- Limpieza de cookies
- Invalidación de queries en caché

---

## 🛡️ Configuración de Sesiones

### Variables Críticas

```env
# ⚠️ CAMBIAR OBLIGATORIAMENTE
SESSION_SECRET=<usar-openssl-rand-base64-32>

# Generar con:
openssl rand -base64 32
```

### Almacenamiento de Sesiones

**Desarrollo**: In-memory (MemoryStore)
**Producción**: Usar Redis o PostgreSQL

```bash
# Opción recomendada: connect-pg-simple
npm install connect-pg-simple
```

```typescript
import session from 'express-session';
import connectPg from 'connect-pg-simple';

const PgStore = connectPg(session);

app.use(session({
  store: new PgStore({
    conString: process.env.DATABASE_URL
  }),
  secret: process.env.SESSION_SECRET,
  // ...
}));
```

---

## ✅ Validación de Datos

### Validación con Zod

Todos los endpoints usan **drizzle-zod** para validación:

```typescript
import { insertUserSchema } from "@shared/schema";

// Valida automáticamente tipos y constraints
const validatedData = insertUserSchema.parse(req.body);
```

### Validación de RUT Chileno

```typescript
// server/utils/rut.ts
export function validateChileanRUT(rut: string): boolean {
  const cleaned = rut.replace(/\./g, '').replace('-', '');
  const rutDigits = cleaned.slice(0, -1);
  const verifier = cleaned.slice(-1).toUpperCase();

  // Cálculo de dígito verificador
  let sum = 0;
  let multiplier = 2;

  for (let i = rutDigits.length - 1; i >= 0; i--) {
    sum += parseInt(rutDigits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedVerifier = 11 - (sum % 11);
  const calculatedVerifier =
    expectedVerifier === 11 ? '0' :
    expectedVerifier === 10 ? 'K' :
    expectedVerifier.toString();

  return calculatedVerifier === verifier;
}
```

### Sanitización de Inputs

```typescript
// Los inputs son sanitizados automáticamente por:
// 1. Zod schemas (tipo y formato)
// 2. Express.json (parse seguro)
// 3. Drizzle ORM (queries parametrizadas)
```

---

## 🚫 Prevención de Vulnerabilidades

### SQL Injection

✅ **Protección Automática** con Drizzle ORM:

```typescript
// ✅ SEGURO - Queries parametrizadas
await db.select()
  .from(users)
  .where(eq(users.username, username));

// ❌ NUNCA hacer esto:
// await db.execute(sql`SELECT * FROM users WHERE username = '${username}'`);
```

### XSS (Cross-Site Scripting)

✅ **Protección en Frontend**:
- React escapa automáticamente JSX
- No usar `dangerouslySetInnerHTML` sin sanitizar
- Validar inputs en formularios

```typescript
// ✅ SEGURO
<div>{userInput}</div>

// ❌ INSEGURO
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Si necesitas HTML, usa DOMPurify
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userInput)
}} />
```

### CSRF (Cross-Site Request Forgery)

**Protección actual:**
- SameSite cookies
- Session secret único

**Mejora recomendada para producción:**

```bash
npm install csurf
```

```typescript
import csrf from 'csurf';
app.use(csrf({ cookie: true }));
```

### Authorization

```typescript
// Middleware de autenticación
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "No autenticado" });
  }
  next();
}

// Middleware de roles
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
}

// Uso:
app.post("/api/users", requireRole('admin'), handler);
```

---

## 📁 Gestión de Archivos

### Configuración de Multer

```typescript
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});
```

### Validación de Archivos

1. **Tipo MIME**: Verificar en `fileFilter`
2. **Tamaño**: Límite de 5MB por archivo
3. **Cantidad**: Máximo 5 archivos simultáneos
4. **Contenido**: Validar que el archivo sea realmente del tipo indicado

```typescript
// Validar que un PDF sea realmente un PDF
import { fromBuffer } from 'file-type';

const fileType = await fromBuffer(file.buffer);
if (fileType?.mime !== 'application/pdf') {
  throw new Error('Archivo corrupto o tipo incorrecto');
}
```

### Almacenamiento Seguro

**Base64 en Database** (actual):
```typescript
// Almacenar como Base64
fileData: file.buffer.toString('base64')

// Recuperar
const buffer = Buffer.from(document.fileData, 'base64');
```

**Recomendación para archivos grandes**: Usar S3 o similar

---

## 📋 Checklist de Seguridad

### Antes de Producción

#### Configuración
- [ ] `NODE_ENV=production`
- [ ] `SESSION_SECRET` único y seguro (32+ chars)
- [ ] `DATABASE_URL` con SSL habilitado
- [ ] Cookies `secure: true` (HTTPS)
- [ ] CORS configurado correctamente

#### Credenciales
- [ ] Cambiar password de `admin`
- [ ] Cambiar passwords de usuarios demo
- [ ] Eliminar usuarios de prueba
- [ ] Verificar que no hay secrets en código

#### Base de Datos
- [ ] Backup configurado
- [ ] SSL/TLS habilitado
- [ ] Firewall configurado
- [ ] Solo IPs autorizadas

#### Aplicación
- [ ] Rate limiting configurado
- [ ] Logs de seguridad habilitados
- [ ] Manejo de errores sin exponer detalles
- [ ] Headers de seguridad configurados

#### Archivos
- [ ] Validación de tipos MIME
- [ ] Límites de tamaño configurados
- [ ] Antivirus en uploads (opcional)
- [ ] Almacenamiento seguro

### Headers de Seguridad Recomendados

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
}));
```

### Rate Limiting

```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Demasiados intentos de login',
});

app.post('/api/auth/login', loginLimiter, loginHandler);
```

---

## 🔍 Auditoría de Seguridad

### Logs de Actividad

El sistema registra todas las acciones en `activity_log`:

```typescript
await storage.createActivity({
  type: "Certificación",
  title: "Certificación aprobada",
  userId: req.session.user.id,
  relatedId: certification.id,
  status: "success"
});
```

### Monitoreo

```sql
-- Intentos de login fallidos
SELECT * FROM activity_log
WHERE type = 'login' AND status = 'error'
ORDER BY created_at DESC
LIMIT 100;

-- Acciones de admin
SELECT * FROM activity_log
WHERE user_id IN (
  SELECT id FROM users WHERE role = 'admin'
)
ORDER BY created_at DESC;
```

---

## 🚨 Respuesta a Incidentes

### En caso de brecha de seguridad:

1. **Contención**
   - Cambiar `SESSION_SECRET` inmediatamente
   - Revocar todas las sesiones activas
   - Cambiar credenciales de base de datos

2. **Investigación**
   - Revisar logs de `activity_log`
   - Identificar punto de entrada
   - Evaluar datos comprometidos

3. **Recuperación**
   - Aplicar parches de seguridad
   - Restaurar desde backup si es necesario
   - Notificar a usuarios afectados

4. **Prevención**
   - Actualizar medidas de seguridad
   - Realizar auditoría completa
   - Documentar el incidente

---

## 📚 Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Drizzle ORM Security](https://orm.drizzle.team/)

---

**Última actualización**: 2025-01-10
**Mantenedor**: Equipo SICREP
