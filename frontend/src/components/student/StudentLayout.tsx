import { useState } from "react";
import { StudentNavbar } from "./StudentNavbar";
import { StudentHome } from "./StudentHome";
import { StudentCourses } from "./StudentCourses";
import { StudentResults } from "./StudentResults";
import { StudentMessages } from "./StudentMessages";
import { SoundscapeConfig } from "./SoundscapeConfig";
import { CourseView } from "../CourseView";
import { Footer } from "../Footer";

interface StudentLayoutProps {
  username: string;
  onLogout: () => void;
}

type StudentView = "home" | "courses" | "results" | "messages" | "course-detail" | "soundscape-config";

export function StudentLayout({ username, onLogout }: StudentLayoutProps) {
  const [currentView, setCurrentView] = useState<StudentView>("home");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  
  // Calcular mensajes no leídos (en una aplicación real, esto vendría de un estado global o API)
  const unreadMessagesCount = 3; // Este valor debería ser dinámico

  const handleNavigate = (view: StudentView) => {
    setCurrentView(view);
    if (view !== "course-detail") {
      setSelectedCourse(null);
    }
    if (view !== "soundscape-config") {
      setSelectedExam(null);
    }
    if (view !== "messages") {
      setSelectedConversationId(null);
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
    // Por ahora solo mostramos un alert
    alert(`Iniciando ${selectedExam} con el entorno sonoro configurado`);
  };

  const handleOpenMessages = (courseTitle?: string) => {
    // Si se proporciona un curso, buscar la conversación correspondiente
    // Por ahora, abrimos la vista de mensajes sin conversación específica
    setCurrentView("messages");
    // En una implementación real, mapearíamos el curso a una conversación específica
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      {currentView !== "course-detail" && currentView !== "soundscape-config" && (
        <StudentNavbar 
          username={username}
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
          unreadMessages={unreadMessagesCount}
        />
      )}

      <main className="flex-1">
        {currentView === "home" && <StudentHome username={username} />}
        {currentView === "courses" && <StudentCourses onSelectCourse={handleSelectCourse} onOpenMessages={handleOpenMessages} />}
        {currentView === "results" && <StudentResults />}
        {currentView === "messages" && <StudentMessages initialConversationId={selectedConversationId || undefined} />}
        {currentView === "course-detail" && selectedCourse && (
          <CourseView 
            courseTitle={selectedCourse}
            username={username}
            onBack={handleBackToCourses}
            onLogout={onLogout}
            onSelectExam={handleSelectExam}
            onOpenMessages={handleOpenMessages}
          />
        )}
        {currentView === "soundscape-config" && selectedCourse && selectedExam && (
          <SoundscapeConfig
            courseTitle={selectedCourse}
            examType={selectedExam}
            onBack={handleBackToCourseDetail}
            onStartExam={handleStartExam}
          />
        )}
      </main>

      {currentView !== "course-detail" && currentView !== "soundscape-config" && <Footer />}
    </div>
  );
}