import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

interface StudentHomeProps {
  username: string;
}

export function StudentHome({ username }: StudentHomeProps) {
  const instructions = [
    "Lee cuidadosamente todas las indicaciones antes de comenzar cualquier actividad.",
    "Asegúrate de tener una conexión estable a internet durante toda la sesión.",
    "Completa cada módulo en el orden sugerido para un mejor aprovechamiento.",
    "Utiliza los recursos adicionales disponibles en cada curso.",
    "Si tienes dudas, consulta con tu tutor o utiliza el foro de discusión.",
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-[#006d6f] mb-2" style={{ fontWeight: 700 }}>
          Bienvenido, {username}
        </h1>
        <p className="text-[#666666]">
          Selecciona una opción del menú para continuar.
        </p>
      </div>

      {/* Instructions Card */}
      <div 
        className="rounded-2xl border border-[#797979] bg-white p-8 relative overflow-hidden"
        style={{ boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.08)' }}
      >
        <div className="flex items-start gap-8">
          {/* Instructions List */}
          <div className="flex-1 space-y-4">
            <h3 className="text-[#006d6f] mb-6" style={{ fontWeight: 600 }}>
              Indicaciones Importantes
            </h3>
            
            <div className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="min-w-8 h-8 rounded-full bg-[#00bfbf] text-white flex items-center justify-center"
                    style={{ fontWeight: 600 }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-[#333333] pt-1">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Robot Assistant */}
          <div className="flex flex-col items-center gap-4 w-64">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#b6dfe8] to-[#eafafb] flex items-center justify-center overflow-hidden border-4 border-[#00bfbf]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1655923570951-fd93db1152e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMHJvYm90JTIwYXNzaXN0YW50fGVufDF8fHx8MTc2Mzc2NTY4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Robot Assistant"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div 
              className="bg-[#006d6f] text-white rounded-2xl p-4 relative"
              style={{ boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.15)' }}
            >
              {/* Speech bubble arrow */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#006d6f]"></div>
              
              <p className="text-center text-sm">
                <span style={{ fontWeight: 600 }}>¡Estoy aquí para apoyarte!</span>
                <br />
                Lee bien las indicaciones antes de comenzar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
