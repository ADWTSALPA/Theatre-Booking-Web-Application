const theatreService = require('../services/theatreService');

exports.getTheatres = async (req, res) => {
  try {
    const data = await theatreService.getTheatres(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};