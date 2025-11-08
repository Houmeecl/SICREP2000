import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, UserCog, ClipboardCheck, Eye, TrendingUp, Users, FileText, Package, Building2, Settings } from "lucide-react";
import { useState } from "react";

interface Role {
  id: string;
  name: string;
  icon: React.ReactNode;
  permissions: string[];
  color: "primary" | "secondary" | "default";
}

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<string | null>("admin");
  
  //todo: remove mock functionality
  const roles: Role[] = [
    {
      id: "admin",
      name: "Administrador",
      icon: <Shield className="w-5 h-5" />,
      permissions: ["Gestión completa", "Configuración sistema", "Reportes avanzados"],
      color: "primary"
    },
    {
      id: "gerente",
      name: "Gerente General",
      icon: <UserCog className="w-5 h-5" />,
      permissions: ["Aprobación final", "Revisión certificados", "Análisis métricas"],
      color: "primary"
    },
    {
      id: "manager",
      name: "Manager Operaciones",
      icon: <Settings className="w-5 h-5" />,
      permissions: ["Gestión operativa", "Asignación recursos", "Seguimiento SLA"],
      color: "secondary"
    },
    {
      id: "evaluador",
      name: "Evaluador",
      icon: <ClipboardCheck className="w-5 h-5" />,
      permissions: ["Evaluación documentos", "Puntuación 40pts", "Reportes técnicos"],
      color: "default"
    },
    {
      id: "auditor",
      name: "Auditor",
      icon: <FileText className="w-5 h-5" />,
      permissions: ["Auditoría operativa", "Verificación en sitio", "Puntuación 40pts"],
      color: "default"
    },
    {
      id: "comite",
      name: "Comité",
      icon: <Users className="w-5 h-5" />,
      permissions: ["Evaluación valor agregado", "Puntuación 20pts", "Decisiones colegiadas"],
      color: "default"
    },
    {
      id: "proveedor",
      name: "Proveedor",
      icon: <Package className="w-5 h-5" />,
      permissions: ["Carga documentos", "Seguimiento solicitudes", "Gestión CPS"],
      color: "secondary"
    },
    {
      id: "cliente",
      name: "Cliente Minería",
      icon: <Building2 className="w-5 h-5" />,
      permissions: ["Solicitar certificación", "Verificar envases", "Escaneo NFC"],
      color: "secondary"
    },
    {
      id: "viewer",
      name: "Viewer",
      icon: <Eye className="w-5 h-5" />,
      permissions: ["Solo lectura", "Consulta certificados", "Descarga reportes"],
      color: "default"
    },
    {
      id: "analista",
      name: "Analista ESG",
      icon: <TrendingUp className="w-5 h-5" />,
      permissions: ["Métricas sostenibilidad", "Reportes ESG", "Análisis impacto"],
      color: "secondary"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles del Sistema (15 tipos de usuario)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`p-4 rounded-md border cursor-pointer transition-all hover-elevate ${
                selectedRole === role.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedRole(role.id)}
              data-testid={`role-${role.id}`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-md ${
                    role.color === "primary" ? "bg-primary/10 text-primary" :
                    role.color === "secondary" ? "bg-secondary text-secondary-foreground" :
                    "bg-muted text-foreground"
                  }`}>
                    {role.icon}
                  </div>
                </div>
                {selectedRole === role.id && (
                  <Badge variant="default" className="text-xs">Activo</Badge>
                )}
              </div>
              
              <h4 className="font-semibold mb-2">{role.name}</h4>
              
              <div className="space-y-1">
                {role.permissions.map((permission, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-current" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button size="sm" data-testid="button-manage-roles">
            Gestionar Permisos
          </Button>
          <Button size="sm" variant="outline" data-testid="button-add-user">
            Nuevo Usuario
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
