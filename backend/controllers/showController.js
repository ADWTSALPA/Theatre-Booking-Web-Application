const showService = require('../services/showService');

exports.getShows = async (req, res) => {
  try {
    const data = await showService.getShows(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShowById = async (req, res) => {
  try {
    const data = await showService.getShowById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getShowtimes = async (req, res) => {
  try {
    const data = await showService.getShowtimes(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};