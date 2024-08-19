import React from 'react';
import useSchedule from '../hooks/useSchedule';
import { NoteForm, ScheduleTable} from '../components';
import { scheduleStyles } from '../styles';
import { Note } from '../interfaces/schedule.interfaces';
import { exportScheduleToCSV } from '../utils/csvGenerator'
import { exportScheduleToExcel } from '../utils/xlsxGenerator'


export const Schedule: React.FC = () => {
  const { schedule, addNoteToSchedule } = useSchedule();

  // Handle note addition
  const handleAddNote = (note: Note) => {
    addNoteToSchedule(note);
  };

  return (
    <div className={scheduleStyles['schedule-container']}>
      <h1>Schedule For Your Week</h1>
      
      {/* Note Input Form */}
      <NoteForm 
        onAddNote={handleAddNote} 
      />

      <ScheduleTable schedule={schedule} />
      <div className={scheduleStyles['schedule-download-container']}>
        <button onClick={() => exportScheduleToExcel(schedule)}>
          Download as Excel
        </button>
      </div>
    </div>
  );
};

