import { AdminLayout } from "./AdminLayout";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Search, Plus, Upload, Edit2, Trash2, X } from "lucide-react";

interface UserManagementProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

// Relación roles → YA NO ARRAY → ES OBJETO
interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  estado: "active" | "suspended";
  ultimo_acceso: string | null;
  rol_id: number;
  roles: { nombre: "ADMIN" | "TEACHER" | "STUDENT" } | null;
}

export function UserManagement({
  adminName,
  currentView,
  onNavigate,
  onLogout,
}: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Crear usuario
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    role: "STUDENT",
    estado: "active",
  });

  // Editar usuario
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  // =====================================================================
  // Cargar usuarios desde Supabase (JOIN con roles)
  // =====================================================================
  const fetchUsers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("usuarios")
      .select(`
        id,
        first_name,
        last_name,
        username,
        email,
        estado,
        ultimo_acceso,
        rol_id,
        roles ( nombre )
      `)
      .order("first_name");

    if (error) console.error("Error cargando usuarios:", error);
    else setUsers(data as User[]);

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =====================================================================
  // Crear usuario en Supabase
  // =====================================================================
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("usuarios").insert({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      estado: newUser.estado,
      rol_id:
        newUser.role === "ADMIN"
          ? 1
          : newUser.role === "TEACHER"
          ? 2
          : 3, // STUDENT
    });

    if (error) {
      alert("Error creando usuario: " + error.message);
      return;
    }

    alert("Usuario creado correctamente");
    setShowCreateModal(false);
    setNewUser({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      role: "STUDENT",
      estado: "active",
    });

    fetchUsers();
  };

  // =====================================================================
  // Eliminar usuario
  // =====================================================================
  const handleDeleteUser = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    const { error } = await supabase.from("usuarios").delete().eq("id", id);

    if (error) {
      alert("Error eliminando usuario: " + error.message);
      return;
    }

    alert("Usuario eliminado correctamente");
    fetchUsers();
  };

  // =====================================================================
  // Abrir modal de edición
  // =====================================================================
  const openEditModal = (user: User) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  // =====================================================================
  // Guardar cambios del usuario editado
  // =====================================================================
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;

    const { error } = await supabase
      .from("usuarios")
      .update({
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        email: editUser.email,
        estado: editUser.estado,
      })
      .eq("id", editUser.id);

    if (error) {
      alert("Error actualizando usuario: " + error.message);
      return;
    }

    alert("Usuario actualizado correctamente");
    setShowEditModal(false);
    fetchUsers();
  };

  // =====================================================================
  // Filtro dinámico
  // =====================================================================
  const filteredUsers = users.filter((u) => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    const role = u.roles?.nombre ?? "STUDENT";

    const roleName =
      role === "ADMIN"
        ? "Administrador"
        : role === "TEACHER"
        ? "Profesor"
        : "Estudiante";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roleName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // =====================================================================
  // Badge estado
  // =====================================================================
  const getStatusBadge = (status: string) => {
    if (status === "active")
      return (
        <span className="px-3 py-1 rounded-full bg-[#d4edda] text-[#155724]">
          Activo
        </span>
      );

    return (
      <span className="px-3 py-1 rounded-full bg-[#f8d7da] text-[#721c24]">
        Suspendido
      </span>
    );
  };

  // =====================================================================
  // Render principal
  // =====================================================================
  return (
    <AdminLayout
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333333] mb-2 font-bold">Gestión de Usuarios</h2>
        <p className="text-[#006d6f] font-medium">
          Administra usuarios, roles y permisos del sistema
        </p>
      </div>

      {/* BARRA SUPERIOR */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#797979]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, email o rol..."
            className="w-full rounded-xl border border-[#797979] bg-white pl-12 pr-4 py-3"
          />
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#006d6f] text-white px-6 py-3"
        >
          <Plus className="w-4 h-4" />
          Crear Usuario
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-2xl border border-[#797979] overflow-hidden">
        {loading ? (
          <p className="p-6">Cargando usuarios...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-[#006d6f] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">
                  Nombre Completo
                </th>
                <th className="px-6 py-4 text-left font-semibold">Rol</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Correo Electrónico
                </th>
                <th className="px-6 py-4 text-left font-semibold">Estado</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Último Acceso
                </th>
                <th className="px-6 py-4 text-left font-semibold">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u, index) => {
                const fullName = `${u.first_name} ${u.last_name}`;
                const role =
                  u.roles?.nombre === "ADMIN"
                    ? "Administrador"
                    : u.roles?.nombre === "TEACHER"
                    ? "Profesor"
                    : "Estudiante";

                return (
                  <tr
                    key={u.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#ececec]"}
                  >
                    <td className="px-6 py-4 font-semibold">{fullName}</td>
                    <td className="px-6 py-4 text-[#006d6f]">{role}</td>
                    <td className="px-6 py-4 text-[#797979]">{u.email}</td>
                    <td className="px-6 py-4">{getStatusBadge(u.estado)}</td>
                    <td className="px-6 py-4 text-[#797979]">
                      {u.ultimo_acceso ?? "—"}
                    </td>

                    {/* ¡AQUÍ VAN LAS ACCIONES DEL CRUD! */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {/* EDITAR */}
                        <button
                          onClick={() => openEditModal(u)}
                          className="text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec]"
                          title="Editar Usuario"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* ELIMINAR */}
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                          title="Eliminar Usuario"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-2xl border p-6">
          <p className="text-[#797979]">Total de Usuarios</p>
          <p className="text-[#333333] font-bold">{users.length}</p>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <p className="text-[#797979]">Usuarios Activos</p>
          <p className="text-[#333333] font-bold">
            {users.filter((u) => u.estado === "active").length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <p className="text-[#797979]">Usuarios Suspendidos</p>
          <p className="text-[#333333] font-bold">
            {users.filter((u) => u.estado === "suspended").length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <p className="text-[#797979]">Profesores</p>
          <p className="text-[#333333] font-bold">
            {users.filter((u) => u.roles?.nombre === "TEACHER").length}
          </p>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL CREAR USUARIO */}
      {/* ===================================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold">Crear Nuevo Usuario</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#797979]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="rounded-xl border px-4 py-3"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, first_name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Apellido"
                  className="rounded-xl border px-4 py-3"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, last_name: e.target.value })
                  }
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Nombre de usuario"
                className="rounded-xl border px-4 py-3"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                className="rounded-xl border px-4 py-3"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="rounded-xl border px-4 py-3"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                required
              />

              <select
                className="rounded-xl border px-4 py-3"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option value="STUDENT">Estudiante</option>
                <option value="TEACHER">Profesor</option>
                <option value="ADMIN">Administrador</option>
              </select>

              <select
                className="rounded-xl border px-4 py-3"
                value={newUser.estado}
                onChange={(e) =>
                  setNewUser({ ...newUser, estado: e.target.value })
                }
              >
                <option value="active">Activo</option>
                <option value="suspended">Suspendido</option>
              </select>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-[#006d6f] text-white rounded-xl py-3">
                  Crear Usuario
                </button>

                <button
                  type="button"
                  className="rounded-xl border px-6 py-3"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL EDITAR USUARIO */}
      {/* ===================================================================== */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border p-8 max-w-2xl w-full">
            <div className="flex justify-between mb-6">
              <h3 className="font-bold">Editar Usuario</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#797979]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-5">
              <input
                type="text"
                className="w-full rounded-xl border px-4 py-3"
                value={editUser.first_name}
                onChange={(e) =>
                  setEditUser({ ...editUser, first_name: e.target.value })
                }
              />

              <input
                type="text"
                className="w-full rounded-xl border px-4 py-3"
                value={editUser.last_name}
                onChange={(e) =>
                  setEditUser({ ...editUser, last_name: e.target.value })
                }
              />

              <input
                type="email"
                className="w-full rounded-xl border px-4 py-3"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />

              <select
                className="w-full rounded-xl border px-4 py-3"
                value={editUser.estado}
                onChange={(e) =>
                  setEditUser({ ...editUser, estado: e.target.value })
                }
              >
                <option value="active">Activo</option>
                <option value="suspended">Suspendido</option>
              </select>

              <button className="w-full bg-[#006d6f] text-white rounded-xl py-3">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
