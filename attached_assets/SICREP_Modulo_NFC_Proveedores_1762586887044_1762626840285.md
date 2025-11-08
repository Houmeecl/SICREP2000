# SICREP - MÓDULO DE CERTIFICACIÓN NFC
## Para Proveedores de Embalajes REP

**Versión:** 3.0  
**Fecha:** Noviembre 2025  
**Tecnología:** NFC + Blockchain + API REST

---

## TABLA DE CONTENIDOS

1. [Introducción al Módulo NFC](#introduccion)
2. [¿Qué es la Tecnología NFC?](#tecnologia-nfc)
3. [Arquitectura del Sistema](#arquitectura)
4. [Flujo de Certificación de Embalajes](#flujo-certificacion)
5. [Portal del Proveedor](#portal-proveedor)
6. [Especificaciones Técnicas NFC](#especificaciones-tecnicas)
7. [Proceso de Integración](#integracion)
8. [API del Módulo Proveedor](#api)
9. [App Móvil de Validación](#app-movil)
10. [Precios y Planes](#precios)

---

<a name="introduccion"></a>
## 1. INTRODUCCIÓN AL MÓDULO NFC

### 1.1 Visión General

El **Módulo de Certificación NFC** es una extensión innovadora de SICREP que permite a los **proveedores de embalajes** certificar productos individuales mediante tecnología NFC (Near Field Communication). Esta funcionalidad complementa el sistema existente de certificación empresarial, llevando la trazabilidad a nivel de producto.

**¿Qué problema resuelve?**

Los proveedores certificados REP necesitan demostrar que **cada lote** y **cada producto** cumple con los estándares de la Ley REP. El sistema tradicional solo certifica a la empresa, pero no proporciona trazabilidad a nivel de producto individual.

**Solución: Pasaporte Digital por Producto**

Cada embalaje certificado tiene un tag NFC que contiene:
- Certificación del proveedor
- Información del lote de producción
- Composición de materiales (% reciclado)
- Fecha de fabricación y planta
- Trazabilidad completa hasta el reciclador final

### 1.2 Beneficios del Sistema

**Para Proveedores:**
- ✅ Diferenciación competitiva con certificación a nivel producto
- ✅ Mayor confianza de clientes industriales
- ✅ Trazabilidad completa de la cadena de suministro
- ✅ Cumplimiento normativo demostrable
- ✅ Reducción de auditorías (trazabilidad automática)
- ✅ Marketing basado en transparencia

**Para Clientes (Productores REP):**
- ✅ Verificación instantánea de certificación REP
- ✅ Auditorías simplificadas con trazabilidad digital
- ✅ Integración automatizada con sistemas de compras
- ✅ Cumplimiento de metas de material reciclado
- ✅ Reportes automáticos para SMA/MMA
- ✅ Reducción de riesgos de sanciones

**Para Recicladores:**
- ✅ Identificación automática de material certificado
- ✅ Valorizaciónmejor valorizada por certificación
- ✅ Trazabilidad hasta el origen

### 1.3 Casos de Uso Reales

**CASO 1: Proveedor de Cajas de Cartón**
```
Empresa: Cartones Sustentables S.A.
Producto: Cajas de cartón corrugado con 80% reciclado
Volumen: 500,000 cajas/mes

Implementación:
- 500 tags NFC por pallet (aprox. $175,000 CLP/mes)
- Cada pallet certificado individualmente
- Clientes escanean al recibir mercancía
- Integración automática con ERP del cliente

Resultado:
- Aumento del 30% en ventas B2B
- Renovación automática de contratos
- Reducción de auditorías de 12 a 2 al año
- Premium del 15% en precio por certificación
```

**CASO 2: Fabricante de Envases Plásticos**
```
Empresa: EcoPlast Chile Ltda.
Producto: Bidones industriales con 50% rPET
Volumen: 50,000 bidones/mes

Implementación:
- Tag NFC en base de cada bidón
- Integración con sistema de gestión de calidad
- Validación automática en centros de acopio

Resultado:
- Cumplimiento automático de decreto DS 12/2020
- Certificación de material reciclado verificable
- Nuevos contratos con grandes retail
- ROI positivo en 4 meses
```

---

<a name="tecnologia-nfc"></a>
## 2. ¿QUÉ ES LA TECNOLOGÍA NFC?

### 2.1 Conceptos Básicos

**NFC (Near Field Communication)** es una tecnología de comunicación inalámbrica de corto alcance que permite intercambiar datos entre dispositivos a una distancia máxima de 4 cm. Es la misma tecnología utilizada en:

- 💳 Tarjetas de pago contactless (Visa payWave, Mastercard PayPass)
- 🚌 Tarjetas de transporte público (TNE, tarjeta BIP)
- 🚪 Control de acceso empresarial
- 📱 Pagos móviles (Apple Pay, Google Pay)

**Ventajas Clave:**
- Lectura instantánea (< 0.5 segundos)
- No requiere batería (alimentado por lector)
- Funciona sin internet (datos almacenados en chip)
- Muy difícil de falsificar (encriptación de fábrica)
- Durabilidad extrema (10+ años)

### 2.2 NFC vs QR Code: Comparativa Técnica

| Característica | NFC | QR Code |
|---|---|---|
| **Lectura** | Instantánea (< 0.5 seg) | Requiere cámara y enfoque (2-5 seg) |
| **Durabilidad** | Alta (chip sellado, resistente a agua/químicos) | Media (puede degradarse, mancharse) |
| **Seguridad** | Muy alta (encriptación AES-128, anti-clonación) | Media (visible, copiable por foto) |
| **Datos almacenables** | Hasta 8 KB (NTAG216) | Hasta 3 KB (limitado por tamaño visual) |
| **Lectura en movimiento** | Sí (incluso en cintas transportadoras) | No (requiere enfoque estático) |
| **Lectura sin luz** | Sí | No (requiere iluminación) |
| **Lectura con suciedad** | Sí (funciona aunque esté sucio/rayado) | No (requiere superficie limpia) |
| **Escritura** | Reutilizable (puede reescribirse) | No (impreso, inmutable) |
| **Costo por tag** | $150 - $500 CLP | $5 - $20 CLP |
| **Lectura masiva** | Sí (hasta 40 tags/segundo) | No (uno a la vez, manualmente) |
| **Integración ERP** | Nativa (estándar industrial) | Requiere desarrollo custom |

**¿Cuándo usar NFC vs QR?**

**Usar NFC cuando:**
- ✅ Volumen alto (> 10,000 unidades/mes)
- ✅ Entorno industrial (suciedad, químicos, agua)
- ✅ Lectura automática/robotizada
- ✅ Máxima seguridad requerida
- ✅ Integración con sistemas ERP/MES

**Usar QR cuando:**
- ✅ Volumen bajo (< 1,000 unidades/mes)
- ✅ Presupuesto limitado
- ✅ Validación ocasional
- ✅ Solo información pública

### 2.3 Estándares NFC en SICREP

SICREP utiliza el estándar **NFC Type 2 (NTAG216)** por las siguientes razones:

**Especificaciones Técnicas:**
```yaml
Chip: NXP NTAG216
Memoria: 888 bytes de usuario
Frecuencia: 13.56 MHz (ISO/IEC 14443 Type A)
Velocidad: 106 kbit/s
Distancia de lectura: 1-4 cm
Temperatura operación: -25°C a +70°C
Resistencia: IP68 (agua, polvo)
Vida útil: 100,000 ciclos de escritura, 10 años de almacenamiento
Compatibilidad: 100% de smartphones Android/iOS modernos
Seguridad: UID de 7 bytes único, Password protection, Lock bytes
```

**Formato Físico:**
- Adhesivo: 25mm x 25mm x 0.5mm
- Material: PVC laminado con antena de cobre
- Adhesivo: Acrílico permanente resistente a temperatura
- Color: Blanco con logo SICREP impreso
- Opción personalizada con logo del proveedor (+$50 CLP/tag)

---

<a name="arquitectura"></a>
## 3. ARQUITECTURA DEL SISTEMA

### 3.1 Diagrama de Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Portal     │  │   App Móvil  │  │   Portal     │       │
│  │   Proveedor  │  │   Validación │  │   Cliente    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│           React + TypeScript + NFC Web API                    │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                      API GATEWAY                              │
│              Autenticación JWT + Rate Limiting                │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                  MICROSERVICES LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Provider   │  │     NFC      │  │     Batch    │       │
│  │   Service    │  │   Service    │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Validation  │  │   Analytics  │  │   Blockchain │       │
│  │   Service    │  │   Service    │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         Spring Boot 2.7 + Java 11                             │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                      DATA LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   MySQL 8.0  │  │  Redis Cache │  │      S3      │       │
│  │   Database   │  │              │  │   Storage    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                 BLOCKCHAIN LAYER                              │
│              Ethereum / Polygon (verification)                │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Componentes del Sistema

**1. Portal del Proveedor (React SPA)**
```typescript
// Funcionalidades principales
interface ProviderPortal {
  dashboard: {
    metrics: MetricsDisplay;
    recentValidations: ValidationList;
    alerts: AlertSystem;
  };
  products: {
    catalog: ProductCatalog;
    create: ProductForm;
    edit: ProductForm;
  };
  batches: {
    list: BatchList;
    create: BatchForm;
    tagAssignment: NFCTagAssignment;
  };
  analytics: {
    validations: ValidationAnalytics;
    traceability: TraceabilityReport;
    exports: ReportExports;
  };
}
```

**2. NFC Service (Spring Boot)**
```java
// Microservicio especializado en gestión de tags NFC
@Service
public class NFCService {
    // Registrar nuevo tag NFC
    public NFCTag registerTag(String uid, String providerId);
    
    // Asociar tag a lote
    public void assignTagToBatch(String tagUid, String batchId);
    
    // Validar tag
    public ValidationResult validateTag(String tagUid);
    
    // Obtener datos completos del tag
    public TagData getTagData(String tagUid);
    
    // Actualizar datos del tag
    public void updateTagData(String tagUid, TagUpdate update);
    
    // Desactivar tag (producto dañado/retirado)
    public void deactivateTag(String tagUid, String reason);
}
```

**3. Batch Service (Spring Boot)**
```java
// Gestión de lotes de producción
@Service
public class BatchService {
    // Crear nuevo lote
    public Batch createBatch(BatchCreationRequest request);
    
    // Asignar múltiples tags a un lote
    public void assignTags(String batchId, List<String> tagUids);
    
    // Obtener información del lote
    public BatchData getBatchData(String batchId);
    
    // Cerrar lote (finalizar producción)
    public void closeBatch(String batchId);
    
    // Exportar reporte de trazabilidad
    public TraceabilityReport generateReport(String batchId);
}
```

**4. Validation Service (Spring Boot)**
```java
// Servicio de validación pública
@Service
public class ValidationService {
    // Validar tag vía NFC
    public ValidationResponse validateNFCTag(String tagUid);
    
    // Obtener pasaporte digital
    public DigitalPassport getPassport(String tagUid);
    
    // Registrar evento de validación
    public void logValidation(ValidationEvent event);
    
    // Estadísticas de validaciones
    public ValidationStats getStats(String providerId, DateRange range);
}
```

**5. Analytics Service (Spring Boot)**
```java
// Análisis y reportes
@Service
public class AnalyticsService {
    // Dashboard del proveedor
    public ProviderDashboard getDashboard(String providerId);
    
    // Análisis de validaciones
    public ValidationAnalytics analyzeValidations(AnalyticsQuery query);
    
    // Mapa de validaciones geográficas
    public GeoValidationMap getGeoMap(String providerId);
    
    // Exportar reportes para SMA/MMA
    public ComplianceReport exportCompliance(String providerId, int year);
}
```

**6. Blockchain Service (Spring Boot)**
```java
// Integración con blockchain para inmutabilidad
@Service
public class BlockchainService {
    // Registrar lote en blockchain
    public String registerBatch(BatchBlockchainData data);
    
    // Verificar registro en blockchain
    public boolean verifyBatchOnChain(String batchId, String txHash);
    
    // Obtener proof de existencia
    public ProofOfExistence getProof(String batchId);
}
```

### 3.3 Flujo de Datos

```
PROVEEDOR REGISTRA LOTE
        │
        ▼
BATCH SERVICE
├─ Crea lote en DB
├─ Genera IDs únicos
└─ Registra en blockchain
        │
        ▼
PROVEEDOR ASOCIA TAGS
        │
        ▼
NFC SERVICE
├─ Valida autenticidad del tag
├─ Asocia tag → lote → producto
├─ Genera URL de validación
└─ Actualiza estado en DB
        │
        ▼
CLIENTE ESCANEA TAG
        │
        ▼
VALIDATION SERVICE
├─ Lee UID del tag
├─ Busca en DB + Cache
├─ Verifica certificación vigente
├─ Registra evento de validación
└─ Retorna datos + pasaporte digital
        │
        ▼
ANALYTICS SERVICE
├─ Procesa evento
├─ Actualiza métricas
└─ Genera alertas si es necesario
```

---

<a name="flujo-certificacion"></a>
## 4. FLUJO DE CERTIFICACIÓN DE EMBALAJES

### 4.1 Proceso Completo (Paso a Paso)

**PASO 1: Certificación Empresarial (Prerequisito)**

El proveedor debe primero obtener su **certificación empresarial SICREP** mediante el proceso estándar de 10 fases.

**Requisitos mínimos:**
- ✅ Certificado SICREP vigente (categoría Verde o Amarillo)
- ✅ Sin sanciones SMA en últimos 12 meses
- ✅ Certificado RETC actualizado
- ✅ Política de sostenibilidad documentada

**IMPORTANTE**: Solo proveedores con certificación vigente pueden acceder al módulo NFC.

---

**PASO 2: Activación del Módulo Proveedor**

Una vez certificado, el proveedor debe activar el módulo:

1. **Login en portal SICREP** con credenciales empresariales
2. **Ir a "Módulo Proveedor"** en el menú principal
3. **Completar formulario de activación:**
   ```yaml
   Información requerida:
     - Tipo de productos a certificar (selección múltiple)
     - Volumen mensual estimado (unidades)
     - Plantas de producción (direcciones)
     - Contacto técnico responsable
     - Tipo de integración (manual/API)
   ```
4. **Aceptar términos y condiciones** del módulo NFC
5. **Activación automática** (si cumple requisitos) o revisión manual (24-48 hrs)

---

**PASO 3: Compra de Tags NFC**

SICREP provee tags NFC pre-programados con las siguientes opciones:

**Paquetes Disponibles:**

| Cantidad | Precio Unitario | Total | Ahorro |
|---|---|---|---|
| 1,000 tags | $350 CLP | $350,000 | - |
| 5,000 tags | $320 CLP | $1,600,000 | 8.6% |
| 10,000 tags | $280 CLP | $2,800,000 | 20% |
| 50,000+ tags | $250 CLP | Cotización | 28.6% |

**Incluye:**
- ✅ Tags NFC NTAG216 pre-programados
- ✅ Logo SICREP impreso
- ✅ Adhesivo permanente
- ✅ Certificado de autenticidad
- ✅ Manual de aplicación
- ✅ Envío incluido (Chile continental)

**Opciones adicionales (+costo):**
- Logo del proveedor impreso: +$50 CLP/tag
- Tags en formato etiqueta (rollo 1000 uds): +$20 CLP/tag
- Tags industriales alta temperatura (-40°C a +120°C): +$150 CLP/tag

**Proceso de compra:**
1. Solicitar en portal (sección "Comprar Tags")
2. Recibir factura electrónica
3. Transferencia bancaria o pago con tarjeta
4. Envío en 3-5 días hábiles
5. Recepción con número de tracking

---

**PASO 4: Configuración del Catálogo de Productos**

Antes de asociar tags, el proveedor debe configurar su catálogo:

```yaml
Por cada producto:
  SKU: "CAJ-CART-100L-80R"
  Nombre: "Caja cartón corrugado 100L 80% reciclado"
  Descripción: "Caja de cartón corrugado, canal sencillo..."
  
  Especificaciones:
    Dimensiones: "60cm x 40cm x 40cm"
    Peso: "850g"
    Resistencia: "Hasta 50kg"
    
  Composición:
    Material principal: "Cartón corrugado"
    % Material reciclado: 80
    Origen material reciclado: "Post-consumo"
    Certificaciones: ["FSC", "ISO 14001"]
    
  Imágenes:
    Principal: [upload]
    Adicionales: [upload múltiple]
    
  Información adicional:
    Uso recomendado: "Transporte productos industriales"
    Reciclabilidad: "100% reciclable"
    Instrucciones: "Mantener seco, almacenar plano"
```

**Categorías de Productos Soportadas:**
- Cajas y contenedores de cartón
- Sacos y bolsas plásticas
- Contenedores plásticos rígidos (IBC, bidones)
- Pallets (madera, plástico)
- Film y plástico termoformado
- Etiquetas y separadores
- Esquineros y protecciones
- Otros embalajes industriales

---

**PASO 5: Creación de Lote de Producción**

Cada vez que el proveedor fabrica productos, crea un lote en el sistema:

```yaml
Información del Lote:
  Identificación:
    Código lote: [auto-generado] "LOT-2025-11-001"
    SKU producto: [selección desde catálogo]
    Cantidad unidades: 5000
    
  Producción:
    Fecha inicio: "2025-11-01"
    Fecha fin: "2025-11-05"
    Planta: [selección] "Planta Santiago - Quilicura"
    Turno: "Mañana"
    Supervisor: "Juan Pérez"
    
  Materiales:
    Material reciclado usado (kg): 3400
    Material virgen usado (kg): 850
    % reciclado real: 80%
    Proveedor material reciclado: "ReciclaCL S.A."
    Certificado proveedor: [upload PDF]
    
  Control de Calidad:
    Inspector: "María González"
    Tests realizados: ["Resistencia", "Humedad", "Dimensiones"]
    Conformidad: "Aprobado"
    Observaciones: "Ninguna"
    
  Documentación:
    Orden de producción: [upload PDF]
    Certificado materiales: [upload PDF]
    Fotos del lote: [upload múltiple]
```

**El sistema automáticamente:**
1. Valida que SKU existe en catálogo
2. Verifica que % reciclado coincide con especificación
3. Genera código único de lote
4. Registra hash del lote en blockchain
5. Habilita asociación de tags NFC

---

**PASO 6: Asociación de Tags NFC**

Existen 3 métodos para asociar tags a un lote:

**MÉTODO 1: Asociación Manual (App Móvil)**

Ideal para volúmenes pequeños (< 1,000 unidades):

1. Abrir **App SICREP Proveedor** en smartphone
2. Login con credenciales
3. Seleccionar lote activo
4. Activar modo "Escaneo NFC"
5. Acercar tag NFC al smartphone
6. Sistema valida y asocia automáticamente
7. Confirmar asociación (vibración + sonido)
8. Repetir para cada tag

**Velocidad**: ~10-15 tags/minuto (1 persona)

---

**MÉTODO 2: Asociación por Lotes (Portal Web)**

Ideal para volúmenes medianos (1,000 - 10,000 unidades):

1. Login en **Portal del Proveedor**
2. Ir a lote activo
3. Clic en "Asociar Tags Masivamente"
4. **Opción A**: Subir archivo CSV con UIDs de tags
   ```csv
   tag_uid
   04:E1:23:A2:3D:6F:80
   04:E1:23:A2:3D:6F:81
   04:E1:23:A2:3D:6F:82
   ...
   ```
5. **Opción B**: Usar lector NFC USB conectado a PC
   - Conectar lector USB
   - Software SICREP Desktop lee tags automáticamente
   - Asociación en tiempo real
   
**Velocidad**: ~100-200 tags/minuto (con lector USB)

---

**MÉTODO 3: Integración API (Sistemas MES/ERP)**

Ideal para volúmenes altos (> 10,000 unidades):

1. Integrar sistema de producción con API SICREP
2. Al momento de producción, sistema envía:
   ```json
   POST /api/v1/provider/tags/assign-batch
   {
     "batchId": "LOT-2025-11-001",
     "tags": [
       {"uid": "04:E1:23:A2:3D:6F:80", "timestamp": "2025-11-01T08:15:23Z"},
       {"uid": "04:E1:23:A2:3D:6F:81", "timestamp": "2025-11-01T08:15:24Z"},
       ...
     ]
   }
   ```
3. Sistema valida y asocia automáticamente
4. Respuesta inmediata con confirmación

**Velocidad**: ~1,000+ tags/minuto (limitado por ancho de banda)

---

**PASO 7: Aplicación Física de Tags**

Una vez asociados digitalmente, los tags deben aplicarse físicamente:

**Ubicaciones Recomendadas según Tipo de Embalaje:**

```yaml
Cajas de Cartón:
  Ubicación: Interior de solapa principal
  Razón: Protegido de daños externos, fácil acceso
  Aplicación: Limpiar superficie → aplicar sticker → presionar 10 seg
  
Sacos Plásticos:
  Ubicación: En etiqueta de sellado superior
  Razón: Zona rígida, no se deforma
  Aplicación: Aplicar sobre etiqueta existente
  
Contenedores Plásticos (Bidones):
  Ubicación: Base del contenedor (exterior)
  Razón: Superficie plana, protegida cuando apilado
  Aplicación: Limpiar con alcohol → aplicar → presionar 15 seg
  
Pallets de Madera:
  Ubicación: Esquina superior de tablón central
  Razón: Fácil lectura con transpaleta/grúa
  Aplicación: Usar tag industrial alta resistencia
  
Film Plástico (Rollos):
  Ubicación: En núcleo de cartón del rollo
  Razón: No interfiere con uso del film
  Aplicación: Adherir en dirección longitudinal
```

**Tips de Aplicación:**
1. ✅ Superficie debe estar limpia y seca
2. ✅ Temperatura ambiente 15-30°C
3. ✅ Presionar firmemente 10-15 segundos
4. ✅ Esperar 24 horas para máxima adhesión
5. ✅ No aplicar en superficies metálicas (interfiere con NFC)
6. ✅ Evitar esquinas y dobleces
7. ✅ Proteger de luz solar directa prolongada

---

**PASO 8: Validación y Trazabilidad**

Una vez el producto sale de la planta, cualquier persona puede validarlo:

**Método 1: App SICREP (Recomendado)**
1. Descargar app gratuita (iOS/Android)
2. Acercar smartphone al tag NFC
3. Lectura automática en < 1 segundo
4. Pantalla muestra:
   - ✅ Badge de certificación (Verde/Amarillo/Rojo)
   - ℹ️ Información del proveedor
   - 📦 Datos del lote y producto
   - 📊 Composición de materiales
   - 🔗 Enlace al pasaporte digital completo

**Método 2: NFC Nativo del Smartphone**
1. Activar NFC en configuración del teléfono
2. Acercar teléfono al tag
3. Abre automáticamente navegador web
4. Muestra página de validación pública

**Método 3: Integración API (Sistemas ERP)**
```javascript
// Cliente integra validación en su sistema de recepción
const response = await fetch('https://api.sicrep.cl/v1/public/validate-nfc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tagUid: '04:E1:23:A2:3D:6F:80'
  })
});

const validation = await response.json();
/*
{
  "valid": true,
  "certificate": {
    "providerId": "PROV-00123",
    "providerName": "Cartones Sustentables S.A.",
    "certificateStatus": "ACTIVE",
    "category": "GREEN",
    "score": 92
  },
  "product": {
    "sku": "CAJ-CART-100L-80R",
    "name": "Caja cartón corrugado 100L 80% reciclado",
    "recycledContent": 80
  },
  "batch": {
    "id": "LOT-2025-11-001",
    "productionDate": "2025-11-01",
    "plant": "Planta Santiago - Quilicura",
    "quantity": 5000,
    "blockchainTx": "0x7d3a9f8e..."
  },
  "passportUrl": "https://sicrep.cl/pasaporte-nfc/04E123A23D6F80"
}
*/
```

---

<a name="portal-proveedor"></a>
## 5. PORTAL DEL PROVEEDOR

### 5.1 Dashboard Principal

El dashboard del proveedor muestra métricas clave en tiempo real:

```yaml
Widgets del Dashboard:

1. Resumen de Certificación:
   - Estado: VIGENTE ✅
   - Categoría: Verde (92/100 pts)
   - Válido hasta: 2026-11-06
   - Días restantes: 365
   - Botón: "Renovar Certificado"

2. Productos Certificados:
   - Total SKUs en catálogo: 24
   - Lotes activos: 8
   - Tags asociados (mes): 45,230
   - Tags disponibles: 12,450
   - Botón: "Comprar más Tags"

3. Validaciones del Mes:
   - Total validaciones: 15,847
   - Variación vs mes anterior: +23% ↑
   - Validaciones hoy: 512
   - Pico de validaciones: 14:00 hrs (1,234)
   - Gráfico: Línea temporal últimos 30 días

4. Top 5 Productos Más Validados:
   SKU                      Validaciones  % del Total
   CAJ-CART-100L-80R        5,234        33%
   SAC-PLAS-50KG-60R        3,456        22%
   BID-PET-20L-50R          2,890        18%
   PAL-MAD-120-100R         2,123        13%
   FILM-PE-500M-30R         2,144        14%
   
5. Mapa de Validaciones:
   - Mapa interactivo de Chile
   - Marcadores por región
   - Color según volumen
   - Click: Detalle de validaciones por zona

6. Alertas y Notificaciones:
   🔔 Lote LOT-2025-10-045 próximo a agotarse (150 tags restantes)
   ⚠️ Certificado vence en 30 días - Iniciar renovación
   ✅ Nuevo cliente validó 500 productos (Empresa XYZ S.A.)
   📊 Reporte mensual disponible para descarga

7. Acciones Rápidas:
   [+ Nuevo Lote]  [📦 Ver Catálogo]  [🏷️ Asociar Tags]  [📊 Reportes]
```

### 5.2 Gestión de Catálogo de Productos

**Vista de Lista:**
```
Filtros: [Categoría ▼] [Material ▼] [% Reciclado ▼] [Buscar...]

┌─────────────────────────────────────────────────────────────┐
│ [Imagen] CAJ-CART-100L-80R                         [Editar] │
│          Caja cartón corrugado 100L 80% reciclado           │
│          Dimensiones: 60x40x40cm | Reciclado: 80%           │
│          Lotes activos: 3 | Validaciones (mes): 5,234       │
├─────────────────────────────────────────────────────────────┤
│ [Imagen] SAC-PLAS-50KG-60R                         [Editar] │
│          Saco plástico industrial 50kg 60% reciclado        │
│          Dimensiones: 80x50cm | Reciclado: 60%              │
│          Lotes activos: 2 | Validaciones (mes): 3,456       │
└─────────────────────────────────────────────────────────────┘
```

**Formulario de Producto:**
```yaml
Información Básica:
  SKU: [campo texto] *requerido
  Nombre: [campo texto] *requerido
  Descripción: [área texto, máx 500 caracteres]
  Categoría: [selección múltiple]
    ☐ Cajas y Contenedores
    ☑ Sacos y Bolsas
    ☐ Contenedores Rígidos
    ☐ Pallets
    ☐ Film y Termoformado
    ☐ Etiquetas
    ☐ Otros

Especificaciones:
  Dimensiones:
    Largo: [___] cm
    Ancho: [___] cm
    Alto: [___] cm
  Peso: [___] kg
  Resistencia: [___] kg
  Color: [___]
  Norma aplicable: [selección]

Composición:
  Material principal: [selección]
  % Material reciclado: [slider 0-100%] *requerido
  Origen material reciclado:
    ○ Post-consumo
    ○ Post-industrial
    ○ Mixto
  Reciclabilidad: [selección]
    ○ 100% reciclable
    ○ Parcialmente reciclable
    ○ No reciclable
  
Certificaciones:
  ☐ ISO 14001
  ☐ ISO 9001
  ☐ FSC (Forest Stewardship Council)
  ☐ PEFC (Programme for the Endorsement of Forest Certification)
  ☐ Otros: [especificar]

Imágenes:
  Imagen principal: [Arrastrar archivo o hacer click]
                    Formatos: JPG, PNG | Máx 5MB
  Imágenes adicionales: [Arrastrar archivos o hacer click]
                         Hasta 10 imágenes adicionales

Información Adicional:
  Uso recomendado: [área texto]
  Instrucciones: [área texto]
  Compatibilidad: [área texto]
  Observaciones: [área texto]

[Cancelar]  [Guardar Borrador]  [Publicar Producto]
```

### 5.3 Gestión de Lotes

**Vista de Lista de Lotes:**
```
Filtros: [Estado ▼] [Producto ▼] [Fecha ▼] [Buscar...]

┌─────────────────────────────────────────────────────────────┐
│ LOT-2025-11-001 | ACTIVO ✅                         [Ver]   │
│ CAJ-CART-100L-80R | Caja cartón corrugado...                │
│ Producción: 01-05 Nov 2025 | Cantidad: 5,000 uds            │
│ Tags asociados: 5,000/5,000 (100%) | Validaciones: 1,234    │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%                                   │
├─────────────────────────────────────────────────────────────┤
│ LOT-2025-11-002 | EN PROGRESO 🕐                    [Ver]   │
│ SAC-PLAS-50KG-60R | Saco plástico industrial...             │
│ Producción: 06-10 Nov 2025 | Cantidad: 3,000 uds            │
│ Tags asociados: 1,850/3,000 (62%) | Validaciones: 0         │
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 62%                                    │
└─────────────────────────────────────────────────────────────┘
```

**Detalle de Lote:**
```yaml
┌─────────────────────────────────────────────────────────────┐
│ LOTE: LOT-2025-11-001                              [Editar]  │
│ Estado: ACTIVO ✅                                   [Cerrar] │
└─────────────────────────────────────────────────────────────┘

Información del Producto:
  SKU: CAJ-CART-100L-80R
  Nombre: Caja cartón corrugado 100L 80% reciclado
  [Ver ficha completa del producto →]

Producción:
  Fecha inicio: 01 Nov 2025, 08:00
  Fecha fin: 05 Nov 2025, 18:00
  Duración total: 4.4 días
  Planta: Planta Santiago - Quilicura
  Turno: Mañana (A)
  Supervisor: Juan Pérez Contreras
  
Cantidades:
  Unidades producidas: 5,000
  Tags NFC asociados: 5,000 (100%)
  Unidades validadas: 1,234 (25%)
  Unidades pendientes: 3,766 (75%)

Materiales:
  Material reciclado: 3,400 kg (80%)
  Material virgen: 850 kg (20%)
  Total: 4,250 kg
  Proveedor material: ReciclaCL S.A. (RUT: 76.543.210-1)

Control de Calidad:
  Inspector: María González Soto
  Fecha inspección: 05 Nov 2025, 16:30
  Tests realizados: Resistencia, Humedad, Dimensiones
  Resultado: ✅ APROBADO
  Observaciones: Ninguna

Blockchain:
  Hash del lote: 0x7d3a9f8e2b1c5d4f6a8e9c0b3d2f1a7e
  Transacción: 0xabc123...def789
  Bloque: #18,234,567
  Timestamp: 01 Nov 2025, 08:15:23 UTC
  [Ver en Etherscan →]

Documentos Adjuntos:
  📄 Orden de producción OP-2025-1001.pdf (234 KB)
  📄 Certificado materiales CM-2025-0456.pdf (189 KB)
  🖼️ Fotos del lote (15 imágenes, 12.4 MB)
  [+ Agregar documento]

Acciones:
  [📊 Ver Estadísticas]  [🏷️ Asociar más Tags]  [📥 Exportar Reporte]

Validaciones:
  [Gráfico de línea temporal de validaciones]
  
  Últimas 10 validaciones:
  06 Nov 11:45 | Empresa ABC S.A. | Santiago, RM | [Ver detalle]
  06 Nov 11:42 | Empresa XYZ Ltda. | Valparaíso, V | [Ver detalle]
  06 Nov 11:38 | Empresa 123 SpA | Concepción, VIII | [Ver detalle]
  ...
```

### 5.4 Asociación de Tags NFC

**Vista de Asociación Manual:**
```
┌─────────────────────────────────────────────────────────────┐
│ ASOCIAR TAGS AL LOTE: LOT-2025-11-001                       │
│ Progreso: 1,850 / 3,000 tags (62%)                          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░ 62%                                    │
└─────────────────────────────────────────────────────────────┘

Método de Asociación:
  ○ Manual (App Móvil) - Ideal para < 1,000 tags
  ● Por Lotes (CSV) - Ideal para 1,000 - 10,000 tags
  ○ API (Integración) - Ideal para > 10,000 tags

┌─────────────────────────────────────────────────────────────┐
│ Subir Archivo CSV con UIDs de Tags                          │
│                                                               │
│   ┌───────────────────────────────────────────┐             │
│   │  Arrastrar archivo CSV aquí               │             │
│   │  o hacer click para seleccionar            │             │
│   │                                             │             │
│   │  Formato esperado:                          │             │
│   │  tag_uid                                    │             │
│   │  04:E1:23:A2:3D:6F:80                       │             │
│   │  04:E1:23:A2:3D:6F:81                       │             │
│   │  ...                                        │             │
│   └───────────────────────────────────────────┘             │
│                                                               │
│   [📥 Descargar plantilla CSV]                               │
│                                                               │
│   [Seleccionar Archivo]  [Subir y Asociar]                   │
└─────────────────────────────────────────────────────────────┘

Últimos Tags Asociados:
  ✅ 04:E1:23:A2:3D:6F:80 | Asociado | 06 Nov 11:45:23
  ✅ 04:E1:23:A2:3D:6F:81 | Asociado | 06 Nov 11:45:24
  ✅ 04:E1:23:A2:3D:6F:82 | Asociado | 06 Nov 11:45:25
  ❌ 04:E1:23:A2:3D:6F:83 | ERROR: Tag ya asociado a otro lote
  ✅ 04:E1:23:A2:3D:6F:84 | Asociado | 06 Nov 11:45:27
  ...
  
  [Ver log completo (1,850 registros)]
```

### 5.5 Analytics y Reportes

**Tipos de Reportes Disponibles:**

**1. Reporte de Validaciones**
```yaml
Periodo: [Noviembre 2025 ▼]
Agrupación: [Por día ▼]

Métricas:
  - Total validaciones: 15,847
  - Promedio diario: 528
  - Pico máximo: 1,234 (06 Nov, 14:00 hrs)
  - Valle mínimo: 89 (12 Nov, 02:00 hrs)
  
Distribución:
  Por día de la semana:
    Lun: 2,456 (15%)
    Mar: 2,678 (17%)
    Mié: 2,890 (18%)
    Jue: 2,567 (16%)
    Vie: 2,345 (15%)
    Sáb: 1,789 (11%)
    Dom: 1,122 (7%)
    
  Por hora del día:
    [Gráfico de calor 24hrs x 7 días]
    
  Por región:
    RM: 6,234 (39%)
    V: 2,345 (15%)
    VIII: 1,890 (12%)
    X: 1,234 (8%)
    Otras: 4,144 (26%)

[Exportar PDF]  [Exportar Excel]  [Enviar por Email]
```

**2. Reporte de Trazabilidad de Lote**
```yaml
Lote: LOT-2025-11-001
Producto: CAJ-CART-100L-80R
Periodo: 01-30 Nov 2025

Resumen:
  Unidades producidas: 5,000
  Tags asociados: 5,000 (100%)
  Unidades validadas: 1,234 (25%)
  Clientes únicos: 67
  
Trazabilidad:
  Producción:
    Fecha: 01-05 Nov 2025
    Planta: Santiago - Quilicura
    Material reciclado: 80%
    Blockchain: 0x7d3a9f8e...
    
  Distribución:
    Primera validación: 05 Nov 2025, 20:15
    Cliente: Distribuidora ABC S.A.
    Ubicación: Santiago, RM
    
  Cadena de suministro:
    [Diagrama de flujo con timestamps]
    Productor → Distribuidor → Cliente Final → Reciclador
    
  Destino final (estimado):
    En uso: 3,766 (75%)
    Reciclado: 0 (0%)
    Sin información: 1,234 (25%)

[Exportar PDF]  [Exportar Excel]  [Ver en Mapa]
```

**3. Reporte de Cumplimiento REP (para SMA/MMA)**
```yaml
Proveedor: Cartones Sustentables S.A.
RUT: 76.123.456-7
Periodo: Año 2025

Resumen de Certificación:
  Certificado SICREP: SICREP-2025-001234
  Categoría: Verde (92/100 pts)
  Vigencia: 06 Nov 2025 - 06 Nov 2026
  Estado: VIGENTE ✅

Producción:
  Lotes certificados: 24
  Unidades producidas: 125,000
  Tags NFC asociados: 125,000 (100%)
  
Material Reciclado:
  Total material usado: 106,250 kg
  Material reciclado: 85,000 kg (80%)
  Material virgen: 21,250 kg (20%)
  
  Proveedores de material reciclado:
    - ReciclaCL S.A. (45,000 kg)
    - EcoFibras Ltda. (25,000 kg)
    - Recicla+ SpA (15,000 kg)

Validaciones:
  Total validaciones: 187,456
  Clientes únicos: 423
  Cobertura geográfica: 15 regiones

Cumplimiento:
  Decreto 12/2020 (Envases): ✅ CUMPLE
  Metas de valorización: 95% (meta: 85%)
  Trazabilidad documentada: 100%
  
Blockchain:
  Total transacciones: 24
  Red: Ethereum Mainnet
  Verificación: ✅ Todos los lotes verificables

[Firmar Digitalmente]  [Exportar PDF Oficial]  [Enviar a SMA]
```

---

<a name="especificaciones-tecnicas"></a>
## 6. ESPECIFICACIONES TÉCNICAS NFC

### 6.1 Hardware: Tags NFC NTAG216

**Especificaciones del Chip:**
```yaml
Fabricante: NXP Semiconductors
Modelo: NTAG216
Estándar: ISO/IEC 14443 Type A
Frecuencia: 13.56 MHz
Velocidad de transferencia: 106 kbit/s

Memoria:
  Total: 924 bytes
  Usuario disponible: 888 bytes
  UID (Serial): 7 bytes (único de fábrica, no modificable)
  
Seguridad:
  Password protection: 32-bit password
  Lock bytes: Para protección permanente de datos
  UID unique: Imposible duplicar
  Anti-collision: Lectura múltiple simultánea
  
Durabilidad:
  Ciclos de escritura: 100,000 (típico: 200,000)
  Retención de datos: 10 años
  Temperatura operación: -25°C a +70°C
  Temperatura almacenamiento: -40°C a +85°C
  Resistencia ESD: 2,000V (HBM)
  
Características físicas:
  Tamaño tag: 25mm x 25mm x 0.5mm (adhesivo incluido)
  Antena: Cobre, bobina plana
  Sustrato: PVC laminado
  Adhesivo: Acrílico permanente, resistente agua
  Distancia de lectura: 1-4 cm (dependiendo del lector)
  
Compatibilidad:
  Android: 100% (API nativa desde Android 4.0+)
  iOS: 100% (desde iPhone 7 con iOS 13+)
  Lectores USB: Sí (ACR122U, SCL3711, etc.)
  Lectores industriales: Sí (RFID Gen2)
```

### 6.2 Estructura de Datos en el Tag

Cada tag NFC almacena información en formato NDEF (NFC Data Exchange Format):

```
┌─────────────────────────────────────────────────────────────┐
│ NTAG216 Memory Map (888 bytes disponibles)                  │
├─────────────────────────────────────────────────────────────┤
│ Byte 0-6: UID (Serial único de fábrica)                      │
│           Ejemplo: 04:E1:23:A2:3D:6F:80                       │
├─────────────────────────────────────────────────────────────┤
│ Byte 7-10: Internal / Lock bytes                             │
├─────────────────────────────────────────────────────────────┤
│ Byte 11-888: User Memory (NDEF Message)                      │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ NDEF Message Structure:                                  │ │
│ │                                                            │ │
│ │ [NDEF Header]                                             │ │
│ │   - MB (Message Begin): 1 bit                             │ │
│ │   - ME (Message End): 1 bit                               │ │
│ │   - CF (Chunk Flag): 1 bit                                │ │
│ │   - SR (Short Record): 1 bit                              │ │
│ │   - IL (ID Length): 1 bit                                 │ │
│ │   - TNF (Type Name Format): 3 bits                        │ │
│ │                                                            │ │
│ │ [Record 1: URL]                                           │ │
│ │   Type: URI (0x55)                                        │ │
│ │   Payload: https://sicrep.cl/v/{UID}                      │ │
│ │   Length: ~40 bytes                                       │ │
│ │                                                            │ │
│ │ [Record 2: Custom Data - SICREP]                          │ │
│ │   Type: application/sicrep (MIME)                         │ │
│ │   Payload: JSON comprimido                                │ │
│ │   {                                                        │ │
│ │     "v": "1.0",              // Versión formato           │ │
│ │     "p": "PROV-00123",       // Provider ID               │ │
│ │     "b": "LOT-2025-11-001",  // Batch ID                  │ │
│ │     "s": "CAJ-CART-100L",    // SKU                       │ │
│ │     "d": "2025-11-01",       // Production date           │ │
│ │     "r": 80,                 // % Recycled                │ │
│ │     "c": "SICREP-2025-001234", // Certificate ID          │ │
│ │     "h": "0x7d3a9f8e...",    // Blockchain hash           │ │
│ │     "sig": "a3f7d8e9..."     // Digital signature         │ │
│ │   }                                                        │ │
│ │   Length: ~250 bytes (comprimido con gzip)                │ │
│ │                                                            │ │
│ │ [Record 3: Text - Provider Name]                          │ │
│ │   Type: T (Text)                                          │ │
│ │   Language: es                                            │ │
│ │   Payload: "Cartones Sustentables S.A."                   │ │
│ │   Length: ~35 bytes                                       │ │
│ └──────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Byte 889-891: Password (si protegido)                        │
│ Byte 892-893: PACK (Password ACKnowledge)                    │
│ Byte 894-923: Lock & Config bytes                            │
└─────────────────────────────────────────────────────────────┘

Espacio usado: ~325 bytes
Espacio libre: ~563 bytes (para futuras expansiones)
```

**Ventajas de esta Estructura:**
1. **URL primero** → Permite lectura nativa en smartphones (sin app)
2. **Datos comprimidos** → Más información en menos espacio
3. **Firma digital** → Previene falsificación
4. **Espacio libre** → Permite agregar datos en el futuro sin cambiar tag

### 6.3 Protocolo de Comunicación

**Flujo de Lectura NFC:**

```
SMARTPHONE DETECTA TAG
        │
        ▼
[PASO 1] Lectura del UID
         - Sistema operativo lee UID único
         - UID: 04:E1:23:A2:3D:6F:80
        │
        ▼
[PASO 2] Lectura NDEF Message
         - Lee Record 1 (URL)
         - Lee Record 2 (Custom Data)
         - Lee Record 3 (Text)
        │
        ▼
[PASO 3] Validación de Firma Digital
         - Extrae signature del Record 2
         - Verifica con clave pública SICREP
         - Si válida → Continúa
         - Si inválida → ALERTA: Tag falsificado
        │
        ▼
[PASO 4A] Con Internet
         - Abre URL: https://sicrep.cl/v/04E123A23D6F80
         - Backend valida UID contra DB
         - Retorna datos completos + pasaporte digital
        │
        ▼
[PASO 4B] Sin Internet (Offline)
         - Parsea Record 2 (Custom Data JSON)
         - Muestra información básica
         - Indica: "Datos offline, conectar para más info"
        │
        ▼
[PASO 5] Registro de Validación
         - Si online: Registra evento en backend
         - Almacena: timestamp, ubicación, UID tag
         - Incrementa contador de validaciones
```

**Tiempos de Operación:**

| Operación | Tiempo | Notas |
|---|---|---|
| Detección de tag | < 100 ms | Automático cuando tag está cerca |
| Lectura UID | < 50 ms | Identificador único |
| Lectura NDEF completa | < 300 ms | Todos los records |
| Validación firma digital | < 100 ms | Encriptación AES-128 |
| Request HTTP a backend | < 500 ms | Depende de conexión |
| **Total (con internet)** | **< 1 seg** | Experiencia instantánea |
| **Total (sin internet)** | **< 500 ms** | Solo lectura local |

### 6.4 Seguridad y Anti-Falsificación

**Múltiples Capas de Seguridad:**

**Capa 1: UID Único de Fábrica**
- Cada tag tiene un UID de 7 bytes asignado por NXP
- **Imposible de duplicar** (quemado en silicio)
- SICREP registra todos los UIDs vendidos
- Validación: UID debe estar en whitelist de SICREP

**Capa 2: Firma Digital**
- Datos del tag firmados con clave privada SICREP
- Algoritmo: RSA-2048 o ECDSA
- Solo SICREP puede firmar datos válidos
- Validación: Verificar firma con clave pública

**Capa 3: Registro en Blockchain**
- Hash del lote registrado en Ethereum/Polygon
- Inmutable y auditable públicamente
- Validación: Verificar que hash coincide

**Capa 4: Password Protection (Opcional)**
- Tag puede protegerse con password de 32 bits
- Evita reescritura de datos
- Usado en aplicaciones de alta seguridad

**Capa 5: Validación en Backend**
- UID consultado contra base de datos SICREP
- Verifica: asociación UID ↔ Lote ↔ Proveedor
- Detecta: Tags duplicados, robados o inválidos

**Escenarios de Ataque y Mitigación:**

| Ataque | Mitigación SICREP |
|---|---|
| **Clonación de UID** | Imposible (UID quemado en hardware) |
| **Copia de datos NDEF** | Firma digital inválida al copiar |
| **Tag falsificado** | UID no está en whitelist SICREP |
| **Man-in-the-middle** | HTTPS + Certificate pinning en app |
| **Tag robado** | Backend marca como robado, alerta al validar |
| **Reescritura de datos** | Password protection + lock bytes |

---

<a name="integracion"></a>
## 7. PROCESO DE INTEGRACIÓN

### 7.1 Integración Manual (Sin Desarrollo)

Para proveedores que desean empezar rápidamente sin desarrollo técnico:

**Paso 1: Activar Módulo Proveedor**
1. Login en portal SICREP
2. Ir a "Módulo Proveedor" → "Activar"
3. Completar formulario
4. Esperar aprobación (24-48 hrs)

**Paso 2: Configurar Catálogo**
1. Agregar productos manualmente en portal
2. Subir imágenes y especificaciones
3. Definir % material reciclado

**Paso 3: Comprar Tags**
1. Solicitar en portal (mínimo 1,000 tags)
2. Pagar por transferencia o tarjeta
3. Recibir en 3-5 días hábiles

**Paso 4: Usar App Móvil**
1. Descargar "SICREP Proveedor" (iOS/Android)
2. Login con credenciales del portal
3. Escanear tags y asociar a lotes
4. Aplicar físicamente en productos

**Paso 5: Monitorear en Portal**
1. Ver validaciones en tiempo real
2. Exportar reportes mensuales
3. Responder consultas de clientes

**Tiempo de implementación:** 2-3 semanas  
**Costo de setup:** $0 (solo tags NFC)  
**Requisitos técnicos:** Ninguno (solo smartphone)

### 7.2 Integración API (Automatizada)

Para proveedores con sistemas ERP/MES que desean integración completa:

**Arquitectura de Integración:**

```
┌─────────────────────────────────────────────────────────────┐
│                  SISTEMA DEL PROVEEDOR                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     ERP      │  │     MES      │  │     WMS      │      │
│  │   (SAP/      │  │  (Sistema    │  │   (Gestión   │      │
│  │   Oracle)    │  │  Manufactura)│  │   Bodega)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                           │                                   │
│                  ┌────────▼────────┐                          │
│                  │  Middleware/    │                          │
│                  │  Integration    │                          │
│                  │  Layer          │                          │
│                  └────────┬────────┘                          │
└───────────────────────────┼──────────────────────────────────┘
                            │ HTTPS + JWT
                            │
┌───────────────────────────▼──────────────────────────────────┐
│                    SICREP API                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Authentication: JWT Token                            │   │
│  │  Rate Limit: 1000 requests/minuto                    │   │
│  │  Endpoints: /provider/batches, /provider/tags, etc.  │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

**Flujo de Integración API:**

**1. Obtener Credenciales API:**
```bash
# Contactar soporte@sicrep.cl
# Recibir:
# - Client ID
# - Client Secret
# - API Base URL: https://api.sicrep.cl/v1
```

**2. Autenticación (OAuth 2.0):**
```javascript
// Obtener access token
const response = await fetch('https://api.sicrep.cl/v1/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    grant_type: 'client_credentials'
  })
});

const { access_token, expires_in } = await response.json();
/*
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
*/

// Usar token en todas las requests
const headers = {
  'Authorization': `Bearer ${access_token}`,
  'Content-Type': 'application/json'
};
```

**3. Sincronizar Catálogo de Productos:**
```javascript
// Crear nuevo producto en SICREP
const product = await fetch('https://api.sicrep.cl/v1/provider/products', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    sku: 'CAJ-CART-100L-80R',
    name: 'Caja cartón corrugado 100L 80% reciclado',
    description: 'Caja de cartón corrugado, canal sencillo...',
    category: ['BOXES'],
    dimensions: {
      length: 60,
      width: 40,
      height: 40,
      unit: 'cm'
    },
    weight: 0.85,
    recycledContent: 80,
    recycledOrigin: 'POST_CONSUMER',
    recyclability: 100,
    certifications: ['ISO14001', 'FSC']
  })
});

const productData = await product.json();
/*
{
  "id": "PROD-12345",
  "sku": "CAJ-CART-100L-80R",
  "status": "ACTIVE",
  "createdAt": "2025-11-06T10:00:00Z"
}
*/
```

**4. Crear Lote de Producción:**
```javascript
// Al iniciar producción de un lote
const batch = await fetch('https://api.sicrep.cl/v1/provider/batches', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    productSku: 'CAJ-CART-100L-80R',
    quantity: 5000,
    productionStart: '2025-11-01T08:00:00Z',
    productionEnd: '2025-11-05T18:00:00Z',
    plant: 'Planta Santiago - Quilicura',
    supervisor: 'Juan Pérez',
    materials: {
      recycled: {
        weight: 3400,
        supplier: 'ReciclaCL S.A.',
        supplierRut: '76.543.210-1'
      },
      virgin: {
        weight: 850
      }
    },
    qualityControl: {
      inspector: 'María González',
      tests: ['RESISTANCE', 'HUMIDITY', 'DIMENSIONS'],
      status: 'APPROVED'
    }
  })
});

const batchData = await batch.json();
/*
{
  "id": "LOT-2025-11-001",
  "productSku": "CAJ-CART-100L-80R",
  "quantity": 5000,
  "status": "ACTIVE",
  "blockchainTx": "0x7d3a9f8e2b1c5d4f6a8e9c0b3d2f1a7e",
  "createdAt": "2025-11-01T08:00:00Z"
}
*/
```

**5. Asociar Tags NFC Automáticamente:**
```javascript
// Cuando el operario escanea tags en línea de producción
const assignment = await fetch('https://api.sicrep.cl/v1/provider/tags/assign-batch', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    batchId: 'LOT-2025-11-001',
    tags: [
      {
        uid: '04:E1:23:A2:3D:6F:80',
        timestamp: '2025-11-01T08:15:23Z',
        workstation: 'WS-05'
      },
      {
        uid: '04:E1:23:A2:3D:6F:81',
        timestamp: '2025-11-01T08:15:24Z',
        workstation: 'WS-05'
      },
      // ... hasta 1000 tags por request
    ]
  })
});

