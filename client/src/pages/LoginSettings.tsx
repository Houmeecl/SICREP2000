import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ImagePlus, Save, X } from "lucide-react";

export default function LoginSettings() {
  const { toast } = useToast();

  const { data: config, isLoading } = useQuery<any>({
    queryKey: ["/api/login-config"],
  });

  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (config) {
      setImageUrl(config.imageUrl || "");
      setTitle(config.title || "Sistema de Certificación REP");
      setSubtitle(config.subtitle || "Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental según Ley 20.920");
    }
  }, [config]);

  const updateConfigMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/login-config", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/login-config"] });
      toast({
        title: "Configuración actualizada",
        description: "La personalización de login se guardó correctamente",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: (error as any).message || "No se pudo actualizar la configuración",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfigMutation.mutate({
      imageUrl: imageUrl || null,
      title,
      subtitle,
    });
  };

  const handleClearImage = () => {
    setImageUrl("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Cargando configuración...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Personalización de Login</h1>
        <p className="text-muted-foreground">
          Configura la imagen y textos del panel de inicio de sesión
        </p>
      </div>

      <div className="grid gap-6">
        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa</CardTitle>
            <CardDescription>
              Así se verá el panel de login para los usuarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="flex min-h-[400px]">
                {/* Preview Left Side */}
                {imageUrl && (
                  <div 
                    className="w-1/2 bg-cover bg-center relative"
                    style={{ 
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-[2px]" />
                    <div className="relative z-10 flex flex-col justify-center items-start p-8 text-white h-full">
                      <h1 className="text-2xl font-bold mb-2 drop-shadow-lg">
                        {title || "Sistema de Certificación REP"}
                      </h1>
                      <p className="text-sm text-white/90 drop-shadow-md">
                        {subtitle || "Plataforma profesional de trazabilidad"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Preview Right Side */}
                <div className={`${imageUrl ? 'w-1/2' : 'w-full'} bg-background flex items-center justify-center p-8`}>
                  <div className="w-full max-w-sm">
                    <div className="text-center mb-4">
                      <h2 className="text-xl font-bold">Iniciar Sesión</h2>
                      <p className="text-sm text-muted-foreground">Vista previa</p>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-muted rounded-md"></div>
                      <div className="h-10 bg-muted rounded-md"></div>
                      <div className="h-10 bg-primary/20 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>
              Personaliza la imagen de fondo y textos del panel de login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de Imagen de Fondo</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    data-testid="input-image-url"
                  />
                  {imageUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleClearImage}
                      data-testid="button-clear-image"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Deja vacío para mostrar solo el formulario de login sin imagen lateral
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título Principal</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Sistema de Certificación REP"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  data-testid="input-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Textarea
                  id="subtitle"
                  placeholder="Plataforma profesional de trazabilidad NFC..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows={3}
                  data-testid="input-subtitle"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={updateConfigMutation.isPending}
                  data-testid="button-save-config"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {updateConfigMutation.isPending ? "Guardando..." : "Guardar Configuración"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setImageUrl(config?.imageUrl || "");
                    setTitle(config?.title || "Sistema de Certificación REP");
                    setSubtitle(config?.subtitle || "Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental según Ley 20.920");
                  }}
                  data-testid="button-reset"
                >
                  Restablecer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImagePlus className="h-5 w-5" />
              Instrucciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• La imagen debe ser una URL pública accesible desde internet</p>
            <p>• Recomendado: Imágenes con dimensiones de al menos 1200x800 píxeles</p>
            <p>• Formatos soportados: JPG, PNG, WebP</p>
            <p>• Si no configuras una imagen, el login mostrará solo el formulario centrado</p>
            <p>• Los cambios se aplicarán inmediatamente para todos los usuarios</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
