import { useState } from 'react';
import { Schedule, Note } from '../interfaces/schedule.interfaces';
import { generateEmptySchedule } from '../utils/scheduleUtils';

// Custom hook for managing a weekly schedule and adding notes
const useSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule>(generateEmptySchedule());

  // Helper function to convert hour to time string
  const convertHourToTimeString = (hour: number): string => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const addNoteToSchedule = (newNote: Note) => {
    setSchedule((prevSchedule) => {
      const updatedSchedule = { ...prevSchedule };

      // Convert start and end hours to time strings
      const startTimeString = convertHourToTimeString(newNote.startTime);

      // Calculate end time based on duration
      const endtime = newNote.startTime + newNote.duration
      const endTimeString = convertHourToTimeString(endtime);

      // Find the index of the time slot where the note starts
      const startSlotIndex = updatedSchedule[newNote.day].findIndex(slot => slot.time === startTimeString);
      
      // Find the index of the time slot where the note ends (exclude end hour)
      const endSlotIndex = updatedSchedule[newNote.day].findIndex(slot => slot.time === endTimeString);

      if (startSlotIndex === -1 || endSlotIndex === -1) {
        alert('Invalid time slots');
        return prevSchedule; // Return unchanged schedule if times are invalid
      }

      // Clear existing notes in the relevant time slots (exclude end hour)
      for (let i = startSlotIndex; i < endSlotIndex; i++) {
        updatedSchedule[newNote.day][i].notes = [];
      }

      // Add the new note to the relevant time slots (exclude end hour)
      for (let i = startSlotIndex; i < endSlotIndex; i++) {
        updatedSchedule[newNote.day][i].notes.push(newNote);
      }

      return updatedSchedule;
    });
  };

  return { schedule, addNoteToSchedule };
};

export default useSchedule;
