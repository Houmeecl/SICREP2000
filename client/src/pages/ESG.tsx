import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplet, Zap, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";

export default function ESG() {
  const { data: metricsData = [] } = useQuery<any[]>({
    queryKey: ["/api/esg-metrics"],
  });

  const latestMetric = metricsData[metricsData.length - 1];
  
  const metrics = latestMetric ? [
    {
      title: "CO₂ Evitado",
      value: `${parseFloat(latestMetric.co2Avoided).toFixed(0)} ton`,
      change: "+18% vs mes anterior",
      icon: <Leaf className="w-5 h-5 text-primary" />,
    },
    {
      title: "Reciclaje",
      value: `${parseFloat(latestMetric.recyclabilityRate).toFixed(1)}%`,
      change: "Meta: 90%",
      icon: <TrendingUp className="w-5 h-5 text-chart-2" />,
    },
    {
      title: "Agua Conservada",
      value: `${parseFloat(latestMetric.waterConserved).toFixed(0)} L`,
      change: "+12% vs mes anterior",
      icon: <Droplet className="w-5 h-5 text-chart-5" />,
    },
    {
      title: "Energía Renovable",
      value: `${parseFloat(latestMetric.renewableEnergyPercent).toFixed(0)}%`,
      change: "Meta: 75% para 2026",
      icon: <Zap className="w-5 h-5 text-chart-3" />,
    },
  ] : [];

  const chartData = metricsData.map((m: any) => ({
    month: m.month.slice(5), // Get "01", "02" from "2025-01"
    reciclaje: parseFloat(m.recyclabilityRate),
    emisiones: parseFloat(m.co2Avoided),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Métricas ESG</h1>
        <p className="text-muted-foreground">
          Indicadores de sostenibilidad y cumplimiento ambiental para minería
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <div className="text-sm font-medium">{metric.title}</div>
                <div className="text-muted-foreground">{metric.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {chartData.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tendencia Mensual - Sector Minería</CardTitle>
                <Badge variant="default">ESG Score: 8.7/10</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="reciclaje" fill="hsl(var(--chart-1))" name="% Reciclaje" />
                  <Bar dataKey="emisiones" fill="hsl(var(--chart-2))" name="CO₂ Evitado (ton)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
        
        {metricsData.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No hay datos de métricas ESG disponibles
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
