const express = require('express');
const mysql = require('mysql2');
const path = require('path');  // For handling file paths correctly
const app = express();
const port = 3000;

// Serve static files (e.g., index.html, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: '',  // Replace with your MySQL password
  database: 'mywebsite'  // Replace with your MySQL database name
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Fetch all users from the MySQL database
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
      return;
    }
    res.json(results);
  });
});

// Add a new user to the database
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add user' });
      return;
    }
    res.status(201).json({ id: result.insertId, name, email });
  });
});

// Root route ('/') to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});