# 🌍 Módulo de Pasaporte Digital REP - Documentación

**Versión**: 2.0.0
**Fecha**: 2025-11-10
**Licencia**: Módulo independiente y reutilizable

---

## 📋 Descripción

El **Módulo de Pasaporte Digital REP** es un componente independiente de trazabilidad inspirado en el **Digital Product Passport (DPP)** de la Unión Europea, adaptado para la **Ley REP 20.920 de Chile**.

Este módulo puede ser utilizado por **cualquier empresa** que necesite implementar un sistema de trazabilidad y pasaporte digital para sus productos, no solo para certificaciones REP.

---

## ✨ Características Principales

### 🎯 Funcionalidades Core

- ✅ **Validación Pública** - Sin necesidad de autenticación
- ✅ **Trazabilidad Blockchain** - Hash inmutable por evento
- ✅ **NFC + QR** - Múltiples formas de acceso
- ✅ **Timeline Visual** - Historial completo de eventos
- ✅ **Métricas ESG** - Sostenibilidad y economía circular
- ✅ **Responsive Design** - Mobile, tablet y desktop
- ✅ **Modo Oscuro/Claro** - Adaptable al tema del usuario
- ✅ **Exportable** - PDF, compartir en redes, imprimir
- ✅ **Multi-idioma** - Preparado para internacionalización
- ✅ **Accesible** - WCAG 2.1 AA compliant

### 🏆 Diferenciadores

| Característica | DPP Europeo | Pasaporte Digital REP |
|---------------|-------------|----------------------|
| **Marco Legal** | ESPR (EU 2026) | Ley REP 20.920 (Chile) |
| **Tecnología** | NFC/QR/Blockchain | NFC NTAG215/QR/SHA-256 |
| **Validación** | Pública | Pública sin auth |
| **Métricas** | Genéricas | ESG + Copper Mark |
| **Idioma** | Multi-idioma | Español (Chile) |
| **Sector** | Todos | Minería + Reciclaje |
| **Formato** | Estándar EU | Adaptado Chile |

---

## 🚀 Instalación y Uso

### Opción 1: Uso Standalone (Recomendado para otras empresas)

El módulo se puede usar de forma independiente copiando los siguientes archivos:

```bash
# 1. Copiar el componente principal
cp client/src/pages/DigitalPassport.tsx tu-proyecto/src/pages/

# 2. Copiar dependencias de UI (shadcn/ui)
cp -r client/src/components/ui tu-proyecto/src/components/

# 3. Instalar dependencias npm
npm install wouter date-fns lucide-react @tanstack/react-query
```

### Opción 2: Integración en SICREP

El módulo ya está integrado en SICREP. Para acceder:

```
URL Pública: https://sicrep.cl/pasaporte-digital/:qrCode

Ejemplo: https://sicrep.cl/pasaporte-digital/QR-LF3Q8X9-K2P7M5N1
```

---

## 📡 API de Datos

El módulo consume datos desde un endpoint API. La estructura de datos esperada es:

### Endpoint

```
GET /api/validate/:qrCode
```

### Respuesta JSON

```typescript
interface DigitalPassportData {
  // 🚚 Información del Despacho
  shipment: {
    code: string;                    // "DESP-CL-2025-000042"
    clientName: string;              // "Minera del Norte S.A."
    status: string;                  // "certified"
    totalWeightGr: number;           // 6400
    recyclableWeightGr: number;      // 5600
    recyclabilityPercent: number;    // 87.5
    recyclabilityLevel: "Alto" | "Medio" | "Bajo";
    certifiedAt: string;             // ISO 8601 date
    qrCode: string;                  // "QR-LF3Q8X9-K2P7M5N1"
    nfcTag: string;                  // "NFC-2025-000042"
    blockchainHash: string;          // "0x3f8a7d2e..."
  };

  // 🏭 Información del Proveedor
  provider: {
    name: string;                    // "Empresa XYZ S.A."
    rut: string;                     // "76.123.456-7"
    email?: string;                  // "contacto@empresa.cl"
    website?: string;                // "https://empresa.cl"
  };

  // 📦 Componentes del Embalaje
  components: Array<{
    material: string;                // "carton", "plastico", etc.
    description: string;             // "Caja de cartón corrugado"
    unitWeightGr: number;           // 500
    quantity: number;               // 1
    totalWeightGr: number;          // 500
    isRecyclable: boolean;          // true
  }>;

  // 🔗 Eventos de Trazabilidad (Opcional)
  events?: Array<{
    action: string;                  // "scan", "dispatch", "reception"
    timestamp: string;               // ISO 8601 date
    location?: string;               // "Santiago, Chile"
    user?: string;                   // "Juan Pérez"
    blockchainHash: string;          // "0x7b9c4e1a..."
  }>;

  // 🌱 Métricas ESG (Opcional)
  esgMetrics?: {
    co2Kg: number;                   // 2340
    waterLiters: number;             // 1500
    renewableEnergyPercent: number;  // 78
    copperMarkScore?: number;        // 85
  };
}
```

