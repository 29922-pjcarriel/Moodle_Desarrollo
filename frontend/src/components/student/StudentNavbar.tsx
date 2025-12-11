import { 
  User, 
  BookOpen, 
  BarChart3, 
  LogOut
} from "lucide-react";

interface StudentNavbarProps {
  username: string;
  currentView: string;  // 👈 antes era restringido, ahora acepta cualquier vista
  onNavigate: (view: string) => void; 
  onLogout: () => void;
}

export function StudentNavbar({ username, currentView, onNavigate, onLogout }: StudentNavbarProps) {
  return (
    <nav className="bg-[#00595a] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#006d6f] text-xl font-bold">N</span>
          </div>
          <span className="text-2xl font-bold">NeuroStudy</span>
        </div>

        {/* Items */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate("courses")}
            className={`flex items-center gap-2 transition-colors ${
              currentView === "courses" || currentView === "course-detail" 
                ? "text-[#00bfbf]" 
                : "hover:text-[#00bfbf]"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">Cursos</span>
          </button>

          <button 
            onClick={() => onNavigate("results")}
            className={`flex items-center gap-2 transition-colors ${
              currentView === "results" 
                ? "text-[#00bfbf]" 
                : "hover:text-[#00bfbf]"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Resultados</span>
          </button>

          <div className="flex items-center gap-3 ml-4">
            <button 
              onClick={() => onNavigate("home")}
              className="w-10 h-10 rounded-full bg-[#00bfbf] border-2 border-white flex items-center justify-center hover:bg-[#00a5a5] transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </button>
            <span className="font-medium">{username}</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 hover:text-red-300 transition-colors ml-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Salir</span>
          </button>
        </div>

      </div>
    </nav>
  );
}
