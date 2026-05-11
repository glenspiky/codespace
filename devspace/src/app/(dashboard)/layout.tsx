import DashboardNavbar from '@/components/layout/dashboardNavbar/DashboardNavbar';
import Sidebar from '../../components/layout/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#05050a] text-white">
      {/* 1. Sidebar - Fixed on desktop, drawer on mobile */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* 2. Internal Navbar - Search & User Profile */}
        <DashboardNavbar />

        {/* 3. Main Content Area */}
        <main className="p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
