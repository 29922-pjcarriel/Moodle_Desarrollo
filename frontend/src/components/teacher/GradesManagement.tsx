import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { Download, MessageSquare, Search } from "lucide-react";
import { useState } from "react";

interface GradesManagementProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Grade {
  id: number;
  studentName: string;
  activity: string;
  grade: number | string;
  status: "graded" | "pending" | "submitted";
  feedback: string;
}

const grades: Grade[] = [
  { id: 1, studentName: "Ana García Pérez", activity: "Quiz Unidad 1", grade: 8.5, status: "graded", feedback: "Excelente trabajo" },
  { id: 2, studentName: "Carlos Mendoza López", activity: "Quiz Unidad 1", grade: 7.2, status: "graded", feedback: "Buen esfuerzo" },
  { id: 3, studentName: "María Rodríguez", activity: "Quiz Unidad 1", grade: 9.1, status: "graded", feedback: "Sobresaliente" },
  { id: 4, studentName: "Juan Fernández", activity: "Quiz Unidad 1", grade: "-", status: "pending", feedback: "" },
  { id: 5, studentName: "Laura Martínez", activity: "Tarea 1", grade: "-", status: "submitted", feedback: "" },
  { id: 6, studentName: "Pedro Sánchez", activity: "Tarea 1", grade: "-", status: "submitted", feedback: "" },
];

export function GradesManagement({ teacherName, currentView, onNavigate, onLogout }: GradesManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGrades = grades.filter(grade =>
    grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.activity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      graded: { bg: "#d4edda", text: "#155724", label: "Calificada" },
      submitted: { bg: "#d1ecf1", text: "#0c5460", label: "Entregada" },
      pending: { bg: "#fff3cd", text: "#856404", label: "Pendiente" }
    };
    const style = styles[status as keyof typeof styles];
    return (
      <span
        className="px-3 py-1 rounded-full"
        style={{ backgroundColor: style.bg, color: style.text, fontWeight: 500 }}
      >
        {style.label}
      </span>
    );
  };

  const handleExportExcel = () => {
    alert("Exportando calificaciones a Excel...");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <TeacherNavbar 
        teacherName={teacherName} 
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-[#333333] mb-2" style={{ fontWeight: 700 }}>
            Gestión de Calificaciones
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Califica actividades y proporciona retroalimentación a tus estudiantes
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#797979]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por estudiante o actividad..."
              className="w-full rounded-xl border border-[#797979] bg-white pl-12 pr-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
              style={{ fontWeight: 500 }}
            />
          </div>

          <button
            onClick={handleExportExcel}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors whitespace-nowrap"
            style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </button>
        </div>

        {/* Grades Table */}
        <div
          className="bg-white rounded-2xl border border-[#797979] overflow-hidden mb-6"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#006d6f] text-white">
                <tr>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Estudiante
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Actividad
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Nota
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Retroalimentación
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade, index) => (
                  <tr
                    key={grade.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#ececec]"}
                  >
                    <td className="px-6 py-4 text-[#333333]" style={{ fontWeight: 500 }}>
                      {grade.studentName}
                    </td>
                    <td className="px-6 py-4 text-[#333333]" style={{ fontWeight: 500 }}>
                      {grade.activity}
                    </td>
                    <td className="px-6 py-4">
                      {grade.status === "graded" ? (
                        <span className="text-[#333333]" style={{ fontWeight: 700 }}>
                          {grade.grade}
                        </span>
                      ) : grade.status === "submitted" ? (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          placeholder="Nota"
                          className="w-20 rounded-lg border border-[#797979] bg-white px-3 py-1 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                          style={{ fontWeight: 500 }}
                        />
                      ) : (
                        <span className="text-[#797979]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(grade.status)}
                    </td>
                    <td className="px-6 py-4">
                      {grade.feedback ? (
                        <span className="text-[#333333]" style={{ fontWeight: 500 }}>
                          {grade.feedback}
                        </span>
                      ) : (
                        <input
                          type="text"
                          placeholder="Agregar comentario..."
                          className="w-full rounded-lg border border-[#797979] bg-white px-3 py-1 text-[#333333] focus:outline-none focus:border-[#006d6f]"
                          style={{ fontWeight: 500 }}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {grade.status !== "graded" && (
                        <button
                          className="rounded-lg bg-[#00bfbf] text-white px-4 py-2 hover:bg-[#00a5a5] transition-colors"
                          style={{ fontWeight: 500 }}
                          onClick={() => alert("Calificación guardada")}
                        >
                          Guardar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Feedback Section */}
        <div
          className="bg-white rounded-2xl border border-[#797979] p-6"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-[#006d6f]" />
            <h3 className="text-[#333333]" style={{ fontWeight: 600 }}>
              Retroalimentación General
            </h3>
          </div>

          <textarea
            placeholder="Escribe un comentario general para todos los estudiantes sobre esta actividad..."
            className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f] min-h-[120px] mb-4"
            style={{ fontWeight: 500 }}
          />

          <button
            className="rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] transition-colors"
            style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
            onClick={() => alert("Retroalimentación enviada a todos los estudiantes")}
          >
            Enviar Retroalimentación General
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
