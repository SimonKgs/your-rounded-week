import { useEffect, useState } from 'react';
import { Schedule, Note } from '../interfaces/schedule.interfaces';
import { generateEmptySchedule } from '../utils/scheduleUtils';

// Custom hook for managing the schedule
const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(generateEmptySchedule());

  // to update on each change
  useEffect(() => {}, [schedule])

  // empty state of a note
  const emptyNote = {
      color: '#FFFFFF',
      day: '',
      startTime: 0,
      duration: 1,
      desc: '',
      editing: false
  }

  // function to add, edit and delete notes
  const modifyNoteStateSchedule = (
    note: Note,
    deleting:boolean = false,
    prevNote: Note = note, 
  ) => {
    
    setSchedule((prevSchedule) => {
      const updatedSchedule = { ...prevSchedule };

      const { startTime, duration} = note;
      const starTimeNum = Number(startTime)
      let durationNum = Number(duration)
      
      if (deleting) {

        durationNum = +updatedSchedule[prevNote.day][prevNote.startTime].note.duration
        const { slotHour } = schedule[prevNote.day][+prevNote.startTime]

        for (let i = 0; i < durationNum && starTimeNum + i < 24; i++) {
          updatedSchedule[prevNote.day][slotHour + i] = { slotDay: prevNote.day, slotHour , note: emptyNote};
        }
      } else {
        const { slotHour } = schedule[note.day][starTimeNum]

        for (let i = 0; i < durationNum && starTimeNum + i < 24; i++) {
          updatedSchedule[note.day][slotHour + i] = { slotDay: note.day, slotHour , note: note};
        }
      }

      return updatedSchedule;
    });
  };

  return { schedule, modifyNoteStateSchedule };
};

export default useSchedule;
