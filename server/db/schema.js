import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'cholesterol.db');

export async function initializeDB() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Cholesterol readings table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cholesterol_readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total_cholesterol INTEGER,
      ldl INTEGER,
      hdl INTEGER,
      triglycerides INTEGER,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Risk factors table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS risk_factors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      family_history BOOLEAN,
      smoking BOOLEAN,
      diabetes BOOLEAN,
      hypertension BOOLEAN,
      obesity BOOLEAN,
      sedentary_lifestyle BOOLEAN,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Recipes table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      instructions TEXT,
      cholesterol_level TEXT,
      calories INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

export async function getDB() {
  return await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}
