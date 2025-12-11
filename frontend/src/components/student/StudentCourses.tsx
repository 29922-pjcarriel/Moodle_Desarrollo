import { CourseCard } from "../CourseCard";

interface StudentCoursesProps {
  courses: any[];                          // 👈 cursos REALES desde Supabase
  onSelectCourse: (course: any) => void;   // 👈 enviar curso completo
}

export function StudentCourses({ courses, onSelectCourse }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <h2 className="text-[#006d6f] mb-2 font-bold">Mis Cursos</h2>
      <p className="text-[#666666]">Selecciona un curso para continuar.</p>

      {courses.length === 0 && (
        <p className="text-gray-600 text-lg mt-6">
          Aún no estás matriculado en ningún curso.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id_curso}
            title={course.titulo}
            code={course.codigo}
            imageUrl={course.imagen_url}
            onEnter={() => onSelectCourse(course)}
          />
        ))}
      </div>
    </div>
  );
}
