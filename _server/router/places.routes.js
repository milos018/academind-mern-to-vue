const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const placesController = require('../controllers/places.controllers');

router.get('/', placesController.getAllPlaces);
router.get('/:placeId', placesController.getPlaceByPlaceId);
router.get('/user/:userId', placesController.getPlacesByUserId);

router.post(
	'/',
	[
		check('title').not().isEmpty(),
		check('description').isLength({ min: 5 }),
		check('address').not().isEmpty(),
	],
	placesController.createPlace,
);

router.patch(
	'/:placeId',
	[check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
	placesController.updatePlace,
);

router.delete('/:placeId', placesController.deletePlace);

module.exports = router;
