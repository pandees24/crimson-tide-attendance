 import { useState } from 'react';
 import { Link, useLocation } from 'react-router-dom';
 import { useAuth } from '@/contexts/AuthContext';
 import { ROLE_DISPLAY_NAMES, UserRole } from '@/types/auth';
 import {
   LayoutDashboard,
   Calendar,
  ClipboardList,
  FileText,
  Users,
  UserCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Building2,
  Fingerprint,
  CalendarDays,
} from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { Button } from '@/components/ui/button';
 import { Avatar, AvatarFallback } from '@/components/ui/avatar';
 import { Separator } from '@/components/ui/separator';
 
 interface NavItem {
   icon: React.ElementType;
   label: string;
   path: string;
 }
 
 const getNavItems = (role: UserRole, basePath: string): NavItem[] => {
   const commonItems: NavItem[] = [
     { icon: LayoutDashboard, label: 'Dashboard', path: basePath },
   ];
 
   switch (role) {
     case 'student':
       return [
         ...commonItems,
         { icon: Calendar, label: 'Attendance', path: `${basePath}/attendance` },
         { icon: FileText, label: 'Leave/On-Duty', path: `${basePath}/leave` },
       ];
    case 'faculty':
      return [
        ...commonItems,
        { icon: ClipboardList, label: 'Mark Attendance', path: `${basePath}/mark-attendance` },
        { icon: Fingerprint, label: 'Biometric Log', path: `${basePath}/history` },
        { icon: CalendarDays, label: 'Timetable', path: `${basePath}/timetable` },
        { icon: FileText, label: 'Leave/On-Duty', path: `${basePath}/leave` },
      ];
     case 'hod':
       return [
         ...commonItems,
         { icon: Users, label: 'Staff Attendance', path: `${basePath}/staff` },
         { icon: GraduationCap, label: 'Student Attendance', path: `${basePath}/students` },
         { icon: UserCheck, label: 'Approvals', path: `${basePath}/approvals` },
       ];
     case 'super_admin':
       return [
         ...commonItems,
         { icon: Users, label: 'Manage Users', path: `${basePath}/users` },
         { icon: Building2, label: 'Departments', path: `${basePath}/departments` },
         { icon: ClipboardList, label: 'All Attendance', path: `${basePath}/attendance` },
       ];
     case 'executive_admin':
       return [
         ...commonItems,
         { icon: Users, label: 'View Users', path: `${basePath}/users` },
         { icon: ClipboardList, label: 'View Attendance', path: `${basePath}/attendance` },
         { icon: Building2, label: 'View Departments', path: `${basePath}/departments` },
       ];
     case 'academic_admin':
       return [
         ...commonItems,
         { icon: GraduationCap, label: 'Students', path: `${basePath}/students` },
         { icon: ClipboardList, label: 'Attendance', path: `${basePath}/attendance` },
       ];
     default:
       return commonItems;
   }
 };
 
 export function Sidebar() {
   const { user, logout } = useAuth();
   const location = useLocation();
   const [isCollapsed, setIsCollapsed] = useState(false);
 
   if (!user) return null;
 
   const basePath = `/${user.role === 'super_admin' ? 'admin/super' : 
                       user.role === 'executive_admin' ? 'admin/executive' : 
                       user.role === 'academic_admin' ? 'admin/academic' : 
                       user.role}`;
   const navItems = getNavItems(user.role, basePath);
 
   const getInitials = (name: string) => {
     return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
   };
 
   return (
     <aside 
       className={cn(
         "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
         isCollapsed ? "w-20" : "w-64"
       )}
     >
       {/* Logo Section */}
       <div className="flex items-center justify-between p-4 h-16">
         {!isCollapsed && (
           <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
               <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
             </div>
             <div>
               <h1 className="font-bold text-lg text-sidebar-primary">ERP</h1>
               <p className="text-xs text-sidebar-muted">Attendance</p>
             </div>
           </div>
         )}
         {isCollapsed && (
           <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center mx-auto">
             <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
           </div>
         )}
       </div>
 
       <Separator className="bg-sidebar-border" />
 
       {/* User Info */}
       <div className={cn("p-4", isCollapsed && "flex justify-center")}>
         {!isCollapsed ? (
           <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10 border-2 border-sidebar-accent">
               <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm font-semibold">
                 {getInitials(user.name)}
               </AvatarFallback>
             </Avatar>
             <div className="flex-1 min-w-0">
               <p className="font-medium text-sm truncate">{user.name}</p>
               <p className="text-xs text-sidebar-muted truncate">
                 {ROLE_DISPLAY_NAMES[user.role]}
               </p>
             </div>
           </div>
         ) : (
           <Avatar className="h-10 w-10 border-2 border-sidebar-accent">
             <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-sm font-semibold">
               {getInitials(user.name)}
             </AvatarFallback>
           </Avatar>
         )}
       </div>
 
       <Separator className="bg-sidebar-border" />
 
       {/* Navigation */}
       <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
         {navItems.map((item) => {
           const isActive = location.pathname === item.path;
           return (
             <Link
               key={item.path}
               to={item.path}
               className={cn(
                 "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                 isActive 
                   ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                   : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                 isCollapsed && "justify-center px-2"
               )}
             >
               <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-sidebar-ring")} />
               {!isCollapsed && <span className="text-sm">{item.label}</span>}
             </Link>
           );
         })}
       </nav>
 
       {/* Bottom Section */}
       <div className="p-3 space-y-1">
         <Separator className="bg-sidebar-border mb-3" />
         
         <Button
           variant="ghost"
           onClick={logout}
           className={cn(
             "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
             isCollapsed && "justify-center px-2"
           )}
         >
           <LogOut className="w-5 h-5 flex-shrink-0" />
           {!isCollapsed && <span className="text-sm">Logout</span>}
         </Button>
       </div>
 
       {/* Collapse Toggle */}
       <Button
         variant="ghost"
         size="icon"
         onClick={() => setIsCollapsed(!isCollapsed)}
         className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-accent text-sidebar-accent-foreground shadow-md hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
       >
         {isCollapsed ? (
           <ChevronRight className="w-4 h-4" />
         ) : (
           <ChevronLeft className="w-4 h-4" />
         )}
       </Button>
     </aside>
   );
 }