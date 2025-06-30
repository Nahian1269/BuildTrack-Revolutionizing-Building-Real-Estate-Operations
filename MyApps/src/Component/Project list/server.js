// server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'buildtrack2'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});


db.query(`
  CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('Planning', 'Ongoing', 'Completed') DEFAULT 'Planning',
    manager VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);


app.get('/api/projects', (_req, res) => {
  db.query('SELECT * FROM projects ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/projectlist', (req, res) => {
  const { name, location, status, manager } = req.body;
  db.query(
    'INSERT INTO projects (name, location, status, manager) VALUES (?, ?, ?, ?)',
    [name, location, status || 'Planning', manager],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, name, location, status, manager });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));