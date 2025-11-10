# SICREP - Sistema Integral de Certificación REP

## Overview

SICREP is a comprehensive SaaS platform for REP (Extended Producer Responsibility) compliance certification in Chile, targeting the mining industry and its suppliers. The system facilitates end-to-end certification for packaging materials under Law 20.920, with specialized features for providers handling less than 300kg annually. It addresses the legal requirement for accurate weight/materiality data reporting to RETC, mitigating potential fines.

**Latest Updates (November 2025):**
- ✅ **FIX: Botones "Iniciar Certificación"** - Corregidos para apuntar a formulario público `/solicitar-certificacion`
- ✅ **NEW: Sistema de solicitud pública de certificación** - Sistema completo de onboarding para empresas sin cuenta
  - Formulario multi-paso (4 tabs: Empresa, Contacto, Documentos, Revisión)
  - Validación de RUT chileno con algoritmo estándar
  - Carga opcional de documentos (PDF/JPG/PNG, máx 5 archivos, 5MB c/u)
  - Storage de documentos en base64 en tabla `requestDocuments`
  - Página pública sin autenticación en `/solicitar-certificacion`
- ✅ **NEW: Panel admin de solicitudes** - Dashboard completo en `/admin/solicitudes`
  - Listado de solicitudes con filtros por estado (pending, approved, rejected)
  - Vista de detalles con toda la información de la empresa
  - Botones de aprobación/rechazo con confirmación
  - Aprobación automática crea: provider + user + certification (transaccional)
  - Generación de credenciales temporales con bcrypt
  - Email stub service (console.log, TODO: SendGrid/Resend integration)
- ✅ **NEW: Tablas de DB** - `certificationRequests` y `requestDocuments` con field `documentsProvided`
- ✅ Fully functional document upload system with base64 storage in PostgreSQL
- ✅ CSV export functionality for reports and certifications
- ✅ Complete provider-based data filtering (demo user: sicrep@sicrep.cl with RUT 76.543.210-K)
- ✅ Professional PDF report generation with SICREP branding
- ✅ Manual profesional con borradores descargables para empresas, asociaciones y auditorías
- ✅ Landing de trazabilidad mejorada con timeline visual de eventos NFC y workflow
- ✅ Sistema de trazabilidad NFC completo con 3 nuevas tablas (productCatalog, productionBatches, nfcValidations)
- ✅ Manual con arquitectura visual - Diagrama SVG de 5 capas, 9 módulos, 3 flujos de trabajo, 15 roles
- ✅ Login con imagen de minería y energía renovable - Split screen profesional
- ✅ Calculadora de Cumplimiento REP interactiva - Slider dinámico con cálculo de obligaciones y multas
- ✅ Demo Trazabilidad NFC/QR - Simulador completo de generación y validación de códigos QR
- ✅ Página de detalle de certificaciones con timeline de workflow y avance de fase

SICREP transforms compliance into a competitive advantage by offering:
- Individual packaging certification by type and weight.
- NFC + QR technology for instant validation by industrial consumers.
- Immutable blockchain traceability (Polygon Mumbai testnet).
- ESG analytics and benchmarking.
- Automated RETC reporting and compliance management.
- Professional PDF report generation and a comprehensive manual.
- An interactive REP Compliance Calculator and a full NFC/QR traceability demo.
- Expansion to include the energy sector alongside mining.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:** React 18 (TypeScript), Vite, Wouter, TanStack Query, shadcn/ui, Tailwind CSS.

**Design System:** Hybrid Material Design 3 and modern SaaS aesthetic. Custom Tailwind configuration with HSL color variables, Inter and JetBrains Mono fonts. Responsive design for mobile, tablet, and desktop.

**State Management:** Authentication managed via `AuthProvider` (localStorage persistence). Server state handled by React Query for data fetching, caching, and synchronization.

