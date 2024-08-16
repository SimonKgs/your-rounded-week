import React, { useState } from 'react';

import { Note } from '../interfaces/schedule.interfaces';
import { noteFormStyles } from '../styles'

interface NoteFormProps {
  onAddNote: (note: Note) => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
  // Local state for new note inputs
  const [note, setNote] = useState<Note>({
    color: '#000000',
    day: '',
    startTime: 0,
    duration: 1,
    desc: ''
  });

  // Update state based on input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Add this line to log the changes and see the value when changing the color
    // console.log(`Input name: ${name}, Input value: ${value}`);

    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  // Validate note inputs
  const isValidNote = () => {
    return note.color.trim() !== '' &&
           note.day.trim() !== '' &&
           note.startTime < 24 && note.startTime >= 0 &&
           note.desc.trim() !== '';
  };

  const handleSubmit = () => {
    if (!isValidNote()) {
      alert('Please fill out all fields.');
      return;
    }

    onAddNote(note);

    // Reset the note state to empty values
    setNote({
      color: '#000000',
      day: '',
      startTime: 0,
      duration: 1,
      desc: ''
    });
  };

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  return (
    <div className={noteFormStyles['note-form-container']}>
      <div className={noteFormStyles['input-group']}>
        <label htmlFor="desc">Task:</label>
        {/* TODO: see why a chunk two-digits-hexa */}
        <input 
          type="text" 
          name="desc" 
          value={note.desc} 
          onChange={handleInputChange} 
          placeholder="Description" 
        />
      </div>
      <div className={noteFormStyles['input-group']}>
        <label htmlFor="color">Color:</label>
        <input 
          type="color" 
          name="color" 
          value={note.color} 
          onChange={handleInputChange} 
          placeholder="Color" 
        />
      </div>
      <div className={noteFormStyles['input-group']}>
        <label htmlFor="day">Day:</label>
        <select name="day" value={note.day} onChange={handleInputChange}>
          <option value="">Select a day</option>
          {daysOfWeek.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className={noteFormStyles['input-group']}>
        <label>Start Time:</label>
        <input 
          type="number" 
          name="startTime" 
          min="0" 
          max="23" 
          value={note.startTime} 
          onChange={handleInputChange} 
        />
      </div>
      <div className={noteFormStyles['input-group']}>
        <label>Duration:</label>
          <input 
            type="number" 
            name="duration" 
            min="1" 
            max="24" 
            value={note.duration} 
            onChange={handleInputChange} 
          />
      </div>
      
      <button onClick={handleSubmit}>Add new note</button>
    </div>
  );
};

