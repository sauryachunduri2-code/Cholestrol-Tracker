import express from 'express';
import bcrypt from 'bcryptjs';
import { getDB } from './db/schema.js';
import { authMiddleware, generateToken } from './middleware.js';

const router = express.Router();

// ===== AUTH ROUTES =====
router.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, age, gender } = req.body;
    const db = await getDB();

    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (email, password, name, age, gender) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, name, age, gender]
    );

    const token = generateToken(result.lastID);
    res.json({ token, userId: result.lastID, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await getDB();

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.json({ token, userId: user.id, name: user.name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== CHOLESTEROL READINGS =====
router.post('/readings', authMiddleware, async (req, res) => {
  try {
    const { total_cholesterol, ldl, hdl, triglycerides, notes } = req.body;
    const db = await getDB();

    const result = await db.run(
      'INSERT INTO cholesterol_readings (user_id, total_cholesterol, ldl, hdl, triglycerides, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [req.userId, total_cholesterol, ldl, hdl, triglycerides, notes]
    );

    res.json({ id: result.lastID, message: 'Reading recorded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/readings', authMiddleware, async (req, res) => {
  try {
    const db = await getDB();
    const readings = await db.all(
      'SELECT * FROM cholesterol_readings WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== RISK FACTORS =====
router.post('/risk-factors', authMiddleware, async (req, res) => {
  try {
    const db = await getDB();
    const { family_history, smoking, diabetes, hypertension, obesity, sedentary_lifestyle } = req.body;

    const existing = await db.get('SELECT id FROM risk_factors WHERE user_id = ?', [req.userId]);

    if (existing) {
      await db.run(
        'UPDATE risk_factors SET family_history = ?, smoking = ?, diabetes = ?, hypertension = ?, obesity = ?, sedentary_lifestyle = ? WHERE user_id = ?',
        [family_history, smoking, diabetes, hypertension, obesity, sedentary_lifestyle, req.userId]
      );
    } else {
      await db.run(
        'INSERT INTO risk_factors (user_id, family_history, smoking, diabetes, hypertension, obesity, sedentary_lifestyle) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [req.userId, family_history, smoking, diabetes, hypertension, obesity, sedentary_lifestyle]
      );
    }

    res.json({ message: 'Risk factors saved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/risk-factors', authMiddleware, async (req, res) => {
  try {
    const db = await getDB();
    const riskFactors = await db.get('SELECT * FROM risk_factors WHERE user_id = ?', [req.userId]);
    res.json(riskFactors || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== RECIPES =====
router.get('/recipes', async (req, res) => {
  try {
    const db = await getDB();
    const recipes = await db.all('SELECT * FROM recipes');
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== EDUCATIONAL CONTENT =====
router.get('/info/cholesterol-levels', (req, res) => {
  res.json({
    optimal: { total: '< 200 mg/dL', ldl: '< 100 mg/dL', hdl: '> 60 mg/dL', triglycerides: '< 150 mg/dL' },
    borderline: { total: '200-239 mg/dL', ldl: '100-129 mg/dL', hdl: '40-60 mg/dL', triglycerides: '150-199 mg/dL' },
    high: { total: '≥ 240 mg/dL', ldl: '≥ 160 mg/dL', hdl: '< 40 mg/dL', triglycerides: '≥ 200 mg/dL' }
  });
});

router.get('/info/risk-factors', (req, res) => {
  res.json({
    nonModifiable: ['Age', 'Gender', 'Family History', 'Genetics'],
    modifiable: ['Smoking', 'Poor Diet', 'Lack of Exercise', 'Obesity', 'Diabetes', 'High Blood Pressure'],
    tips: [
      'Reduce saturated fats and trans fats',
      'Increase fiber intake',
      'Exercise regularly (150 min/week)',
      'Maintain healthy weight',
      'Quit smoking',
      'Limit alcohol consumption'
    ]
  });
});

export default router;
