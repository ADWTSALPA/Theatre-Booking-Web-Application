const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await authService.getProfile(req.user.userId);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};