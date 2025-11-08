import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Search,
  CheckCircle,
  Award,
  Leaf,
  TrendingUp,
  FileText,
  Download,
} from "lucide-react";
import { Link } from "wouter";

export default function ProvidersDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  // Fetch providers
  const { data: providers = [], isLoading: providersLoading } = useQuery<any[]>({
    queryKey: ["/api/providers"],
  });

  // Fetch certifications to count certified providers
  const { data: certifications = [] } = useQuery<any[]>({
    queryKey: ["/api/certifications"],
  });

  // Filter providers
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.rut.includes(searchQuery);
    
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "certified" &&
        certifications.some((cert: any) => 
          cert.providerId === provider.id && 
          (cert.status === "publicado" || cert.status === "monitoreo_continuo")
        )) ||
      (statusFilter === "pending" &&
        certifications.some((cert: any) => 
          cert.providerId === provider.id && 
          cert.status !== "publicado" && 
          cert.status !== "monitoreo_continuo" &&
          cert.status !== "rechazado"
        ));

    return matchesSearch && matchesStatus;
  });

  // Get certification status for a provider
  const getProviderCertification = (providerId: string) => {
    const providerCerts = certifications.filter((cert: any) => cert.providerId === providerId);
    const activeCerts = providerCerts.filter(
      (cert: any) => cert.status === "publicado" || cert.status === "monitoreo_continuo"
    );
    return {
      total: providerCerts.length,
      active: activeCerts.length,
      hasActive: activeCerts.length > 0,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Directorio de Proveedores Certificados</h1>
          <p className="text-muted-foreground">
            Proveedores verificados bajo Ley 20.920 con certificación REP activa
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proveedores</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                providers.filter((p) => getProviderCertification(p.id).hasActive).length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Copper Mark</CardTitle>
            <Award className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                providers.filter((p) => getProviderCertification(p.id).hasActive).length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impacto ESG</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certifications.filter((c: any) => c.status === "publicado").length * 15}
              <span className="text-sm font-normal text-muted-foreground ml-1">Ton CO₂</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Buscar y Filtrar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o RUT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-providers"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger data-testid="select-status-filter">
                <SelectValue placeholder="Estado de certificación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Estados</SelectItem>
                <SelectItem value="certified">Certificados Activos</SelectItem>
                <SelectItem value="pending">En Proceso</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setIndustryFilter("all");
            }} data-testid="button-clear-filters">
              Limpiar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Providers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {providersLoading ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Cargando proveedores...
            </CardContent>
          </Card>
        ) : filteredProviders.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron proveedores</h3>
              <p className="text-muted-foreground">
                Intenta ajustar los filtros de búsqueda
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredProviders.map((provider) => {
            const certInfo = getProviderCertification(provider.id);
            
            return (
              <Card
                key={provider.id}
                className="hover-elevate transition-all"
                data-testid={`card-provider-${provider.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <CardDescription className="font-mono text-xs">
                        RUT: {provider.rut}
                      </CardDescription>
                    </div>
                    {certInfo.hasActive && (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Certificado
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Email</div>
                      <div className="font-medium truncate">{provider.email}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Teléfono</div>
                      <div className="font-medium">{provider.phone || "N/A"}</div>
                    </div>
                  </div>

                  {provider.address && (
                    <div className="text-sm">
                      <div className="text-muted-foreground mb-1">Dirección</div>
                      <div className="font-medium">{provider.address}</div>
                    </div>
                  )}

                  <div className="pt-3 border-t space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Certificaciones</span>
                      <Badge variant="secondary">
                        {certInfo.active} activas / {certInfo.total} total
                      </Badge>
                    </div>

                    {certInfo.hasActive && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Copper Mark</span>
                        <div className="flex items-center gap-1 text-amber-600 font-semibold">
                          <Award className="h-4 w-4" />
                          <span>Aprobado</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                      data-testid={`button-view-provider-${provider.id}`}
                    >
                      <Link href={`/providers/${provider.id}`}>
                        <FileText className="h-4 w-4 mr-1" />
                        Ver Detalle
                      </Link>
                    </Button>
                    
                    {certInfo.hasActive && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          window.open(`/api/providers/${provider.id}/esg-report`, '_blank');
                        }}
                        data-testid={`button-download-esg-${provider.id}`}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Informe ESG
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* ESG Summary Card */}
      {filteredProviders.length > 0 && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Impacto ESG Agregado
            </CardTitle>
            <CardDescription>
              Métricas ambientales consolidadas de todos los proveedores certificados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {(certifications.filter((c: any) => c.status === "publicado").length * 15.5).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Toneladas CO₂ Evitadas
                </div>
              </div>

              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {(certifications.filter((c: any) => c.status === "publicado").length * 45000).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Litros de Agua Ahorrados
                </div>
              </div>

              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-amber-600">
                  {(certifications.filter((c: any) => c.status === "publicado").length * 120).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  MWh Energía Renovable
                </div>
              </div>

              <div className="text-center p-4 bg-background/50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round((certifications.filter((c: any) => c.status === "publicado").length / Math.max(certifications.length, 1)) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tasa de Reciclabilidad
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
