import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArrowLeft, PlusCircle, Upload, Users, Settings, Edit2, Trash2, Eye, EyeOff, Lock } from "lucide-react";

interface TeacherCourseViewProps {
  courseTitle: string;
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

interface Activity {
  id: number;
  title: string;
  type: string;
  status: "active" | "hidden" | "blocked";
  dueDate: string;
}

export function TeacherCourseView({ courseTitle, teacherName, currentView, onNavigate, onBack, onLogout }: TeacherCourseViewProps) {
  const primerParcialActivities: Activity[] = [
    { id: 1, title: "Material de estudio - Unidad 1 a 3", type: "Material", status: "active", dueDate: "25/11/2025" },
    { id: 2, title: "Prueba Parcial", type: "Quiz", status: "active", dueDate: "30/11/2025" },
    { id: 3, title: "Exámen Conjunto", type: "Examen", status: "active", dueDate: "05/12/2025" },
  ];

  const segundoParcialActivities: Activity[] = [
    { id: 4, title: "Prueba 1", type: "Quiz", status: "hidden", dueDate: "10/12/2025" },
    { id: 5, title: "Prueba Parcial", type: "Quiz", status: "blocked", dueDate: "15/12/2025" },
    { id: 6, title: "Exámen Conjunto", type: "Examen", status: "blocked", dueDate: "20/12/2025" },
  ];

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
        style={{ backgroundColor: style.bg, color: style.text, fontWeight: 500 }}
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
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Volver a cursos</span>
          </button>
        </div>

        {/* Course Title and Actions */}
        <div className="mb-8">
          <h2 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
            {courseTitle}
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("create")}
              className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-5 py-3 hover:bg-[#00595a] transition-colors"
              style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
            >
              <PlusCircle className="w-4 h-4" />
              Crear Actividad
            </button>

            <button
              className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-5 py-3 hover:bg-[#00a5a5] transition-colors"
              style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
            >
              <Upload className="w-4 h-4" />
              Subir Recursos
            </button>

            <button
              onClick={() => onNavigate("students")}
              className="flex items-center gap-2 rounded-xl border border-[#797979] bg-white text-[#006d6f] px-5 py-3 hover:bg-[#ececec] transition-colors"
              style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
            >
              <Users className="w-4 h-4" />
              Lista de Estudiantes
            </button>

            <button
              className="flex items-center gap-2 rounded-xl border border-[#797979] bg-white text-[#006d6f] px-5 py-3 hover:bg-[#ececec] transition-colors"
              style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
            >
              <Settings className="w-4 h-4" />
              Configurar Curso
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Parciales */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primer Parcial */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#333333]" style={{ fontWeight: 600 }}>
                  Primer Parcial
                </h3>
                <button
                  onClick={() => onNavigate("create")}
                  className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <PlusCircle className="w-4 h-4" />
                  Crear Nueva Actividad
                </button>
              </div>

              <div className="space-y-4">
                {primerParcialActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-2xl border border-[#797979] bg-white p-5"
                    style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(activity.status)}
                          <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
                            {activity.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4 text-[#797979]">
                          <span>Tipo: {activity.type}</span>
                          <span>•</span>
                          <span>Fecha límite: {activity.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] px-3 py-2 rounded-lg hover:bg-[#ececec] transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Segundo Parcial */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#333333]" style={{ fontWeight: 600 }}>
                  Segundo Parcial
                </h3>
                <button
                  onClick={() => onNavigate("create")}
                  className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  <PlusCircle className="w-4 h-4" />
                  Crear Nueva Actividad
                </button>
              </div>

              <div className="space-y-4">
                {segundoParcialActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-2xl border border-[#797979] bg-white p-5"
                    style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(activity.status)}
                          <h4 className="text-[#333333]" style={{ fontWeight: 600 }}>
                            {activity.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-4 text-[#797979]">
                          <span>Tipo: {activity.type}</span>
                          <span>•</span>
                          <span>Fecha límite: {activity.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] px-3 py-2 rounded-lg hover:bg-[#ececec] transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </button>
                      <button
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Motivational Panel */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl border border-[#797979] bg-white p-6 sticky top-8"
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1619918456525-7d41ade7300b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZWR1Y2F0aW9uJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2Mzc2NzU2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Profesor"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-4">
                <p 
                  className="text-[#333333] text-center leading-relaxed"
                  style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif' }}
                >
                  Organiza tus contenidos, crea actividades y guía a tus estudiantes con claridad.
                </p>
                <p 
                  className="text-[#333333] text-center leading-relaxed"
                  style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif' }}
                >
                  Cada recurso que compartes es una oportunidad para inspirar aprendizaje.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#ececec]">
                <p 
                  className="text-[#006d6f] text-center italic"
                  style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif', fontWeight: 600 }}
                >
                  ¡Tu dedicación hace la diferencia! 📚
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
