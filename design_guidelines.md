# SICREP - Design Guidelines

## Design Approach

**Hybrid System**: Material Design 3-inspired for application dashboards (data-dense, operational efficiency) + Modern SaaS marketing style for landing pages (visual impact, conversion-focused).

**Core Principles**:
- **Data Hierarchy First**: Regulatory information always visible and prioritized
- **Operational Efficiency**: Minimize clicks for frequent tasks (dispatch registration, validations)
- **Professional Trust**: Design reflects institutional seriousness
- **Balanced Information Density**: Rich data without visual saturation

---

## Typography

**Font Families**:
- Primary: Inter (via Google Fonts CDN) - all UI elements
- Technical Data: JetBrains Mono for codes (CPS-C-001, RUT, NFC tags, hashes)

**Hierarchy**:
- **H1 Hero**: 48px/56px bold - landing page headlines
- **H1 Dashboard**: 32px/40px semibold - main dashboard titles
- **H2 Sections**: 24px/32px semibold - section/card titles
- **H3 Subsections**: 18px/24px semibold - subsection headers
- **Body Primary**: 16px/24px regular - general content
- **Body Secondary**: 14px/20px regular - descriptions, metadata
- **Labels/Captions**: 12px/16px medium - form labels, chart legends
- **Critical Data** (kg weights, scores): 20px/28px bold numbers + 14px units
- **Technical Codes**: 14px/20px monospace (CPS, RUT, blockchain hashes)

---

## Layout System

**Tailwind Spacing Units**: Consistently use units 2, 4, 6, 8, 12, 16, 20, 24 (p-4, m-8, gap-6)

**Base Structure**:
- **Sidebar Navigation**: Fixed 280px desktop, collapse to 72px (icons only) tablet, drawer on mobile
- **Main Content**: max-width 1440px container, responsive horizontal padding (px-4 mobile, px-8 desktop)
- **Dashboard Grid**: 12-column system, consistent gaps (gap-6 desktop, gap-4 mobile)

**Responsive Breakpoints**:
- Mobile: < 640px (vertical stack, sidebar drawer)
- Tablet: 640px - 1024px (max 2 columns, collapsible sidebar)
- Desktop: > 1024px (full layouts, fixed sidebar)

**Vertical Rhythm**:
- Major sections: py-12 (mobile) / py-20 (desktop)
- Related groups: py-6 / py-8
- Card interiors: p-4 / p-6

---

## Component Library

### Landing Page & Marketing

**Hero Section**:
- Height: 85vh (not forced 100vh)
- Background: Mining operation with wind turbines at sunset, 40% opacity dark overlay
- Centered content: headline + subheadline + CTA, max-width 700px
- Primary CTA: Large button (px-8 py-4) with subtle blurred background

**Service Cards** (3-column desktop, stack mobile):
- Grid: grid-cols-1 md:grid-cols-3 gap-8
- Cards: padding p-8, large 64px icons top, title + description

**Pricing Cards** (2 columns):
- Featured cards: 2px border, elevated shadow, "Popular" badge
- Content: Large price (48px), period (14px), feature list with checkmarks, bottom CTA

### Application Navigation

**Sidebar**:
- Logo SICREP top (64px height)
- Menu items: icon (20px) + text (14px semibold), padding py-3 px-4
- Active item: subtle background, 3px left border accent
- User profile bottom: avatar + company name + RUT (12px) + logout button

### Dashboards & Data Display

**KPI Cards**:
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Structure: 48px circular icon top-left, large value (32px bold), label (14px), optional trend badge
- Variants: standard, warning (border alert), critical (border danger)

**Progress Bars** (annual 300kg limit):
- Height 12px rounded-full, segmented with percentages
- Labels: bold current value / regular total value
- Visual alerts: 0-70% normal, 71-85% warning, 86-100% danger

**Charts** (Recharts library):
- **Bar Charts** (material breakdown): differentiated material colors, clear Y-axis scale, precise data tooltips
- **Donut Charts** (client/ESG distribution): center aggregate value (% or score), legend below with badges
- **Line Charts** (trends): subtle area under curve, data points on hover
- Responsive width 100%, preserved aspect-ratio

**Data Tables**:
- Headers: subtle background, 12px uppercase semibold, sortable with icons
- Rows: py-4 padding, subtle hover state, thin horizontal borders
- Pagination: bottom-right, show "X-Y of Z results"
- Row actions: 32px icon buttons, descriptive tooltips
- Status badges: Vigente ✅, En Proceso ⚠️, Vencido ❌

### Forms & Inputs

**Input Fields**:
- Height 44px (touch-friendly), border-radius 8px
- Labels: 14px semibold, margin-bottom 2
- States: default, focus (2px accent border), error (danger border + message), disabled (50% opacity)
- Numeric inputs: right-aligned for kg, currency values

**Select/Dropdowns**:
- Same 44px height, chevron icon right
- Options: max-height 300px scroll, search input if >10 options

**Modals** (Dispatch Registration, etc.):
- Max-width 600px (simple forms) / 900px (complex)
- Header: 20px semibold title + close button
- Body: p-6 padding, scroll if exceeds viewport
- Footer: right-aligned actions, gap-3 spacing

### Specialized Components

**Certification Workflow Timeline** (10 phases):
- Vertical stepper layout with connecting line
- Phase: numbered circle + title + description + status + SLA days
- Visual states: completed (green checkmark), current (pulsing), pending (gray), delayed (red)

**100-Point Evaluation Matrix**:
- Collapsible sections: Documentales (40), Operativos (40), Valor Agregado (20)
- Items: checkbox + criterion + assigned score / maximum
- Dynamic total progress bar with categorization (✅ ≥75, ⚠️ 60-74, ❌ <60)

**Public Digital Passport**:
- Single column max-width 600px centered
- Header: SICREP logo + large "Certificado Válido" badge
- Sections: provider info, dispatch details, materials table, blockchain hash (12px monospace)
- CTA: "Descargar Certificado PDF" button if authorized

**Provider Ranking** (Mining Dashboard):
- Columns: Name, RUT, ESG Score (large 48px circular badge), Trend (↑↓ icon + %), CO₂ Footprint, SICREP Seal (✅/⚠️/❌), Risk (badge), Actions
- Sortable by all numeric columns
- Top filters: search + dropdowns for material/region/score

---

## Images

**Landing Hero**: Panoramic mining operation with wind turbines/solar panels at sunset, dramatic orange/purple sky, 40% dark overlay for text legibility. Minimum dimensions: 1920×1080px.

**Service Section**: Illustrative icons (not photos) for 3 value propositions - use Heroicons library.

**Mining Dashboard**: Optional subtle mining facility header banner (200px height) as decorative top element.

**Operational Dashboards**: Avoid decorative images - prioritize information density.

---

## Accessibility

- Text contrast: minimum 4.5:1 (WCAG AA)
- All inputs with explicit labels
- Visible focus states (2px outline)
- Complete keyboard navigation (logical tab order)
- ARIA labels on icon buttons, interactive charts
- Semantic table headers `<th>`
- Status badges with text + icon (not visual only)

---

## Technical Specifications

- **Icons**: Heroicons via CDN (outline for navigation, solid for badges/status)
- **Charts**: Recharts library, automatic responsive configuration
- **Fonts**: Inter + JetBrains Mono via Google Fonts CDN
- **Loading States**: Skeleton screens with pulse animation for tables/charts
- **Animations**: Subtle 200ms ease transitions for hover/focus, avoid distracting animations