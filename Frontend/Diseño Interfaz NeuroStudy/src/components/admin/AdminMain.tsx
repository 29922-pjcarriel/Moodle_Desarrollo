import { useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { UserManagement } from "./UserManagement";
import { CourseManagement } from "./CourseManagement";
import { CategoryManagement } from "./CategoryManagement";
import { GlobalReports } from "./GlobalReports";
import { BackupRestore } from "./BackupRestore";
import { SoundscapeManagement } from "./SoundscapeManagement";
import { AdminLayout } from "./AdminLayout";

interface AdminMainProps {
  adminName: string;
  onLogout: () => void;
}

export function AdminMain({ adminName, onLogout }: AdminMainProps) {
  const [currentView, setCurrentView] = useState("dashboard");

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const renderView = () => {
    const props = { adminName, currentView, onNavigate: handleNavigate, onLogout };

    switch (currentView) {
      case "users":
        return <UserManagement {...props} />;
      case "courses":
        return <CourseManagement {...props} />;
      case "categories":
        return <CategoryManagement {...props} />;
      case "soundscapes":
        return (
          <AdminLayout {...props}>
            <SoundscapeManagement />
          </AdminLayout>
        );
      case "reports":
        return <GlobalReports {...props} />;
      case "backups":
        return <BackupRestore {...props} />;
      default:
        return <AdminDashboard {...props} />;
    }
  };

  return renderView();
}