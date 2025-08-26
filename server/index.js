import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { openDb, initDb } from './db.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Инициализация базы
initDb();

// Получить все items
app.get('/api/items', async (req, res) => {
  const db = await openDb();
  const items = await db.all('SELECT * FROM items');
  res.json(items);
});

// Добавить item
app.post('/api/items', async (req, res) => {
  const { name, description, price, type, image, icon } = req.body;
  if (!name || !type) return res.status(400).json({ error: 'Name and type are required' });
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO items (name, description, price, type, image, icon) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, type, image, icon]
  );
  const item = await db.get('SELECT * FROM items WHERE id = ?', [result.lastID]);
  res.status(201).json(item);
});

// Редактировать item
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, type, image, icon } = req.body;
  const db = await openDb();
  await db.run(
    'UPDATE items SET name = ?, description = ?, price = ?, type = ?, image = ?, icon = ? WHERE id = ?',
    [name, description, price, type, image, icon, id]
  );
  const item = await db.get('SELECT * FROM items WHERE id = ?', [id]);
  res.json(item);
});

// Удалить item
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const db = await openDb();
  await db.run('DELETE FROM items WHERE id = ?', [id]);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 