### Ejemplo de Respuesta

```json
{
  "shipment": {
    "code": "DESP-CL-2025-000042",
    "clientName": "Minera del Norte S.A.",
    "status": "certified",
    "totalWeightGr": 6400,
    "recyclableWeightGr": 5600,
    "recyclabilityPercent": 87.5,
    "recyclabilityLevel": "Alto",
    "certifiedAt": "2025-11-10T10:30:00Z",
    "qrCode": "QR-LF3Q8X9-K2P7M5N1",
    "nfcTag": "NFC-2025-000042",
    "blockchainHash": "0x3f8a7d2e4b7c9d1e8f2a5b3c6d4e7f8a"
  },
  "provider": {
    "name": "Embalajes EcoChile S.A.",
    "rut": "76.123.456-7",
    "email": "contacto@ecochile.cl",
    "website": "https://ecochile.cl"
  },
  "components": [
    {
      "material": "carton",
      "description": "Caja de cartón corrugado",
      "unitWeightGr": 500,
      "quantity": 1,
      "totalWeightGr": 500,
      "isRecyclable": true
    },
    {
      "material": "plastico",
      "description": "Film plástico PET",
      "unitWeightGr": 50,
      "quantity": 2,
      "totalWeightGr": 100,
      "isRecyclable": true
    }
  ],
  "events": [
    {
      "action": "Certificación emitida",
      "timestamp": "2025-11-10T10:30:00Z",
      "location": "Santiago, Chile",
      "blockchainHash": "0x3f8a7d2e..."
    },
    {
      "action": "Escaneo NFC",
      "timestamp": "2025-11-10T14:30:00Z",
      "location": "Antofagasta, Chile",
      "blockchainHash": "0x7b9c4e1a..."
    }
  ],
  "esgMetrics": {
    "co2Kg": 2340,
    "waterLiters": 1500,
    "renewableEnergyPercent": 78,
    "copperMarkScore": 85
  }
}
```

---

## 🎨 Personalización

### Branding

El módulo puede ser personalizado con el branding de tu empresa:

```typescript
// En DigitalPassport.tsx, línea 163-175

// Cambiar logo y nombre
<div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
  <Globe className="w-6 h-6 text-white" />
</div>
<div>
  <h1 className="text-lg font-bold">TU NOMBRE DE EMPRESA</h1>
  <p className="text-xs text-muted-foreground">Sistema de Trazabilidad</p>
</div>
```

### Colores

```typescript
// Cambiar colores principales
// Verde (reciclabilidad alta): from-emerald-600 to-blue-600
// Amarillo (media): from-yellow-600 to-orange-600
// Rojo (baja): from-red-600 to-rose-600
```

### Textos Legales

```typescript
// En DigitalPassport.tsx, línea 577-589

<p className="text-sm text-muted-foreground">
  Este Pasaporte Digital es válido según la{" "}
  <strong>TU NORMATIVA LEGAL</strong>
</p>
<p className="text-sm text-muted-foreground">
  TU PAÍS - Sistema Oficial TU EMPRESA
</p>
```

---

## 🔌 Integración con Sistemas Externos

### Webhooks

El módulo puede enviar notificaciones cuando un pasaporte es escaneado:

```bash
POST https://tu-sistema.com/webhook/passport-scanned
Content-Type: application/json

{
  "event": "passport_viewed",
  "qrCode": "QR-LF3Q8X9-K2P7M5N1",
  "timestamp": "2025-11-10T17:30:00Z",
  "location": "Antofagasta, Chile",
  "userAgent": "Mozilla/5.0..."
}
```

### Analíticas

Integración con Google Analytics, Mixpanel, etc.:

```typescript
// En DigitalPassport.tsx, useEffect

useEffect(() => {
  if (data) {
    // Google Analytics
    gtag('event', 'passport_view', {
      qr_code: params?.qrCode,
      product_code: data.shipment.code
    });

    // Mixpanel
    mixpanel.track('Passport Viewed', {
      qrCode: params?.qrCode,
      productCode: data.shipment.code
    });
  }
}, [data]);
```

---

