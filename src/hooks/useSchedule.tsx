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
  const modifyNoteStateSchedule = (note: Note, deleting:boolean = false) => {
    
    setSchedule((prevSchedule) => {
      const updatedSchedule = { ...prevSchedule };

      const { day, startTime, duration} = note;
      const starTimeNum = Number(startTime)
      let durationNum = Number(duration)
      
      const { slotHour } = schedule[day][starTimeNum]
      if (deleting) {
        // when delete or edit (because it first delete and then add a new note)
        // must get the duration of the prev note stored 
        // if not, if the duration of the note decreased, the note will 
        // delete or update only the new duration, losing cells
        durationNum = +updatedSchedule[note.day][note.startTime].note.duration
        for (let i = 0; i < durationNum && starTimeNum + i < 24; i++) {
          updatedSchedule[day][slotHour + i] = { slotDay: day, slotHour , note: emptyNote};
        }
      } else {
        for (let i = 0; i < durationNum && starTimeNum + i < 24; i++) {
          updatedSchedule[day][slotHour + i] = { slotDay: day, slotHour , note: note};
        }
      }

      return updatedSchedule;
    });
  };

  return { schedule, modifyNoteStateSchedule };
};

export default useSchedule;
