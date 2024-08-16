// Modal.tsx
import React from 'react';
import { scheduleTableStyles } from '../styles';
import { Note } from '../interfaces/schedule.interfaces';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  note: Note | null;
  onNoteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onSave, onDelete, note, onNoteChange }) => {
  if (!show) return null;

  return (
    <div className={scheduleTableStyles['modal-overlay']}>
      <div className={scheduleTableStyles['modal-content']}>
        <h3>Edit Note</h3>
        {note && (
          <>
            <input
              type="text"
              name="desc"
              value={note.desc}
              onChange={onNoteChange}
              placeholder="Description"
            />
            <input
              type="color"
              name="color"
              value={note.color}
              onChange={onNoteChange}
            />
            <div>
              <button onClick={onSave}>Save</button>
              <button onClick={onDelete}>Delete</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
