import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { StudentLayout } from "./components/student/StudentLayout";
import { TeacherMain } from "./components/teacher/TeacherMain";
import { AdminMain } from "./components/admin/AdminMain";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<
    "student" | "teacher" | "admin"
  >("student");

  const handleLogin = (
    name: string,
    role: "student" | "teacher" | "admin",
  ) => {
    setUsername(name);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserRole("student");
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userRole === "student") {
    return (
      <StudentLayout
        username={username}
        onLogout={handleLogout}
      />
    );
  }

  if (userRole === "teacher") {
    return (
      <TeacherMain
        teacherName={username}
        onLogout={handleLogout}
      />
    );
  }

  if (userRole === "admin") {
    return (
      <AdminMain adminName={username} onLogout={handleLogout} />
    );
  }

  return null;
}