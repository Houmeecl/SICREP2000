import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, CheckCircle, XCircle, Eye, Download, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

type CertificationRequest = {
  id: string;
  companyName: string;
  companyRut: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  createdUserId?: string;
  createdProviderId?: string;
  createdCertificationId?: string;
  documents?: Array<{
    id: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    fileData: string;
    category?: string;
  }>;
};

const statusLabels = {
  pending: "Pendiente",
  reviewing: "En Revisión",
  approved: "Aprobada",
  rejected: "Rechazada"
};

const statusColors = {
  pending: "default",
  reviewing: "secondary",
  approved: "default",
  rejected: "destructive"
} as const;

export default function Solicitudes() {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<CertificationRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: requests = [], isLoading } = useQuery<CertificationRequest[]>({
    queryKey: ['/api/certification-requests'],
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/certification-requests/${id}/approve`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNotes }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al aprobar');
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/certification-requests'] });
      setApproveDialogOpen(false);
      setDetailsOpen(false);
      setReviewNotes("");
      toast({
        title: "Solicitud aprobada",
        description: (
          <div className="space-y-1">
            <p>Usuario creado: <strong>{data.username}</strong></p>
            <p className="text-xs text-muted-foreground">
              Contraseña temporal enviada por correo
            </p>
          </div>
        ),
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al aprobar solicitud",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!reviewNotes.trim()) {
        throw new Error("Las notas de revisión son requeridas para rechazar");
      }
      const response = await fetch(`/api/certification-requests/${id}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewNotes }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al rechazar');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/certification-requests'] });
      setRejectDialogOpen(false);
      setDetailsOpen(false);
      setReviewNotes("");
      toast({
        title: "Solicitud rechazada",
        description: "La empresa será notificada por correo electrónico",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al rechazar solicitud",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleViewDetails = async (request: CertificationRequest) => {
    try {
      const response = await fetch(`/api/certification-requests/${request.id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setSelectedRequest(data);
      setDetailsOpen(true);
      setReviewNotes(data.reviewNotes || "");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cargar los detalles de la solicitud",
        variant: "destructive",
      });
    }
  };

  const handleDownloadDocument = (doc: any) => {
    try {
      const byteCharacters = atob(doc.fileData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: doc.fileType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Error al descargar",
        description: "No se pudo descargar el documento",
        variant: "destructive",
      });
    }
  };

  const filteredRequests = requests.filter(req => 
    statusFilter === "all" || req.status === statusFilter
  );

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const reviewingCount = requests.filter(r => r.status === "reviewing").length;
  const approvedCount = requests.filter(r => r.status === "approved").length;
  const rejectedCount = requests.filter(r => r.status === "rejected").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Solicitudes de Certificación</h1>
        <p className="text-muted-foreground">
          Revise y gestione las solicitudes de certificación REP
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              {pendingCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              {reviewingCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {approvedCount}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              {rejectedCount}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Solicitudes</CardTitle>
              <CardDescription>Total: {filteredRequests.length} solicitudes</CardDescription>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-testid="select-status-filter">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="reviewing">En Revisión</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Cargando solicitudes...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay solicitudes {statusFilter !== "all" ? `con estado "${statusLabels[statusFilter as keyof typeof statusLabels]}"` : ""}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>RUT</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Industria</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} data-testid={`request-row-${request.id}`}>
                    <TableCell data-testid={`request-date-${request.id}`}>
                      {format(new Date(request.createdAt), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="font-medium" data-testid={`request-company-${request.id}`}>
                      {request.companyName}
                    </TableCell>
                    <TableCell data-testid={`request-rut-${request.id}`}>
                      {request.companyRut}
                    </TableCell>
                    <TableCell data-testid={`request-contact-${request.id}`}>
                      {request.contactName}
                    </TableCell>
                    <TableCell data-testid={`request-industry-${request.id}`}>
                      {request.industry}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[request.status]} data-testid={`request-status-${request.id}`}>
                        {statusLabels[request.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(request)}
                        data-testid={`button-view-${request.id}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles de la Solicitud</DialogTitle>
            <DialogDescription>
              Revise la información completa de la solicitud
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Badge variant={statusColors[selectedRequest.status]}>
                    {statusLabels[selectedRequest.status]}
                  </Badge>
                </h3>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Datos de la Empresa</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Nombre:</dt>
                  <dd className="font-medium" data-testid="detail-company-name">{selectedRequest.companyName}</dd>
                  <dt className="text-muted-foreground">RUT:</dt>
                  <dd data-testid="detail-company-rut">{selectedRequest.companyRut}</dd>
                  <dt className="text-muted-foreground">Industria:</dt>
                  <dd data-testid="detail-industry">{selectedRequest.industry}</dd>
                  <dt className="text-muted-foreground">Email:</dt>
                  <dd data-testid="detail-company-email">{selectedRequest.companyEmail}</dd>
                  <dt className="text-muted-foreground">Teléfono:</dt>
                  <dd data-testid="detail-company-phone">{selectedRequest.companyPhone}</dd>
                  <dt className="text-muted-foreground">Dirección:</dt>
                  <dd className="col-span-1" data-testid="detail-company-address">{selectedRequest.companyAddress}</dd>
                </dl>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Datos de Contacto</h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Nombre:</dt>
                  <dd className="font-medium" data-testid="detail-contact-name">{selectedRequest.contactName}</dd>
                  <dt className="text-muted-foreground">Email:</dt>
                  <dd data-testid="detail-contact-email">{selectedRequest.contactEmail}</dd>
                  <dt className="text-muted-foreground">Teléfono:</dt>
                  <dd data-testid="detail-contact-phone">{selectedRequest.contactPhone}</dd>
                </dl>
              </div>

              {selectedRequest.documents && selectedRequest.documents.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Documentos Adjuntos ({selectedRequest.documents.length})</h3>
                  <div className="space-y-2">
                    {selectedRequest.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                        data-testid={`document-${doc.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{doc.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {(doc.fileSize / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                          data-testid={`button-download-${doc.id}`}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Descargar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="reviewNotes">Notas de Revisión</Label>
                <Textarea
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Ingrese observaciones o comentarios sobre la solicitud..."
                  rows={4}
                  disabled={selectedRequest.status === "approved" || selectedRequest.status === "rejected"}
                  data-testid="textarea-review-notes"
                />
              </div>

              {selectedRequest.reviewedAt && (
                <div className="text-sm text-muted-foreground">
                  <p>Revisada el {format(new Date(selectedRequest.reviewedAt), "dd/MM/yyyy HH:mm")}</p>
                  {selectedRequest.reviewNotes && (
                    <p className="mt-1"><strong>Notas:</strong> {selectedRequest.reviewNotes}</p>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedRequest && selectedRequest.status !== "approved" && selectedRequest.status !== "rejected" && (
              <div className="flex gap-2 w-full justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setRejectDialogOpen(true)}
                  data-testid="button-reject-request"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rechazar
                </Button>
                <Button
                  onClick={() => setApproveDialogOpen(true)}
                  data-testid="button-approve-request"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprobar
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Aprobar solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción creará automáticamente:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Un nuevo proveedor en el sistema</li>
                <li>Un usuario con credenciales temporales</li>
                <li>Una certificación inicial en estado "solicitud_inicial"</li>
              </ul>
              <p className="mt-3">
                El contacto recibirá un correo con las credenciales de acceso.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-approve">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedRequest && approveMutation.mutate(selectedRequest.id)}
              disabled={approveMutation.isPending}
              data-testid="button-confirm-approve"
            >
              {approveMutation.isPending ? "Aprobando..." : "Aprobar Solicitud"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Rechazar solicitud?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción notificará a la empresa que su solicitud ha sido rechazada.
              {!reviewNotes.trim() && (
                <p className="mt-2 text-destructive font-medium">
                  Debe ingresar notas de revisión antes de rechazar.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-reject">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedRequest && rejectMutation.mutate(selectedRequest.id)}
              disabled={rejectMutation.isPending || !reviewNotes.trim()}
              data-testid="button-confirm-reject"
            >
              {rejectMutation.isPending ? "Rechazando..." : "Rechazar Solicitud"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
