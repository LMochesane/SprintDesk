import React from 'react';
import './RoleSwitcher.css';

function RoleSwitcher({ currentRole, onRoleChange }) {
  return (
    <div className="role-switcher">
      <span className="role-label">Viewing As:</span>
      <select 
        value={currentRole} 
        onChange={(e) => onRoleChange(e.target.value)}
        className="role-select"
      >
        <option value="admin">👑 Admin (Full Access)</option>
        <option value="member">👤 Member (Edit Only)</option>
        <option value="viewer">👁️ Viewer (Read Only)</option>
      </select>
    </div>
  );
}

export default RoleSwitcher;