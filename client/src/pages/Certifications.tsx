import CertificationWorkflow from "@/components/CertificationWorkflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileCheck, Download } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Certifications() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: certifications = [] } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  const filteredCerts = certifications.filter((cert: any) =>
    cert.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "publicado" || status === "monitoreo_continuo") {
      return <Badge variant="default">Activo</Badge>;
    } else if (status === "rechazado" || status === "expirado") {
      return <Badge variant="destructive">Expirado</Badge>;
    } else {
      return <Badge variant="secondary">En Proceso</Badge>;
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
            {filteredCerts.map((cert: any) => (
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
                    <span className="font-medium">Proveedor ID: {cert.providerId.slice(0, 8)}...</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{new Date(cert.createdAt).toLocaleDateString('es-CL')}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono">{cert.scoreTotal || 0}</div>
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
              {searchTerm ? `No se encontraron certificaciones para "${searchTerm}"` : "No hay certificaciones registradas"}
            </div>
          )}
        </CardContent>
      </Card>
      
      <CertificationWorkflow />
    </div>
  );
}
