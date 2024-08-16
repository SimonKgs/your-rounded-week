export interface Note {
    color: string;
    desc: string;
    day: string;
    startTime: number; 
    duration: number; 
}

export interface TimeSlot {
    time: string; 
    notes: Note[];
}

export interface Schedule {
    [day: string]: TimeSlot[];
}


// src/interfaces/schedule.interfaces.ts
export interface ScheduleProps {
    schedule: Schedule;
}


export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
