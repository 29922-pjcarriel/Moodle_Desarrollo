import { useState } from "react";
import { TeacherDashboard } from "./TeacherDashboard";
import { TeacherCourses } from "./TeacherCourses";
import { TeacherCourseView } from "./TeacherCourseView";
import { CreateActivity } from "./CreateActivity";
import { StudentManagement } from "./StudentManagement";
import { GradesManagement } from "./GradesManagement";

interface TeacherMainProps {
  teacherName: string;
  onLogout: () => void;
}

export function TeacherMain({ teacherName, onLogout }: TeacherMainProps) {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view !== "course") {
      setSelectedCourse(null);
    }
  };

  const handleSelectCourse = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setCurrentView("course");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCurrentView("courses");
  };

  const handleBackFromCreate = () => {
    if (selectedCourse) {
      setCurrentView("course");
    } else {
      setCurrentView("dashboard");
    }
  };

  // Dashboard view
  if (currentView === "dashboard") {
    return (
      <TeacherDashboard
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  // Courses view
  if (currentView === "courses") {
    return (
      <TeacherCourses
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onSelectCourse={handleSelectCourse}
        onLogout={onLogout}
      />
    );
  }

  // Individual course view
  if (currentView === "course" && selectedCourse) {
    return (
      <TeacherCourseView
        courseTitle={selectedCourse}
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={handleBackToCourses}
        onLogout={onLogout}
      />
    );
  }

  // Create activity view
  if (currentView === "create") {
    return (
      <CreateActivity
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onBack={handleBackFromCreate}
        onLogout={onLogout}
      />
    );
  }

  // Student management view
  if (currentView === "students") {
    return (
      <StudentManagement
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  // Grades management view
  if (currentView === "grades") {
    return (
      <GradesManagement
        teacherName={teacherName}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  // Default to dashboard
  return (
    <TeacherDashboard
      teacherName={teacherName}
      currentView={currentView}
      onNavigate={handleNavigate}
      onLogout={onLogout}
    />
  );
}