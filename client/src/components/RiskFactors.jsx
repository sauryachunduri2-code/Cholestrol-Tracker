import React, { useState, useEffect } from 'react';
import API_BASE from '../apiConfig';

export default function RiskFactors({ token }) {
  const [riskFactors, setRiskFactors] = useState({
    family_history: false,
    smoking: false,
    diabetes: false,
    hypertension: false,
    obesity: false,
    sedentary_lifestyle: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRiskFactors();
  }, []);

  const fetchRiskFactors = async () => {
    try {
      const response = await fetch(`${API_BASE}/risk-factors`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.id) setRiskFactors(data);
    } catch (error) {
      console.error('Error fetching risk factors:', error);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setRiskFactors(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/risk-factors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(riskFactors)
      });

      if (response.ok) {
        setMessage('Risk factors saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error saving risk factors:', error);
      setMessage('Error saving. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const riskCount = Object.values(riskFactors).filter(Boolean).length;

  return (
    <div className="risk-container">
      <h2>Your Risk Factors</h2>
      <p className="risk-summary">You have {riskCount} identified risk factor(s)</p>

      <form onSubmit={handleSubmit}>
        <div className="risk-factors-grid">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="family_history"
              checked={riskFactors.family_history}
              onChange={handleChange}
            />
            <span>Family History of High Cholesterol</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="smoking"
              checked={riskFactors.smoking}
              onChange={handleChange}
            />
            <span>Smoking</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="diabetes"
              checked={riskFactors.diabetes}
              onChange={handleChange}
            />
            <span>Diabetes</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="hypertension"
              checked={riskFactors.hypertension}
              onChange={handleChange}
            />
            <span>High Blood Pressure (Hypertension)</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="obesity"
              checked={riskFactors.obesity}
              onChange={handleChange}
            />
            <span>Obesity (BMI > 30)</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="sedentary_lifestyle"
              checked={riskFactors.sedentary_lifestyle}
              onChange={handleChange}
            />
            <span>Sedentary Lifestyle</span>
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Risk Factors'}
        </button>
      </form>

      {message && <div className="message">{message}</div>}

      <section className="risk-tips">
        <h3>💡 Health Tips to Reduce Risk</h3>
        <ul>
          <li>Reduce saturated fats and trans fats</li>
          <li>Eat more soluble fiber (oats, beans, apples)</li>
          <li>Exercise 150 minutes per week</li>
          <li>Maintain a healthy weight</li>
          <li>Quit smoking</li>
          <li>Limit alcohol consumption</li>
          <li>Manage stress effectively</li>
        </ul>
      </section>
    </div>
  );
}
