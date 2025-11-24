import { Navbar } from "./Navbar";
import { WelcomeSection } from "./WelcomeSection";
import { InstructionsSection } from "./InstructionsSection";
import { CoursesSection } from "./CoursesSection";
import { Footer } from "./Footer";

interface DashboardProps {
  username: string;
  onLogout: () => void;
  onSelectCourse: (courseTitle: string) => void;
}

export function Dashboard({ username, onLogout, onSelectCourse }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#ececec]">
      <Navbar username={username} onLogout={onLogout} />
      
      <main className="flex-1">
        <WelcomeSection username={username} />
        <InstructionsSection />
        <CoursesSection onSelectCourse={onSelectCourse} />
      </main>

      <Footer />
    </div>
  );
}