const result = await assignment.json();
/*
{
  "batchId": "LOT-2025-11-001",
  "totalTags": 2,
  "successfulAssignments": 2,
  "failedAssignments": 0,
  "details": [
    {
      "uid": "04:E1:23:A2:3D:6F:80",
      "status": "SUCCESS",
      "passportUrl": "https://sicrep.cl/v/04E123A23D6F80"
    },
    {
      "uid": "04:E1:23:A2:3D:6F:81",
      "status": "SUCCESS",
      "passportUrl": "https://sicrep.cl/v/04E123A23D6F81"
    }
  ]
}
*/
```

**6. Consultar Validaciones en Tiempo Real:**
```javascript
// Webhook para recibir notificaciones de validaciones
// SICREP enviará POST request cuando alguien valide un tag

// Configurar webhook en portal del proveedor:
// URL: https://tu-sistema.com/sicrep-webhook
// Secret: tu_secret_key

// Tu endpoint debe recibir:
app.post('/sicrep-webhook', (req, res) => {
  const { event, data, signature } = req.body;
  
  // Verificar firma HMAC-SHA256
  const expectedSignature = crypto
    .createHmac('sha256', 'tu_secret_key')
    .update(JSON.stringify(data))
    .digest('hex');
    
  if (signature !== expectedSignature) {
    return res.status(403).send('Invalid signature');
  }
  
  // Procesar evento
  switch (event) {
    case 'TAG_VALIDATED':
      /*
      data = {
        "tagUid": "04:E1:23:A2:3D:6F:80",
        "batchId": "LOT-2025-11-001",
        "productSku": "CAJ-CART-100L-80R",
        "validatedAt": "2025-11-06T14:23:45Z",
        "validatedBy": {
          "clientId": "CLI-789",
          "clientName": "Empresa ABC S.A.",
          "location": {
            "lat": -33.4489,
            "lng": -70.6693,
            "city": "Santiago",
            "region": "RM"
          }
        }
      }
      */
      
      // Actualizar tu sistema interno
      await updateInventorySystem(data);
      
      // Notificar al equipo comercial
      await notifySalesTeam(data);
      
      break;
      
    case 'BATCH_COMPLETED':
      // Lote completamente validado
      break;
      
    case 'TAG_DEACTIVATED':
      // Tag desactivado (producto dañado)
      break;
  }
  
  res.status(200).send('OK');
});
```

**7. Exportar Reportes Automáticamente:**
```javascript
// Obtener reporte de validaciones del mes
const report = await fetch(
  'https://api.sicrep.cl/v1/provider/reports/validations?' +
  'period=2025-11&format=json',
  { headers }
);

