import DashboardNavbar from "@/components/layout/dashboardNavbar/DashboardNavbar";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { ThemeSync } from "@/components/providers/ThemeSync"; // Import the bridge

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Ensures the Zustand state syncs with the HTML class */}
      <ThemeSync />

      {/* 1. Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* 2. Internal Navbar */}
        <DashboardNavbar />

        {/* 3. Main Content Area */}
        <main className="p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
