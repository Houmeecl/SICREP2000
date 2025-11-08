import CertificationWorkflow from "@/components/CertificationWorkflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileCheck, Download } from "lucide-react";
import { useState } from "react";

interface Certification {
  id: string;
  code: string;
  provider: string;
  cps: string;
  status: "active" | "in-progress" | "expired" | "pending";
  score: number;
  date: string;
}

export default function Certifications() {
  const [searchTerm, setSearchTerm] = useState("");
  
  //todo: remove mock functionality
  const certifications: Certification[] = [
    { id: "1", code: "CERT-CL-2025-000127", provider: "Envases del Norte S.A.", cps: "CPS-2025-001", status: "active", score: 92, date: "2025-01-15" },
    { id: "2", code: "CERT-CL-2025-000126", provider: "EcoPack Solutions", cps: "CPS-2025-002", status: "active", score: 88, date: "2025-01-14" },
    { id: "3", code: "CERT-CL-2025-000125", provider: "Packaging Industrial Chile", cps: "CPS-2024-128", status: "in-progress", score: 65, date: "2025-01-13" },
    { id: "4", code: "CERT-CL-2024-000089", provider: "Embalajes Sustentables Ltda.", cps: "CPS-2024-089", status: "active", score: 95, date: "2024-12-20" },
    { id: "5", code: "CERT-CL-2024-000055", provider: "Green Pack SpA", cps: "CPS-2024-055", status: "expired", score: 78, date: "2024-11-10" },
  ];

  const filteredCerts = certifications.filter(cert =>
    cert.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.cps.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Certification["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Activo</Badge>;
      case "in-progress":
        return <Badge variant="secondary">En Proceso</Badge>;
      case "expired":
        return <Badge variant="destructive">Expirado</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificaciones REP</h1>
          <p className="text-muted-foreground">Gestión completa de certificados bajo Ley 20.920</p>
        </div>
        <Button data-testid="button-new-certification">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Certificación
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Certificados Registrados</CardTitle>
            <Button size="sm" variant="outline" data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, proveedor o CPS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-testid="input-search-certifications"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center gap-4 p-4 rounded-md border hover-elevate"
                data-testid={`certification-${cert.id}`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10">
                  <FileCheck className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono font-semibold">{cert.code}</code>
                    {getStatusBadge(cert.status)}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium">{cert.provider}</span>
                    <span className="text-muted-foreground">•</span>
                    <code className="text-muted-foreground font-mono text-xs">{cert.cps}</code>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{cert.date}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono">{cert.score}</div>
                  <div className="text-xs text-muted-foreground">puntos</div>
                </div>
                
                <Button size="sm" variant="outline" data-testid={`button-view-${cert.id}`}>
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
          
          {filteredCerts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No se encontraron certificaciones para "{searchTerm}"
            </div>
          )}
        </CardContent>
      </Card>
      
      <CertificationWorkflow />
    </div>
  );
}
