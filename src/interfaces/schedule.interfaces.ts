export interface Note {
    color: string;
    desc: string;
    day: string;
    startTime: number; 
    duration: number;
    editing?: boolean;
}

export interface NoteFormProps {
    onAddNote: (note: Note) => void;
    editingNote?: Note;
    onDeleteNote: (note: Note) => void;
    onEditNote: (note: Note) => void;
}

export interface TimeSlot {
    slotDay: string;
    slotHour: number;
    note: Note;
}

export interface Schedule {
    [day: string]: TimeSlot[];
}


// src/interfaces/schedule.interfaces.ts
export interface ScheduleProps {
    schedule: Schedule;
    onPassNote: (note: Note) => void;
}


export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
