import { Outlet, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/context/AuthContext";
import { Code2, TrendingUp, Clock } from "lucide-react";

const studentNav = [
  { label: "Lab", icon: Code2, path: "/student/lab" },
  { label: "Progress", icon: TrendingUp, path: "/student/progress" },
  { label: "History", icon: Clock, path: "/student/history" },
];

export default function StudentLayout() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role !== "student") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar navItems={studentNav} />
      <main className="ml-52">
        <Outlet />
      </main>
    </div>
  );
}