**Key UI Components:**
- `AppSidebar`: Role-based navigation (280px fixed) with 4 categories: Inicio & Seguimiento, Certificación REP, Cumplimiento & Validación, Administración.
- `AppBreadcrumbs`: Hierarchical navigation with dynamic route support (e.g., `/certifications/:id`). Uses regex matching for dynamic segments.
- `ProtectedRoute`: Role-based access control for routes.
- Dashboards: Statistics, Workflow, CPS Catalog, NFC Traceability, ESG Metrics.
- Role-specific views for 15 user roles.
- Manual page with downloadable professional materials.
- Traceability Landing with NFC/workflow timeline.
- **CertificationDetail page** (`/certifications/:id`): Comprehensive certification view featuring:
  - Full certification information (code, provider, status, current phase, ESG points, dates)
  - 10-phase workflow timeline showing completed/in-progress/pending states with visual indicators
  - Document attachments list with download buttons
  - "Avanzar Fase" button visible only to admin/evaluador/auditor roles
  - Confirmation dialog before advancing phases
  - Real-time updates via React Query invalidation after mutations
  - Navigation via "Ver Detalles" button from Certifications list page

### Backend Architecture

**Technology Stack:** Node.js, Express.js, TypeScript, Drizzle ORM, Neon serverless PostgreSQL, Bcrypt.

**API Design:** RESTful endpoints, JSON format. Stateless authentication returning user object upon login.

**Data Models (Drizzle Schema):** `users`, `providers`, `cpsCatalog`, `certifications` (10-phase workflow), `workflowHistory`, `nfcEvents`, `esgMetrics`, `activityLog`, `certificationDocuments` (base64 storage), `shipments`, `packagingComponents`, `productCatalog`, `productionBatches`, `nfcValidations`.

**Workflow Engine:** A 10-phase certification process from "Solicitud Inicial" to "Monitoreo Continuo".

**Code Generation:** Automatic generation of unique codes for CPS, NFC tags, and blockchain hashes.

**Authentication & Authorization:** Client-side authentication with localStorage. **Critical Security Gap:** Backend lacks session management and authorization middleware; all API endpoints are currently unprotected. Future implementation requires Express session management (`connect-pg-simple`) and RBAC middleware.

### Database Design

**Technology:** PostgreSQL with Drizzle ORM.
**Schema:** Defined in TypeScript, utilizing enums for type safety (`userRoleEnum`, `certificationStatusEnum`, `workflowPhaseEnum`). Includes `createdAt`/`updatedAt` timestamps and decimal types for precision.
**Migration Strategy:** `drizzle-kit push` for schema changes, `server/seed.ts` for initial data.
**Storage Interface:** Abstraction layer (`server/storage.ts`) for type-safe CRUD operations.

### Build & Deployment

**Development:** `npm run dev` (Express server with Vite HMR).
**Production:** `npm run build` (Vite for React, esbuild for server), `npm start` to run compiled server.
**Environment Configuration:** `DATABASE_URL` for Neon PostgreSQL.

### Key Architectural Decisions

**Monorepo Structure:** `/client` (React), `/server` (Express), `/shared` (shared types/schemas) for code sharing and separation.
**Type Safety:** Full TypeScript coverage with Zod schemas generated from Drizzle models.
**Component Library:** shadcn/ui for unstyled, accessible, customizable components via Tailwind.
**Database ORM:** Drizzle chosen for TypeScript inference, SQL-like syntax, and native PostgreSQL support.
**Authentication:** Simple for rapid prototyping, but requires significant upgrades for production-level security (session persistence, CSRF, rate limiting, backend RBAC).

## External Dependencies

### Third-Party Services

-   **Neon Database:** Serverless PostgreSQL hosting.
-   **Blockchain (Planned):** Polygon Mumbai testnet for immutable traceability (hashing implemented, anchoring pending).
-   **NFC Technology:** Physical NFC tags and Web NFC API (tag ID generation only, no actual reading).

### NPM Packages

-   **UI & Styling:** `@radix-ui/*`, `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.
-   **Data Management:** `@tanstack/react-query`, `drizzle-orm`, `zod`.
-   **Authentication:** `bcrypt`, `connect-pg-simple` (installed but unused).
-   **Charts:** `recharts`.
-   **Development Tools:** `vite`, `tsx`, `esbuild`, `@replit/vite-plugin-*`.
-   **Routing:** `wouter`.

### Missing Critical Dependencies (for production)

-   **Security:** `express-session`, `express-rate-limit`, `helmet`, `cors`.
-   **Blockchain Integration:** Web3 library for Polygon Mumbai.
-   **NFC Hardware:** NFC reader/writer.
-   **File Storage:** S3-compatible storage.
-   **PDF Generation:** Puppeteer (planned).