const reportData = await report.json();
/*
{
  "period": "2025-11",
  "provider": {
    "id": "PROV-00123",
    "name": "Cartones Sustentables S.A."
  },
  "summary": {
    "totalValidations": 15847,
    "uniqueClients": 67,
    "topProduct": {
      "sku": "CAJ-CART-100L-80R",
      "validations": 5234
    }
  },
  "validations": [
    {
      "tagUid": "04:E1:23:A2:3D:6F:80",
      "batchId": "LOT-2025-11-001",
      "validatedAt": "2025-11-06T14:23:45Z",
      "client": "Empresa ABC S.A.",
      "location": "Santiago, RM"
    },
    // ... 15,847 registros
  ]
}
*/
```

**Librerías SDK Disponibles:**

```bash
# JavaScript/TypeScript
npm install @sicrep/provider-sdk

# Python
pip install sicrep-provider-sdk

# Java
# Maven
<dependency>
    <groupId>cl.sicrep</groupId>
    <artifactId>provider-sdk</artifactId>
    <version>1.0.0</version>
</dependency>

# .NET
dotnet add package SICREP.Provider.SDK
```

**Ejemplo con SDK JavaScript:**
```javascript
import { SICREPProvider } from '@sicrep/provider-sdk';

// Inicializar cliente
const sicrep = new SICREPProvider({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  environment: 'production' // o 'sandbox'
});

