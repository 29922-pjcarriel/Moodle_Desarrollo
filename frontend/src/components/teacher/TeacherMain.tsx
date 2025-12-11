// frontend/src/components/teacher/TeacherMain.tsx
import { useState, useEffect } from "react";
import { TeacherDashboard } from "./TeacherDashboard";
import { TeacherCourses } from "./TeacherCourses";
import { TeacherCourseView } from "./TeacherCourseView";
import { CreateActivity } from "./CreateActivity";
import { StudentManagement } from "./StudentManagement";
import { GradesManagement } from "./GradesManagement";
import { getCurrentTeacher } from "../../lib/teacherApi";

interface TeacherMainProps {
  teacherName: string; // username recibido tras login
  onLogout: () => void;
}

export function TeacherMain({ teacherName, onLogout }: TeacherMainProps) {
  const [currentView, setCurrentView] = useState("dashboard");

  const [teacherId, setTeacherId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string>("");

  /* ============================================================
     Cargar ID del profesor desde supabase
  ============================================================ */
  useEffect(() => {
    async function loadTeacher() {
      const user = await getCurrentTeacher(teacherName);
      if (user) setTeacherId(user.id);
    }
    loadTeacher();
  }, [teacherName]);

  /* ============================================================
     Navegación
  ============================================================ */
  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleSelectCourse = (courseId: string, courseTitle: string) => {
    setSelectedCourseId(courseId);
    setSelectedCourseTitle(courseTitle);
    setCurrentView("course");
  };

  /* ============================================================
     Cargando profesor
  ============================================================ */
  if (!teacherId) {
    return <div className="p-8">Cargando información del profesor...</div>;
  }

  /* ============================================================
     VISTAS
  ============================================================ */

  if (currentView === "dashboard") {
    return (
      <TeacherDashboard
        teacherId={teacherId}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "courses") {
    return (
      <TeacherCourses
        teacherId={teacherId}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onSelectCourse={handleSelectCourse}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "course") {
    return (
      <TeacherCourseView
        courseId={selectedCourseId}
        courseTitle={selectedCourseTitle}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={() => setCurrentView("courses")}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "create") {
    return (
      <CreateActivity
        teacherId={teacherId}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={() => setCurrentView("course")}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "students") {
    return (
      <StudentManagement
        teacherId={teacherId}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (currentView === "grades") {
    return (
      <GradesManagement
        teacherId={teacherId}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  return (
    <TeacherDashboard
      teacherId={teacherId}
      teacherName={teacherName}
      currentView={currentView}
      onNavigate={handleNavigate}
      onLogout={onLogout}
    />
  );
}
