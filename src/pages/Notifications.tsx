 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { useAuth } from '@/contexts/AuthContext';
 import { 
   Bell, 
   Check, 
   X, 
   Clock, 
   CheckCircle2, 
   XCircle,
   FileText,
   Calendar,
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 
 type NotificationStatus = 'pending' | 'approved' | 'rejected';
 
 interface Notification {
   id: string;
   type: 'leave' | 'onduty' | 'attendance' | 'approval_request';
   title: string;
   description: string;
   date: string;
   status: NotificationStatus;
   actionable?: boolean;
 }
 
 const getNotifications = (role: string): Notification[] => {
   switch (role) {
     case 'student':
       return [
         { id: '1', type: 'leave', title: 'Medical Leave Request', description: 'Your request for Feb 10-12 has been approved by Faculty', date: '2 hours ago', status: 'approved' },
         { id: '2', type: 'onduty', title: 'On-Duty Request', description: 'Hackathon participation request pending HoD approval', date: '1 day ago', status: 'pending' },
         { id: '3', type: 'leave', title: 'Personal Leave Request', description: 'Your request for Jan 25 was rejected', date: '1 week ago', status: 'rejected' },
       ];
     case 'faculty':
       return [
         { id: '1', type: 'approval_request', title: 'Leave Request - Amit Sharma', description: 'Medical leave for Feb 10-12, 2025', date: '1 hour ago', status: 'pending', actionable: true },
         { id: '2', type: 'approval_request', title: 'On-Duty Request - Priya Patel', description: 'Hackathon participation on Feb 15', date: '3 hours ago', status: 'pending', actionable: true },
         { id: '3', type: 'leave', title: 'Your Leave Approved', description: 'Your casual leave for Feb 20 was approved', date: '2 days ago', status: 'approved' },
       ];
     case 'hod':
       return [
         { id: '1', type: 'approval_request', title: 'Staff Leave - Dr. Priya Sharma', description: 'Medical leave request for Feb 10-12', date: '30 mins ago', status: 'pending', actionable: true },
         { id: '2', type: 'approval_request', title: 'Student On-Duty - Rahul Kumar', description: 'Hackathon participation (Faculty approved)', date: '2 hours ago', status: 'pending', actionable: true },
         { id: '3', type: 'attendance', title: 'Unlock Request', description: 'Prof. Rajesh Kumar requests to unlock CSE-A attendance', date: '1 day ago', status: 'pending', actionable: true },
       ];
     default:
       return [];
   }
 };
 
 const statusConfig = {
   pending: {
     icon: Clock,
     className: 'bg-warning/10 text-warning border-warning/20',
     label: 'Pending',
   },
   approved: {
     icon: CheckCircle2,
     className: 'bg-success/10 text-success border-success/20',
     label: 'Approved',
   },
   rejected: {
     icon: XCircle,
     className: 'bg-destructive/10 text-destructive border-destructive/20',
     label: 'Rejected',
   },
 };
 
 export default function Notifications() {
   const { user } = useAuth();
   const notifications = user ? getNotifications(user.role) : [];
 
   const getIcon = (type: string) => {
     switch (type) {
       case 'leave':
         return Calendar;
       case 'onduty':
         return FileText;
       case 'attendance':
         return Clock;
       case 'approval_request':
         return Bell;
       default:
         return Bell;
     }
   };
 
   return (
     <DashboardLayout title="Notifications" subtitle="View your latest updates and requests">
       <div className="max-w-3xl mx-auto space-y-4">
         {notifications.length === 0 ? (
           <Card className="card-elevated">
             <CardContent className="p-12 text-center">
               <div className="w-16 h-16 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-4">
                 <Bell className="w-8 h-8 text-muted-foreground" />
               </div>
               <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
               <p className="text-muted-foreground">You're all caught up!</p>
             </CardContent>
           </Card>
         ) : (
           notifications.map((notification, index) => {
             const StatusIcon = statusConfig[notification.status].icon;
             const NotificationIcon = getIcon(notification.type);
             
             return (
               <Card 
                 key={notification.id} 
                 className="card-elevated animate-slide-up"
                 style={{ animationDelay: `${index * 50}ms` }}
               >
                 <CardContent className="p-4">
                   <div className="flex items-start gap-4">
                     <div className={cn(
                       "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                       notification.type === 'approval_request' ? 'bg-primary/10' : 'bg-secondary/10'
                     )}>
                       <NotificationIcon className={cn(
                         "w-6 h-6",
                         notification.type === 'approval_request' ? 'text-primary' : 'text-secondary'
                       )} />
                     </div>
                     
                     <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between gap-4">
                         <div>
                           <h3 className="font-semibold">{notification.title}</h3>
                           <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                           <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                         </div>
                         
                         <span className={cn(
                           "px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 flex-shrink-0",
                           statusConfig[notification.status].className
                         )}>
                           <StatusIcon className="w-3 h-3" />
                           {statusConfig[notification.status].label}
                         </span>
                       </div>
                       
                       {notification.actionable && (
                         <div className="flex gap-2 mt-4">
                           <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 gap-1">
                             <Check className="w-4 h-4" /> Approve
                           </Button>
                           <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1">
                             <X className="w-4 h-4" /> Reject
                           </Button>
                         </div>
                       )}
                     </div>
                   </div>
                 </CardContent>
               </Card>
             );
           })
         )}
       </div>
     </DashboardLayout>
   );
 }