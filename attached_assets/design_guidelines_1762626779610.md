# Guía de Diseño - SICREP Sistema Integral de Certificación REP

## Enfoque de Diseño

**Sistema Híbrido**: Diseño empresarial basado en Material Design 3 para áreas de aplicación (dashboards, gestión) + diseño marketing inspirado en plataformas SaaS B2B (landing page).

**Principios Rectores**:
- **Jerarquía de Datos Clara**: Información regulatoria crítica siempre visible y destacada
- **Eficiencia Operativa**: Minimizar clics para tareas frecuentes (registro despachos, validaciones)
- **Confianza Institucional**: Diseño profesional que refleja seriedad regulatoria
- **Densidad Informativa Balanceada**: Mucha data sin saturación visual

## Tipografía

**Familias de Fuente**:
- **Primaria**: Inter (via Google Fonts CDN) - toda la interfaz
- **Datos Numéricos**: JetBrains Mono para códigos (CPS-C-001, tags NFC)

**Jerarquía Tipográfica**:
- **H1 Hero**: 48px/56px bold - landing page headlines
- **H1 Dashboard**: 32px/40px semibold - títulos principales dashboards
- **H2 Secciones**: 24px/32px semibold - títulos de secciones/cards
- **H3 Subsecciones**: 18px/24px semibold - subtítulos
- **Body Principal**: 16px/24px regular - contenido general
- **Body Secundario**: 14px/20px regular - descripciones, metadata
- **Labels/Captions**: 12px/16px medium - etiquetas formularios, legendas gráficos
- **Datos Críticos** (peso kg, scores): 20px/28px bold números + 14px unidades
- **Códigos Técnicos**: 14px/20px monospace (CPS, RUT, hashes)

## Sistema de Layout

**Unidades de Espaciado Tailwind**: Usar consistentemente unidades 2, 4, 6, 8, 12, 16, 20, 24 (p-4, m-8, gap-6, etc.)

**Estructura Base**:
- **Sidebar Navegación**: Fixed width 280px desktop, collapse a 72px (solo íconos) tablet, drawer móvil
- **Contenido Principal**: max-width contenedor 1440px, padding horizontal responsive (px-4 móvil, px-8 desktop)
- **Dashboards**: Grid system 12 columnas, gaps consistentes (gap-6 desktop, gap-4 móvil)

**Responsive Breakpoints**:
- Mobile: < 640px (stack vertical, sidebar drawer)
- Tablet: 640px - 1024px (2 columnas máx, sidebar colapsable)
- Desktop: > 1024px (layouts completos, sidebar full)

**Espaciado Vertical Secciones**:
- Entre secciones mayores: py-12 (móvil) / py-20 (desktop)
- Entre grupos relacionados: py-6 / py-8
- Dentro de cards: p-4 / p-6

## Biblioteca de Componentes

### Landing Page & Marketing

**Hero Section**:
- Altura: 85vh (no forzar 100vh)
- Imagen fondo: Operación minera con turbinas eólicas al atardecer, overlay oscuro 40% opacidad
- Contenido centrado: headline + subheadline + CTA button, max-width 700px
- CTA principal: botón grande (px-8 py-4) con fondo blurred subtle

**Secciones Servicios** (3 cards horizontal desktop, stack móvil):
- Grid: grid-cols-1 md:grid-cols-3 gap-8
- Cards: padding p-8, íconos grandes 64px top, título + descripción

**Pricing Cards** (2 columnas):
- Cards destacadas: border 2px, shadow elevado, badge "Popular"
- Contenido: precio grande (48px), período (14px), lista features con checkmarks, CTA bottom

### Navegación Aplicación

**Sidebar**:
- Logo SICREP top (64px height)
- Items menú: ícono (20px) + texto (14px semibold), padding py-3 px-4
- Ítem activo: fondo subtle, borde izquierdo 3px accent
- Perfil usuario bottom: avatar + nombre empresa + RUT (12px) + logout button

**Top Bar** (opcional según rol):
- Height 64px, breadcrumbs + búsqueda global + notificaciones + avatar

### Dashboards & Data Display

**KPI Cards** (Provider/Consumer dashboards):
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Card structure: ícono circular 48px top-left, valor grande (32px bold), label (14px), tendencia badge opcional
- Variantes: estándar, alerta (borde warning), crítico (borde danger)

