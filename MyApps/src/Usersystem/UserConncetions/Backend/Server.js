
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buildtrack',
});

app.get('/api/users', async (_req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, phone FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
