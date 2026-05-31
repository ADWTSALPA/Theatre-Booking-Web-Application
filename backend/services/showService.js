const pool = require('../config/db');

exports.getShows = async ({ q, theatreId }) => {
  let query = `
    SELECT s.*, t.name AS theatre_name, t.location
    FROM shows s
    JOIN theatres t ON s.theatre_id = t.theatre_id
    WHERE 1=1
  `;
  const params = [];

  if (theatreId) {
    query += ' AND s.theatre_id = ?';
    params.push(theatreId);
  }

  if (q) {
    query += ' AND (s.title LIKE ? OR t.name LIKE ? OR t.location LIKE ?)';
    const like = `%${q}%`;
    params.push(like, like, like);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

exports.getShowById = async (id) => {
  const [rows] = await pool.query(
    `SELECT s.*, t.name AS theatre_name, t.location
     FROM shows s
     JOIN theatres t ON s.theatre_id = t.theatre_id
     WHERE s.show_id = ?`,
    [id]
  );

  if (!rows.length) throw new Error('Show not found');
  return rows[0];
};

exports.getShowtimes = async ({ showId }) => {
  let query = 'SELECT * FROM showtimes WHERE 1=1';
  const params = [];

  if (showId) {
    query += ' AND show_id = ?';
    params.push(showId);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};