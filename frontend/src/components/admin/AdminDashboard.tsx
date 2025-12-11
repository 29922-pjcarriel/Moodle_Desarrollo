import { AdminLayout } from "./AdminLayout";
import { Users, UserCheck, BookOpen, FolderTree, UserX, Activity, Calendar, Bell } from "lucide-react";

interface AdminDashboardProps {
  adminName: string;
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
  onClick?: () => void;
}

export function AdminDashboard({ adminName, currentView, onNavigate, onLogout }: AdminDashboardProps) {
  const stats: StatCard[] = [
    {
      title: "Cursos Activos",
      value: 142,
      description: "En este semestre",
      icon: BookOpen,
      color: "#006d6f",
      onClick: () => onNavigate("courses")
    },
    {
      title: "Estudiantes Registrados",
      value: 1247,
      description: "Usuarios activos",
      icon: Users,
      color: "#00bfbf",
      onClick: () => onNavigate("users")
    },
    {
      title: "Profesores",
      value: 87,
      description: "Docentes activos",
      icon: UserCheck,
      color: "#006d6f",
      onClick: () => onNavigate("users")
    },
    {
      title: "Categorías",
      value: 18,
      description: "Áreas de estudio",
      icon: FolderTree,
      color: "#00bfbf",
      onClick: () => onNavigate("categories")
    },
    {
      title: "Actividades Creadas",
      value: 523,
      description: "Total del sistema",
      icon: Activity,
      color: "#006d6f"
    },
    {
      title: "Monitoreo del Sistema",
      value: "89%",
      description: "Estado saludable",
      icon: Activity,
      color: "#00bfbf",
      onClick: () => onNavigate("monitoring")
    }
  ];

  const recentActivities = [
    { action: "Nuevo curso creado", details: "Inteligencia Artificial - Prof. García", time: "Hace 15 min" },
    { action: "Usuario registrado", details: "María López (Estudiante)", time: "Hace 1 hora" },
    { action: "Cambio de rol", details: "Carlos Pérez → Profesor", time: "Hace 2 horas" },
    { action: "Curso archivado", details: "Programación I - Periodo anterior", time: "Hace 3 horas" },
    { action: "Backup completado", details: "Respaldo automático del sistema", time: "Hace 5 horas" }
  ];

  return (
    <AdminLayout 
      adminName={adminName}
      currentView={currentView}
      onNavigate={onNavigate}
      onLogout={onLogout}
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
          Panel de Administración
        </h1>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
          Gestiona usuarios, cursos, categorías y el funcionamiento global de NeuroStudy.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#ececec] p-6 hover:shadow-lg transition-shadow cursor-pointer"
              style={{ boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.08)' }}
              onClick={stat.onClick}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div
            className="bg-white rounded-2xl border border-[#ececec] p-6"
            style={{ boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.08)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Actividad Reciente del Sistema
            </h3>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-[#ececec] last:border-0">
                  <div className="w-2 h-2 rounded-full bg-[#006d6f] mt-2"></div>
                  <div className="flex-1">
                    <p className="text-[#333333]" style={{ fontWeight: 600 }}>
                      {activity.action}
                    </p>
                    <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                      {activity.details}
                    </p>
                    <p className="text-[#00bfbf] mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate("monitoring")}
              className="w-full mt-6 rounded-xl border border-[#797979] bg-[#ececec] text-[#006d6f] px-6 py-3 hover:bg-[#006d6f] hover:text-white transition-colors"
              style={{ fontWeight: 500 }}
            >
              Ver Actividad Completa
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div
            className="bg-white rounded-2xl border border-[#ececec] p-6"
            style={{ boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.08)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Acciones Rápidas
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate("users")}
                className="w-full rounded-xl border border-[#797979] bg-[#006d6f] text-white px-4 py-3 hover:bg-[#00595a] transition-colors text-left"
                style={{ fontWeight: 500 }}
              >
                + Crear Usuario
              </button>
              <button
                onClick={() => onNavigate("courses")}
                className="w-full rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-4 py-3 hover:bg-[#00a5a5] transition-colors text-left"
                style={{ fontWeight: 500 }}
              >
                + Crear Curso
              </button>
              <button
                onClick={() => onNavigate("categories")}
                className="w-full rounded-xl border border-[#797979] bg-white text-[#006d6f] px-4 py-3 hover:bg-[#ececec] transition-colors text-left"
                style={{ fontWeight: 500 }}
              >
                + Crear Categoría
              </button>
              <button
                onClick={() => onNavigate("backups")}
                className="w-full rounded-xl border border-[#797979] bg-[#f4d7dd] text-[#333333] px-4 py-3 hover:bg-[#f0c5ce] transition-colors text-left"
                style={{ fontWeight: 500 }}
              >
                Crear Backup
              </button>
              <button
                onClick={() => onNavigate("reports")}
                className="w-full rounded-xl border border-[#797979] bg-white text-[#333333] px-4 py-3 hover:bg-[#ececec] transition-colors text-left"
                style={{ fontWeight: 500 }}
              >
                Generar Reporte
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}