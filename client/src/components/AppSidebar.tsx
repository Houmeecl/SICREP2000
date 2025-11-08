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
  type LucideIcon
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getUserPanels, AVAILABLE_PANELS } from "@shared/panel-permissions";

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

  const mainPanels = availableMenuItems.filter(item => !item.isAdmin);
  const adminPanels = availableMenuItems.filter(item => item.isAdmin);

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
        {mainPanels.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainPanels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={item.isActive}
                        data-testid={`sidebar-${item.id}`}
                      >
                        <Link href={item.path}>
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {adminPanels.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminPanels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={item.isActive}
                        data-testid={`sidebar-${item.id}`}
                      >
                        <Link href={item.path}>
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          <div className="font-mono">v3.2.0</div>
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