**Progress Bars** (límite anual 300kg):
- Height 12px rounded-full, segmentos con porcentajes
- Labels: valor actual bold / valor total regular
- Alertas visuales: 0-70% normal, 71-85% warning, 86-100% danger

**Charts** (Recharts library):
- **Bar Charts** (desglose materiales): colores diferenciados por material, eje Y escala clara, tooltips con datos precisos
- **Donut Charts** (distribución clientes/ESG): centro con valor agregado (% o score), leyenda debajo con badges
- **Line Charts** (tendencias): área bajo curva subtle, puntos datos en hover
- Container charts: aspect-ratio preservado, responsive width 100%

**Tablas de Datos**:
- Headers: fondo subtle, texto 12px uppercase semibold, ordenables con íconos
- Rows: padding py-4, hover state subtle, borders horizontales delgadas
- Paginación: bottom-right, mostrar "X-Y de Z resultados"
- Acciones row: íconos buttons 32px, tooltips descriptivos
- Estados: badges para status (Vigente ✅, En Proceso ⚠️, Vencido ❌)

### Formularios & Inputs

**Campos Input**:
- Height 44px (touch-friendly), border radius 8px
- Labels: 14px semibold, margin-bottom 2
- Estados: default, focus (border accent 2px), error (border danger + mensaje), disabled (opacity 50%)
- Inputs numéricos: align right para valores kg, moneda

**Select/Dropdowns**:
- Mismo height 44px, chevron icon right
- Opciones: max-height 300px scroll, search input si >10 opciones

**Modals** (Registro Despacho, etc.):
- Max-width 600px (formularios simples) / 900px (complejos)
- Header: título 20px semibold + close button
- Body: padding p-6, scroll si excede viewport
- Footer: acciones alineadas right, spacing gap-3

### Componentes Especializados

**Workflow Timeline** (10 Fases Certificación):
- Layout: vertical stepper con línea conectora
- Fase: círculo numerado + título + descripción + estado + SLA días
- Estados visuales: completado (checkmark verde), actual (pulsing), pendiente (gris), atrasado (rojo)

**Matriz Evaluación 100 Puntos**:
- Secciones colapsables: Documentales (40), Operativos (40), Valor Agregado (20)
- Items: checkbox + criterio + puntaje asignado / máximo
- Progress bar total: acumulado dinámico con categorización (✅ ≥75, ⚠️ 60-74, ❌ <60)

**Pasaporte Digital Público**:
- Layout: single column max-width 600px centrado
- Header: logo SICREP + badge "Certificado Válido" grande
- Secciones: proveedor info, despacho detalles, tabla materiales, blockchain hash (monospace 12px)
- CTA: botón "Descargar Certificado PDF" si autorizado

**Ranking Proveedores** (Dashboard Minería):
- Columnas: Nombre, RUT, Score ESG (badge grande 48px circular), Tendencia (↑↓ ícono + %), Huella CO₂, Sello SICREP (✅/⚠️/❌), Riesgo (badge), Acciones
- Ordenable por todas columnas numéricas
- Filtros top: búsqueda + dropdowns material/región/score

## Imágenes

**Landing Page Hero**: Imagen panorámica operación minera con turbinas eólicas/paneles solares al atardecer, cielo dramático naranja/púrpura, overlay oscuro 40% para legibilidad texto. Dimensiones recomendadas: 1920×1080px mínimo.

**Sección Servicios**: Íconos ilustrativos (no fotos) para las 3 propuestas valor - usar librería Heroicons.

**Dashboard Minería**: Opcional imagen header subtle de instalación minera moderna como banner decorativo top (height 200px).

**Otros**: No usar imágenes decorativas en dashboards operativos - priorizar densidad informativa.

## Accesibilidad

- Contraste texto: mínimo 4.5:1 (WCAG AA)
- Todos inputs con labels explícitos
- Estados focus visibles (outline 2px)
- Navegación completa por teclado (tab order lógico)
- ARIA labels en íconos buttons, gráficos interactivos
- Tablas con headers semánticos <th>
- Badges status con texto + ícono (no solo visual)

## Especificaciones Técnicas

- **Íconos**: Heroicons vía CDN (outline para navegación, solid para badges/status)
- **Charts**: Recharts library, configuración responsive automática
- **Fonts**: Inter + JetBrains Mono vía Google Fonts CDN
- **Estados Loading**: Skeleton screens con pulse animation para tablas/charts
- **Animaciones**: Transiciones sutiles 200ms ease para hover/focus, evitar animaciones distractoras