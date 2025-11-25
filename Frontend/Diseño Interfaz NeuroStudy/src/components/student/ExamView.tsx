import { useState } from "react";
import { StudentNavbar } from "./StudentNavbar";
import { Footer } from "../Footer";
import { Clock, AlertCircle, Send } from "lucide-react";
import { ExamSoundscapePanel } from "./ExamSoundscapePanel";

interface ExamViewProps {
  studentName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function ExamView({ studentName, currentView, onNavigate, onLogout }: ExamViewProps) {
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [answers, setAnswers] = useState<{[key: number]: string}>({});

  const questions = [
    {
      id: 1,
      question: "¿Cuál es la definición correcta de un proceso en sistemas operativos?",
      options: [
        "Un programa en ejecución",
        "Un archivo almacenado en disco",
        "Una instrucción del procesador",
        "Un dispositivo de entrada/salida"
      ]
    },
    {
      id: 2,
      question: "¿Qué algoritmo de planificación garantiza que no haya inanición?",
      options: [
        "FIFO (First In First Out)",
        "Round Robin",
        "Shortest Job First",
        "Priority Scheduling sin envejecimiento"
      ]
    },
    {
      id: 3,
      question: "¿Cuál es el propósito principal de la memoria virtual?",
      options: [
        "Aumentar la velocidad del procesador",
        "Permitir ejecutar programas más grandes que la RAM física",
        "Mejorar la seguridad del sistema",
        "Reducir el consumo de energía"
      ]
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (confirm("¿Estás seguro de enviar el examen?")) {
      alert("Examen enviado exitosamente");
      onNavigate("home");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <StudentNavbar
        studentName={studentName}
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <div
          className="bg-white rounded-2xl border border-[#797979] p-6 mb-6"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[#333333] mb-1" style={{ fontWeight: 700 }}>
                Examen: Sistemas Operativos - Primer Parcial
              </h2>
              <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                Responde todas las preguntas antes de enviar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#006d6f]" />
              <div className="text-right">
                <p className="text-[#797979]" style={{ fontWeight: 500 }}>Tiempo restante</p>
                <p className="text-[#006d6f]" style={{ fontWeight: 700 }}>
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#00bfbf]/10 border border-[#00bfbf]/30 rounded-xl p-3">
            <AlertCircle className="w-5 h-5 text-[#006d6f]" />
            <p className="text-[#333333]" style={{ fontWeight: 500 }}>
              El examen se enviará automáticamente cuando se agote el tiempo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Questions Column */}
          <div className="lg:col-span-2 space-y-6">
            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-[#797979] p-6"
                style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
              >
                <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
                  Pregunta {q.id}
                </h3>
                <p className="text-[#333333] mb-5" style={{ fontWeight: 500 }}>
                  {q.question}
                </p>

                <div className="space-y-3">
                  {q.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        answers[q.id] === option
                          ? "border-[#006d6f] bg-[#006d6f]/5"
                          : "border-[#797979] hover:border-[#00bfbf]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={option}
                        checked={answers[q.id] === option}
                        onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        className="w-5 h-5 text-[#006d6f] focus:ring-[#006d6f]"
                      />
                      <span
                        className={answers[q.id] === option ? "text-[#006d6f]" : "text-[#333333]"}
                        style={{ fontWeight: 500 }}
                      >
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-4 hover:bg-[#00595a] transition-colors"
              style={{ fontWeight: 600, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              <Send className="w-5 h-5" />
              Enviar Examen
            </button>
          </div>

          {/* Soundscape Panel Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ExamSoundscapePanel
                soundscapeEnabled={true}
                soundscapeName="Lluvia Suave"
                soundscapeCategory="Naturaleza"
                soundscapeImage="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400"
                allowCustomization={true}
                antiAnxietyMode={true}
                initialVolume={70}
                initialIntensity={60}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
