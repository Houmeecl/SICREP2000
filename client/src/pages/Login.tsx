import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth";
import { getDashboardForRole } from "@/lib/role-routing";
import { useQuery } from "@tanstack/react-query";
import logoUrl from "@assets/ChatGPT Image 3 nov 2025, 03_29_38 p.m._1762631913336.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();

  // Obtener configuración de login personalizada
  const { data: loginConfig } = useQuery<any>({
    queryKey: ["/api/login-config"],
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardPath = getDashboardForRole(user.role);
      setLocation(dashboardPath);
    }
  }, [isAuthenticated, user, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      // Redirect is handled by useEffect
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const customImageUrl = loginConfig?.imageUrl;

  return (
    <div className="flex min-h-screen">
      {/* Left side - Custom Image (solo si está configurada) */}
      {customImageUrl && (
        <div 
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${customImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-[2px]" />
          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
            <img 
              src={logoUrl} 
              alt="SICREP Logo" 
              className="h-24 w-auto mb-8"
            />
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {loginConfig?.title || "Sistema de Certificación REP"}
            </h1>
            <p className="text-lg text-white/90 max-w-md drop-shadow-md">
              {loginConfig?.subtitle || "Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental según Ley 20.920"}
            </p>
          </div>
        </div>
      )}

      {/* Right side - Login Form */}
      <div className={`flex-1 flex items-center justify-center p-8 bg-background ${!customImageUrl ? 'w-full' : ''}`}>
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={logoUrl} 
              alt="SICREP Logo" 
              className="h-16 w-auto"
            />
          </div>

          <Card className="border-2">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center">
                Ingresa tus credenciales para acceder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md" data-testid="text-error">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresa tu nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    data-testid="input-username"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    data-testid="input-password"
                    className="h-11"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    data-testid="checkbox-remember"
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm font-normal cursor-pointer"
                  >
                    Recordar Contraseña
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                  data-testid="button-submit"
                >
                  {isLoading ? "Ingresando..." : "Ingresar"}
                </Button>

                <div className="text-center">
                  <a 
                    href="#" 
                    className="text-sm text-primary hover:underline"
                    data-testid="link-forgot-password"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-center text-muted-foreground">
                  Consulta el manual de plataforma para credenciales de acceso
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            © 2025 SICREP. Sistema Integral de Certificación REP.
          </p>
        </div>
      </div>
    </div>
  );
}
