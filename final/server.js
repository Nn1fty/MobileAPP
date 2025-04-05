const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Your MySQL username
  password: '',       // Your MySQL password
  database: 'my_database'  // Your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Route to display all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Route for user registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before saving to database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // Insert new user into the database
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});