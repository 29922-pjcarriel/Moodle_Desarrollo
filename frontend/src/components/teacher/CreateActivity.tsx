import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { useState } from "react";
import { ArrowLeft, FileText, CheckSquare, BookOpen, FileIcon, Link2, Monitor } from "lucide-react";

interface CreateActivityProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onBack: () => void;
  onLogout: () => void;
}

const activityTypes = [
  { id: "quiz", label: "Quiz", icon: CheckSquare, description: "Cuestionario con preguntas" },
  { id: "task", label: "Tarea", icon: FileText, description: "Entrega de trabajo" },
  { id: "reading", label: "Lectura", icon: BookOpen, description: "Material de lectura" },
  { id: "pdf", label: "Material PDF", icon: FileIcon, description: "Documento PDF" },
  { id: "link", label: "Enlace Externo", icon: Link2, description: "Recurso externo" },
  { id: "online", label: "Actividad en Línea", icon: Monitor, description: "Actividad interactiva" },
];

export function CreateActivity({ teacherName, currentView, onNavigate, onBack, onLogout }: CreateActivityProps) {
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    openDate: "",
    closeDate: "",
    weight: "",
    parcial: "primero"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Actividad creada exitosamente");
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <TeacherNavbar 
        teacherName={teacherName} 
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontWeight: 500 }}>Volver</span>
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
            Crear Nueva Actividad
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Diseña y configura una nueva actividad para tus estudiantes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Type Selection */}
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-[#333333] mb-4" style={{ fontWeight: 600 }}>
              Seleccionar Tipo de Actividad
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activityTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      selectedType === type.id
                        ? "border-[#006d6f] bg-[#006d6f]/5"
                        : "border-[#797979] hover:border-[#00bfbf]"
                    }`}
                  >
                    <Icon
                      className="w-8 h-8 mb-3"
                      style={{ color: selectedType === type.id ? "#006d6f" : "#797979" }}
                    />
                    <h4
                      className={selectedType === type.id ? "text-[#006d6f]" : "text-[#333333]"}
                      style={{ fontWeight: 600 }}
                    >
                      {type.label}
                    </h4>
                    <p className="text-[#797979] mt-1">
                      {type.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-[#333333] mb-6" style={{ fontWeight: 600 }}>
              Información de la Actividad
            </h3>

            <div className="space-y-5">
              {/* Parcial Selection */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Parcial
                </label>
                <select
                  value={formData.parcial}
                  onChange={(e) => setFormData({ ...formData, parcial: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  style={{ fontWeight: 500 }}
                >
                  <option value="primero">Primer Parcial</option>
                  <option value="segundo">Segundo Parcial</option>
                  <option value="final">Examen Final</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Título de la Actividad
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  placeholder="Ej: Quiz sobre Procesos"
                  required
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f] min-h-[120px]"
                  placeholder="Describe la actividad, instrucciones y objetivos..."
                  required
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Duración (minutos)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  placeholder="60"
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Fecha de Apertura
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.openDate}
                    onChange={(e) => setFormData({ ...formData, openDate: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                    style={{ fontWeight: 500 }}
                  />
                </div>

                <div>
                  <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                    Fecha de Cierre
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.closeDate}
                    onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                    className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                    required
                    style={{ fontWeight: 500 }}
                  />
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Ponderación (%)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                  placeholder="20"
                  min="0"
                  max="100"
                  required
                  style={{ fontWeight: 500 }}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-[#333333] mb-2" style={{ fontWeight: 500 }}>
                  Adjuntar Archivos
                </label>
                <div className="border-2 border-dashed border-[#797979] rounded-xl p-8 text-center hover:border-[#006d6f] transition-colors cursor-pointer">
                  <FileIcon className="w-12 h-12 mx-auto mb-3 text-[#797979]" />
                  <p className="text-[#333333] mb-1" style={{ fontWeight: 500 }}>
                    Arrastra archivos aquí o haz clic para seleccionar
                  </p>
                  <p className="text-[#797979]">
                    PDF, DOCX, PPTX (máx. 10MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-4 hover:bg-[#00595a] transition-colors"
              style={{ fontWeight: 600, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              Guardar Actividad
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-[#797979] bg-white text-[#333333] px-6 py-4 hover:bg-[#ececec] transition-colors"
              style={{ fontWeight: 600, boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
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
