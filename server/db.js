import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL,
      type TEXT NOT NULL CHECK(type IN ('product', 'service')),
      image TEXT,
      icon TEXT
    );
  `);
  // Миграция: добавляем поле image, если его нет
  await db.exec(`ALTER TABLE items ADD COLUMN image TEXT;`).catch(() => {});
  // Миграция: добавляем поле icon, если его нет
  await db.exec(`ALTER TABLE items ADD COLUMN icon TEXT;`).catch(() => {});
  return db;
} 