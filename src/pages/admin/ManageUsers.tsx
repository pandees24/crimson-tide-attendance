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
import { Search, Plus, Edit, Trash2, Filter, Download } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
}

const usersData: User[] = [
  { id: '1', name: 'Dr. Anil Kumar', email: 'hod.cse@college.edu', role: 'HoD', department: 'Computer Science', status: 'active' },
  { id: '2', name: 'Dr. Priya Sharma', email: 'priya.sharma@college.edu', role: 'Faculty', department: 'Computer Science', status: 'active' },
  { id: '3', name: 'Prof. Rajesh Kumar', email: 'rajesh.kumar@college.edu', role: 'Faculty', department: 'Computer Science', status: 'active' },
  { id: '4', name: 'Amit Sharma', email: '202312345601', role: 'Student', department: 'Computer Science', status: 'active' },
  { id: '5', name: 'Priya Patel', email: '202312345602', role: 'Student', department: 'Computer Science', status: 'active' },
  { id: '6', name: 'Dr. Meena Patel', email: 'hod.ece@college.edu', role: 'HoD', department: 'Electronics', status: 'active' },
  { id: '7', name: 'Dr. Suresh Reddy', email: 'hod.eee@college.edu', role: 'HoD', department: 'Electrical', status: 'active' },
  { id: '8', name: 'Admin User', email: 'admin@college.edu', role: 'Super Admin', department: 'Administration', status: 'active' },
];

interface ManageUsersProps {
  viewOnly?: boolean;
}

export default function ManageUsers({ viewOnly = false }: ManageUsersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesDept = filterDepartment === 'all' || user.department === filterDepartment;
    return matchesSearch && matchesRole && matchesDept;
  });

  const departments = [...new Set(usersData.map(u => u.department))];
  const roles = [...new Set(usersData.map(u => u.role))];

  return (
    <DashboardLayout 
      title={viewOnly ? "View Users" : "Manage Users"} 
      subtitle={viewOnly ? "Browse all user records" : "Add, edit, or remove users"}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
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
              {!viewOnly && (
                <Button className="gap-2 bg-gradient-primary text-primary-foreground">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add User</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-bold">{usersData.length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="text-2xl font-bold text-primary">{usersData.filter(u => u.role === 'Student').length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">Faculty</p>
            <p className="text-2xl font-bold text-secondary">{usersData.filter(u => u.role === 'Faculty').length}</p>
          </Card>
          <Card className="card-elevated p-4">
            <p className="text-sm text-muted-foreground">HoDs</p>
            <p className="text-2xl font-bold text-success">{usersData.filter(u => u.role === 'HoD').length}</p>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Email/ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-sm">Status</th>
                    {!viewOnly && <th className="text-center py-3 px-4 font-semibold text-sm">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'HoD' ? 'bg-primary/10 text-primary' :
                          user.role === 'Faculty' ? 'bg-secondary/10 text-secondary' :
                          user.role === 'Student' ? 'bg-success/10 text-success' :
                          'bg-warning/10 text-warning'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{user.department}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      {!viewOnly && (
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 rounded-xl border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    {!viewOnly && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'HoD' ? 'bg-primary/10 text-primary' :
                      user.role === 'Faculty' ? 'bg-secondary/10 text-secondary' :
                      'bg-success/10 text-success'
                    }`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-muted-foreground">{user.department}</span>
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
