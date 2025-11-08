import CPSCatalog from "@/components/CPSCatalog";

export default function CPSPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Catálogo CPS</h1>
        <p className="text-muted-foreground">
          Certificados de Producto Sustentable para envases y embalajes
        </p>
      </div>
      
      <CPSCatalog />
    </div>
  );
}
