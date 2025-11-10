import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package2, Recycle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useBackNavigation } from "@/hooks/useBackNavigation";

export default function CPSPage() {
  const { goBack } = useBackNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: cpsItems = [] } = useQuery<any[]>({
    queryKey: ["/api/cps"],
  });

  const filteredItems = cpsItems.filter((item: any) => 
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={() => goBack()} variant="ghost" size="sm" data-testid="button-back-cps">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Catálogo CPS</h1>
          <p className="text-muted-foreground">
            Certificados de Producto Sustentable para envases y embalajes
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Catálogo CPS (Certificados de Producto Sustentable)</CardTitle>
            <Button size="sm" data-testid="button-add-cps">
              <Package2 className="w-4 h-4 mr-2" />
              Nuevo CPS
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por código, material o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              data-testid="input-search-cps"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredItems.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-md border hover-elevate"
                data-testid={`cps-item-${item.code}`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                  <Package2 className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono font-semibold">{item.code}</code>
                    {item.status === "deprecated" && (
                      <Badge variant="secondary" className="text-xs">Descontinuado</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-medium">{item.material}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{item.type}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{item.weight}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm font-semibold">{item.recyclability}%</span>
                </div>
                
                <Button size="sm" variant="outline" data-testid={`button-view-${item.code}`}>
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? `No se encontraron resultados para "${searchTerm}"` : "No hay items en el catálogo"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