// Crear lote
const batch = await sicrep.batches.create({
  productSku: 'CAJ-CART-100L-80R',
  quantity: 5000,
  productionStart: new Date('2025-11-01T08:00:00Z'),
  // ... más campos
});

// Asociar tags
const result = await sicrep.tags.assignBatch(batch.id, [
  '04:E1:23:A2:3D:6F:80',
  '04:E1:23:A2:3D:6F:81',
  // ...
]);

// Obtener validaciones
const validations = await sicrep.validations.list({
  period: '2025-11',
  batchId: batch.id
});
```

**Tiempo de implementación:** 4-6 semanas  
**Costo de setup:** $500,000 - $2,000,000 CLP (según complejidad)  
**Requisitos técnicos:** Equipo de desarrollo interno o externo

---

<a name="api"></a>
## 8. API DEL MÓDULO PROVEEDOR

### 8.1 Endpoints Principales

**Base URL:** `https://api.sicrep.cl/v1`

**Autenticación:**
Todos los endpoints requieren header:
```
Authorization: Bearer {access_token}
```

---

**Products API**

```yaml
POST /provider/products
Descripción: Crear nuevo producto en catálogo
Body:
  {
    "sku": "string",
    "name": "string",
    "description": "string",
    "category": ["string"],
    "dimensions": {
      "length": number,
      "width": number,
      "height": number,
      "unit": "cm|mm"
    },
    "weight": number,
    "recycledContent": number (0-100),
    "recyclability": number (0-100),
    "certifications": ["string"]
  }
Response:
  {
    "id": "string",
    "sku": "string",
    "status": "ACTIVE",
    "createdAt": "ISO8601"
  }

---

GET /provider/products
Descripción: Listar productos del proveedor
Query params:
  - page: number (default: 1)
  - limit: number (default: 50, max: 100)
  - sku: string (filtro)
  - category: string (filtro)
Response:
  {
    "total": number,
    "page": number,
    "limit": number,
    "products": [...]
  }

---

GET /provider/products/:sku
Descripción: Obtener producto específico
Response:
  {
    "id": "string",
    "sku": "string",
    "name": "string",
    ...
  }

---

PUT /provider/products/:sku
Descripción: Actualizar producto
Body: (campos a actualizar)
Response:
  {
    "id": "string",
    "sku": "string",
    "updatedAt": "ISO8601"
  }

---

DELETE /provider/products/:sku
Descripción: Eliminar producto (solo si no tiene lotes asociados)
Response:
  {
    "success": true,
    "deletedAt": "ISO8601"
  }
```

