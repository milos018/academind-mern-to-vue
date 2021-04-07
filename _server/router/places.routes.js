const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const placesController = require('../controllers/places.controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

router.get('/', placesController.getAllPlaces);
router.get('/:placeId', placesController.getPlaceByPlaceId);
router.get('/user/:userId', placesController.getPlacesByUserId);

// checkAuth for all routes below

router.use(checkAuth);

router.post(
	'/',
	fileUpload.single('image'),
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
