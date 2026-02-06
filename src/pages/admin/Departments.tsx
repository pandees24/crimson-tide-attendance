import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Building2, Users, GraduationCap } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  shortName: string;
  hod: string;
  hodEmail: string;
  staff: number;
  students: number;
  attendance: number;
}

const departmentsData: Department[] = [
  { id: '1', name: 'Computer Science & Engineering', shortName: 'CSE', hod: 'Dr. Anil Kumar', hodEmail: 'hod.cse@college.edu', staff: 25, students: 480, attendance: 86 },
  { id: '2', name: 'Electronics & Communication', shortName: 'ECE', hod: 'Dr. Meena Patel', hodEmail: 'hod.ece@college.edu', staff: 22, students: 460, attendance: 84 },
  { id: '3', name: 'Electrical & Electronics', shortName: 'EEE', hod: 'Dr. Suresh Reddy', hodEmail: 'hod.eee@college.edu', staff: 20, students: 440, attendance: 85 },
  { id: '4', name: 'Mechanical Engineering', shortName: 'MECH', hod: 'Dr. Ramesh Singh', hodEmail: 'hod.mech@college.edu', staff: 28, students: 520, attendance: 83 },
  { id: '5', name: 'Civil Engineering', shortName: 'CIVIL', hod: 'Dr. Kavitha Rao', hodEmail: 'hod.civil@college.edu', staff: 24, students: 480, attendance: 87 },
  { id: '6', name: 'Information Technology', shortName: 'IT', hod: 'Dr. Prakash Iyer', hodEmail: 'hod.it@college.edu', staff: 22, students: 440, attendance: 86 },
  { id: '7', name: 'Artificial Intelligence & ML', shortName: 'AI', hod: 'Dr. Anita Sharma', hodEmail: 'hod.ai@college.edu', staff: 18, students: 360, attendance: 88 },
  { id: '8', name: 'Biotechnology', shortName: 'BT', hod: 'Dr. Vijay Kumar', hodEmail: 'hod.bt@college.edu', staff: 15, students: 300, attendance: 85 },
];

interface DepartmentsProps {
  viewOnly?: boolean;
}

export default function Departments({ viewOnly = false }: DepartmentsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepartments = departmentsData.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.hod.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStaff = departmentsData.reduce((sum, d) => sum + d.staff, 0);
  const totalStudents = departmentsData.reduce((sum, d) => sum + d.students, 0);
  const avgAttendance = Math.round(departmentsData.reduce((sum, d) => sum + d.attendance, 0) / departmentsData.length);

  return (
    <DashboardLayout 
      title={viewOnly ? "View Departments" : "Manage Departments"} 
      subtitle={viewOnly ? "Browse department data" : "Manage department settings"}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {!viewOnly && (
                <Button className="gap-2 bg-gradient-primary text-primary-foreground">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Department</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Departments</p>
            <p className="text-2xl font-bold">{departmentsData.length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total Staff</p>
            <p className="text-2xl font-bold text-primary">{totalStaff}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold text-secondary">{totalStudents.toLocaleString()}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Avg Attendance</p>
            <p className="text-2xl font-bold text-success">{avgAttendance}%</p>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id} className="card-elevated hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  {!viewOnly && (
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{dept.shortName}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{dept.name}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">HoD:</span>
                    <span className="font-medium truncate">{dept.hod}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{dept.staff}</p>
                        <p className="text-xs text-muted-foreground">Staff</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <GraduationCap className="w-4 h-4 text-secondary" />
                      <div>
                        <p className="text-sm font-medium">{dept.students}</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className={`font-semibold ${
                        dept.attendance >= 85 ? 'text-success' :
                        dept.attendance >= 75 ? 'text-warning' : 'text-destructive'
                      }`}>{dept.attendance}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${
                          dept.attendance >= 85 ? 'bg-success' :
                          dept.attendance >= 75 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${dept.attendance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