---

**Batches API**

```yaml
POST /provider/batches
Descripción: Crear nuevo lote de producción
Body:
  {
    "productSku": "string",
    "quantity": number,
    "productionStart": "ISO8601",
    "productionEnd": "ISO8601",
    "plant": "string",
    "supervisor": "string",
    "materials": {
      "recycled": {
        "weight": number,
        "supplier": "string",
        "supplierRut": "string"
      },
      "virgin": {
        "weight": number
      }
    },
    "qualityControl": {
      "inspector": "string",
      "tests": ["string"],
      "status": "APPROVED|REJECTED"
    }
  }
Response:
  {
    "id": "string",
    "productSku": "string",
    "quantity": number,
    "status": "ACTIVE",
    "blockchainTx": "string",
    "createdAt": "ISO8601"
  }

---

GET /provider/batches
Descripción: Listar lotes del proveedor
Query params:
  - page: number
  - limit: number
  - status: ACTIVE|CLOSED|CANCELLED
  - productSku: string
  - startDate: ISO8601
  - endDate: ISO8601
Response:
  {
    "total": number,
    "batches": [...]
  }

---

GET /provider/batches/:batchId
Descripción: Obtener detalle de lote
Response:
  {
    "id": "string",
    "productSku": "string",
    "quantity": number,
    "tagsAssigned": number,
    "tagsValidated": number,
    "status": "string",
    "materials": {...},
    "qualityControl": {...},
    "blockchainTx": "string",
    "createdAt": "ISO8601"
  }

---

PUT /provider/batches/:batchId/close
Descripción: Cerrar lote (finalizar producción)
Response:
  {
    "id": "string",
    "status": "CLOSED",
    "closedAt": "ISO8601"
  }
```

