// frontend/src/components/student/StudentLayout.tsx

import { useEffect, useState } from "react";
import { StudentNavbar } from "./StudentNavbar";
import { StudentHome } from "./StudentHome";
import { StudentCourses } from "./StudentCourses";
import { StudentResults } from "./StudentResults";
import { SoundscapeConfig } from "./SoundscapeConfig";
import { ExamReady } from "./ExamReady";
import { CourseView } from "../CourseView";
import { ExamView } from "./ExamView";
import { Footer } from "../Footer";

import {
  getStudentByUsername,
  getStudentCourses,
} from "../../lib/studentApi";

export function StudentLayout({ username, onLogout }) {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState("home");

  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [selectedExam, setSelectedExam] = useState<any | null>(null);

  const [examSoundscapesEnabled, setExamSoundscapesEnabled] = useState(false);

  /* 1) Obtener ID real del estudiante */
  useEffect(() => {
    async function loadStudent() {
      const student = await getStudentByUsername(username);
      if (student) {
        setStudentId(student.id);
      }
    }
    loadStudent();
  }, [username]);

  /* 2) Cargar cursos del estudiante */
  useEffect(() => {
    if (!studentId) return;

    async function loadCourses() {
      const result = await getStudentCourses(studentId);
      setCourses(result);
    }

    loadCourses();
  }, [studentId]);

  /* 3) Navegación */
  const handleNavigate = (view: string) => setCurrentView(view);

  const handleSelectCourse = (course: any) => {
    setSelectedCourse(course);
    setCurrentView("course-detail");
  };

  /* 4) Lógica al seleccionar examen */
  const handleSelectExam = (exam: any) => {
    setSelectedExam(exam);

    const soundEnabled = exam.sonido_habilitado === true;
    setExamSoundscapesEnabled(soundEnabled);

    if (soundEnabled) {
      // Mostrar pantalla de configuración de sonido
      setCurrentView("soundscape-config");
    } else {
      // Mostrar solo pantalla de "listo para el examen"
      setCurrentView("exam-ready");
    }
  };

  const handleStartExam = () => {
    setCurrentView("exam-view");
  };

  /* 5) Render principal */
  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      {/* Ocultar navbar en vistas especiales */}
      {currentView !== "course-detail" &&
        currentView !== "soundscape-config" &&
        currentView !== "exam-ready" &&
        currentView !== "exam-view" && (
          <StudentNavbar
            username={username}
            currentView={currentView}
            onNavigate={handleNavigate}
            onLogout={onLogout}
          />
        )}

      <main className="flex-1">
        {currentView === "home" && <StudentHome username={username} />}

        {currentView === "courses" && (
          <StudentCourses
            courses={courses}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {/* 🔥 FIX: enviar studentId real */}
        {currentView === "results" && studentId && (
          <StudentResults studentId={studentId} />
        )}

        {currentView === "course-detail" && selectedCourse && (
          <CourseView
            course={selectedCourse}
            username={username}
            onBack={() => setCurrentView("courses")}
            onSelectExam={handleSelectExam}
          />
        )}

        {/* SIN sonido: pantalla simple */}
        {currentView === "exam-ready" &&
          selectedCourse &&
          selectedExam && (
            <ExamReady
              courseTitle={selectedCourse.titulo}
              examTitle={selectedExam.titulo}
              onBack={() => setCurrentView("course-detail")}
              onStartExam={handleStartExam}
            />
          )}

        {/* CON sonido: configuración de soundscapes */}
        {currentView === "soundscape-config" &&
          selectedCourse &&
          selectedExam && (
            <SoundscapeConfig
              courseTitle={selectedCourse.titulo}
              examType={selectedExam.titulo}
              soundscapesEnabled={examSoundscapesEnabled}
              onBack={() => setCurrentView("course-detail")}
              onStartExam={handleStartExam}
            />
          )}

        {/* Vista del examen REAL */}
        {currentView === "exam-view" && selectedExam && (
          <ExamView
            studentName={username}
            activity={selectedExam}
            soundEnabled={examSoundscapesEnabled}
            currentView={currentView}
            onNavigate={handleNavigate}
            onLogout={onLogout}
          />
        )}
      </main>

      {/* Footer visible solo en vistas generales */}
      {currentView !== "course-detail" &&
        currentView !== "soundscape-config" &&
        currentView !== "exam-ready" &&
        currentView !== "exam-view" && <Footer />}
    </div>
  );
}
