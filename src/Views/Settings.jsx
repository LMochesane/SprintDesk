import React from 'react';

function Settings({ currentUserRole, setCurrentUserRole, currentUserName, setCurrentUserName }) {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>Settings & Governance</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Manage team roles, access controls, and user profiles.
      </p>

      {/* RBAC Simulator Box */}
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
          Switch user roles to simulate security scoping across the Analytics and Dashboard views.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <button 
            onClick={() => setCurrentUserRole('admin')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--card-border)',
              background: currentUserRole === 'admin' ? 'var(--btn-bg, #2563eb)' : 'transparent',
              color: currentUserRole === 'admin' ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            🛡️ Admin Mode
          </button>
          <button 
            onClick={() => setCurrentUserRole('member')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid var(--card-border)',
              background: currentUserRole === 'member' ? 'var(--btn-bg, #2563eb)' : 'transparent',
              color: currentUserRole === 'member' ? '#fff' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            👤 Team Member Mode
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Active Persona: <strong>{currentUserName}</strong> ({currentUserRole.toUpperCase()})
        </p>
      </div>
    </div>
  );
}

export default Settings;