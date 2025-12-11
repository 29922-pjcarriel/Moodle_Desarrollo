// frontend/src/components/student/ExamView.tsx

import { useEffect, useState } from "react";
import { StudentNavbar } from "./StudentNavbar";
import { Footer } from "../Footer";
import { Clock, AlertCircle, Send } from "lucide-react";
import { ExamSoundscapePanel } from "./ExamSoundscapePanel";
import { 
  getActivityQuestions,
  getStudentByUsername,
  createExamAttempt,
  submitExamAttempt
} from "../../lib/studentApi";

import { useAttentionStream } from "../../hooks/useAttentionStream";
import { AttentionPanel } from "./AttentionPanel";



interface ExamViewProps {
  studentName: string;
  activity: any;
  soundEnabled: boolean;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Question {
  id_pregunta: number;
  enunciado: string;
  tipo: string;
  puntaje: number;
  opciones_respuesta: {
    id_opcion: number;
    texto: string;
    es_correcta: boolean;
  }[];
}

export function ExamView({
  studentName,
  activity,
  soundEnabled,
  currentView,
  onNavigate,
  onLogout,
}: ExamViewProps) {

  const [timeRemaining, setTimeRemaining] = useState(
    (activity?.duracion_minutos ?? 45) * 60
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

  const [studentId, setStudentId] = useState<string | null>(null);
  const [attemptId, setAttemptId] = useState<number | null>(null);

  /* ============================================================
     1) Obtener estudiante REAL y crear intento
  ============================================================ */
  useEffect(() => {
    async function initAttempt() {
      if (!activity?.id_actividad) return;

      // Obtener estudiante
      const student = await getStudentByUsername(studentName);
      if (!student) return;

      setStudentId(student.id);

      // Crear intento de examen
      const attempt = await createExamAttempt(activity.id_actividad, student.id);
      if (attempt) {
        setAttemptId(attempt.id_intento);
      }
    }

    initAttempt();
  }, [activity, studentName]);


  /* 2) Cargar preguntas reales */
  useEffect(() => {
    async function loadQuestions() {
      if (!activity?.id_actividad) return;

      setLoadingQuestions(true);
      const data = await getActivityQuestions(activity.id_actividad);
      setQuestions(data as Question[]);
      setLoadingQuestions(false);
    }

    loadQuestions();
  }, [activity]);

  /* 3) Timer (simple) */
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* ============================================================
     4) Enviar examen y guardar resultados
  ============================================================ */
  const handleSubmit = async () => {
    if (!attemptId || !studentId) {
      alert("No se pudo iniciar el intento del examen.");
      return;
    }

    if (confirm("¿Estás seguro de enviar el examen?")) {

      // 🔥 NUEVO: llamar a la función completa con activityId y userId
      const result = await submitExamAttempt(
        attemptId,
        activity.id_actividad,
        studentId,
        answers
      );

      alert(
        `Examen enviado correctamente.\nTu calificación: ${result?.score}/${result?.total} (${result?.porcentaje}%)`
      );

      onNavigate("results");
    }
  };

  const { videoRef, result } = useAttentionStream(
    localStorage.getItem("attentionActive") === "true"
  );



  /* ============================================================
     UI COMPLETA (NO SE MODIFICÓ NADA)
  ============================================================ */
  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <StudentNavbar
        username={studentName}
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout} 
      />

      {/* Cámara oculta (necesaria para capturar frames) */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ display: "none" }}
      />


      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <div
          className="bg-white rounded-2xl border border-[#797979] p-6 mb-6"
          style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-[#333333] mb-1"
                style={{ fontWeight: 700 }}
              >
                Examen: {activity?.titulo ?? "Actividad"}
              </h2>
              <p
                className="text-[#797979]"
                style={{ fontWeight: 500 }}
              >
                Responde todas las preguntas antes de enviar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#006d6f]" />
              <div className="text-right">
                <p
                  className="text-[#797979]"
                  style={{ fontWeight: 500 }}
                >
                  Tiempo restante
                </p>
                <p
                  className="text-[#006d6f]"
                  style={{ fontWeight: 700 }}
                >
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#00bfbf]/10 border border-[#00bfbf]/30 rounded-xl p-3">
            <AlertCircle className="w-5 h-5 text-[#006d6f]" />
            <p
              className="text-[#333333]"
              style={{ fontWeight: 500 }}
            >
              El examen se enviará automáticamente cuando se agote el tiempo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna de preguntas */}
          <div className="lg:col-span-2 space-y-6">
            {loadingQuestions && (
              <p className="text-[#333333]">Cargando preguntas...</p>
            )}

            {!loadingQuestions && questions.length === 0 && (
              <p className="text-[#333333]">No hay preguntas registradas para esta actividad.</p>
            )}

            {questions.map((q, idx) => (
              <div
                key={q.id_pregunta}
                className="bg-white rounded-2xl border border-[#797979] p-6"
                style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)" }}
              >
                <h3
                  className="text-[#333333] mb-4"
                  style={{ fontWeight: 600 }}
                >
                  Pregunta {idx + 1}
                </h3>
                <p
                  className="text-[#333333] mb-5"
                  style={{ fontWeight: 500 }}
                >
                  {q.enunciado}
                </p>

                <div className="space-y-3">
                  {q.opciones_respuesta?.map((opt) => (
                    <label
                      key={opt.id_opcion}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        answers[q.id_pregunta] === opt.id_opcion
                          ? "border-[#006d6f] bg-[#006d6f]/5"
                          : "border-[#797979] hover:border-[#00bfbf]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id_pregunta}`}
                        value={opt.id_opcion}
                        checked={answers[q.id_pregunta] === opt.id_opcion}
                        onChange={() =>
                          setAnswers({
                            ...answers,
                            [q.id_pregunta]: opt.id_opcion,
                          })
                        }
                        className="w-5 h-5 text-[#006d6f] focus:ring-[#006d6f]"
                      />
                      <span
                        className={
                          answers[q.id_pregunta] === opt.id_opcion
                            ? "text-[#006d6f]"
                            : "text-[#333333]"
                        }
                        style={{ fontWeight: 500 }}
                      >
                        {opt.texto}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Botón enviar */}
            {questions.length > 0 && (
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-4 hover:bg-[#00595a] transition-colors"
                style={{
                  fontWeight: 600,
                  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Send className="w-5 h-5" />
                Enviar Examen
              </button>
            )}
          </div>

          {/* Panel de sonido durante el examen */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              
              {/* SIN sonido: mostrar solo el panel de atención */}
              {!soundEnabled && (
                <AttentionPanel data={result} />
              )}

              {/* CON sonido: panel de sonido + panel de atención */}
              {soundEnabled && (
                <>
                  <ExamSoundscapePanel
                    soundscapeEnabled={true}
                    soundscapeName="Entorno Sonoro"
                    soundscapeCategory="Personalizado"
                    soundscapeImage="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=400"
                    allowCustomization={true}
                    antiAnxietyMode={true}
                    initialVolume={70}
                    initialIntensity={60}
                  />

                  <AttentionPanel data={result} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
