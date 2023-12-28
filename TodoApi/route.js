const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('./src/db.js');

const verifyJWT = (req, res, next) => {
  const auth = req.headers.authorization;
  if (typeof auth === "string" && auth.startsWith("Bearer ")) {
    const token = auth.split("Bearer ")[1];
    const payload = jwt.verify(token, "jwt_secret_key")
    res.user = payload;
    next()
    return;
  }
  res.status(401).json({ message: "Unauth" })
}

// POST
router.post('/fields', verifyJWT, (req, res) => {
  const userId = res.user.id;
  const { title, description, duedate } = req.body;
  const query = 'INSERT INTO todo ( title, description, duedate, isCompleted, userId) VALUES ( ?, ?, ?, ?, ?)';
  const values = [title, description, duedate, false, userId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error creating Field:', err);
      res.status(500).json({ error: 'Error creating Field' });
      return;
    }
    res.json({ message: 'Field created', id: result.insertId });
  });
});

// Get all Field records
router.get('/fields', verifyJWT, (req, res) => {
  const userId = res.user.id;
  const query = `SELECT * FROM todo WHERE userId = ${userId}`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching Fields:', err);
      res.status(500).json({ error: 'Error fetching Fields' });
      return;
    }

    res.json(results);
  });
});

// Get a specific Field record by ID
router.get('/fields/:id', (req, res) => {
  const fieldId = req.params.id;
  const query = 'SELECT * FROM todo WHERE id = ?';

  db.query(query, [fieldId], (err, results) => {
    if (err) {
      console.error('Error fetching Field:', err);
      res.status(500).json({ error: 'Error fetching Field' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Field not found' });
      return;
    }

    res.json(results[0]);
  });
});

// Update a Field record by ID
router.put('/fields/:id', (req, res) => {
  const fieldId = req.params.id;
  const { title, description, duedate, isCompleted } = req.body;
  const query = 'UPDATE todo SET title = ?, description = ?, duedate = ?, isCompleted = ? WHERE id = ?';
  const values = [title, description, duedate, isCompleted, fieldId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating Field:', err);
      res.status(500).json({ error: 'Error updating Field' });
      return;
    }
    res.json({ message: 'Field updated', id: fieldId });
  });
});

// Delete a Field record by ID
router.delete('/fields/:id', (req, res) => {
  const fieldId = req.params.id;
  const query = 'DELETE FROM todo WHERE id = ?';

  db.query(query, [fieldId], (err, result) => {
    if (err) {
      console.error('Error deleting Field:', err);
      res.status(500).json({ error: 'Error deleting Field' });
      return;
    }
    res.json({ message: 'Field deleted', id: fieldId });
  });
});


router.post('/register', async (req, res) => {
  try {
    const { username, password, email, department } = req.body;
    const sql = 'INSERT INTO users (username, password, email, department) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, password, email, department], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Registration failed da...' });
      } else {
        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], async (error, results) => {
      if (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
      }
      if (results.length === 0) {
        res.status(401).json({ error: 'Invalid User' });
        return;
      }

      const user = results[0];
      const token = jwt.sign({ id: user.id, username: user.username }, 'jwt_secret_key');
      res.status(200).json({ success: true, token });

    });


  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
})

module.exports = router;