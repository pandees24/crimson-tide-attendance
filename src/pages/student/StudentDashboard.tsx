 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { StatCard } from '@/components/ui/stat-card';
 import { ProgressRing } from '@/components/ui/progress-ring';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Calendar, Clock, BookOpen, FileText, TrendingUp } from 'lucide-react';
 import { useAuth } from '@/contexts/AuthContext';
 
 // Mock data for student
 const attendanceData = {
   overall: 87,
   subjects: [
     { name: 'Data Structures', attendance: 92, classes: 24, attended: 22 },
     { name: 'Database Systems', attendance: 88, classes: 25, attended: 22 },
     { name: 'Operating Systems', attendance: 85, classes: 20, attended: 17 },
     { name: 'Computer Networks', attendance: 80, classes: 20, attended: 16 },
     { name: 'Software Engineering', attendance: 90, classes: 22, attended: 20 },
   ],
   remainingLeaves: 5,
   totalLeaves: 10,
 };
 
 const getAttendanceVariant = (value: number) => {
   if (value >= 90) return 'success';
   if (value >= 75) return 'warning';
   return 'danger';
 };
 
 export default function StudentDashboard() {
   const { user } = useAuth();
 
   return (
     <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${user?.name}`}>
       <div className="space-y-6">
         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <StatCard
             title="Overall Attendance"
             value={`${attendanceData.overall}%`}
             subtitle="This semester"
             icon={TrendingUp}
             variant={getAttendanceVariant(attendanceData.overall) as any}
             trend={{ value: 2.5, isPositive: true }}
           />
           <StatCard
             title="Classes Attended"
             value="97"
             subtitle="Out of 111 classes"
             icon={BookOpen}
             variant="primary"
           />
           <StatCard
             title="Remaining Leaves"
             value={attendanceData.remainingLeaves}
             subtitle={`Out of ${attendanceData.totalLeaves} allowed`}
             icon={Calendar}
             variant="secondary"
           />
           <StatCard
             title="Pending Requests"
             value="1"
             subtitle="Awaiting approval"
             icon={FileText}
             variant="warning"
           />
         </div>
 
         {/* Main Content Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Attendance Overview */}
           <Card className="lg:col-span-1 card-elevated">
             <CardHeader className="pb-2">
               <CardTitle className="text-lg font-semibold">Attendance Overview</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col items-center pt-4">
               <ProgressRing 
                 value={attendanceData.overall} 
                 size={160} 
                 strokeWidth={12}
                 variant={getAttendanceVariant(attendanceData.overall)}
                 label="Overall"
               />
               <div className="mt-6 w-full space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Minimum Required</span>
                   <span className="font-medium">75%</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Current Status</span>
                   <span className={`font-medium ${attendanceData.overall >= 75 ? 'text-success' : 'text-destructive'}`}>
                     {attendanceData.overall >= 75 ? 'On Track' : 'At Risk'}
                   </span>
                 </div>
               </div>
             </CardContent>
           </Card>
 
           {/* Subject-wise Attendance */}
           <Card className="lg:col-span-2 card-elevated">
             <CardHeader className="pb-2">
               <CardTitle className="text-lg font-semibold">Subject-wise Attendance</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {attendanceData.subjects.map((subject, index) => (
                   <div key={index} className="space-y-2">
                     <div className="flex justify-between items-center">
                       <span className="font-medium text-sm">{subject.name}</span>
                       <div className="flex items-center gap-3">
                         <span className="text-xs text-muted-foreground">
                           {subject.attended}/{subject.classes} classes
                         </span>
                         <span className={`text-sm font-semibold ${
                           subject.attendance >= 90 ? 'text-success' : 
                           subject.attendance >= 75 ? 'text-warning' : 'text-destructive'
                         }`}>
                           {subject.attendance}%
                         </span>
                       </div>
                     </div>
                     <div className="progress-bar">
                       <div 
                         className={`progress-fill ${
                           subject.attendance >= 90 ? 'bg-success' : 
                           subject.attendance >= 75 ? 'bg-warning' : 'bg-destructive'
                         }`}
                         style={{ width: `${subject.attendance}%` }}
                       />
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Recent Activity */}
         <Card className="card-elevated">
           <CardHeader className="pb-2">
             <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {[
                 { date: 'Today', subject: 'Data Structures', status: 'Present', time: '09:00 AM' },
                 { date: 'Today', subject: 'Database Systems', status: 'Present', time: '11:00 AM' },
                 { date: 'Yesterday', subject: 'Operating Systems', status: 'Absent', time: '02:00 PM' },
                 { date: 'Yesterday', subject: 'Computer Networks', status: 'Present', time: '04:00 PM' },
               ].map((activity, index) => (
                 <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                       <Clock className="w-5 h-5 text-muted-foreground" />
                     </div>
                     <div>
                       <p className="font-medium text-sm">{activity.subject}</p>
                       <p className="text-xs text-muted-foreground">{activity.date} • {activity.time}</p>
                     </div>
                   </div>
                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                     activity.status === 'Present' 
                       ? 'bg-success/10 text-success border border-success/20' 
                       : 'bg-destructive/10 text-destructive border border-destructive/20'
                   }`}>
                     {activity.status}
                   </span>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }