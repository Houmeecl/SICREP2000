import ProviderCapacity from "@/components/ProviderCapacity";

export default function Providers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Proveedores</h1>
        <p className="text-muted-foreground">
          Gestión de capacidad y cumplimiento de proveedores certificados
        </p>
      </div>
      
      <ProviderCapacity />
    </div>
  );
}
