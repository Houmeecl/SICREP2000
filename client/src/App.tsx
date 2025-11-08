import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Certifications from "@/pages/Certifications";
import CPSPage from "@/pages/CPSPage";
import Providers from "@/pages/Providers";
import Traceability from "@/pages/Traceability";
import ESG from "@/pages/ESG";
import Roles from "@/pages/Roles";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  const isHome = location === "/";

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/certifications" component={Certifications} />
      <Route path="/cps" component={CPSPage} />
      <Route path="/providers" component={Providers} />
      <Route path="/traceability" component={Traceability} />
      <Route path="/esg" component={ESG} />
      <Route path="/roles" component={Roles} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [location] = useLocation();
  const isHome = location === "/";
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isHome ? (
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
                  <ThemeToggle />
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
    </QueryClientProvider>
  );
}
