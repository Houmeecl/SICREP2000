# SICREP - Sistema Integral de Certificación REP

## Overview

SICREP is a comprehensive SaaS platform for REP (Extended Producer Responsibility) compliance certification in Chile, specifically designed for the mining industry and their suppliers. The system provides end-to-end certification workflows for packaging materials under Law 20.920, with specialized features for providers handling less than 300kg annually.

**Latest Updates (November 2025):**
- ✅ Fully functional document upload system with base64 storage in PostgreSQL
- ✅ Real file upload, storage, and download capabilities for certification documents
- ✅ CSV export functionality for reports and certifications
- ✅ Complete provider-based data filtering (demo user: sicrep@sicrep.cl with RUT 76.543.210-K)
- ✅ Professional PDF report generation with SICREP branding
- ✅ **NEW: Manual profesional** con borradores descargables para empresas, asociaciones y auditorías
- ✅ **NEW: Landing de trazabilidad mejorada** con timeline visual de eventos NFC y workflow
- ✅ **NEW: Sistema de trazabilidad NFC completo** con 3 nuevas tablas (productCatalog, productionBatches, nfcValidations)
- ✅ **NEW: Endpoints API para productos, lotes y validaciones NFC** con seguridad por rol
- ✅ **NEW: Manual con arquitectura visual** - Diagrama SVG de 5 capas, 9 módulos, 3 flujos de trabajo, 15 roles
- ✅ **NEW: Login con imagen de minería y energía renovable** - Split screen profesional
- ✅ **NEW: Expansión a sector energía** - Plataforma ahora cubre minería y energía
- ✅ **NEW: Calculadora de Cumplimiento REP interactiva** - Slider dinámico con cálculo de obligaciones y multas
- ✅ **NEW: Demo Trazabilidad NFC/QR** - Simulador completo de generación y validación de códigos QR

The platform addresses a critical legal paradox: companies introducing less than 300kg of packaging annually are exempt from collection targets but still required to report accurate weight/materiality data to RETC (Registro de Emisiones y Transferencia de Contaminantes). Non-compliance can result in fines from SMA (Superintendencia del Medio Ambiente) ranging from 1 to 10,000 UTA (up to $6.2M CLP).

SICREP transforms this compliance burden into competitive advantage through:
- Individual packaging certification by type and weight (cardboard, film, strapping, pallets)
- NFC + QR technology for instant validation by mining companies and industrial consumers
- Immutable blockchain traceability (Polygon Mumbai testnet)
- ESG analytics and benchmarking capabilities
- Automated RETC reporting and compliance management

## Deploy a Producción

**Pasos después de publicar (Deploy):**

1. **Migrar base de datos de producción:**
   ```bash
   npm run db:push
   ```
   Esto creará las nuevas tablas NFC (productCatalog, productionBatches, nfcValidations)

2. **Crear usuarios y datos demo (opcional):**
   ```bash
   npm run db:seed
   ```
   
3. **Credenciales de acceso:**
   - Demo/Proveedor: sicrep@sicrep.cl / demo123
   - Admin: admin@sicrep.cl / admin123
   - Evaluador: evaluador@sicrep.cl / evaluador123
   - Auditor: auditor@sicrep.cl / auditor123
   - CPS: cps@sicrep.cl / cps123

**Nota:** Las nuevas funcionalidades interactivas (Calculadora REP, Demo QR) son solo frontend y funcionan inmediatamente sin cambios en BD.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling and HMR
- Wouter for client-side routing
- TanStack Query (React Query) for server state management
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design system

**Design System:**
- Hybrid approach: Material Design 3-inspired for dashboards + modern SaaS marketing for landing pages
- Custom Tailwind configuration with HSL-based color variables for theme support
- Typography: Inter (primary), JetBrains Mono (technical data/codes)
- Responsive breakpoints: Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- Component library includes 15+ role-specific interfaces

**State Management:**
- Authentication context (`AuthProvider`) manages user session with localStorage persistence
- React Query handles all server data fetching, caching, and synchronization
- No global state management library (Redux, Zustand) - relies on React Query + Context

