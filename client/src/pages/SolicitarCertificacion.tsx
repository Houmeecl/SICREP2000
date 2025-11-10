import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Upload, FileText, Building2, User, ClipboardCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";

const requestSchema = z.object({
  companyName: z.string().min(3, "El nombre de la empresa debe tener al menos 3 caracteres"),
  companyRut: z.string().regex(/^\d{7,8}-[\dkK]$/, "Formato de RUT inválido (ej: 12345678-9)"),
  companyEmail: z.string().email("Email inválido"),
  companyPhone: z.string().min(8, "Teléfono inválido"),
  companyAddress: z.string().min(5, "Dirección requerida"),
  industry: z.string().min(1, "Seleccione una industria"),
  contactName: z.string().min(3, "Nombre del contacto requerido"),
  contactEmail: z.string().email("Email del contacto inválido"),
  contactPhone: z.string().min(8, "Teléfono del contacto inválido"),
  manualConfirmed: z.boolean().refine(val => val === true, "Debe confirmar que ha descargado el manual"),
  documents: z.custom<FileList>().optional().refine(
    (files) => !files || files.length <= 5,
    "Máximo 5 archivos permitidos"
  ).refine(
    (files) => {
      if (!files || files.length === 0) return true;
      return Array.from(files).every(file => file.size <= 5 * 1024 * 1024);
    },
    "Cada archivo debe pesar menos de 5MB"
  ),
  confirmNoDocuments: z.boolean().optional()
});

type RequestFormData = z.infer<typeof requestSchema>;

