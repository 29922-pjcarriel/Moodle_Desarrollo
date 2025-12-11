import { Logo } from "../Logo";
import { BookOpen, PlusCircle, Award, User, LogOut } from "lucide-react";

interface TeacherNavbarProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function TeacherNavbar({ teacherName, currentView, onNavigate, onLogout }: TeacherNavbarProps) {
  const navItems = [
    { id: "courses", label: "Mis Cursos", icon: BookOpen },
    { id: "create", label: "Crear Actividades", icon: PlusCircle },
    { id: "grades", label: "Calificaciones", icon: Award },
  ];

  return (
    <nav className="bg-[#006d6f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size="sm" color="white" />
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentView === item.id
                      ? "bg-[#00595a]"
                      : "hover:bg-[#00595a]/50"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#00595a]/50 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">{teacherName}</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-600/80 transition-colors"
              style={{ fontWeight: 500 }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}