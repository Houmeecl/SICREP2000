import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Users, Package, TrendingUp, AlertCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
  status?: "warning" | "success" | "default";
}

function StatCard({ title, value, change, trend, icon, status = "default" }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={status === "warning" ? "destructive" : "default"} className="text-xs">
              {change}
            </Badge>
            {trend && (
              <TrendingUp className={`w-3 h-3 ${trend === "up" ? "text-primary" : "text-destructive rotate-180"}`} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardStats() {
  //todo: remove mock functionality
  const stats = [
    {
      title: "Certificaciones Activas",
      value: "127",
      change: "+12 este mes",
      trend: "up" as const,
      icon: <FileCheck className="w-4 h-4" />,
      status: "success" as const,
    },
    {
      title: "Proveedores Registrados",
      value: "45",
      change: "+3 nuevos",
      trend: "up" as const,
      icon: <Users className="w-4 h-4" />,
    },
    {
      title: "Envases Certificados",
      value: "8,432",
      change: "+245 hoy",
      trend: "up" as const,
      icon: <Package className="w-4 h-4" />,
    },
    {
      title: "Alertas de Capacidad",
      value: "3",
      change: "Límite 300kg/año",
      icon: <AlertCircle className="w-4 h-4" />,
      status: "warning" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
