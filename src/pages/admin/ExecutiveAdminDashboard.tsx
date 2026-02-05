 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { StatCard } from '@/components/ui/stat-card';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Link } from 'react-router-dom';
 import { 
   Users, 
   GraduationCap, 
   Building2, 
   TrendingUp,
   Eye,
 } from 'lucide-react';
 
 export default function ExecutiveAdminDashboard() {
   return (
     <DashboardLayout title="Executive Dashboard" subtitle="View-only system overview">
       <div className="space-y-6">
         {/* View-only Notice */}
         <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center gap-3">
           <Eye className="w-5 h-5 text-secondary" />
           <p className="text-sm text-secondary">
             <span className="font-medium">View-Only Access:</span> You can view all data but cannot make modifications.
           </p>
         </div>
 
         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <StatCard
             title="Total Students"
             value="3,840"
             icon={GraduationCap}
             variant="primary"
           />
           <StatCard
             title="Total Staff"
             value="200"
             icon={Users}
             variant="secondary"
           />
           <StatCard
             title="Departments"
             value="8"
             icon={Building2}
             variant="success"
           />
           <StatCard
             title="Avg Attendance"
             value="85%"
             icon={TrendingUp}
             variant="warning"
           />
         </div>
 
         {/* Quick View Links */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Link to="/admin/executive/users">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer h-full">
               <CardContent className="p-6 text-center">
                 <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                   <Users className="w-8 h-8 text-primary" />
                 </div>
                 <h3 className="font-semibold text-lg">View Users</h3>
                 <p className="text-sm text-muted-foreground mt-1">Browse all user records</p>
               </CardContent>
             </Card>
           </Link>
 
           <Link to="/admin/executive/attendance">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer h-full">
               <CardContent className="p-6 text-center">
                 <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                   <TrendingUp className="w-8 h-8 text-secondary" />
                 </div>
                 <h3 className="font-semibold text-lg">View Attendance</h3>
                 <p className="text-sm text-muted-foreground mt-1">Access attendance reports</p>
               </CardContent>
             </Card>
           </Link>
 
           <Link to="/admin/executive/departments">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer h-full">
               <CardContent className="p-6 text-center">
                 <div className="mx-auto w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-4">
                   <Building2 className="w-8 h-8 text-success" />
                 </div>
                 <h3 className="font-semibold text-lg">View Departments</h3>
                 <p className="text-sm text-muted-foreground mt-1">Browse department data</p>
               </CardContent>
             </Card>
           </Link>
         </div>
       </div>
     </DashboardLayout>
   );
 }