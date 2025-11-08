# SICREP - MANUAL TÉCNICO COMPLETO
## Sistema Integral de Certificación REP

**Versión:** 2.0 Enterprise  
**Fecha:** Noviembre 2025  
**Tecnología:** Java Spring Boot + Next.js 14  
**Autor:** Equipo Técnico SICREP

---

## TABLA DE CONTENIDOS

1. [Arquitectura del Sistema](#arquitectura)
2. [Stack Tecnológico](#stack)
3. [Módulos del Sistema](#modulos)
4. [Base de Datos](#database)
5. [APIs y Endpoints](#apis)
6. [Seguridad](#seguridad)
7. [Despliegue](#despliegue)
8. [Monitoreo](#monitoreo)
9. [Troubleshooting](#troubleshooting)

---

<a name="arquitectura"></a>
## 1. ARQUITECTURA DEL SISTEMA

### 1.1 Arquitectura General

SICREP utiliza una arquitectura de microservicios cloud-native con los siguientes componentes:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Portal     │  │   Dashboard  │  │   Mobile     │      │
│  │   Público    │  │   Empresarial│  │   App        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           Next.js 14 + React + TypeScript                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    API GATEWAY LAYER                         │
│              Nginx + Load Balancer + Rate Limiting           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  MICROSERVICES LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Business   │  │   Project    │  │  Certificate │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Document   │  │ Notification │  │  Analytics   │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Audit      │  │   Workflow   │  │    Mobile    │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         Spring Boot 2.7 + Java 11 + Microservices           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MySQL 8.0  │  │  Redis Cache │  │      S3      │      │
│  │   Database   │  │              │  │   Storage    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 MONITORING & LOGGING                         │
│      Prometheus + Grafana + ELK Stack + Sentry              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Principios de Arquitectura

1. **Microservicios**: Cada servicio es independiente y escalable
2. **Cloud-Native**: Diseñado para Kubernetes y contenedores
3. **Event-Driven**: Comunicación asíncrona entre servicios
4. **API-First**: Todas las funcionalidades expuestas vía REST APIs
5. **Database-per-Service**: Cada microservicio tiene su propia BD
6. **Resilient**: Circuit breakers, retry logic, failover
7. **Observable**: Logging, métricas y trazas distribuidas

### 1.3 Patrones de Diseño Implementados

- **API Gateway**: Punto único de entrada
- **Service Discovery**: Registro dinámico de servicios
- **Circuit Breaker**: Prevención de cascadas de fallos
- **CQRS**: Separación de comandos y queries
- **Event Sourcing**: Trazabilidad completa de eventos
- **Saga Pattern**: Transacciones distribuidas
- **Repository Pattern**: Abstracción de acceso a datos

---

<a name="stack"></a>
## 2. STACK TECNOLÓGICO

### 2.1 Backend

```yaml
Lenguaje: Java 11
Framework Principal: Spring Boot 2.7.x
Frameworks Adicionales:
  - Spring Security (autenticación/autorización)
  - Spring Data JPA (persistencia)
  - Spring Cloud (microservicios)
  - Spring Batch (procesamiento batch)
  - Hibernate 5.6 (ORM)
  
Build Tool: Maven 3.8+
Testing:
  - JUnit 5
  - TestContainers
  - Mockito
  - Rest Assured
```

### 2.2 Frontend

```yaml
Framework: Next.js 14
Lenguaje: TypeScript 5.0
UI Library: React 18
Estado: Redux Toolkit + RTK Query
Estilizado: Tailwind CSS 3.3
Componentes: shadcn/ui + Radix UI
Formularios: React Hook Form + Zod
Gráficos: Recharts + D3.js
Tablas: TanStack Table
Notificaciones: React Hot Toast
```

### 2.3 Base de Datos

```yaml
Principal: MySQL 8.0
Cache: Redis 7.0
Búsqueda: Elasticsearch 8.x (opcional)
ORM: Hibernate + Spring Data JPA
Migrations: Flyway
Connection Pool: HikariCP
```

### 2.4 Infraestructura

```yaml
Containerización: Docker
Orquestación: Kubernetes
CI/CD: GitHub Actions / GitLab CI
Monitoring: Prometheus + Grafana
Logging: ELK Stack (Elasticsearch, Logstash, Kibana)
APM: Sentry / New Relic
API Documentation: OpenAPI 3.0 (Swagger)
```

### 2.5 Seguridad

```yaml
Autenticación: JWT + OAuth2
Autorización: Spring Security + RBAC
Encriptación: AES-256 (datos), TLS 1.3 (transporte)
Secrets Management: HashiCorp Vault / AWS Secrets Manager
WAF: Cloudflare / AWS WAF
```

---

<a name="modulos"></a>
## 3. MÓDULOS DEL SISTEMA

### 3.1 Business Service

**Propósito**: Gestión de clientes, pricing y pipeline comercial

**Funcionalidades Principales**:
- Gestión de clientes (CRUD)
- Calculadora de precios con ML
- Pipeline de ventas
- Métricas de negocio en tiempo real
- Análisis de rentabilidad

**Tecnologías**:
- Spring Boot
- Hibernate
- Redis (cache de precios)
- ML: scikit-learn vía API Python

**Endpoints Principales**:
```
POST   /api/v1/clients
GET    /api/v1/clients
GET    /api/v1/clients/{id}
PUT    /api/v1/clients/{id}
DELETE /api/v1/clients/{id}
GET    /api/v1/clients/search
POST   /api/v1/pricing/calculate
GET    /api/v1/metrics/business
```

### 3.2 Project Service

**Propósito**: Gestión de proyectos de certificación

**Funcionalidades Principales**:
- Creación de proyectos
- Seguimiento de fases (workflow de 10 etapas)
- Asignación de recursos
- SLA monitoring
- Notificaciones automáticas

**Modelo de Fases**:
```
1. Solicitud Inicial
2. Revisión Documental
3. Evaluación Preliminar
4. Visita en Terreno
5. Análisis de Cumplimiento
6. Dictamen Técnico
7. Aprobación Comité
8. Emisión de Certificado
9. Publicación
10. Seguimiento Post-Certificación
```

**Endpoints Principales**:
```
POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/{id}
PUT    /api/v1/projects/{id}/phase
POST   /api/v1/projects/{id}/tasks
GET    /api/v1/projects/{id}/timeline
GET    /api/v1/projects/overdue
```

### 3.3 Certificate Service

**Propósito**: Generación y gestión de certificados

**Funcionalidades Principales**:
- Generación de certificados PDF
- QR codes con blockchain validation
- Firma digital
- Templates personalizables
- Versionado de certificados
- Validación pública

**Formato de Certificado**:
```json
{
  "certificateId": "SICREP-2025-001234",
  "clientId": "CLIENT-789",
  "projectId": "PROJ-456",
  "issuedDate": "2025-11-06T10:00:00Z",
  "validUntil": "2026-11-06T10:00:00Z",
  "status": "ACTIVE",
  "qrCode": "...",
  "blockchainHash": "0x...",
  "signatories": [...]
}
```

**Endpoints Principales**:
```
POST   /api/v1/certificates
GET    /api/v1/certificates/{id}
GET    /api/v1/certificates/{id}/pdf
GET    /api/v1/certificates/{id}/qr
POST   /api/v1/certificates/{id}/renew
GET    /api/v1/certificates/validate/{qrHash}
```

### 3.4 Document Service

**Propósito**: Gestión documental avanzada

**Funcionalidades Principales**:
- Storage distribuido (S3 compatible)
- OCR y extracción de datos
- Versionado de documentos
- Clasificación automática con IA
- Compresión inteligente
- Búsqueda full-text

**Tipos de Documentos**:
- RUT empresarial
- Certificado de vigencia
- Certificado RETC
- Certificado SMA
- Política de sostenibilidad
- Planes de manejo
- Registros de capacitación
- Reportes de auditoría

**Endpoints Principales**:
```
POST   /api/v1/documents/upload
GET    /api/v1/documents/{id}
GET    /api/v1/documents/{id}/versions
POST   /api/v1/documents/{id}/ocr
GET    /api/v1/documents/search
DELETE /api/v1/documents/{id}
```

### 3.5 Notification Service

**Propósito**: Comunicaciones multi-canal

**Funcionalidades Principales**:
- Email (SMTP/SendGrid)
- SMS (Twilio)
- Push notifications
- Webhooks
- Slack/Teams integration
- Templates personalizables
- Scheduling
- Delivery tracking

**Canales Soportados**:
```yaml
- Email: SMTP, SendGrid, AWS SES
- SMS: Twilio, AWS SNS
- Push: FCM (Firebase Cloud Messaging)
- Webhook: HTTP POST callbacks
- Chat: Slack, Microsoft Teams
```

**Endpoints Principales**:
```
POST   /api/v1/notifications/send
POST   /api/v1/notifications/email
POST   /api/v1/notifications/sms
GET    /api/v1/notifications/{id}/status
GET    /api/v1/notifications/templates
```

### 3.6 Analytics Service

**Propósito**: Business Intelligence y Analytics

**Funcionalidades Principales**:
- Dashboards ejecutivos
- Predictive analytics con ML
- KPIs en tiempo real
- Reportes automatizados
- Export a Power BI/Tableau
- Segmentación de clientes
- Forecasting

**Métricas Principales**:
```javascript
{
  "business": {
    "totalRevenue": 125000000,
    "activeClients": 412,
    "newClients": 47,
    "churnRate": 2.3,
    "averageContractValue": 175000,
    "lifetimeValue": 890000
  },
  "operations": {
    "projectsActive": 156,
    "projectsCompleted": 892,
    "averageCompletionTime": 12.5,
    "slaCompliance": 94.6,
    "qualityScore": 8.7
  },
  "certification": {
    "certificatesIssued": 1247,
    "renewalRate": 87.3,
    "avgProcessingTime": 11.2,
    "complianceRate": 96.8
  }
}
```

**Endpoints Principales**:
```
GET    /api/v1/analytics/dashboard/executive
GET    /api/v1/analytics/metrics/business
GET    /api/v1/analytics/metrics/operations
POST   /api/v1/analytics/reports/generate
GET    /api/v1/analytics/forecasts/revenue
GET    /api/v1/analytics/clients/segments
```

### 3.7 Audit Service

**Propósito**: Sistema de auditoría y evaluación según Manual REP

**Funcionalidades Principales**:
- Evaluación de 10 criterios (100 puntos)
- Auditoría documental automática
- Auditoría en terreno (mobile app)
- Categorización verde/amarillo/rojo
- Informes de auditoría
- Sistema de seguimiento

**Criterios de Evaluación** (Manual REP):
```yaml
Documentales (40 puntos):
  1. Documentos legales (10 pts)
  2. Certificaciones ambientales (10 pts)
  3. Procedimientos operativos (10 pts)
  4. Trazabilidad de información (10 pts)

Operativos (40 puntos):
  5. Gestión de residuos (10 pts)
  6. Capacitación personal (10 pts)
  7. Infraestructura (10 pts)
  8. Cumplimiento normativo (10 pts)

Valor Agregado (20 puntos):
  9. Ecodiseño y material reciclado (10 pts)
  10. Certificaciones adicionales (10 pts)
```

**Endpoints Principales**:
```
POST   /api/v1/audits/create
GET    /api/v1/audits/{id}
POST   /api/v1/audits/{id}/evaluate
GET    /api/v1/audits/{id}/report
POST   /api/v1/audits/{id}/approve
GET    /api/v1/audits/pending
```

### 3.8 Workflow Service

**Propósito**: Motor de workflow y aprobaciones

**Funcionalidades Principales**:
- Workflow de 10 fases configurable
- Sistema de tareas automáticas
- Aprobaciones multi-nivel
- Notificaciones por fase
- Métricas de performance
- Identificación de bottlenecks

**Estados de Proyecto**:
```
INITIATED → DOCUMENT_REVIEW → PRELIMINARY_EVALUATION → 
FIELD_VISIT → COMPLIANCE_ANALYSIS → TECHNICAL_OPINION → 
COMMITTEE_APPROVAL → CERTIFICATE_ISSUANCE → PUBLICATION → 
POST_CERTIFICATION_FOLLOWUP
```

**Endpoints Principales**:
```
GET    /api/v1/workflows/{projectId}
POST   /api/v1/workflows/{projectId}/advance
POST   /api/v1/workflows/{projectId}/assign
GET    /api/v1/workflows/{projectId}/tasks
POST   /api/v1/workflows/{projectId}/approve
GET    /api/v1/workflows/bottlenecks
```

### 3.9 Mobile Service

**Propósito**: APIs para aplicación móvil de evaluadores

**Funcionalidades Principales**:
- Evaluación en terreno
- Geolocalización
- Captura de fotos con análisis IA
- Modo offline con sync
- Firma digital de clientes
- Reportes preliminares

**Datos de Evaluación en Terreno**:
```json
{
  "evaluationId": "EVAL-2025-001",
  "projectId": "PROJ-456",
  "evaluatorId": "EV-123",
  "timestamp": "2025-11-06T14:30:00Z",
  "location": {
    "latitude": -33.4489,
    "longitude": -70.6693
  },
  "photos": [
    {
      "url": "s3://...",
      "caption": "Área de segregación de residuos",
      "aiAnalysis": {
        "detected": ["recycling bins", "signage"],
        "compliance": true
      }
    }
  ],
  "checklist": {
    "segregationArea": true,
    "properSignage": true,
    "cleanConditions": true
  },
  "signature": "data:image/png;base64,..."
}
```

**Endpoints Principales**:
```
POST   /api/v1/mobile/evaluations
POST   /api/v1/mobile/photos
POST   /api/v1/mobile/sync
GET    /api/v1/mobile/evaluations/{id}
POST   /api/v1/mobile/signature
```

---

<a name="database"></a>
## 4. BASE DE DATOS

### 4.1 Esquema Principal (MySQL)

```sql
-- Clientes
CREATE TABLE clients (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  client_id VARCHAR(50) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  rut VARCHAR(20) UNIQUE NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  industry ENUM('MINING', 'CONSTRUCTION', 'MANUFACTURING', 
                 'RETAIL', 'FOOD', 'OTHER'),
  company_size ENUM('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE'),
  service_level ENUM('BASIC', 'EXPRESS', 'PREMIUM'),
  status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PROSPECT'),
  registered_at TIMESTAMP NOT NULL,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  version BIGINT DEFAULT 0,
  INDEX idx_company_name (company_name),
  INDEX idx_rut (rut),
  INDEX idx_status_industry (status, industry),
  FULLTEXT INDEX ft_company_contact (company_name, contact_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Proyectos
CREATE TABLE projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(50) UNIQUE NOT NULL,
  client_id BIGINT NOT NULL,
  service_type VARCHAR(50) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  base_price DECIMAL(12,2) NOT NULL,
  final_price DECIMAL(12,2) NOT NULL,
  estimated_duration INT NOT NULL,
  status ENUM('INITIATED', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 
              'CANCELLED', 'OVERDUE'),
  priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'),
  created_at TIMESTAMP NOT NULL,
  due_date TIMESTAMP,
  completed_at TIMESTAMP NULL,
  progress_percentage INT DEFAULT 0,
  current_phase ENUM('INITIAL_DOCUMENTS', 'DOCUMENT_REVIEW', 
                     'EVALUATION', 'FIELD_VISIT', 'ANALYSIS',
                     'OPINION', 'APPROVAL', 'ISSUANCE', 
                     'PUBLICATION', 'FOLLOWUP'),
  project_data JSON,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  INDEX idx_client_status (client_id, status),
  INDEX idx_priority_status (priority, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Certificados
CREATE TABLE certificates (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  certificate_id VARCHAR(50) UNIQUE NOT NULL,
  project_id BIGINT NOT NULL,
  issued_date TIMESTAMP NOT NULL,
  valid_until TIMESTAMP NOT NULL,
  status ENUM('ACTIVE', 'EXPIRED', 'REVOKED', 'SUSPENDED'),
  qr_hash VARCHAR(255) UNIQUE,
  blockchain_hash VARCHAR(255),
  pdf_url VARCHAR(500),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  INDEX idx_qr_hash (qr_hash),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Documentos
CREATE TABLE documents (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  document_id VARCHAR(50) UNIQUE NOT NULL,
  project_id BIGINT NOT NULL,
  document_type VARCHAR(100) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_size BIGINT,
  mime_type VARCHAR(100),
  storage_url VARCHAR(500),
  version INT DEFAULT 1,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'ARCHIVED'),
  ocr_text TEXT,
  metadata JSON,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  INDEX idx_project_type (project_id, document_type),
  FULLTEXT INDEX ft_ocr_text (ocr_text)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Auditorías
CREATE TABLE audits (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  audit_id VARCHAR(50) UNIQUE NOT NULL,
  project_id BIGINT NOT NULL,
  auditor_id BIGINT NOT NULL,
  audit_date TIMESTAMP NOT NULL,
  audit_type ENUM('DOCUMENTAL', 'FIELD', 'FOLLOWUP'),
  score_documental INT,
  score_operational INT,
  score_value_added INT,
  total_score INT,
  category ENUM('GREEN', 'YELLOW', 'RED'),
  observations TEXT,
  report_url VARCHAR(500),
  status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  INDEX idx_project_date (project_id, audit_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuarios del Sistema
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('ADMIN', 'MANAGER', 'AUDITOR', 'EVALUATOR', 
            'CLIENT', 'VIEWER'),
  status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED'),
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 4.2 Índices de Performance

```sql
-- Índices adicionales para optimización
CREATE INDEX idx_projects_created_due ON projects(created_at, due_date);
CREATE INDEX idx_certificates_valid_until ON certificates(valid_until);
CREATE INDEX idx_documents_uploaded_at ON documents(uploaded_at);
CREATE INDEX idx_audits_category_score ON audits(category, total_score);

-- Índices compuestos
CREATE INDEX idx_projects_client_status_phase 
  ON projects(client_id, status, current_phase);
```

### 4.3 Particionamiento

```sql
-- Particionamiento por año para proyectos
ALTER TABLE projects
PARTITION BY RANGE (YEAR(created_at)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

---

<a name="apis"></a>
## 5. APIs Y ENDPOINTS

### 5.1 Autenticación

```http
POST /api/v1/auth/login
POST /api/v1/auth/logout
POST /api/v1/auth/refresh
POST /api/v1/auth/register
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
```

### 5.2 Clientes

```http
GET    /api/v1/clients                    # List all
POST   /api/v1/clients                    # Create
GET    /api/v1/clients/{id}               # Get by ID
PUT    /api/v1/clients/{id}               # Update
DELETE /api/v1/clients/{id}               # Delete
GET    /api/v1/clients/search             # Search
GET    /api/v1/clients/{id}/projects      # Client projects
GET    /api/v1/clients/{id}/certificates  # Client certificates
```

### 5.3 Proyectos

```http
GET    /api/v1/projects                   # List all
POST   /api/v1/projects                   # Create
GET    /api/v1/projects/{id}              # Get by ID
PUT    /api/v1/projects/{id}              # Update
DELETE /api/v1/projects/{id}              # Delete
PUT    /api/v1/projects/{id}/phase        # Advance phase
POST   /api/v1/projects/{id}/tasks        # Add task
GET    /api/v1/projects/{id}/timeline     # Timeline
GET    /api/v1/projects/overdue           # Overdue projects
GET    /api/v1/projects/dashboard         # Dashboard stats
```

### 5.4 Certificados

```http
GET    /api/v1/certificates               # List all
POST   /api/v1/certificates               # Create
GET    /api/v1/certificates/{id}          # Get by ID
GET    /api/v1/certificates/{id}/pdf      # Download PDF
GET    /api/v1/certificates/{id}/qr       # Get QR code
POST   /api/v1/certificates/{id}/renew    # Renew
POST   /api/v1/certificates/{id}/revoke   # Revoke
GET    /api/v1/certificates/validate/{qr} # Validate (public)
```

### 5.5 Documentos

```http
POST   /api/v1/documents/upload           # Upload
GET    /api/v1/documents/{id}             # Download
GET    /api/v1/documents/{id}/versions    # Version history
POST   /api/v1/documents/{id}/ocr         # Run OCR
GET    /api/v1/documents/search           # Search
DELETE /api/v1/documents/{id}             # Delete
```

### 5.6 Auditorías

```http
POST   /api/v1/audits                     # Create audit
GET    /api/v1/audits/{id}                # Get by ID
POST   /api/v1/audits/{id}/evaluate       # Perform evaluation
GET    /api/v1/audits/{id}/report         # Generate report
POST   /api/v1/audits/{id}/approve        # Approve
GET    /api/v1/audits/pending             # Pending audits
```

### 5.7 Analytics

```http
GET    /api/v1/analytics/dashboard/executive
GET    /api/v1/analytics/metrics/business
GET    /api/v1/analytics/metrics/operations
POST   /api/v1/analytics/reports/generate
GET    /api/v1/analytics/forecasts/revenue
GET    /api/v1/analytics/clients/segments
```

---

<a name="seguridad"></a>
## 6. SEGURIDAD

### 6.1 Autenticación JWT

```java
// JWT Configuration
@Configuration
public class JwtConfig {
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration; // 24 hours
    
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
}
```

### 6.2 Control de Acceso (RBAC)

```yaml
Roles y Permisos:
  ADMIN:
    - Full access
    - User management
    - System configuration
  
  MANAGER:
    - View all projects
    - Approve workflows
    - Generate reports
    
  AUDITOR:
    - Perform audits
    - Create evaluation reports
    - Access project documents
    
  EVALUATOR:
    - Conduct field evaluations
    - Upload photos
    - Submit preliminary reports
    
  CLIENT:
    - View own projects
    - Upload documents
    - View certificates
    
  VIEWER:
    - Read-only access
    - View dashboards
    - Download reports
```

### 6.3 Encriptación

```yaml
Data at Rest:
  - AES-256 encryption for sensitive data
  - Encrypted database backups
  - Encrypted file storage (S3)

Data in Transit:
  - TLS 1.3 for all connections
  - Certificate pinning for mobile app
  - HTTPS only (HSTS enabled)
  
Sensitive Fields:
  - Password: BCrypt (cost factor 12)
  - API Keys: AES-256
  - Personal Data: Field-level encryption
```

### 6.4 Rate Limiting

```nginx
# Nginx rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    limit_req_status 429;
}
```

---

<a name="despliegue"></a>
## 7. DESPLIEGUE

### 7.1 Estructura de Contenedores

```yaml
# docker-compose.yml
version: '3.8'
services:
  # Backend Services
  api-gateway:
    image: sicrep/api-gateway:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=production
    depends_on:
      - mysql
      - redis

  business-service:
    image: sicrep/business-service:latest
    environment:
      - SPRING_PROFILES_ACTIVE=production
    depends_on:
      - mysql
      - redis

  # Database
  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      - MYSQL_DATABASE=sicrep
    volumes:
      - mysql-data:/var/lib/mysql
    ports:
      - "3306:3306"

  # Cache
  redis:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

  # Monitoring
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}

volumes:
  mysql-data:
  redis-data:
```

### 7.2 Kubernetes Deployment

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sicrep-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sicrep-backend
  template:
    metadata:
      labels:
        app: sicrep-backend
    spec:
      containers:
      - name: backend
        image: sicrep/backend:2.0.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: host
```

### 7.3 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy SICREP

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          
      - name: Build with Maven
        run: mvn clean package -DskipTests
        
      - name: Run tests
        run: mvn test
        
      - name: Build Docker image
        run: docker build -t sicrep/backend:${{ github.sha }} .
        
      - name: Push to registry
        run: |
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push sicrep/backend:${{ github.sha }}
          
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/sicrep-backend \
            backend=sicrep/backend:${{ github.sha }}
```

---

<a name="monitoreo"></a>
## 8. MONITOREO

### 8.1 Métricas de Prometheus

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'sicrep-backend'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['backend:8080']
```

```java
// Spring Boot Actuator
@Configuration
public class MetricsConfig {
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> registry.config()
            .commonTags("application", "sicrep");
    }
}
```

### 8.2 Grafana Dashboards

**Dashboard: Executive Overview**
- Total clients
- Active projects
- Revenue metrics
- SLA compliance
- Certificate issuance rate

**Dashboard: Technical Metrics**
- Request rate
- Error rate
- Response time (p50, p95, p99)
- Database connections
- Cache hit rate
- JVM metrics (heap, GC)

### 8.3 Alertas

```yaml
# AlertManager configuration
groups:
  - name: sicrep_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          
      - alert: SlowResponse
        expr: histogram_quantile(0.95, http_request_duration_seconds) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Slow response time (p95 > 1s)"
          
      - alert: HighMemoryUsage
        expr: jvm_memory_used_bytes / jvm_memory_max_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage (>90%)"
```

---

<a name="troubleshooting"></a>
## 9. TROUBLESHOOTING

### 9.1 Problemas Comunes

**Error: Database connection failed**
```bash
# Verificar conectividad
telnet mysql-host 3306

# Verificar credenciales
mysql -h mysql-host -u sicrep_user -p

# Revisar logs
kubectl logs deployment/sicrep-backend | grep -i "database"
```

**Error: High memory usage**
```bash
# Verificar heap size
java -XX:+PrintFlagsFinal -version | grep HeapSize

# Analizar heap dump
jmap -dump:live,format=b,file=heap.bin <pid>
jhat heap.bin
```

**Error: Slow queries**
```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Analyze slow queries
SELECT * FROM mysql.slow_log;

-- Explain query plan
EXPLAIN SELECT * FROM projects WHERE status = 'ACTIVE';
```

### 9.2 Logs

```bash
# Ver logs en tiempo real
kubectl logs -f deployment/sicrep-backend

# Buscar errores
kubectl logs deployment/sicrep-backend | grep -i "error"

# Logs de auditoría
grep "AUDIT" /var/log/sicrep/audit.log
```

### 9.3 Performance Tuning

```yaml
# JVM Options
JAVA_OPTS:
  -Xms2g                          # Initial heap size
  -Xmx4g                          # Maximum heap size
  -XX:+UseG1GC                    # G1 Garbage Collector
  -XX:MaxGCPauseMillis=200        # GC pause target
  -XX:+HeapDumpOnOutOfMemoryError
  -XX:HeapDumpPath=/tmp/heapdump.hprof

# Database Connection Pool
spring:
  datasource:
    hikari:
      maximum-pool-size: 50
      minimum-idle: 10
      connection-timeout: 20000
      idle-timeout: 300000
```

---

## 10. CONTACTO Y SOPORTE

**Equipo Técnico SICREP**
- Email: soporte@sicrep.cl
- Slack: #sicrep-tech
- Documentación: https://docs.sicrep.cl
- Wiki: https://wiki.sicrep.cl

---

**Documento generado:** Noviembre 2025  
**Versión:** 2.0  
**Estado:** Vigente  
**Próxima revisión:** Marzo 2026
