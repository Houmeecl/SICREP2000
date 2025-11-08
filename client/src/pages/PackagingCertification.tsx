import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Package, Plus, Trash2, CheckCircle, QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PackagingComponent {
  material: string;
  description: string;
  unitWeightGr: number;
  quantity: number;
  isRecyclable: boolean;
}

interface CalculationResult {
  totalWeightGr: number;
  recyclableWeightGr: number;
  recyclabilityPercent: number;
  recyclabilityLevel: "Alto" | "Medio" | "Bajo";
}

const MATERIALS = [
  { value: "papel_carton", label: "Papel y Cartón" },
  { value: "plasticos", label: "Plásticos" },
  { value: "vidrio", label: "Vidrio" },
  { value: "metales", label: "Metales" },
  { value: "madera", label: "Madera" },
  { value: "compuestos", label: "Compuestos" },
  { value: "otros", label: "Otros" },
];

export default function PackagingCertification() {
  const { toast } = useToast();
  const [components, setComponents] = useState<PackagingComponent[]>([]);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [certifiedShipment, setCertifiedShipment] = useState<any>(null);
  const [qrImageUrl, setQrImageUrl] = useState("");

  const [formData, setFormData] = useState({
    providerId: "",
    clientName: "",
    clientRut: "",
    notes: "",
  });

  const [currentComponent, setCurrentComponent] = useState<PackagingComponent>({
    material: "papel_carton",
    description: "",
    unitWeightGr: 0,
    quantity: 1,
    isRecyclable: true,
  });

  const { data: providers } = useQuery({
    queryKey: ["/api/providers"],
  });

  const createShipment = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al crear despacho");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Despacho creado exitosamente",
        description: "El despacho ha sido registrado en el sistema",
      });
      setComponents([]);
      setFormData({ providerId: "", clientName: "", clientRut: "", notes: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/shipments"] });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error al crear despacho",
        description: error.message,
      });
    },
  });

  const certifyShipment = useMutation({
    mutationFn: async (shipmentId: string) => {
      const response = await fetch(`/api/shipments/${shipmentId}/certify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error al certificar despacho");
      return response.json();
    },
    onSuccess: async (data: any) => {
      setCertifiedShipment(data);
      const qrResponse = await fetch(`/api/shipments/${data.id}/qr-image`);
      const qrData = await qrResponse.json();
      setQrImageUrl(qrData.qrCodeDataUrl);
      setShowQRDialog(true);
      toast({
        title: "Despacho certificado",
        description: "El despacho ha sido certificado con éxito",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error al certificar",
        description: error.message,
      });
    },
  });

  const calculateMetrics = (): CalculationResult => {
    if (components.length === 0) {
      return {
        totalWeightGr: 0,
        recyclableWeightGr: 0,
        recyclabilityPercent: 0,
        recyclabilityLevel: "Bajo",
      };
    }

    let totalWeightGr = 0;
    let recyclableWeightGr = 0;

    components.forEach((comp) => {
      const totalGr = comp.unitWeightGr * comp.quantity;
      totalWeightGr += totalGr;
      if (comp.isRecyclable) {
        recyclableWeightGr += totalGr;
      }
    });

    const recyclabilityPercent = (recyclableWeightGr / totalWeightGr) * 100;
    let recyclabilityLevel: "Alto" | "Medio" | "Bajo" = "Bajo";

    if (recyclabilityPercent >= 70) {
      recyclabilityLevel = "Alto";
    } else if (recyclabilityPercent >= 50) {
      recyclabilityLevel = "Medio";
    }

    return {
      totalWeightGr,
      recyclableWeightGr,
      recyclabilityPercent: Number(recyclabilityPercent.toFixed(2)),
      recyclabilityLevel,
    };
  };

  const addComponent = () => {
    if (!currentComponent.description || currentComponent.unitWeightGr <= 0 || currentComponent.quantity <= 0) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor complete todos los campos del componente",
      });
      return;
    }

    setComponents([...components, currentComponent]);
    setCurrentComponent({
      material: "papel_carton",
      description: "",
      unitWeightGr: 0,
      quantity: 1,
      isRecyclable: true,
    });
  };

  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.providerId || !formData.clientName || components.length === 0) {
      toast({
        variant: "destructive",
        title: "Formulario incompleto",
        description: "Complete todos los campos requeridos y agregue al menos un componente",
      });
      return;
    }

    await createShipment.mutateAsync({
      ...formData,
      components,
    });
  };

  const handleCertify = async (shipmentId: string) => {
    await certifyShipment.mutateAsync(shipmentId);
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Certificación de Embalajes</h1>
        <p className="text-muted-foreground mt-2">
          Sistema de certificación REP con cálculo algorítmico de peso y reciclabilidad
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Despacho</CardTitle>
              <CardDescription>Información general del despacho a certificar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="provider-select">Proveedor *</Label>
                  <Select
                    value={formData.providerId}
                    onValueChange={(value) => setFormData({ ...formData, providerId: value })}
                  >
                    <SelectTrigger id="provider-select" data-testid="select-provider">
                      <SelectValue placeholder="Seleccione un proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {(providers as any[])?.map((provider: any) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name} - {provider.rut}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-name">Nombre Cliente *</Label>
                  <Input
                    id="client-name"
                    data-testid="input-client-name"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Ej: Minera Los Andes S.A."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-rut">RUT Cliente</Label>
                  <Input
                    id="client-rut"
                    data-testid="input-client-rut"
                    value={formData.clientRut}
                    onChange={(e) => setFormData({ ...formData, clientRut: e.target.value })}
                    placeholder="Ej: 76.XXX.XXX-X"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Input
                    id="notes"
                    data-testid="input-notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Notas adicionales"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Componentes de Embalaje</CardTitle>
              <CardDescription>Agregue los componentes con peso unitario y cantidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="material-select">Material</Label>
                  <Select
                    value={currentComponent.material}
                    onValueChange={(value) =>
                      setCurrentComponent({ ...currentComponent, material: value })
                    }
                  >
                    <SelectTrigger id="material-select" data-testid="select-material">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MATERIALS.map((mat) => (
                        <SelectItem key={mat.value} value={mat.value}>
                          {mat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    data-testid="input-description"
                    value={currentComponent.description}
                    onChange={(e) =>
                      setCurrentComponent({ ...currentComponent, description: e.target.value })
                    }
                    placeholder="Ej: Caja de cartón"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit-weight">Peso Unit. (gr)</Label>
                  <Input
                    id="unit-weight"
                    data-testid="input-unit-weight"
                    type="number"
                    min="1"
                    value={currentComponent.unitWeightGr || ""}
                    onChange={(e) =>
                      setCurrentComponent({ ...currentComponent, unitWeightGr: Number(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad</Label>
                  <Input
                    id="quantity"
                    data-testid="input-quantity"
                    type="number"
                    min="1"
                    value={currentComponent.quantity}
                    onChange={(e) =>
                      setCurrentComponent({ ...currentComponent, quantity: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="flex items-end">
                  <Button onClick={addComponent} className="w-full" data-testid="button-add-component">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="recyclable-checkbox"
                  data-testid="checkbox-recyclable"
                  type="checkbox"
                  checked={currentComponent.isRecyclable}
                  onChange={(e) =>
                    setCurrentComponent({ ...currentComponent, isRecyclable: e.target.checked })
                  }
                  className="h-4 w-4"
                />
                <Label htmlFor="recyclable-checkbox" className="text-sm font-normal cursor-pointer">
                  Material reciclable
                </Label>
              </div>

              {components.length > 0 && (
                <div className="border rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm">Componentes agregados:</h4>
                  {components.map((comp, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-md"
                      data-testid={`component-${index}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {MATERIALS.find((m) => m.value === comp.material)?.label}
                          </span>
                          {comp.isRecyclable && (
                            <Badge variant="secondary" className="text-xs">
                              Reciclable
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {comp.description} - {comp.unitWeightGr}g × {comp.quantity} ={" "}
                          {comp.unitWeightGr * comp.quantity}g
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeComponent(index)}
                        data-testid={`button-remove-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Cálculo Automático
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Peso Total</p>
                <p className="text-2xl font-bold" data-testid="text-total-weight">
                  {metrics.totalWeightGr.toLocaleString()}g
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Peso Reciclable</p>
                <p className="text-2xl font-bold text-green-600" data-testid="text-recyclable-weight">
                  {metrics.recyclableWeightGr.toLocaleString()}g
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Reciclabilidad</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold" data-testid="text-recyclability-percent">
                    {metrics.recyclabilityPercent}%
                  </p>
                  <Badge
                    variant={
                      metrics.recyclabilityLevel === "Alto"
                        ? "default"
                        : metrics.recyclabilityLevel === "Medio"
                        ? "secondary"
                        : "destructive"
                    }
                    data-testid="badge-recyclability-level"
                  >
                    {metrics.recyclabilityLevel}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">Clasificación:</p>
                <ul className="text-xs space-y-1">
                  <li>• Alto: ≥ 70%</li>
                  <li>• Medio: 50-69.9%</li>
                  <li>• Bajo: &lt; 50%</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            disabled={createShipment.isPending || components.length === 0}
            className="w-full"
            size="lg"
            data-testid="button-submit-shipment"
          >
            {createShipment.isPending ? "Creando..." : "Crear Despacho"}
          </Button>
        </div>
      </div>

      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Despacho Certificado
            </DialogTitle>
            <DialogDescription>
              El despacho ha sido certificado exitosamente
            </DialogDescription>
          </DialogHeader>

          {certifiedShipment && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Código de Despacho</p>
                <p className="text-xl font-bold font-mono">{certifiedShipment.code}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Código QR</p>
                {qrImageUrl && (
                  <img
                    src={qrImageUrl}
                    alt="QR Code"
                    className="mx-auto border rounded-lg"
                    data-testid="img-qr-code"
                  />
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Tag NFC</p>
                <p className="text-sm font-mono">{certifiedShipment.nfcTag}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Hash Blockchain</p>
                <p className="text-xs font-mono break-all">{certifiedShipment.blockchainHash}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
