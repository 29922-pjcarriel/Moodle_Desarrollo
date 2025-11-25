import { AdminLayout } from "./AdminLayout";
import { useState } from "react";
import { Search, Plus, Upload, Edit2, Ban, KeyRound, Trash2, X } from "lucide-react";

interface UserManagementProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface User {
  id: number;
  fullName: string;
  role: string;
  email: string;
  status: "active" | "suspended";
  lastAccess: string;
}

const users: User[] = [
  { id: 1, fullName: "Ana García Pérez", role: "Estudiante", email: "ana.garcia@neurostudy.edu", status: "active", lastAccess: "Hace 2 horas" },
  { id: 2, fullName: "Carlos Mendoza López", role: "Profesor", email: "carlos.mendoza@neurostudy.edu", status: "active", lastAccess: "Hace 1 día" },
  { id: 3, fullName: "María Rodríguez", role: "Estudiante", email: "maria.rodriguez@neurostudy.edu", status: "active", lastAccess: "Hace 3 horas" },
  { id: 4, fullName: "Juan Fernández", role: "Estudiante", email: "juan.fernandez@neurostudy.edu", status: "suspended", lastAccess: "Hace 14 días" },
  { id: 5, fullName: "Laura Martínez", role: "Profesor", email: "laura.martinez@neurostudy.edu", status: "active", lastAccess: "Hace 5 horas" },
  { id: 6, fullName: "Pedro Sánchez", role: "Administrador", email: "pedro.sanchez@neurostudy.edu", status: "active", lastAccess: "Hace 30 min" },
];

export function UserManagement({ adminName, currentView, onNavigate, onLogout }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "Estudiante"
  });

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="px-3 py-1 rounded-full bg-[#d4edda] text-[#155724]" style={{ fontWeight: 500 }}>
          Activo
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-[#f8d7da] text-[#721c24]" style={{ fontWeight: 500 }}>
        Suspendido
      </span>
    );
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Usuario creado: ${newUser.firstName} ${newUser.lastName}`);
    setShowCreateModal(false);
    setNewUser({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: "Estudiante"
    });
  };

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
          Gestión de Usuarios
        </h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
          Administra usuarios, roles y permisos del sistema
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#797979]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, email o rol..."
            className="w-full rounded-xl border border-[#797979] bg-white pl-12 pr-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
            style={{ fontWeight: 500 }}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors whitespace-nowrap"
            style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
          >
            <Plus className="w-4 h-4" />
            Crear Usuario
          </button>
          <button
            className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-6 py-3 hover:bg-[#00a5a5] transition-colors whitespace-nowrap"
            style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
          >
            <Upload className="w-4 h-4" />
            Importar CSV
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div
        className="bg-white rounded-2xl border border-[#797979] overflow-hidden"
        style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#006d6f] text-white">
              <tr>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Nombre Completo
                </th>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Rol
                </th>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Correo Electrónico
                </th>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Estado
                </th>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Último Acceso
                </th>
                <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-[#ececec]"}
                >
                  <td className="px-6 py-4 text-[#333333]" style={{ fontWeight: 600 }}>
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 text-[#006d6f]" style={{ fontWeight: 500 }}>
                    {user.role}
                  </td>
                  <td className="px-6 py-4 text-[#797979]" style={{ fontWeight: 500 }}>
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 text-[#797979]" style={{ fontWeight: 500 }}>
                    {user.lastAccess}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-[#ff6b6b] hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Suspender"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        className="text-[#00bfbf] hover:text-[#006d6f] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                        title="Restablecer Contraseña"
                      >
                        <KeyRound className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Total de Usuarios</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{users.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Usuarios Activos</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{users.filter(u => u.status === "active").length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Usuarios Suspendidos</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{users.filter(u => u.status === "suspended").length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Profesores</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{users.filter(u => u.role === "Profesor").length}</p>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-2xl border border-[#797979] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#333333]" style={{ fontWeight: 700 }}>
                Crear Nuevo Usuario
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#797979] hover:text-[#333333] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Rol
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                >
                  <option value="Estudiante">Estudiante</option>
                  <option value="Profesor">Profesor</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Gestor de Curso">Gestor de Curso</option>
                  <option value="Invitado">Invitado</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 600, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
                >
                  Crear Usuario
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border border-[#797979] bg-white text-[#333333] px-6 py-3 hover:bg-[#ececec] transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}