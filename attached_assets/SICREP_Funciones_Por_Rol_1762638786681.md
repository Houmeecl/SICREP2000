# SICREP - FUNCIONES POR ROL
## Matriz de Responsabilidades y Permisos

**Versión:** 2.0  
**Fecha:** Noviembre 2025

---

## TABLA DE CONTENIDOS

1. [Roles del Sistema](#roles)
2. [Matriz de Permisos](#permisos)
3. [Funciones Detalladas por Rol](#funciones-detalladas)
4. [Workflows por Rol](#workflows-rol)
5. [Dashboards Personalizados](#dashboards)
6. [Notificaciones por Rol](#notificaciones-rol)

---

<a name="roles"></a>
## 1. ROLES DEL SISTEMA

### 1.1 Jerarquía de Roles

```
                    SUPER_ADMIN
                         │
            ┌────────────┴────────────┐
            │                          │
      GERENTE_GENERAL          GERENTE_TECNICO
            │                          │
    ┌───────┴───────┐          ┌──────┴──────┐
    │               │          │              │
MANAGER_COMERCIAL  MANAGER_OPERACIONES  JEFE_TECNICO
    │               │                         │
    │          ┌────┴────┐              ┌────┴────┐
    │          │         │              │         │
VENDEDOR    AUDITOR  EVALUADOR   ANALISTA   MIEMBRO_COMITE
                                               │
                                          ┌────┴────┐
                                          │         │
                                      CLIENTE    VIEWER
```

### 1.2 Descripción de Roles

```yaml
SUPER_ADMIN:
  descripcion: "Control total del sistema"
  nivel: 1
  usuarios_típicos: ["CTO", "IT Manager"]
  acceso: "Completo sin restricciones"

GERENTE_GENERAL:
  descripcion: "Gestión ejecutiva y decisiones estratégicas"
  nivel: 2
  usuarios_típicos: ["CEO", "Director General"]
  acceso: "Vistas ejecutivas, aprobaciones finales"

GERENTE_TECNICO:
  descripcion: "Supervisión técnica y de calidad"
  nivel: 2
  usuarios_típicos: ["CTO", "Director Técnico"]
  acceso: "Todos los proyectos técnicos"

MANAGER_COMERCIAL:
  descripcion: "Gestión de clientes y ventas"
  nivel: 3
  usuarios_típicos: ["Jefe Comercial", "Sales Manager"]
  acceso: "CRM, pricing, pipeline comercial"

MANAGER_OPERACIONES:
  descripcion: "Supervisión de operaciones diarias"
  nivel: 3
  usuarios_típicos: ["Jefe de Operaciones"]
  acceso: "Proyectos activos, asignaciones, SLA"

JEFE_TECNICO:
  descripcion: "Supervisión técnica de evaluaciones"
  nivel: 3
  usuarios_típicos: ["Jefe de Certificación"]
  acceso: "Evaluaciones, dictámenes, comité"

AUDITOR:
  descripcion: "Realiza auditorías y evaluaciones"
  nivel: 4
  usuarios_típicos: ["Auditor REP", "Ingeniero Ambiental"]
  acceso: "Proyectos asignados, evaluaciones, reportes"

EVALUADOR:
  descripcion: "Evaluación documental y preliminar"
  nivel: 4
  usuarios_típicos: ["Analista Jr.", "Evaluador"]
  acceso: "Evaluación documentos, scoring preliminar"

ANALISTA:
  descripcion: "Análisis documental y de cumplimiento"
  nivel: 4
  usuarios_típicos: ["Analista Documental"]
  acceso: "Documentos, verificaciones, OCR"

VENDEDOR:
  descripcion: "Captación de clientes"
  nivel: 4
  usuarios_típicos: ["Ejecutivo Comercial"]
  acceso: "Leads, cotizaciones, clientes prospectos"

MIEMBRO_COMITE:
  descripcion: "Aprobación final de certificaciones"
  nivel: 3
  usuarios_típicos: ["Experto REP", "Director"]
  acceso: "Casos para aprobación, votación"

CLIENTE:
  descripcion: "Empresa que solicita certificación"
  nivel: 5
  usuarios_típicos: ["Responsable REP Cliente"]
  acceso: "Sus propios proyectos y certificados"

VIEWER:
  descripcion: "Solo lectura"
  nivel: 6
  usuarios_típicos: ["Stakeholder", "Auditor Externo"]
  acceso: "Dashboards, reportes (sin edición)"
```

---

<a name="permisos"></a>
## 2. MATRIZ DE PERMISOS

### 2.1 Permisos por Módulo

```
Leyenda:
✅ = Acceso completo (C-R-U-D)
📖 = Solo lectura (R)
✏️ = Crear y Editar (C-U)
🚫 = Sin acceso

                    │ SA │ GG │ GT │ MC │ MO │ JT │ AU │ EV │ AN │ VE │ CM │ CL │ VW │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
CLIENTES            │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │
  - Leer            │ ✅ │ ✅ │ 📖 │ ✅ │ 📖 │ 📖 │ 📖 │ 📖 │ 📖 │ ✅ │ 📖 │ 📖 │ 📖 │
  - Editar          │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │
  - Eliminar        │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
PROYECTOS           │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │
  - Leer            │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 📖 │ ✅ │ ✅ │ 📖 │
  - Editar          │ ✅ │ ✅ │ ✅ │ 🚫 │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Avanzar Fase    │ ✅ │ ✅ │ ✅ │ 🚫 │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │
  - Eliminar        │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
DOCUMENTOS          │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Subir           │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │
  - Leer            │ ✅ │ ✅ │ ✅ │ 📖 │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ ✅ │ ✅ │ 📖 │
  - Aprobar         │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Rechazar        │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Eliminar        │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
AUDITORÍAS          │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ ✅ │ 🚫 │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Leer            │ ✅ │ ✅ │ ✅ │ 📖 │ ✅ │ ✅ │ ✅ │ ✅ │ 📖 │ 🚫 │ ✅ │ 📖 │ 📖 │
  - Evaluar         │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Aprobar         │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
CERTIFICADOS        │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Crear           │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Leer            │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 📖 │ 📖 │ 🚫 │ ✅ │ ✅ │ 📖 │
  - Renovar         │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ ✅ │ 🚫 │
  - Revocar         │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Suspender       │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
REPORTES            │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Ejecutivos      │ ✅ │ ✅ │ 📖 │ ✅ │ 📖 │ 📖 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 📖 │ 🚫 │ 📖 │
  - Operacionales   │ ✅ │ ✅ │ ✅ │ 📖 │ ✅ │ ✅ │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 📖 │
  - Financieros     │ ✅ │ ✅ │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
CONFIGURACIÓN       │    │    │    │    │    │    │    │    │    │    │    │    │    │
  - Usuarios        │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Sistema         │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Workflows       │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
  - Templates       │ ✅ │ ✅ │ ✅ │ 🚫 │ 🚫 │ ✅ │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │ 🚫 │
```

**Leyenda de abreviaciones:**
- SA = SUPER_ADMIN
- GG = GERENTE_GENERAL
- GT = GERENTE_TECNICO
- MC = MANAGER_COMERCIAL
- MO = MANAGER_OPERACIONES
- JT = JEFE_TECNICO
- AU = AUDITOR
- EV = EVALUADOR
- AN = ANALISTA
- VE = VENDEDOR
- CM = MIEMBRO_COMITE
- CL = CLIENTE
- VW = VIEWER

---

<a name="funciones-detalladas"></a>
## 3. FUNCIONES DETALLADAS POR ROL

### 3.1 SUPER_ADMIN

```yaml
Responsabilidades:
  - Administración completa del sistema
  - Gestión de usuarios y roles
  - Configuración de sistema
  - Backup y recuperación
  - Monitoreo de infraestructura
  - Resolución de incidencias críticas

Funciones Clave:
  usuarios:
    - Crear/editar/eliminar usuarios
    - Asignar/modificar roles
    - Resetear contraseñas
    - Suspender/activar cuentas
  
  sistema:
    - Configuración de parámetros globales
    - Gestión de integraciones
    - Configuración de notificaciones
    - Gestión de logs
    - Monitoreo de performance
  
  datos:
    - Backup manual/automático
    - Restauración de datos
    - Migración de datos
    - Auditoría de accesos

Accesos Especiales:
  - Base de datos directa
  - Servidor de aplicaciones
  - Logs del sistema
  - Métricas de Prometheus
  - Grafana dashboards

KPIs Monitoreados:
  - Uptime del sistema (objetivo: 99.9%)
  - Performance API (p95 < 200ms)
  - Errores críticos (objetivo: 0)
  - Uso de recursos (CPU, memoria)
```

### 3.2 GERENTE_GENERAL

```yaml
Responsabilidades:
  - Supervisión general del negocio
  - Decisiones estratégicas
  - Aprobación de políticas
  - Revisión de resultados ejecutivos

Funciones Clave:
  dashboard:
    - Vista ejecutiva con KPIs principales
    - Revenue y forecast
    - Client retention
    - Team performance
  
  aprobaciones:
    - Políticas y procedimientos
    - Contratos importantes (> $1M CLP)
    - Excepciones a reglas de negocio
    - Sanciones o revocaciones críticas
  
  reportes:
    - Reporte ejecutivo mensual
    - Análisis de mercado
    - Benchmarks vs competencia
    - Proyecciones financieras

Decisiones Clave:
  - Aprobación final de certificaciones críticas
  - Revocación de certificados
  - Cambios en políticas de pricing
  - Expansión a nuevos sectores

KPIs Monitoreados:
  - Revenue mensual vs objetivo
  - Número de clientes activos
  - Tasa de renovación
  - NPS (Net Promoter Score)
  - Margen de contribución
```

### 3.3 GERENTE_TECNICO

```yaml
Responsabilidades:
  - Supervisión técnica de certificaciones
  - Garantía de calidad de auditorías
  - Capacitación de equipo técnico
  - Actualización de metodologías

Funciones Clave:
  supervisión:
    - Revisar dictámenes técnicos
    - Aprobar auditorías complejas
    - Resolver disputas técnicas
    - Validar metodologías de evaluación
  
  calidad:
    - Auditorías internas aleatorias
    - Revisión de reportes
    - Calibración de evaluadores
    - Control de cumplimiento de estándares
  
  mejora_continua:
    - Actualizar criterios de evaluación
    - Proponer mejoras a procesos
    - Capacitar al equipo
    - Benchmarking técnico

Tareas Diarias:
  - Revisar 2-3 dictámenes técnicos
  - Resolver consultas de auditores
  - Participar en comité de certificación
  - Revisar casos complejos

KPIs Monitoreados:
  - Quality score promedio (objetivo: > 8.5/10)
  - Tasa de apelaciones (objetivo: < 5%)
  - Tiempo de resolución técnica
  - Satisfacción de auditores
```

### 3.4 MANAGER_COMERCIAL

```yaml
Responsabilidades:
  - Gestión del pipeline comercial
  - Estrategia de ventas
  - Relaciones con clientes
  - Pricing y cotizaciones

Funciones Clave:
  ventas:
    - Gestionar leads y oportunidades
    - Cotizaciones y propuestas
    - Negociación de contratos
    - Cierre de ventas
  
  clientes:
    - Onboarding de nuevos clientes
    - Gestión de cuentas clave
    - Upselling y cross-selling
    - Renovaciones anticipadas
  
  equipo:
    - Supervisión de vendedores
    - Asignación de cuentas
    - Capacitación comercial
    - Cumplimiento de metas

Herramientas:
  - CRM completo
  - Pipeline de ventas
  - Calculadora de pricing
  - Reportes comerciales
  - Dashboard de conversión

KPIs Monitoreados:
  - Revenue mensual
  - Tasa de conversión (objetivo: > 25%)
  - Ticket promedio
  - CAC (Customer Acquisition Cost)
  - LTV (Lifetime Value)
  - Churn rate (objetivo: < 5%)
```

### 3.5 MANAGER_OPERACIONES

```yaml
Responsabilidades:
  - Supervisión de operaciones diarias
  - Asignación de recursos
  - Cumplimiento de SLA
  - Optimización de procesos

Funciones Clave:
  asignaciones:
    - Asignar proyectos a auditores/evaluadores
    - Balancear carga de trabajo
    - Priorizar proyectos urgentes
    - Coordinar visitas en terreno
  
  seguimiento:
    - Monitorear SLA de proyectos
    - Identificar bottlenecks
    - Resolver bloqueos operacionales
    - Escalar problemas
  
  optimización:
    - Analizar tiempos de proceso
    - Proponer mejoras operativas
    - Automatización de tareas
    - Reducir costos operacionales

Dashboard:
  - Proyectos activos por fase
  - Proyectos atrasados (alarmas)
  - Carga de trabajo por persona
  - Proyectos próximos a vencer
  - Eficiencia operacional

KPIs Monitoreados:
  - SLA compliance (objetivo: > 95%)
  - Tiempo promedio por fase
  - Utilización de recursos (objetivo: 75-85%)
  - Proyectos completados/mes
  - Tasa de error operacional
```

### 3.6 JEFE_TECNICO

```yaml
Responsabilidades:
  - Supervisión técnica de equipo
  - Revisión de dictámenes
  - Participación en comité
  - Resolución de casos complejos

Funciones Clave:
  revisión:
    - Revisar dictámenes técnicos
    - Validar evaluaciones
    - Aprobar reportes de auditoría
    - Resolver consultas técnicas
  
  comité:
    - Preparar casos para comité
    - Presentar dictámenes
    - Participar en votaciones
    - Implementar resoluciones
  
  capacitación:
    - Entrenar auditores nuevos
    - Actualizar criterios de evaluación
    - Compartir best practices
    - Mentoring técnico

Casos que Maneja:
  - Proyectos con score 60-75 (zona crítica)
  - Apelaciones de clientes
  - Casos con observaciones de comité
  - Renovaciones con cambios significativos

KPIs Monitoreados:
  - Tiempo de revisión (objetivo: < 24 hrs)
  - Dictámenes aprobados por comité (objetivo: > 90%)
  - Satisfacción de auditores
  - Casos resueltos sin escalamiento
```

### 3.7 AUDITOR

```yaml
Responsabilidades:
  - Realizar auditorías en terreno
  - Evaluar cumplimiento operativo
  - Generar reportes de auditoría
  - Capturar evidencias

Funciones Clave:
  auditoría:
    - Realizar visitas en terreno
    - Evaluar 40 puntos operativos
    - Entrevistar personal del cliente
    - Inspeccionar instalaciones
    - Capturar fotos geolocalizadas
  
  evaluación:
    - Aplicar checklist de auditoría
    - Asignar puntajes por criterio
    - Identificar no conformidades
    - Recomendar mejoras
  
  reportes:
    - Generar reporte preliminar
    - Elaborar informe detallado
    - Documentar evidencias
    - Presentar hallazgos

Herramientas:
  - App móvil de auditoría
  - Checklist digital
  - Cámara con geolocalización
  - Firma digital
  - Modo offline

Workflow Típico:
  1. Recibir asignación de proyecto
  2. Revisar documentación previa
  3. Coordinar visita con cliente
  4. Realizar auditoría en terreno (2-4 hrs)
  5. Completar evaluación en app
  6. Sincronizar datos
  7. Completar reporte (1-2 días)
  8. Enviar a Jefe Técnico

KPIs Personales:
  - Auditorías completadas/mes (objetivo: 15-20)
  - Tiempo promedio por auditoría
  - Calidad de reportes (peer review)
  - Satisfacción del cliente post-visita
```

### 3.8 EVALUADOR

```yaml
Responsabilidades:
  - Evaluación documental
  - Análisis preliminar
  - Scoring de criterios documentales
  - Preparación de casos

Funciones Clave:
  evaluación_documental:
    - Revisar documentos legales
    - Evaluar 40 puntos documentales
    - Verificar políticas y procedimientos
    - Validar trazabilidad de información
  
  análisis:
    - Calcular score preliminar
    - Identificar brechas
    - Recomendar documentos adicionales
    - Preparar para visita en terreno
  
  seguimiento:
    - Solicitar documentos faltantes
    - Dar seguimiento a observaciones
    - Actualizar estado de proyecto
    - Notificar a clientes

Herramientas:
  - Sistema de gestión documental
  - OCR automático
  - Plantillas de evaluación
  - Dashboard de documentos

Workflow Típico:
  1. Recibir proyecto asignado
  2. Descargar documentos del cliente
  3. Verificar completitud (checklist)
  4. Evaluar criterios documentales
  5. Calcular score documental (40 pts)
  6. Solicitar documentos faltantes (si aplica)
  7. Generar reporte preliminar
  8. Avanzar a siguiente fase o solicitar info

KPIs Personales:
  - Proyectos evaluados/semana (objetivo: 10-15)
  - Tiempo promedio de evaluación
  - Precisión en evaluación (vs auditoría final)
  - Tasa de rechazo documental
```

### 3.9 ANALISTA

```yaml
Responsabilidades:
  - Análisis documental detallado
  - Verificación de autenticidad
  - OCR y extracción de datos
  - Validación de cumplimiento legal

Funciones Clave:
  verificación:
    - Validar RUT en SII
    - Verificar vigencia de certificados
    - Confirmar inscripción RETC
    - Revisar historial SMA
  
  análisis:
    - Revisar políticas de sostenibilidad
    - Analizar procedimientos operativos
    - Evaluar sistemas de trazabilidad
    - Verificar registros de capacitación
  
  documentación:
    - Organizar documentos por categoría
    - Extraer información clave
    - Completar fichas de proyecto
    - Preparar documentación para auditoría

Herramientas:
  - OCR automation
  - Integraciones con SII, RETC, SMA
  - Sistema de clasificación con IA
  - Dashboard documental

Casos Especiales:
  - Documentos en idiomas extranjeros
  - Certificaciones internacionales
  - Estructuras societarias complejas
  - Casos con observaciones previas

KPIs Personales:
  - Documentos procesados/día (objetivo: 30-40)
  - Precisión de OCR (objetivo: > 95%)
  - Tiempo de verificación
  - Documentos rechazados justificadamente
```

### 3.10 VENDEDOR

```yaml
Responsabilidades:
  - Prospección de clientes
  - Generación de leads
  - Cotizaciones
  - Cierre de ventas

Funciones Clave:
  prospección:
    - Identificar empresas target
    - Contacto inicial (email, llamada)
    - Calificación de leads (BANT)
    - Agendar reuniones
  
  ventas:
    - Presentar SICREP al cliente
    - Generar cotizaciones
    - Negociar términos
    - Cerrar venta
  
  seguimiento:
    - Actualizar CRM
    - Seguimiento post-venta inicial
    - Solicitar referidos
    - Identificar upsell

Herramientas:
  - CRM (Salesforce/HubSpot)
  - Calculadora de pricing
  - Material comercial (decks, brochures)
  - Email templates

Metas Mensuales:
  - Leads generados: 50+
  - Reuniones agendadas: 20+
  - Cotizaciones enviadas: 15+
  - Ventas cerradas: 5+
  - Revenue: $3,000,000 CLP+

KPIs Personales:
  - Conversion rate (lead → venta)
  - Revenue mensual
  - Ticket promedio
  - Tiempo de cierre
  - Satisfacción del cliente (onboarding)
```

### 3.11 MIEMBRO_COMITE

```yaml
Responsabilidades:
  - Evaluar casos presentados
  - Votar en decisiones colegiadas
  - Aportar expertise técnico
  - Garantizar imparcialidad

Funciones Clave:
  revisión:
    - Estudiar casos asignados
    - Revisar dictámenes técnicos
    - Analizar evidencias
    - Preparar preguntas
  
  sesión:
    - Participar en reuniones semanales
    - Deliberar sobre casos
    - Emitir voto fundado
    - Proponer recomendaciones
  
  seguimiento:
    - Revisar implementación de decisiones
    - Validar cumplimiento de condiciones
    - Aportar en casos de apelación

Perfil Requerido:
  - Experiencia: 5+ años en REP o ambiente
  - Título profesional: Ingeniería/Ambiental/Legal
  - Conocimiento: Ley 20.920 y Decretos REP
  - Certificaciones: Deseable ISO 14001 Lead Auditor

Compromiso de Tiempo:
  - Reunión semanal: 2-3 horas
  - Revisión de casos: 3-5 horas/semana
  - Casos especiales: según demanda

Compensación:
  - Por sesión: $150,000 CLP
  - Por caso complejo: $50,000 CLP adicional
```

### 3.12 CLIENTE

```yaml
Responsabilidades:
  - Proporcionar documentación
  - Responder a solicitudes
  - Facilitar visitas en terreno
  - Mantener condiciones de certificación

Funciones Disponibles:
  proyectos:
    - Ver estado de proyectos propios
    - Subir documentos solicitados
    - Responder observaciones
    - Ver timeline y próximos pasos
  
  certificados:
    - Descargar certificados vigentes
    - Descargar QR codes
    - Ver historial de certificaciones
    - Solicitar renovación
  
  comunicación:
    - Chat con gestor de proyecto
    - Notificaciones de cambios de estado
    - Recordatorios automáticos
    - Acceso a portal de ayuda

Portal del Cliente:
  - Dashboard personalizado
  - Estado de certificación en tiempo real
  - Documentos pendientes
  - Próximas visitas agendadas
  - Histórico de comunicaciones

Notificaciones que Recibe:
  - Proyecto iniciado
  - Documentos solicitados
  - Documentos aprobados/rechazados
  - Visita agendada (48 hrs antes)
  - Certificado emitido
  - Recordatorio de renovación
  - Certificado próximo a vencer
```

### 3.13 VIEWER

```yaml
Responsabilidades:
  - Solo visualización
  - No puede modificar datos
  - Acceso a reportes específicos

Funciones Disponibles:
  dashboards:
    - Ver dashboards públicos
    - Ver métricas agregadas
    - Exportar reportes
  
  reportes:
    - Descargar reportes generados
    - Ver gráficos y estadísticas
    - Acceder a benchmarks públicos

Casos de Uso:
  - Auditor externo
  - Stakeholder de cliente
  - Regulador gubernamental (con acceso específico)
  - Prensa (información pública)
  - Investigador académico

Restricciones:
  - NO puede ver datos sensibles de clientes
  - NO puede ver información financiera
  - Solo datos agregados/anonimizados
  - Audit trail de todos los accesos
```

---

<a name="workflows-rol"></a>
## 4. WORKFLOWS POR ROL

### 4.1 Workflow del Auditor

```
LUNES:
08:00 - Login al sistema
08:15 - Revisar proyectos asignados para la semana
08:30 - Descargar documentación de proyecto del martes
09:00 - Preparar checklist de auditoría
10:00 - Coordinación con cliente (llamada)
11:00 - Planificar ruta de visitas
12:00 - Revisar casos pendientes
13:00 - ALMUERZO
14:00 - Completar reportes de visitas previas
16:00 - Reunión de equipo técnico
17:00 - Actualizar estado de proyectos
18:00 - Fin de jornada

MARTES (DÍA DE TERRENO):
07:00 - Salida a terreno
09:00 - VISITA CLIENTE 1 (2-3 hrs)
     - Check-in geolocalizado
     - Entrevista con responsable REP
     - Recorrido por instalaciones
     - Evaluación de criterios operativos
     - Captura de evidencias (fotos)
     - Firma digital del cliente
12:00 - Almuerzo en ruta
13:00 - VISITA CLIENTE 2 (2-3 hrs)
16:00 - Regreso a oficina
17:00 - Sincronización de datos
17:30 - Completar evaluaciones preliminares
18:30 - Fin de jornada

MIÉRCOLES:
08:00 - Login al sistema
08:30 - Elaborar reporte de visita 1
10:30 - Elaborar reporte de visita 2
12:30 - Enviar reportes a Jefe Técnico
13:00 - ALMUERZO
14:00 - Atender observaciones de reportes previos
16:00 - Planificar visitas de próxima semana
17:00 - Actualizar sistema
18:00 - Fin de jornada

JUEVES:
08:00 - Login al sistema
08:30 - Revisión de documentación para viernes
10:00 - Responder consultas de clientes
11:00 - Preparar material de visita
12:00 - Calibración con otros auditores (peer review)
13:00 - ALMUERZO
14:00 - Capacitación técnica (si aplica)
16:00 - Casos complejos con Jefe Técnico
17:30 - Actualizar sistema
18:00 - Fin de jornada

VIERNES (DÍA DE TERRENO):
07:00 - Salida a terreno
[Similar a martes]
```

### 4.2 Workflow del Evaluador

```
LUNES A VIERNES:
08:00 - Login al sistema
08:15 - Revisar proyectos asignados
08:30 - PROYECTO 1: Revisión documental
     - Descargar documentos (10 min)
     - Verificar completitud (15 min)
     - Evaluar criterios documentales (30 min)
     - Calcular score preliminar (5 min)
     - Solicitar documentos faltantes (10 min)
     - Actualizar sistema (10 min)
10:00 - PROYECTO 2: Revisión documental
     [Repetir proceso]
11:20 - PROYECTO 3: Revisión documental
     [Repetir proceso]
12:30 - ALMUERZO
13:30 - PROYECTO 4: Revisión documental
15:00 - PROYECTO 5: Revisión documental
16:30 - Atender consultas de clientes
17:00 - Seguimiento de proyectos pendientes
17:30 - Actualizar reportes
18:00 - Fin de jornada

META SEMANAL:
- 10-15 proyectos evaluados completamente
- Todos los documentos del día procesados
- Responder todas las consultas de clientes
```

### 4.3 Workflow del Gerente Técnico

```
LUNES:
08:00 - Revisar dashboard de proyectos
08:30 - Reunión con equipo técnico
09:30 - Revisar dictámenes pendientes (2-3 casos)
12:00 - Resolver consultas técnicas escaladas
13:00 - ALMUERZO
14:00 - Preparar casos para comité del miércoles
16:00 - Revisar métricas de calidad
17:00 - Planificar semana técnica
18:00 - Fin de jornada

MIÉRCOLES:
08:00 - Revisar casos de comité
09:00 - Preparar presentaciones
10:00 - REUNIÓN COMITÉ DE CERTIFICACIÓN (2-3 hrs)
     - Presentar 5-10 casos
     - Responder preguntas
     - Facilitar votación
     - Registrar decisiones
13:00 - ALMUERZO
14:00 - Implementar decisiones de comité
16:00 - Notificar a clientes y equipo
17:00 - Actualizar sistema
18:00 - Fin de jornada
```

---

<a name="dashboards"></a>
## 5. DASHBOARDS PERSONALIZADOS POR ROL

### 5.1 Dashboard Ejecutivo (Gerente General)

```yaml
Widgets:
  1. Revenue Card:
     - Revenue del mes
     - vs mes anterior
     - vs objetivo
     - Tendencia (gráfico sparkline)
  
  2. Clients Card:
     - Total clientes activos
     - Nuevos del mes
     - Churn del mes
     - Tendencia
  
  3. Certificates Card:
     - Certificados emitidos (mes)
     - Renovaciones (mes)
     - Por vencer (30 días)
  
  4. SLA Compliance:
     - % cumplimiento
     - Proyectos on-time
     - Proyectos en riesgo
  
  5. Revenue Chart (últimos 12 meses):
     - Línea de revenue real
     - Línea de objetivo
     - Forecast próximos 3 meses
  
  6. Pipeline Comercial:
     - Leads → Oportunidades → Cerrados
     - Conversion rates
     - Revenue pipeline
  
  7. Top Clients:
     - Top 10 por revenue
     - Estado de certificación
     - Próximas renovaciones
  
  8. Team Performance:
     - Proyectos completados por persona
     - Calidad promedio
     - Satisfacción del cliente
```

### 5.2 Dashboard Operacional (Manager Operaciones)

```yaml
Widgets:
  1. Proyectos Activos por Fase:
     - Distribución en gráfico de barras
     - Bottlenecks destacados
  
  2. SLA Tracker:
     - Proyectos on-time (verde)
     - Proyectos en riesgo (amarillo)
     - Proyectos atrasados (rojo)
  
  3. Carga de Trabajo:
     - Por auditor/evaluador
     - Disponibilidad
     - Balance de carga
  
  4. Próximas Visitas:
     - Calendario de visitas (próximos 7 días)
     - Auditor asignado
     - Estado de coordinación
  
  5. Alertas:
     - Proyectos que requieren atención
     - Documentos pendientes > 3 días
     - SLA a punto de incumplirse
  
  6. Throughput:
     - Proyectos completados/semana
     - Tiempo promedio por fase
     - Eficiencia operacional
```

### 5.3 Dashboard Técnico (Jefe Técnico / Gerente Técnico)

```yaml
Widgets:
  1. Dictámenes Pendientes:
     - Lista de casos por revisar
     - Prioridad
     - Días en cola
  
  2. Distribución de Scores:
     - Histograma de puntajes
     - Verde/Amarillo/Rojo
     - Promedio móvil
  
  3. Casos Complejos:
     - Proyectos con score 60-75
     - Apelaciones activas
     - Casos con observaciones
  
  4. Quality Metrics:
     - Quality score promedio
     - Tasa de apelaciones
     - Satisfacción de clientes
  
  5. Próximas Sesiones Comité:
     - Fecha próxima sesión
     - Casos agendados
     - Documentos preparados
  
  6. Team Performance:
     - Auditores por # de auditorías
     - Calidad de reportes
     - Tiempo de revisión
```

### 5.4 Dashboard del Auditor

```yaml
Widgets:
  1. Mis Proyectos Activos:
     - Lista de proyectos asignados
     - Estado actual
     - Próximas acciones
  
  2. Próximas Visitas:
     - Calendario de visitas (próximos 14 días)
     - Cliente, dirección, hora
     - Documentos a revisar
  
  3. Reportes Pendientes:
     - Visitas realizadas sin reporte
     - Días transcurridos
     - Deadline
  
  4. Mis Estadísticas:
     - Auditorías completadas (mes)
     - Score promedio de mis auditorías
     - Satisfacción del cliente
     - Tiempo promedio
  
  5. Tareas del Día:
     - Checklist de tareas
     - Prioridades
     - Deadlines
```

### 5.5 Dashboard del Cliente

```yaml
Widgets:
  1. Estado de Certificación:
     - Estado actual
     - Progreso visual
     - Próximo paso
  
  2. Mis Certificados:
     - Certificados activos
     - Fecha de vencimiento
     - Opción de descargar
  
  3. Documentos Pendientes:
     - Lista de documentos solicitados
     - Fecha límite
     - Botón de subir
  
  4. Próximas Actividades:
     - Visitas agendadas
     - Plazos de entrega
     - Reuniones
  
  5. Timeline:
     - Historial del proyecto
     - Hitos completados
     - Próximos hitos
  
  6. Contacto:
     - Gestor de proyecto asignado
     - Email / teléfono
     - Botón de chat
```

---

<a name="notificaciones-rol"></a>
## 6. NOTIFICACIONES POR ROL

### 6.1 Matriz de Notificaciones

```
Evento                          │ SA │ GG │ GT │ MC │ MO │ JT │ AU │ EV │ AN │ VE │ CM │ CL │
────────────────────────────────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
Nuevo cliente registrado        │ 📧 │ 📧 │    │ 📧 │    │    │    │    │    │    │    │    │
Nuevo proyecto creado           │    │    │    │ 📧 │ 📧 │ 📧 │    │    │    │    │    │ 📧 │
Proyecto asignado a auditor     │    │    │    │    │    │ 📧 │ 📧 │    │    │    │    │    │
Documento subido por cliente    │    │    │    │    │ 📧 │    │    │ 📧 │ 📧 │    │    │    │
Documento aprobado              │    │    │    │    │    │    │    │ 📧 │    │    │    │ 📧 │
Documento rechazado             │    │    │    │    │ 📧 │ 📧 │    │ 📧 │    │    │    │ 📧 │
Visita programada               │    │    │    │    │ 📧 │ 📧 │ 📧 │    │    │    │    │ 📧 │
Auditoría completada            │    │    │ 📧 │    │ 📧 │ 📧 │    │    │    │    │    │ 📧 │
Dictamen técnico listo          │    │    │ 📧 │    │    │ 📧 │ 📧 │    │    │    │    │    │
Caso para comité                │    │ 📧 │ 📧 │    │    │ 📧 │    │    │    │    │ 📧 │    │
Comité aprobó/rechazó           │    │ 📧 │ 📧 │    │ 📧 │ 📧 │ 📧 │    │    │    │ 📧 │ 📧 │
Certificado emitido             │    │ 📧 │    │ 📧 │    │    │    │    │    │    │    │ 📧 │
Proyecto atrasado (SLA)         │ 📧 │ 📧 │ 📧 │    │ 📧 │ 📧 │ 📧 │    │    │    │    │    │
Certificado por vencer (30d)    │    │    │    │ 📧 │    │    │    │    │    │    │    │ 📧 │
Certificado vencido             │    │ 📧 │    │ 📧 │    │    │    │    │    │    │    │ 📧 │
Error crítico del sistema       │ 📧 │ 📧 │    │    │    │    │    │    │    │    │    │    │
```

**Leyenda:**
- 📧 = Email notification
- Algunos roles reciben también notificaciones en el dashboard (indicador numérico)

---

**Documento generado:** Noviembre 2025  
**Versión:** 2.0  
**Próxima revisión:** Febrero 2026
