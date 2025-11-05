// importo il framework express
const express = require("express");

// settiamo il router
const router = express.Router();

// importiamo il controller
const moviesController = require('../controllers/moviesController');

// Rotte di CRUD
// index
router.get('/', moviesController.index);

// show
router.get('/:id', moviesController.show);

// Store reviews
router.post('/:id/reviews', moviesController.movieReview)

module.exports = router;