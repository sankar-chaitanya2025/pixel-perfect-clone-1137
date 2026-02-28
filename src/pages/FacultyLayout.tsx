import { Outlet, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, BookOpen, Users, AlertTriangle } from "lucide-react";

const facultyNav = [
  { label: "Overview", icon: LayoutDashboard, path: "/faculty/overview" },
  { label: "Concepts", icon: BookOpen, path: "/faculty/concepts" },
  { label: "Students", icon: Users, path: "/faculty/students" },
  { label: "Escalations", icon: AlertTriangle, path: "/faculty/escalations" },
];

export default function FacultyLayout() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role !== "faculty") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar navItems={facultyNav} />
      <main className="ml-52">
        <Outlet />
      </main>
    </div>
  );
}
