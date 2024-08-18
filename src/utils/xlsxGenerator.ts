import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

import { Schedule, Day, Note } from '../interfaces/schedule.interfaces';

export async function exportScheduleToExcel(schedule: Schedule) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Schedule');
  
    // Define header row with days of the week
    const headers: string[] = ['Time', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const headerRow = worksheet.addRow(headers);
    
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'B0B0B0' },
        };
        cell.font = {
            color: { argb: '000000' }, 
            bold: true, 
        };
    });

    // Set the column width for each header
    headers.forEach((_, index) => {
        worksheet.getColumn(index + 1).width = 15; 
    });

    // adding the rows
    for (let hour = 0; hour < 24; hour++) {
      worksheet.addRow([`${hour.toString().padStart(2, '0')}:00`]);
    }

    // Paint the time index cells with light grey background
    for (let rowIndex = 2; rowIndex <= 25; rowIndex++) { // Adjust range as needed
        const cell = worksheet.getCell(rowIndex, 1); // Column 1 for the time index

        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D3D3D3' },
        };

        // Set text color to black for better readability
        cell.font = {
            color: { argb: '000000' }, // Black text color
        };
    }

    for (let hour = 0; hour < 24; hour++) {
      headers.slice(1).forEach(day => {
        const timeSlot = schedule[day as Day][hour];
        const note: Note | undefined = timeSlot.notes.find(note => +note.startTime === hour);

        if (note) {
          const endHour = Math.min(+hour + (+note.duration), 24) - 1;
          const columnIndex = headers.indexOf(day) + 1
          for (let i = hour; i <= endHour; i++) {
            // Getting the cell
            const rowIndex = 2 + i;
            const cell = worksheet.getCell(rowIndex, columnIndex);
  
            // Filling the cell with the description
            cell.value = note.desc;
  
            // painting the cell
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: note.color.replace('#', '') },
            };

            cell.font = {
                color: { argb: 'FFFFFFFF' },
            };
          }
        }
      });
    }
  
    // Save the workbook to a buffer
    const buffer = await workbook.xlsx.writeBuffer();
  
    // Create a Blob from the buffer
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Save the Blob as a file
    saveAs(blob, 'rounded_week_schedule.xlsx');
  }