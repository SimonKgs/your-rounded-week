import React, { useEffect, useState } from 'react';

import { Note } from '../interfaces/schedule.interfaces';
import { noteFormStyles } from '../styles'
import { NoteFormProps } from '../interfaces/schedule.interfaces'


export const NoteForm: React.FC<NoteFormProps> = ({ onAddNote, editingNote, onDeleteNote, onEditNote }) => {
  // Local state for new note inputs
  const [note, setNote] = useState<Note>({
    color: '#000000',
    day: '',
    startTime: 0,
    duration: 1,
    desc: '',
    editing: false
  });

  useEffect(() => {
      if (editingNote) {
          setNote({
            ...editingNote,
            editing: true
          });
      }
  }, [editingNote]);


  // Update state based on input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

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

  // clean the form
  const resetNote = () => {
    setNote({
      color: '#000000',
      day: '',
      startTime: 0,
      duration: 1,
      desc: '',
      editing: false
    });
  }

  // adding a new note
  const handleSubmit = async () => {
    
    if (!isValidNote()) {
      alert('There is an error');
      return;
    }

    onAddNote(note);

    resetNote()
  };

  // editing note
  const editNote = () => {
    if (!isValidNote()) {
      alert('There is an error');
      return;
    }
    onEditNote(note)
    resetNote()
  }

  // deleting note
  const deleteNote = () => {
    onDeleteNote(note)
    resetNote()
  }

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
      {note.editing && (
          <button className={noteFormStyles['delete-button']} onClick={deleteNote}>Delete</button>
      )}

      {note.editing ? (
          <button onClick={editNote}>Edit note</button>
      ) : (
        <button onClick={handleSubmit}>Add new note</button>
      )
      }
      
    </div>
  );
};

