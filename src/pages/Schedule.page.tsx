import React, { useEffect, useState } from 'react';
import useSchedule from '../hooks/useSchedule';
import { NoteForm, ScheduleTable} from '../components';
import { scheduleStyles } from '../styles';
import { Note } from '../interfaces/schedule.interfaces';
import { exportScheduleToExcel } from '../utils/xlsxGenerator'


export const Schedule: React.FC = () => {
  const { schedule, modifyNoteStateSchedule } = useSchedule();
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [prevNote, setPrevNote] = useState<Note | undefined>(undefined); 

  // Handle note addition
  const handleAddNote = (note: Note) => {
    modifyNoteStateSchedule(note);
  };
  
  // Handle note addition
  const handleEditNote = (note: Note) => {
    const newNote = {...note};
    handleDeleteNote(note)
    modifyNoteStateSchedule(newNote)
  };

  // handle deletion
  // It need the previous note to apply the delete on the correct place
  // it could happen on edit note
  const handleDeleteNote = (note: Note) => {
    modifyNoteStateSchedule(note, true, prevNote)
  }

  // to pass the note to the form
  const passNoteToNoteForm = (note: Note) => {
      setPrevNote({...note})
      setEditingNote(note);
  }


  useEffect(() => {
  }, [editingNote]);

  return (
    <div className={scheduleStyles['schedule-container']}>
      <h1>Schedule For Your Week</h1>
      
      <NoteForm 
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
        editingNote={editingNote}
        onEditNote={handleEditNote}
      />

      <ScheduleTable 
        schedule={schedule}
        onPassNote={passNoteToNoteForm}
      />
      <div className={scheduleStyles['schedule-download-container']}>
        <button onClick={() => exportScheduleToExcel(schedule)}>
          Download as Excel
        </button>
      </div>
    </div>
  );
};

