 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { 
   Check, 
   X, 
   FileText, 
   Users, 
   GraduationCap,
   Unlock,
   Clock,
 } from 'lucide-react';
 import { toast } from 'sonner';
 
 const staffRequests = [
   { id: '1', name: 'Dr. Priya Sharma', type: 'Medical Leave', dates: 'Feb 10-12, 2025', reason: 'Medical appointment and recovery', proxyStaff: 'Prof. Rajesh Kumar' },
   { id: '2', name: 'Prof. Arun Singh', type: 'On-Duty', dates: 'Feb 15, 2025', reason: 'IEEE Conference attendance', proxyStaff: 'Dr. Meena Iyer' },
 ];
 
 const studentRequests = [
   { id: '1', name: 'Amit Sharma', rollNo: '21CS001', type: 'On-Duty', dates: 'Feb 15, 2025', reason: 'National Hackathon participation', facultyApproval: 'Dr. Priya Sharma' },
   { id: '2', name: 'Priya Patel', rollNo: '21CS002', type: 'Medical Leave', dates: 'Feb 18-19, 2025', reason: 'Medical treatment', facultyApproval: 'Prof. Rajesh Kumar' },
   { id: '3', name: 'Rahul Kumar', rollNo: '21CS003', type: 'Personal Leave', dates: 'Feb 20, 2025', reason: 'Family function', facultyApproval: 'Dr. Priya Sharma' },
 ];
 
 const unlockRequests = [
   { id: '1', faculty: 'Prof. Rajesh Kumar', class: 'CSE-A 3rd Sem', date: 'Feb 5, 2025', subject: 'Data Structures', reason: 'Marked wrong student absent' },
   { id: '2', faculty: 'Dr. Meena Iyer', class: 'CSE-B 5th Sem', date: 'Feb 4, 2025', subject: 'Operating Systems', reason: 'System error during submission' },
 ];
 
 export default function HodApprovals() {
   const handleApprove = (type: string, id: string) => {
     toast.success(`${type} request approved successfully!`);
   };
 
   const handleReject = (type: string, id: string) => {
     toast.error(`${type} request rejected.`);
   };
 
   return (
     <DashboardLayout title="Approval Requests" subtitle="Manage pending approvals for your department">
       <Tabs defaultValue="staff" className="space-y-6">
         <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
           <TabsTrigger value="staff" className="gap-2">
             <Users className="w-4 h-4" />
             Staff ({staffRequests.length})
           </TabsTrigger>
           <TabsTrigger value="students" className="gap-2">
             <GraduationCap className="w-4 h-4" />
             Students ({studentRequests.length})
           </TabsTrigger>
           <TabsTrigger value="unlock" className="gap-2">
             <Unlock className="w-4 h-4" />
             Unlock ({unlockRequests.length})
           </TabsTrigger>
         </TabsList>
 
         {/* Staff Requests */}
         <TabsContent value="staff" className="space-y-4">
           {staffRequests.map((request) => (
             <Card key={request.id} className="card-elevated animate-slide-up">
               <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                       <FileText className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-lg">{request.name}</h3>
                       <p className="text-sm text-muted-foreground">{request.type} • {request.dates}</p>
                       <p className="text-sm mt-2">{request.reason}</p>
                       <p className="text-xs text-muted-foreground mt-1">
                         Proxy: <span className="font-medium">{request.proxyStaff}</span>
                       </p>
                     </div>
                   </div>
                   <div className="flex gap-2 self-end md:self-center">
                     <Button
                       size="sm"
                       variant="outline"
                       onClick={() => handleReject('Staff leave', request.id)}
                       className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1"
                     >
                       <X className="w-4 h-4" /> Reject
                     </Button>
                     <Button
                       size="sm"
                       onClick={() => handleApprove('Staff leave', request.id)}
                       className="bg-success text-success-foreground hover:bg-success/90 gap-1"
                     >
                       <Check className="w-4 h-4" /> Approve
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
         </TabsContent>
 
         {/* Student Requests */}
         <TabsContent value="students" className="space-y-4">
           {studentRequests.map((request) => (
             <Card key={request.id} className="card-elevated animate-slide-up">
               <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                       <GraduationCap className="w-6 h-6 text-secondary" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-lg">{request.name}</h3>
                       <p className="text-sm text-muted-foreground">{request.rollNo} • {request.type} • {request.dates}</p>
                       <p className="text-sm mt-2">{request.reason}</p>
                       <p className="text-xs text-muted-foreground mt-1">
                         Faculty Approved: <span className="font-medium text-success">{request.facultyApproval}</span>
                       </p>
                     </div>
                   </div>
                   <div className="flex gap-2 self-end md:self-center">
                     <Button
                       size="sm"
                       variant="outline"
                       onClick={() => handleReject('Student leave', request.id)}
                       className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1"
                     >
                       <X className="w-4 h-4" /> Reject
                     </Button>
                     <Button
                       size="sm"
                       onClick={() => handleApprove('Student leave', request.id)}
                       className="bg-success text-success-foreground hover:bg-success/90 gap-1"
                     >
                       <Check className="w-4 h-4" /> Approve
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
         </TabsContent>
 
         {/* Unlock Requests */}
         <TabsContent value="unlock" className="space-y-4">
           {unlockRequests.map((request) => (
             <Card key={request.id} className="card-elevated animate-slide-up">
               <CardContent className="p-6">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                       <Unlock className="w-6 h-6 text-warning" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-lg">{request.faculty}</h3>
                       <p className="text-sm text-muted-foreground">
                         {request.class} • {request.subject} • {request.date}
                       </p>
                       <p className="text-sm mt-2">{request.reason}</p>
                     </div>
                   </div>
                   <div className="flex gap-2 self-end md:self-center">
                     <Button
                       size="sm"
                       variant="outline"
                       onClick={() => handleReject('Unlock', request.id)}
                       className="text-destructive border-destructive/30 hover:bg-destructive/10 gap-1"
                     >
                       <X className="w-4 h-4" /> Deny
                     </Button>
                     <Button
                       size="sm"
                       onClick={() => handleApprove('Attendance unlock', request.id)}
                       className="bg-warning text-warning-foreground hover:bg-warning/90 gap-1"
                     >
                       <Unlock className="w-4 h-4" /> Unlock
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
         </TabsContent>
       </Tabs>
     </DashboardLayout>
   );
 }