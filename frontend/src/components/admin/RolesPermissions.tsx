import { AdminLayout } from "./AdminLayout";
import { useState } from "react";
import { Shield, Check, X as XIcon } from "lucide-react";

interface RolesPermissionsProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Permission {
  id: string;
  label: string;
  category: string;
}

const permissions: Permission[] = [
  { id: "create_course", label: "Crear curso", category: "Cursos" },
  { id: "edit_course", label: "Editar curso", category: "Cursos" },
  { id: "delete_course", label: "Eliminar curso", category: "Cursos" },
  { id: "view_grades", label: "Ver calificaciones", category: "Calificaciones" },
  { id: "edit_grades", label: "Editar calificaciones", category: "Calificaciones" },
  { id: "create_user", label: "Crear usuarios", category: "Usuarios" },
  { id: "edit_user", label: "Editar usuarios", category: "Usuarios" },
  { id: "suspend_user", label: "Suspender cuentas", category: "Usuarios" },
  { id: "delete_user", label: "Eliminar usuarios", category: "Usuarios" },
  { id: "view_reports", label: "Ver reportes", category: "Sistema" },
  { id: "manage_backups", label: "Gestionar backups", category: "Sistema" },
  { id: "manage_settings", label: "Configurar sistema", category: "Sistema" },
];

const roles = [
  { id: "admin", name: "Administrador", color: "#ff6b6b" },
  { id: "teacher", name: "Profesor", color: "#006d6f" },
  { id: "student", name: "Estudiante", color: "#00bfbf" },
  { id: "manager", name: "Gestor de Curso", color: "#f4d7dd" },
  { id: "guest", name: "Invitado", color: "#797979" },
];

export function RolesPermissions({ adminName, currentView, onNavigate, onLogout }: RolesPermissionsProps) {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [rolePermissions, setRolePermissions] = useState<Record<string, string[]>>({
    admin: permissions.map(p => p.id),
    teacher: ["edit_course", "view_grades", "edit_grades"],
    student: [],
    manager: ["edit_course", "view_grades"],
    guest: []
  });

  const hasPermission = (roleId: string, permissionId: string) => {
    return rolePermissions[roleId]?.includes(permissionId);
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    setRolePermissions(prev => {
      const current = prev[roleId] || [];
      if (current.includes(permissionId)) {
        return { ...prev, [roleId]: current.filter(p => p !== permissionId) };
      } else {
        return { ...prev, [roleId]: [...current, permissionId] };
      }
    });
  };

  const permissionsByCategory = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>Roles y Permisos</h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>Gestiona los permisos y capacidades de cada rol</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[#797979] overflow-hidden" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div className="bg-[#006d6f] text-white p-4">
              <h3 style={{ fontWeight: 600 }}>Roles del Sistema</h3>
            </div>
            <div className="p-4 space-y-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left p-4 rounded-xl transition-colors ${
                    selectedRole === role.id
                      ? "bg-[#006d6f] text-white"
                      : "bg-[#ececec] text-[#333333] hover:bg-[#006d6f]/10"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" style={{ color: selectedRole === role.id ? "white" : role.color }} />
                    <span>{role.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <div className="mb-6">
              <h3 className="text-[#333333]" style={{ fontWeight: 600 }}>
                Permisos de {roles.find(r => r.id === selectedRole)?.name}
              </h3>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                Habilita o deshabilita capacidades para este rol
              </p>
            </div>

            {Object.entries(permissionsByCategory).map(([category, perms]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h4 className="text-[#006d6f] mb-3" style={{ fontWeight: 600 }}>{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {perms.map(permission => {
                    const isEnabled = hasPermission(selectedRole, permission.id);
                    return (
                      <button
                        key={permission.id}
                        onClick={() => togglePermission(selectedRole, permission.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          isEnabled
                            ? "border-[#006d6f] bg-[#006d6f]/5"
                            : "border-[#ececec] bg-white hover:border-[#797979]"
                        }`}
                      >
                        <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                          {permission.label}
                        </span>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isEnabled ? "bg-[#006d6f]" : "bg-[#ececec]"
                        }`}>
                          {isEnabled ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <XIcon className="w-4 h-4 text-[#797979]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-[#ececec] flex gap-4">
              <button
                onClick={() => alert("Permisos guardados")}
                className="rounded-xl bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                style={{ fontWeight: 600, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
              >
                Guardar Cambios
              </button>
              <button
                className="rounded-xl bg-white text-[#333333] px-6 py-3 hover:bg-[#ececec] transition-colors border border-[#797979]"
                style={{ fontWeight: 600 }}
              >
                Restablecer
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}