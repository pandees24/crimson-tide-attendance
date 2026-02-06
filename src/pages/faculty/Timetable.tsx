import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

const timetableData = {
  Monday: [
    { hour: 1, subject: 'Data Structures', class: 'CSE-A' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-B' },
    { hour: 3, subject: 'Free Period', class: '-' },
    { hour: 4, subject: 'DS Lab', class: 'CSE-A' },
  ],
  Tuesday: [
    { hour: 1, subject: 'Algorithm Design', class: 'CSE-C' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-A' },
    { hour: 3, subject: 'Data Structures', class: 'CSE-C' },
    { hour: 4, subject: 'Free Period', class: '-' },
  ],
  Wednesday: [
    { hour: 1, subject: 'Data Structures', class: 'CSE-B' },
    { hour: 2, subject: 'Algorithm Design', class: 'CSE-A' },
    { hour: 3, subject: 'Free Period', class: '-' },
    { hour: 4, subject: 'DS Lab', class: 'CSE-B' },
  ],
  Thursday: [
    { hour: 1, subject: 'Algorithm Design', class: 'CSE-B' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-C' },
    { hour: 3, subject: 'Data Structures', class: 'CSE-A' },
    { hour: 4, subject: 'Algorithm Design', class: 'CSE-C' },
  ],
  Friday: [
    { hour: 1, subject: 'Data Structures', class: 'CSE-B' },
    { hour: 2, subject: 'Free Period', class: '-' },
    { hour: 3, subject: 'Algorithm Design', class: 'CSE-A' },
    { hour: 4, subject: 'DS Lab', class: 'CSE-C' },
  ],
  Saturday: [
    { hour: 1, subject: 'Algorithm Design', class: 'CSE-B' },
    { hour: 2, subject: 'Data Structures', class: 'CSE-A' },
  ],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
const hours = [1, 2, 3, 4, 5, 6];

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
                <CalendarDays className="w-5 h-5" />
                Today's Schedule ({today})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {timetableData[today].map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      slot.subject === 'Free Period'
                        ? 'bg-muted/50 border-border'
                        : 'bg-card border-primary/20'
                    }`}
                  >
                    <p className="text-xs text-muted-foreground font-medium">Hour {slot.hour}</p>
                    <p className={`font-semibold mt-1 ${slot.subject === 'Free Period' ? 'text-muted-foreground' : ''}`}>
                      {slot.subject}
                    </p>
                    {slot.class !== '-' && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {slot.class}
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
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">Day</th>
                    {hours.slice(0, 4).map((hour) => (
                      <th key={hour} className="p-3 text-left text-sm font-semibold text-muted-foreground border-b border-border">
                        Hour {hour}
                      </th>
                    ))}
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
                                  <p className="text-xs text-muted-foreground">{slot.class}</p>
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

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {days.map((day) => (
                <div 
                  key={day} 
                  className={`p-4 rounded-xl border ${day === today ? 'border-primary/30 bg-primary/5' : 'border-border'}`}
                >
                  <h3 className={`font-semibold mb-3 ${day === today ? 'text-primary' : ''}`}>
                    {day} {day === today && '(Today)'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {timetableData[day]?.map((slot, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg ${
                          slot.subject === 'Free Period' 
                            ? 'bg-muted/50' 
                            : 'bg-card border border-border'
                        }`}
                      >
                        <p className="text-xs text-muted-foreground">Hour {slot.hour}</p>
                        <p className={`text-sm font-medium ${slot.subject === 'Free Period' ? 'text-muted-foreground' : ''}`}>
                          {slot.subject}
                        </p>
                        {slot.class !== '-' && (
                          <p className="text-xs text-muted-foreground">{slot.class}</p>
                        )}
                      </div>
                    ))}
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
