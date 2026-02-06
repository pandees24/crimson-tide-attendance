import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const timetableData = {
  Monday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', class: 'CSE-A', room: 'Room 301' },
    { time: '10:00 - 11:00', subject: 'Data Structures', class: 'CSE-B', room: 'Room 302' },
    { time: '11:00 - 12:00', subject: 'Free Period', class: '-', room: '-' },
    { time: '14:00 - 16:00', subject: 'DS Lab', class: 'CSE-A', room: 'Lab 1' },
  ],
  Tuesday: [
    { time: '09:00 - 10:00', subject: 'Algorithm Design', class: 'CSE-C', room: 'Room 303' },
    { time: '10:00 - 11:00', subject: 'Data Structures', class: 'CSE-A', room: 'Room 301' },
    { time: '11:00 - 12:00', subject: 'Data Structures', class: 'CSE-C', room: 'Room 303' },
    { time: '14:00 - 15:00', subject: 'Free Period', class: '-', room: '-' },
  ],
  Wednesday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', class: 'CSE-B', room: 'Room 302' },
    { time: '10:00 - 11:00', subject: 'Algorithm Design', class: 'CSE-A', room: 'Room 301' },
    { time: '11:00 - 12:00', subject: 'Free Period', class: '-', room: '-' },
    { time: '14:00 - 16:00', subject: 'DS Lab', class: 'CSE-B', room: 'Lab 1' },
  ],
  Thursday: [
    { time: '09:00 - 10:00', subject: 'Algorithm Design', class: 'CSE-B', room: 'Room 302' },
    { time: '10:00 - 11:00', subject: 'Data Structures', class: 'CSE-C', room: 'Room 303' },
    { time: '11:00 - 12:00', subject: 'Data Structures', class: 'CSE-A', room: 'Room 301' },
    { time: '14:00 - 15:00', subject: 'Algorithm Design', class: 'CSE-C', room: 'Room 303' },
  ],
  Friday: [
    { time: '09:00 - 10:00', subject: 'Data Structures', class: 'CSE-B', room: 'Room 302' },
    { time: '10:00 - 11:00', subject: 'Free Period', class: '-', room: '-' },
    { time: '11:00 - 12:00', subject: 'Algorithm Design', class: 'CSE-A', room: 'Room 301' },
    { time: '14:00 - 16:00', subject: 'DS Lab', class: 'CSE-C', room: 'Lab 2' },
  ],
  Saturday: [
    { time: '09:00 - 10:00', subject: 'Algorithm Design', class: 'CSE-B', room: 'Room 302' },
    { time: '10:00 - 11:00', subject: 'Data Structures', class: 'CSE-A', room: 'Room 301' },
  ],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export default function FacultyTimetable() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof timetableData;

  return (
    <DashboardLayout title="Timetable" subtitle="Your weekly class schedule">
      <div className="space-y-6">
        {/* Today's Schedule Highlight */}
        {timetableData[today] && (
          <Card className="card-elevated border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2 text-primary">
                <Clock className="w-5 h-5" />
                Today's Schedule ({today})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {timetableData[today].map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      slot.subject === 'Free Period'
                        ? 'bg-muted/50 border-border'
                        : 'bg-card border-primary/20'
                    }`}
                  >
                    <p className="text-xs text-muted-foreground font-medium">{slot.time}</p>
                    <p className={`font-semibold mt-1 ${slot.subject === 'Free Period' ? 'text-muted-foreground' : ''}`}>
                      {slot.subject}
                    </p>
                    {slot.class !== '-' && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {slot.class} • {slot.room}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Timetable */}
        <Card className="card-elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">Day</th>
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">09:00 - 10:00</th>
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">10:00 - 11:00</th>
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">11:00 - 12:00</th>
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">14:00 - 16:00</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day} className={day === today ? 'bg-primary/5' : ''}>
                      <td className="p-3 font-medium border-b border-border">
                        <span className={day === today ? 'text-primary font-semibold' : ''}>{day}</span>
                      </td>
                      {[0, 1, 2, 3].map((slotIndex) => {
                        const slot = timetableData[day]?.[slotIndex];
                        return (
                          <td key={slotIndex} className="p-3 border-b border-border">
                            {slot ? (
                              <div className={slot.subject === 'Free Period' ? 'text-muted-foreground' : ''}>
                                <p className="font-medium text-sm">{slot.subject}</p>
                                {slot.class !== '-' && (
                                  <p className="text-xs text-muted-foreground">{slot.class} • {slot.room}</p>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
