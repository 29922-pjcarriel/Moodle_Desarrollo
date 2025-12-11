// frontend/src/components/CourseView.tsx
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getCourseActivities } from "../lib/studentApi";

interface CourseViewProps {
  course: any;
  username: string;
  onBack: () => void;
  onSelectExam: (activity: any) => void;
}

export function CourseView({
  course,
  username,
  onBack,
  onSelectExam,
}: CourseViewProps) {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getCourseActivities(course.id_curso);
      setActivities(data);
    }
    load();
  }, [course]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Línea teal superior */}
      <div className="w-full h-1 bg-[#006d6f]"></div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Botón volver */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Volver a cursos</span>
          </button>
        </div>

        <h2 className="text-[#333333] mb-8 font-semibold">
          {course.titulo}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* IZQUIERDA — LISTA DE ACTIVIDADES */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[#333333] mb-6 font-semibold">
              Actividades Disponibles
            </h3>

            {activities.length === 0 && (
              <p className="text-gray-600 text-lg">
                No hay actividades disponibles aún.
              </p>
            )}

            <div className="space-y-4">
              {activities.map((act) => (
                <button
                  key={act.id_actividad}
                  onClick={() => onSelectExam(act)}
                  className="
                    w-full 
                    rounded-2xl 
                    border border-[#b5b5b5]
                    bg-[#ececec]
                    px-6 py-4 
                    text-[#333] 
                    hover:bg-[#e2e2e2]
                    transition-all
                  "
                  style={{
                    fontFamily: "Comic Sans MS, Poppins, sans-serif",
                    fontWeight: 500,
                    boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex justify-between items-center w-full">
                    <span>{act.titulo}</span>

                    {/* INDICADOR DE ENTORNO SONORO */}
                    {act.sonido_habilitado && (
                      <span className="text-[#006d6f] font-bold">
                        🎧 Entorno Sonoro
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DERECHA — PANEL MOTIVACIONAL */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl border border-[#797979] bg-white p-6 sticky top-8"
              style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
            >
              <div className="mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760434201620-b1a6ae947351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Motivación"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-[#333333] text-center leading-relaxed">
                  Antes de empezar tu prueba, respira profundo y confía en todo
                  lo que has aprendido.
                </p>
                <p className="text-[#333333] text-center leading-relaxed">
                  No se trata de saberlo todo, sino de dar lo mejor de ti con
                  calma y seguridad.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#ececec]">
                <p className="text-[#006d6f] text-center italic font-semibold">
                  ¡Tú puedes lograrlo! 💪
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