---

**Tags API**

```yaml
POST /provider/tags/assign-batch
Descripción: Asociar múltiples tags a un lote
Body:
  {
    "batchId": "string",
    "tags": [
      {
        "uid": "string",
        "timestamp": "ISO8601",
        "workstation": "string" (opcional)
      }
    ]
  }
Limits:
  - Máximo 1,000 tags por request
  - Rate limit: 100 requests/minuto
Response:
  {
    "batchId": "string",
    "totalTags": number,
    "successfulAssignments": number,
    "failedAssignments": number,
    "details": [
      {
        "uid": "string",
        "status": "SUCCESS|ERROR",
        "passportUrl": "string",
        "error": "string" (si ERROR)
      }
    ]
  }

---

GET /provider/tags/:uid
Descripción: Obtener información de un tag específico
Response:
  {
    "uid": "string",
    "batchId": "string",
    "productSku": "string",
    "status": "ASSIGNED|VALIDATED|DEACTIVATED",
    "assignedAt": "ISO8601",
    "validations": number,
    "lastValidation": {
      "timestamp": "ISO8601",
      "client": "string",
      "location": {...}
    },
    "passportUrl": "string"
  }

---

PUT /provider/tags/:uid/deactivate
Descripción: Desactivar tag (producto dañado/retirado)
Body:
  {
    "reason": "DAMAGED|RECALLED|OTHER",
    "notes": "string"
  }
Response:
  {
    "uid": "string",
    "status": "DEACTIVATED",
    "deactivatedAt": "ISO8601"
  }
```

