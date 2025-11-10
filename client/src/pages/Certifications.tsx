import CertificationWorkflow from "@/components/CertificationWorkflow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, FileCheck, Download, Upload, FileText, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { useBackNavigation } from "@/hooks/useBackNavigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Certifications() {
  const { toast } = useToast();
  const { goBack } = useBackNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewCertDialog, setShowNewCertDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { data: certifications = [] } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  const { data: providers = [] } = useQuery<any[]>({
    queryKey: ["/api/providers"],
  });

  const filteredCerts = certifications.filter((cert: any) =>
    cert.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // Convertir archivo a base64
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Obtener provider del usuario actual
      const user = await fetch('/api/auth/me').then(r => r.json());
      let providerId = null;
      
      if (user.role === 'proveedor' && user.rut) {
        const providerResponse = await fetch(`/api/providers?rut=${user.rut}`);
        const allProviders = await providerResponse.json();
        const provider = allProviders.find((p: any) => p.rut === user.rut);
        if (provider) {
          providerId = provider.id;
        }
      }

      const response = await fetch('/api/certification-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          fileData, // Base64 encoded file
          providerId,
          category: 'technical',
          description: 'Documento técnico de certificación',
        }),
      });

      if (!response.ok) throw new Error('Error al cargar documento');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Documento cargado",
        description: `${selectedFile?.name} ha sido cargado y almacenado en el sistema`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/certification-documents'] });
      setSelectedFile(null);
      setShowUploadDialog(false);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error al cargar",
        description: error.message || "No se pudo cargar el documento",
      });
    },
  });

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Seleccione un archivo para cargar",
      });
      return;
    }

    uploadMutation.mutate(selectedFile);
  };

  const handleExport = () => {
    // Exportar certificaciones a CSV
    const csvData = certifications.map((cert: any) => ({
      Código: cert.code,
      Proveedor: cert.providerId,
      Estado: cert.status,
      Fase: cert.currentPhase,
      Puntos: cert.scoreTotal || 0,
      Fecha: new Date(cert.createdAt).toLocaleDateString('es-CL')
    }));
    
    const headers = Object.keys(csvData[0] || {}).join(',');
    const rows = csvData.map(row => Object.values(row).map(v => `"${v}"`).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SICREP_Certificaciones_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({
      title: "Exportación exitosa",
      description: "Certificaciones exportadas a CSV",
    });
  };

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
        <div className="flex items-center gap-4">
          <Button onClick={() => goBack()} variant="ghost" size="sm" data-testid="button-back-certifications">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Certificaciones REP</h1>
            <p className="text-muted-foreground">Gestión completa de certificados bajo Ley 20.920</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowUploadDialog(true)} variant="outline" data-testid="button-upload-docs">
            <Upload className="w-4 h-4 mr-2" />
            Cargar Documentos
          </Button>
          <Button onClick={() => setShowNewCertDialog(true)} data-testid="button-new-certification">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Certificación
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Certificados Registrados</CardTitle>
            <Button size="sm" variant="outline" onClick={handleExport} data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
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
                
                <Link href={`/certifications/${cert.id}`}>
                  <Button size="sm" variant="outline" data-testid={`button-view-${cert.id}`}>
                    Ver Detalles
                  </Button>
                </Link>
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

      {/* Dialog para nueva certificación */}
      <Dialog open={showNewCertDialog} onOpenChange={setShowNewCertDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Certificación REP</DialogTitle>
            <DialogDescription>
              Crear una nueva certificación bajo Ley 20.920
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Proveedor</Label>
              <select className="w-full rounded-md border p-2">
                <option>Seleccione un proveedor...</option>
                {providers.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.name} - {p.rut}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewCertDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Funcionalidad en desarrollo",
                  description: "La creación de certificaciones estará disponible próximamente",
                });
                setShowNewCertDialog(false);
              }}>
                Crear Certificación
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para carga de documentos */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cargar Documentos de Certificación</DialogTitle>
            <DialogDescription>
              Suba documentos técnicos, fichas de productos o certificados para el proceso REP
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Documento</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.xlsx,.xls"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  data-testid="input-file-upload"
                />
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">{selectedFile.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Formatos aceptados: PDF, DOC, DOCX, XLS, XLSX (Máx. 10MB)
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setShowUploadDialog(false);
                setSelectedFile(null);
              }}>
                Cancelar
              </Button>
              <Button 
                onClick={handleFileUpload} 
                disabled={uploadMutation.isPending}
                data-testid="button-upload-confirm"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadMutation.isPending ? 'Cargando...' : 'Cargar Documento'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
