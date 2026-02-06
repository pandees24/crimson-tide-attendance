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
import { Search, Download, Filter, Clock, Calendar } from 'lucide-react';

const staffData = [
  { id: 1, name: 'Dr. Priya Sharma', designation: 'Associate Professor', attendance: 98, present: 45, absent: 1, leaves: 2, status: 'present', inTime: '08:45 AM', outTime: '04:30 PM' },
  { id: 2, name: 'Prof. Rajesh Kumar', designation: 'Professor', attendance: 95, present: 43, absent: 2, leaves: 3, status: 'present', inTime: '08:50 AM', outTime: '04:45 PM' },
  { id: 3, name: 'Dr. Meena Iyer', designation: 'Assistant Professor', attendance: 92, present: 42, absent: 3, leaves: 3, status: 'on-leave', inTime: '-', outTime: '-' },
  { id: 4, name: 'Prof. Arun Singh', designation: 'Associate Professor', attendance: 90, present: 41, absent: 4, leaves: 3, status: 'present', inTime: '08:55 AM', outTime: '-' },
  { id: 5, name: 'Dr. Kavitha Rao', designation: 'Assistant Professor', attendance: 88, present: 40, absent: 5, leaves: 3, status: 'present', inTime: '09:00 AM', outTime: '-' },
  { id: 6, name: 'Dr. Sunitha Reddy', designation: 'Associate Professor', attendance: 94, present: 43, absent: 3, leaves: 2, status: 'present', inTime: '08:40 AM', outTime: '-' },
  { id: 7, name: 'Prof. Vijay Nair', designation: 'Professor', attendance: 96, present: 44, absent: 2, leaves: 2, status: 'absent', inTime: '-', outTime: '-' },
];

export default function StaffAttendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('february');

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Staff Attendance" subtitle="Department staff attendance overview">
      <div className="space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January 2025</SelectItem>
                  <SelectItem value="february">February 2025</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total Staff</p>
            <p className="text-2xl font-bold">{staffData.length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Present Today</p>
            <p className="text-2xl font-bold text-success">{staffData.filter(s => s.status === 'present').length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Absent</p>
            <p className="text-2xl font-bold text-destructive">{staffData.filter(s => s.status === 'absent').length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">On Leave</p>
            <p className="text-2xl font-bold text-secondary">{staffData.filter(s => s.status === 'on-leave').length}</p>
          </Card>
        </div>

        {/* Staff List */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Staff Details</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Designation</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Today</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">In Time</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Out Time</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Monthly %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {staff.name.split(' ').slice(-1)[0][0]}
                            </span>
                          </div>
                          <span className="font-medium">{staff.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{staff.designation}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          staff.status === 'present' ? 'bg-success/10 text-success' :
                          staff.status === 'on-leave' ? 'bg-secondary/10 text-secondary' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {staff.status === 'present' ? 'Present' : staff.status === 'on-leave' ? 'On Leave' : 'Absent'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm">{staff.inTime}</td>
                      <td className="py-4 px-4 text-center text-sm">{staff.outTime}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-semibold ${
                          staff.attendance >= 90 ? 'text-success' :
                          staff.attendance >= 75 ? 'text-warning' : 'text-destructive'
                        }`}>
                          {staff.attendance}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredStaff.map((staff) => (
                <div key={staff.id} className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {staff.name.split(' ').slice(-1)[0][0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.designation}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      staff.status === 'present' ? 'bg-success/10 text-success' :
                      staff.status === 'on-leave' ? 'bg-secondary/10 text-secondary' :
                      'bg-destructive/10 text-destructive'
                    }`}>
                      {staff.status === 'present' ? 'Present' : staff.status === 'on-leave' ? 'On Leave' : 'Absent'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">In</p>
                      <p className="text-sm font-medium">{staff.inTime}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Out</p>
                      <p className="text-sm font-medium">{staff.outTime}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Monthly</p>
                      <p className={`text-sm font-semibold ${
                        staff.attendance >= 90 ? 'text-success' : 'text-warning'
                      }`}>{staff.attendance}%</p>
                    </div>
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