**Key UI Components:**
- `AppSidebar`: 280px fixed navigation with role-based menu items
- `ProtectedRoute`: Route guard with role-based access control
- Dashboard components: Stats, Workflow, CPS Catalog, NFC Traceability, ESG Metrics
- Role-specific views: 15 distinct user roles (admin, evaluator, auditor, provider, mining client, etc.)
- **Manual page**: 3-tab professional materials (Grandes Empresas, Asociaciones, Borradores PDF)
- **TraceabilityLanding**: Public verification page with NFC/workflow timeline visualization

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js
- TypeScript for type safety
- Drizzle ORM for database interactions
- Neon serverless PostgreSQL
- Bcrypt for password hashing

**API Design:**
- RESTful endpoints under `/api` namespace
- JSON request/response format
- Stateless authentication (returns user object on login, stored in localStorage)
- **CRITICAL GAP**: No backend authorization middleware - all endpoints unprotected

**Data Models (Drizzle Schema):**
- `users`: Multi-role user management with 15+ role types
- `providers`: Supplier entities with RUT, capacity tracking (300kg limit)
- `cpsCatalog`: Certified Product Sustainable catalog (packaging specifications)
- `certifications`: Main workflow entity tracking 10-phase certification process
- `workflowHistory`: Audit trail for certification state transitions
- `nfcEvents`: Traceability events for NFC tag scanning
- `esgMetrics`: Environmental metrics (CO2, recycling rate, water, renewable energy)
- `activityLog`: System-wide activity tracking
- `certificationDocuments`: Document storage with base64 file data (NEW)
- `shipments`: Certified packaging shipments
- `packagingComponents`: Individual packaging components per shipment

**Workflow Engine:**
- 10-phase certification workflow:
  1. Solicitud Inicial
  2. Asignación CPS
  3. Evaluación Documentos
  4. Evaluación Operativa
  5. Evaluación Valor Agregado
  6. Revisión Final
  7. Emisión Certificado
  8. Activación NFC
  9. Publicación
  10. Monitoreo Continuo

**Code Generation:**
- Auto-generates unique codes: CPS (CPS-CL-YYYY-XXXXXX), NFC tags, blockchain hashes
- Certification codes follow standardized format

### Authentication & Authorization

**Current Implementation:**
- Client-side authentication context with localStorage persistence
- Login endpoint (`/api/auth/login`) validates credentials and returns user object
- Frontend `RoleGuard` components restrict UI access by role
- **CRITICAL SECURITY GAP**: Backend has NO session management or authorization middleware
  - All API endpoints accessible without authentication
  - No JWT tokens or session cookies
  - Frontend protection easily bypassed with direct API calls

**Required Implementation:**
- Express session management with `connect-pg-simple` (already installed)
- RBAC middleware for backend route protection
- Session-based authentication to track logged-in users
- Role-based endpoint access control

### Database Design

**PostgreSQL with Drizzle ORM:**
- Schema defined in TypeScript (`shared/schema.ts`)
- Enums for type safety: `userRoleEnum`, `certificationStatusEnum`, `workflowPhaseEnum`
- Timestamp tracking with `createdAt`/`updatedAt`
- Decimal types for precise weight measurements (critical for 300kg limit)

**Migration Strategy:**
- `drizzle-kit push` for schema changes
- Migrations stored in `/migrations` directory
- Seed script (`server/seed.ts`) creates initial admin user and sample data

**Storage Interface:**
- Abstraction layer (`server/storage.ts`) provides CRUD operations
- Type-safe methods for all entities
- Supports relational queries (e.g., workflow history by certification ID)

### Build & Deployment

**Development:**
- `npm run dev`: Runs Express server with Vite middleware for HMR
- TSX for TypeScript execution without compilation
- Concurrent frontend + backend development on single port

**Production:**
- `npm run build`: 
  1. Vite builds React app to `dist/public`
  2. esbuild bundles server code to `dist/index.js`
- `npm start`: Runs compiled Express server serving static frontend
- Single deployment artifact

