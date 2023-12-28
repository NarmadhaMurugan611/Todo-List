const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken')
const router = require('./route.js');
const db = require('./src/db');

app.use(express.json());
app.use(cors())
app.use("/", router)

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});


app.post('/register',  (req, res) => {
  try {
    const { username, password, email, department } = req.body;
    const sql = 'INSERT INTO users ( username, password, email, department) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, password, email, department], (error, results) => {
      if (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed ..' });
      } else {
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});


app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Fields:', err);
      res.status(500).json({ error: 'Error fetching Fields' });
      return;
    }
    res.json(results);
  });
});





// module.exports=db