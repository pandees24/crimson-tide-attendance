 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { StatCard } from '@/components/ui/stat-card';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { useAuth } from '@/contexts/AuthContext';
 import { Link } from 'react-router-dom';
 import { 
   Users, 
   Calendar, 
   ClipboardCheck, 
   Clock, 
   ArrowRight,
   BookOpen,
 } from 'lucide-react';
 
 // Mock schedule data
 const todaySchedule = [
   { id: 1, subject: 'Data Structures', class: 'CSE-A 3rd Sem', time: '09:00 - 10:00', room: 'Room 301', marked: true },
   { id: 2, subject: 'Data Structures', class: 'CSE-B 3rd Sem', time: '10:00 - 11:00', room: 'Room 302', marked: true },
   { id: 3, subject: 'Algorithms', class: 'CSE-A 5th Sem', time: '11:30 - 12:30', room: 'Room 401', marked: false },
   { id: 4, subject: 'Data Structures Lab', class: 'CSE-A 3rd Sem', time: '02:00 - 04:00', room: 'Lab 1', marked: false },
 ];
 
 export default function FacultyDashboard() {
   const { user } = useAuth();
 
   const markedClasses = todaySchedule.filter(s => s.marked).length;
   const pendingClasses = todaySchedule.filter(s => !s.marked).length;
 
   return (
     <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${user?.name}`}>
       <div className="space-y-6">
         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <StatCard
             title="Today's Classes"
             value={todaySchedule.length}
             subtitle="Scheduled for today"
             icon={BookOpen}
             variant="primary"
           />
           <StatCard
             title="Attendance Marked"
             value={markedClasses}
             subtitle={`${pendingClasses} pending`}
             icon={ClipboardCheck}
             variant="success"
           />
           <StatCard
             title="Total Students"
             value="180"
             subtitle="Across all classes"
             icon={Users}
             variant="secondary"
           />
           <StatCard
             title="Leave Requests"
             value="3"
             subtitle="Pending approval"
             icon={Calendar}
             variant="warning"
           />
         </div>
 
         {/* Main Content */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Today's Schedule */}
           <Card className="lg:col-span-2 card-elevated">
             <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
               <Link to="/faculty/mark-attendance">
                 <Button variant="outline" size="sm" className="gap-2">
                   Mark Attendance <ArrowRight className="w-4 h-4" />
                 </Button>
               </Link>
             </CardHeader>
             <CardContent>
               <div className="space-y-3">
                 {todaySchedule.map((schedule) => (
                   <div 
                     key={schedule.id} 
                     className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
                   >
                     <div className="flex items-center gap-4">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                         schedule.marked ? 'bg-success/10' : 'bg-primary/10'
                       }`}>
                         <Clock className={`w-6 h-6 ${schedule.marked ? 'text-success' : 'text-primary'}`} />
                       </div>
                       <div>
                         <p className="font-semibold">{schedule.subject}</p>
                         <p className="text-sm text-muted-foreground">{schedule.class} • {schedule.room}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <span className="text-sm font-medium text-muted-foreground">{schedule.time}</span>
                       {schedule.marked ? (
                         <span className="status-present">Marked</span>
                       ) : (
                         <Link to="/faculty/mark-attendance">
                           <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                             Mark Now
                           </Button>
                         </Link>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             </CardContent>
           </Card>
 
           {/* Quick Actions */}
           <Card className="card-elevated">
             <CardHeader className="pb-2">
               <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
             </CardHeader>
             <CardContent className="space-y-3">
               <Link to="/faculty/mark-attendance" className="block">
                 <div className="p-4 rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                   <ClipboardCheck className="w-6 h-6 mb-2" />
                   <p className="font-semibold">Mark Attendance</p>
                   <p className="text-sm opacity-80">Record student attendance</p>
                 </div>
               </Link>
               
               <Link to="/faculty/leave" className="block">
                 <div className="p-4 rounded-xl bg-gradient-secondary text-secondary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                   <Calendar className="w-6 h-6 mb-2" />
                   <p className="font-semibold">Apply for Leave</p>
                   <p className="text-sm opacity-80">Submit leave or on-duty request</p>
                 </div>
               </Link>
               
               <Link to="/faculty/history" className="block">
                 <div className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                   <Clock className="w-6 h-6 mb-2 text-muted-foreground" />
                   <p className="font-semibold">Attendance History</p>
                   <p className="text-sm text-muted-foreground">View your attendance records</p>
                 </div>
               </Link>
             </CardContent>
           </Card>
         </div>
 
         {/* Leave Requests */}
         <Card className="card-elevated">
           <CardHeader className="pb-2">
             <CardTitle className="text-lg font-semibold">Pending Student Leave Requests</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-3">
               {[
                 { name: 'Amit Sharma', id: '202312345601', type: 'Medical Leave', dates: 'Feb 10-12, 2025', status: 'pending' },
                 { name: 'Priya Patel', id: '202312345602', type: 'On-Duty', dates: 'Feb 15, 2025', status: 'pending' },
                 { name: 'Rahul Kumar', id: '202312345603', type: 'Personal Leave', dates: 'Feb 18, 2025', status: 'pending' },
               ].map((request, index) => (
                 <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                       <span className="text-sm font-semibold text-primary">
                         {request.name.split(' ').map(n => n[0]).join('')}
                       </span>
                     </div>
                     <div>
                       <p className="font-medium">{request.name}</p>
                       <p className="text-sm text-muted-foreground">{request.id} • {request.type}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="text-sm text-muted-foreground">{request.dates}</span>
                     <div className="flex gap-2">
                       <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                         Reject
                       </Button>
                       <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">
                         Approve
                       </Button>
                     </div>
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