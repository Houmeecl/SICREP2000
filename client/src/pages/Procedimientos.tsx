import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  FileText, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Shield,
  Smartphone,
  HelpCircle,
  BookOpen,
  Building2,
  UserCog,
  Workflow,
  QrCode
} from "lucide-react";

export default function Procedimientos() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Manual de Procedimientos SICREP</h1>
        <p className="text-lg text-muted-foreground">
          Guía completa de procedimientos para certificación REP según Ley 20.920
        </p>
      </div>

      <Tabs defaultValue="solicitantes" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="solicitantes" data-testid="tab-solicitantes">
            <Building2 className="w-4 h-4 mr-2" />
            Empresas
          </TabsTrigger>
          <TabsTrigger value="admin" data-testid="tab-admin">
            <UserCog className="w-4 h-4 mr-2" />
            Administradores
          </TabsTrigger>
          <TabsTrigger value="workflow" data-testid="tab-workflow">
            <Workflow className="w-4 h-4 mr-2" />
            Workflow
          </TabsTrigger>
          <TabsTrigger value="roles" data-testid="tab-roles">
            <Users className="w-4 h-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="trazabilidad" data-testid="tab-trazabilidad">
            <QrCode className="w-4 h-4 mr-2" />
            Trazabilidad
          </TabsTrigger>
          <TabsTrigger value="soporte" data-testid="tab-soporte">
            <HelpCircle className="w-4 h-4 mr-2" />
            Soporte
          </TabsTrigger>
        </TabsList>

        {/* TAB: EMPRESAS SOLICITANTES */}
        <TabsContent value="solicitantes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Guía para Empresas Solicitantes
              </CardTitle>
              <CardDescription>
                Cómo solicitar y obtener la certificación REP para sus envases y embalajes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Requisito Legal:</strong> Todas las empresas que introduzcan más de 300 kg/año de envases 
                  al mercado chileno deben cumplir con la Ley 20.920 de Responsabilidad Extendida del Productor (REP).
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Proceso de Solicitud (4 Pasos)
                </h3>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">Datos de la Empresa</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Complete la información corporativa básica de su organización
                        </p>
                        <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
                          <p><strong>Campos requeridos:</strong></p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li>Nombre completo de la empresa</li>
                            <li>RUT empresarial (formato: 12345678-9)</li>
                            <li>Industria/sector (Minería, Energía, Manufactura, Otros)</li>
                            <li>Email corporativo</li>
                            <li>Teléfono de contacto</li>
                            <li>Dirección física completa</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-chart-2 pl-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-2 text-white font-bold text-sm shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">Datos del Contacto Principal</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Persona responsable del proceso de certificación
                        </p>
                        <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
                          <p><strong>Información necesaria:</strong></p>
                          <ul className="list-disc list-inside ml-2 space-y-1">
                            <li>Nombre completo del representante</li>
                            <li>Email directo</li>
                            <li>Teléfono móvil o fijo</li>
                            <li>Cargo dentro de la organización (opcional)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-chart-3 pl-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-3 text-white font-bold text-sm shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">Documentos de Respaldo</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Adjunte la documentación técnica y legal requerida
                        </p>
                        <div className="bg-muted p-3 rounded-md space-y-3 text-sm">
                          <div>
                            <p className="font-semibold mb-1">Documentos Obligatorios:</p>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                              <li>Certificado de Inicio de Actividades (SII)</li>
                              <li>Declaración jurada de cantidad estimada de envases (kg/año)</li>
                              <li>Fichas técnicas de los envases a certificar</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Documentos Opcionales (recomendados):</p>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                              <li>Comprobante de pago de tasa inicial (15 UF)</li>
                              <li>Carta de compromiso ambiental firmada</li>
                              <li>Certificaciones ISO 14001 (si aplica)</li>
                            </ul>
                          </div>
                          <div className="flex items-start gap-2 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-800">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                            <p className="text-xs">
                              <strong>Importante:</strong> Máximo 5 archivos, 5MB por archivo. 
                              Formatos aceptados: PDF, JPG, PNG
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-chart-4 pl-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-chart-4 text-white font-bold text-sm shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-base mb-1">Revisión y Envío</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Verifique toda la información antes de enviar su solicitud
                        </p>
                        <div className="bg-muted p-3 rounded-md space-y-2 text-sm">
                          <p><strong>Checklist final:</strong></p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Todos los datos empresariales son correctos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>RUT validado correctamente</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Documentos obligatorios adjuntados</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Manual REP descargado y revisado</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  ¿Qué sucede después?
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Recibirá un correo de confirmación con su ID de solicitud</li>
                  <li>Un evaluador REP revisará su solicitud (plazo: 2-3 días hábiles)</li>
                  <li>Si es aprobada, recibirá credenciales de acceso al sistema</li>
                  <li>Su empresa será creada automáticamente en la plataforma</li>
                  <li>Se iniciará el proceso de certificación de 10 fases</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: ADMINISTRADORES */}
        <TabsContent value="admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="w-5 h-5 text-primary" />
                Guía para Administradores REP
              </CardTitle>
              <CardDescription>
                Procedimientos de revisión, aprobación y gestión de solicitudes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="acceso">
                  <AccordionTrigger>1. Acceso al Panel de Solicitudes</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm">Navegue a <code className="bg-muted px-2 py-1 rounded">/admin/solicitudes</code> desde el menú lateral.</p>
                    <div className="bg-muted p-3 rounded-md text-sm space-y-2">
                      <p><strong>Roles con acceso:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        <Badge>admin</Badge>
                        <Badge>evaluador</Badge>
                        <Badge>auditor</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="revision">
                  <AccordionTrigger>2. Revisión de Solicitudes Pendientes</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Criterios de Evaluación:</p>
                      <div className="grid gap-3">
                        <div className="border-l-4 border-green-500 pl-3">
                          <p className="font-semibold text-sm">✓ Datos Empresariales</p>
                          <ul className="text-sm text-muted-foreground ml-4 mt-1 space-y-1">
                            <li>• RUT válido y verificado en SII</li>
                            <li>• Nombre legal coincide con registros públicos</li>
                            <li>• Industria declarada es coherente</li>
                            <li>• Dirección corresponde a sede real</li>
                          </ul>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-3">
                          <p className="font-semibold text-sm">✓ Documentación</p>
                          <ul className="text-sm text-muted-foreground ml-4 mt-1 space-y-1">
                            <li>• Certificado de Inicio de Actividades vigente</li>
                            <li>• Declaración jurada firmada digitalmente</li>
                            <li>• Fichas técnicas completas y legibles</li>
                            <li>• Comprobante de pago (si aplicable)</li>
                          </ul>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-3">
                          <p className="font-semibold text-sm">✓ Elegibilidad REP</p>
                          <ul className="text-sm text-muted-foreground ml-4 mt-1 space-y-1">
                            <li>• Introduce &gt; 300 kg/año de envases</li>
                            <li>• Sector aplica a Ley 20.920</li>
                            <li>• No tiene sanciones SMA pendientes</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <strong>Importante:</strong> Toda aprobación debe cumplir con los criterios técnicos y 
                        legales establecidos en el D.S. N°4/2021 del Ministerio del Medio Ambiente.
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="aprobacion">
                  <AccordionTrigger>3. Proceso de Aprobación</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <p className="font-medium">Al aprobar una solicitud, el sistema ejecuta automáticamente:</p>
                      <div className="bg-muted p-4 rounded-md space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</div>
                          <div>
                            <p className="font-semibold">Creación de Proveedor</p>
                            <p className="text-muted-foreground">Se registra la empresa en tabla <code>providers</code></p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
                          <div>
                            <p className="font-semibold">Creación de Usuario</p>
                            <p className="text-muted-foreground">Genera credenciales temporales (email + password aleatorio encriptado con bcrypt)</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">3</div>
                          <div>
                            <p className="font-semibold">Creación de Certificación</p>
                            <p className="text-muted-foreground">Inicia proceso con estado "solicitud_inicial" en fase 1/10</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">4</div>
                          <div>
                            <p className="font-semibold">Registro de Workflow</p>
                            <p className="text-muted-foreground">Documenta inicio de fase en tabla <code>workflowHistory</code></p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">5</div>
                          <div>
                            <p className="font-semibold">Notificación Email</p>
                            <p className="text-muted-foreground">Envía credenciales y enlace de acceso al contacto (actualmente console.log)</p>
                          </div>
                        </div>
                      </div>
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Este proceso es <strong>transaccional</strong>. Si falla algún paso, todos los cambios se 
                          revierten automáticamente para mantener la integridad de datos.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rechazo">
                  <AccordionTrigger>4. Proceso de Rechazo</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm">Cuando una solicitud no cumple los requisitos:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p>Seleccione el motivo de rechazo en el campo "Notas de revisión"</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p>Sea específico sobre qué documentos o datos están incompletos</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p>El sistema enviará email con las razones del rechazo</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p>La empresa puede volver a solicitar corrigiendo los errores</p>
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      <p className="text-sm"><strong>Motivos comunes de rechazo:</strong></p>
                      <ul className="list-disc list-inside ml-2 mt-1 space-y-1 text-sm">
                        <li>RUT inválido o no corresponde al nombre declarado</li>
                        <li>Documentación incompleta o ilegible</li>
                        <li>Empresa no cumple umbral de 300 kg/año</li>
                        <li>Sector no aplicable a Ley 20.920</li>
                        <li>Infracciones ambientales pendientes</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="filtros">
                  <AccordionTrigger>5. Uso de Filtros y Búsqueda</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm">El panel permite filtrar solicitudes por estado:</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="border rounded-lg p-3">
                        <Badge variant="secondary" className="mb-2">pending</Badge>
                        <p className="text-xs text-muted-foreground">Solicitudes nuevas pendientes de revisión</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <Badge variant="default" className="mb-2">approved</Badge>
                        <p className="text-xs text-muted-foreground">Solicitudes aprobadas y procesadas</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <Badge variant="destructive" className="mb-2">rejected</Badge>
                        <p className="text-xs text-muted-foreground">Solicitudes rechazadas con motivo</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: WORKFLOW DE CERTIFICACIÓN */}
        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-primary" />
                Workflow de Certificación (10 Fases)
              </CardTitle>
              <CardDescription>
                Proceso completo desde solicitud inicial hasta monitoreo continuo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  <strong>Duración estimada total:</strong> 30-45 días hábiles (según complejidad y volumen de envases)
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                {[
                  {
                    fase: 1,
                    nombre: "Solicitud Inicial",
                    descripcion: "Recepción y validación de documentación presentada por la empresa",
                    duracion: "2-3 días",
                    responsable: "Evaluador REP",
                    entregables: ["Formulario completo", "Certificado SII", "Declaración jurada", "Fichas técnicas"],
                    color: "border-blue-500"
                  },
                  {
                    fase: 2,
                    nombre: "Revisión de Documentos",
                    descripcion: "Análisis técnico de la documentación y verificación de requisitos legales",
                    duracion: "3-5 días",
                    responsable: "Auditor",
                    entregables: ["Informe de conformidad documental", "Solicitud de aclaraciones (si aplica)"],
                    color: "border-green-500"
                  },
                  {
                    fase: 3,
                    nombre: "Auditoría In-Situ",
                    descripcion: "Visita técnica a instalaciones para verificar procesos y almacenamiento",
                    duracion: "5-7 días",
                    responsable: "Auditor de Campo",
                    entregables: ["Acta de visita", "Registro fotográfico", "Checklist de cumplimiento"],
                    color: "border-purple-500"
                  },
                  {
                    fase: 4,
                    nombre: "Análisis de Laboratorio",
                    descripcion: "Pruebas físico-químicas de materiales y pesaje certificado",
                    duracion: "7-10 días",
                    responsable: "Laboratorio Acreditado",
                    entregables: ["Informes de ensayo", "Certificados de peso", "Análisis de composición"],
                    color: "border-orange-500"
                  },
                  {
                    fase: 5,
                    nombre: "Evaluación de Conformidad",
                    descripcion: "Revisión final de cumplimiento con estándares REP y normativa vigente",
                    duracion: "3-4 días",
                    responsable: "Evaluador REP",
                    entregables: ["Dictamen de conformidad", "Observaciones técnicas"],
                    color: "border-pink-500"
                  },
                  {
                    fase: 6,
                    nombre: "Evaluación de Valor Agregado",
                    descripcion: "Cálculo de puntos ESG y análisis de impacto ambiental positivo",
                    duracion: "2-3 días",
                    responsable: "Evaluador ESG",
                    entregables: ["Scorecard ESG", "Informe de sostenibilidad"],
                    color: "border-teal-500"
                  },
                  {
                    fase: 7,
                    nombre: "Revisión Final",
                    descripcion: "Consolidación de todos los informes y preparación de certificado",
                    duracion: "2 días",
                    responsable: "Auditor Principal",
                    entregables: ["Expediente completo", "Borrador de certificado"],
                    color: "border-indigo-500"
                  },
                  {
                    fase: 8,
                    nombre: "Emisión de Certificado",
                    descripcion: "Generación oficial del certificado REP con firma digital",
                    duracion: "1 día",
                    responsable: "Administrador",
                    entregables: ["Certificado PDF firmado", "Código de certificación único (CPS)"],
                    color: "border-yellow-500"
                  },
                  {
                    fase: 9,
                    nombre: "Activación NFC",
                    descripcion: "Programación de tags NFC y publicación en blockchain",
                    duracion: "1-2 días",
                    responsable: "Técnico NFC",
                    entregables: ["Tags NFC programados", "Hash blockchain", "QR codes"],
                    color: "border-red-500"
                  },
                  {
                    fase: 10,
                    nombre: "Monitoreo Continuo",
                    descripcion: "Seguimiento permanente de trazabilidad y validaciones en terreno",
                    duracion: "Continuo (12 meses)",
                    responsable: "Sistema Automatizado + Inspector SMA",
                    entregables: ["Reportes mensuales", "Dashboard en vivo", "Alertas de anomalías"],
                    color: "border-gray-500"
                  }
                ].map((fase) => (
                  <div key={fase.fase} className={`border-l-4 ${fase.color} pl-4 pb-4`}>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                        {fase.fase}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-base">{fase.nombre}</h4>
                            <p className="text-sm text-muted-foreground">{fase.descripcion}</p>
                          </div>
                          <Badge variant="outline" className="shrink-0 ml-2">
                            <Clock className="w-3 h-3 mr-1" />
                            {fase.duracion}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                              <UserCog className="w-3 h-3" />
                              Responsable:
                            </p>
                            <p className="text-sm">{fase.responsable}</p>
                          </div>
                          <div className="bg-muted p-3 rounded-md">
                            <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              Entregables:
                            </p>
                            <ul className="text-xs space-y-0.5">
                              {fase.entregables.map((item, idx) => (
                                <li key={idx}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold mb-2">SLA (Service Level Agreement)</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Tiempo Mínimo</p>
                    <p className="text-2xl font-bold text-primary">30 días</p>
                  </div>
                  <div>
                    <p className="font-medium">Tiempo Promedio</p>
                    <p className="text-2xl font-bold text-chart-2">38 días</p>
                  </div>
                  <div>
                    <p className="font-medium">Tiempo Máximo</p>
                    <p className="text-2xl font-bold text-chart-3">45 días</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: ROLES Y PERMISOS */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Matriz de Roles y Permisos
              </CardTitle>
              <CardDescription>
                15 roles especializados con accesos diferenciados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {[
                    { rol: "admin", descripcion: "Acceso total al sistema, gestión de usuarios y configuraciones", nivel: "Full Access", color: "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100" },
                    { rol: "evaluador", descripcion: "Revisión y aprobación de solicitudes, evaluación de conformidad", nivel: "Alto", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100" },
                    { rol: "auditor", descripcion: "Auditorías in-situ, verificación documental, informes técnicos", nivel: "Alto", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-100" },
                    { rol: "laboratorio", descripcion: "Carga de resultados de ensayos, certificados de análisis", nivel: "Medio", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100" },
                    { rol: "proveedor", descripcion: "Gestión de sus certificaciones, carga de documentos, consultas", nivel: "Medio", color: "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100" },
                    { rol: "cliente_industrial", descripcion: "Validación NFC/QR de productos, consulta de certificados", nivel: "Bajo", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100" },
                    { rol: "gestor_rep", descripcion: "Consolidación de reportes RETC, gestión de cumplimiento", nivel: "Medio", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-900 dark:text-pink-100" },
                    { rol: "consultor", descripcion: "Asesoría a proveedores, revisión de documentación previa", nivel: "Bajo", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-900 dark:text-teal-100" },
                    { rol: "inspector_sma", descripcion: "Fiscalización y verificación de cumplimiento normativo", nivel: "Alto", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100" },
                    { rol: "operador_logistico", descripcion: "Registro de envíos, trazabilidad de transporte", nivel: "Bajo", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-100" },
                    { rol: "tecnico_nfc", descripcion: "Programación de tags NFC, mantenimiento de dispositivos", nivel: "Medio", color: "bg-lime-100 dark:bg-lime-900/30 text-lime-900 dark:text-lime-100" },
                    { rol: "contador", descripcion: "Gestión financiera, facturación, pagos de certificación", nivel: "Medio", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100" },
                    { rol: "abogado", descripcion: "Revisión legal de contratos y cumplimiento normativo", nivel: "Medio", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-900 dark:text-rose-100" },
                    { rol: "marketing", descripcion: "Acceso a métricas ESG para comunicación externa", nivel: "Bajo", color: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-900 dark:text-fuchsia-100" },
                    { rol: "data_analyst", descripcion: "Análisis de datos, generación de reportes estadísticos", nivel: "Medio", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-900 dark:text-violet-100" },
                  ].map((item) => (
                    <div key={item.rol} className="flex items-center gap-4 p-4 border rounded-lg hover-elevate">
                      <div className={`px-3 py-1 rounded-full text-sm font-mono font-semibold ${item.color}`}>
                        {item.rol}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{item.descripcion}</p>
                      </div>
                      <Badge variant="outline">{item.nivel}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: TRAZABILIDAD NFC/QR */}
        <TabsContent value="trazabilidad" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                Sistema de Trazabilidad NFC y QR
              </CardTitle>
              <CardDescription>
                Validación instantánea y registro blockchain inmutable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tecnología:</strong> Tags NFC tipo NTAG215 + QR codes dinámicos + Blockchain Polygon Mumbai
                </AlertDescription>
              </Alert>

              <Accordion type="single" collapsible>
                <AccordionItem value="lectura">
                  <AccordionTrigger>Lectura y Validación NFC</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      <li>Cliente acerca smartphone con NFC habilitado al tag del envase</li>
                      <li>Sistema lee ID único del tag y lo envía al backend</li>
                      <li>Backend consulta tabla <code>nfcValidations</code> y verifica autenticidad</li>
                      <li>Si es válido, muestra certificado digital con datos del proveedor</li>
                      <li>Registro de validación queda almacenado con timestamp y geolocalización</li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="font-semibold text-sm mb-2">Datos Desplegados al Validar:</p>
                      <ul className="text-sm space-y-1">
                        <li>✓ Nombre del proveedor certificado</li>
                        <li>✓ Tipo de envase y peso certificado</li>
                        <li>✓ Fecha de certificación y vigencia</li>
                        <li>✓ Score ESG y cumplimiento REP</li>
                        <li>✓ Hash de blockchain para verificación</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="qr">
                  <AccordionTrigger>Generación de Códigos QR</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm">Cada certificación genera automáticamente códigos QR únicos:</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="border rounded-lg p-3">
                        <p className="font-semibold mb-2">QR de Certificado</p>
                        <p className="text-muted-foreground">Enlaza a página pública con todos los datos de la certificación</p>
                      </div>
                      <div className="border rounded-lg p-3">
                        <p className="font-semibold mb-2">QR de Validación</p>
                        <p className="text-muted-foreground">Permite escaneo rápido para verificar autenticidad sin NFC</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="blockchain">
                  <AccordionTrigger>Registro en Blockchain</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p className="text-sm">Cada certificación se registra en Polygon Mumbai testnet:</p>
                    <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                      <p><strong>Datos hasheados (SHA-256):</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>ID de certificación + RUT proveedor</li>
                        <li>Timestamp de emisión</li>
                        <li>Peso y tipo de envase</li>
                        <li>Firma digital del auditor</li>
                      </ul>
                      <div className="mt-3 p-2 bg-background rounded border">
                        <p className="text-xs font-mono break-all">
                          Ejemplo: 0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: SOPORTE Y FAQs */}
        <TabsContent value="soporte" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Soporte y Preguntas Frecuentes
              </CardTitle>
              <CardDescription>
                Resolución de problemas comunes y contacto de ayuda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="faq1">
                  <AccordionTrigger>¿Cuánto tiempo toma obtener la certificación?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">El proceso completo toma entre <strong>30 y 45 días hábiles</strong> dependiendo de:</p>
                    <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                      <li>Complejidad de los envases a certificar</li>
                      <li>Volumen de producción (kg/año)</li>
                      <li>Calidad de la documentación presentada</li>
                      <li>Disponibilidad para auditoría in-situ</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq2">
                  <AccordionTrigger>¿Qué pasa si mi solicitud es rechazada?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">Puede volver a aplicar inmediatamente después de corregir los errores indicados. El sistema le enviará un email detallando exactamente qué documentos o información debe actualizar. No hay límite de intentos ni penalización.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq3">
                  <AccordionTrigger>¿Cuánto cuesta la certificación SICREP?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-3">
                          <p className="font-semibold text-primary text-2xl">15 UF</p>
                          <p className="text-muted-foreground">Certificación inicial (pago único)</p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <p className="font-semibold text-chart-2 text-2xl">5 UF/mes</p>
                          <p className="text-muted-foreground">Acceso a plataforma y trazabilidad</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">Incluye: auditoría, análisis de laboratorio, tags NFC, QR codes, registro blockchain y soporte técnico.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq4">
                  <AccordionTrigger>¿Qué navegadores son compatibles?</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm space-y-2">
                      <p><strong>Totalmente compatibles:</strong></p>
                      <ul className="list-disc list-inside ml-2">
                        <li>Google Chrome 90+</li>
                        <li>Mozilla Firefox 88+</li>
                        <li>Microsoft Edge 90+</li>
                        <li>Safari 14+ (macOS/iOS)</li>
                      </ul>
                      <p className="text-muted-foreground mt-2">Para funcionalidad NFC: Android con Chrome o Samsung Internet</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq5">
                  <AccordionTrigger>Error al cargar documentos</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Soluciones comunes:</strong></p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        <li>Verifique que el archivo sea PDF, JPG o PNG</li>
                        <li>Asegúrese de que pese menos de 5MB</li>
                        <li>No cargue más de 5 archivos simultáneamente</li>
                        <li>Pruebe con otro navegador o dispositivo</li>
                        <li>Limpie caché y cookies del navegador</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="contacto">
                  <AccordionTrigger>Contacto de Soporte Técnico</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-3">
                          <p className="font-semibold mb-1">Email</p>
                          <p className="text-muted-foreground">soporte@sicrep.cl</p>
                          <p className="text-xs text-muted-foreground mt-1">Respuesta en 24 hrs hábiles</p>
                        </div>
                        <div className="border rounded-lg p-3">
                          <p className="font-semibold mb-1">Teléfono</p>
                          <p className="text-muted-foreground">+56 2 2XXX XXXX</p>
                          <p className="text-xs text-muted-foreground mt-1">Lun-Vie 9:00-18:00</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-semibold mb-1">Soporte Prioritario</p>
                        <p className="text-muted-foreground">Para roles admin, evaluador y auditor: soporte@sicrep.cl con [URGENTE] en asunto</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
