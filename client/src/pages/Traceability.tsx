import NFCTraceability from "@/components/NFCTraceability";

export default function Traceability() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trazabilidad NFC</h1>
        <p className="text-muted-foreground">
          Sistema de seguimiento inmutable con tecnología blockchain
        </p>
      </div>
      
      <NFCTraceability />
    </div>
  );
}
