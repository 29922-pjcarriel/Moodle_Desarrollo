import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { BookOpen, Users, ClipboardCheck, Calendar, TrendingUp } from "lucide-react";

interface TeacherDashboardProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  color: string;
}

export function TeacherDashboard({ teacherName, currentView, onNavigate, onLogout }: TeacherDashboardProps) {
  const stats: StatCard[] = [
    {
      title: "Cursos Activos",
      value: 4,
      description: "En este semestre",
      icon: BookOpen,
      color: "#006d6f"
    },
    {
      title: "Estudiantes Inscritos",
      value: 127,
      description: "En todos los cursos",
      icon: Users,
      color: "#00bfbf"
    },
    {
      title: "Actividades Pendientes",
      value: 8,
      description: "Por calificar",
      icon: ClipboardCheck,
      color: "#f4d7dd"
    },
    {
      title: "Próximas Evaluaciones",
      value: 3,
      description: "Esta semana",
      icon: Calendar,
      color: "#00bfbf"
    },
    {
      title: "Promedio General",
      value: "8.1",
      description: "Todos los cursos",
      icon: TrendingUp,
      color: "#006d6f"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <TeacherNavbar 
        teacherName={teacherName} 
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
            Bienvenido Profesor {teacherName}
          </h1>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            "La enseñanza que deja huella no es la que se hace de cabeza a cabeza, sino de corazón a corazón"
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#797979] p-6 hover:shadow-lg transition-shadow cursor-pointer"
                style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
                onClick={() => {
                  if (stat.title === "Cursos Activos") onNavigate("courses");
                  if (stat.title === "Actividades Pendientes") onNavigate("grades");
                  if (stat.title === "Próximas Evaluaciones") onNavigate("courses");
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#797979] mb-1" style={{ fontWeight: 500 }}>
                      {stat.title}
                    </p>
                    <p className="text-[#333333] mb-1" style={{ fontWeight: 700 }}>
                      {stat.value}
                    </p>
                    <p className="text-[#797979]">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl border border-[#797979] p-6"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}>
          <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate("create")}
              className="rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-4 hover:bg-[#00595a] transition-colors"
              style={{ fontWeight: 500, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              + Crear Nueva Actividad
            </button>
            <button
              onClick={() => onNavigate("courses")}
              className="rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-6 py-4 hover:bg-[#00a5a5] transition-colors"
              style={{ fontWeight: 500, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              Ver Mis Cursos
            </button>
            <button
              onClick={() => onNavigate("grades")}
              className="rounded-xl border border-[#797979] bg-[#f4d7dd] text-[#333333] px-6 py-4 hover:bg-[#f0c5ce] transition-colors"
              style={{ fontWeight: 500, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              Calificar Actividades
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}