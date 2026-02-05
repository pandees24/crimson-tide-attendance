 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { StatCard } from '@/components/ui/stat-card';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Link } from 'react-router-dom';
 import { 
   GraduationCap, 
   ClipboardCheck, 
   TrendingUp,
   ArrowRight,
   Edit,
 } from 'lucide-react';
 
 export default function AcademicAdminDashboard() {
   return (
     <DashboardLayout title="Academic Admin Dashboard" subtitle="Manage student data and attendance">
       <div className="space-y-6">
         {/* Access Notice */}
         <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
           <Edit className="w-5 h-5 text-primary" />
           <p className="text-sm text-primary">
             <span className="font-medium">Academic Access:</span> You can view and edit student data and attendance records.
           </p>
         </div>
 
         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <StatCard
             title="Total Students"
             value="3,840"
             icon={GraduationCap}
             variant="primary"
           />
           <StatCard
             title="Today's Attendance"
             value="3,264"
             subtitle="85% present"
             icon={ClipboardCheck}
             variant="success"
           />
           <StatCard
             title="Avg Attendance"
             value="85%"
             icon={TrendingUp}
             variant="secondary"
           />
         </div>
 
         {/* Quick Actions */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <Link to="/admin/academic/students">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer group">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-4 rounded-xl bg-gradient-primary">
                   <GraduationCap className="w-8 h-8 text-primary-foreground" />
                 </div>
                 <div className="flex-1">
                   <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Manage Students</h3>
                   <p className="text-sm text-muted-foreground">View and edit student records</p>
                 </div>
                 <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
               </CardContent>
             </Card>
           </Link>
 
           <Link to="/admin/academic/attendance">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer group">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-4 rounded-xl bg-gradient-secondary">
                   <ClipboardCheck className="w-8 h-8 text-secondary-foreground" />
                 </div>
                 <div className="flex-1">
                   <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors">Manage Attendance</h3>
                   <p className="text-sm text-muted-foreground">View and edit attendance records</p>
                 </div>
                 <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
               </CardContent>
             </Card>
           </Link>
         </div>
       </div>
     </DashboardLayout>
   );
 }