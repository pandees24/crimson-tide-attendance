import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentLeaveForm from "./pages/student/LeaveForm";
import StudentAttendanceHistory from "./pages/student/AttendanceHistory";

// Faculty Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import MarkAttendance from "./pages/faculty/MarkAttendance";
import FacultyLeaveForm from "./pages/faculty/LeaveForm";
import FacultyAttendanceHistory from "./pages/faculty/AttendanceHistory";

// HoD Pages
import HodDashboard from "./pages/hod/HodDashboard";
import HodApprovals from "./pages/hod/Approvals";

// Admin Pages
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import ExecutiveAdminDashboard from "./pages/admin/ExecutiveAdminDashboard";
import AcademicAdminDashboard from "./pages/admin/AcademicAdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/attendance" element={<StudentAttendanceHistory />} />
            <Route path="/student/leave" element={<StudentLeaveForm />} />
            <Route path="/student/notifications" element={<Notifications />} />
            
            {/* Faculty Routes */}
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="/faculty/mark-attendance" element={<MarkAttendance />} />
            <Route path="/faculty/history" element={<FacultyAttendanceHistory />} />
            <Route path="/faculty/leave" element={<FacultyLeaveForm />} />
            <Route path="/faculty/notifications" element={<Notifications />} />
            
            {/* HoD Routes */}
            <Route path="/hod" element={<HodDashboard />} />
            <Route path="/hod/staff" element={<HodDashboard />} />
            <Route path="/hod/students" element={<HodDashboard />} />
            <Route path="/hod/approvals" element={<HodApprovals />} />
            <Route path="/hod/notifications" element={<Notifications />} />
            
            {/* Admin Routes */}
            <Route path="/admin/super" element={<SuperAdminDashboard />} />
            <Route path="/admin/super/users" element={<SuperAdminDashboard />} />
            <Route path="/admin/super/departments" element={<SuperAdminDashboard />} />
            <Route path="/admin/super/attendance" element={<SuperAdminDashboard />} />
            <Route path="/admin/super/notifications" element={<Notifications />} />
            
            <Route path="/admin/executive" element={<ExecutiveAdminDashboard />} />
            <Route path="/admin/executive/users" element={<ExecutiveAdminDashboard />} />
            <Route path="/admin/executive/attendance" element={<ExecutiveAdminDashboard />} />
            <Route path="/admin/executive/departments" element={<ExecutiveAdminDashboard />} />
            <Route path="/admin/executive/notifications" element={<Notifications />} />
            
            <Route path="/admin/academic" element={<AcademicAdminDashboard />} />
            <Route path="/admin/academic/students" element={<AcademicAdminDashboard />} />
            <Route path="/admin/academic/attendance" element={<AcademicAdminDashboard />} />
            <Route path="/admin/academic/notifications" element={<Notifications />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
