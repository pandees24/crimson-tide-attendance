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
import { Search, Download, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

const attendanceData = [
  { date: '2025-02-06', department: 'Computer Science', staffPresent: 23, staffTotal: 25, studentPresent: 420, studentTotal: 480 },
  { date: '2025-02-06', department: 'Electronics', staffPresent: 20, staffTotal: 22, studentPresent: 385, studentTotal: 460 },
  { date: '2025-02-06', department: 'Electrical', staffPresent: 18, staffTotal: 20, studentPresent: 375, studentTotal: 440 },
  { date: '2025-02-06', department: 'Mechanical', staffPresent: 25, staffTotal: 28, studentPresent: 440, studentTotal: 520 },
  { date: '2025-02-06', department: 'Civil', staffPresent: 22, staffTotal: 24, studentPresent: 420, studentTotal: 480 },
  { date: '2025-02-06', department: 'IT', staffPresent: 20, staffTotal: 22, studentPresent: 380, studentTotal: 440 },
  { date: '2025-02-06', department: 'AI & ML', staffPresent: 16, staffTotal: 18, studentPresent: 315, studentTotal: 360 },
  { date: '2025-02-06', department: 'Biotechnology', staffPresent: 14, staffTotal: 15, studentPresent: 255, studentTotal: 300 },
];

interface AllAttendanceProps {
  viewOnly?: boolean;
}

export default function AllAttendance({ viewOnly = false }: AllAttendanceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-02-06');

  const filteredData = attendanceData.filter(item => {
    const matchesDept = filterDepartment === 'all' || item.department === filterDepartment;
    const matchesDate = item.date === selectedDate;
    return matchesDept && matchesDate;
  });

  const departments = [...new Set(attendanceData.map(a => a.department))];

  const totalStaff = filteredData.reduce((sum, d) => sum + d.staffTotal, 0);
  const presentStaff = filteredData.reduce((sum, d) => sum + d.staffPresent, 0);
  const totalStudents = filteredData.reduce((sum, d) => sum + d.studentTotal, 0);
  const presentStudents = filteredData.reduce((sum, d) => sum + d.studentPresent, 0);

  const staffPercentage = totalStaff ? Math.round((presentStaff / totalStaff) * 100) : 0;
  const studentPercentage = totalStudents ? Math.round((presentStudents / totalStudents) * 100) : 0;

  return (
    <DashboardLayout 
      title={viewOnly ? "View Attendance" : "All Attendance"} 
      subtitle="System-wide attendance records"
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by dept" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full lg:w-[180px]"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Staff Present</p>
                <p className="text-2xl font-bold">{presentStaff}/{totalStaff}</p>
              </div>
              <div className={`flex items-center gap-1 ${staffPercentage >= 90 ? 'text-success' : 'text-warning'}`}>
                {staffPercentage >= 90 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">{staffPercentage}%</span>
              </div>
            </div>
          </Card>
          <Card className="card-elevated p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Students Present</p>
                <p className="text-2xl font-bold">{presentStudents.toLocaleString()}/{totalStudents.toLocaleString()}</p>
              </div>
              <div className={`flex items-center gap-1 ${studentPercentage >= 85 ? 'text-success' : 'text-warning'}`}>
                {studentPercentage >= 85 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold">{studentPercentage}%</span>
              </div>
            </div>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Avg Staff Attendance</p>
            <p className="text-2xl font-bold text-success">{staffPercentage}%</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Avg Student Attendance</p>
            <p className="text-2xl font-bold text-primary">{studentPercentage}%</p>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Department-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Staff Present</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Staff %</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Students Present</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Student %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => {
                    const staffPct = Math.round((item.staffPresent / item.staffTotal) * 100);
                    const studentPct = Math.round((item.studentPresent / item.studentTotal) * 100);
                    return (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-4 px-4 font-medium">{item.department}</td>
                        <td className="py-4 px-4 text-center">{item.staffPresent}/{item.staffTotal}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            staffPct >= 90 ? 'bg-success/10 text-success' :
                            staffPct >= 75 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                          }`}>
                            {staffPct}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">{item.studentPresent}/{item.studentTotal}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            studentPct >= 85 ? 'bg-success/10 text-success' :
                            studentPct >= 75 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                          }`}>
                            {studentPct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredData.map((item, index) => {
                const staffPct = Math.round((item.staffPresent / item.staffTotal) * 100);
                const studentPct = Math.round((item.studentPresent / item.studentTotal) * 100);
                return (
                  <div key={index} className="p-4 rounded-xl border border-border">
                    <h3 className="font-semibold mb-3">{item.department}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Staff</p>
                        <p className="text-lg font-bold">{item.staffPresent}/{item.staffTotal}</p>
                        <span className={`text-sm font-medium ${staffPct >= 90 ? 'text-success' : 'text-warning'}`}>
                          {staffPct}%
                        </span>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Students</p>
                        <p className="text-lg font-bold">{item.studentPresent}/{item.studentTotal}</p>
                        <span className={`text-sm font-medium ${studentPct >= 85 ? 'text-success' : 'text-warning'}`}>
                          {studentPct}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
