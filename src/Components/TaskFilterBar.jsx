import React from 'react';
import './TaskFilterBar.css';

function TaskFilterBar({ 
  searchQuery, 
  onSearchChange, 
  priorityFilter, 
  onPriorityChange, 
  assigneeFilter, 
  onAssigneeChange,
  assignees 
}) {
  return (
    <div className="filter-bar-container">
      {/* Search Input */}
      <div className="filter-item search-box">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="filter-input"
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => onSearchChange('')}>
            &times;
          </button>
        )}
      </div>

      <div className="filter-group">
        {/* Priority Dropdown */}
        <div className="filter-item">
          <label htmlFor="priority-filter">Priority:</label>
          <select 
            id="priority-filter"
            value={priorityFilter} 
            onChange={(e) => onPriorityChange(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Assignee Dropdown */}
        <div className="filter-item">
          <label htmlFor="assignee-filter">Assignee:</label>
          <select 
            id="assignee-filter"
            value={assigneeFilter} 
            onChange={(e) => onAssigneeChange(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Assignees</option>
            {assignees.map((person, idx) => (
              <option key={idx} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilterBar;