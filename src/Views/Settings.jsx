import React from 'react';

function Settings({ currentUserRole, currentUserName }) {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Settings & Governance</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        View your authenticated workspace role and security governance status.
      </p>

      {/* Read-Only RBAC Governance Box */}
      <div style={{ 
        background: 'var(--column-bg)', 
        border: '1px solid var(--card-border)', 
        borderRadius: '12px', 
        padding: '24px',
        maxWidth: '500px',
        marginBottom: '24px'
      }}>
        <h3 style={{ marginBottom: '8px' }}>Role-Based Access Control (RBAC)</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Your security permissions across Dashboard and Analytics are enforced by the backend API.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '6px',
          border: '1px solid var(--card-border)',
          background: 'rgba(100, 255, 218, 0.08)',
          color: 'var(--btn-bg, #64FFDA)',
          fontWeight: '600',
          fontSize: '0.85rem',
          marginBottom: '16px'
        }}>
          <span>{currentUserRole === 'admin' ? '🛡️' : '👤'}</span>
          <span>{currentUserRole ? currentUserRole.toUpperCase() : 'MEMBER'} ACCESS</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          Active Persona: <strong style={{ color: 'var(--text-primary)' }}>{currentUserName}</strong>
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          To switch roles, sign out from the top navigation bar and log in with a different account.
        </p>
      </div>
    </div>
  );
}

export default Settings;