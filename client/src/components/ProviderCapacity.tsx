import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, TrendingUp, Building2 } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  rut: string;
  currentCapacity: number;
  maxCapacity: number;
  status: "normal" | "warning" | "critical";
}

export default function ProviderCapacity() {
  //todo: remove mock functionality
  const providers: Provider[] = [
    { id: "1", name: "Envases del Norte S.A.", rut: "76.543.210-K", currentCapacity: 245, maxCapacity: 300, status: "warning" },
    { id: "2", name: "Embalajes Sustentables Ltda.", rut: "77.123.456-8", currentCapacity: 185, maxCapacity: 300, status: "normal" },
    { id: "3", name: "Packaging Industrial Chile", rut: "78.987.654-3", currentCapacity: 295, maxCapacity: 300, status: "critical" },
    { id: "4", name: "EcoPack Solutions", rut: "79.456.789-1", currentCapacity: 120, maxCapacity: 300, status: "normal" },
  ];

  const getStatusColor = (status: Provider["status"]) => {
    switch (status) {
      case "critical":
        return "destructive";
      case "warning":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: Provider["status"]) => {
    switch (status) {
      case "critical":
        return "Límite Crítico";
      case "warning":
        return "Próximo al Límite";
      default:
        return "Normal";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Capacidad de Proveedores (Límite 300kg/año)</CardTitle>
        <CardDescription>
          Monitoreo de capacidad anual por proveedor con alertas automáticas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {providers.map((provider) => {
            const percentage = (provider.currentCapacity / provider.maxCapacity) * 100;
            
            return (
              <div
                key={provider.id}
                className="p-4 rounded-md border space-y-3"
                data-testid={`provider-${provider.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                      <Building2 className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      <p className="text-sm text-muted-foreground font-mono">RUT: {provider.rut}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(provider.status)}>
                    {getStatusText(provider.status)}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacidad Utilizada</span>
                    <span className="font-mono font-semibold">
                      {provider.currentCapacity}kg / {provider.maxCapacity}kg
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2"
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    <span>{percentage.toFixed(1)}% de capacidad anual</span>
                  </div>
                </div>
                
                {provider.status !== "normal" && (
                  <div className="flex items-start gap-2 p-2 rounded-md bg-destructive/10 border border-destructive/20">
                    <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                    <p className="text-xs text-destructive">
                      {provider.status === "critical" 
                        ? "Proveedor próximo al límite anual. Considere redistribuir carga."
                        : "Monitorear cercanamente. Quedan solo " + (provider.maxCapacity - provider.currentCapacity) + "kg disponibles."}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
