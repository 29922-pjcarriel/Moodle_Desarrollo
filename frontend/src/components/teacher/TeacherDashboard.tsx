import { useEffect, useState } from "react";
import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { BookOpen, Users, ClipboardCheck, Calendar, TrendingUp } from "lucide-react";
import { getTeacherStats } from "../../lib/teacherApi";

interface TeacherDashboardProps {
  teacherName: string;
  teacherId: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function TeacherDashboard({
  teacherName,
  teacherId,
  currentView,
  onNavigate,
  onLogout
}: TeacherDashboardProps) {
  
  const [stats, setStats] = useState({
    activeCourses: 0,
    enrolledStudents: 0,
    pendingActivities: 0,
    nextEvaluations: 0,
    generalAverage: "0.0"
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getTeacherStats(teacherId);
      setStats(data);
    }
    loadStats();
  }, [teacherId]);

  const cards = [
    {
      title: "Cursos Activos",
      value: stats.activeCourses,
      description: "En este semestre",
      icon: BookOpen,
      color: "#006d6f",
      goto: "courses"
    },
    {
      title: "Estudiantes Inscritos",
      value: stats.enrolledStudents,
      description: "En todos los cursos",
      icon: Users,
      color: "#00bfbf"
    },
    {
      title: "Actividades Pendientes",
      value: stats.pendingActivities,
      description: "Por calificar",
      icon: ClipboardCheck,
      color: "#f4d7dd",
      goto: "grades"
    },
    {
      title: "Próximas Evaluaciones",
      value: stats.nextEvaluations,
      description: "Esta semana",
      icon: Calendar,
      color: "#00bfbf",
      goto: "courses"
    },
    {
      title: "Promedio General",
      value: stats.generalAverage,
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

        <div className="mb-8">
          <h1 className="text-[#333333] mb-2 font-bold text-3xl">
            Bienvenido Profesor {teacherName}
          </h1>
          <p className="text-[#006d6f] font-semibold">
            "La enseñanza que deja huella es la que se hace de corazón a corazón"
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#797979] p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => stat.goto && onNavigate(stat.goto)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#797979] font-semibold">{stat.title}</p>
                    <p className="text-[#333333] text-xl font-bold">{stat.value}</p>
                    <p className="text-[#797979]">{stat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Acciones rápidas */}
        <div className="mt-8 bg-white rounded-2xl border border-[#797979] p-6 shadow-md">
          <h3 className="text-[#333333] font-semibold mb-4 text-xl">Acciones Rápidas</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate("create")}
              className="rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-4 hover:bg-[#00595a]"
            >
              + Crear Nueva Actividad
            </button>

            <button
              onClick={() => onNavigate("courses")}
              className="rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-6 py-4 hover:bg-[#00a5a5]"
            >
              Ver Mis Cursos
            </button>

            <button
              onClick={() => onNavigate("grades")}
              className="rounded-xl border border-[#797979] bg-[#f4d7dd] text-[#333333] px-6 py-4 hover:bg-[#f0c5ce]"
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
