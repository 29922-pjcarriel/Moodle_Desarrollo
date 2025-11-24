import { AdminLayout } from "./AdminLayout";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";
import { Search, Plus, Edit2, Copy, Trash2, UserPlus, Settings, X } from "lucide-react";

interface CourseManagementProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Course {
  id: number;
  name: string;
  category: string;
  teacher: string;
  students: number;
  status: "active" | "hidden" | "archived";
  imageUrl: string;
}

const courses: Course[] = [
  {
    id: 1,
    name: "Sistemas Operativos",
    category: "Informática",
    teacher: "Dr. Carlos Mendoza",
    students: 32,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1707836885248-2b0e3cb0c76e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpbmclMjBzeXN0ZW1zJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzYzNzY1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "Estadística Aplicada",
    category: "Matemáticas",
    teacher: "Dra. María García",
    students: 28,
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGF0aXN0aWNzJTIwZGF0YSUyMGNoYXJ0c3xlbnwxfHx8fDE3NjM3NjU2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Programación I",
    category: "Informática",
    teacher: "Ing. Juan Pérez",
    students: 45,
    status: "archived",
    imageUrl: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM3Mzc2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export function CourseManagement({ adminName, currentView, onNavigate, onLogout }: CourseManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    teacher: "",
    category: "Informática",
    startDate: "",
    endDate: "",
    maxCapacity: "",
    status: "active"
  });

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      active: { bg: "#d4edda", text: "#155724", label: "Activo" },
      hidden: { bg: "#fff3cd", text: "#856404", label: "Oculto" },
      archived: { bg: "#f8d7da", text: "#721c24", label: "Archivado" }
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span
        className="px-3 py-1 rounded-full"
        style={{ backgroundColor: style.bg, color: style.text, fontWeight: 500 }}
      >
        {style.label}
      </span>
    );
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Curso creado: ${newCourse.title}`);
    setShowCreateModal(false);
    setNewCourse({
      title: "",
      description: "",
      teacher: "",
      category: "Informática",
      startDate: "",
      endDate: "",
      maxCapacity: "",
      status: "active"
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
          Gestión de Cursos
        </h2>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
          Administra cursos, profesores asignados y estudiantes inscritos
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
            placeholder="Buscar por nombre, categoría o profesor..."
            className="w-full rounded-xl border border-[#797979] bg-white pl-12 pr-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
            style={{ fontWeight: 500 }}
          />
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors whitespace-nowrap"
          style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
        >
          <Plus className="w-4 h-4" />
          Crear Curso
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-[#797979] overflow-hidden hover:shadow-lg transition-shadow"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="relative h-48">
              <ImageWithFallback
                src={course.imageUrl}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                {getStatusBadge(course.status)}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>
                {course.name}
              </h3>
              <div className="space-y-1 text-[#797979] mb-4">
                <p style={{ fontWeight: 500 }}>
                  Categoría: <span className="text-[#006d6f]">{course.category}</span>
                </p>
                <p style={{ fontWeight: 500 }}>
                  Profesor: <span className="text-[#006d6f]">{course.teacher}</span>
                </p>
                <p style={{ fontWeight: 500 }}>
                  Estudiantes: <span className="text-[#006d6f]">{course.students}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  className="flex items-center justify-center gap-1 text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                  title="Duplicar"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                  title="Asignar Profesor"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 text-[#006d6f] hover:text-[#00bfbf] p-2 rounded-lg hover:bg-[#ececec] transition-colors"
                  title="Configurar"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Total de Cursos</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{courses.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Cursos Activos</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{courses.filter(c => c.status === "active").length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Cursos Archivados</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{courses.filter(c => c.status === "archived").length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#797979] p-6" style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>Total Estudiantes</p>
          <p className="text-[#333333]" style={{ fontWeight: 700 }}>{courses.reduce((sum, c) => sum + c.students, 0)}</p>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-2xl border border-[#797979] p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#333333]" style={{ fontWeight: 700 }}>
                Crear Nuevo Curso
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#797979] hover:text-[#333333] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-5">
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Título del Curso
                </label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Descripción
                </label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f] min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Profesor Asignado
                  </label>
                  <select
                    value={newCourse.teacher}
                    onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                  >
                    <option value="">Seleccionar profesor</option>
                    <option value="Dr. Carlos Mendoza">Dr. Carlos Mendoza</option>
                    <option value="Dra. María García">Dra. María García</option>
                    <option value="Ing. Juan Pérez">Ing. Juan Pérez</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Categoría
                  </label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  >
                    <option value="Informática">Informática</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Ciencias">Ciencias</option>
                    <option value="Humanidades">Humanidades</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    value={newCourse.startDate}
                    onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    value={newCourse.endDate}
                    onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Capacidad Máxima
                  </label>
                  <input
                    type="number"
                    value={newCourse.maxCapacity}
                    onChange={(e) => setNewCourse({ ...newCourse, maxCapacity: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Estado Inicial
                  </label>
                  <select
                    value={newCourse.status}
                    onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  >
                    <option value="active">Activo</option>
                    <option value="hidden">Oculto</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
                  style={{ fontWeight: 600, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
                >
                  Crear Curso
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