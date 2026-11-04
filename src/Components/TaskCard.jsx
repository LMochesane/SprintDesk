import React from 'react';
import './TaskCard.css';

function TaskCard({ task, userRole, onMoveStatus, onDeleteTask, onSelectTask }) {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusOrder = ['submitted', 'inprogress', 'completed', 'reviewed'];
  const currentIndex = statusOrder.indexOf(task.status);

  const canMove = userRole === 'admin' || userRole === 'member';
  const canDelete = userRole === 'admin';

  return (
    <div className="task-card" onClick={() => onSelectTask(task)}>
      <div className="task-card-header">
        <span className={`task-priority ${priorityClass}`}>{task.priority}</span>
        
        {/* Only Admins see the delete button */}
        {canDelete && (
          <div className="task-card-actions">
            <button 
              className="action-btn delete-btn" 
              onClick={(e) => { 
                e.stopPropagation(); 
                onDeleteTask(task.id); 
              }}
              title="Delete Task (Admin Only)"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>

      <div className="task-card-footer">
        {/* Only Admins and Members see movement arrows */}
        <div className="status-controls">
          {canMove && currentIndex > 0 && (
            <button 
              className="move-btn"
              onClick={(e) => {
                e.stopPropagation();
                onMoveStatus(task.id, statusOrder[currentIndex - 1]);
              }}
              title="Move Back"
            >
              ←
            </button>
          )}
          {canMove && currentIndex < statusOrder.length - 1 && (
            <button 
              className="move-btn"
              onClick={(e) => {
                e.stopPropagation();
                onMoveStatus(task.id, statusOrder[currentIndex + 1]);
              }}
              title="Move Forward"
            >
              →
            </button>
          )}
        </div>

        <div className="task-assignee" title={`Assigned to ${task.assignedTo}`}>
          {task.assignedTo.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;