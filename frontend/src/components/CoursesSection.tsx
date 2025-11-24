import { CourseCard } from "./CourseCard";

const courses = [
  {
    id: 1,
    title: "Sistemas Operativos",
    code: "#1234-567",
    imageUrl: "https://images.unsplash.com/photo-1707836885248-2b0e3cb0c76e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVyYXRpbmclMjBzeXN0ZW1zJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzYzNzY1Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Estadística Aplicada",
    code: "#1234-568",
    imageUrl: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGF0aXN0aWNzJTIwZGF0YSUyMGNoYXJ0c3xlbnwxfHx8fDE3NjM3NjU2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Redes y Comunicaciones",
    code: "#1234-569",
    imageUrl: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM3Mzc2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    title: "Bases de Datos",
    code: "#1234-570",
    imageUrl: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMHNlcnZlcnN8ZW58MXx8fHwxNzYzNzI1NTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function CoursesSection({ onSelectCourse }: { onSelectCourse: (courseTitle: string) => void }) {
  const handleEnterCourse = (courseTitle: string) => {
    onSelectCourse(courseTitle);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h3 className="text-[#006d6f] mb-6" style={{ fontWeight: 600 }}>
        Mis Cursos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            code={course.code}
            imageUrl={course.imageUrl}
            onEnter={() => handleEnterCourse(course.title)}
          />
        ))}
      </div>
    </div>
  );
}