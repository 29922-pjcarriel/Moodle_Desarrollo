import { Bell, Mail, LogOut } from "lucide-react";

interface AdminTopBarProps {
  adminName: string;
  onLogout: () => void;
}

export function AdminTopBar({ adminName, onLogout }: AdminTopBarProps) {
  return (
    <div className="fixed top-0 left-[220px] right-0 h-16 bg-white border-b border-[#ececec] flex items-center justify-end px-6 z-10"
      style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)' }}>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-[#ececec] transition-colors"
          title="Notificaciones"
        >
          <Bell className="w-5 h-5 text-[#333333]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Messages */}
        <button 
          className="relative p-2 rounded-lg hover:bg-[#ececec] transition-colors"
          title="Mensajes"
        >
          <Mail className="w-5 h-5 text-[#333333]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Separator */}
        <div className="h-8 w-px bg-[#ececec]"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#006d6f] flex items-center justify-center">
            <span className="text-white" style={{ fontWeight: 600 }}>
              {adminName.charAt(0)}
            </span>
          </div>
          <span className="text-[#333333]" style={{ fontWeight: 500 }}>
            {adminName}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
          title="Cerrar Sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}