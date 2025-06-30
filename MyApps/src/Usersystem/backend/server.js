
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buildtrack2'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        throw new Error('MySQL connection error: ' + err.message);
    }
    console.log('Connected to MySQL');
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) {
                console.error('Query error:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already registered' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (err) => {
                    if (err) {
                        console.error('Insert error:', err);
                        return res.status(500).json({ message: 'Registration failed' });
                    }
                    res.status(201).json({ message: 'Registration successful!' });
                }
            );
        });
    } catch (err) {
        console.error('Catch error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/Uselogin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
