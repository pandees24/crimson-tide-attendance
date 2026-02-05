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
 import { Calendar, FileText, Send, Clock } from 'lucide-react';
 import { toast } from 'sonner';
 
 const leaveTypes = [
   { value: 'medical', label: 'Medical Leave' },
   { value: 'personal', label: 'Personal Leave' },
   { value: 'family', label: 'Family Emergency' },
 ];
 
 const onDutyTypes = [
   { value: 'hackathon', label: 'Hackathon/Competition' },
   { value: 'conference', label: 'Conference/Workshop' },
   { value: 'placement', label: 'Placement Drive' },
   { value: 'sports', label: 'Sports Event' },
   { value: 'cultural', label: 'Cultural Event' },
   { value: 'other', label: 'Other Official Activity' },
 ];
 
 export default function StudentLeaveForm() {
   const [formType, setFormType] = useState<'leave' | 'onduty'>('leave');
   const [leaveType, setLeaveType] = useState('');
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [reason, setReason] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1000));
     
     toast.success(`${formType === 'leave' ? 'Leave' : 'On-Duty'} request submitted successfully!`);
     
     // Reset form
     setLeaveType('');
     setFromDate('');
     setToDate('');
     setReason('');
     setIsSubmitting(false);
   };
 
   const typeOptions = formType === 'leave' ? leaveTypes : onDutyTypes;
 
   return (
     <DashboardLayout title="Leave / On-Duty Request" subtitle="Submit your leave or on-duty application">
       <div className="max-w-2xl mx-auto">
         <Card className="card-elevated">
           <CardHeader className="pb-4">
             {/* Toggle Buttons */}
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
 
               {/* Reason */}
               <div className="space-y-2">
                 <Label className="text-sm font-medium">Reason</Label>
                 <Textarea
                   value={reason}
                   onChange={(e) => setReason(e.target.value)}
                   placeholder={`Describe your reason for ${formType === 'leave' ? 'leave' : 'on-duty'}...`}
                   className="min-h-[120px] input-focus resize-none"
                   required
                 />
               </div>
 
               {/* Approval Flow Info */}
               <div className="p-4 rounded-xl bg-muted/50 border border-border">
                 <div className="flex items-center gap-2 mb-2">
                   <Clock className="w-4 h-4 text-muted-foreground" />
                   <span className="text-sm font-medium">Approval Flow</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <span className="px-2 py-1 rounded bg-primary/10 text-primary">Faculty</span>
                   <span>→</span>
                   <span className="px-2 py-1 rounded bg-secondary/10 text-secondary">HoD</span>
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