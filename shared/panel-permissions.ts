/**
 * Sistema de paneles modulares personalizados por usuario
 * Los usuarios pueden tener paneles específicos asignados o usar los paneles por defecto de su rol
 */

export type PanelId =
  | 'dashboard'
  | 'certifications'
  | 'cps'
  | 'providers'
  | 'providers-directory'
  | 'traceability'
  | 'esg'
  | 'reports'
  | 'manual'
  | 'procedimientos'
  | 'roles'
  | 'user-management'
  | 'login-settings'
  | 'solicitudes'
  | 'packaging'
  | 'shipments'
  | 'validate-qr'
  | 'validate-nfc';

export type PanelCategory = 'inicio' | 'certificacion' | 'cumplimiento' | 'administracion';

export interface PanelConfig {
  id: PanelId;
  name: string;
  path: string;
  icon: string;
  description: string;
  category: PanelCategory;
  isAdmin?: boolean;
}

/**
 * Todos los paneles disponibles en el sistema
 * Organizados por categorías para mejor navegación
 */
export const AVAILABLE_PANELS: PanelConfig[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'LayoutDashboard',
    description: 'Panel principal con métricas y estadísticas',
    category: 'inicio',
  },
  {
    id: 'reports',
    name: 'Informes',
    path: '/reports',
    icon: 'BarChart',
    description: 'Informes gráficos y reportes REP',
    category: 'inicio',
  },
  {
    id: 'certifications',
    name: 'Certificaciones',
    path: '/certifications',
    icon: 'Award',
    description: 'Gestión de certificaciones REP',
    category: 'certificacion',
  },
  {
    id: 'cps',
    name: 'Sistemas CPS',
    path: '/cps',
    icon: 'Package',
    description: 'Certificación de Productos y Servicios',
    category: 'certificacion',
  },
  {
    id: 'packaging',
    name: 'Embalajes',
    path: '/packaging',
    icon: 'Box',
    description: 'Certificación de embalajes',
    category: 'certificacion',
  },
  {
    id: 'shipments',
    name: 'Despachos',
    path: '/shipments',
    icon: 'Truck',
    description: 'Gestión de despachos certificados',
    category: 'certificacion',
  },
  {
    id: 'traceability',
    name: 'Trazabilidad',
    path: '/traceability',
    icon: 'GitBranch',
    description: 'Sistema de trazabilidad blockchain',
    category: 'cumplimiento',
  },
  {
    id: 'esg',
    name: 'ESG',
    path: '/esg',
    icon: 'Leaf',
    description: 'Métricas ambientales y Copper Mark',
    category: 'cumplimiento',
  },
  {
    id: 'validate-qr',
    name: 'Validar QR',
    path: '/validate-qr',
    icon: 'QrCode',
    description: 'Validación de códigos QR',
    category: 'cumplimiento',
  },
  {
    id: 'validate-nfc',
    name: 'Validar NFC',
    path: '/validate-nfc',
    icon: 'Wifi',
    description: 'Validación de tags NFC',
    category: 'cumplimiento',
  },
  {
    id: 'manual',
    name: 'Manual',
    path: '/manual',
    icon: 'BookOpen',
    description: 'Manual y borradores para empresas',
    category: 'cumplimiento',
  },
  {
    id: 'procedimientos',
    name: 'Procedimientos',
    path: '/procedimientos',
    icon: 'ClipboardCheck',
    description: 'Guía completa de procedimientos REP',
    category: 'cumplimiento',
  },
  {
    id: 'providers',
    name: 'Proveedores',
    path: '/providers',
    icon: 'Building2',
    description: 'Gestión de proveedores',
    category: 'cumplimiento',
  },
  {
    id: 'providers-directory',
    name: 'Directorio Certificados',
    path: '/providers-directory',
    icon: 'BookOpen',
    description: 'Directorio de proveedores certificados',
    category: 'cumplimiento',
  },
  {
    id: 'roles',
    name: 'Roles',
    path: '/roles',
    icon: 'Users',
    description: 'Gestión de roles del sistema',
    category: 'administracion',
    isAdmin: true,
  },
  {
    id: 'user-management',
    name: 'Usuarios',
    path: '/user-management',
    icon: 'UserCog',
    description: 'Administración de usuarios',
    category: 'administracion',
    isAdmin: true,
  },
  {
    id: 'login-settings',
    name: 'Config. Login',
    path: '/login-settings',
    icon: 'Settings',
    description: 'Personalización de pantalla de login',
    category: 'administracion',
    isAdmin: true,
  },
  {
    id: 'solicitudes',
    name: 'Solicitudes',
    path: '/admin/solicitudes',
    icon: 'ClipboardCheck',
    description: 'Gestión de solicitudes de certificación',
    category: 'administracion',
    isAdmin: true,
  },
];

