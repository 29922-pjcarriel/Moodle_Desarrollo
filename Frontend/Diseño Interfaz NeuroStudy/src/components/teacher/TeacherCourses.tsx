import { TeacherNavbar } from "./TeacherNavbar";
import { Footer } from "../Footer";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Eye, Settings, PlusCircle, Award } from "lucide-react";

interface TeacherCoursesProps {
  teacherName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onSelectCourse: (courseTitle: string) => void;
  onLogout: () => void;
}

const courses = [
  {
    id: 1,
    title: "Sistemas Operativos",
    code: "#1234-567",
    students: 32,
    imageUrl: "https://images.unsplash.com/photo-1707836885248-2b0e3cb0c76e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpbmclMjBzeXN0ZW1zJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzYzNzY1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Estadística Aplicada",
    code: "#1234-568",
    students: 28,
    imageUrl: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGF0aXN0aWNzJTIwZGF0YSUyMGNoYXJ0c3xlbnwxfHx8fDE3NjM3NjU2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Redes y Comunicaciones",
    code: "#1234-569",
    students: 35,
    imageUrl: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM3Mzc2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Bases de Datos",
    code: "#1234-570",
    students: 32,
    imageUrl: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHNlcnZlcnN8ZW58MXx8fHwxNzYzNzI1NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function TeacherCourses({ teacherName, currentView, onNavigate, onSelectCourse, onLogout }: TeacherCoursesProps) {
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
            Mis Cursos
          </h2>
          <p className="text-[#006d6f]" style={{ fontWeight: 500 }}>
            Administra tus cursos, crea actividades y realiza seguimiento a tus estudiantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-[#797979] overflow-hidden hover:shadow-lg transition-shadow"
              style={{ boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#006d6f] text-white px-3 py-1 rounded-full">
                  <span style={{ fontWeight: 600 }}>{course.students} estudiantes</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[#333333] mb-2" style={{ fontWeight: 600 }}>
                  {course.title}
                </h3>
                <p className="text-[#797979] mb-4">
                  Código: {course.code}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectCourse(course.title)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#006d6f] text-white px-4 py-3 hover:bg-[#00595a] transition-colors"
                    style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
                  >
                    <Eye className="w-4 h-4" />
                    Ver Curso
                  </button>

                  <button
                    onClick={() => onSelectCourse(course.title)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-white text-[#006d6f] px-4 py-3 hover:bg-[#ececec] transition-colors"
                    style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
                  >
                    <Settings className="w-4 h-4" />
                    Administrar
                  </button>

                  <button
                    onClick={() => onNavigate("create")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#00bfbf] text-white px-4 py-3 hover:bg-[#00a5a5] transition-colors"
                    style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
                  >
                    <PlusCircle className="w-4 h-4" />
                    Crear Evaluación
                  </button>

                  <button
                    onClick={() => onNavigate("grades")}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#797979] bg-[#f4d7dd] text-[#333333] px-4 py-3 hover:bg-[#f0c5ce] transition-colors"
                    style={{ fontWeight: 500, boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)' }}
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
