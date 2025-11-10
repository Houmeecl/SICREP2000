import { Link, useLocation } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";

interface RouteMetadata {
  label: string;
  parent?: string;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  '/dashboard': { label: 'Dashboard' },
  '/certifications': { label: 'Certificaciones', parent: '/dashboard' },
  '/certifications/:id': { label: 'Detalle Certificación', parent: '/certifications' },
  '/cps': { label: 'Sistemas CPS', parent: '/dashboard' },
  '/providers': { label: 'Proveedores', parent: '/dashboard' },
  '/providers-directory': { label: 'Directorio Certificados', parent: '/dashboard' },
  '/traceability': { label: 'Trazabilidad', parent: '/dashboard' },
  '/esg': { label: 'ESG', parent: '/dashboard' },
  '/reports': { label: 'Informes', parent: '/dashboard' },
  '/manual': { label: 'Manual', parent: '/dashboard' },
  '/packaging': { label: 'Embalajes', parent: '/certifications' },
  '/shipments': { label: 'Despachos', parent: '/dashboard' },
  '/roles': { label: 'Roles', parent: '/dashboard' },
  '/user-management': { label: 'Usuarios', parent: '/dashboard' },
  '/login-settings': { label: 'Config. Login', parent: '/dashboard' },
  '/validate-qr': { label: 'Validar QR', parent: '/dashboard' },
  '/validate-nfc': { label: 'Validar NFC', parent: '/dashboard' },
};

export function AppBreadcrumbs() {
  const [location] = useLocation();

  const buildBreadcrumbTrail = (path: string): RouteMetadata[] => {
    const trail: RouteMetadata[] = [];
    let currentPath = path;

    while (currentPath) {
      // Try exact match first
      let metadata = ROUTE_METADATA[currentPath];
      
      // If no exact match, try to match dynamic routes (e.g., /certifications/:id)
      if (!metadata) {
        const matchingKey = Object.keys(ROUTE_METADATA).find(key => {
          const pattern = key.replace(/:[^/]+/g, '[^/]+');
          const regex = new RegExp(`^${pattern}$`);
          return regex.test(currentPath);
        });
        
        if (matchingKey) {
          metadata = ROUTE_METADATA[matchingKey];
        }
      }
      
      if (!metadata) break;
      
      trail.unshift({ ...metadata, parent: currentPath });
      currentPath = metadata.parent || '';
    }

    return trail;
  };

  const breadcrumbs = buildBreadcrumbTrail(location);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb data-testid="breadcrumbs">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" data-testid="breadcrumb-home">
              <Home className="w-4 h-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const path = crumb.parent as string;

          return (
            <div key={path} className="flex items-center gap-2">
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage data-testid={`breadcrumb-current`}>
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={path} data-testid={`breadcrumb-${path.replace('/', '')}`}>
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
