import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Search, Download, Eye, QrCode } from "lucide-react";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { generateCertificatePDF } from "@/lib/pdf-generator";

export default function ShipmentsList() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: shipments, isLoading } = useQuery({
    queryKey: ["/api/shipments"],
  });

  const filteredShipments = (shipments as any[])?.filter((shipment: any) =>
    shipment.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDownloadPDF = async (shipment: any) => {
    try {
      const [shipm, qrResponse] = await Promise.all([
        fetch(`/api/shipments/${shipment.id}`).then(r => r.json()),
        fetch(`/api/shipments/${shipment.id}/qr-image`).then(r => r.json())
      ]);

      const provider = await fetch(`/api/providers/${shipment.providerId}`).then(r => r.json());

      generateCertificatePDF(
        {
          ...shipment,
          recyclabilityPercent: Number(shipment.recyclabilityPercent),
        },
        provider,
        shipm.components || [],
        qrResponse.qrCodeDataUrl
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: any; label: string }> = {
      draft: { variant: "secondary", label: "Borrador" },
      certified: { variant: "default", label: "Certificado" },
      in_transit: { variant: "secondary", label: "En Tránsito" },
      delivered: { variant: "default", label: "Entregado" },
      cancelled: { variant: "destructive", label: "Cancelado" },
    };
    
    const statusInfo = statusMap[status] || { variant: "secondary", label: status };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const getRecyclabilityBadge = (level: string) => {
    const levelMap: Record<string, any> = {
      Alto: "default",
      Medio: "secondary",
      Bajo: "destructive",
    };
    return <Badge variant={levelMap[level] || "secondary"}>{level}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Despachos Certificados</h1>
        <p className="text-muted-foreground mt-2">
          Gestión y consulta de despachos con certificación REP
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-shipments"
          />
        </div>
        <Link href="/packaging">
          <Button data-testid="button-new-shipment">
            <Package className="h-4 w-4 mr-2" />
            Nuevo Despacho
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Lista de Despachos
          </CardTitle>
          <CardDescription>
            Total: {filteredShipments.length} despacho(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Cargando despachos...
            </div>
          ) : filteredShipments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No se encontraron despachos
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Peso Total</TableHead>
                  <TableHead className="text-center">Reciclabilidad</TableHead>
                  <TableHead className="text-center">Nivel</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment: any) => (
                  <TableRow key={shipment.id} data-testid={`row-shipment-${shipment.id}`}>
                    <TableCell className="font-mono text-sm">
                      {shipment.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      {shipment.clientName}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {Number(shipment.totalWeightGr).toLocaleString()}g
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {Number(shipment.recyclabilityPercent).toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      {getRecyclabilityBadge(shipment.recyclabilityLevel)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(shipment.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/validate/${shipment.qrCode}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Ver Certificado"
                            data-testid={`button-view-${shipment.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        {shipment.status === "certified" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadPDF(shipment)}
                            title="Descargar PDF"
                            data-testid={`button-pdf-${shipment.id}`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
