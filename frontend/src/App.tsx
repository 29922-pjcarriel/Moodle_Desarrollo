import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { StudentLayout } from "./components/student/StudentLayout";
import { TeacherMain } from "./components/teacher/TeacherMain";
import { AdminMain } from "./components/admin/AdminMain";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<"student" | "teacher" | "admin">("student");

  const handleLogin = (user: string, role: "student" | "teacher" | "admin") => {
    setUsername(user);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} />
      ) : userRole === "admin" ? (
        <AdminMain 
          adminName={username} 
          onLogout={handleLogout}
        />
      ) : userRole === "teacher" ? (
        <TeacherMain 
          teacherName={username} 
          onLogout={handleLogout}
        />
      ) : (
        <StudentLayout 
          username={username}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}