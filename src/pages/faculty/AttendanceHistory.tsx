 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Badge } from '@/components/ui/badge';
 import { Calendar, Clock, LogIn, LogOut } from 'lucide-react';
 
 const attendanceRecords = [
   { date: '2025-02-05', day: 'Wednesday', inTime: '08:45 AM', outTime: '05:15 PM', status: 'present', leaveType: null },
   { date: '2025-02-04', day: 'Tuesday', inTime: '08:50 AM', outTime: '05:30 PM', status: 'present', leaveType: null },
   { date: '2025-02-03', day: 'Monday', inTime: '09:00 AM', outTime: '05:00 PM', status: 'present', leaveType: null },
   { date: '2025-02-02', day: 'Sunday', inTime: null, outTime: null, status: 'weekend', leaveType: null },
   { date: '2025-02-01', day: 'Saturday', inTime: null, outTime: null, status: 'weekend', leaveType: null },
   { date: '2025-01-31', day: 'Friday', inTime: null, outTime: null, status: 'leave', leaveType: 'Casual Leave' },
   { date: '2025-01-30', day: 'Thursday', inTime: '08:55 AM', outTime: '05:20 PM', status: 'present', leaveType: null },
   { date: '2025-01-29', day: 'Wednesday', inTime: null, outTime: null, status: 'onduty', leaveType: 'Conference' },
 ];
 
 const stats = {
   totalDays: 22,
   present: 18,
   leave: 2,
   onDuty: 2,
   percentage: 91,
 };
 
 export default function FacultyAttendanceHistory() {
   return (
     <DashboardLayout title="Attendance History" subtitle="View your attendance records">
       <div className="space-y-6">
         {/* Stats */}
         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
           <Card className="card-stat border-primary/20 bg-primary/5">
             <CardContent className="p-4 text-center">
               <p className="text-3xl font-bold text-primary">{stats.percentage}%</p>
               <p className="text-sm text-muted-foreground">Overall</p>
             </CardContent>
           </Card>
           <Card className="card-stat">
             <CardContent className="p-4 text-center">
               <p className="text-3xl font-bold">{stats.totalDays}</p>
               <p className="text-sm text-muted-foreground">Working Days</p>
             </CardContent>
           </Card>
           <Card className="card-stat border-success/20 bg-success/5">
             <CardContent className="p-4 text-center">
               <p className="text-3xl font-bold text-success">{stats.present}</p>
               <p className="text-sm text-muted-foreground">Present</p>
             </CardContent>
           </Card>
           <Card className="card-stat border-warning/20 bg-warning/5">
             <CardContent className="p-4 text-center">
               <p className="text-3xl font-bold text-warning">{stats.leave}</p>
               <p className="text-sm text-muted-foreground">Leave</p>
             </CardContent>
           </Card>
           <Card className="card-stat border-secondary/20 bg-secondary/5">
             <CardContent className="p-4 text-center">
               <p className="text-3xl font-bold text-secondary">{stats.onDuty}</p>
               <p className="text-sm text-muted-foreground">On-Duty</p>
             </CardContent>
           </Card>
         </div>
 
         {/* Records Table */}
         <Card className="card-elevated">
           <CardHeader className="pb-2">
             <CardTitle className="text-lg font-semibold flex items-center gap-2">
               <Calendar className="w-5 h-5" />
               This Month's Records
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead>
                   <tr className="border-b border-border">
                     <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                     <th className="text-left py-3 px-4 font-semibold text-sm">Day</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">In Time</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">Out Time</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {attendanceRecords.map((record, index) => (
                     <tr 
                       key={index} 
                       className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                     >
                       <td className="py-3 px-4 font-medium">{record.date}</td>
                       <td className="py-3 px-4 text-muted-foreground">{record.day}</td>
                       <td className="py-3 px-4 text-center">
                         {record.inTime ? (
                           <span className="flex items-center justify-center gap-1 text-success">
                             <LogIn className="w-4 h-4" />
                             {record.inTime}
                           </span>
                         ) : (
                           <span className="text-muted-foreground">—</span>
                         )}
                       </td>
                       <td className="py-3 px-4 text-center">
                         {record.outTime ? (
                           <span className="flex items-center justify-center gap-1 text-primary">
                             <LogOut className="w-4 h-4" />
                             {record.outTime}
                           </span>
                         ) : (
                           <span className="text-muted-foreground">—</span>
                         )}
                       </td>
                       <td className="py-3 px-4 text-center">
                         {record.status === 'present' && (
                           <Badge className="bg-success/10 text-success border-success/20">Present</Badge>
                         )}
                         {record.status === 'leave' && (
                           <Badge className="bg-warning/10 text-warning border-warning/20">
                             {record.leaveType}
                           </Badge>
                         )}
                         {record.status === 'onduty' && (
                           <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                             OD - {record.leaveType}
                           </Badge>
                         )}
                         {record.status === 'weekend' && (
                           <Badge variant="outline" className="text-muted-foreground">Weekend</Badge>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }