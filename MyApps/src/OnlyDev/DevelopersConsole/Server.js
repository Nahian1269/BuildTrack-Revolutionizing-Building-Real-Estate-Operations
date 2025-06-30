import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buildtrack2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    // process.exit(1);
  }
}

await testConnection();

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        dueDate DATE,
        assignedTo INT,
        status ENUM('Pending', 'In Progress', 'Completed', 'Blocked') DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignedTo) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS vacancies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        status ENUM('Open', 'Closed') DEFAULT 'Open',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

await initializeDatabase();

app.get('/api/tasks', async (_req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, dueDate, assignedTo, status } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, dueDate, assignedTo, status) VALUES (?, ?, ?, ?, ?)',
      [title, description, dueDate, assignedTo, status]
    );
    
    const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(newTask[0]);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, assignedTo, status } = req.body;
  
  try {
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, dueDate = ?, assignedTo = ?, status = ? WHERE id = ?',
      [title, description, dueDate, assignedTo, status, taskId]
    );
    
    const [updatedTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Users endpoints
app.get('/api/users', async (_req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, role } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, role) VALUES (?, ?, ?)',
      [name, email, role]
    );
    
    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Vacancies endpoints
app.get('/api/vacancies', async (_req, res) => {
  try {
    const [vacancies] = await pool.query('SELECT * FROM vacancies');
    res.json(vacancies);
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    res.status(500).json({ error: 'Failed to fetch vacancies' });
  }
});

app.post('/api/vacancies', async (req, res) => {
  const { title, description, requirements, status } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO vacancies (title, description, requirements, status) VALUES (?, ?, ?, ?)',
      [title, description, requirements, status || 'Open']
    );
    
    const [newVacancy] = await pool.query('SELECT * FROM vacancies WHERE id = ?', [result.insertId]);
    res.status(201).json(newVacancy[0]);
  } catch (error) {
    console.error('Error adding vacancy:', error);
    res.status(500).json({ error: 'Failed to add vacancy' });
  }
});

// Notes endpoints
app.get('/api/notes', async (_req, res) => {
  try {
    const [notes] = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { text } = req.body;
  
  if (!text?.trim()) {
    return res.status(400).json({ error: 'Note text is required' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO notes (text) VALUES (?)',
      [text]
    );
    
    const [newNote] = await pool.query('SELECT * FROM notes WHERE id = ?', [result.insertId]);
    res.status(201).json(newNote[0]);
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Failed to add note' });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  
  try {
    await pool.query('DELETE FROM notes WHERE id = ?', [noteId]);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});