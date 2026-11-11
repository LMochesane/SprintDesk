import React, { useState, useEffect, useMemo } from 'react';
import { initialTasks } from '../Data/initialTasks.js';
import TaskCard from '../Components/TaskCard.jsx';
import TaskModal from '../Components/TaskModal.jsx';
import TaskDetailsModal from '../Components/TaskDetailsModal.jsx';
import TaskFilterBar from '../Components/TaskFilterBar.jsx';
import './Dashboard.css';

function Dashboard({ currentUserRole }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('sprintdesk_tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Modal State (Role is now received via props from App.jsx -> Navbar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('sprintdesk_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Extract unique assignees dynamically for filter dropdown
  const uniqueAssignees = useMemo(() => {
    const names = tasks.map((t) => t.assignedTo).filter(Boolean);
    return [...new Set(names)];
  }, [tasks]);

  // Filtered Task Calculation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority = 
        priorityFilter === 'All' || task.priority.toLowerCase() === priorityFilter.toLowerCase();

      const matchesAssignee = 
        assigneeFilter === 'All' || task.assignedTo === assigneeFilter;

      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, searchQuery, priorityFilter, assigneeFilter]);

  const handleAddTask = (newTask) => {
    if (currentUserRole === 'viewer') return;
    setTasks([newTask, ...tasks]);
  };

  const handleMoveStatus = (taskId, newStatus) => {
    if (currentUserRole === 'viewer') return;
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        const updated = { ...task, status: newStatus };
        if (selectedTask && selectedTask.id === taskId) {
          setSelectedTask(updated);
        }
        return updated;
      }
      return task;
    }));
  };

  const handleDeleteTask = (taskId) => {
    if (currentUserRole !== 'admin') return;
    setTasks(tasks.filter((task) => task.id !== taskId));
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(null);
    }
  };

  const columns = [
    { id: 'submitted', title: 'Submitted' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
    { id: 'reviewed', title: 'Reviewed' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Task Board</h1>
          <p>Manage and track your team's workflow stages.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {currentUserRole !== 'viewer' && (
            <button className="new-task-btn" onClick={() => setIsModalOpen(true)}>
              + New Task
            </button>
          )}
        </div>
      </div>

      {/* Sleek Search & Filter Bar */}
      <TaskFilterBar 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        assigneeFilter={assigneeFilter}
        onAssigneeChange={setAssigneeFilter}
        assignees={uniqueAssignees}
      />

      <div className="kanban-board">
        {columns.map((col) => {
          const columnTasks = filteredTasks.filter((task) => task.status === col.id);

          return (
            <div key={col.id} className="kanban-column">
              <div className="column-header">
                <h3>{col.title}</h3>
                <span className="task-count">{columnTasks.length}</span>
              </div>
              
              <div className="column-body">
                {columnTasks.length > 0 ? (
                  columnTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      userRole={currentUserRole}
                      onMoveStatus={handleMoveStatus}
                      onDeleteTask={handleDeleteTask}
                      onSelectTask={(task) => setSelectedTask(task)}
                    />
                  ))
                ) : (
                  <p className="empty-column-text">No matching tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddTask={handleAddTask} 
      />

      <TaskDetailsModal
        task={selectedTask}
        userRole={currentUserRole}
        onClose={() => setSelectedTask(null)}
        onDeleteTask={handleDeleteTask}
        onMoveStatus={handleMoveStatus}
      />
    </div>
  );
}

export default Dashboard;