export default function SolicitarCertificacion() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("empresa");
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);

  const form = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      companyName: "",
      companyRut: "",
      companyEmail: "",
      companyPhone: "",
      companyAddress: "",
      industry: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      manualConfirmed: false,
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: RequestFormData) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'documents' && key !== 'manualConfirmed') {
          formData.append(key, value as string);
        }
      });

      // Add manualDownloaded as a boolean (backend expects this field name)
      formData.append('manualDownloaded', data.manualConfirmed ? 'true' : 'false');

      if (data.documents) {
        Array.from(data.documents).forEach((file) => {
          formData.append('documents', file);
        });
      }

      const response = await fetch('/api/public/certification-requests', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al enviar la solicitud');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setSubmittedRequestId(data.requestId);
      toast({
        title: "Solicitud enviada exitosamente",
        description: `Su solicitud ha sido registrada con ID: ${data.requestId.substring(0, 8)}...`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al enviar solicitud",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: RequestFormData) => {
    submitMutation.mutate(data);
  };

  const handleNextTab = async (nextTab: string) => {
    const currentFields = {
      empresa: ['companyName', 'companyRut', 'companyEmail', 'companyPhone', 'companyAddress', 'industry'],
      contacto: ['contactName', 'contactEmail', 'contactPhone'],
      documentos: ['manualConfirmed', 'documents'],
    };

    const fieldsToValidate = currentFields[currentTab as keyof typeof currentFields];
    const isValid = await form.trigger(fieldsToValidate as any);

    if (isValid) {
      setCurrentTab(nextTab);
    }
  };

  if (submittedRequestId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Solicitud Recibida</CardTitle>
            <CardDescription>
              Su solicitud de certificación REP ha sido enviada exitosamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>ID de Solicitud:</strong> {submittedRequestId}
              </AlertDescription>
            </Alert>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Próximos pasos:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Nuestro equipo revisará su solicitud en las próximas 48 horas</li>
                <li>Recibirá un correo electrónico con el estado de su solicitud</li>
                <li>Si es aprobada, recibirá credenciales de acceso a la plataforma</li>
                <li>Podrá iniciar el proceso de certificación completo</li>
              </ol>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => navigate("/")} 
                variant="outline"
                className="flex-1"
                data-testid="button-go-home"
              >
                Volver al Inicio
              </Button>
              <Button 
                onClick={() => {
                  setSubmittedRequestId(null);
                  form.reset();
                  setCurrentTab("empresa");
                }}
                className="flex-1"
                data-testid="button-new-request"
              >
                Nueva Solicitud
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Solicitar Certificación REP</h1>
          <p className="text-muted-foreground">
            Complete el formulario para iniciar el proceso de certificación de su empresa
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="empresa" data-testid="tab-empresa">
                <Building2 className="w-4 h-4 mr-2" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="contacto" data-testid="tab-contacto">
                <User className="w-4 h-4 mr-2" />
                Contacto
              </TabsTrigger>
              <TabsTrigger value="documentos" data-testid="tab-documentos">
                <FileText className="w-4 h-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger value="revision" data-testid="tab-revision">
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Revisión
              </TabsTrigger>
            </TabsList>

            <TabsContent value="empresa">
              <Card>
                <CardHeader>
                  <CardTitle>Datos de la Empresa</CardTitle>
                  <CardDescription>
                    Información básica de la empresa que solicita la certificación
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                    <Input
                      id="companyName"
                      data-testid="input-company-name"
                      {...form.register("companyName")}
                      placeholder="Ej: Minera del Norte S.A."
                    />
                    {form.formState.errors.companyName && (
                      <p className="text-sm text-destructive">{form.formState.errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyRut">RUT de la Empresa *</Label>
                      <Input
                        id="companyRut"
                        data-testid="input-company-rut"
                        {...form.register("companyRut")}
                        placeholder="12345678-9"
                      />
                      {form.formState.errors.companyRut && (
                        <p className="text-sm text-destructive">{form.formState.errors.companyRut.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industria *</Label>
                      <Select onValueChange={(value) => form.setValue("industry", value)}>
                        <SelectTrigger id="industry" data-testid="select-industry">
                          <SelectValue placeholder="Seleccione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mineria">Minería</SelectItem>
                          <SelectItem value="energia">Energía</SelectItem>
                          <SelectItem value="manufactura">Manufactura</SelectItem>
                          <SelectItem value="otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.industry && (
                        <p className="text-sm text-destructive">{form.formState.errors.industry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email Corporativo *</Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        data-testid="input-company-email"
                        {...form.register("companyEmail")}
                        placeholder="contacto@empresa.cl"
                      />
                      {form.formState.errors.companyEmail && (
                        <p className="text-sm text-destructive">{form.formState.errors.companyEmail.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Teléfono *</Label>
                      <Input
                        id="companyPhone"
                        data-testid="input-company-phone"
                        {...form.register("companyPhone")}
                        placeholder="+56912345678"
                      />
                      {form.formState.errors.companyPhone && (
                        <p className="text-sm text-destructive">{form.formState.errors.companyPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">Dirección *</Label>
                    <Textarea
                      id="companyAddress"
                      data-testid="input-company-address"
                      {...form.register("companyAddress")}
                      placeholder="Calle, número, comuna, ciudad"
                      rows={3}
                    />
                    {form.formState.errors.companyAddress && (
                      <p className="text-sm text-destructive">{form.formState.errors.companyAddress.message}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={() => handleNextTab("contacto")}
                      data-testid="button-next-contacto"
                    >
                      Siguiente: Contacto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacto">
              <Card>
                <CardHeader>
                  <CardTitle>Datos de Contacto</CardTitle>
                  <CardDescription>
                    Persona responsable que coordinará el proceso de certificación
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Nombre Completo *</Label>
                    <Input
                      id="contactName"
                      data-testid="input-contact-name"
                      {...form.register("contactName")}
                      placeholder="Ej: Juan Pérez González"
                    />
                    {form.formState.errors.contactName && (
                      <p className="text-sm text-destructive">{form.formState.errors.contactName.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email del Contacto *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        data-testid="input-contact-email"
                        {...form.register("contactEmail")}
                        placeholder="juan.perez@empresa.cl"
                      />
                      {form.formState.errors.contactEmail && (
                        <p className="text-sm text-destructive">{form.formState.errors.contactEmail.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Teléfono del Contacto *</Label>
                      <Input
                        id="contactPhone"
                        data-testid="input-contact-phone"
                        {...form.register("contactPhone")}
                        placeholder="+56912345678"
                      />
                      {form.formState.errors.contactPhone && (
                        <p className="text-sm text-destructive">{form.formState.errors.contactPhone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCurrentTab("empresa")}
                      data-testid="button-back-empresa"
                    >
                      Anterior
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => handleNextTab("documentos")}
                      data-testid="button-next-documentos"
                    >
                      Siguiente: Documentos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documentos">
              <Card>
                <CardHeader>
                  <CardTitle>Manual y Documentos</CardTitle>
                  <CardDescription>
                    Descargue el manual y adjunte los documentos requeridos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-semibold">Manual de Evaluación REP</p>
                        <p className="text-sm">
                          Antes de continuar, descargue y revise el Manual de Evaluación que detalla 
                          los requisitos y el proceso de certificación.
                        </p>
                        <Link href="/manual">
                          <Button 
                            variant="outline" 
                            size="sm"
                            type="button"
                            data-testid="button-download-manual"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Descargar Manual
                          </Button>
                        </Link>
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="manualConfirmed"
                      data-testid="checkbox-manual-confirmed"
                      checked={form.watch("manualConfirmed")}
                      onCheckedChange={(checked) => form.setValue("manualConfirmed", checked as boolean)}
                    />
                    <Label htmlFor="manualConfirmed" className="text-sm leading-relaxed cursor-pointer">
                      He descargado y revisado el Manual de Evaluación REP y comprendo los requisitos de certificación *
                    </Label>
                  </div>
                  {form.formState.errors.manualConfirmed && (
                    <p className="text-sm text-destructive">{form.formState.errors.manualConfirmed.message}</p>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="documents">Documentos Requeridos</Label>
                    <div className="text-sm text-muted-foreground mb-2">
                      <p>Adjunte los siguientes documentos (máximo 5 archivos, 5MB cada uno):</p>
                      <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                        <li>RUT de la empresa</li>
                        <li>Comprobante de pago inicial (15 UF)</li>
                        <li>Carta de solicitud firmada</li>
                        <li>Otros documentos relevantes (opcional)</li>
                      </ul>
                    </div>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        data-testid="input-documents"
                        {...form.register("documents")}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        PDF, JPG o PNG - Máximo 5 archivos de 5MB cada uno
                      </p>
                    </div>
                    {form.formState.errors.documents && (
                      <p className="text-sm text-destructive">{form.formState.errors.documents.message}</p>
                    )}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCurrentTab("contacto")}
                      data-testid="button-back-contacto"
                    >
                      Anterior
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => handleNextTab("revision")}
                      data-testid="button-next-revision"
                    >
                      Siguiente: Revisión
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revision">
              <Card>
                <CardHeader>
                  <CardTitle>Revisión y Confirmación</CardTitle>
                  <CardDescription>
                    Verifique que todos los datos sean correctos antes de enviar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Datos de la Empresa</h3>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <dt className="text-muted-foreground">Nombre:</dt>
                      <dd data-testid="review-company-name">{form.watch("companyName")}</dd>
                      <dt className="text-muted-foreground">RUT:</dt>
                      <dd data-testid="review-company-rut">{form.watch("companyRut")}</dd>
                      <dt className="text-muted-foreground">Industria:</dt>
                      <dd data-testid="review-industry">{form.watch("industry")}</dd>
                      <dt className="text-muted-foreground">Email:</dt>
                      <dd data-testid="review-company-email">{form.watch("companyEmail")}</dd>
                      <dt className="text-muted-foreground">Teléfono:</dt>
                      <dd data-testid="review-company-phone">{form.watch("companyPhone")}</dd>
                      <dt className="text-muted-foreground">Dirección:</dt>
                      <dd className="col-span-1" data-testid="review-company-address">{form.watch("companyAddress")}</dd>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Datos de Contacto</h3>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <dt className="text-muted-foreground">Nombre:</dt>
                      <dd data-testid="review-contact-name">{form.watch("contactName")}</dd>
                      <dt className="text-muted-foreground">Email:</dt>
                      <dd data-testid="review-contact-email">{form.watch("contactEmail")}</dd>
                      <dt className="text-muted-foreground">Teléfono:</dt>
                      <dd data-testid="review-contact-phone">{form.watch("contactPhone")}</dd>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Documentos Adjuntos</h3>
                    {form.watch("documents") && form.watch("documents").length > 0 ? (
                      <ul className="space-y-1">
                        {Array.from(form.watch("documents")).map((file, index) => (
                          <li key={index} className="text-sm flex items-center gap-2" data-testid={`review-file-${index}`}>
                            <FileText className="w-4 h-4" />
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">Sin documentos</p>
                    )}
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Al enviar esta solicitud, confirma que toda la información proporcionada es correcta 
                      y está de acuerdo con iniciar el proceso de certificación REP.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCurrentTab("documentos")}
                      data-testid="button-back-documentos"
                    >
                      Anterior
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-request"
                    >
                      {submitMutation.isPending ? "Enviando..." : "Enviar Solicitud"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </div>
  );
}
