import { AdminLayout } from "./AdminLayout";
import { useState } from "react";
import { Plus, Edit2, Trash2, ChevronRight, ChevronDown, X } from "lucide-react";

interface CategoryManagementProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Category {
  id: number;
  name: string;
  description: string;
  parent: number | null;
  courses: number;
  isExpanded?: boolean;
}

const categories: Category[] = [
  { id: 1, name: "Informática", description: "Cursos de tecnología y programación", parent: null, courses: 45 },
  { id: 2, name: "Programación", description: "Lenguajes de programación", parent: 1, courses: 20 },
  { id: 3, name: "Redes", description: "Redes y comunicaciones", parent: 1, courses: 15 },
  { id: 4, name: "Matemáticas", description: "Ciencias matemáticas", parent: null, courses: 30 },
  { id: 5, name: "Cálculo", description: "Cálculo diferencial e integral", parent: 4, courses: 12 },
  { id: 6, name: "Estadística", description: "Estadística y probabilidad", parent: 4, courses: 18 },
];

export function CategoryManagement({ adminName, currentView, onNavigate, onLogout }: CategoryManagementProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1, 4]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parent: ""
  });

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const getSubcategories = (parentId: number | null) => {
    return categories.filter(cat => cat.parent === parentId);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const hasChildren = categories.some(cat => cat.parent === category.id);
    const isExpanded = expandedCategories.includes(category.id);

    return (
      <div key={category.id}>
        <div
          className="flex items-center gap-3 p-4 bg-white hover:bg-[#ececec] transition-colors border-b border-[#ececec]"
          style={{ paddingLeft: `${level * 40 + 16}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="text-[#006d6f] hover:text-[#00bfbf]"
            >
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          
          <div className="flex-1">
            <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
              {category.name}
            </h4>
            <p className="text-[#797979]" style={{ fontWeight: 500 }}>
              {category.description} • {category.courses} cursos
            </p>
          </div>

          <div className="flex gap-2">
            <button className="text-[#006d6f] hover:text-[#00bfbf] p-2">
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="text-red-600 hover:text-red-700 p-2">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isExpanded && hasChildren && getSubcategories(category.id).map(sub => renderCategory(sub, level + 1))}
      </div>
    );
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Categoría creada: ${newCategory.name}`);
    setShowCreateModal(false);
    setNewCategory({ name: "", description: "", parent: "" });
  };

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>Gestión de Categorías</h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>Organiza los cursos en categorías jerárquicas</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
          style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
        >
          <Plus className="w-4 h-4" />
          Crear Categoría
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#797979] overflow-hidden" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
        {getSubcategories(null).map(cat => renderCategory(cat))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#797979] p-8 max-w-2xl w-full" style={{ boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#333333]" style={{ fontWeight: 700 }}>Crear Nueva Categoría</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#797979] hover:text-[#333333]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-5">
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Nombre de la Categoría</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Descripción</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f] min-h-[80px]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>Categoría Padre (Opcional)</label>
                <select
                  value={newCategory.parent}
                  onChange={(e) => setNewCategory({ ...newCategory, parent: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                >
                  <option value="">Sin categoría padre</option>
                  {categories.filter(cat => cat.parent === null).map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 600, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
                >
                  Crear Categoría
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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