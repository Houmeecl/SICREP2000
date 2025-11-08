import ESGMetrics from "@/components/ESGMetrics";

export default function ESG() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Métricas ESG</h1>
        <p className="text-muted-foreground">
          Indicadores de sostenibilidad y cumplimiento ambiental para minería
        </p>
      </div>
      
      <ESGMetrics />
    </div>
  );
}
