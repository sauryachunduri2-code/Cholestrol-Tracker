import React, { useState, useEffect } from 'react';
import API_BASE from '../apiConfig';

export default function CholesterolTracker({ token }) {
  const [readings, setReadings] = useState([]);
  const [formData, setFormData] = useState({
    total_cholesterol: '',
    ldl: '',
    hdl: '',
    triglycerides: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReadings();
  }, []);

  const fetchReadings = async () => {
    try {
      const response = await fetch(`${API_BASE}/readings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setReadings(data);
    } catch (error) {
      console.error('Error fetching readings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/readings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ total_cholesterol: '', ldl: '', hdl: '', triglycerides: '', notes: '' });
        fetchReadings();
      }
    } catch (error) {
      console.error('Error adding reading:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="tracker-container">
      <section className="tracker-form">
        <h2>Add New Reading</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="number"
              name="total_cholesterol"
              placeholder="Total Cholesterol (mg/dL)"
              value={formData.total_cholesterol}
              onChange={handleChange}
            />
            <input
              type="number"
              name="ldl"
              placeholder="LDL (Bad Cholesterol)"
              value={formData.ldl}
              onChange={handleChange}
            />
            <input
              type="number"
              name="hdl"
              placeholder="HDL (Good Cholesterol)"
              value={formData.hdl}
              onChange={handleChange}
            />
            <input
              type="number"
              name="triglycerides"
              placeholder="Triglycerides"
              value={formData.triglycerides}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Reading'}
          </button>
        </form>
      </section>

      <section className="tracker-history">
        <h2>Your History</h2>
        {readings.length === 0 ? (
          <p className="no-data">No readings yet. Add your first reading above!</p>
        ) : (
          <div className="readings-list">
            {readings.map((reading) => (
              <div key={reading.id} className="reading-card">
                <div className="reading-date">{new Date(reading.date).toLocaleDateString()}</div>
                <div className="reading-values">
                  <div className="value">Total: <strong>{reading.total_cholesterol}</strong> mg/dL</div>
                  <div className="value">LDL: <strong>{reading.ldl}</strong> mg/dL</div>
                  <div className="value">HDL: <strong>{reading.hdl}</strong> mg/dL</div>
                  <div className="value">Triglycerides: <strong>{reading.triglycerides}</strong> mg/dL</div>
                </div>
                {reading.notes && <p className="notes">{reading.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
