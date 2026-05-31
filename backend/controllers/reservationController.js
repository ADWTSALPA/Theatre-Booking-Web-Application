const reservationService = require('../services/reservationService');

exports.createReservation = async (req, res) => {
  try {
    const data = await reservationService.createReservation(req.user.userId, req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const data = await reservationService.getMyReservations(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const data = await reservationService.cancelReservation(req.user.userId, req.params.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};