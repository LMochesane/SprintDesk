import React, { useState } from 'react';
import './TaskModal.css';

function TaskModal({ isOpen, onClose, onAddTask }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Create the new task object
    const newTask = {
      id: Date.now().toString(), // Unique ID based on timestamp
      title,
      description,
      dueDate: new Date().toISOString().split('T')[0], // Today's date as default
      assignedTo: assignedTo || 'Unassigned',
      priority,
      status: 'submitted', // New tasks always start in Submitted
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Task</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title</label>
            <input 
              type="text" 
              placeholder="e.g., Update security protocols" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              placeholder="Brief details about the task..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Assigned To</label>
              <input 
                type="text" 
                placeholder="e.g., Relebohile" 
                value={assignedTo} 
                onChange={(e) => setAssignedTo(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Task Form</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;