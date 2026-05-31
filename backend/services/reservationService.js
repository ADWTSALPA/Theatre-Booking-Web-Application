const pool = require('../config/db');

exports.createReservation = async (userId, body) => {
  const connection = await pool.getConnection();

  try {
    const { showtime_id, seats } = body;

    if (!showtime_id || !seats || !Array.isArray(seats) || seats.length === 0) {
      throw new Error('Missing or invalid data');
    }

    await connection.beginTransaction();

    const [seatRows] = await connection.query(
      `SELECT seat_id, is_reserved
       FROM seats
       WHERE showtime_id = ? AND seat_id IN (?)`,
      [showtime_id, seats]
    );

    if (seatRows.length !== seats.length) {
      await connection.rollback();
      throw new Error('Some seats do not belong to this showtime');
    }

    const alreadyReserved = seatRows.filter((seat) => seat.is_reserved === 1);

    if (alreadyReserved.length > 0) {
      await connection.rollback();
      throw new Error('Some seats are already reserved');
    }

    const [showtimeRows] = await connection.query(
      `SELECT base_price FROM showtimes WHERE showtime_id = ?`,
      [showtime_id]
    );

    if (showtimeRows.length === 0) {
      await connection.rollback();
      throw new Error('Showtime not found');
    }

    const basePrice = Number(showtimeRows[0].base_price);
    const totalPrice = seats.length * basePrice;

    const [result] = await connection.query(
      `INSERT INTO reservations (user_id, showtime_id, total_price, status)
       VALUES (?, ?, ?, ?)`,
      [userId, showtime_id, totalPrice, 'active']
    );

    const reservationId = result.insertId;

    for (const seatId of seats) {
      await connection.query(
        `INSERT INTO reservation_seats (reservation_id, seat_id)
         VALUES (?, ?)`,
        [reservationId, seatId]
      );

      await connection.query(
        `UPDATE seats
         SET is_reserved = 1
         WHERE seat_id = ? AND showtime_id = ?`,
        [seatId, showtime_id]
      );
    }

    await connection.commit();

    return {
      message: 'Reservation created successfully',
      reservationId
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getMyReservations = async (userId) => {
  const [rows] = await pool.query(
    `SELECT 
       r.reservation_id,
       r.showtime_id,
       r.total_price,
       r.status,
       s.show_date,
       s.show_time,
       sh.title AS show_title,
       rs.seat_id,
       st.row_label,
       st.seat_number,
       st.category
     FROM reservations r
     JOIN showtimes s ON r.showtime_id = s.showtime_id
     JOIN shows sh ON s.show_id = sh.show_id
     LEFT JOIN reservation_seats rs ON r.reservation_id = rs.reservation_id
     LEFT JOIN seats st ON rs.seat_id = st.seat_id
     WHERE r.user_id = ?
     ORDER BY r.reservation_id DESC, st.row_label, st.seat_number`,
    [userId]
  );

  return rows;
};

exports.cancelReservation = async (userId, reservationId) => {
  const [reservations] = await pool.query(
    `SELECT * FROM reservations 
     WHERE reservation_id = ? AND user_id = ? AND status = 'active'`,
    [reservationId, userId]
  );

  if (reservations.length === 0) {
    throw new Error('Reservation not found');
  }

  const reservation = reservations[0];

  const [showtimes] = await pool.query(
    `SELECT show_date, show_time FROM showtimes WHERE showtime_id = ?`,
    [reservation.showtime_id]
  );

  if (showtimes.length === 0) {
    throw new Error('Showtime not found');
  }

  const showtime = showtimes[0];
  const showDateTime = new Date(
    `${String(showtime.show_date).slice(0, 10)}T${showtime.show_time}`
  );
  const now = new Date();

  if (showDateTime <= now) {
    throw new Error('Only future reservations can be cancelled');
  }

  const [reservedSeats] = await pool.query(
    'SELECT seat_id FROM reservation_seats WHERE reservation_id = ?',
    [reservationId]
  );

  for (const seat of reservedSeats) {
    await pool.query(
      'UPDATE seats SET is_reserved = 0 WHERE seat_id = ?',
      [seat.seat_id]
    );
  }

  await pool.query(
    'DELETE FROM reservation_seats WHERE reservation_id = ?',
    [reservationId]
  );

  await pool.query(
    'UPDATE reservations SET status = ? WHERE reservation_id = ?',
    ['cancelled', reservationId]
  );

  return { message: 'Reservation cancelled successfully' };
};