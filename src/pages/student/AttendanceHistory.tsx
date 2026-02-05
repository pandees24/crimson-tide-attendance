 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { ProgressRing } from '@/components/ui/progress-ring';
 import { Calendar, Clock } from 'lucide-react';
 
 const attendanceData = {
   overall: 87,
   subjects: [
     { name: 'Data Structures', code: 'CS301', attendance: 92, classes: 24, attended: 22, faculty: 'Dr. Priya Sharma' },
     { name: 'Database Systems', code: 'CS302', attendance: 88, classes: 25, attended: 22, faculty: 'Prof. Rajesh Kumar' },
     { name: 'Operating Systems', code: 'CS303', attendance: 85, classes: 20, attended: 17, faculty: 'Dr. Meena Iyer' },
     { name: 'Computer Networks', code: 'CS304', attendance: 80, classes: 20, attended: 16, faculty: 'Prof. Arun Singh' },
     { name: 'Software Engineering', code: 'CS305', attendance: 90, classes: 22, attended: 20, faculty: 'Dr. Kavitha Rao' },
   ],
 };
 
 const recentAttendance = [
   { date: '2025-02-05', day: 'Wed', classes: [
     { subject: 'Data Structures', time: '09:00', status: 'present' },
     { subject: 'Database Systems', time: '11:00', status: 'present' },
     { subject: 'Operating Systems', time: '14:00', status: 'absent' },
   ]},
   { date: '2025-02-04', day: 'Tue', classes: [
     { subject: 'Computer Networks', time: '09:00', status: 'present' },
     { subject: 'Software Engineering', time: '11:00', status: 'present' },
     { subject: 'Data Structures Lab', time: '14:00', status: 'present' },
   ]},
   { date: '2025-02-03', day: 'Mon', classes: [
     { subject: 'Data Structures', time: '09:00', status: 'present' },
     { subject: 'Database Systems', time: '11:00', status: 'onduty' },
     { subject: 'Operating Systems', time: '14:00', status: 'present' },
   ]},
 ];
 
 export default function StudentAttendanceHistory() {
   return (
     <DashboardLayout title="Attendance History" subtitle="View your complete attendance records">
       <div className="space-y-6">
         {/* Subject-wise Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {attendanceData.subjects.map((subject, index) => (
             <Card key={index} className="card-elevated animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
               <CardContent className="p-5">
                 <div className="flex items-start justify-between">
                   <div className="flex-1">
                     <p className="font-semibold">{subject.name}</p>
                     <p className="text-xs text-muted-foreground">{subject.code} • {subject.faculty}</p>
                     <div className="mt-3 space-y-1">
                       <p className="text-sm">
                         <span className="text-muted-foreground">Attended:</span>{' '}
                         <span className="font-medium">{subject.attended}/{subject.classes}</span>
                       </p>
                     </div>
                   </div>
                   <ProgressRing
                     value={subject.attendance}
                     size={70}
                     strokeWidth={6}
                     variant={subject.attendance >= 90 ? 'success' : subject.attendance >= 75 ? 'warning' : 'danger'}
                   />
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
 
         {/* Recent Attendance */}
         <Card className="card-elevated">
           <CardHeader className="pb-2">
             <CardTitle className="text-lg font-semibold flex items-center gap-2">
               <Calendar className="w-5 h-5" />
               Recent Attendance
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {recentAttendance.map((day, dayIndex) => (
                 <div key={dayIndex} className="border-b border-border last:border-0 pb-4 last:pb-0">
                   <div className="flex items-center gap-2 mb-3">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <span className="font-bold text-primary text-sm">{day.day}</span>
                     </div>
                     <span className="text-sm text-muted-foreground">{day.date}</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pl-12">
                     {day.classes.map((cls, clsIndex) => (
                       <div 
                         key={clsIndex}
                         className={`p-3 rounded-lg border ${
                           cls.status === 'present' ? 'bg-success/5 border-success/20' :
                           cls.status === 'absent' ? 'bg-destructive/5 border-destructive/20' :
                           'bg-secondary/5 border-secondary/20'
                         }`}
                       >
                         <div className="flex items-center justify-between">
                           <div>
                             <p className="font-medium text-sm">{cls.subject}</p>
                             <p className="text-xs text-muted-foreground flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {cls.time}
                             </p>
                           </div>
                           <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                             cls.status === 'present' ? 'bg-success/10 text-success' :
                             cls.status === 'absent' ? 'bg-destructive/10 text-destructive' :
                             'bg-secondary/10 text-secondary'
                           }`}>
                             {cls.status === 'present' ? 'P' : cls.status === 'absent' ? 'A' : 'OD'}
                           </span>
                         </div>
                       </div>
                     ))}
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