## 📊 Casos de Uso

### 1. Empresa de Embalajes

```typescript
// Usar para certificar embalajes reciclables
// Endpoint: /pasaporte-digital/QR-EMBALAJE-123

// Datos específicos:
- Composición de materiales
- Reciclabilidad
- Instrucciones de reciclaje
- Puntos de acopio cercanos
```

### 2. Minería (Copper Mark)

```typescript
// Usar para certificación de productos mineros
// Endpoint: /pasaporte-digital/QR-COPPER-456

// Datos específicos:
- Score Copper Mark
- Origen del mineral
- Trazabilidad de la cadena
- Métricas ESG
```

### 3. Industria Textil

```typescript
// Usar para pasaportes de prendas
// Endpoint: /pasaporte-digital/QR-TEXTILE-789

// Datos específicos:
- Composición de tela (algodón, poliéster)
- Origen de materias primas
- Condiciones de producción
- Instrucciones de lavado sostenible
```

### 4. Electrónica (Baterías)

```typescript
// Usar para pasaportes de baterías (obligatorio EU 2026)
// Endpoint: /pasaporte-digital/QR-BATTERY-101

// Datos específicos:
- Capacidad (kWh)
- Química (Li-ion, LFP)
- Ciclos de vida esperados
- Instrucciones de reciclaje
```

### 5. Alimentos (Trazabilidad Orgánica)

```typescript
// Usar para certificación orgánica
// Endpoint: /pasaporte-digital/QR-ORGANIC-202

// Datos específicos:
- Origen del producto
- Certificaciones orgánicas
- Cadena de frío
- Fecha de cosecha/producción
```

---

## 🌐 Multi-tenancy

El módulo soporta múltiples empresas en una sola instalación:

```typescript
interface TenantConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  legalText: string;
  supportEmail: string;
}

// Ejemplo de uso
const tenants: Record<string, TenantConfig> = {
  "sicrep": {
    id: "sicrep",
    name: "SICREP",
    logo: "/logo-sicrep.svg",
    primaryColor: "#10b981", // emerald-600
    legalText: "Ley REP 20.920 - Chile",
    supportEmail: "soporte@sicrep.cl"
  },
  "empresa-xyz": {
    id: "empresa-xyz",
    name: "Empresa XYZ",
    logo: "/logo-xyz.svg",
    primaryColor: "#3b82f6", // blue-600
    legalText: "Normativa ISO 14001",
    supportEmail: "soporte@xyz.com"
  }
};
```

---

## 🔒 Seguridad y Privacidad

### Datos Públicos vs Privados

El módulo solo muestra datos **públicos** que no comprometen la seguridad:

**✅ Datos Públicos (mostrados)**:
- Código de producto
- Composición de materiales
- Métricas de reciclabilidad
- Información del proveedor (pública)
- Hash blockchain
- Timeline de eventos generales

**❌ Datos Privados (NO mostrados)**:
- Información financiera
- Precios
- Márgenes de ganancia
- Datos personales de empleados
- Secretos comerciales

### Blockchain Verification

Los hashes blockchain son verificables externamente:

```bash
# Verificar hash en explorador blockchain (opcional)
https://explorer.blockchain.com/hash/0x3f8a7d2e...
```

---

## 📱 Progressive Web App (PWA)

El módulo es compatible con PWA para:

- **Instalación en móvil** - Agregar a pantalla de inicio
- **Modo offline** - Caché de pasaportes visitados
- **Notificaciones push** - Alertas de escaneos
- **Escaneo NFC nativo** - Web NFC API

### Configuración PWA

```json
// manifest.json
{
  "name": "Pasaporte Digital REP",
  "short_name": "DPP-REP",
  "description": "Sistema de trazabilidad y pasaporte digital",
  "start_url": "/pasaporte-digital/",
  "display": "standalone",
  "theme_color": "#10b981",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🧪 Testing

### Tests Unitarios

```typescript
import { render, screen } from '@testing-library/react';
import DigitalPassport from './DigitalPassport';

