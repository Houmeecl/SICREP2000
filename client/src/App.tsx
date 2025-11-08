import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./lib/auth";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Certifications from "@/pages/Certifications";
import CPSPage from "@/pages/CPSPage";
import Providers from "@/pages/Providers";
import Traceability from "@/pages/Traceability";
import ESG from "@/pages/ESG";
import Roles from "@/pages/Roles";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
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
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [location] = useLocation();
  const isPublicRoute = location === "/" || location === "/login";
  
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
              <Toaster />
            </div>
          ) : (
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <header className="flex items-center justify-between p-4 border-b bg-background">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
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
