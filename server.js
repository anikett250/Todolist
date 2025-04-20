const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express
const app = express();

// Use EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Make sure views are loaded from this folder

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use session middleware
app.use(session({
  secret: 'secret_key', // Use a strong secret for production
  resave: false,
  saveUninitialized: false,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define User Schema (not used here, but keep for future reference)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create User Model (not used in this test)
const User = mongoose.model('User', userSchema);

// Home Route (Redirect to login if not logged in)
app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/tasks');
  }
  res.redirect('/login');
});

// Login Route
app.get('/login', (req, res) => {
  res.render('login');
});

// Login POST Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded credentials
  const correctUsername = 'asd';
  const correctPassword = 'asd';
  
  // Check if username and password match the hardcoded values
  if (username === correctUsername && password === correctPassword) {
    // If credentials match, set session and redirect to tasks
    req.session.userId = username;  // Store username in session (you can also store user ID if using MongoDB)
    return res.redirect('/tasks');
  }
  
  // If credentials don't match, show error message
  res.render('login', { error: 'Wrong username or password' });
});

// Tasks Route (Protected)
app.get('/tasks', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  
  res.render('tasks');
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