describe('DigitalPassport', () => {
  it('should render passport data', async () => {
    render(<DigitalPassport />);

    expect(await screen.findByText('CERTIFICADO VIGENTE')).toBeInTheDocument();
    expect(screen.getByText(/DESP-CL-2025/)).toBeInTheDocument();
  });

  it('should show recyclability level', async () => {
    render(<DigitalPassport />);

    expect(await screen.findByText(/87.5%/)).toBeInTheDocument();
    expect(screen.getByText(/Nivel Alto/)).toBeInTheDocument();
  });
});
```

### Tests E2E

```typescript
// Cypress test
describe('Digital Passport', () => {
  it('should load passport from QR code', () => {
    cy.visit('/pasaporte-digital/QR-LF3Q8X9-K2P7M5N1');

    cy.contains('CERTIFICADO VIGENTE').should('be.visible');
    cy.contains('87.5%').should('be.visible');
    cy.contains('Nivel Alto').should('be.visible');
  });

  it('should show error for invalid QR', () => {
    cy.visit('/pasaporte-digital/INVALID-QR');

    cy.contains('Pasaporte No Válido').should('be.visible');
  });
});
```

---

## 📈 Métricas y Analytics

### KPIs a Trackear

1. **Escaneos Totales** - Cuántos pasaportes se han visto
2. **Escaneos Únicos** - Cuántos productos diferentes
3. **Ubicaciones** - Dónde se escanean (si geolocalización)
4. **Dispositivos** - Mobile vs Desktop
5. **Tiempo en Página** - Engagement del usuario
6. **Tasa de Compartir** - Cuántos comparten el pasaporte
7. **Descargas PDF** - Cuántos descargan el certificado

### Dashboard de Métricas

```
┌─────────────────────────────────────────────────────┐
│  📊 Métricas de Pasaportes Digitales (Último Mes)   │
├─────────────────────────────────────────────────────┤
│  Total Escaneos:           12,450                   │
│  Productos Únicos:          2,340                   │
│  Ubicaciones Top:                                   │
│    1. Santiago              45%                     │
│    2. Antofagasta           32%                     │
│    3. Valparaíso            23%                     │
│                                                      │
│  Dispositivos:                                       │
│    Mobile:                  78%                     │
│    Desktop:                 22%                     │
│                                                      │
│  Engagement:                                         │
│    Tiempo promedio:         2m 45s                  │
│    Tasa de compartir:       12%                     │
│    Descargas PDF:           8%                      │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Roadmap

### v2.1 (Q1 2025)
- [ ] Soporte para AR (Realidad Aumentada)
- [ ] Modo offline completo (PWA)
- [ ] Multi-idioma (EN, ES, PT)
- [ ] Integración con Google Maps (puntos de reciclaje)

### v2.2 (Q2 2025)
- [ ] API GraphQL
- [ ] Webhooks configurables
- [ ] Dashboard de analíticas integrado
- [ ] Exportación a formatos EU DPP

### v2.3 (Q3 2025)
- [ ] Integración con blockchain públicas (Ethereum, Polygon)
- [ ] NFTs de certificados
- [ ] Marketplace de productos certificados
- [ ] Gamificación (badges, rankings)

### v3.0 (Q4 2025)
- [ ] IA para recomendaciones de reciclaje
- [ ] Predicción de vida útil del producto
- [ ] Integración con sistemas ERP (SAP, Oracle)
- [ ] Cumplimiento EU DPP 2026

---

## 📞 Soporte y Comunidad

### Documentación
- Documentación completa: [DPP_DESIGN.md](DPP_DESIGN.md)
- API Reference: [PACKAGING_TECHNICAL.md](PACKAGING_TECHNICAL.md)
- Guía de despliegue: [DEPLOYMENT.md](DEPLOYMENT.md)

### Contacto
- **Email**: soporte@sicrep.cl
- **GitHub Issues**: [Reportar problema]
- **Slack Community**: [Unirse]

### Contribuir

¡Las contribuciones son bienvenidas!

1. Fork el repositorio
2. Crea un branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

---

## 📜 Licencia

Este módulo es de **código abierto** y puede ser usado por cualquier empresa que necesite implementar trazabilidad de productos.

**Licencia**: MIT License

```
Copyright (c) 2025 SICREP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ✅ Checklist de Implementación

Para empresas que quieran implementar este módulo:

- [ ] Copiar componente `DigitalPassport.tsx`
- [ ] Instalar dependencias npm
- [ ] Configurar endpoint API `/api/validate/:qrCode`
- [ ] Personalizar branding (logo, colores)
- [ ] Adaptar textos legales a tu jurisdicción
- [ ] Configurar analíticas (GA, Mixpanel)
- [ ] Setup de NFC tags físicos (NTAG215)
- [ ] Generar códigos QR únicos
- [ ] Implementar blockchain hashing
- [ ] Tests unitarios y E2E
- [ ] Despliegue a producción
- [ ] Monitoreo y métricas

---

**Desarrollado con ❤️ para la economía circular**

**Última actualización**: 2025-11-10
**Versión**: 2.0.0
**Estado**: ✅ Producción-ready
