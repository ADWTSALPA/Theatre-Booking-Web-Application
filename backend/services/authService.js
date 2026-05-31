const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error('Όλα τα πεδία είναι υποχρεωτικά');
  }

  const [existing] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (existing.length > 0) {
    throw new Error('Το email υπάρχει ήδη');
  }

  const hash = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  return { message: 'User created', userId: result.insertId };
};

exports.login = async ({ email, password }) => {
  const [users] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (!users.length) throw new Error('Wrong credentials');

  const user = users[0];

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error('Wrong credentials');

  const token = jwt.sign(
    { userId: user.user_id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    message: 'Login successful',
    token,
    user: {
      user_id: user.user_id,
      name: user.name,
      email: user.email
    }
  };
};

exports.getProfile = async (userId) => {
  const [rows] = await pool.query(
    'SELECT user_id, name, email FROM users WHERE user_id = ?',
    [userId]
  );

  if (!rows.length) throw new Error('User not found');

  return rows[0];
};