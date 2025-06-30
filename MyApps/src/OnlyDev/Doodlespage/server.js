// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

// sql {
//     CREATE TABLE doodles (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   title VARCHAR(255),
//   imageData LONGTEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// }



const app = express();
const PORT = 3001;

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'buildtask2',
};

app.use(cors());
app.use(express.json());

app.get('/api/doodles', async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT * FROM doodles ORDER BY created_at DESC');
    await conn.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch doodles' });
  }
});

// Save or update a doodle
app.post('/api/doodles', async (req, res) => {
  const { id, title, imageData } = req.body;

  if (!title || !imageData) {
    return res.status(400).json({ error: 'Missing title or image data' });
  }

  try {
    const conn = await mysql.createConnection(dbConfig);

    if (id) {
      await conn.execute(
        'UPDATE doodles SET title = ?, imageData = ? WHERE id = ?',
        [title, imageData, id]
      );
    } else {
      await conn.execute(
        'INSERT INTO doodles (title, imageData) VALUES (?, ?)',
        [title, imageData]
      );
    }

    await conn.end();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save doodle' });
  }
});

// Delete a doodle
app.delete('/api/doodles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.execute('DELETE FROM doodles WHERE id = ?', [id]);
    await conn.end();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete doodle' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
