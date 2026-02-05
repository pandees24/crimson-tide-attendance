 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { StatCard } from '@/components/ui/stat-card';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Link } from 'react-router-dom';
 import { 
   Users, 
   GraduationCap, 
   Building2, 
   TrendingUp,
   ArrowRight,
   UserCog,
   Shield,
 } from 'lucide-react';
 
 // Mock system-wide data
 const systemStats = {
   totalStudents: 3840,
   totalStaff: 200,
   totalHods: 8,
   departments: 8,
   avgAttendance: 85,
 };
 
 const departmentList = [
   { name: 'Computer Science', hod: 'Dr. Anil Kumar', staff: 25, students: 480, attendance: 86 },
   { name: 'Electronics & Communication', hod: 'Dr. Meena Patel', staff: 22, students: 460, attendance: 84 },
   { name: 'Electrical & Electronics', hod: 'Dr. Suresh Reddy', staff: 20, students: 440, attendance: 85 },
   { name: 'Mechanical Engineering', hod: 'Dr. Ramesh Singh', staff: 28, students: 520, attendance: 83 },
   { name: 'Civil Engineering', hod: 'Dr. Kavitha Rao', staff: 24, students: 480, attendance: 87 },
   { name: 'Information Technology', hod: 'Dr. Prakash Iyer', staff: 22, students: 440, attendance: 86 },
   { name: 'Artificial Intelligence', hod: 'Dr. Anita Sharma', staff: 18, students: 360, attendance: 88 },
   { name: 'Biotechnology', hod: 'Dr. Vijay Kumar', staff: 15, students: 300, attendance: 85 },
 ];
 
 export default function SuperAdminDashboard() {
   return (
     <DashboardLayout title="Admin Dashboard" subtitle="Complete system overview">
       <div className="space-y-6">
         {/* Stats Row */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           <StatCard
             title="Total Students"
             value={systemStats.totalStudents.toLocaleString()}
             icon={GraduationCap}
             variant="primary"
           />
           <StatCard
             title="Total Staff"
             value={systemStats.totalStaff}
             icon={Users}
             variant="secondary"
           />
           <StatCard
             title="Departments"
             value={systemStats.departments}
             icon={Building2}
             variant="success"
           />
           <StatCard
             title="HoDs"
             value={systemStats.totalHods}
             icon={UserCog}
             variant="warning"
           />
           <StatCard
             title="Avg Attendance"
             value={`${systemStats.avgAttendance}%`}
             icon={TrendingUp}
             variant="primary"
           />
         </div>
 
         {/* Quick Actions */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Link to="/admin/super/users" className="block">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer group">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-4 rounded-xl bg-gradient-primary">
                   <Users className="w-8 h-8 text-primary-foreground" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Manage Users</h3>
                   <p className="text-sm text-muted-foreground">Add, edit, or remove users</p>
                 </div>
                 <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
               </CardContent>
             </Card>
           </Link>
 
           <Link to="/admin/super/departments" className="block">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer group">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-4 rounded-xl bg-gradient-secondary">
                   <Building2 className="w-8 h-8 text-secondary-foreground" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors">Departments</h3>
                   <p className="text-sm text-muted-foreground">Manage department settings</p>
                 </div>
                 <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-secondary transition-colors" />
               </CardContent>
             </Card>
           </Link>
 
           <Link to="/admin/super/attendance" className="block">
             <Card className="card-elevated hover:shadow-lg transition-shadow cursor-pointer group">
               <CardContent className="p-6 flex items-center gap-4">
                 <div className="p-4 rounded-xl bg-success/20">
                   <Shield className="w-8 h-8 text-success" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-lg group-hover:text-success transition-colors">Attendance</h3>
                   <p className="text-sm text-muted-foreground">View all attendance records</p>
                 </div>
                 <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-success transition-colors" />
               </CardContent>
             </Card>
           </Link>
         </div>
 
         {/* Departments Overview */}
         <Card className="card-elevated">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-lg font-semibold">Department Overview</CardTitle>
             <Link to="/admin/super/departments">
               <Button variant="outline" size="sm" className="gap-2">
                 Manage <ArrowRight className="w-4 h-4" />
               </Button>
             </Link>
           </CardHeader>
           <CardContent>
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead>
                   <tr className="border-b border-border">
                     <th className="text-left py-3 px-4 font-semibold text-sm">Department</th>
                     <th className="text-left py-3 px-4 font-semibold text-sm">HoD</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">Staff</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">Students</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">Attendance</th>
                     <th className="text-center py-3 px-4 font-semibold text-sm">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {departmentList.map((dept, index) => (
                     <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                       <td className="py-4 px-4">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                             <Building2 className="w-4 h-4 text-primary" />
                           </div>
                           <span className="font-medium">{dept.name}</span>
                         </div>
                       </td>
                       <td className="py-4 px-4 text-muted-foreground">{dept.hod}</td>
                       <td className="py-4 px-4 text-center">{dept.staff}</td>
                       <td className="py-4 px-4 text-center">{dept.students}</td>
                       <td className="py-4 px-4 text-center">
                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                           dept.attendance >= 85 ? 'bg-success/10 text-success' : 
                           dept.attendance >= 75 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                         }`}>
                           {dept.attendance}%
                         </span>
                       </td>
                       <td className="py-4 px-4 text-center">
                         <Button variant="ghost" size="sm">
                           View Details
                         </Button>
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