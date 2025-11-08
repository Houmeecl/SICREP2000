# PASAPORTE DIGITAL REP
## Sistema de Trazabilidad y Validación Pública

**Versión:** 2.0  
**Fecha:** Noviembre 2025

---

## TABLA DE CONTENIDOS

1. [Concepto del Pasaporte Digital](#concepto)
2. [Arquitectura de Trazabilidad](#arquitectura)
3. [Especificación de la Página Pública](#pagina-publica)
4. [Blockchain y Verificación](#blockchain)
5. [Código QR y Validación](#qr-validation)
6. [API Pública de Validación](#api-publica)
7. [Journey del Usuario](#journey)
8. [Diseño UI/UX](#diseno)

---

<a name="concepto"></a>
## 1. CONCEPTO DEL PASAPORTE DIGITAL

### 1.1 ¿Qué es el Pasaporte Digital REP?

El **Pasaporte Digital REP** es una página web pública y verificable que muestra la **trazabilidad completa** de un certificado SICREP. Funciona como una "cédula de identidad digital" del proveedor certificado, accesible mediante escaneo de QR code o ingreso directo de URL.

### 1.2 Propósito

```yaml
Transparencia:
  - Información pública del certificado
  - Historial completo de certificación
  - Trazabilidad inmutable (blockchain)

Verificación:
  - Validación instantánea de autenticidad
  - Sin necesidad de login
  - Accesible desde cualquier dispositivo

Confianza:
  - Prueba verificable de certificación
  - Imposible de falsificar
  - Auditable por terceros
```

### 1.3 Casos de Uso

```
CASO 1: Cliente Validando Proveedor
Usuario: Gerente de Sustentabilidad de empresa cliente
Acción: Escanea QR en factura del proveedor
Resultado: Ve certificación vigente y puede descargar certificado

CASO 2: Auditor Verificando Cumplimiento
Usuario: Auditor del Ministerio del Medio Ambiente
Acción: Ingresa código del certificado en portal
Resultado: Ve trazabilidad completa y puede validar autenticidad

CASO 3: Consumidor Final Verificando Cadena
Usuario: Consumidor preocupado por el ambiente
Acción: Escanea QR en producto
Resultado: Ve cadena de proveedores certificados REP
```

---

<a name="arquitectura"></a>
## 2. ARQUITECTURA DE TRAZABILIDAD

### 2.1 Flujo de Trazabilidad

```
┌──────────────────────────────────────────────────────────────┐
│                    PROCESO DE CERTIFICACIÓN                   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│ 1. EMISIÓN DEL CERTIFICADO                                    │
│    - Certificado PDF generado                                 │
│    - QR code único creado                                     │
│    - Hash blockchain calculado                                │
│    - Timestamp UTC registrado                                 │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. REGISTRO EN BLOCKCHAIN                                     │
│    - Hash del certificado → Blockchain                        │
│    - Transacción inmutable                                    │
│    - Prueba de existencia                                     │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. GENERACIÓN DE PASAPORTE DIGITAL                            │
│    - URL pública única: /pasaporte/{qrHash}                   │
│    - Sin autenticación requerida                              │
│    - Acceso público permanente                                │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. VALIDACIÓN PÚBLICA                                         │
│    - Cualquier persona puede escanear QR                      │
│    - Verificación instantánea                                 │
│    - Trazabilidad completa visible                            │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Datos de Trazabilidad

```javascript
const passportData = {
  // INFORMACIÓN DEL CERTIFICADO
  certificate: {
    id: "SICREP-2025-001234",
    qrHash: "a3f7d8e92b1c4f5a6e8d0c3b9f2a7e1d",
    status: "ACTIVE",
    issuedDate: "2025-11-06T10:00:00Z",
    validUntil: "2026-11-06T10:00:00Z",
    category: "GREEN", // Verde, Amarillo, Rojo
    totalScore: 92,
    blockchainHash: "0x7d3a9f8e2b1c5d4f6a8e9c0b3d2f1a7e",
    blockchainTxId: "0x..."
  },
  
  // INFORMACIÓN DEL PROVEEDOR
  provider: {
    companyName: "Empaques Verde S.A.",
    rut: "76.123.456-7",
    industry: "MANUFACTURING",
    address: "Av. Providencia 1234, Santiago",
    email: "contacto@empaqueverde.cl",
    phone: "+56 2 2345 6789",
    website: "https://empaqueverde.cl"
  },
  
  // TRAZABILIDAD DEL PROYECTO
  projectTimeline: [
    {
      phase: "SOLICITUD_INICIAL",
      date: "2025-10-01T09:00:00Z",
      actor: "Cliente",
      action: "Solicitud de certificación recibida",
      details: "Proyecto PROJ-2025-456 creado"
    },
    {
      phase: "REVISION_DOCUMENTAL",
      date: "2025-10-02T14:30:00Z",
      actor: "Analista María González",
      action: "Documentos verificados",
      details: "8 documentos aprobados"
    },
    {
      phase: "EVALUACION_PRELIMINAR",
      date: "2025-10-05T11:00:00Z",
      actor: "Evaluador Carlos Ramírez",
      action: "Evaluación documental completada",
      details: "Score documental: 38/40 puntos"
    },
    {
      phase: "VISITA_TERRENO",
      date: "2025-10-10T09:00:00Z",
      actor: "Auditor Juan Pérez",
      action: "Auditoría en terreno realizada",
      details: "Instalaciones inspeccionadas, 15 fotos capturadas",
      location: {
        lat: -33.4489,
        lng: -70.6693,
        address: "Planta Santiago, Av. Providencia 1234"
      }
    },
    {
      phase: "ANALISIS_CUMPLIMIENTO",
      date: "2025-10-13T16:00:00Z",
      actor: "Analista Senior Pedro Silva",
      action: "Análisis de cumplimiento completado",
      details: "Score total: 92/100 (Categoría Verde)"
    },
    {
      phase: "DICTAMEN_TECNICO",
      date: "2025-10-15T10:00:00Z",
      actor: "Jefe Técnico Sofía Muñoz",
      action: "Dictamen técnico aprobado",
      details: "Sin observaciones. Recomendado para comité."
    },
    {
      phase: "APROBACION_COMITE",
      date: "2025-10-18T15:00:00Z",
      actor: "Comité de Certificación",
      action: "Certificación aprobada por comité",
      details: "Votación: 5/5 aprobado. Acta #2025-42"
    },
    {
      phase: "EMISION_CERTIFICADO",
      date: "2025-10-20T09:00:00Z",
      actor: "Sistema SICREP",
      action: "Certificado emitido",
      details: "PDF generado, QR creado, blockchain registrado"
    },
    {
      phase: "PUBLICACION",
      date: "2025-10-20T09:30:00Z",
      actor: "Sistema SICREP",
      action: "Pasaporte digital publicado",
      details: "URL pública activada"
    }
  ],
  
  // EVALUACIÓN DETALLADA
  evaluation: {
    documental: {
      score: 38,
      maxScore: 40,
      percentage: 95,
      criteria: [
        {
          name: "Documentos Legales",
          score: 10,
          maxScore: 10,
          items: [
            { item: "e-RUT vigente", status: "APPROVED", points: 2 },
            { item: "Certificado vigencia < 30 días", status: "APPROVED", points: 2 },
            { item: "Certificado RETC", status: "APPROVED", points: 3 },
            { item: "Certificado SMA sin sanciones", status: "APPROVED", points: 3 }
          ]
        },
        {
          name: "Procedimientos Operativos",
          score: 9,
          maxScore: 10,
          items: [
            { item: "POE información a clientes", status: "APPROVED", points: 4 },
            { item: "Plantilla reporte envases", status: "APPROVED", points: 2 },
            { item: "Plan manejo residuos", status: "APPROVED", points: 2 },
            { item: "Registros capacitación", status: "PARTIAL", points: 1, note: "Solo 6 meses de registros" }
          ]
        },
        // ... más criterios
      ]
    },
    operational: {
      score: 39,
      maxScore: 40,
      percentage: 97.5,
      criteria: [
        {
          name: "Gestión de Residuos",
          score: 10,
          maxScore: 10,
          items: [
            { item: "Puntos de reciclaje", status: "APPROVED", points: 3 },
            { item: "Señalética adecuada", status: "APPROVED", points: 2 },
            { item: "Capacitación personal", status: "APPROVED", points: 3 },
            { item: "Registro de residuos", status: "APPROVED", points: 2 }
          ]
        },
        // ... más criterios
      ]
    },
    valueAdded: {
      score: 15,
      maxScore: 20,
      percentage: 75,
      criteria: [
        {
          name: "Ecodiseño y Material Reciclado",
          score: 8,
          maxScore: 10,
          items: [
            { item: "Uso material reciclado 30%+", status: "APPROVED", points: 5 },
            { item: "Diseño embalajes sostenibles", status: "APPROVED", points: 3 }
          ]
        },
        {
          name: "Certificaciones Adicionales",
          score: 7,
          maxScore: 10,
          items: [
            { item: "ISO 14001", status: "APPROVED", points: 5 },
            { item: "ISO 9001", status: "NOT_PRESENT", points: 0 }
          ]
        }
      ]
    }
  },
  
  // AUDITOR Y EQUIPO
  team: {
    auditor: {
      name: "Juan Pérez Contreras",
      certification: "ISO 14001 Lead Auditor",
      license: "AUD-2023-089",
      experience: "8 años"
    },
    reviewer: {
      name: "Sofía Muñoz Lagos",
      role: "Jefe Técnico",
      license: "JT-2020-045"
    }
  },
  
  // DOCUMENTOS Y EVIDENCIAS
  documents: {
    certificatePDF: "/api/certificates/SICREP-2025-001234/pdf",
    auditReport: "/api/audits/AUD-2025-789/report",
    evidencePhotos: [
      "/api/photos/evidence-001.jpg",
      "/api/photos/evidence-002.jpg",
      // ... hasta 15 fotos
    ]
  },
  
  // RENOVACIONES Y HISTORIAL
  history: [
    {
      certificateId: "SICREP-2024-005678",
      issuedDate: "2024-11-06T10:00:00Z",
      validUntil: "2025-11-06T10:00:00Z",
      score: 89,
      category: "GREEN",
      status: "EXPIRED"
    }
  ],
  
  // VERIFICACIÓN BLOCKCHAIN
  blockchainVerification: {
    network: "Ethereum Mainnet",
    contractAddress: "0x...",
    transactionHash: "0x7d3a9f8e2b1c5d4f6a8e9c0b3d2f1a7e",
    blockNumber: 18456789,
    timestamp: "2025-10-20T09:00:00Z",
    status: "CONFIRMED",
    confirmations: 1234
  }
};
```

---

<a name="pagina-publica"></a>
## 3. ESPECIFICACIÓN DE LA PÁGINA PÚBLICA

### 3.1 URL Structure

```
URL Pública: https://sicrep.cl/pasaporte/{qrHash}

Ejemplos:
- https://sicrep.cl/pasaporte/a3f7d8e92b1c4f5a6e8d0c3b9f2a7e1d
- https://sicrep.cl/pasaporte/SICREP-2025-001234 (alias)

Features:
- No requiere login
- Accesible vía QR code
- SEO-friendly (Open Graph tags)
- Responsive (mobile-first)
- PWA-ready (offline cache)
```

### 3.2 Layout de la Página

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                              │
│  Logo SICREP            PASAPORTE DIGITAL REP               │
│                                                             │
│  [Validado ✓] Certificación Vigente hasta Nov 2026         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    HERO SECTION                             │
│                                                             │
│     ┌──────────┐         EMPAQUES VERDE S.A.               │
│     │  LOGO    │         RUT: 76.123.456-7                 │
│     │ EMPRESA  │         Certificación Categoría VERDE     │
│     └──────────┘         Score: 92/100                      │
│                                                             │
│  [Descargar Certificado PDF] [Compartir] [Imprimir]        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TABS NAVIGATION                          │
│  [Resumen] [Evaluación] [Trazabilidad] [Blockchain]        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TAB 1: RESUMEN                           │
│                                                             │
│  Información del Certificado                                │
│  ├─ ID: SICREP-2025-001234                                  │
│  ├─ Emitido: 06 Nov 2025                                    │
│  ├─ Válido hasta: 06 Nov 2026                               │
│  └─ Estado: ACTIVO ✓                                        │
│                                                             │
│  Información del Proveedor                                  │
│  ├─ Empresa: Empaques Verde S.A.                            │
│  ├─ RUT: 76.123.456-7                                       │
│  ├─ Industria: Manufactura                                  │
│  ├─ Dirección: Av. Providencia 1234, Santiago              │
│  ├─ Email: contacto@empaqueverde.cl                         │
│  ├─ Teléfono: +56 2 2345 6789                               │
│  └─ Website: empaqueverde.cl                                │
│                                                             │
│  Score de Certificación                                     │
│  ┌─────────────────────────────────────┐                   │
│  │ Documental:    38/40 pts (95%)  ███│                   │
│  │ Operativo:     39/40 pts (98%)  ███│                   │
│  │ Valor Agregado: 15/20 pts (75%) ██ │                   │
│  │ ─────────────────────────────────── │                   │
│  │ TOTAL:         92/100 pts (92%) ███│                   │
│  └─────────────────────────────────────┘                   │
│                                                             │
│  Categoría: VERDE 🟢                                         │
│  "Proveedor Comprometido - Certificación Aprobada"         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   TAB 2: EVALUACIÓN DETALLADA               │
│                                                             │
│  [Acordeón] Criterios Documentales (38/40 pts)             │
│  ├─ [+] Documentos Legales (10/10 pts)                     │
│  │   ├─ ✓ e-RUT vigente (2 pts)                            │
│  │   ├─ ✓ Certificado vigencia (2 pts)                     │
│  │   ├─ ✓ Certificado RETC (3 pts)                         │
│  │   └─ ✓ Certificado SMA sin sanciones (3 pts)            │
│  ├─ [+] Procedimientos Operativos (9/10 pts)               │
│  │   ├─ ✓ POE información a clientes (4 pts)               │
│  │   ├─ ✓ Plantilla reporte envases (2 pts)                │
│  │   ├─ ✓ Plan manejo residuos (2 pts)                     │
│  │   └─ ⚠ Registros capacitación (1 pt)                    │
│  │       Observación: Solo 6 meses de registros            │
│  └─ [+] Trazabilidad de Información (10/10 pts)            │
│                                                             │
│  [Acordeón] Criterios Operativos (39/40 pts)               │
│  ├─ [+] Gestión de Residuos (10/10 pts)                    │
│  ├─ [+] Capacitación Personal (10/10 pts)                  │
│  ├─ [+] Infraestructura (10/10 pts)                        │
│  └─ [+] Cumplimiento Normativo (9/10 pts)                  │
│                                                             │
│  [Acordeón] Valor Agregado (15/20 pts)                     │
│  ├─ [+] Ecodiseño y Material Reciclado (8/10 pts)          │
│  └─ [+] Certificaciones Adicionales (7/10 pts)             │
│       ✓ ISO 14001 (5 pts)                                  │
│       ✗ ISO 9001 (no presente)                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   TAB 3: TRAZABILIDAD                       │
│                                                             │
│  Timeline del Proceso de Certificación                      │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  01 Oct 2025  SOLICITUD INICIAL                          │   │
│  Cliente                                                 │   │
│  "Solicitud de certificación recibida"                   │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  02 Oct 2025  REVISIÓN DOCUMENTAL                        │   │
│  Analista María González                                 │   │
│  "8 documentos aprobados"                                │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  05 Oct 2025  EVALUACIÓN PRELIMINAR                      │   │
│  Evaluador Carlos Ramírez                                │   │
│  "Score documental: 38/40 puntos"                        │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  10 Oct 2025  VISITA EN TERRENO                          │   │
│  Auditor Juan Pérez                                      │   │
│  "Instalaciones inspeccionadas, 15 fotos capturadas"     │   │
│  📍 Planta Santiago, Av. Providencia 1234                │   │
│  [Ver Fotos de Evidencia]                                │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  13 Oct 2025  ANÁLISIS DE CUMPLIMIENTO                   │   │
│  Analista Senior Pedro Silva                             │   │
│  "Score total: 92/100 (Categoría Verde)"                 │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  15 Oct 2025  DICTAMEN TÉCNICO                           │   │
│  Jefe Técnico Sofía Muñoz                                │   │
│  "Sin observaciones. Recomendado para comité."           │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  18 Oct 2025  APROBACIÓN COMITÉ                          │   │
│  Comité de Certificación                                 │   │
│  "Votación: 5/5 aprobado. Acta #2025-42"                 │   │
│                                                             │
│  ●─────────────────────────────────────────────────────●   │
│  │                                                       │   │
│  20 Oct 2025  EMISIÓN DE CERTIFICADO                     │   │
│  Sistema SICREP                                          │   │
│  "PDF generado, QR creado, blockchain registrado"        │   │
│                                                             │
│  ●                                                          │
│  20 Oct 2025  PUBLICACIÓN                                │   │
│  Sistema SICREP                                          │   │
│  "Pasaporte digital publicado"                           │   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   TAB 4: VERIFICACIÓN BLOCKCHAIN            │
│                                                             │
│  Este certificado está registrado en blockchain,            │
│  garantizando su autenticidad e inmutabilidad.              │
│                                                             │
│  Estado: CONFIRMADO ✓                                       │
│                                                             │
│  Detalles de la Transacción                                 │
│  ├─ Red: Ethereum Mainnet                                   │
│  ├─ Contrato: 0x7d3a...f1a7e                                │
│  ├─ TX Hash: 0x7d3a9f8e2b1c5d4f6a8e9c0b3d2f1a7e            │
│  ├─ Bloque: #18,456,789                                     │
│  ├─ Timestamp: 20 Oct 2025, 09:00 UTC                      │
│  └─ Confirmaciones: 1,234                                   │
│                                                             │
│  Hash del Certificado                                       │
│  SHA-256: a3f7d8e92b1c4f5a6e8d0c3b9f2a7e1d                 │
│                                                             │
│  [Ver en Etherscan] [Verificar Hash]                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         FOOTER                              │
│                                                             │
│  Certificado emitido por SICREP                             │
│  Sistema Integral de Certificación REP                      │
│                                                             │
│  En cumplimiento de la Ley 20.920 - Marco para la          │
│  Gestión de Residuos, Responsabilidad Extendida del        │
│  Productor y Fomento al Reciclaje                           │
│                                                             │
│  © 2025 SICREP. Todos los derechos reservados.             │
│  [Términos] [Privacidad] [Contacto] [FAQ]                  │
└─────────────────────────────────────────────────────────────┘
```

---

<a name="blockchain"></a>
## 4. BLOCKCHAIN Y VERIFICACIÓN

### 4.1 Proceso de Registro en Blockchain

```javascript
// Smart Contract (Solidity)
pragma solidity ^0.8.0;

contract SicrepCertificates {
    struct Certificate {
        string certificateId;
        bytes32 documentHash;
        uint256 issuedTimestamp;
        uint256 expiryTimestamp;
        bool isActive;
    }
    
    mapping(bytes32 => Certificate) public certificates;
    
    event CertificateRegistered(
        bytes32 indexed qrHash,
        string certificateId,
        uint256 issuedTimestamp
    );
    
    function registerCertificate(
        bytes32 qrHash,
        string memory certificateId,
        bytes32 documentHash,
        uint256 expiryTimestamp
    ) public onlyAuthorized {
        certificates[qrHash] = Certificate({
            certificateId: certificateId,
            documentHash: documentHash,
            issuedTimestamp: block.timestamp,
            expiryTimestamp: expiryTimestamp,
            isActive: true
        });
        
        emit CertificateRegistered(qrHash, certificateId, block.timestamp);
    }
    
    function verifyCertificate(bytes32 qrHash) 
        public 
        view 
        returns (
            string memory certificateId,
            bytes32 documentHash,
            uint256 issuedTimestamp,
            uint256 expiryTimestamp,
            bool isValid
        ) 
    {
        Certificate memory cert = certificates[qrHash];
        bool isValid = cert.isActive && block.timestamp < cert.expiryTimestamp;
        
        return (
            cert.certificateId,
            cert.documentHash,
            cert.issuedTimestamp,
            cert.expiryTimestamp,
            isValid
        );
    }
}
```

### 4.2 Verificación de Autenticidad

```javascript
// Frontend verification
async function verifyBlockchain(qrHash) {
  // 1. Obtener datos de la página
  const certificateData = await fetch(`/api/certificates/validate/${qrHash}`);
  const { certificateId, documentHash, blockchainTxId } = await certificateData.json();
  
  // 2. Verificar en blockchain
  const web3 = new Web3(ethereumProvider);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  
  const blockchainData = await contract.methods
    .verifyCertificate(web3.utils.keccak256(qrHash))
    .call();
  
  // 3. Comparar hashes
  const match = blockchainData.documentHash === documentHash;
  
  // 4. Verificar vigencia
  const isValid = blockchainData.isValid && 
                  Date.now() / 1000 < blockchainData.expiryTimestamp;
  
  return {
    isAuthentic: match,
    isValid: isValid,
    blockchainConfirmed: true,
    transactionId: blockchainTxId
  };
}
```

---

<a name="qr-validation"></a>
## 5. CÓDIGO QR Y VALIDACIÓN

### 5.1 Generación del QR Code

```javascript
// Backend: Certificate Service
const QRCode = require('qrcode');
const crypto = require('crypto');

async function generateCertificateQR(certificateId, certificateData) {
  // 1. Crear hash único
  const qrHash = crypto
    .createHash('sha256')
    .update(`${certificateId}-${Date.now()}`)
    .digest('hex');
  
  // 2. Crear URL del pasaporte
  const passportURL = `https://sicrep.cl/pasaporte/${qrHash}`;
  
  // 3. Generar QR code
  const qrCodeDataURL = await QRCode.toDataURL(passportURL, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 0.95,
    margin: 2,
    width: 300,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  });
  
  // 4. Guardar en base de datos
  await saveCertificateQR({
    certificateId,
    qrHash,
    qrCodeImage: qrCodeDataURL,
    passportURL
  });
  
  return {
    qrHash,
    qrCodeImage: qrCodeDataURL,
    passportURL
  };
}
```

### 5.2 Validación del QR

```javascript
// API Endpoint: GET /api/validate/:qrHash
router.get('/validate/:qrHash', async (req, res) => {
  const { qrHash } = req.params;
  
  try {
    // 1. Buscar certificado por qrHash
    const certificate = await Certificate.findOne({
      where: { qrHash }
    });
    
    if (!certificate) {
      return res.status(404).json({
        valid: false,
        error: 'Certificado no encontrado'
      });
    }
    
    // 2. Verificar vigencia
    const now = new Date();
    const isValid = certificate.status === 'ACTIVE' && 
                    now < new Date(certificate.validUntil);
    
    // 3. Verificar blockchain (opcional pero recomendado)
    const blockchainVerified = await verifyBlockchain(
      certificate.blockchainHash
    );
    
    // 4. Retornar resultado
    return res.json({
      valid: isValid,
      certificate: {
        id: certificate.certificateId,
        provider: certificate.providerName,
        issuedDate: certificate.issuedDate,
        validUntil: certificate.validUntil,
        status: certificate.status,
        category: certificate.category,
        score: certificate.totalScore
      },
      blockchainVerified,
      passportURL: `https://sicrep.cl/pasaporte/${qrHash}`
    });
    
  } catch (error) {
    return res.status(500).json({
      valid: false,
      error: 'Error al validar certificado'
    });
  }
});
```

---

<a name="api-publica"></a>
## 6. API PÚBLICA DE VALIDACIÓN

### 6.1 Endpoints Públicos

```yaml
GET /api/public/validate/:qrHash
Descripción: Valida un certificado por su QR hash
Autenticación: No requerida
Rate Limit: 100 requests/minuto por IP

Response:
  {
    "valid": true,
    "certificate": {
      "id": "SICREP-2025-001234",
      "provider": "Empaques Verde S.A.",
      "rut": "76.123.456-7",
      "issuedDate": "2025-11-06T10:00:00Z",
      "validUntil": "2026-11-06T10:00:00Z",
      "status": "ACTIVE",
      "category": "GREEN",
      "score": 92
    },
    "blockchainVerified": true,
    "passportURL": "https://sicrep.cl/pasaporte/a3f7..."
  }

---

GET /api/public/certificate/:certificateId
Descripción: Obtiene información de un certificado por ID
Autenticación: No requerida
Rate Limit: 100 requests/minuto por IP

Response:
  {
    "certificate": {
      "id": "SICREP-2025-001234",
      "qrHash": "a3f7d8e92b1c4f5a6e8d0c3b9f2a7e1d",
      "provider": {...},
      "evaluation": {...},
      "timeline": [...]
    }
  }

---

GET /api/public/certificate/:certificateId/pdf
Descripción: Descarga el certificado PDF
Autenticación: No requerida
Rate Limit: 50 downloads/hora por IP

Response:
  Content-Type: application/pdf
  Content-Disposition: attachment; filename="SICREP-2025-001234.pdf"

---

POST /api/public/verify
Descripción: Verificación batch de múltiples certificados
Autenticación: API Key requerida
Rate Limit: 1000 requests/día

Request Body:
  {
    "certificates": [
      "SICREP-2025-001234",
      "SICREP-2025-001235",
      "SICREP-2025-001236"
    ]
  }

Response:
  {
    "results": [
      {
        "certificateId": "SICREP-2025-001234",
        "valid": true,
        "status": "ACTIVE"
      },
      ...
    ]
  }
```

---

<a name="journey"></a>
## 7. JOURNEY DEL USUARIO

### 7.1 Flujo de Validación

```
USUARIO ESCANEA QR EN FACTURA
        │
        ▼
CÁMARA ABRE URL DEL PASAPORTE
        │
        ▼
PÁGINA CARGA (< 2 seg)
        │
        ▼
MUESTRA BADGE DE VALIDACIÓN
"✓ Certificación Vigente"
        │
        ▼
USUARIO VE INFO DEL PROVEEDOR
        │
        ▼
[OPCIÓN A]          [OPCIÓN B]          [OPCIÓN C]
Descargar PDF       Ver Evaluación      Ver Trazabilidad
        │                   │                   │
        ▼                   ▼                   ▼
PDF descargado      Detalle de scores   Timeline completo
```

### 7.2 Experiencia Mobile-First

```
MOBILE (< 768px):
- Layout vertical de una columna
- Tabs colapsables
- Botones de acción flotantes (sticky)
- Imágenes optimizadas (WebP)
- Lazy loading de fotos de evidencia
- Scroll infinito en timeline

TABLET (768px - 1024px):
- Layout de 2 columnas
- Tabs horizontales
- Sidebar con resumen
- Imágenes de resolución media

DESKTOP (> 1024px):
- Layout de 3 columnas
- Sidebar fijo con info del certificado
- Tabs con preview lateral
- Imágenes alta resolución
- Hover effects
```

---

<a name="diseno"></a>
## 8. DISEÑO UI/UX

### 8.1 Paleta de Colores

```css
/* SICREP Brand Colors */
:root {
  /* Principales */
  --sicrep-green: #10B981;  /* Verde certificación */
  --sicrep-blue: #3B82F6;   /* Azul corporativo */
  --sicrep-yellow: #F59E0B; /* Amarillo advertencia */
  --sicrep-red: #EF4444;    /* Rojo rechazo */
  
  /* Neutros */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Estados */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### 8.2 Componentes Clave

```jsx
// Badge de Certificación
<CertificationBadge 
  category="GREEN"
  score={92}
  validUntil="2026-11-06"
/>

// Timeline de Trazabilidad
<TraceabilityTimeline 
  events={projectTimeline}
  expandable={true}
/>

// Score Breakdown
<ScoreBreakdown 
  documental={38}
  operational={39}
  valueAdded={15}
  total={92}
/>

// Blockchain Verification
<BlockchainVerification 
  txHash="0x7d3a9f8e..."
  network="ethereum"
  confirmations={1234}
/>

// QR Code Display
<QRCodeDisplay 
  qrHash="a3f7d8e92b1c..."
  downloadable={true}
  size="large"
/>
```

---

## 9. SEO Y METADATA

```html
<!-- Open Graph Tags -->
<meta property="og:title" content="Certificado SICREP - Empaques Verde S.A." />
<meta property="og:description" content="Proveedor certificado REP con categoría Verde (92/100 pts). Certificación vigente hasta Nov 2026." />
<meta property="og:image" content="https://sicrep.cl/og/SICREP-2025-001234.jpg" />
<meta property="og:url" content="https://sicrep.cl/pasaporte/a3f7d8e92b..." />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Certificado SICREP - Empaques Verde S.A." />
<meta name="twitter:description" content="Certificación REP vigente. Score: 92/100" />
<meta name="twitter:image" content="https://sicrep.cl/og/SICREP-2025-001234.jpg" />

<!-- Structured Data (Schema.org) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Certificate",
  "name": "Certificado SICREP",
  "identifier": "SICREP-2025-001234",
  "issuedBy": {
    "@type": "Organization",
    "name": "SICREP",
    "url": "https://sicrep.cl"
  },
  "about": {
    "@type": "Organization",
    "name": "Empaques Verde S.A.",
    "identifier": "76.123.456-7"
  },
  "validFrom": "2025-11-06",
  "validUntil": "2026-11-06"
}
</script>
```

---

**Documento generado:** Noviembre 2025  
**Versión:** 2.0  
**Próxima revisión:** Febrero 2026
