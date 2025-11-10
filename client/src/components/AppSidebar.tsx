import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  Award,
  Package,
  Building2,
  BookOpen,
  GitBranch,
  Leaf,
  Box,
  Truck,
  Users,
  UserCog,
  QrCode,
  Wifi,
  ClipboardCheck,
  Settings,
  BarChart,
  type LucideIcon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getUserPanels, AVAILABLE_PANELS, type PanelCategory } from "@shared/panel-permissions";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  Award,
  Package,
  Building2,
  BookOpen,
  GitBranch,
  Leaf,
  Box,
  Truck,
  Users,
  UserCog,
  QrCode,
  Wifi,
  Settings,
  BarChart,
};

const CATEGORY_LABELS: Record<PanelCategory, string> = {
  inicio: '🏠 Inicio & Seguimiento',
  certificacion: '📋 Certificación REP',
  cumplimiento: '✅ Cumplimiento & Validación',
  administracion: '⚙️ Administración',
};

export function AppSidebar() {
  const [location] = useLocation();
  
  const { data: user } = useQuery<any>({
    queryKey: ["/api/user"],
  });

  const authorizedPanelIds = user ? getUserPanels(user) : [];

  const availableMenuItems = AVAILABLE_PANELS
    .filter(panel => authorizedPanelIds.includes(panel.id))
    .map(panel => ({
      ...panel,
      icon: ICON_MAP[panel.icon] || Package,
      isActive: location === panel.path,
    }));

  // Agrupar paneles por categoría
  const panelsByCategory = availableMenuItems.reduce((acc, panel) => {
    if (!acc[panel.category]) {
      acc[panel.category] = [];
    }
    acc[panel.category].push(panel);
    return acc;
  }, {} as Record<PanelCategory, typeof availableMenuItems>);

  // Orden de categorías
  const categoryOrder: PanelCategory[] = ['inicio', 'certificacion', 'cumplimiento', 'administracion'];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">SICREP</h2>
            <p className="text-xs text-muted-foreground">Certificación REP</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <TooltipProvider delayDuration={300}>
          {categoryOrder.map((category) => {
            const panels = panelsByCategory[category];
            if (!panels || panels.length === 0) return null;

            return (
              <SidebarGroup key={category}>
                <SidebarGroupLabel>{CATEGORY_LABELS[category]}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {panels.map((panel) => {
                      const Icon = panel.icon;
                      return (
                        <SidebarMenuItem key={panel.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <SidebarMenuButton 
                                asChild 
                                isActive={panel.isActive}
                                data-testid={`sidebar-${panel.id}`}
                              >
                                <Link href={panel.path}>
                                  <Icon className="w-4 h-4" />
                                  <span>{panel.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs">
                              <p className="text-sm">{panel.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </TooltipProvider>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <div className="font-mono">v3.3.0</div>
          <div>Ley 20.920 - Chile</div>
          {user && (
            <div className="mt-2 pt-2 border-t">
              <div className="font-semibold">{user.fullName}</div>
              <div className="text-xs opacity-70">{user.email}</div>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
