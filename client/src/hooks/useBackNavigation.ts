import { useLocation } from "wouter";
import { ROUTE_METADATA } from "@/components/AppBreadcrumbs";

export function useBackNavigation() {
  const [, setLocation] = useLocation();

  const goBack = (fallback: string = '/dashboard') => {
    const currentPath = window.location.pathname;
    const metadata = ROUTE_METADATA[currentPath];
    
    if (metadata?.parent) {
      setLocation(metadata.parent);
    } else {
      setLocation(fallback);
    }
  };

  return { goBack };
}