---

**Validations API**

```yaml
GET /provider/validations
Descripción: Listar validaciones de tags del proveedor
Query params:
  - page: number
  - limit: number
  - batchId: string
  - productSku: string
  - startDate: ISO8601
  - endDate: ISO8601
  - clientId: string
  - region: string
Response:
  {
    "total": number,
    "validations": [
      {
        "id": "string",
        "tagUid": "string",
        "batchId": "string",
        "productSku": "string",
        "validatedAt": "ISO8601",
        "client": {
          "id": "string",
          "name": "string",
          "rut": "string"
        },
        "location": {
          "lat": number,
          "lng": number,
          "city": "string",
          "region": "string"
        }
      }
    ]
  }

---

GET /provider/validations/stats
Descripción: Estadísticas de validaciones
Query params:
  - period: YYYY-MM|YYYY-WW|YYYY
Response:
  {
    "period": "string",
    "totalValidations": number,
    "uniqueClients": number,
    "uniqueTags": number,
    "byProduct": [
      {
        "sku": "string",
        "validations": number,
        "percentage": number
      }
    ],
    "byRegion": [...],
    "byDay": [...]
  }
```

---

**Reports API**

```yaml
GET /provider/reports/validations
Descripción: Generar reporte de validaciones
Query params:
  - period: YYYY-MM
  - format: json|pdf|excel
Response (json):
  {
    "period": "string",
    "provider": {...},
    "summary": {...},
    "validations": [...]
  }
Response (pdf|excel):
  Content-Type: application/pdf | application/vnd.ms-excel
  Content-Disposition: attachment; filename="..."

---

GET /provider/reports/traceability/:batchId
Descripción: Generar reporte de trazabilidad de lote
Query params:
  - format: json|pdf
Response:
  Reporte completo con toda la cadena de trazabilidad

---

GET /provider/reports/compliance
Descripción: Generar reporte de cumplimiento REP
Query params:
  - year: YYYY
  - format: json|pdf
Response:
  Reporte oficial para SMA/MMA con:
  - Certificación vigente
  - Lotes producidos
  - Material reciclado
  - Validaciones
  - Blockchain verification
```

