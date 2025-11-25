import { useState } from "react";
import { StudentNavbar } from "./StudentNavbar";
import { StudentHome } from "./StudentHome";
import { StudentCourses } from "./StudentCourses";
import { StudentResults } from "./StudentResults";
import { SoundscapeConfig } from "./SoundscapeConfig";
import { CourseView } from "../CourseView";
import { ExamView } from "./ExamView";
import { Footer } from "../Footer";

interface StudentLayoutProps {
  username: string;
  onLogout: () => void;
}

type StudentView = "home" | "courses" | "results" | "course-detail" | "soundscape-config" | "exam-view";

export function StudentLayout({ username, onLogout }: StudentLayoutProps) {
  const [currentView, setCurrentView] = useState<StudentView>("home");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  
  // NUEVO: Estado para determinar si el examen tiene soundscapes habilitados
  // En una aplicación real, esto vendría de la base de datos según la configuración del profesor
  const [examSoundscapesEnabled, setExamSoundscapesEnabled] = useState(true);

  const handleNavigate = (view: StudentView) => {
    setCurrentView(view);
    if (view !== "course-detail") {
      setSelectedCourse(null);
    }
    if (view !== "soundscape-config") {
      setSelectedExam(null);
    }
  };

  const handleSelectCourse = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setCurrentView("course-detail");
  };

  const handleSelectExam = (examType: string) => {
    setSelectedExam(examType);
    setCurrentView("soundscape-config");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCurrentView("courses");
  };

  const handleBackToCourseDetail = () => {
    setSelectedExam(null);
    setCurrentView("course-detail");
  };

  const handleStartExam = () => {
    // Aquí iría la lógica para iniciar el examen
    console.log("Iniciando examen:", selectedExam, "con configuración de sonido");
    // Transición a la vista de examen
    setCurrentView("exam-view");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      {currentView !== "course-detail" && currentView !== "soundscape-config" && currentView !== "exam-view" && (
        <StudentNavbar 
          username={username}
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
      )}

      <main className="flex-1">
        {currentView === "home" && <StudentHome username={username} />}
        {currentView === "courses" && <StudentCourses onSelectCourse={handleSelectCourse} />}
        {currentView === "results" && <StudentResults />}
        {currentView === "course-detail" && selectedCourse && (
          <CourseView 
            courseTitle={selectedCourse}
            username={username}
            onBack={handleBackToCourses}
            onLogout={onLogout}
            onSelectExam={handleSelectExam}
          />
        )}
        {currentView === "soundscape-config" && selectedCourse && selectedExam && (
          <SoundscapeConfig
            courseTitle={selectedCourse}
            examType={selectedExam}
            onBack={handleBackToCourseDetail}
            onStartExam={handleStartExam}
            soundscapesEnabled={examSoundscapesEnabled}
          />
        )}
        {currentView === "exam-view" && (
          <ExamView
            studentName={username}
            currentView={currentView}
            onNavigate={handleNavigate}
            onLogout={onLogout}
          />
        )}
      </main>

      {/* DEMO ONLY: Toggle button para probar ambas vistas de soundscapes */}
      {currentView === "soundscape-config" && (
        <button
          onClick={() => setExamSoundscapesEnabled(!examSoundscapesEnabled)}
          className="fixed bottom-6 right-6 px-6 py-3 rounded-full text-white shadow-lg z-50 hover:scale-105 transition-transform"
          style={{ 
            background: 'linear-gradient(135deg, #006d6f 0%, #00bfbf 100%)',
            boxShadow: '0 4px 12px rgba(0, 109, 111, 0.4)'
          }}
        >
          🎧 Demo: {examSoundscapesEnabled ? 'Soundscapes ON' : 'Soundscapes OFF'}
        </button>
      )}

      {currentView !== "course-detail" && currentView !== "soundscape-config" && currentView !== "exam-view" && <Footer />}
    </div>
  );
}