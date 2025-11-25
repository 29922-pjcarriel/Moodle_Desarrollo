import { 
  User, 
  BookOpen, 
  BarChart3, 
  LogOut
} from "lucide-react";

interface StudentNavbarProps {
  username: string;
  currentView: "home" | "courses" | "results" | "course-detail";
  onNavigate: (view: "home" | "courses" | "results") => void;
  onLogout: () => void;
}

export function StudentNavbar({ username, currentView, onNavigate, onLogout }: StudentNavbarProps) {
  return (
    <nav className="bg-[#00595a] text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-[#006d6f] text-xl" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
                N
              </span>
            </div>
            <span className="text-2xl tracking-tight text-white" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
              NeuroStudy
            </span>
          </div>
        </div>

        {/* Navigation Items */}
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
            <span style={{ fontWeight: 500 }}>Cursos</span>
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
            <span style={{ fontWeight: 500 }}>Resultados</span>
          </button>

          <div className="flex items-center gap-3 ml-4">
            <button 
              onClick={() => onNavigate("home")}
              className="w-10 h-10 rounded-full bg-[#00bfbf] flex items-center justify-center border-2 border-white hover:bg-[#00a5a5] transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </button>
            <span style={{ fontWeight: 500 }}>{username}</span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 hover:text-red-300 transition-colors ml-2"
          >
            <LogOut className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Salir</span>
          </button>
        </div>
      </div>
    </nav>
  );
}