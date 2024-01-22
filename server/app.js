const express = require('express');
const cors = require('cors'); // Add this line for CORS handling
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const mongoURI = 'mongodb://localhost:27017/CSC310';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
  });

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Routes
app.use('/playlist', require('./routes/playlist'));
app.use('/songs', require('./routes/song'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.get('/Music-Player-final/index', (req, res) => {
  res.sendFile('./Music-Player-final/index.html', {root: __dirname})
})

app.get('/Music-Player-final/create', (req, res) => {
  res.sendFile('./Music-Player-final/create.html', {root: __dirname})
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
