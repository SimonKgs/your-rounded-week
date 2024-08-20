// src/utils/scheduleUtils.ts
import { Schedule, TimeSlot } from '../interfaces/schedule.interfaces';

export const generateEmptySchedule = (): Schedule => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const schedule: Schedule = {};

  days.forEach(day => {
    const timeSlots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      timeSlots.push({
        slotDay: day,
        slotHour: hour,
        note: {
          color: '#FFFFFF',
          day: '',
          startTime: 0,
          duration: 1,
          desc: '',
          editing: false
        }
      });
    }
    schedule[day] = timeSlots;
  });

  return schedule;
};
