import { AdminLayout } from "./AdminLayout";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Plus, Edit2, Trash2, ChevronRight, ChevronDown, X } from "lucide-react";

interface CategoryManagementProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Category {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
  parent_id: number | null;
  courses: number;
}

// Para el formulario (strings porque vienen de <input>/<select>)
interface CategoryFormState {
  nombre: string;
  descripcion: string;
  parent_id: string; // id_categoria o "" si no tiene padre
}

export function CategoryManagement({
  adminName,
  currentView,
  onNavigate,
  onLogout,
}: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formCategory, setFormCategory] = useState<CategoryFormState>({
    nombre: "",
    descripcion: "",
    parent_id: "",
  });

  // ============================================================
  // 1. Cargar categorías + cursos y calcular totales por categoría
  // ============================================================
  const fetchCategoriesAndCourses = async () => {
    setLoading(true);

    // 1) Categorías
    const { data: catData, error: catError } = await supabase
      .from("categorias")
      .select("id_categoria, nombre, descripcion, parent_id")
      .order("nombre", { ascending: true });

    if (catError) {
      console.error("Error cargando categorías:", catError);
      setLoading(false);
      return;
    }

    // 2) Cursos (solo id y categoria_id, contamos en frontend)
    const { data: courseData, error: courseError } = await supabase
      .from("cursos")
      .select("id_curso, categoria_id");

    if (courseError) {
      console.error("Error cargando cursos:", courseError);
      setLoading(false);
      return;
    }

    // 3) Conteo de cursos por categoria_id
    const courseCount: Record<number, number> = {};
    (courseData || []).forEach((c: any) => {
      if (c.categoria_id != null) {
        const catId = c.categoria_id as number;
        courseCount[catId] = (courseCount[catId] || 0) + 1;
      }
    });

    // 4) Mapear categorías con su número de cursos
    const mapped: Category[] = (catData || []).map((cat: any) => ({
      id_categoria: cat.id_categoria,
      nombre: cat.nombre,
      descripcion: cat.descripcion,
      parent_id: cat.parent_id,
      courses: courseCount[cat.id_categoria] || 0,
    }));

    setCategories(mapped);

    // Expandir las categorías raíz la primera vez
    setExpandedCategories((prev) =>
      prev.length ? prev : mapped.filter((c) => c.parent_id === null).map((c) => c.id_categoria)
    );

    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesAndCourses();
  }, []);

  // ============================================================
  // 2. Helpers de jerarquía
  // ============================================================
  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const getSubcategories = (parentId: number | null) =>
    categories.filter((cat) => cat.parent_id === parentId);

  // ============================================================
  // 3. CRUD: Crear / Editar / Eliminar
  // ============================================================
  const openCreateModal = () => {
    setEditingId(null);
    setFormCategory({
      nombre: "",
      descripcion: "",
      parent_id: "",
    });
    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setEditingId(category.id_categoria);
    setFormCategory({
      nombre: category.nombre,
      descripcion: category.descripcion ?? "",
      parent_id: category.parent_id ? String(category.parent_id) : "",
    });
    setShowModal(true);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nombre: formCategory.nombre.trim(),
      descripcion: formCategory.descripcion.trim() || null,
      parent_id: formCategory.parent_id ? Number(formCategory.parent_id) : null,
    };

    let error;

    if (editingId) {
      const { error: updateError } = await supabase
        .from("categorias")
        .update(payload)
        .eq("id_categoria", editingId);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("categorias")
        .insert(payload);
      error = insertError;
    }

    if (error) {
      alert("Error guardando categoría: " + error.message);
      return;
    }

    setShowModal(false);
    await fetchCategoriesAndCourses();
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("¿Eliminar esta categoría? (Si tiene cursos o subcategorías, la operación puede fallar)")) {
      return;
    }

    const { error } = await supabase
      .from("categorias")
      .delete()
      .eq("id_categoria", id);

    if (error) {
      alert("No se pudo eliminar la categoría.\nDetalle: " + error.message);
      return;
    }

    await fetchCategoriesAndCourses();
  };

  // ============================================================
  // 4. Render recursivo de la jerarquía
  // ============================================================
  const renderCategory = (category: Category, level: number = 0) => {
    const children = getSubcategories(category.id_categoria);
    const hasChildren = children.length > 0;
    const isExpanded = expandedCategories.includes(category.id_categoria);

    return (
      <div key={category.id_categoria}>
        <div
          className="flex items-center gap-3 p-4 bg-white hover:bg-[#ececec] transition-colors border-b border-[#ececec]"
          style={{ paddingLeft: `${level * 40 + 16}px` }}
        >
          {hasChildren ? (
            <button
              onClick={() => toggleCategory(category.id_categoria)}
              className="text-[#006d6f] hover:text-[#00bfbf]"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          <div className="flex-1">
            <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
              {category.nombre}
            </h4>
            <p className="text-[#797979]" style={{ fontWeight: 500 }}>
              {category.descripcion || "Sin descripción"} • {category.courses}{" "}
              {category.courses === 1 ? "curso" : "cursos"}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="text-[#006d6f] hover:text-[#00bfbf] p-2"
              onClick={() => openEditModal(category)}
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              className="text-red-600 hover:text-red-700 p-2"
              onClick={() => deleteCategory(category.id_categoria)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isExpanded &&
          hasChildren &&
          children.map((sub) => renderCategory(sub, level + 1))}
      </div>
    );
  };

  // ============================================================
  // 5. Render principal
  // ============================================================
  return (
    <AdminLayout
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2
            className="text-[#333333] mb-2"
            style={{ fontWeight: 700 }}
          >
            Gestión de Categorías
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Organiza los cursos en categorías jerárquicas
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
          style={{ fontWeight: 500, boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.1)" }}
        >
          <Plus className="w-4 h-4" />
          Crear Categoría
        </button>
      </div>

      <div
        className="bg-white rounded-2xl border border-[#797979] overflow-hidden"
        style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)" }}
      >
        {loading ? (
          <p className="p-4">Cargando categorías...</p>
        ) : (
          getSubcategories(null).map((cat) => renderCategory(cat))
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL CREAR / EDITAR CATEGORÍA                        */}
      {/* ======================================================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-2xl border border-[#797979] p-8 max-w-2xl w-full"
            style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className="text-[#333333]"
                style={{ fontWeight: 700 }}
              >
                {editingId ? "Editar Categoría" : "Crear Nueva Categoría"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#797979] hover:text-[#333333]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitCategory} className="space-y-5">
              <div>
                <label
                  className="block text-[#333333] mb-2"
                  style={{ fontWeight: 500 }}
                >
                  Nombre de la Categoría
                </label>
                <input
                  type="text"
                  value={formCategory.nombre}
                  onChange={(e) =>
                    setFormCategory({ ...formCategory, nombre: e.target.value })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-[#333333] mb-2"
                  style={{ fontWeight: 500 }}
                >
                  Descripción
                </label>
                <textarea
                  value={formCategory.descripcion}
                  onChange={(e) =>
                    setFormCategory({
                      ...formCategory,
                      descripcion: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f] min-h-[80px]"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-[#333333] mb-2"
                  style={{ fontWeight: 500 }}
                >
                  Categoría Padre (Opcional)
                </label>
                <select
                  value={formCategory.parent_id}
                  onChange={(e) =>
                    setFormCategory({
                      ...formCategory,
                      parent_id: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                >
                  <option value="">Sin categoría padre</option>
                  {categories
                    .filter((cat) => cat.parent_id === null)
                    .map((cat) => (
                      <option
                        key={cat.id_categoria}
                        value={cat.id_categoria}
                      >
                        {cat.nombre}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 600, boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.1)" }}
                >
                  {editingId ? "Guardar Cambios" : "Crear Categoría"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl bg-white text-[#333333] px-6 py-3 hover:bg-[#ececec] transition-colors border border-[#797979]"
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