---

### 8.2 Webhooks

SICREP puede enviar notificaciones en tiempo real a tu sistema:

**Configuración:**
1. Portal del Proveedor → Configuración → Webhooks
2. Agregar URL de tu endpoint: `https://tu-sistema.com/sicrep-webhook`
3. Seleccionar eventos a recibir
4. Generar y guardar Secret Key

**Eventos Disponibles:**

```yaml
TAG_VALIDATED:
  Descripción: Un tag fue validado por un cliente
  Payload:
    {
      "event": "TAG_VALIDATED",
      "timestamp": "ISO8601",
      "data": {
        "tagUid": "string",
        "batchId": "string",
        "productSku": "string",
        "validatedAt": "ISO8601",
        "validatedBy": {
          "clientId": "string",
          "clientName": "string",
          "location": {...}
        }
      },
      "signature": "string"
    }

---

BATCH_COMPLETED:
  Descripción: Todos los tags de un lote fueron asociados
  Payload:
    {
      "event": "BATCH_COMPLETED",
      "timestamp": "ISO8601",
      "data": {
        "batchId": "string",
        "productSku": "string",
        "quantity": number,
        "tagsAssigned": number,
        "completedAt": "ISO8601"
      },
      "signature": "string"
    }

---

TAG_DEACTIVATED:
  Descripción: Un tag fue desactivado
  Payload:
    {
      "event": "TAG_DEACTIVATED",
      "timestamp": "ISO8601",
      "data": {
        "tagUid": "string",
        "reason": "string",
        "deactivatedAt": "ISO8601"
      },
      "signature": "string"
    }

---

CERTIFICATE_EXPIRING:
  Descripción: Certificación del proveedor próxima a vencer
  Payload:
    {
      "event": "CERTIFICATE_EXPIRING",
      "timestamp": "ISO8601",
      "data": {
        "certificateId": "string",
        "expiresAt": "ISO8601",
        "daysUntilExpiry": number
      },
      "signature": "string"
    }
```

**Verificación de Firma:**

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return signature === expectedSignature;
}

// En tu endpoint
app.post('/sicrep-webhook', (req, res) => {
  const { event, data, signature } = req.body;
  
  if (!verifySignature({ event, data }, signature, YOUR_SECRET_KEY)) {
    return res.status(403).send('Invalid signature');
  }
  
  // Procesar evento...
  res.status(200).send('OK');
});
```

---

<a name="app-movil"></a>
## 9. APP MÓVIL DE VALIDACIÓN

### 9.1 SICREP App (Cliente)

Aplicación gratuita disponible en App Store y Google Play para que **clientes** puedan validar productos certificados.

**Funcionalidades:**
- 📱 Escaneo NFC instantáneo
- ✅ Validación de certificación
- 📊 Ver trazabilidad completa
- 🌐 Funciona offline (caché)
- 📷 También soporta QR codes
- 🔔 Notificaciones de productos

### 9.2 SICREP Proveedor App

Aplicación dedicada para **proveedores** certificados.

**Funcionalidades:**
- 🏷️ Asociar tags NFC a lotes
- 📦 Crear lotes en terreno
- 📊 Ver validaciones en tiempo real
- 📈 Dashboard móvil
- 🔔 Alertas de validaciones
- 📤 Compartir certificados

**Flujo de Uso:**

```
OPERARIO EN PLANTA
       │
       ▼
[1] Abre SICREP Proveedor App
       │
       ▼
[2] Login con credenciales
       │
       ▼
[3] Selecciona lote activo
    (Ej: LOT-2025-11-001)
       │
       ▼
[4] Activa modo "Escanear Tags"
       │
       ▼
[5] Acerca smartphone al tag NFC
       │
       ▼
[6] App lee UID automáticamente
       │
       ▼
[7] Envía request a API SICREP
       │
       ▼
[8] API valida y asocia tag → lote
       │
       ▼
[9] App muestra confirmación:
    ✅ Tag 04:E1:23:A2:3D:6F:80
    ✅ Asociado a LOT-2025-11-001
    🔊 [Vibración + Sonido]
       │
       ▼
[10] Operario pega tag en producto
        │
        ▼
[11] Repite para próximo tag
```

**Velocidad:** ~10-15 tags/minuto por operario

---

<a name="precios"></a>
## 10. PRECIOS Y PLANES

### 10.1 Costos del Módulo NFC

**No hay costo mensual** - Solo pagas por lo que usas:

| Concepto | Precio |
|---|---|
| **Activación del Módulo** | Gratis |
| **Uso del Portal Web** | Gratis |
| **App Móvil Proveedor** | Gratis |
| **API Calls** | Gratis (hasta 100,000/mes) |
| **Tags NFC (1,000 uds)** | $350,000 CLP |
| **Tags NFC (5,000 uds)** | $1,600,000 CLP (-9%) |
| **Tags NFC (10,000 uds)** | $2,800,000 CLP (-20%) |
| **Tags NFC (50,000+ uds)** | Cotización (-30%) |

**Tags con Logo Personalizado:**
- Setup fee: $150,000 CLP (una vez)
- +$50 CLP/tag adicional

**Integración API Custom:**
- Desde $500,000 CLP (según complejidad)
- Incluye: Setup, documentación, soporte

### 10.2 ROI Estimado

**Caso Real: Proveedor Mediano**
```yaml
Empresa: Fabricante de cajas de cartón
Volumen: 50,000 cajas/mes
Certificación: Verde (92 pts)

Inversión:
  Tags NFC (50,000): $2,500,000 (precio por volumen)
  Capacitación: $0 (incluida)
  Setup: $0
  Total inicial: $2,500,000

Beneficios Mensuales:
  Aumento en ventas (+20%): $8,000,000
  Premium en precio (+10%): $4,000,000
  Reducción de auditorías: $500,000
  Menos devoluciones: $300,000
  Total mensual: $12,800,000

ROI:
  Mes 1: -$2,500,000 (inversión)
  Mes 2: $10,300,000 (beneficios - inversión)
  Payback: < 1 mes
  ROI anual: 6,040%
```

**Beneficios Intangibles:**
- ✅ Imagen de marca mejorada
- ✅ Confianza de clientes aumentada
- ✅ Acceso a licitaciones premium
- ✅ Cumplimiento normativo simplificado
- ✅ Trazabilidad para reportes ESG
- ✅ Diferenciación vs competencia

---

## 11. SOPORTE Y CONTACTO

**Soporte Técnico:**
- Email: soporte@sicrep.cl
- WhatsApp: +56 9 1234 5678
- Horario: Lun-Vie 9:00-18:00

**Ventas:**
- Email: ventas@sicrep.cl
- Teléfono: +56 2 2345 6789

**Documentación:**
- Portal: https://docs.sicrep.cl
- API Reference: https://api.sicrep.cl/docs
- Video tutoriales: https://www.youtube.com/@sicrep

**Comunidad:**
- Forum: https://community.sicrep.cl
- GitHub: https://github.com/sicrep

---

**Documento generado:** Noviembre 2025  
**Versión:** 3.0  
**Próxima revisión:** Febrero 2026  
**Estado:** VIGENTE
