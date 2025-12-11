// frontend/src/components/teacher/TeacherCourses.tsx
import { useEffect, useState } from "react";
import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Eye, Settings, PlusCircle, Award } from "lucide-react";
import { getTeacherCourses } from "../../lib/teacherApi";

interface TeacherCoursesProps {
  teacherId: string;
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onSelectCourse: (courseId: string, courseTitle: string) => void;
  onLogout: () => void;
}

export function TeacherCourses({
  teacherId,
  teacherName,
  currentView,
  onNavigate,
  onSelectCourse,
  onLogout
}: TeacherCoursesProps) {

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getTeacherCourses(teacherId);
      setCourses(data);
    }
    load();
  }, [teacherId]);


  /* ============================================================
      FUNCIÓN CORREGIDA — GUARDA COURSE ID EN SESSIONSTORAGE 
     ============================================================ */
  const handleSelectCourse = (course: any) => {
    console.log("📘 Guardando ID curso:", course.id_curso);

    sessionStorage.setItem("selectedCourseId", course.id_curso);
    sessionStorage.setItem("selectedCourseTitle", course.titulo);

    onSelectCourse(course.id_curso, course.titulo);
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
        <h2 className="text-[#333333] mb-2 font-bold text-3xl">Mis Cursos</h2>
        <p className="text-[#006d6f] font-semibold mb-6">
          Administra tus cursos, crea actividades y realiza seguimiento a tus estudiantes
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id_curso}
              className="bg-white rounded-2xl border border-[#797979] overflow-hidden hover:shadow-lg transition-shadow"
              style={{ boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={course.imagen_url ?? ""}
                  alt={course.titulo}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-[#006d6f] text-white px-3 py-1 rounded-full">
                  0 estudiantes
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[#333333] mb-2 font-semibold text-lg">
                  {course.titulo}
                </h3>

                <p className="text-[#797979] mb-4">
                  Código: {course.codigo ?? "—"}
                </p>

                <div className="grid grid-cols-2 gap-3">

                  {/* VER CURSO */}
                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-4 py-3 hover:bg-[#00595a]"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Curso
                  </button>

                  {/* ADMINISTRAR CURSO */}
                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-white text-[#006d6f] px-4 py-3 hover:bg-[#ececec]"
                  >
                    <Settings className="w-4 h-4" />
                    Administrar
                  </button>

                  {/* CREAR EVALUACIÓN */}
                  <button
                    onClick={() => {
                      handleSelectCourse(course);
                      onNavigate("create");
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-4 py-3 hover:bg-[#00a5a5]"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Crear Evaluación
                  </button>

                  {/* CALIFICACIONES */}
                  <button
                    onClick={() => {
                      handleSelectCourse(course);
                      onNavigate("grades");
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#f4d7dd] text-[#333333] px-4 py-3 hover:bg-[#f0c5ce]"
                  >
                    <Award className="w-4 h-4" />
                    Calificaciones
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
