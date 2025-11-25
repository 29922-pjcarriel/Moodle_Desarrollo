import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { StudentLayout } from "./components/student/StudentLayout";
import { TeacherMain } from "./components/teacher/TeacherMain";
import { AdminMain } from "./components/admin/AdminMain";

export default function App() {
  // Estado global de la sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<
    "student" | "teacher" | "admin"
  >("student");

  // ==========================================================
  // FUNCIÓN QUE RECIBE LO QUE VIENE DEL LOGIN REAL
  // ==========================================================
  const handleLogin = (
    name: string,
    role: "student" | "teacher" | "admin"
  ) => {
    setUsername(name);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserRole("student");
  };

  // ==========================================================
  // SI NO ESTÁ LOGUEADO → MOSTRAR LOGIN
  // ==========================================================
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // ==========================================================
  // LAYOUT SEGÚN ROL
  // ==========================================================
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
      <AdminMain
        adminName={username}
        onLogout={handleLogout}
      />
    );
  }

  // Si aparece un rol desconocido
  return <p>Rol no reconocido: {userRole}</p>;
}
