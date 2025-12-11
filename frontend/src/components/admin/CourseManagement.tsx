import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { AdminLayout } from "./AdminLayout";
import { deleteCourseCascade } from "../../lib/adminApi";


import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Archive,
  Upload,
  X,
} from "lucide-react";

// ===========================================
// INTERFACES
// ===========================================
interface CourseManagementProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Course {
  id_curso: string;
  titulo: string;
  descripcion: string | null;
  codigo: string | null;
  estado: "active" | "archived";
  imagen_url: string | null;

  categoria_id: number | null;
  categorias: { nombre: string } | null;

  docente_id: string | null;
  usuarios: { first_name: string; last_name: string } | null;
}

interface Category {
  id_categoria: number;
  nombre: string;
}

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
}

// ===========================================
// COMPONENTE PRINCIPAL
// ===========================================
export function CourseManagement({
  adminName,
  currentView,
  onNavigate,
  onLogout,
}: CourseManagementProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado del modal Crear/Editar
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    codigo: "",
    categoria_id: "",
    docente_id: "",
    estado: "active",
    imagen_url: "",
  });

  const [search, setSearch] = useState("");

  // ===========================================
  // Cargar cursos
  // ===========================================
  const fetchCourses = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("cursos")
      .select(
        `
          id_curso,
          titulo,
          descripcion,
          codigo,
          categoria_id,
          imagen_url,
          estado,
          docente_id,
          categorias(
            nombre
          ),
          usuarios(
            first_name,
            last_name
          )
        `
      )
      .order("titulo");

    if (error) console.error("Error obteniendo cursos:", error);
    else setCourses(data as Course[]);

    setLoading(false);
  };

  // ===========================================
  // Cargar categorías
  // ===========================================
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categorias")
      .select("id_categoria, nombre")
      .order("nombre");

    if (!error) setCategories(data as Category[]);
  };

  // ===========================================
  // Cargar profesores
  // ===========================================
  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("id, first_name, last_name, rol_id")
      .eq("rol_id", 2); // TEACHER = 2

    if (!error) setTeachers(data as Teacher[]);
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    fetchTeachers();
  }, []);

  // ===========================================
  // Abrir modal para crear curso
  // ===========================================
  const openCreate = () => {
    setEditingId(null);
    setForm({
      titulo: "",
      descripcion: "",
      codigo: "",
      categoria_id: "",
      docente_id: "",
      estado: "active",
      imagen_url: "",
    });
    setShowModal(true);
  };

  // ===========================================
  // Abrir modal para editar curso
  // ===========================================
  const openEdit = (course: Course) => {
    setEditingId(course.id_curso);
    setForm({
      titulo: course.titulo,
      descripcion: course.descripcion ?? "",
      codigo: course.codigo ?? "",
      categoria_id: course.categoria_id ? course.categoria_id.toString() : "",
      docente_id: course.docente_id ?? "",
      estado: course.estado,
      imagen_url: course.imagen_url ?? "",
    });
    setShowModal(true);
  };

  // ===========================================
  // Crear o Editar curso (INSERT / UPDATE)
  // ===========================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      titulo: form.titulo,
      descripcion: form.descripcion,
      codigo: form.codigo,
      categoria_id: form.categoria_id ? Number(form.categoria_id) : null,
      docente_id: form.docente_id || null,
      estado: form.estado,
      imagen_url: form.imagen_url || null,
    };

    let error;

    if (editingId) {
      const resp = await supabase
        .from("cursos")
        .update(payload)
        .eq("id_curso", editingId);

      error = resp.error;
    } else {
      const resp = await supabase.from("cursos").insert(payload);
      error = resp.error;
    }

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    setShowModal(false);
    fetchCourses();
  };

  // ===========================================
  // Eliminar curso
  // ===========================================
  const deleteCourse = async (id: string) => {
    if (!confirm("¿Eliminar este curso? Esta acción es permanente.")) return;

    const ok = await deleteCourseCascade(id);

    if (!ok) {
      alert("❌ Error al eliminar el curso. Revisa la consola.");
      return;
    }

    alert("Curso eliminado correctamente.");
    fetchCourses();
  };


  // ===========================================
  // Archivar / Activar
  // ===========================================
  const toggleStatus = async (course: Course) => {
    const newStatus = course.estado === "active" ? "archived" : "active";

    const { error } = await supabase
      .from("cursos")
      .update({ estado: newStatus })
      .eq("id_curso", course.id_curso);

    if (error) alert("Error cambiando estado");
    else fetchCourses();
  };

  // ===========================================
  // Filtrar cursos
  // ===========================================
  const filtered = courses.filter((c) =>
    c.titulo.toLowerCase().includes(search.toLowerCase())
  );

  // ===========================================
  // RENDER PRINCIPAL
  // ===========================================
  return (
    <AdminLayout
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8">
        <h2 className="text-[#333] font-bold">Gestión de Cursos</h2>
        <p className="text-[#006d6f]">Administra cursos y profesores</p>
      </div>

      {/* Barra de búsqueda y Crear */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            className="w-full border rounded-xl pl-12 pr-4 py-3 h-[52px] focus:outline-none"
            placeholder="Buscar curso..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>


        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#006d6f] text-white px-6 py-3 rounded-xl"
        >
          <Plus />
          Crear Curso
        </button>
      </div>

      {loading ? (
        <p>Cargando cursos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div
              key={c.id_curso}
              className="bg-white rounded-2xl border p-0 shadow-sm overflow-hidden"
            >
              {c.imagen_url ? (
                <img
                  src={c.imagen_url}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Upload className="text-gray-500" />
                </div>
              )}

              <div className="p-5">
                <h3 className="font-bold text-lg">{c.titulo}</h3>

                <p className="text-sm text-gray-600">
                  Categoría: {c.categorias?.nombre ?? "Sin categoría"}
                </p>

                <p className="text-sm text-gray-600">
                  Profesor:{" "}
                  {c.usuarios
                    ? `${c.usuarios.first_name} ${c.usuarios.last_name}`
                    : "No asignado"}
                </p>

                <span
                  className={`inline-block px-3 py-1 mt-3 rounded-full text-sm ${
                    c.estado === "active"
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {c.estado === "active" ? "Activo" : "Archivado"}
                </span>

                <div className="flex justify-between mt-4">
                  <button
                    className="text-[#006d6f]"
                    onClick={() => openEdit(c)}
                  >
                    <Edit2 />
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => deleteCourse(c.id_curso)}
                  >
                    <Trash2 />
                  </button>
                  <button
                    className="text-[#00bfbf]"
                    onClick={() => toggleStatus(c)}
                  >
                    <Archive />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================== */}
      {/* MODAL CREATE / EDIT */}
      {/* ===================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-8 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">
                {editingId ? "Editar Curso" : "Crear Curso"}
              </h3>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* TITULO */}
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Título del curso"
                value={form.titulo}
                onChange={(e) =>
                  setForm({ ...form, titulo: e.target.value })
                }
                required
              />

              {/* DESCRIPCION */}
              <textarea
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Descripción"
                rows={4}
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
              />

              {/* FILA: DOCENTE + CATEGORIA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DOCENTE */}
                <select
                  className="border rounded-xl px-4 py-3"
                  value={form.docente_id}
                  onChange={(e) =>
                    setForm({ ...form, docente_id: e.target.value })
                  }
                >
                  <option value="">Seleccionar profesor</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.first_name} {t.last_name}
                    </option>
                  ))}
                </select>

                {/* CATEGORIA */}
                <select
                  className="border rounded-xl px-4 py-3"
                  value={form.categoria_id}
                  onChange={(e) =>
                    setForm({ ...form, categoria_id: e.target.value })
                  }
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option
                      key={cat.id_categoria}
                      value={cat.id_categoria}
                    >
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* CODIGO */}
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Código del curso (opcional)"
                value={form.codigo}
                onChange={(e) =>
                  setForm({ ...form, codigo: e.target.value })
                }
              />

              {/* ESTADO */}
              <select
                className="border rounded-xl px-4 py-3"
                value={form.estado}
                onChange={(e) =>
                  setForm({ ...form, estado: e.target.value })
                }
              >
                <option value="active">Activo</option>
                <option value="archived">Archivado</option>
              </select>

              {/* IMAGEN */}
              <input
                type="text"
                className="w-full border rounded-xl px-4 py-3"
                placeholder="URL de imagen (opcional)"
                value={form.imagen_url}
                onChange={(e) =>
                  setForm({ ...form, imagen_url: e.target.value })
                }
              />

              {/* BOTONES */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#006d6f] text-white rounded-xl py-3"
                >
                  {editingId ? "Guardar Cambios" : "Crear Curso"}
                </button>

                <button
                  type="button"
                  className="rounded-xl border px-6 py-3"
                  onClick={() => setShowModal(false)}
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
