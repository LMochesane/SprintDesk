// import React, { useState } from 'react';
// import './Login.css'; // Your custom vanilla CSS file

// export default function Login({ onLoginSuccess }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Basic validation check
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setError('');
//     console.log('Logging in with:', { email, password });

//     // Later on, this is where you will send this data to your C# backend!
//     // For now, we simulate success or pass it up to parent state.
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2>SprintDesk Access</h2>
//         <p className="login-subtitle">Sign in to your workspace</p>

//         {error && <div className="error-banner">{error}</div>}

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input 
//               type="email" 
//               id="email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               placeholder="name@company.com"
//             />
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input 
//               type="password" 
//               id="password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               placeholder="••••••••"
//             />
//           </div>

//           <button type="submit" className="login-btn">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    
    // Simple role determination based on input
    const role = email.toLowerCase().includes('admin') 
      ? 'admin' 
      : email.toLowerCase().includes('viewer') 
      ? 'viewer' 
      : 'member';

    // Pass role and name back up to App.jsx
    onLoginSuccess(role, 'Alex Rivera');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>SprintDesk Access</h2>
        <p className="login-subtitle">Sign in to your workspace</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@sprintdesk.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}