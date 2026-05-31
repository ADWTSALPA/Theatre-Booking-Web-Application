const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const { showId, date } = req.query;

    let query = `
      SELECT 
        st.showtime_id,
        st.show_id,
        st.show_date,
        st.show_time,
        st.hall_name,
        st.base_price,
        s.title
      FROM showtimes st
      JOIN shows s ON st.show_id = s.show_id
      WHERE 1=1
    `;
    const params = [];

    if (showId) {
      query += ' AND st.show_id = ?';
      params.push(showId);
    }

    if (date) {
      query += ' AND st.show_date = ?';
      params.push(date);
    }

    query += ' ORDER BY st.show_date, st.show_time';

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;