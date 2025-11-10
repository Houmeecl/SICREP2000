import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppBreadcrumbs } from "@/components/AppBreadcrumbs";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Certifications from "@/pages/Certifications";
import CertificationDetail from "@/pages/CertificationDetail";
import CPSPage from "@/pages/CPSPage";
import Providers from "@/pages/Providers";
import ProvidersDirectory from "@/pages/ProvidersDirectory";
import Traceability from "@/pages/Traceability";
import TraceabilityLanding from "@/pages/TraceabilityLanding";
import ESG from "@/pages/ESG";
import Roles from "@/pages/Roles";
import UserManagement from "@/pages/UserManagement";
import PackagingCertification from "@/pages/PackagingCertification";
import ShipmentsList from "@/pages/ShipmentsList";
import ValidateQR from "@/pages/ValidateQR";
import ValidateNFC from "@/pages/ValidateNFC";
import LoginSettings from "@/pages/LoginSettings";
import Reports from "@/pages/Reports";
import Manual from "@/pages/Manual";
import Procedimientos from "@/pages/Procedimientos";
import SolicitarCertificacion from "@/pages/SolicitarCertificacion";
import AutoEvaluacion from "@/pages/AutoEvaluacion";
import Solicitudes from "@/pages/admin/Solicitudes";
import NotFound from "@/pages/not-found";

// Role-specific dashboards
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import GerenteGeneralDashboard from "@/pages/dashboards/GerenteGeneralDashboard";
import ManagerOperacionesDashboard from "@/pages/dashboards/ManagerOperacionesDashboard";
import CPSDashboard from "@/pages/dashboards/CPSDashboard";
import EvaluadorDashboard from "@/pages/dashboards/EvaluadorDashboard";
import AuditorDashboard from "@/pages/dashboards/AuditorDashboard";
import ComiteDashboard from "@/pages/dashboards/ComiteDashboard";
import ProveedorDashboard from "@/pages/dashboards/ProveedorDashboard";
import ClienteMineriaDashboard from "@/pages/dashboards/ClienteMineriaDashboard";
import ViewerDashboard from "@/pages/dashboards/ViewerDashboard";
import AnalistaDashboard from "@/pages/dashboards/AnalistaDashboard";
import CoordinadorDashboard from "@/pages/dashboards/CoordinadorDashboard";
import TecnicoDashboard from "@/pages/dashboards/TecnicoDashboard";
import InspectorDashboard from "@/pages/dashboards/InspectorDashboard";
import SupervisorDashboard from "@/pages/dashboards/SupervisorDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/verify" component={TraceabilityLanding} />
      <Route path="/solicitar-certificacion" component={SolicitarCertificacion} />
      <Route path="/auto-evaluacion" component={AutoEvaluacion} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/certifications/:id">
        <ProtectedRoute>
          <CertificationDetail />
        </ProtectedRoute>
      </Route>
      <Route path="/certifications">
        <ProtectedRoute>
          <Certifications />
        </ProtectedRoute>
      </Route>
      <Route path="/cps">
        <ProtectedRoute>
          <CPSPage />
        </ProtectedRoute>
      </Route>
      <Route path="/providers">
        <ProtectedRoute>
          <Providers />
        </ProtectedRoute>
      </Route>
      <Route path="/providers-directory">
        <ProtectedRoute>
          <ProvidersDirectory />
        </ProtectedRoute>
      </Route>
      <Route path="/traceability">
        <ProtectedRoute>
          <Traceability />
        </ProtectedRoute>
      </Route>
      <Route path="/esg">
        <ProtectedRoute>
          <ESG />
        </ProtectedRoute>
      </Route>
      <Route path="/roles">
        <ProtectedRoute allowedRoles={['admin']}>
          <Roles />
        </ProtectedRoute>
      </Route>
      <Route path="/user-management">
        <ProtectedRoute allowedRoles={['admin']}>
          <UserManagement />
        </ProtectedRoute>
      </Route>
      <Route path="/login-settings">
        <ProtectedRoute allowedRoles={['admin']}>
          <LoginSettings />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/solicitudes">
        <ProtectedRoute allowedRoles={['admin']}>
          <Solicitudes />
        </ProtectedRoute>
      </Route>
      <Route path="/packaging">
        <ProtectedRoute>
          <PackagingCertification />
        </ProtectedRoute>
      </Route>
      <Route path="/shipments">
        <ProtectedRoute>
          <ShipmentsList />
        </ProtectedRoute>
      </Route>
      <Route path="/reports">
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      </Route>
      <Route path="/manual">
        <ProtectedRoute>
          <Manual />
        </ProtectedRoute>
      </Route>
      <Route path="/procedimientos" component={Procedimientos} />
      
      {/* Role-specific Dashboards */}
      <Route path="/dashboard/admin">
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/gerente-general">
        <ProtectedRoute allowedRoles={['gerente_general']}>
          <GerenteGeneralDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/manager-operaciones">
        <ProtectedRoute allowedRoles={['manager_operaciones']}>
          <ManagerOperacionesDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/cps">
        <ProtectedRoute allowedRoles={['cps']}>
          <CPSDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/evaluador">
        <ProtectedRoute allowedRoles={['evaluador']}>
          <EvaluadorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/auditor">
        <ProtectedRoute allowedRoles={['auditor']}>
          <AuditorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/comite">
        <ProtectedRoute allowedRoles={['comite']}>
          <ComiteDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/proveedor">
        <ProtectedRoute allowedRoles={['proveedor']}>
          <ProveedorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/cliente-mineria">
        <ProtectedRoute allowedRoles={['cliente_mineria']}>
          <ClienteMineriaDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/viewer">
        <ProtectedRoute allowedRoles={['viewer']}>
          <ViewerDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/analista">
        <ProtectedRoute allowedRoles={['analista']}>
          <AnalistaDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/coordinador">
        <ProtectedRoute allowedRoles={['coordinador']}>
          <CoordinadorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/tecnico">
        <ProtectedRoute allowedRoles={['tecnico']}>
          <TecnicoDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/inspector">
        <ProtectedRoute allowedRoles={['inspector']}>
          <InspectorDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/supervisor">
        <ProtectedRoute allowedRoles={['supervisor']}>
          <SupervisorDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/validate/:qrCode" component={ValidateQR} />
      <Route path="/validate-nfc" component={ValidateNFC} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [location] = useLocation();
  const isPublicRoute = location === "/" || location === "/login" || location === "/verify" || location === "/solicitar-certificacion" || location.startsWith("/validate/") || location === "/validate-nfc";
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {isPublicRoute ? (
            <div className="min-h-screen">
              <Router />
            </div>
          ) : (
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <header className="flex items-center justify-between p-4 border-b bg-background">
                    <div className="flex items-center gap-4">
                      <SidebarTrigger data-testid="button-sidebar-toggle" />
                      <AppBreadcrumbs />
                    </div>
                    <div className="flex items-center gap-2">
                      <ThemeToggle />
                      <UserMenu />
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto p-6">
                    <Router />
                  </main>
                </div>
              </div>
            </SidebarProvider>
          )}
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
