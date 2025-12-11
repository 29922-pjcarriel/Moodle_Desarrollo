import { useEffect, useMemo, useState } from "react";
import {
  getAdminCourses,
  getActiveStudents,
  getCourseEnrollments,
  setCourseEnrollments,
} from "../../lib/adminApi";
import { Users, UserPlus, CheckCircle2 } from "lucide-react";

interface AdminCourseEnrollmentProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface Course {
  id_curso: string;
  titulo: string;
}

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export function AdminCourseEnrollment({
  adminName,
}: AdminCourseEnrollmentProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // --------------------------------------------------------
  // Cargar cursos y estudiantes al entrar al módulo
  // --------------------------------------------------------
  useEffect(() => {
    const loadCourses = async () => {
      setLoadingCourses(true);
      const data = await getAdminCourses();
      setCourses(data);
      setLoadingCourses(false);
    };

    const loadStudents = async () => {
      setLoadingStudents(true);
      const data = await getActiveStudents();
      setStudents(data);
      setLoadingStudents(false);
    };

    loadCourses();
    loadStudents();
  }, []);

  // --------------------------------------------------------
  // Cuando cambio de curso, cargo sus matrículas
  // --------------------------------------------------------
  useEffect(() => {
    if (!selectedCourseId) {
      setEnrolledIds([]);
      return;
    }

    const loadEnrollments = async () => {
      const data = await getCourseEnrollments(selectedCourseId);
      setEnrolledIds(data.map((m: any) => m.estudiante_id));
    };

    loadEnrollments();
  }, [selectedCourseId]);

  // --------------------------------------------------------
  // Listas derivadas
  // --------------------------------------------------------
  const enrolledStudents = useMemo(
    () => students.filter((s) => enrolledIds.includes(s.id)),
    [students, enrolledIds]
  );

  const availableStudents = useMemo(
    () => students.filter((s) => !enrolledIds.includes(s.id)),
    [students, enrolledIds]
  );

  // --------------------------------------------------------
  // Handlers
  // --------------------------------------------------------
  const toggleStudent = (id: string) => {
    setEnrolledIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!selectedCourseId) {
      setMessage("Primero selecciona un curso.");
      return;
    }

    setSaving(true);
    setMessage(null);
    const ok = await setCourseEnrollments(selectedCourseId, enrolledIds);
    setSaving(false);

    if (ok) {
      setMessage("✅ Matrículas guardadas correctamente.");
    } else {
      setMessage("❌ Ocurrió un error al guardar las matrículas.");
    }
  };

  // --------------------------------------------------------
  // Render
  // --------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto">
      {/* Título */}
      <div className="mb-8 text-center">
        <h1
          className="text-[#333333] mb-2"
          style={{ fontWeight: 700, fontSize: "2rem" }}
        >
          Asignar Estudiantes a Cursos
        </h1>
        <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
          Selecciona un curso y matricula estudiantes registrados en
          NeuroStudy.
        </p>
      </div>

      {/* Selector de curso */}
      <div className="mb-8 flex justify-center">
        <div
          className="bg-white rounded-2xl border border-[#ececec] px-8 py-6 w-full max-w-3xl"
          style={{ boxShadow: "5px 5px 8px rgba(0,0,0,0.08)" }}
        >
          <label
            className="block text-[#333333] mb-3"
            style={{ fontWeight: 600 }}
          >
            Seleccionar Curso
          </label>

          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full rounded-xl border border-[#797979] bg-[#ececec] px-4 py-3 text-[#333333] focus:outline-none focus:border-[#006d6f]"
          >
            <option value="">-- Elegir curso --</option>
            {courses.map((c) => (
              <option key={c.id_curso} value={c.id_curso}>
                {c.titulo}
              </option>
            ))}
          </select>

          {loadingCourses && (
            <p className="mt-3 text-sm text-[#797979]">
              Cargando cursos...
            </p>
          )}
        </div>
      </div>

      {/* Si no hay curso seleccionado, no muestro listas */}
      {!selectedCourseId ? (
        <p className="text-center text-[#797979]" style={{ fontWeight: 500 }}>
          Elige un curso para ver y gestionar sus estudiantes matriculados.
        </p>
      ) : (
        <>
          {/* Panel de listas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estudiantes disponibles */}
            <div
              className="bg-white rounded-2xl border border-[#797979] p-6"
              style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#006d6f]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#006d6f]" />
                </div>
                <div>
                  <h3
                    className="text-[#333333]"
                    style={{ fontWeight: 600 }}
                  >
                    Estudiantes disponibles
                  </h3>
                  <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                    Registrados en el sistema (rol Estudiante)
                  </p>
                </div>
              </div>

              {loadingStudents ? (
                <p>Cargando estudiantes...</p>
              ) : students.length === 0 ? (
                <p className="text-[#797979]">
                  No hay estudiantes registrados en el sistema.
                </p>
              ) : availableStudents.length === 0 ? (
                <p className="text-[#797979]">
                  Todos los estudiantes disponibles ya están matriculados en
                  este curso.
                </p>
              ) : (
                <div className="max-h-80 overflow-y-auto pr-2 space-y-2">
                  {availableStudents.map((s) => (
                    <label
                      key={s.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-[#ececec] cursor-pointer"
                    >
                      <div>
                        <p
                          className="text-[#333333]"
                          style={{ fontWeight: 500 }}
                        >
                          {s.first_name} {s.last_name}
                        </p>
                        <p className="text-sm text-[#797979]">
                          {s.email}
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={enrolledIds.includes(s.id)}
                        onChange={() => toggleStudent(s.id)}
                        className="w-4 h-4"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Estudiantes ya matriculados */}
            <div
              className="bg-white rounded-2xl border border-[#797979] p-6"
              style={{ boxShadow: "5px 5px 5px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00bfbf]/10 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-[#00bfbf]" />
                </div>
                <div>
                  <h3
                    className="text-[#333333]"
                    style={{ fontWeight: 600 }}
                  >
                    Estudiantes matriculados en este curso
                  </h3>
                  <p className="text-[#797979]" style={{ fontWeight: 500 }}>
                    Puedes desmarcar para retirarlos del curso.
                  </p>
                </div>
              </div>

              {enrolledStudents.length === 0 ? (
                <p className="text-[#797979]">
                  No hay estudiantes matriculados en este curso todavía.
                </p>
              ) : (
                <div className="max-h-80 overflow-y-auto pr-2 space-y-2">
                  {enrolledStudents.map((s) => (
                    <label
                      key={s.id}
                      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-[#ececec] cursor-pointer"
                    >
                      <div>
                        <p
                          className="text-[#333333]"
                          style={{ fontWeight: 500 }}
                        >
                          {s.first_name} {s.last_name}
                        </p>
                        <p className="text-sm text-[#797979]">
                          {s.email}
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={enrolledIds.includes(s.id)}
                        onChange={() => toggleStudent(s.id)}
                        className="w-4 h-4"
                      />
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botón guardar */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-sm text-[#797979]">
              {message && <span>{message}</span>}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-6 py-3 hover:bg-[#00595a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              style={{ fontWeight: 600, boxShadow: "4px 4px 6px rgba(0,0,0,0.15)" }}
            >
              <CheckCircle2 className="w-5 h-5" />
              {saving ? "Guardando..." : "Guardar Matrículas"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