**Environment Configuration:**
- `DATABASE_URL` required for Neon PostgreSQL connection
- Drizzle config validates environment variables at build time

### Key Architectural Decisions

**Monorepo Structure:**
- `/client`: React frontend with absolute imports via `@/` alias
- `/server`: Express backend
- `/shared`: Shared TypeScript types and schemas (Drizzle)
- Enables code sharing between frontend/backend while maintaining separation

**Type Safety:**
- Zod schemas generated from Drizzle models (`createInsertSchema`)
- Full TypeScript coverage across stack
- Compile-time validation of API contracts

**Component Library Choice:**
- shadcn/ui provides unstyled, accessible primitives
- Customizable via Tailwind (not locked into design system)
- Copy-paste philosophy (components in source, not node_modules)

**Database ORM:**
- Drizzle chosen over Prisma for:
  - Better TypeScript inference
  - SQL-like query syntax
  - Smaller bundle size
  - Native PostgreSQL feature support

**Authentication Strategy:**
- Deliberately simple to enable rapid prototyping
- **Must be upgraded before production** with:
  - Session persistence
  - CSRF protection
  - Rate limiting
  - Backend RBAC

## External Dependencies

### Third-Party Services

**Neon Database:**
- Serverless PostgreSQL hosting
- WebSocket-based connections via `@neondatabase/serverless`
- Auto-scaling, usage-based pricing
- Connection pooling handled by Neon

**Blockchain (Planned):**
- Polygon Mumbai testnet for immutable traceability
- Hash generation implemented (mock), blockchain anchoring not connected
- Required for Copper Mark + REP law compliance

**NFC Technology:**
- Hardware: Physical NFC tags for packaging
- Software: Web NFC API (browser support required)
- Current implementation: Tag ID generation only, no actual NFC reading

### NPM Packages

**UI & Styling:**
- `@radix-ui/*`: 20+ accessible component primitives (accordion, dialog, dropdown, etc.)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Component variant management
- `clsx` + `tailwind-merge`: Conditional className composition
- `lucide-react`: Icon library (500+ icons)

**Data Management:**
- `@tanstack/react-query`: Server state management, caching, mutations
- `drizzle-orm`: Type-safe SQL query builder
- `zod`: Schema validation (shared between frontend/backend)

**Authentication:**
- `bcrypt`: Password hashing (10 rounds)
- `connect-pg-simple`: PostgreSQL session store (installed but unused)

**Charts & Visualization:**
- `recharts`: React charting library for ESG metrics

**Forms:**
- `@hookform/resolvers`: React Hook Form + Zod integration
- `react-hook-form`: Form state management (not yet implemented)

**Development Tools:**
- `vite`: Build tool with HMR
- `tsx`: TypeScript execution for Node.js
- `esbuild`: Fast JavaScript bundler for production server
- `@replit/vite-plugin-*`: Replit-specific development enhancements

**Routing:**
- `wouter`: Minimal React router (2KB, hook-based)

### Missing Critical Dependencies

**Security (Required for Production):**
- `express-session`: Session management middleware
- `express-rate-limit`: API rate limiting
- `helmet`: Security headers
- `cors`: CORS configuration

**Blockchain Integration:**
- Web3 library for Polygon Mumbai interaction
- Wallet management for transaction signing

**NFC Hardware:**
- NFC reader/writer hardware for tag programming
- Mobile app or PWA with Web NFC API support

**File Storage:**
- S3-compatible storage for certification PDFs
- Image storage for packaging photos

**PDF Generation (Planned):**
- Puppeteer mentioned in documentation but not implemented
- PDF templates for official certifications

### Design Assets

**Typography:**
- Google Fonts CDN: Inter (primary), JetBrains Mono (monospace)
- Self-hosted fonts not included

**Images:**
- `attached_assets/generated_images/Mining_trucks_with_wind_turbines_*.png`
- Single hero image, additional assets needed for production

**Branding:**
- Custom color scheme via CSS variables
- SICREP logo not included (using Shield icon placeholder)
- Official certification templates not implemented