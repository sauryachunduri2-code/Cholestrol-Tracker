import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const handleLogin = (newToken, newUserId) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
    setToken(newToken);
    setUserId(newUserId);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  return (
    <div className="app">
      {!token ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <Dashboard token={token} userId={userId} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
