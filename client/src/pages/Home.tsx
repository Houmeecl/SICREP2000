import LandingHero from "@/components/LandingHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Leaf, Zap, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingHero />
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué SICREP?</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            La plataforma más completa para certificación REP bajo Ley 20.920, 
            especializada en la industria minera y energía chilena.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Certificación Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sistema 100% alineado con Ley 20.920 y normativa ambiental chilena
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-chart-3 mb-2" />
              <CardTitle>Trazabilidad NFC</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seguimiento inmutable con blockchain y verificación instantánea por QR/NFC
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-chart-2 mb-2" />
              <CardTitle>15 Roles de Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Workflow completo para todos los actores del proceso de certificación
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Leaf className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Métricas ESG</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Reportes completos de impacto ambiental y sostenibilidad para minería y energía
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-3/10 rounded-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Sistema de 100 Puntos</h3>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-md">
                <div className="text-3xl font-bold text-primary mb-1">40 pts</div>
                <div className="text-sm font-medium">Documentales</div>
              </div>
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-md">
                <div className="text-3xl font-bold text-chart-2 mb-1">40 pts</div>
                <div className="text-sm font-medium">Operativos</div>
              </div>
              <div className="p-4 bg-background/80 backdrop-blur-sm rounded-md">
                <div className="text-3xl font-bold text-chart-3 mb-1">20 pts</div>
                <div className="text-sm font-medium">Valor Agregado</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Evaluación integral con tres pilares complementarios para garantizar cumplimiento total
            </p>
          </div>
        </div>
        
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Flujo de Certificación en 10 Fases</CardTitle>
            <CardDescription>
              Proceso completo desde solicitud hasta monitoreo continuo con SLA definidos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Solicitud Inicial",
                "Asignación CPS",
                "Eval. Documentos",
                "Eval. Operativa",
                "Eval. Valor Agregado",
                "Revisión Final",
                "Emisión Certificado",
                "Activación NFC",
                "Publicación",
                "Monitoreo Continuo"
              ].map((phase, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium">{phase}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-card border rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Precios Transparentes</h3>
          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-6">
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">15 UF</div>
              <div className="font-medium mb-2">Certificación Inicial</div>
              <div className="text-sm text-muted-foreground">Pago único por certificado</div>
            </div>
            <div className="p-6 rounded-lg bg-chart-2/5 border border-chart-2/20">
              <div className="text-4xl font-bold text-chart-2 mb-2">5 UF/mes</div>
              <div className="font-medium mb-2">Acceso Plataforma</div>
              <div className="text-sm text-muted-foreground">Trazabilidad y reportes</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/certifications">
              <Button size="lg" data-testid="button-start-certification">
                Iniciar Certificación
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" data-testid="button-contact-sales">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>
      
      <footer className="border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 SICREP - Sistema de Certificación REP | Ley 20.920 - República de Chile</p>
          <p className="mt-2">Especializado en Industria Minera y Energía • Trazabilidad NFC • Métricas ESG</p>
        </div>
      </footer>
    </div>
  );
}
