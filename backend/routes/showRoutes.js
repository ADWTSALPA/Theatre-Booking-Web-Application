const express = require('express');
const router = express.Router();
const { getShows, getShowById, getShowtimes } = require('../controllers/showController');

router.get('/', getShows);
router.get('/showtimes/all', getShowtimes);
router.get('/:id', getShowById);

module.exports = router;