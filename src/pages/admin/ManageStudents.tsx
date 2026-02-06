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
import { Search, Plus, Edit, Filter, Download, GraduationCap } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  department: string;
  attendance: number;
  status: 'active' | 'inactive';
}

const studentsData: Student[] = [
  { id: '1', name: 'Amit Sharma', rollNo: '202312345601', class: 'CSE-A 3rd Sem', department: 'Computer Science', attendance: 88, status: 'active' },
  { id: '2', name: 'Priya Patel', rollNo: '202312345602', class: 'CSE-A 3rd Sem', department: 'Computer Science', attendance: 92, status: 'active' },
  { id: '3', name: 'Rahul Kumar', rollNo: '202312345603', class: 'CSE-B 3rd Sem', department: 'Computer Science', attendance: 68, status: 'active' },
  { id: '4', name: 'Sneha Reddy', rollNo: '202312345604', class: 'CSE-B 3rd Sem', department: 'Computer Science', attendance: 70, status: 'active' },
  { id: '5', name: 'Vikram Singh', rollNo: '202312345605', class: 'CSE-A 5th Sem', department: 'Computer Science', attendance: 85, status: 'active' },
  { id: '6', name: 'Anjali Patel', rollNo: '202312345606', class: 'CSE-B 5th Sem', department: 'Computer Science', attendance: 72, status: 'active' },
  { id: '7', name: 'Kiran Rao', rollNo: '202312345607', class: 'CSE-A 7th Sem', department: 'Computer Science', attendance: 90, status: 'active' },
  { id: '8', name: 'Deepa Nair', rollNo: '202312345608', class: 'CSE-B 7th Sem', department: 'Computer Science', attendance: 78, status: 'active' },
];

export default function ManageStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.includes(searchQuery);
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesDept = filterDepartment === 'all' || student.department === filterDepartment;
    return matchesSearch && matchesClass && matchesDept;
  });

  const classes = [...new Set(studentsData.map(s => s.class))];
  const departments = [...new Set(studentsData.map(s => s.department))];

  return (
    <DashboardLayout 
      title="Manage Students" 
      subtitle="View and edit student records"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or roll number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Filter by dept" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button className="gap-2 bg-gradient-primary text-primary-foreground">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Student</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold">{studentsData.length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Above 85%</p>
            <p className="text-2xl font-bold text-success">{studentsData.filter(s => s.attendance >= 85).length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">75-85%</p>
            <p className="text-2xl font-bold text-warning">{studentsData.filter(s => s.attendance >= 75 && s.attendance < 85).length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Below 75%</p>
            <p className="text-2xl font-bold text-destructive">{studentsData.filter(s => s.attendance < 75).length}</p>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Roll No</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Class</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Attendance</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{student.rollNo}</td>
                      <td className="py-4 px-4 text-muted-foreground">{student.class}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.attendance >= 85 ? 'bg-success/10 text-success' :
                          student.attendance >= 75 ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {student.attendance}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.rollNo}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{student.class}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.attendance >= 85 ? 'bg-success/10 text-success' :
                      student.attendance >= 75 ? 'bg-warning/10 text-warning' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {student.attendance}%
                    </span>
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
