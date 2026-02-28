import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import LoginPage from "@/pages/LoginPage";
import StudentLayout from "@/pages/StudentLayout";
import FacultyLayout from "@/pages/FacultyLayout";
import LabView from "@/student/LabView";
import CapabilityMap from "@/student/CapabilityMap";
import SubmissionHistory from "@/student/SubmissionHistory";
import ClassOverview from "@/faculty/ClassOverview";
import ConceptHeatmap from "@/faculty/ConceptHeatmap";
import StrugglingStudents from "@/faculty/StrugglingStudents";
import EscalationLog from "@/faculty/EscalationLog";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<Navigate to="lab" replace />} />
              <Route path="lab" element={<LabView />} />
              <Route path="progress" element={<CapabilityMap />} />
              <Route path="history" element={<SubmissionHistory />} />
            </Route>

            <Route path="/faculty" element={<FacultyLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<ClassOverview />} />
              <Route path="concepts" element={<ConceptHeatmap />} />
              <Route path="students" element={<StrugglingStudents />} />
              <Route path="escalations" element={<EscalationLog />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
