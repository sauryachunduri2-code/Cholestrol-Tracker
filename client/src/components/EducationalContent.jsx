import React, { useState, useEffect } from 'react';
import API_BASE from '../apiConfig';

export default function EducationalContent() {
  const [cholesterolLevels, setCholesterolLevels] = useState(null);
  const [riskInfo, setRiskInfo] = useState(null);

  useEffect(() => {
    fetchEducationalContent();
  }, []);

  const fetchEducationalContent = async () => {
    try {
      const [levelsRes, riskRes] = await Promise.all([
        fetch(`${API_BASE}/info/cholesterol-levels`),
        fetch(`${API_BASE}/info/risk-factors`)
      ]);
      const levels = await levelsRes.json();
      const risk = await riskRes.json();
      setCholesterolLevels(levels);
      setRiskInfo(risk);
    } catch (error) {
      console.error('Error fetching educational content:', error);
    }
  };

  return (
    <div className="education-container">
      <section className="cholesterol-levels">
        <h2>Understanding Cholesterol Levels</h2>
        {cholesterolLevels && (
          <div className="levels-grid">
            <div className="level-box optimal">
              <h3>✅ Optimal</h3>
              <p><strong>Total:</strong> {cholesterolLevels.optimal.total}</p>
              <p><strong>LDL:</strong> {cholesterolLevels.optimal.ldl}</p>
              <p><strong>HDL:</strong> {cholesterolLevels.optimal.hdl}</p>
              <p><strong>Triglycerides:</strong> {cholesterolLevels.optimal.triglycerides}</p>
            </div>
            <div className="level-box borderline">
              <h3>⚠️ Borderline High</h3>
              <p><strong>Total:</strong> {cholesterolLevels.borderline.total}</p>
              <p><strong>LDL:</strong> {cholesterolLevels.borderline.ldl}</p>
              <p><strong>HDL:</strong> {cholesterolLevels.borderline.hdl}</p>
              <p><strong>Triglycerides:</strong> {cholesterolLevels.borderline.triglycerides}</p>
            </div>
            <div className="level-box high">
              <h3>🚨 High</h3>
              <p><strong>Total:</strong> {cholesterolLevels.high.total}</p>
              <p><strong>LDL:</strong> {cholesterolLevels.high.ldl}</p>
              <p><strong>HDL:</strong> {cholesterolLevels.high.hdl}</p>
              <p><strong>Triglycerides:</strong> {cholesterolLevels.high.triglycerides}</p>
            </div>
          </div>
        )}
      </section>

      {riskInfo && (
        <section className="risk-info">
          <h2>Risk Factors & Prevention</h2>
          <div className="risk-columns">
            <div className="risk-column">
              <h3>Non-Modifiable Factors</h3>
              <ul>
                {riskInfo.nonModifiable.map((factor, i) => <li key={i}>{factor}</li>)}
              </ul>
            </div>
            <div className="risk-column">
              <h3>Modifiable Factors</h3>
              <ul>
                {riskInfo.modifiable.map((factor, i) => <li key={i}>{factor}</li>)}
              </ul>
            </div>
          </div>
          <div className="tips-section">
            <h3>Health Tips</h3>
            <ul>
              {riskInfo.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="what-is-cholesterol">
        <h2>What is Cholesterol?</h2>
        <p>Cholesterol is a waxy substance found in your blood. Your body needs some cholesterol to make hormones and vitamin D, but too much can increase your risk of heart disease.</p>
        <h3>Types of Cholesterol:</h3>
        <ul>
          <li><strong>LDL (Bad):</strong> Builds up in arteries</li>
          <li><strong>HDL (Good):</strong> Removes cholesterol from arteries</li>
          <li><strong>Triglycerides:</strong> High levels increase heart disease risk</li>
        </ul>
      </section>
    </div>
  );
}
