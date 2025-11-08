import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode, Wifi, MapPin, Clock } from "lucide-react";

interface NFCEvent {
  id: string;
  timestamp: string;
  location: string;
  action: string;
  user: string;
  hash: string;
}

export default function NFCTraceability() {
  //todo: remove mock functionality
  const nfcTag = "NFC-2025-000127";
  const certCode = "CERT-CL-2025-000127";
  const blockchainHash = "0x7a9f3e2b1c4d5e6f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f";
  
  const events: NFCEvent[] = [
    { 
      id: "1", 
      timestamp: "2025-01-15 14:23:45", 
      location: "Planta Antofagasta", 
      action: "Emisión Certificado",
      user: "Sistema SICREP",
      hash: "0x1a2b3c..."
    },
    { 
      id: "2", 
      timestamp: "2025-01-15 16:45:12", 
      location: "Bodega Central", 
      action: "Registro NFC",
      user: "Operador: J. González",
      hash: "0x4d5e6f..."
    },
    { 
      id: "3", 
      timestamp: "2025-01-16 09:12:33", 
      location: "Centro Distribución", 
      action: "Verificación QR",
      user: "Auditor: M. Silva",
      hash: "0x7g8h9i..."
    },
    { 
      id: "4", 
      timestamp: "2025-01-16 11:34:56", 
      location: "Faena Minera Escondida", 
      action: "Escaneo NFC",
      user: "Cliente: P. Rojas",
      hash: "0xj1k2l3..."
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Trazabilidad NFC & Blockchain</CardTitle>
            <CardDescription>
              Seguimiento inmutable de certificados con validación descentralizada
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" data-testid="button-scan-qr">
              <QrCode className="w-4 h-4 mr-2" />
              Escanear QR
            </Button>
            <Button size="sm" variant="outline" data-testid="button-scan-nfc">
              <Wifi className="w-4 h-4 mr-2" />
              Leer NFC
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 p-4 rounded-md bg-muted/50 border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tag NFC</span>
            <code className="text-sm font-mono font-semibold">{nfcTag}</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Certificado</span>
            <code className="text-sm font-mono font-semibold">{certCode}</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Hash Blockchain</span>
            <code className="text-xs font-mono text-muted-foreground truncate max-w-[300px]">{blockchainHash}</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Estado</span>
            <Badge variant="default">Activo</Badge>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Historial de Eventos
          </h4>
          <div className="space-y-2">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-start gap-3 p-3 rounded-md border ${
                  index === events.length - 1 ? 'border-primary bg-primary/5' : ''
                }`}
                data-testid={`nfc-event-${event.id}`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-xs font-mono font-semibold">
                  {events.length - index}
                </div>
                
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{event.action}</span>
                    {index === events.length - 1 && (
                      <Badge variant="default" className="text-xs">Último</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="font-mono">{event.timestamp}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{event.user}</span>
                    <span className="text-muted-foreground">•</span>
                    <code className="text-muted-foreground font-mono">{event.hash}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