/**
 * Paneles por defecto según el rol del usuario
 */
export const DEFAULT_PANELS_BY_ROLE: Record<string, PanelId[]> = {
  admin: [
    'dashboard',
    'certifications',
    'cps',
    'providers',
    'providers-directory',
    'traceability',
    'esg',
    'reports',
    'manual',
    'procedimientos',
    'packaging',
    'shipments',
    'roles',
    'user-management',
    'login-settings',
    'solicitudes',
    'validate-qr',
    'validate-nfc',
  ],
  gerente_general: [
    'dashboard',
    'certifications',
    'providers',
    'providers-directory',
    'esg',
    'reports',
    'manual',
    'procedimientos',
    'traceability',
  ],
  manager_operaciones: [
    'dashboard',
    'certifications',
    'cps',
    'providers',
    'packaging',
    'shipments',
    'reports',
    'procedimientos',
    'traceability',
  ],
  cps: ['dashboard', 'cps', 'certifications', 'packaging', 'procedimientos'],
  evaluador: ['dashboard', 'certifications', 'cps', 'procedimientos'],
  auditor: ['dashboard', 'certifications', 'providers', 'esg', 'reports', 'procedimientos', 'traceability'],
  comite: ['dashboard', 'certifications', 'providers-directory', 'esg', 'reports', 'procedimientos'],
  proveedor: ['dashboard', 'shipments', 'certifications', 'procedimientos', 'validate-qr'],
  cliente_mineria: ['dashboard', 'shipments', 'esg', 'providers-directory', 'procedimientos'], // Solo ven sus despachos
  viewer: ['dashboard', 'providers-directory', 'procedimientos', 'validate-qr', 'validate-nfc'],
  analista: ['dashboard', 'esg', 'certifications', 'reports', 'procedimientos', 'traceability'],
  coordinador: ['dashboard', 'certifications', 'providers', 'shipments', 'reports', 'procedimientos'],
  tecnico: ['dashboard', 'certifications', 'procedimientos', 'validate-qr', 'validate-nfc'],
  inspector: ['dashboard', 'certifications', 'traceability', 'procedimientos', 'validate-nfc'],
  supervisor: ['dashboard', 'certifications', 'providers', 'shipments', 'reports', 'procedimientos', 'traceability'],
};

/**
 * Obtiene los paneles que un usuario puede ver
 * Si el usuario tiene paneles personalizados, usa esos; si no, usa los paneles por defecto de su rol
 */
export function getUserPanels(user: { role: string; customPanels?: string[] | null }): PanelId[] {
  return user.customPanels && user.customPanels.length > 0
    ? user.customPanels as PanelId[]
    : DEFAULT_PANELS_BY_ROLE[user.role] || ['dashboard'];
}

/**
 * Verifica si un usuario tiene acceso a un panel específico
 */
export function hasAccessToPanel(
  panelId: PanelId,
  user: { role: string; customPanels?: string[] | null }
): boolean {
  const userPanels = getUserPanels(user);
  return userPanels.includes(panelId);
}
