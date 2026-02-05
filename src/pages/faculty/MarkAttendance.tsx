 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { Badge } from '@/components/ui/badge';
 import { 
   Search, 
   Check, 
   X, 
   Clock, 
   Users, 
   CheckCircle2,
   AlertCircle,
   Lock,
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { toast } from 'sonner';
 
 // Mock schedule data
 const todayClasses = [
   { id: 1, subject: 'Data Structures', class: 'CSE-A 3rd Sem', time: '09:00 - 10:00', isLocked: true },
   { id: 2, subject: 'Data Structures', class: 'CSE-B 3rd Sem', time: '10:00 - 11:00', isLocked: true },
   { id: 3, subject: 'Algorithms', class: 'CSE-A 5th Sem', time: '11:30 - 12:30', isLocked: false },
   { id: 4, subject: 'Data Structures Lab', class: 'CSE-A 3rd Sem', time: '02:00 - 04:00', isLocked: false },
 ];
 
 // Mock students
 const mockStudents = [
   { id: '202312345601', name: 'Amit Sharma', rollNo: '21CS001' },
   { id: '202312345602', name: 'Priya Patel', rollNo: '21CS002' },
   { id: '202312345603', name: 'Rahul Kumar', rollNo: '21CS003' },
   { id: '202312345604', name: 'Sneha Reddy', rollNo: '21CS004' },
   { id: '202312345605', name: 'Vikram Singh', rollNo: '21CS005' },
   { id: '202312345606', name: 'Ananya Iyer', rollNo: '21CS006' },
   { id: '202312345607', name: 'Karthik Raj', rollNo: '21CS007' },
   { id: '202312345608', name: 'Divya Nair', rollNo: '21CS008' },
   { id: '202312345609', name: 'Arjun Menon', rollNo: '21CS009' },
   { id: '202312345610', name: 'Kavya Sharma', rollNo: '21CS010' },
 ];
 
 type AttendanceStatus = 'present' | 'absent' | 'onduty' | null;
 
 export default function MarkAttendance() {
   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
   const [selectedClass, setSelectedClass] = useState('');
   const [searchQuery, setSearchQuery] = useState('');
   const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
   const [isSubmitted, setIsSubmitted] = useState(false);
 
   const selectedClassData = todayClasses.find(c => c.id.toString() === selectedClass);
   
   const filteredStudents = mockStudents.filter(student => 
     student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
     student.id.includes(searchQuery)
   );
 
   const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
     if (isSubmitted) return;
     setAttendance(prev => ({
       ...prev,
       [studentId]: prev[studentId] === status ? null : status
     }));
   };
 
   const handleMarkAll = (status: AttendanceStatus) => {
     if (isSubmitted) return;
     const newAttendance: Record<string, AttendanceStatus> = {};
     filteredStudents.forEach(student => {
       newAttendance[student.id] = status;
     });
     setAttendance(newAttendance);
   };
 
   const handleSubmit = () => {
     const unmarkedStudents = mockStudents.filter(s => !attendance[s.id]);
     if (unmarkedStudents.length > 0) {
       toast.error(`Please mark attendance for all students. ${unmarkedStudents.length} students unmarked.`);
       return;
     }
     setIsSubmitted(true);
     toast.success('Attendance submitted successfully!');
   };
 
   const presentCount = Object.values(attendance).filter(s => s === 'present').length;
   const absentCount = Object.values(attendance).filter(s => s === 'absent').length;
   const onDutyCount = Object.values(attendance).filter(s => s === 'onduty').length;
 
   return (
     <DashboardLayout title="Mark Attendance" subtitle="Record student attendance for your classes">
       <div className="space-y-6">
         {/* Selection Controls */}
         <Card className="card-elevated">
           <CardContent className="p-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {/* Date Selection */}
               <div className="space-y-2">
                 <Label className="text-sm font-medium">Date</Label>
                 <Input
                   type="date"
                   value={selectedDate}
                   onChange={(e) => setSelectedDate(e.target.value)}
                   className="h-12 input-focus"
                 />
               </div>
 
               {/* Class Selection */}
               <div className="space-y-2 md:col-span-2">
                 <Label className="text-sm font-medium">Class / Period</Label>
                 <Select value={selectedClass} onValueChange={setSelectedClass}>
                   <SelectTrigger className="h-12 input-focus">
                     <SelectValue placeholder="Select a class" />
                   </SelectTrigger>
                   <SelectContent>
                     {todayClasses.map((cls, index) => (
                       <SelectItem 
                         key={cls.id} 
                         value={cls.id.toString()}
                         disabled={index > 0 && !todayClasses[index - 1].isLocked}
                       >
                         <div className="flex items-center gap-3">
                           <span className="font-medium">{cls.time}</span>
                           <span className="text-muted-foreground">•</span>
                           <span>{cls.subject}</span>
                           <span className="text-muted-foreground">•</span>
                           <span className="text-muted-foreground">{cls.class}</span>
                           {cls.isLocked && (
                             <Lock className="w-3 h-3 text-muted-foreground ml-2" />
                           )}
                         </div>
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
             </div>
           </CardContent>
         </Card>
 
         {/* Attendance Marking Area */}
         {selectedClass && (
           <Card className="card-elevated animate-slide-up">
             <CardHeader className="pb-4">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                   <CardTitle className="text-xl font-bold flex items-center gap-3">
                     {selectedClassData?.subject}
                     {isSubmitted && (
                       <Badge className="bg-success/10 text-success border-success/20">
                         <Lock className="w-3 h-3 mr-1" /> Submitted
                       </Badge>
                     )}
                   </CardTitle>
                   <p className="text-muted-foreground mt-1">
                     {selectedClassData?.class} • {selectedClassData?.time}
                   </p>
                 </div>
 
                 {/* Stats */}
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                     <CheckCircle2 className="w-4 h-4 text-success" />
                     <span className="font-semibold text-success">{presentCount}</span>
                     <span className="text-sm text-success/80">Present</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20">
                     <X className="w-4 h-4 text-destructive" />
                     <span className="font-semibold text-destructive">{absentCount}</span>
                     <span className="text-sm text-destructive/80">Absent</span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/20">
                     <Clock className="w-4 h-4 text-secondary" />
                     <span className="font-semibold text-secondary">{onDutyCount}</span>
                     <span className="text-sm text-secondary/80">On-Duty</span>
                   </div>
                 </div>
               </div>
             </CardHeader>
 
             <CardContent>
               {/* Search and Bulk Actions */}
               <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
                 <div className="relative flex-1 max-w-md">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     placeholder="Search by name, roll number, or ID..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="pl-10 h-11 input-focus"
                   />
                 </div>
 
                 {!isSubmitted && (
                   <div className="flex items-center gap-2">
                     <span className="text-sm text-muted-foreground mr-2">Mark All:</span>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => handleMarkAll('present')}
                       className="gap-2 border-success/30 text-success hover:bg-success/10"
                     >
                       <Check className="w-4 h-4" /> Present
                     </Button>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={() => handleMarkAll('absent')}
                       className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
                     >
                       <X className="w-4 h-4" /> Absent
                     </Button>
                   </div>
                 )}
               </div>
 
               {/* Student List */}
               <div className="space-y-2">
                 {filteredStudents.map((student, index) => {
                   const status = attendance[student.id];
                   return (
                     <div
                       key={student.id}
                       className={cn(
                         "flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                         status === 'present' && "bg-success/5 border-success/30",
                         status === 'absent' && "bg-destructive/5 border-destructive/30",
                         status === 'onduty' && "bg-secondary/5 border-secondary/30",
                         !status && "bg-muted/30 border-border hover:border-primary/30"
                       )}
                       style={{ animationDelay: `${index * 30}ms` }}
                     >
                       <div className="flex items-center gap-4">
                         <div className={cn(
                           "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-colors",
                           status === 'present' && "bg-success/20 text-success",
                           status === 'absent' && "bg-destructive/20 text-destructive",
                           status === 'onduty' && "bg-secondary/20 text-secondary",
                           !status && "bg-muted text-muted-foreground"
                         )}>
                           {student.rollNo.slice(-2)}
                         </div>
                         <div>
                           <p className="font-semibold">{student.name}</p>
                           <p className="text-sm text-muted-foreground">
                             {student.rollNo} • {student.id}
                           </p>
                         </div>
                       </div>
 
                       <div className="flex items-center gap-2">
                         <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => handleStatusChange(student.id, 'present')}
                           disabled={isSubmitted}
                           className={cn(
                             "h-11 w-11 rounded-xl transition-all",
                             status === 'present' 
                               ? "bg-success text-success-foreground shadow-md" 
                               : "hover:bg-success/20 text-muted-foreground hover:text-success"
                           )}
                         >
                           <Check className="w-5 h-5" />
                         </Button>
                         <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => handleStatusChange(student.id, 'absent')}
                           disabled={isSubmitted}
                           className={cn(
                             "h-11 w-11 rounded-xl transition-all",
                             status === 'absent' 
                               ? "bg-destructive text-destructive-foreground shadow-md" 
                               : "hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
                           )}
                         >
                           <X className="w-5 h-5" />
                         </Button>
                         <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => handleStatusChange(student.id, 'onduty')}
                           disabled={isSubmitted}
                           className={cn(
                             "h-11 w-11 rounded-xl transition-all",
                             status === 'onduty' 
                               ? "bg-secondary text-secondary-foreground shadow-md" 
                               : "hover:bg-secondary/20 text-muted-foreground hover:text-secondary"
                           )}
                         >
                           <Clock className="w-5 h-5" />
                         </Button>
                       </div>
                     </div>
                   );
                 })}
               </div>
 
               {/* Submit Button */}
               {!isSubmitted && (
                 <div className="mt-6 flex justify-end">
                   <Button 
                     onClick={handleSubmit}
                     className="h-12 px-8 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-primary font-semibold"
                   >
                     <CheckCircle2 className="w-5 h-5 mr-2" />
                     Submit Attendance
                   </Button>
                 </div>
               )}
 
               {isSubmitted && (
                 <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
                   <CheckCircle2 className="w-5 h-5 text-success" />
                   <div>
                     <p className="font-medium text-success">Attendance Submitted Successfully</p>
                     <p className="text-sm text-success/80">Contact HoD to unlock if corrections are needed.</p>
                   </div>
                 </div>
               )}
             </CardContent>
           </Card>
         )}
 
         {/* Empty State */}
         {!selectedClass && (
           <Card className="card-elevated">
             <CardContent className="p-12 text-center">
               <div className="w-16 h-16 rounded-2xl bg-muted mx-auto flex items-center justify-center mb-4">
                 <Users className="w-8 h-8 text-muted-foreground" />
               </div>
               <h3 className="text-lg font-semibold mb-2">Select a Class</h3>
               <p className="text-muted-foreground max-w-md mx-auto">
                 Choose a date and class from the options above to start marking attendance.
               </p>
             </CardContent>
           </Card>
         )}
       </div>
     </DashboardLayout>
   );
 }