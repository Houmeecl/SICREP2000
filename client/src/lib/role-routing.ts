// Mapeo de roles a sus dashboards específicos
export const ROLE_DASHBOARD_MAP: Record<string, string> = {
  admin: "/dashboard/admin",
  gerente_general: "/dashboard/gerente-general",
  manager_operaciones: "/dashboard/manager-operaciones",
  cps: "/dashboard/cps",
  evaluador: "/dashboard/evaluador",
  auditor: "/dashboard/auditor",
  comite: "/dashboard/comite",
  proveedor: "/dashboard/proveedor",
  cliente_mineria: "/dashboard/cliente-mineria",
  viewer: "/dashboard/viewer",
  analista: "/dashboard/analista",
  coordinador: "/dashboard/coordinador",
  tecnico: "/dashboard/tecnico",
  inspector: "/dashboard/inspector",
  supervisor: "/dashboard/supervisor",
};

export function getDashboardForRole(role: string): string {
  return ROLE_DASHBOARD_MAP[role] || "/dashboard/viewer";
}

export function getRoleFromPath(path: string): string | null {
  const entry = Object.entries(ROLE_DASHBOARD_MAP).find(([_, dashPath]) => dashPath === path);
  return entry ? entry[0] : null;
}
