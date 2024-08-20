import React, { useEffect, useState } from 'react'

import { ScheduleProps } from '../interfaces/schedule.interfaces'

import { scheduleTableStyles } from '../styles'


export const ScheduleTable: React.FC<ScheduleProps> = ({ schedule, onPassNote }) => {

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);


  // Set the value of isMobile to changes of styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map for days on mobile
  const shortDayNames: Record<string, string> = {
    'Monday': 'M',
    'Tuesday': 'T',
    'Wednesday': 'W',
    'Thursday': 'TH',
    'Friday': 'F',
    'Saturday': 'S',
    'Sunday': 'SU'
  };


  return (
    <table className={scheduleTableStyles['table']}>
        <thead>
          {/* First row heades time, and days */}
          <tr>
            <th>Time</th> 
            {Object.keys(schedule).map(day => (
              <th key={day}>
                {isMobile ? shortDayNames[day] : day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {schedule[Object.keys(schedule)[0]].map((_, timeIndex) => (
          <tr key={timeIndex}>
          {/* Here will print each cell the first of each row will be the hour on column time */}
          <td>{timeIndex}:00</td>
          {Object.keys(schedule).map(day => (
            <td key={day}>
              <div
                style={{ backgroundColor: schedule[day][timeIndex].note.color }}
                onClick={() => onPassNote(schedule[day][timeIndex].note)}
              >
                {schedule[day][timeIndex].note.desc}
              </div>
            </td>
          ))}
        </tr>
        ))}
      </tbody>
    </table>
  );
  
}
