import React, { useState } from 'react';
import CholesterolTracker from '../components/CholesterolTracker';
import RiskFactors from '../components/RiskFactors';
import EducationalContent from '../components/EducationalContent';
import RecipeList from '../components/RecipeList';

export default function Dashboard({ token, userId, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Cholesterol Management Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📈 Tracker
        </button>
        <button
          className={activeTab === 'risks' ? 'active' : ''}
          onClick={() => setActiveTab('risks')}
        >
          ⚠️ Risk Factors
        </button>
        <button
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          🍽️ Recipes
        </button>
        <button
          className={activeTab === 'info' ? 'active' : ''}
          onClick={() => setActiveTab('info')}
        >
          ℹ️ Information
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'dashboard' && <CholesterolTracker token={token} />}
        {activeTab === 'risks' && <RiskFactors token={token} />}
        {activeTab === 'recipes' && <RecipeList token={token} />}
        {activeTab === 'info' && <EducationalContent />}
      </main>
    </div>
  );
}
