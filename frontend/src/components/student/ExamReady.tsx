import { ArrowLeft, Brain } from "lucide-react";
import { Footer } from "../Footer";
/*import { useAttentionStream } from "../../hooks/useAttentionStream";*/

interface ExamReadyProps {
  courseTitle: string;
  examTitle: string;
  onBack: () => void;
  onStartExam: () => void;
}

export function ExamReady({
  courseTitle,
  examTitle,
  onBack,
  onStartExam,
}: ExamReadyProps) {


  /*
  // Activa la cámara solo si attentionActive = true
  const { videoRef, result } = useAttentionStream(
    localStorage.getItem("attentionActive") === "true"
  );*/


  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
            
      
      {/* Línea teal superior */}
      <div className="w-full h-1 bg-[#006d6f]"></div>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        {/* Botón volver */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Volver</span>
          </button>
        </div>

        {/* Tarjeta principal */}
        <div
          className="rounded-2xl border border-[#cccccc] bg-white p-8 text-center"
          style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#006d6f] to-[#00bfbf] flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-[#006d6f] mb-2" style={{ fontWeight: 700 }}>
            Preparado para empezar tu examen
          </h1>

          <p className="text-[#666666] mb-4 max-w-2xl mx-auto">
            Lee las instrucciones cuidadosamente y comienza cuando estés listo.
          </p>

          <div className="mb-6 flex items-center justify-center gap-2 text-sm">
            <span style={{ fontWeight: 600, color: "#006d6f" }}>
              {courseTitle}
            </span>
            <span className="text-[#999999]">•</span>
            <span className="text-[#666666]">{examTitle}</span>
          </div>

          <div
            className="rounded-xl bg-[#f8f9fa] p-6 mb-8 text-left"
            style={{ boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.05)" }}
          >
            <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
              Instrucciones del Examen
            </h3>
            <ul className="space-y-3 text-[#666666] text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#00bfbf]">✓</span>
                <span>Asegúrate de tener una conexión estable a internet.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00bfbf]">✓</span>
                <span>Lee cada pregunta cuidadosamente antes de responder.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00bfbf]">✓</span>
                <span>Puedes navegar entre preguntas durante el examen.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00bfbf]">✓</span>
                <span>
                  Recuerda guardar y enviar tus respuestas antes de finalizar.
                </span>
              </li>
            </ul>
          </div>

          <div
            className="rounded-xl p-4 mb-8"
            style={{
              background: "linear-gradient(135deg, #e8f5f5 0%, #f0f9ff 100%)",
              border: "2px solid #00bfbf",
            }}
          >
            <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
              🚀 ¡Tú puedes! Respira profundo, mantén la calma y confía en tu
              preparación.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBack}
              className="rounded-2xl border-2 border-[#797979] bg-white px-8 py-4 text-[#333333] hover:bg-[#f5f5f5] transition-colors"
              style={{
                fontWeight: 600,
                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.08)",
              }}
            >
              Volver
            </button>
            <button
              onClick={() => {
                localStorage.setItem("attentionActive", "true");
                onStartExam();
              }}
              className="rounded-2xl border border-[#006d6f] bg-[#006d6f] px-8 py-4 text-white hover:bg-[#005555]"
            >
              Iniciar Examen
            </button>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
