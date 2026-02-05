 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { StatCard } from '@/components/ui/stat-card';
 import { ProgressRing } from '@/components/ui/progress-ring';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { useAuth } from '@/contexts/AuthContext';
 import { Link } from 'react-router-dom';
 import { 
   Users, 
   GraduationCap, 
   ClipboardCheck, 
   FileText, 
   TrendingUp,
   ArrowRight,
   AlertCircle,
 } from 'lucide-react';
 
 // Mock department data
 const departmentStats = {
   totalStaff: 25,
   totalStudents: 480,
   avgStaffAttendance: 94,
   avgStudentAttendance: 86,
   pendingApprovals: 8,
 };
 
 const staffList = [
   { name: 'Dr. Priya Sharma', attendance: 98, status: 'present' },
   { name: 'Prof. Rajesh Kumar', attendance: 95, status: 'present' },
   { name: 'Dr. Meena Iyer', attendance: 92, status: 'on-leave' },
   { name: 'Prof. Arun Singh', attendance: 90, status: 'present' },
   { name: 'Dr. Kavitha Rao', attendance: 88, status: 'present' },
 ];
 
 const classesSummary = [
   { class: 'CSE-A 3rd Sem', students: 60, attendance: 88 },
   { class: 'CSE-B 3rd Sem', students: 60, attendance: 85 },
   { class: 'CSE-A 5th Sem', students: 55, attendance: 90 },
   { class: 'CSE-B 5th Sem', students: 55, attendance: 82 },
   { class: 'CSE-A 7th Sem', students: 50, attendance: 78 },
 ];
 
 export default function HodDashboard() {
   const { user } = useAuth();
 
   return (
     <DashboardLayout title="Department Dashboard" subtitle={`${user?.department} Department`}>
       <div className="space-y-6">
         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           <StatCard
             title="Total Staff"
             value={departmentStats.totalStaff}
             icon={Users}
             variant="primary"
           />
           <StatCard
             title="Total Students"
             value={departmentStats.totalStudents}
             icon={GraduationCap}
             variant="secondary"
           />
           <StatCard
             title="Staff Attendance"
             value={`${departmentStats.avgStaffAttendance}%`}
             icon={TrendingUp}
             variant="success"
           />
           <StatCard
             title="Student Attendance"
             value={`${departmentStats.avgStudentAttendance}%`}
             icon={ClipboardCheck}
             variant="warning"
           />
           <StatCard
             title="Pending Approvals"
             value={departmentStats.pendingApprovals}
             icon={FileText}
             variant="danger"
           />
         </div>
 
         {/* Main Content */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Attendance Overview */}
           <Card className="card-elevated">
             <CardHeader className="pb-2">
               <CardTitle className="text-lg font-semibold">Department Overview</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col items-center gap-6 pt-4">
               <div className="flex gap-8">
                 <div className="text-center">
                   <ProgressRing 
                     value={departmentStats.avgStaffAttendance} 
                     size={100} 
                     strokeWidth={8}
                     variant="success"
                     label="Staff"
                   />
                 </div>
                 <div className="text-center">
                   <ProgressRing 
                     value={departmentStats.avgStudentAttendance} 
                     size={100} 
                     strokeWidth={8}
                     variant="warning"
                     label="Students"
                   />
                 </div>
               </div>
             </CardContent>
           </Card>
 
           {/* Staff Attendance */}
           <Card className="lg:col-span-2 card-elevated">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-lg font-semibold">Staff Attendance Today</CardTitle>
               <Link to="/hod/staff">
                 <Button variant="outline" size="sm" className="gap-2">
                   View All <ArrowRight className="w-4 h-4" />
                 </Button>
               </Link>
             </CardHeader>
             <CardContent>
               <div className="space-y-3">
                 {staffList.map((staff, index) => (
                   <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                         <span className="text-sm font-semibold text-primary">
                           {staff.name.split(' ').slice(-1)[0][0]}
                         </span>
                       </div>
                       <div>
                         <p className="font-medium text-sm">{staff.name}</p>
                         <p className="text-xs text-muted-foreground">Overall: {staff.attendance}%</p>
                       </div>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                       staff.status === 'present' 
                         ? 'bg-success/10 text-success border border-success/20' 
                         : 'bg-secondary/10 text-secondary border border-secondary/20'
                     }`}>
                       {staff.status === 'present' ? 'Present' : 'On Leave'}
                     </span>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Classes Summary */}
         <Card className="card-elevated">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-lg font-semibold">Classes Overview</CardTitle>
             <Link to="/hod/students">
               <Button variant="outline" size="sm" className="gap-2">
                 View Details <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
           </CardHeader>
           <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
               {classesSummary.map((cls, index) => (
                 <div key={index} className="p-4 rounded-xl border border-border hover:shadow-md transition-shadow">
                   <p className="font-semibold text-sm">{cls.class}</p>
                   <p className="text-xs text-muted-foreground mb-3">{cls.students} students</p>
                   <div className="flex items-center gap-2">
                     <div className="flex-1 progress-bar">
                       <div 
                         className={`progress-fill ${
                           cls.attendance >= 85 ? 'bg-success' : 
                           cls.attendance >= 75 ? 'bg-warning' : 'bg-destructive'
                         }`}
                         style={{ width: `${cls.attendance}%` }}
                       />
                     </div>
                     <span className="text-sm font-semibold">{cls.attendance}%</span>
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
 
         {/* Pending Approvals */}
         <Card className="card-elevated">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <div className="flex items-center gap-2">
               <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
               <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                 {departmentStats.pendingApprovals} pending
               </span>
             </div>
             <Link to="/hod/approvals">
               <Button variant="outline" size="sm" className="gap-2">
                 View All <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
           </CardHeader>
           <CardContent>
             <div className="space-y-3">
               {[
                 { name: 'Dr. Priya Sharma', type: 'Staff Leave', requestType: 'Medical Leave', dates: 'Feb 10-12, 2025' },
                 { name: 'Amit Kumar', type: 'Student Leave', requestType: 'On-Duty (Hackathon)', dates: 'Feb 15, 2025' },
                 { name: 'Prof. Rajesh Kumar', type: 'Unlock Attendance', requestType: 'CSE-A 3rd Sem - Feb 5', dates: '' },
               ].map((request, index) => (
                 <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                       request.type === 'Staff Leave' ? 'bg-primary/10' : 
                       request.type === 'Student Leave' ? 'bg-secondary/10' : 'bg-warning/10'
                     }`}>
                       {request.type === 'Unlock Attendance' ? (
                         <AlertCircle className="w-5 h-5 text-warning" />
                       ) : (
                         <FileText className={`w-5 h-5 ${
                           request.type === 'Staff Leave' ? 'text-primary' : 'text-secondary'
                         }`} />
                       )}
                     </div>
                     <div>
                       <p className="font-medium">{request.name}</p>
                       <p className="text-sm text-muted-foreground">{request.requestType}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     {request.dates && <span className="text-sm text-muted-foreground">{request.dates}</span>}
                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                       request.type === 'Staff Leave' ? 'bg-primary/10 text-primary border border-primary/20' : 
                       request.type === 'Student Leave' ? 'bg-secondary/10 text-secondary border border-secondary/20' :
                       'bg-warning/10 text-warning border border-warning/20'
                     }`}>
                       {request.type}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }