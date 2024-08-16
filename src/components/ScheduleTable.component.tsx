import React, { useEffect, useState } from 'react'

import { ScheduleProps } from '../interfaces/schedule.interfaces'

import { scheduleTableStyles } from '../styles'

export const ScheduleTable: React.FC<ScheduleProps> = ({ schedule }) => {

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map for short day names
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
            <td>{timeIndex}:00</td>
            {Object.keys(schedule).map(day => (
              <td key={day}>
                {schedule[day][timeIndex].notes.map((note, noteIndex) => (
                  <div
                    key={noteIndex} 
                    style={{ backgroundColor: note.color }}
                  >
                    {note.startTime}:00/{note.duration}:00 - {note.desc}
                  </div>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
  
}
