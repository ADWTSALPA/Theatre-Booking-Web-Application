const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/:showtimeId', async (req, res) => {
  try {
    const { showtimeId } = req.params;

    const [rows] = await pool.query(
      'SELECT * FROM seats WHERE showtime_id = ? ORDER BY row_label, seat_number',
      [showtimeId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;