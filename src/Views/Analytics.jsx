import React, { useMemo } from 'react';
import './Analytics.css';

function Analytics({ tasks = [], currentUserRole = 'admin', currentUserName = 'Alex Rivera' }) {
  
  // ROLE-BASED SCOPING: If user is a member, filter tasks to only their assigned items
  const scopedTasks = useMemo(() => {
    if (currentUserRole === 'member') {
      return tasks.filter(task => task.assignedTo === currentUserName);
    }
    return tasks; // Admins see everything
  }, [tasks, currentUserRole, currentUserName]);

  const totalTasks = scopedTasks.length;

  // 1. Status Aggregation (using scopedTasks)
  const statusCounts = useMemo(() => {
    return scopedTasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { submitted: 0, inprogress: 0, completed: 0, reviewed: 0 }
    );
  }, [scopedTasks]);

  // 2. Priority Aggregation
  const priorityCounts = useMemo(() => {
    return scopedTasks.reduce(
      (acc, task) => {
        const p = task.priority ? task.priority.toLowerCase() : 'medium';
        acc[p] = (acc[p] || 0) + 1;
        return acc;
      },
      { urgent: 0, high: 0, medium: 0, low: 0 }
    );
  }, [scopedTasks]);

  const completedCount = (statusCounts.completed || 0) + (statusCounts.reviewed || 0);
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const urgentCount = (priorityCounts.urgent || 0) + (priorityCounts.high || 0);

  // 3. Assignee Workload Aggregation (Only rendered for Admins)
  const assigneeWorkload = useMemo(() => {
    if (currentUserRole !== 'admin') return [];
    const map = {};
    tasks.forEach((task) => {
      const assignee = task.assignedTo || 'Unassigned';
      if (!map[assignee]) {
        map[assignee] = { total: 0, completed: 0, active: 0 };
      }
      map[assignee].total += 1;
      if (task.status === 'completed' || task.status === 'reviewed') {
        map[assignee].completed += 1;
      } else {
        map[assignee].active += 1;
      }
    });
    return Object.entries(map).map(([name, stats]) => ({
      name,
      ...stats,
      completionRate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
    }));
  }, [tasks, currentUserRole]);

  // Intelligent Diagnostic Logic
  const diagnostic = useMemo(() => {
    if (totalTasks === 0) {
      return {
        type: 'info',
        title: currentUserRole === 'member' ? 'No Assigned Tasks' : 'No Data Available',
        message: currentUserRole === 'member' 
          ? 'You currently have no tasks assigned in this sprint.' 
          : 'Add tasks to your Kanban board to run sprint diagnostics.'
      };
    }

    const inProgressPct = statusCounts.inprogress / totalTasks;

    if (inProgressPct >= 0.45) {
      return {
        type: 'warning',
        title: '⚠️ Workflow Bottleneck Detected',
        message: `${Math.round(inProgressPct * 100)}% of your active tasks are clustered in "In Progress".`
      };
    }

    if (completionRate >= 70) {
      return {
        type: 'success',
        title: '🚀 High Performance Velocity',
        message: `On track with a ${completionRate}% completion rate.`
      };
    }

    return {
      type: 'info',
      title: '📊 Balanced Workflow State',
      message: 'Task execution is within normal operational thresholds.'
    };
  }, [totalTasks, statusCounts, completionRate, currentUserRole]);

  // CSV Export Function
  const handleExportCSV = () => {
    if (totalTasks === 0) return;
    let csvContent = 'ID,Title,Status,Priority,Assignee\n';
    scopedTasks.forEach((t) => {
      const titleClean = `"${t.title.replace(/"/g, '""')}"`;
      const assigneeClean = `"${(t.assignedTo || 'Unassigned').replace(/"/g, '""')}"`;
      csvContent += `${t.id},${titleClean},${t.status},${t.priority || 'Medium'},${assigneeClean}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SprintDesk_Report_${currentUserRole}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1>{currentUserRole === 'admin' ? 'Sprint Analytics & Reporting' : 'My Personal Performance'}</h1>
          <p>
            {currentUserRole === 'admin' 
              ? 'Real-time organization-wide operational metrics.' 
              : `Viewing scoped metrics for developer: ${currentUserName}`}
          </p>
        </div>
        <div className="analytics-actions">
          <span className="sprint-badge">
            Role: {currentUserRole === 'admin' ? '🛡️ Admin / Manager' : '👤 Team Member'}
          </span>
          <button className="export-btn" onClick={handleExportCSV} disabled={totalTasks === 0}>
            📥 Export Report
          </button>
        </div>
      </div>

      {/* Role Restriction Notice Banner */}
      {currentUserRole === 'member' && (
        <div className="diagnostic-banner diagnostic-info" style={{ marginBottom: '16px' }}>
          <h4>🔒 Security Scoped View</h4>
          <p>You are viewing restricted personal metrics. Organization-wide matrices are hidden for standard members.</p>
        </div>
      )}

      {/* Diagnostic Banner */}
      <div className={`diagnostic-banner diagnostic-${diagnostic.type}`}>
        <div className="diagnostic-content">
          <h4>{diagnostic.title}</h4>
          <p>{diagnostic.message}</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">{currentUserRole === 'admin' ? 'Total Task Inventory' : 'My Assigned Tasks'}</span>
          <h2 className="kpi-value">{totalTasks}</h2>
          <span className="kpi-sub">Active workflow scope</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Completion Rate</span>
          <h2 className="kpi-value">{completionRate}%</h2>
          <span className="kpi-sub">{completedCount} of {totalTasks} finished</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Urgent / High Priority</span>
          <h2 className="kpi-value highlight-urgent">{urgentCount}</h2>
          <span className="kpi-sub">Requires active attention</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Review Pipeline</span>
          <h2 className="kpi-value">{statusCounts.reviewed || 0}</h2>
          <span className="kpi-sub">Pending final sign-off</span>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="analytics-grid-2col">
        {/* Workflow Status Distribution */}
        <div className="analytics-card">
          <h3>Workflow Status Distribution</h3>
          <p className="card-subtitle">Task volume across pipeline stages</p>
          
          <div className="progress-bars-container">
            {[
              { id: 'submitted', label: 'Submitted', count: statusCounts.submitted, color: 'var(--text-secondary)' },
              { id: 'inprogress', label: 'In Progress', count: statusCounts.inprogress, color: '#3b82f6' },
              { id: 'completed', label: 'Completed', count: statusCounts.completed, color: '#10b981' },
              { id: 'reviewed', label: 'Reviewed', count: statusCounts.reviewed, color: '#8b5cf6' }
            ].map((stage) => {
              const pct = totalTasks > 0 ? Math.round((stage.count / totalTasks) * 100) : 0;
              return (
                <div className="progress-item" key={stage.id}>
                  <div className="progress-info">
                    <span className="stage-name">{stage.label}</span>
                    <span className="stage-stats">{stage.count} tasks ({pct}%)</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${pct}%`, backgroundColor: stage.color }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="analytics-card">
          <h3>Priority Severity Breakdown</h3>
          <p className="card-subtitle">Task weight distribution by severity</p>

          <div className="priority-pills-grid">
            {[
              { label: 'Urgent', count: priorityCounts.urgent || 0, color: '#ef4444' },
              { label: 'High', count: priorityCounts.high || 0, color: '#f59e0b' },
              { label: 'Medium', count: priorityCounts.medium || 0, color: '#3b82f6' },
              { label: 'Low', count: priorityCounts.low || 0, color: '#6b7280' }
            ].map((p) => {
              const pct = totalTasks > 0 ? Math.round((p.count / totalTasks) * 100) : 0;
              return (
                <div className="priority-metric-box" key={p.label}>
                  <div className="priority-indicator" style={{ backgroundColor: p.color }}></div>
                  <div className="priority-content">
                    <span className="p-label">{p.label}</span>
                    <span className="p-number">{p.count} <small>({pct}%)</small></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tier 3: Team Workload Matrix (Admin Only) */}
      {currentUserRole === 'admin' && (
        <div className="analytics-card full-width">
          <h3>Team Workload & Assignee Matrix</h3>
          <p className="card-subtitle">Organization-wide task allocations and completion performance</p>

          <div className="table-wrapper">
            <table className="workload-table">
              <thead>
                <tr>
                  <th>Assignee</th>
                  <th>Total Assigned</th>
                  <th>Completed</th>
                  <th>Active / Pending</th>
                  <th>Efficiency Rate</th>
                </tr>
              </thead>
              <tbody>
                {assigneeWorkload.length > 0 ? (
                  assigneeWorkload.map((member, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="assignee-cell">
                          <span className="assignee-avatar">
                            {member.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()}
                          </span>
                          <span className="assignee-name">{member.name}</span>
                        </div>
                      </td>
                      <td>{member.total}</td>
                      <td><span className="badge-completed">{member.completed}</span></td>
                      <td><span className="badge-active">{member.active}</span></td>
                      <td>
                        <div className="efficiency-bar-wrapper">
                          <span>{member.completionRate}%</span>
                          <div className="mini-track">
                            <div className="mini-fill" style={{ width: `${member.completionRate}%` }}></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-table">No assignee data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;