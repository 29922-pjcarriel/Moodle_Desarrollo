import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { TrendingUp, Search } from "lucide-react";
import { useState } from "react";

interface StudentManagementProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Student {
  id: number;
  name: string;
  status: "active" | "pending";
  partialGrade: number | string;
  lastConnection: string;
}

const students: Student[] = [
  { id: 1, name: "Ana García Pérez", status: "active", partialGrade: 8.5, lastConnection: "Hace 2 horas" },
  { id: 2, name: "Carlos Mendoza López", status: "active", partialGrade: 7.2, lastConnection: "Hace 1 día" },
  { id: 3, name: "María Rodríguez", status: "active", partialGrade: 9.1, lastConnection: "Hace 3 horas" },
  { id: 4, name: "Juan Fernández", status: "pending", partialGrade: "-", lastConnection: "Hace 7 días" },
  { id: 5, name: "Laura Martínez", status: "active", partialGrade: 8.8, lastConnection: "Hace 5 horas" },
  { id: 6, name: "Pedro Sánchez", status: "active", partialGrade: 6.5, lastConnection: "Hace 2 días" },
  { id: 7, name: "Sofia Torres", status: "active", partialGrade: 9.5, lastConnection: "Hace 1 hora" },
  { id: 8, name: "Diego Ramírez", status: "pending", partialGrade: "-", lastConnection: "Hace 14 días" },
];

export function StudentManagement({ teacherName, currentView, onNavigate, onLogout }: StudentManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="px-3 py-1 rounded-full bg-[#d4edda] text-[#155724]" style={{ fontWeight: 500 }}>
          Activo
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full bg-[#fff3cd] text-[#856404]" style={{ fontWeight: 500 }}>
        Pendiente
      </span>
    );
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
            Gestión de Estudiantes
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Administra y realiza seguimiento a tus estudiantes
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#797979]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar estudiante..."
              className="w-full rounded-xl border border-[#797979] bg-white pl-12 pr-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
              style={{ fontWeight: 500 }}
            />
          </div>
        </div>

        {/* Students Table */}
        <div
          className="bg-white rounded-2xl border border-[#797979] overflow-hidden"
          style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#006d6f] text-white">
                <tr>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Nombre del Estudiante
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Nota Parcial
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Última Conexión
                  </th>
                  <th className="px-6 py-4 text-left" style={{ fontWeight: 600 }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-[#ececec]"}
                  >
                    <td className="px-6 py-4 text-[#333333]" style={{ fontWeight: 500 }}>
                      {student.name}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="text-[#333333]"
                        style={{ fontWeight: 600 }}
                      >
                        {student.partialGrade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#797979]" style={{ fontWeight: 500 }}>
                      {student.lastConnection}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className="flex items-center gap-2 text-[#006d6f] hover:text-[#00bfbf] px-3 py-2 rounded-lg hover:bg-white transition-colors"
                          style={{ fontWeight: 500 }}
                        >
                          <TrendingUp className="w-4 h-4" />
                          Progreso
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Total de Estudiantes
            </p>
            <p className="text-[#333333]" style={{ fontWeight: 700 }}>
              {students.length}
            </p>
          </div>

          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Estudiantes Activos
            </p>
            <p className="text-[#333333]" style={{ fontWeight: 700 }}>
              {students.filter(s => s.status === "active").length}
            </p>
          </div>

          <div
            className="bg-white rounded-2xl border border-[#797979] p-6"
            style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
          >
            <p className="text-[#797979] mb-2" style={{ fontWeight: 500 }}>
              Promedio del Grupo
            </p>
            <p className="text-[#333333]" style={{ fontWeight: 700 }}>
              8.1
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}