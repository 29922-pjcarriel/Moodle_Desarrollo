import { Logo } from "../Logo";
import { Users, BookOpen, FolderTree, Shield, Activity, FileText, Settings, Database, User, LogOut } from "lucide-react";

interface AdminNavbarProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function AdminNavbar({ adminName, currentView, onNavigate, onLogout }: AdminNavbarProps) {
  const navItems = [
    { id: "users", label: "Usuarios", icon: Users },
    { id: "courses", label: "Cursos", icon: BookOpen },
    { id: "categories", label: "Categorías", icon: FolderTree },
    { id: "roles", label: "Roles y Permisos", icon: Shield },
    { id: "monitoring", label: "Monitoreo", icon: Activity },
    { id: "reports", label: "Reportes", icon: FileText },
    { id: "settings", label: "Ajustes", icon: Settings },
    { id: "backups", label: "Backups", icon: Database },
  ];

  return (
    <nav className="bg-[#006d6f] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size="sm" color="white" />
            <span className="text-white/80" style={{ fontWeight: 500 }}>Panel de Administración</span>
          </div>

          {/* Navigation Items - Scrollable on mobile */}
          <div className="hidden md:flex items-center gap-4 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    currentView === item.id
                      ? "bg-[#00595a]"
                      : "hover:bg-[#00595a]/50"
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
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
              <span className="hidden lg:inline">{adminName}</span>
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
