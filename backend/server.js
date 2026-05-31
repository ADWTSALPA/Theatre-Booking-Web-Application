const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/theatres', require('./routes/theatreRoutes'));
app.use('/shows', require('./routes/showRoutes'));
app.use('/reservations', require('./routes/reservationRoutes'));
app.use('/showtimes', require('./routes/showtimes'));
app.use('/seats', require('./routes/seats'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});