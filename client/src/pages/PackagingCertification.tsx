import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Package, Plus, Trash2, CheckCircle, QrCode, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface PackagingComponent {
  material: string;
  description: string;
  unitWeightGr: number;
  quantity: number;
  isRecyclable: boolean;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    thickness?: number;
  };
}

interface CalculationResult {
  totalWeightGr: number;
  recyclableWeightGr: number;
  recyclabilityPercent: number;
  recyclabilityLevel: "Alto" | "Medio" | "Bajo";
}

const MATERIALS = [
  { value: "papel_carton", label: "Papel y Cartón", density: 0.7 }, // g/cm³
  { value: "plasticos", label: "Plásticos", density: 1.2 },
  { value: "vidrio", label: "Vidrio", density: 2.5 },
  { value: "metales", label: "Metales", density: 7.8 },
  { value: "madera", label: "Madera", density: 0.6 },
  { value: "compuestos", label: "Compuestos", density: 1.5 },
  { value: "otros", label: "Otros", density: 1.0 },
];

export default function PackagingCertification() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
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
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      thickness: 0,
    },
  });

  const [useCalculator, setUseCalculator] = useState(false);

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

  const calculateWeightFromDimensions = () => {
    const dims = currentComponent.dimensions;
    if (!dims || !dims.length || !dims.width) {
      toast({
        variant: "destructive",
        title: "Faltan dimensiones",
        description: "Ingrese al menos largo y ancho para calcular el peso",
      });
      return;
    }

    const material = MATERIALS.find(m => m.value === currentComponent.material);
    if (!material) return;

    // Calcular volumen en cm³
    let volumeCm3 = 0;
    
    if (dims.thickness && dims.thickness > 0) {
      // Para materiales con espesor (láminas, planchas)
      volumeCm3 = (dims.length / 10) * (dims.width / 10) * (dims.thickness / 10);
    } else if (dims.height && dims.height > 0) {
      // Para objetos 3D (cajas, bidones)
      volumeCm3 = (dims.length / 10) * (dims.width / 10) * (dims.height / 10);
    } else {
      // Solo largo x ancho (asumiendo 1mm de espesor para papel/cartón)
      const defaultThicknessMm = currentComponent.material === "papel_carton" ? 0.5 : 1;
      volumeCm3 = (dims.length / 10) * (dims.width / 10) * (defaultThicknessMm / 10);
    }

    // Calcular peso: volumen (cm³) * densidad (g/cm³)
    const calculatedWeight = Math.round(volumeCm3 * material.density);
    
    setCurrentComponent({
      ...currentComponent,
      unitWeightGr: calculatedWeight,
    });

    toast({
      title: "Peso calculado",
      description: `Peso estimado: ${calculatedWeight}g basado en dimensiones y material`,
    });
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
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        thickness: 0,
      },
    });
    setUseCalculator(false);
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
              <CardDescription>Agregue componentes con sus dimensiones o peso directo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <input
                  id="use-calculator"
                  type="checkbox"
                  checked={useCalculator}
                  onChange={(e) => setUseCalculator(e.target.checked)}
                  className="h-4 w-4"
                  data-testid="checkbox-use-calculator"
                />
                <Label htmlFor="use-calculator" className="text-sm cursor-pointer">
                  Calcular peso automáticamente desde dimensiones
                </Label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="material-select">Material *</Label>
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
                          {mat.label} (densidad: {mat.density} g/cm³)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Input
                    id="description"
                    data-testid="input-description"
                    value={currentComponent.description}
                    onChange={(e) =>
                      setCurrentComponent({ ...currentComponent, description: e.target.value })
                    }
                    placeholder="Ej: Caja de cartón corrugado"
                  />
                </div>
              </div>

              {useCalculator && (
                <div className="border rounded-lg p-4 space-y-3 bg-primary/5">
                  <Label className="text-sm font-semibold">Dimensiones (en mm)</Label>
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="dim-length" className="text-xs">Largo *</Label>
                      <Input
                        id="dim-length"
                        data-testid="input-length"
                        type="number"
                        min="0"
                        step="0.1"
                        value={currentComponent.dimensions?.length || ""}
                        onChange={(e) =>
                          setCurrentComponent({
                            ...currentComponent,
                            dimensions: { ...currentComponent.dimensions, length: Number(e.target.value) }
                          })
                        }
                        placeholder="mm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dim-width" className="text-xs">Ancho *</Label>
                      <Input
                        id="dim-width"
                        data-testid="input-width"
                        type="number"
                        min="0"
                        step="0.1"
                        value={currentComponent.dimensions?.width || ""}
                        onChange={(e) =>
                          setCurrentComponent({
                            ...currentComponent,
                            dimensions: { ...currentComponent.dimensions, width: Number(e.target.value) }
                          })
                        }
                        placeholder="mm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dim-height" className="text-xs">Alto</Label>
                      <Input
                        id="dim-height"
                        data-testid="input-height"
                        type="number"
                        min="0"
                        step="0.1"
                        value={currentComponent.dimensions?.height || ""}
                        onChange={(e) =>
                          setCurrentComponent({
                            ...currentComponent,
                            dimensions: { ...currentComponent.dimensions, height: Number(e.target.value) }
                          })
                        }
                        placeholder="mm (3D)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dim-thickness" className="text-xs">Espesor</Label>
                      <Input
                        id="dim-thickness"
                        data-testid="input-thickness"
                        type="number"
                        min="0"
                        step="0.01"
                        value={currentComponent.dimensions?.thickness || ""}
                        onChange={(e) =>
                          setCurrentComponent({
                            ...currentComponent,
                            dimensions: { ...currentComponent.dimensions, thickness: Number(e.target.value) }
                          })
                        }
                        placeholder="mm (láminas)"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={calculateWeightFromDimensions}
                    variant="secondary"
                    className="w-full"
                    data-testid="button-calculate-weight"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Calcular Peso desde Dimensiones
                  </Button>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="unit-weight">Peso Unitario (gr) *</Label>
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
                    disabled={useCalculator && currentComponent.unitWeightGr === 0}
                  />
                  {useCalculator && (
                    <p className="text-xs text-muted-foreground">
                      Calculado automáticamente o ingrese manualmente
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad *</Label>
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
              El despacho ha sido certificado exitosamente con QR y NFC
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

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowQRDialog(false)}
              data-testid="button-close-dialog"
            >
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setShowQRDialog(false);
                setLocation("/dashboard");
              }}
              data-testid="button-back-to-dashboard"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
