import { AdminSidebar } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { Footer } from "../Footer";

interface AdminLayoutProps {
  adminName: string;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export function AdminLayout({ adminName, currentView, onNavigate, onLogout, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#ececec]">
      {/* Sidebar */}
      <AdminSidebar 
        adminName={adminName}
        currentView={currentView}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Top Bar */}
      <AdminTopBar 
        adminName={adminName}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="ml-[220px] pt-16">
        <main className="min-h-[calc(100vh-64px)] p-6">
          {children}
        </main>
        
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
