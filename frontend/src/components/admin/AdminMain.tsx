import { useState } from "react";
import { AdminDashboard } from "./AdminDashboard";
import { UserManagement } from "./UserManagement";
import { CourseManagement } from "./CourseManagement";
import { CategoryManagement } from "./CategoryManagement";
import { RolesPermissions } from "./RolesPermissions";
import { SystemMonitoring } from "./SystemMonitoring";
import { GlobalReports } from "./GlobalReports";
import { SystemSettings } from "./SystemSettings";
import { BackupRestore } from "./BackupRestore";

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
    const props = {
      adminName,
      currentView,
      onNavigate: handleNavigate,
      onLogout
    };

    switch (currentView) {
      case "users":
        return <UserManagement {...props} />;
      case "courses":
        return <CourseManagement {...props} />;
      case "categories":
        return <CategoryManagement {...props} />;
      case "roles":
        return <RolesPermissions {...props} />;
      case "monitoring":
        return <SystemMonitoring {...props} />;
      case "reports":
        return <GlobalReports {...props} />;
      case "settings":
        return <SystemSettings {...props} />;
      case "backups":
        return <BackupRestore {...props} />;
      default:
        return <AdminDashboard {...props} />;
    }
  };

  return renderView();
}
