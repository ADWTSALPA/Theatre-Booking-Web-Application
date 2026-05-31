const pool = require('../config/db');

exports.getTheatres = async ({ q }) => {
  let query = 'SELECT * FROM theatres';
  const params = [];

  if (q) {
    query += ' WHERE name LIKE ? OR location LIKE ? OR description LIKE ?';
    const like = `%${q}%`;
    params.push(like, like, like);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};