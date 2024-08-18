import { saveAs } from 'file-saver';
import Papa from 'papaparse';

import { Schedule, Day, Note } from '../interfaces/schedule.interfaces';

export function exportScheduleToCSV(schedule: Schedule) {
  const csvData: string[][] = [];
  
  // Define header row with days of the week
  const headers: string[] = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  csvData.push(headers);

  // Generate rows for each hour of the day
  for (let hour = 0; hour < 24; hour++) {
    const row: string[] = [`${hour.toString().padStart(2, '0')}:00`];

    // Fill each column for every day of the week
    headers.slice(1).forEach(day => {
      const timeSlot = schedule[day as Day][hour];
      // must convert starTime to number
      const note: Note | undefined = timeSlot.notes.find((note: Note) => +note.startTime === hour);

      if (note) {
        // Fill the row for the note's duration
        for (let i = 0; i < note.duration && hour + i < 24; i++) {
          const targetHour = hour + i;
          const timeString = `${targetHour.toString().padStart(2, '0')}:00`;

          // Find or create the row for the target hour
          let targetRow = csvData.find(r => r[0] === timeString);
          if (!targetRow) {
            targetRow = Array(headers.length).fill('');
            targetRow[0] = timeString;
            csvData.push(targetRow);
          } else if (i === 0) {
            // Leave the current time slot empty if no note
            row.push('');
          }

          // Fill the correct column for the day
          targetRow[headers.indexOf(day)] = `${note.desc} (color: ${note.color})`;
        }
      } 
    });

    // Add the initial row to csvData (only if it hasn't already been added)
    if (!csvData.find(r => r[0] === row[0])) {
      csvData.push(row);
    }
  }

  // Convert the array to CSV string format using PapaParse
  const csvString = Papa.unparse(csvData);

  // Create a Blob object for the CSV data and trigger download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'schedule.csv');
}
