import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Download, Filter, GraduationCap } from 'lucide-react';

const classesData = [
  { 
    class: 'CSE-A 3rd Sem', 
    totalStudents: 60, 
    present: 52, 
    absent: 5, 
    onDuty: 3,
    attendance: 88,
    subjects: [
      { name: 'Data Structures', attendance: 90 },
      { name: 'Database Systems', attendance: 85 },
      { name: 'Operating Systems', attendance: 88 },
    ]
  },
  { 
    class: 'CSE-B 3rd Sem', 
    totalStudents: 60, 
    present: 48, 
    absent: 8, 
    onDuty: 4,
    attendance: 85,
    subjects: [
      { name: 'Data Structures', attendance: 87 },
      { name: 'Database Systems', attendance: 82 },
      { name: 'Operating Systems', attendance: 85 },
    ]
  },
  { 
    class: 'CSE-A 5th Sem', 
    totalStudents: 55, 
    present: 50, 
    absent: 3, 
    onDuty: 2,
    attendance: 92,
    subjects: [
      { name: 'Computer Networks', attendance: 91 },
      { name: 'Software Engineering', attendance: 93 },
      { name: 'Web Technologies', attendance: 90 },
    ]
  },
  { 
    class: 'CSE-B 5th Sem', 
    totalStudents: 55, 
    present: 45, 
    absent: 7, 
    onDuty: 3,
    attendance: 85,
    subjects: [
      { name: 'Computer Networks', attendance: 84 },
      { name: 'Software Engineering', attendance: 86 },
      { name: 'Web Technologies', attendance: 83 },
    ]
  },
  { 
    class: 'CSE-A 7th Sem', 
    totalStudents: 50, 
    present: 38, 
    absent: 8, 
    onDuty: 4,
    attendance: 80,
    subjects: [
      { name: 'Machine Learning', attendance: 82 },
      { name: 'Cloud Computing', attendance: 78 },
      { name: 'IoT', attendance: 80 },
    ]
  },
];

const lowAttendanceStudents = [
  { name: 'Rahul Kumar', rollNo: '202312345601', class: 'CSE-A 3rd Sem', attendance: 68 },
  { name: 'Sneha Reddy', rollNo: '202312345602', class: 'CSE-B 3rd Sem', attendance: 70 },
  { name: 'Vikram Singh', rollNo: '202312345603', class: 'CSE-A 7th Sem', attendance: 65 },
  { name: 'Anjali Patel', rollNo: '202312345604', class: 'CSE-B 5th Sem', attendance: 72 },
];

export default function StudentAttendance() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClasses = classesData.filter(cls => 
    selectedClass === 'all' || cls.class === selectedClass
  );

  const totalStudents = classesData.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const totalPresent = classesData.reduce((sum, cls) => sum + cls.present, 0);

  return (
    <DashboardLayout title="Student Attendance" subtitle="Class-wise student attendance overview">
      <div className="space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classesData.map((cls) => (
                    <SelectItem key={cls.class} value={cls.class}>{cls.class}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold">{totalStudents}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Present Today</p>
            <p className="text-2xl font-bold text-success">{totalPresent}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Avg Attendance</p>
            <p className="text-2xl font-bold text-primary">86%</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Low Attendance</p>
            <p className="text-2xl font-bold text-destructive">{lowAttendanceStudents.length}</p>
          </Card>
        </div>

        {/* Classes Overview */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Class-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map((cls) => (
                <div key={cls.class} className="p-4 rounded-xl border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <span className="font-semibold">{cls.class}</span>
                    </div>
                    <span className={`text-lg font-bold ${
                      cls.attendance >= 85 ? 'text-success' :
                      cls.attendance >= 75 ? 'text-warning' : 'text-destructive'
                    }`}>
                      {cls.attendance}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="p-2 rounded-lg bg-success/10">
                      <p className="text-lg font-bold text-success">{cls.present}</p>
                      <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <p className="text-lg font-bold text-destructive">{cls.absent}</p>
                      <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <p className="text-lg font-bold text-secondary">{cls.onDuty}</p>
                      <p className="text-xs text-muted-foreground">On-Duty</p>
                    </div>
                  </div>

                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${
                        cls.attendance >= 85 ? 'bg-success' :
                        cls.attendance >= 75 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${cls.attendance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Attendance Students */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Students Below 75% Attendance
              <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                {lowAttendanceStudents.length} students
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowAttendanceStudents.map((student, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-destructive">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.rollNo} • {student.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-destructive">{student.attendance}%</span>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
