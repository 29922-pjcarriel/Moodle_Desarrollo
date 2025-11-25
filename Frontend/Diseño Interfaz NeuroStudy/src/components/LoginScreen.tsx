import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Logo } from "./Logo";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eye, EyeOff } from "lucide-react";

interface LoginScreenProps {
  onLogin: (username: string, role: "student" | "teacher" | "admin") => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ==========================================================
  // MANEJO REAL DEL LOGIN CON SUPABASE
  // ==========================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Debe ingresar usuario y contraseña");
      return;
    }

    // 1. Buscar usuario real en tu tabla "usuarios"
    const { data: userRecord, error: userError } = await supabase
      .from("usuarios")
      .select("id, username, password, rol_id, roles:rol_id ( nombre )")
      .eq("username", username.trim())
      .single();

    if (userError || !userRecord) {
      console.error("Error al buscar usuario:", userError);
      alert("Usuario no encontrado");
      return;
    }

    // 2. Validar contraseña (texto plano en modo desarrollo)
    if (userRecord.password !== password.trim()) {
      alert("Contraseña incorrecta");
      return;
    }

    // 3. Obtener el rol real desde la relación
    const rawRole =
      Array.isArray(userRecord.roles)
        ? userRecord.roles[0]?.nombre
        : (userRecord.roles as any)?.nombre;

    if (!rawRole) {
      alert("No se pudo determinar el rol del usuario");
      return;
    }

    // 4. Mapeo explícito de BD → Frontend
    let realRole: "student" | "teacher" | "admin";

    switch (rawRole) {
      case "ADMIN":
        realRole = "admin";
        break;
      case "TEACHER":
        realRole = "teacher";
        break;
      case "STUDENT":
        realRole = "student";
        break;
      default:
        alert(`Rol no soportado: ${rawRole}`);
        return;
    }

    // 5. Enviar username y rol a App.tsx
    onLogin(userRecord.username, realRole);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Technological Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#006d6f] to-[#00bfbf] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1760842543713-108c3cadbba1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWl0JTIwdGVjaG5vbG9neSUyMGRpZ2l0YWx8ZW58MXx8fHwxNzYzNzY1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Circuit Technology"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Abstract Decorative Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 border-4 border-white/20 rounded-full animate-pulse"></div>
          <div className="absolute w-64 h-64 border-4 border-white/30 rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="text-center space-y-6">
            <h1 className="text-5xl" style={{ fontWeight: 700 }}>
              Bienvenido a
            </h1>
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>
            <p className="text-xl opacity-90">Plataforma Educativa Inteligente</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#ececec]">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Logo size="lg" />
          </div>

          {/* Login Panel */}
          <div
            className="bg-[#d7d7d7] bg-opacity-80 backdrop-blur-sm rounded-3xl p-10 border border-[#797979]"
            style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex justify-center mb-6 lg:mb-8">
              <Logo size="md" />
            </div>

            <h2 className="text-center text-[#333333] mb-8">Iniciar Sesión</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Usuario */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm text-[#333333]">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Coloque su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-[#797979] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00bfbf] transition-all"
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm text-[#333333]">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Coloque su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#797979] px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#00bfbf] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#797979] hover:text-[#333333] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Recuperar contraseña */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-[#006d6f] hover:text-[#00bfbf] transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  ¿Has olvidado tu contraseña?
                </a>
              </div>

              {/* Botón login */}
              <button
                type="submit"
                className="w-full rounded-full px-6 py-3 border-2 border-[#797979] bg-white hover:bg-[#006d6f] hover:text-white hover:border-[#006d6f] transition-all duration-300"
                style={{ fontWeight: 500 }}
              >
                Iniciar sesión
              </button>
            </form>
          </div>

          <p className="text-center mt-6 text-sm text-[#333333]">
            © 2025 NeuroStudy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
