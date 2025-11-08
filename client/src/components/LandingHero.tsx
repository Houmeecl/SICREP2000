import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Leaf } from "lucide-react";
import heroImage from "@assets/generated_images/Mining_trucks_with_wind_turbines_2fe45c1a.png";

export default function LandingHero() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-white">Certificado bajo Ley 20.920</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Certificación REP para la
          <span className="block text-primary mt-2">Industria Minera</span>
        </h1>
        
        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
          Plataforma profesional de trazabilidad NFC y gestión de cumplimiento ambiental. 
          Sistema completo de certificación de envases y embalajes.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border border-primary">
            Solicitar Certificación
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
            Ver Demo
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-8 justify-center text-white/90">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>15 UF Certificación Inicial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>5 UF/mes Plataforma</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span>Trazabilidad NFC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
