import { useState, useMemo } from 'react';
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
import { Calendar, FileText, Send, Users } from 'lucide-react';
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

const substituteStaff = [
  { id: '1', name: 'Dr. Priya Sharma' },
  { id: '2', name: 'Prof. Rajesh Kumar' },
  { id: '3', name: 'Dr. Meena Iyer' },
  { id: '4', name: 'Prof. Arun Singh' },
  { id: '5', name: 'Dr. Kavitha Rao' },
  { id: '6', name: 'Dr. Sunitha Reddy' },
  { id: '7', name: 'Prof. Vijay Nair' },
];

// Mock timetable based on day of week
const timetableByDay: Record<string, { hour: number; subject: string; class: string }[]> = {
  Monday: [
    { hour: 1, subject: 'Data Structures', class: 'CSE-A 3rd Sem' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-B 3rd Sem' },
    { hour: 4, subject: 'Algorithms', class: 'CSE-A 5th Sem' },
    { hour: 6, subject: 'DS Lab', class: 'CSE-A 3rd Sem' },
  ],
  Tuesday: [
    { hour: 1, subject: 'Algorithm Design', class: 'CSE-C 3rd Sem' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-A 3rd Sem' },
    { hour: 3, subject: 'Data Structures', class: 'CSE-C 3rd Sem' },
  ],
  Wednesday: [
    { hour: 1, subject: 'Data Structures', class: 'CSE-B 3rd Sem' },
    { hour: 2, subject: 'Algorithm Design', class: 'CSE-A 5th Sem' },
    { hour: 5, subject: 'DS Lab', class: 'CSE-B 3rd Sem' },
  ],
  Thursday: [
    { hour: 1, subject: 'Algorithm Design', class: 'CSE-B 5th Sem' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-C 3rd Sem' },
    { hour: 3, subject: 'Data Structures', class: 'CSE-A 3rd Sem' },
    { hour: 5, subject: 'Algorithm Design', class: 'CSE-C 5th Sem' },
  ],
  Friday: [
    { hour: 1, subject: 'Data Structures', class: 'CSE-B 3rd Sem' },
    { hour: 3, subject: 'Algorithm Design', class: 'CSE-A 5th Sem' },
    { hour: 5, subject: 'DS Lab', class: 'CSE-C 3rd Sem' },
  ],
  Saturday: [
    { hour: 1, subject: 'Algorithm Design', class: 'CSE-B 5th Sem' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-A 3rd Sem' },
  ],
  Sunday: [],
};

const getDayFromDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export default function FacultyLeaveForm() {
  const [formType, setFormType] = useState<'leave' | 'onduty'>('leave');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [substituteSelections, setSubstituteSelections] = useState<Record<number, string>>({});

  const dayName = getDayFromDate(fromDate);
  const timetable = dayName ? timetableByDay[dayName] || [] : [];

  const handleSubstituteChange = (hour: number, staffId: string) => {
    setSubstituteSelections(prev => ({
      ...prev,
      [hour]: staffId
    }));
  };

  const allSubstitutesSelected = useMemo(() => {
    if (timetable.length === 0) return true;
    return timetable.every(slot => substituteSelections[slot.hour]);
  }, [timetable, substituteSelections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allSubstitutesSelected && timetable.length > 0) {
      toast.error('Please select a substitute staff for all classes');
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(`${formType === 'leave' ? 'Leave' : 'On-Duty'} request submitted successfully!`);
    
    setLeaveType('');
    setFromDate('');
    setToDate('');
    setReason('');
    setSubstituteSelections({});
    setIsSubmitting(false);
  };

  const typeOptions = formType === 'leave' ? leaveTypes : onDutyTypes;

  return (
    <DashboardLayout title="Leave / On-Duty Request" subtitle="Submit your leave or on-duty application">
      <div className="max-w-4xl mx-auto">
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
                <span className="hidden sm:inline">Leave Request</span>
                <span className="sm:hidden">Leave</span>
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
                <span className="hidden sm:inline">On-Duty Request</span>
                <span className="sm:hidden">On-Duty</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Form Fields */}
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
                        onChange={(e) => {
                          setFromDate(e.target.value);
                          setSubstituteSelections({});
                        }}
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
                      className="min-h-[100px] input-focus resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Right Column - Timetable & Substitute Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Your Schedule & Substitute Staff
                  </Label>
                  
                  {fromDate ? (
                    timetable.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {dayName} - {timetable.length} class{timetable.length > 1 ? 'es' : ''} scheduled
                        </p>
                        {timetable.map((slot) => (
                          <div 
                            key={slot.hour}
                            className="p-4 rounded-xl border border-border bg-muted/30 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">Hour {slot.hour}</p>
                                <p className="text-sm text-muted-foreground">{slot.subject}</p>
                                <p className="text-xs text-muted-foreground">{slot.class}</p>
                              </div>
                            </div>
                            <Select 
                              value={substituteSelections[slot.hour] || ''} 
                              onValueChange={(value) => handleSubstituteChange(slot.hour, value)}
                            >
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select substitute staff" />
                              </SelectTrigger>
                              <SelectContent>
                                {substituteStaff.map((staff) => (
                                  <SelectItem key={staff.id} value={staff.id}>
                                    {staff.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 rounded-xl border border-dashed border-border text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-success" />
                        <p className="text-sm text-muted-foreground">
                          No classes scheduled for {dayName}
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="p-8 rounded-xl border border-dashed border-border text-center">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Select a date to view your schedule
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || (timetable.length > 0 && !allSubstitutesSelected)}
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
