import React from 'react';
import './TaskModal.css'; // Reusing modal styles for visual consistency

function TaskDetailsModal({ task, onClose, onDeleteTask, onMoveStatus }) {
  if (!task) return null;

  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusOrder = ['submitted', 'inprogress', 'completed', 'reviewed'];
  const currentIndex = statusOrder.indexOf(task.status);

  // Friendly title lookup for status display
  const statusTitles = {
    submitted: 'Submitted',
    inprogress: 'In Progress',
    completed: 'Completed',
    reviewed: 'Reviewed'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className={`task-priority ${priorityClass}`}>{task.priority}</span>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="task-details-body" style={{ marginTop: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
            {task.title}
          </h2>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div><strong>Status:</strong> {statusTitles[task.status]}</div>
            <div><strong>Due Date:</strong> 📅 {task.dueDate}</div>
            <div><strong>Assigned To:</strong> 👤 {task.assignedTo}</div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Description
            </label>
            <p style={{ 
              backgroundColor: 'var(--card-bg)', 
              border: '1px solid var(--card-border)', 
              padding: '12px', 
              borderRadius: '8px', 
              color: 'var(--text-primary)',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              marginTop: '6px'
            }}>
              {task.description || 'No description provided for this task.'}
            </p>
          </div>
        </div>

        <div className="modal-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ color: '#ef4444', borderColor: '#ef4444' }}
            onClick={() => {
              onDeleteTask(task.id);
              onClose();
            }}
          >
            🗑️ Delete Task
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {currentIndex > 0 && (
              <button 
                className="btn-secondary"
                onClick={() => onMoveStatus(task.id, statusOrder[currentIndex - 1])}
              >
                ← Move Back
              </button>
            )}
            {currentIndex < statusOrder.length - 1 && (
              <button 
                className="btn-primary"
                onClick={() => onMoveStatus(task.id, statusOrder[currentIndex + 1])}
              >
                Move Forward →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;