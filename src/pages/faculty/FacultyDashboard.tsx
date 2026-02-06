import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  ClipboardCheck, 
  Clock, 
  ArrowRight,
  BookOpen,
  CalendarDays,
  Fingerprint,
} from 'lucide-react';

// Mock schedule data
const todaySchedule = [
  { id: 1, hour: 1, subject: 'Data Structures', class: 'CSE-A 3rd Sem', marked: true },
  { id: 2, hour: 2, subject: 'Data Structures', class: 'CSE-B 3rd Sem', marked: true },
  { id: 3, hour: 4, subject: 'Algorithms', class: 'CSE-A 5th Sem', marked: false },
  { id: 4, hour: 6, subject: 'Data Structures Lab', class: 'CSE-A 3rd Sem', marked: false },
];

// Mock biometric data
const recentBiometric = [
  { date: 'Today', inTime: '08:45 AM', outTime: '04:30 PM' },
  { date: 'Yesterday', inTime: '08:50 AM', outTime: '04:45 PM' },
  { date: 'Feb 4', inTime: '08:40 AM', outTime: '04:20 PM' },
];

// Mock upcoming leaves
const upcomingLeaves = [
  { type: 'Medical Leave', date: 'Feb 15-16, 2025', status: 'Pending' },
];

export default function FacultyDashboard() {
  const { user } = useAuth();

  const markedClasses = todaySchedule.filter(s => s.marked).length;
  const pendingClasses = todaySchedule.filter(s => !s.marked).length;

  return (
    <DashboardLayout title="Dashboard" subtitle={`Welcome back, ${user?.name}`}>
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            title="Today's Classes"
            value={todaySchedule.length}
            subtitle="Scheduled"
            icon={BookOpen}
            variant="primary"
          />
          <StatCard
            title="Marked"
            value={markedClasses}
            subtitle={`${pendingClasses} pending`}
            icon={ClipboardCheck}
            variant="success"
          />
          <StatCard
            title="Total Students"
            value="180"
            subtitle="Across classes"
            icon={Users}
            variant="secondary"
          />
          <StatCard
            title="Leave Requests"
            value="3"
            subtitle="Pending"
            icon={Calendar}
            variant="warning"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2 card-elevated">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
              <Link to="/faculty/mark-attendance">
                <Button variant="outline" size="sm" className="gap-2">
                  <span className="hidden sm:inline">Mark Attendance</span>
                  <span className="sm:hidden">Mark</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((schedule) => (
                  <div 
                    key={schedule.id} 
                    className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                        schedule.marked ? 'bg-success/10' : 'bg-primary/10'
                      }`}>
                        <Clock className={`w-5 h-5 md:w-6 md:h-6 ${schedule.marked ? 'text-success' : 'text-primary'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm md:text-base">{schedule.subject}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{schedule.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="text-xs md:text-sm font-medium text-muted-foreground">Hour {schedule.hour}</span>
                      {schedule.marked ? (
                        <span className="status-present text-xs">Marked</span>
                      ) : (
                        <Link to="/faculty/mark-attendance">
                          <Button size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 text-xs md:text-sm">
                            Mark
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Biometric */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/faculty/timetable" className="block">
                  <div className="p-4 rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                    <CalendarDays className="w-6 h-6 mb-2" />
                    <p className="font-semibold">View Timetable</p>
                    <p className="text-sm opacity-80">Weekly schedule</p>
                  </div>
                </Link>
                
                <Link to="/faculty/leave" className="block">
                  <div className="p-4 rounded-xl bg-gradient-secondary text-secondary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                    <Calendar className="w-6 h-6 mb-2" />
                    <p className="font-semibold">Apply for Leave</p>
                    <p className="text-sm opacity-80">Leave or On-Duty</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Biometric */}
            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Biometric Log</CardTitle>
                <Link to="/faculty/history">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View All <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBiometric.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Fingerprint className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{log.date}</span>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        <p>In: {log.inTime}</p>
                        <p>Out: {log.outTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pending Student Leave Requests */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Pending Student Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Amit Sharma', id: '202312345601', type: 'Medical Leave', dates: 'Feb 10-12, 2025' },
                { name: 'Priya Patel', id: '202312345602', type: 'On-Duty', dates: 'Feb 15, 2025' },
                { name: 'Rahul Kumar', id: '202312345603', type: 'Personal Leave', dates: 'Feb 18, 2025' },
              ].map((request, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/30 transition-colors gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {request.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{request.name}</p>
                      <p className="text-sm text-muted-foreground">{request.id} • {request.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className="text-sm text-muted-foreground">{request.dates}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10 text-xs">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 text-xs">
                        Approve
                      </Button>
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
