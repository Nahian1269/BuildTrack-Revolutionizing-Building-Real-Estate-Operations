import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

(async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());


  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buildtrack2',
  });


  await db.query('CREATE DATABASE IF NOT EXISTS buildtrack2');
  await db.query(`CREATE TABLE IF NOT EXISTS tasks2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    completed TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Helpers
  const toBool = (n) => Boolean(Number(n));

  // Routes
  app.get('/api/tasks2', async (_, res) => {
    const [rows] = await db.query('SELECT * FROM tasks2 ORDER BY id DESC');
    res.json(rows.map((r) => ({ ...r, completed: toBool(r.completed) })));
  });

  app.post('/api/tasks2', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'text is required' });
    await db.query('INSERT INTO tasks2 (text) VALUES (?)', [text]);
    res.sendStatus(201);
  });

  app.patch('/api/tasks2/:id', async (req, res) => {
    const { completed } = req.body;
    await db.query('UPDATE tasks2 SET completed=? WHERE id=?', [completed ? 1 : 0, req.params.id]);
    res.sendStatus(204);
  });

  app.delete('/api/tasks2/:id', async (req, res) => {
    await db.query('DELETE FROM tasks2 WHERE id=?', [req.params.id]);
    res.sendStatus(204);
  });

  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
