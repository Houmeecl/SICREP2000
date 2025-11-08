import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplet, Zap, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ESGMetrics() {
  //todo: remove mock functionality
  const metrics = [
    {
      title: "CO₂ Evitado",
      value: "1,234 ton",
      change: "+18% vs mes anterior",
      icon: <Leaf className="w-5 h-5 text-primary" />,
    },
    {
      title: "Reciclaje",
      value: "87.5%",
      change: "Meta: 90%",
      icon: <TrendingUp className="w-5 h-5 text-chart-2" />,
    },
    {
      title: "Agua Conservada",
      value: "45,678 L",
      change: "+12% vs mes anterior",
      icon: <Droplet className="w-5 h-5 text-chart-5" />,
    },
    {
      title: "Energía Renovable",
      value: "62%",
      change: "Meta: 75% para 2026",
      icon: <Zap className="w-5 h-5 text-chart-3" />,
    },
  ];

  const chartData = [
    { month: "Ene", reciclaje: 82, emisiones: 1150 },
    { month: "Feb", reciclaje: 84, emisiones: 1180 },
    { month: "Mar", reciclaje: 85, emisiones: 1200 },
    { month: "Abr", reciclaje: 86, emisiones: 1220 },
    { month: "May", reciclaje: 87.5, emisiones: 1234 },
  ];

  return (
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
    </div>
  );
}
