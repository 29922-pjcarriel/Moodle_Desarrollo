import { useEffect, useState } from "react";
import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  ArrowLeft,
  PlusCircle,
  Upload,
  Users,
  Settings,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";

import {
  getCourseActivities,
  deleteActivity,
  updateActivity
} from "../../lib/teacherApi";

/* ============================================================
   PROPS PRINCIPALES
============================================================ */
interface TeacherCourseViewProps {
  courseTitle: string;
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

export function TeacherCourseView({
  courseTitle,
  teacherName,
  currentView,
  onNavigate,
  onBack,
  onLogout
}: TeacherCourseViewProps) {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  const courseId = sessionStorage.getItem("selectedCourseId");

  /* ============================================================
       Cargar actividades reales
  ============================================================ */
  async function loadActivities() {
    if (!courseId) return;

    const dbActivities = await getCourseActivities(courseId);

    const mapped = dbActivities.map((act: any) => ({
      id: act.id_actividad,
      title: act.titulo,
      type: act.tipo,
      status: "active",
      dueDate: act.fecha_cierre
        ? new Date(act.fecha_cierre).toLocaleDateString("es-EC")
        : "Sin fecha"
    }));

    setActivities(mapped);
    setLoading(false);
  }

  useEffect(() => {
    loadActivities();
  }, [courseId]);

  /* ============================================================
       ELIMINAR ACTIVIDAD
  ============================================================ */
  async function handleDelete(id: number) {
    if (!confirm("¿Seguro que deseas eliminar esta actividad?")) return;

    const ok = await deleteActivity(id);

    if (!ok) {
      alert("Error al eliminar la actividad.");
      return;
    }

    alert("Actividad eliminada.");
    loadActivities(); // Recargar
  }

  /* ============================================================
       EDITAR ACTIVIDAD
  ============================================================ */
  function openEditModal(activity: any) {
    setSelectedActivity(activity);
    setEditModalOpen(true);
  }

  async function handleUpdate(e: any) {
    e.preventDefault();

    const form = new FormData(e.target);

    const changes = {
      titulo: form.get("title"),
      tipo: form.get("type"),
      fecha_cierre: form.get("dueDate")
        ? new Date(form.get("dueDate") as string)
        : null
    };

    const ok = await updateActivity(selectedActivity.id, changes);

    if (!ok) {
      alert("Error actualizando actividad.");
      return;
    }

    alert("Actividad actualizada.");
    setEditModalOpen(false);
    loadActivities();
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      active: { bg: "#d4edda", text: "#155724", label: "Activa" },
      hidden: { bg: "#fff3cd", text: "#856404", label: "Oculta" },
      blocked: { bg: "#f8d7da", text: "#721c24", label: "Bloqueada" }
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span
        className="px-3 py-1 rounded-full"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        {style.label}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    if (status === "active") return <Eye className="w-4 h-4" />;
    if (status === "hidden") return <EyeOff className="w-4 h-4" />;
    return <Lock className="w-4 h-4" />;
  };

  /* ============================================================
       MAIN RETURN
  ============================================================ */
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TeacherNavbar
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="w-full h-1 bg-[#006d6f]"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f]"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a cursos
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-[#333333] mb-4 font-semibold text-2xl">
            {courseTitle}
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2">

            <h3 className="text-[#333333] font-semibold mb-6 text-xl">
              Actividades del Curso
            </h3>

            <div className="space-y-4">

              {loading && (
                <p className="text-[#797979] italic">
                  Cargando actividades...
                </p>
              )}

              {!loading && activities.length === 0 && (
                <p className="text-[#797979] italic">
                  No hay actividades creadas todavía.
                </p>
              )}

              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-2xl border border-[#797979] bg-white p-5"
                  style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(activity.status)}
                        <h4 className="text-[#333333] font-semibold text-lg">
                          {activity.title}
                        </h4>
                      </div>
                      <p className="text-[#797979] mt-1">
                        Tipo: {activity.type} • Fecha límite: {activity.dueDate}
                      </p>
                    </div>

                    {getStatusBadge(activity.status)}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => openEditModal(activity)}
                      className="text-[#006d6f] flex gap-2 items-center hover:text-[#00bfbf]"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="text-red-600 flex gap-2 items-center hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-1">
            <MotivationPanel />
          </div>
        </div>
      </main>

      <Footer />

      {/* ============================================================
            MODAL DE EDICIÓN (DISEÑO ELEGANTE)
      ============================================================ */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn p-4">
          <div
            className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl border border-[#dcdcdc]"
            style={{
              boxShadow: "0px 8px 25px rgba(0,0,0,0.25)"
            }}
          >
            <h3 className="text-2xl font-bold text-[#333333] mb-6">
              Editar Actividad
            </h3>

            <form onSubmit={handleUpdate} className="space-y-5">

              {/* Título */}
              <div>
                <label className="block mb-1 font-semibold text-[#333333]">
                  Título
                </label>
                <input
                  name="title"
                  defaultValue={selectedActivity.title}
                  className="w-full rounded-xl border border-[#b5b5b5] px-4 py-3 bg-[#f5f5f5] text-[#333333] outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              {/* Tipo */}
              <div>
                <label className="block mb-1 font-semibold text-[#333333]">
                  Tipo de Actividad
                </label>
                <input
                  name="type"
                  defaultValue={selectedActivity.type}
                  className="w-full rounded-xl border border-[#b5b5b5] px-4 py-3 bg-[#f5f5f5] text-[#333333] outline-none focus:border-[#006d6f]"
                  required
                />
              </div>

              {/* Fecha límite */}
              <div>
                <label className="block mb-1 font-semibold text-[#333333]">
                  Fecha límite
                </label>
                <input
                  type="date"
                  name="dueDate"
                  className="w-full rounded-xl border border-[#b5b5b5] px-4 py-3 bg-[#f5f5f5] text-[#333333] outline-none focus:border-[#006d6f]"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-3">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#006d6f] text-white py-3 text-center font-semibold hover:bg-[#00595a] transition-all shadow-md"
                >
                  Guardar Cambios
                </button>

                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 rounded-xl bg-[#eeeeee] text-[#333333] py-3 text-center font-semibold hover:bg-[#e0e0e0] transition-all border border-[#cccccc]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}

/* ============================================================
     PANEL MOTIVACIONAL
============================================================ */
function MotivationPanel() {
  return (
    <div
      className="rounded-2xl border border-[#797979] bg-white p-6 sticky top-8"
      style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
    >
      <div className="rounded-xl overflow-hidden mb-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1619918456525-7d41ade7300b"
          alt="Profesor"
          className="w-full h-64 object-cover"
        />
      </div>

      <p className="text-center text-[#333] leading-relaxed">
        Organiza tus contenidos, crea actividades y guía a tus estudiantes con claridad.
      </p>

      <p className="text-center text-[#333] leading-relaxed mt-4">
        Cada recurso que compartes es una oportunidad para inspirar aprendizaje.
      </p>

      <div className="border-t mt-6 pt-4 text-center">
        <p className="text-[#006d6f] font-semibold italic">
          ¡Tu dedicación hace la diferencia! 📚
        </p>
      </div>
    </div>
  );
}
