// frontend/src/components/teacher/CreateActivity.tsx

import { useState } from "react";
import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { ArrowLeft, CheckSquare, FileIcon } from "lucide-react";

import { SoundscapeConfigTeacher } from "./SoundscapeConfigTeacher";

import {
  createActivity,
  uploadQuestionsFile,
  readFileText,
  parseQuestions,
  createQuestions,
  attachBankToActivity,
} from "../../lib/teacherApi";

interface CreateActivityProps {
  teacherId: string;
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

/* SOLO QUIZ POR AHORA */
const activityTypes = [
  {
    id: "quiz",
    label: "Quiz",
    icon: CheckSquare,
    description: "Cuestionario con preguntas",
    enabled: true,
  },
  {
    id: "task",
    label: "Tarea",
    icon: FileIcon,
    description: "Entrega de trabajo",
    enabled: false,
  },
  {
    id: "reading",
    label: "Lectura",
    icon: FileIcon,
    description: "Material de lectura",
    enabled: false,
  },
  {
    id: "pdf",
    label: "Material PDF",
    icon: FileIcon,
    description: "Documento PDF",
    enabled: false,
  },
];

export function CreateActivity({
  teacherId,
  teacherName,
  currentView,
  onNavigate,
  onBack,
  onLogout,
}: CreateActivityProps) {

  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [preguntasFile, setPreguntasFile] = useState<File | null>(null);

  // 👇 Nuevo estado para activar/desactivar entorno sonoro
  const [soundEnabled, setSoundEnabled] = useState(false);

  const courseId = sessionStorage.getItem("selectedCourseId") ?? "";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    openDate: "",
    closeDate: "",
    weight: "",
  });

  /* ============================================================
     CARGAR ARCHIVO TXT
  ============================================================ */
  const handleFileUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".txt")) {
      alert("Solo se aceptan archivos .txt");
      return;
    }

    setPreguntasFile(file);
  };

  /* ============================================================
     GUARDAR ACTIVIDAD COMPLETA
  ============================================================ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedType) {
      alert("Debe seleccionar un tipo de actividad.");
      return;
    }

    if (!teacherId || !courseId) {
      alert("Error: profesor o curso inválido.");
      return;
    }

    if (selectedType === "quiz" && !preguntasFile) {
      alert("Debe subir un archivo .txt con preguntas.");
      return;
    }

    setLoading(true);

    const fixDate = (v: string) => (v ? new Date(v).toISOString() : null);

    /* 1️⃣ Crear actividad */
    const payload = {
      curso_id: courseId,
      parcial_id: null,
      tipo: selectedType,
      titulo: formData.title,
      descripcion: formData.description,
      duracion_minutos: formData.duration ? Number(formData.duration) : null,
      fecha_apertura: fixDate(formData.openDate),
      fecha_cierre: fixDate(formData.closeDate),
      ponderacion: formData.weight ? Number(formData.weight) : null,
      creado_por: teacherId,

      // 👇 SE GUARDA AQUÍ EL VALOR DEL ENTORNO SONORO
      sonido_habilitado: soundEnabled
    };

    const actividad = await createActivity(payload);

    if (!actividad) {
      alert("❌ No se pudo crear la actividad.");
      setLoading(false);
      return;
    }

    const actividadId = actividad.id_actividad;

    /* ============================================================
       2️⃣ SUBIR ARCHIVO TXT (solo si es quiz)
    ============================================================ */
    if (selectedType === "quiz" && preguntasFile) {
      const filePath = await uploadQuestionsFile(courseId, actividadId, preguntasFile);

      if (!filePath) {
        alert("❌ Error subiendo archivo TXT.");
        setLoading(false);
        return;
      }

      // Guardar url pública en la actividad
      await attachBankToActivity(actividadId, filePath);

      /* 3️⃣ Leer archivo localmente */
      const txt = await readFileText(preguntasFile);

      if (!txt) {
        alert("❌ Error leyendo el archivo TXT.");
        setLoading(false);
        return;
      }

      /* 4️⃣ Parsear texto */
      const parsed = parseQuestions(txt);

      if (!parsed.length) {
        alert("❌ No se encontraron preguntas en el archivo.");
        setLoading(false);
        return;
      }

      /* 5️⃣ Crear preguntas en la base */
      await createQuestions(actividadId, parsed);
    }

    setLoading(false);
    alert("🎉 Actividad creada correctamente.");
    onBack();
  };

  /* ============================================================
     UI
  ============================================================ */
  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <TeacherNavbar
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-8">

        {/* Volver */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        {/* Título */}
        <h2 className="text-3xl font-bold text-[#333] mb-1">Crear Nueva Actividad</h2>
        <p className="text-[#006d6f] font-medium mb-8">
          Diseña y configura una nueva actividad para tus estudiantes
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Tipos */}
          <div className="bg-white p-6 rounded-2xl border border-[#797979] shadow">
            <h3 className="font-semibold text-[#333] mb-4">Tipo de Actividad</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activityTypes.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={!t.enabled}
                    onClick={() => t.enabled && setSelectedType(t.id)}
                    className={`
                      rounded-xl border-2 p-4 transition-all text-left
                      ${!t.enabled ? "opacity-40 cursor-not-allowed" : "hover:border-[#00bfbf]"}
                      ${selectedType === t.id ? "border-[#006d6f] bg-[#006d6f]/10" : "border-[#797979]"}
                    `}
                  >
                    <Icon className="w-8 h-8 mb-3" />
                    <h4 className="font-semibold">{t.label}</h4>
                    <p className="text-sm text-[#797979]">{t.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Información */}
          <div className="bg-white p-6 rounded-2xl border border-[#797979] shadow">
            <h3 className="font-semibold text-[#333] mb-6">Información General</h3>

            <div className="space-y-5">

              {/* Título */}
              <div>
                <label className="font-medium mb-2 block">Título</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border px-4 py-3 bg-[#ececec]"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="font-medium mb-2 block">Descripción</label>
                <textarea
                  required
                  className="w-full rounded-xl border px-4 py-3 bg-[#ececec] min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Duración */}
              <div>
                <label className="font-medium mb-2 block">Duración (minutos)</label>
                <input
                  type="number"
                  className="w-full rounded-xl border px-4 py-3 bg-[#ececec]"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-2 block">Fecha Apertura</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border px-4 py-3 bg-[#ececec]"
                    value={formData.openDate}
                    onChange={(e) => setFormData({ ...formData, openDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">Fecha Cierre</label>
                  <input
                    type="datetime-local"
                    className="w-full rounded-xl border px-4 py-3 bg-[#ececec]"
                    value={formData.closeDate}
                    onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Ponderación */}
              <div>
                <label className="font-medium mb-2 block">Ponderación (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="w-full rounded-xl border px-4 py-3 bg-[#ececec]"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>

              {/* Subir archivo TXT */}
              {selectedType === "quiz" && (
                <div>
                  <label className="font-medium mb-2 block">Banco de Preguntas (.txt)</label>
                  <div
                    className="border-2 border-dashed border-[#797979] rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50"
                    onClick={() => document.getElementById("txtFile")?.click()}
                  >
                    <FileIcon className="w-12 h-12 mx-auto text-[#797979] mb-3" />
                    <p className="text-[#333] font-medium">Haz clic para cargar archivo</p>
                  </div>

                  <input
                    id="txtFile"
                    type="file"
                    accept=".txt"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  {preguntasFile && (
                    <p className="text-green-700 mt-2 font-semibold">
                      Archivo: {preguntasFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SONIDO — AHORA CONECTADO CORRECTAMENTE */}
          {(selectedType === "quiz" || selectedType === "online") && (
            <SoundscapeConfigTeacher 
              value={soundEnabled}
              onChange={setSoundEnabled}
            />
          )}

          {/* Botones */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#006d6f] text-white py-4 rounded-xl font-semibold"
            >
              {loading ? "Guardando..." : "Guardar Actividad"}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="bg-white py-4 px-6 rounded-xl border border-[#797979]"
            >
              Cancelar
            </button>
          </div>

        </form>
      </main>

      <Footer />
    </div>
  );
}
