import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building2, Plus, Edit, Shield, Layout } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AVAILABLE_PANELS, DEFAULT_PANELS_BY_ROLE } from "@shared/panel-permissions";
import { Checkbox } from "@/components/ui/checkbox";

const userRoles = [
  { value: "admin", label: "Administrador" },
  { value: "gerente_general", label: "Gerente General" },
  { value: "manager_operaciones", label: "Manager de Operaciones" },
  { value: "cps", label: "CPS (Coordinador)" },
  { value: "evaluador", label: "Evaluador" },
  { value: "auditor", label: "Auditor" },
  { value: "comite", label: "Comité" },
  { value: "proveedor", label: "Proveedor" },
  { value: "cliente_mineria", label: "Cliente Minería" },
  { value: "viewer", label: "Viewer" },
  { value: "analista", label: "Analista" },
  { value: "coordinador", label: "Coordinador" },
  { value: "tecnico", label: "Técnico" },
  { value: "inspector", label: "Inspector" },
  { value: "supervisor", label: "Supervisor" },
];

export default function UserManagement() {
  const { toast } = useToast();
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  
  // User form state
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    fullName: "",
    rut: "",
    password: "",
    role: "viewer",
    companyId: "",
    customPanels: [] as string[],
    useCustomPanels: false,
  });

  // Company form state
  const [companyForm, setCompanyForm] = useState({
    name: "",
    rut: "",
    email: "",
    phone: "",
    address: "",
    industry: "",
  });

  // Fetch users
  const { data: users = [], isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  // Fetch companies
  const { data: companies = [], isLoading: companiesLoading } = useQuery<any[]>({
    queryKey: ["/api/companies"],
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (data: typeof userForm) => {
      // Solo enviar customPanels si useCustomPanels está activo
      const payload = {
        ...data,
        customPanels: data.useCustomPanels && data.customPanels.length > 0 ? data.customPanels : null,
      };
      delete (payload as any).useCustomPanels;
      return await apiRequest("POST", "/api/users", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente",
      });
      setIsUserDialogOpen(false);
      setUserForm({
        username: "",
        email: "",
        fullName: "",
        rut: "",
        password: "",
        role: "viewer",
        companyId: "",
        customPanels: [],
        useCustomPanels: false,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo crear el usuario",
        variant: "destructive",
      });
    },
  });

  // Create company mutation
  const createCompanyMutation = useMutation({
    mutationFn: async (data: typeof companyForm) => {
      return await apiRequest("POST", "/api/companies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
      toast({
        title: "Empresa creada",
        description: "La empresa ha sido creada exitosamente",
      });
      setIsCompanyDialogOpen(false);
      setCompanyForm({
        name: "",
        rut: "",
        email: "",
        phone: "",
        address: "",
        industry: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "No se pudo crear la empresa",
        variant: "destructive",
      });
    },
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate(userForm);
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    createCompanyMutation.mutate(companyForm);
  };

  const getRoleBadgeColor = (role: string) => {
    if (role === "admin") return "bg-red-500 text-white";
    if (role.includes("gerente")) return "bg-purple-500 text-white";
    if (role.includes("manager")) return "bg-blue-500 text-white";
    if (role === "cps" || role === "evaluador" || role === "auditor") return "bg-green-500 text-white";
    return "bg-gray-500 text-white";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Usuarios y Empresas</h1>
          <p className="text-muted-foreground">
            Administra usuarios, roles y empresas del sistema SICREP
          </p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="users" data-testid="tab-users">
            <Users className="h-4 w-4 mr-2" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="companies" data-testid="tab-companies">
            <Building2 className="h-4 w-4 mr-2" />
            Empresas
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usuarios del Sistema</CardTitle>
                  <CardDescription>
                    {users.length} usuarios registrados
                  </CardDescription>
                </div>
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-create-user">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Usuario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <form onSubmit={handleCreateUser}>
                      <DialogHeader>
                        <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                        <DialogDescription>
                          Completa los datos del usuario y asigna una empresa y rol
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Nombre Completo *</Label>
                            <Input
                              id="fullName"
                              value={userForm.fullName}
                              onChange={(e) => setUserForm({ ...userForm, fullName: e.target.value })}
                              required
                              data-testid="input-fullname"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rut">RUT</Label>
                            <Input
                              id="rut"
                              value={userForm.rut}
                              onChange={(e) => setUserForm({ ...userForm, rut: e.target.value })}
                              placeholder="12.345.678-9"
                              data-testid="input-rut"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Nombre de Usuario *</Label>
                            <Input
                              id="username"
                              value={userForm.username}
                              onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                              required
                              data-testid="input-username"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={userForm.email}
                              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                              required
                              data-testid="input-email"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">Contraseña *</Label>
                            <Input
                              id="password"
                              type="password"
                              value={userForm.password}
                              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                              required
                              minLength={6}
                              data-testid="input-password"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="role">Rol *</Label>
                            <Select
                              value={userForm.role}
                              onValueChange={(value) => setUserForm({ ...userForm, role: value })}
                            >
                              <SelectTrigger data-testid="select-role">
                                <SelectValue placeholder="Selecciona un rol" />
                              </SelectTrigger>
                              <SelectContent>
                                {userRoles.map((role) => (
                                  <SelectItem key={role.value} value={role.value}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Empresa</Label>
                          <Select
                            value={userForm.companyId}
                            onValueChange={(value) => setUserForm({ ...userForm, companyId: value })}
                          >
                            <SelectTrigger data-testid="select-company">
                              <SelectValue placeholder="Selecciona una empresa (opcional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Sin empresa</SelectItem>
                              {companies.map((company: any) => (
                                <SelectItem key={company.id} value={company.id}>
                                  {company.name} - {company.rut}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Paneles Personalizados */}
                        <div className="space-y-3 pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="useCustomPanels"
                              checked={userForm.useCustomPanels}
                              onCheckedChange={(checked) => setUserForm({ ...userForm, useCustomPanels: !!checked, customPanels: !!checked ? [] : [] })}
                              data-testid="checkbox-custom-panels"
                            />
                            <div className="flex-1">
                              <Label htmlFor="useCustomPanels" className="flex items-center gap-2">
                                <Layout className="h-4 w-4" />
                                Usar Paneles Personalizados
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Si se desactiva, el usuario verá los paneles por defecto de su rol
                              </p>
                            </div>
                          </div>

                          {userForm.useCustomPanels && (
                            <div className="pl-6 space-y-2">
                              <Label className="text-sm font-semibold">Seleccionar Paneles Disponibles</Label>
                              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                                {AVAILABLE_PANELS.map((panel) => (
                                  <div key={panel.id} className="flex items-start space-x-2">
                                    <Checkbox
                                      id={`panel-${panel.id}`}
                                      checked={userForm.customPanels.includes(panel.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setUserForm({ ...userForm, customPanels: [...userForm.customPanels, panel.id] });
                                        } else {
                                          setUserForm({ ...userForm, customPanels: userForm.customPanels.filter(p => p !== panel.id) });
                                        }
                                      }}
                                      data-testid={`checkbox-panel-${panel.id}`}
                                    />
                                    <div className="flex-1">
                                      <Label htmlFor={`panel-${panel.id}`} className="text-sm font-medium cursor-pointer">
                                        {panel.name}
                                      </Label>
                                      <p className="text-xs text-muted-foreground">{panel.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Paneles por defecto para {userRoles.find(r => r.value === userForm.role)?.label}: 
                                {' '}{DEFAULT_PANELS_BY_ROLE[userForm.role]?.length || 0} paneles
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsUserDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={createUserMutation.isPending}
                          data-testid="button-submit-user"
                        >
                          {createUserMutation.isPending ? "Creando..." : "Crear Usuario"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Cargando...
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No hay usuarios registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.fullName}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleBadgeColor(user.role)}>
                              {userRoles.find(r => r.value === user.role)?.label || user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.active ? (
                              <Badge variant="default">Activo</Badge>
                            ) : (
                              <Badge variant="secondary">Inactivo</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" data-testid={`button-edit-user-${user.id}`}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Empresas Registradas</CardTitle>
                  <CardDescription>
                    {companies.length} empresas en el sistema
                  </CardDescription>
                </div>
                <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-create-company">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Empresa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleCreateCompany}>
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Empresa</DialogTitle>
                        <DialogDescription>
                          Registra una nueva empresa en el sistema
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Nombre de la Empresa *</Label>
                          <Input
                            id="companyName"
                            value={companyForm.name}
                            onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                            required
                            data-testid="input-company-name"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyRut">RUT *</Label>
                            <Input
                              id="companyRut"
                              value={companyForm.rut}
                              onChange={(e) => setCompanyForm({ ...companyForm, rut: e.target.value })}
                              placeholder="76.XXX.XXX-X"
                              required
                              data-testid="input-company-rut"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="companyEmail">Email *</Label>
                            <Input
                              id="companyEmail"
                              type="email"
                              value={companyForm.email}
                              onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                              required
                              data-testid="input-company-email"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="companyPhone">Teléfono</Label>
                            <Input
                              id="companyPhone"
                              value={companyForm.phone}
                              onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                              placeholder="+56 9 XXXX XXXX"
                              data-testid="input-company-phone"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="companyIndustry">Industria</Label>
                            <Input
                              id="companyIndustry"
                              value={companyForm.industry}
                              onChange={(e) => setCompanyForm({ ...companyForm, industry: e.target.value })}
                              placeholder="Ej: Minería, Retail"
                              data-testid="input-company-industry"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyAddress">Dirección</Label>
                          <Input
                            id="companyAddress"
                            value={companyForm.address}
                            onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                            data-testid="input-company-address"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsCompanyDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={createCompanyMutation.isPending}
                          data-testid="button-submit-company"
                        >
                          {createCompanyMutation.isPending ? "Creando..." : "Crear Empresa"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empresa</TableHead>
                      <TableHead>RUT</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Industria</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companiesLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          Cargando...
                        </TableCell>
                      </TableRow>
                    ) : companies.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                          No hay empresas registradas
                        </TableCell>
                      </TableRow>
                    ) : (
                      companies.map((company: any) => (
                        <TableRow key={company.id}>
                          <TableCell className="font-medium">{company.name}</TableCell>
                          <TableCell>{company.rut}</TableCell>
                          <TableCell>{company.email}</TableCell>
                          <TableCell>{company.industry || "-"}</TableCell>
                          <TableCell>
                            {company.active ? (
                              <Badge variant="default">Activa</Badge>
                            ) : (
                              <Badge variant="secondary">Inactiva</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" data-testid={`button-edit-company-${company.id}`}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
