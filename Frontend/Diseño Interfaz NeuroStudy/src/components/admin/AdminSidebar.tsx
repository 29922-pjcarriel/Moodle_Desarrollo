import { Logo } from "../Logo";
import { Home, Users, BookOpen, FolderTree, FileText, Wrench, LogOut, Music } from "lucide-react";

interface AdminSidebarProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({ adminName, currentView, onNavigate, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Panel de Administración", icon: Home },
    { id: "users", label: "Usuarios", icon: Users },
    { id: "courses", label: "Cursos", icon: BookOpen },
    { id: "categories", label: "Categorías", icon: FolderTree },
    { id: "soundscapes", label: "Entornos Sonoros", icon: Music },
    { id: "reports", label: "Reportes", icon: FileText },
    { id: "backups", label: "Soporte y Logs", icon: Wrench },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-[#00595a] text-white flex flex-col z-20">
      {/* Logo Section */}
      <div className="p-6 flex justify-center">
        <Logo size="sm" color="white" />
      </div>

      {/* Separator */}
      <div className="h-px bg-white/20 mx-4 mb-4"></div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#006d6f] text-white"
                  : "text-white/90 hover:bg-[#006d6f]/50"
              }`}
              style={{ 
                fontWeight: isActive ? 600 : 500,
                boxShadow: isActive ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none'
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#006d6f] flex items-center justify-center">
            <span style={{ fontWeight: 600 }}>{adminName.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <p style={{ fontWeight: 600 }}>{adminName}</p>
            <p className="text-white/70" style={{ fontWeight: 500 }}>
              Administrador
            </p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          style={{ fontWeight: 500 }}
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}