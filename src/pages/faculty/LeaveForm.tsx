 import { useState } from 'react';
 import { DashboardLayout } from '@/components/layout/DashboardLayout';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { Calendar, FileText, Send, Clock, Users } from 'lucide-react';
 import { toast } from 'sonner';
 
 const leaveTypes = [
   { value: 'casual', label: 'Casual Leave' },
   { value: 'medical', label: 'Medical Leave' },
   { value: 'earned', label: 'Earned Leave' },
   { value: 'personal', label: 'Personal Leave' },
 ];
 
 const onDutyTypes = [
   { value: 'conference', label: 'Conference/Workshop' },
   { value: 'training', label: 'Training Program' },
   { value: 'research', label: 'Research Work' },
   { value: 'exam', label: 'Exam Duty' },
   { value: 'other', label: 'Other Official Duty' },
 ];
 
 const proxyStaff = [
   { id: '1', name: 'Dr. Priya Sharma' },
   { id: '2', name: 'Prof. Rajesh Kumar' },
   { id: '3', name: 'Dr. Meena Iyer' },
   { id: '4', name: 'Prof. Arun Singh' },
   { id: '5', name: 'Dr. Kavitha Rao' },
 ];
 
 // Mock timetable for the selected date
 const getTimetable = (date: string) => [
   { time: '09:00 - 10:00', subject: 'Data Structures', class: 'CSE-A 3rd Sem' },
   { time: '10:00 - 11:00', subject: 'Data Structures', class: 'CSE-B 3rd Sem' },
   { time: '11:30 - 12:30', subject: 'Algorithms', class: 'CSE-A 5th Sem' },
   { time: '02:00 - 04:00', subject: 'Data Structures Lab', class: 'CSE-A 3rd Sem' },
 ];
 
 export default function FacultyLeaveForm() {
   const [formType, setFormType] = useState<'leave' | 'onduty'>('leave');
   const [leaveType, setLeaveType] = useState('');
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [proxyStaffId, setProxyStaffId] = useState('');
   const [reason, setReason] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     await new Promise(resolve => setTimeout(resolve, 1000));
     
     toast.success(`${formType === 'leave' ? 'Leave' : 'On-Duty'} request submitted successfully!`);
     
     setLeaveType('');
     setFromDate('');
     setToDate('');
     setProxyStaffId('');
     setReason('');
     setIsSubmitting(false);
   };
 
   const typeOptions = formType === 'leave' ? leaveTypes : onDutyTypes;
   const timetable = fromDate ? getTimetable(fromDate) : [];
 
   return (
     <DashboardLayout title="Leave / On-Duty Request" subtitle="Submit your leave or on-duty application">
       <div className="max-w-3xl mx-auto">
         <Card className="card-elevated">
           <CardHeader className="pb-4">
             <div className="flex p-1 bg-muted rounded-xl">
               <Button
                 variant="ghost"
                 onClick={() => setFormType('leave')}
                 className={`flex-1 gap-2 rounded-lg transition-all ${
                   formType === 'leave' 
                     ? 'bg-card shadow-sm text-foreground' 
                     : 'text-muted-foreground hover:text-foreground'
                 }`}
               >
                 <Calendar className="w-4 h-4" />
                 Leave Request
               </Button>
               <Button
                 variant="ghost"
                 onClick={() => setFormType('onduty')}
                 className={`flex-1 gap-2 rounded-lg transition-all ${
                   formType === 'onduty' 
                     ? 'bg-card shadow-sm text-foreground' 
                     : 'text-muted-foreground hover:text-foreground'
                 }`}
               >
                 <FileText className="w-4 h-4" />
                 On-Duty Request
               </Button>
             </div>
           </CardHeader>
 
           <CardContent>
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Left Column */}
                 <div className="space-y-6">
                   {/* Type Selection */}
                   <div className="space-y-2">
                     <Label className="text-sm font-medium">
                       {formType === 'leave' ? 'Leave Type' : 'On-Duty Type'}
                     </Label>
                     <Select value={leaveType} onValueChange={setLeaveType} required>
                       <SelectTrigger className="h-12 input-focus">
                         <SelectValue placeholder={`Select ${formType === 'leave' ? 'leave' : 'on-duty'} type`} />
                       </SelectTrigger>
                       <SelectContent>
                         {typeOptions.map((type) => (
                           <SelectItem key={type.value} value={type.value}>
                             {type.label}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
 
                   {/* Date Range */}
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label className="text-sm font-medium">From Date</Label>
                       <Input
                         type="date"
                         value={fromDate}
                         onChange={(e) => setFromDate(e.target.value)}
                         className="h-12 input-focus"
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label className="text-sm font-medium">To Date</Label>
                       <Input
                         type="date"
                         value={toDate}
                         onChange={(e) => setToDate(e.target.value)}
                         min={fromDate}
                         className="h-12 input-focus"
                         required
                       />
                     </div>
                   </div>
 
                   {/* Proxy Staff */}
                   <div className="space-y-2">
                     <Label className="text-sm font-medium flex items-center gap-2">
                       <Users className="w-4 h-4" />
                       Proxy Staff
                     </Label>
                     <Select value={proxyStaffId} onValueChange={setProxyStaffId} required>
                       <SelectTrigger className="h-12 input-focus">
                         <SelectValue placeholder="Select proxy staff" />
                       </SelectTrigger>
                       <SelectContent>
                         {proxyStaff.map((staff) => (
                           <SelectItem key={staff.id} value={staff.id}>
                             {staff.name}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
 
                   {/* Reason */}
                   <div className="space-y-2">
                     <Label className="text-sm font-medium">Reason</Label>
                     <Textarea
                       value={reason}
                       onChange={(e) => setReason(e.target.value)}
                       placeholder={`Describe your reason for ${formType === 'leave' ? 'leave' : 'on-duty'}...`}
                       className="min-h-[100px] input-focus resize-none"
                       required
                     />
                   </div>
                 </div>
 
                 {/* Right Column - Timetable */}
                 <div className="space-y-4">
                   <Label className="text-sm font-medium">Your Schedule (Selected Date)</Label>
                   {fromDate ? (
                     <div className="space-y-2">
                       {timetable.map((slot, index) => (
                         <div 
                           key={index}
                           className="p-3 rounded-lg border border-border bg-muted/30"
                         >
                           <p className="font-medium text-sm">{slot.time}</p>
                           <p className="text-sm text-muted-foreground">{slot.subject}</p>
                           <p className="text-xs text-muted-foreground">{slot.class}</p>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="p-8 rounded-xl border border-dashed border-border text-center">
                       <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                       <p className="text-sm text-muted-foreground">
                         Select a date to view your schedule
                       </p>
                     </div>
                   )}
 
                   {/* Approval Flow */}
                   <div className="p-4 rounded-xl bg-muted/50 border border-border mt-4">
                     <div className="flex items-center gap-2 mb-3">
                       <Clock className="w-4 h-4 text-muted-foreground" />
                       <span className="text-sm font-medium">Approval Flow</span>
                     </div>
                     <div className="flex flex-wrap items-center gap-2 text-xs">
                       <span className="px-2 py-1 rounded bg-warning/10 text-warning">Proxy Staff</span>
                       <span>→</span>
                       <span className="px-2 py-1 rounded bg-primary/10 text-primary">HoD</span>
                       <span>→</span>
                       <span className="px-2 py-1 rounded bg-secondary/10 text-secondary">Principal</span>
                       <span>→</span>
                       <span className="px-2 py-1 rounded bg-success/10 text-success">Secretary</span>
                     </div>
                   </div>
                 </div>
               </div>
 
               {/* Submit Button */}
               <Button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full h-12 bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-primary font-semibold"
               >
                 {isSubmitting ? (
                   <>Processing...</>
                 ) : (
                   <>
                     <Send className="w-4 h-4 mr-2" />
                     Submit Request
                   </>
                 )}
               </Button>
             </form>
           </CardContent>
         </Card>
       </div>
     </DashboardLayout>
   );
 }