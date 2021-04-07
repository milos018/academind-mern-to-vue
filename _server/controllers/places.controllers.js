const mongoose = require('mongoose');
const fs = require('fs');
const { validationResult } = require('express-validator');

const PlaceModel = require('../models/place.model');
const UserModel = require('../models/user.model');
const getCoordsForAddress = require('../util/location');
const HttpError = require('../models/http.Error');

exports.getAllPlaces = async (req, res, next) => {
	let allPlaces;
	try {
		// find all places in DB and show all fields except "__v"
		allPlaces = await PlaceModel.find({}, '-__v');
	} catch (error) {
		return next(new HttpError('No places found. Code 1', 404));
	}

	if (!allPlaces || allPlaces.length === 0)
		return next(new HttpError('No places found. Code 2', 404));

	res.status(200).json({ places: allPlaces });
};

exports.getPlaceByPlaceId = async (req, res, next) => {
	const { placeId } = req.params;

	let foundPlace;
	try {
		foundPlace = await PlaceModel.findById(placeId);
	} catch (error) {
		return next(
			new HttpError('Could not find place with this ID, Code 1', 404),
		);
	}

	if (!foundPlace)
		return next(new HttpError('Could not find place with this ID, Code 2'));
	res.status(200).json({ place: foundPlace });
};

exports.getPlacesByUserId = async (req, res, next) => {
	const { userId } = req.params;

	let foundPlacesByUserId;
	try {
		foundPlacesByUserId = await UserModel.findById(userId).populate('places');
		// alternative => foundPlaceByUserId = await PlaceModel.find({ creator: userId })
	} catch (error) {
		return next(
			new HttpError('Could not find place with this USER ID, Code 1', 404),
		);
	}

	if (!foundPlacesByUserId || foundPlacesByUserId.places.length === 0) {
		return next(new HttpError('Could not find places for this User ID', 404));
	}

	res.status(200).json({ userPlaces: foundPlacesByUserId });
};

exports.createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return next(new HttpError('invalid input fields', 422));

	const { title, description, address } = req.body;

	let coordinates;
	try {
		coordinates = await getCoordsForAddress(address);
	} catch (error) {
		return next(error);
	}

	let foundUser;
	try {
		foundUser = await UserModel.findById(req.userId);
	} catch (error) {
		return next(new HttpError('Could not get User', 500));
	}

	if (!foundUser) return next(new HttpError('No user with this ID', 404));

	const createdPlace = new PlaceModel({
		title,
		description,
		image: req.file.path,
		location: coordinates,
		address,
		creator: req.userId,
	});

	try {
		const currentSession = await mongoose.startSession();
		currentSession.startTransaction();

		await createdPlace.save({ session: currentSession });

		foundUser.places.push(createdPlace);
		await foundUser.save({ session: currentSession });

		await currentSession.commitTransaction();
	} catch (error) {
		return next(new HttpError('Could not save place', 500));
	}

	res.status(201).json({ place: createdPlace });
};

exports.updatePlace = async (req, res, next) => {
	const { placeId } = req.params;
	if (!mongoose.isValidObjectId(placeId))
		return next(new HttpError('Not valid ID', 422));

	const errors = validationResult(req);
	if (!errors.isEmpty())
		return next(new HttpError('invalid input fields', 422));

	const { title, description } = req.body;

	let foundPlace;
	try {
		foundPlace = await PlaceModel.findById(placeId);
	} catch (error) {
		return next(
			new HttpError('Could not find place with this ID, Code 1', 500),
		);
	}

	if (!foundPlace || foundPlace.length === 0) {
		return next(
			new HttpError('Could not find place with this ID, Code 2', 404),
		);
	}

	// check if place belongs to logged in user
	if (foundPlace.creator.toString() !== req.userId) {
		return next(new HttpError('Not authorized to edit place', 401));
	}

	// check if body has fields, otherwise leave as is
	if (title) foundPlace.title = title;
	if (description) foundPlace.description = description;

	// update/save place
	let updatedPlace;
	try {
		updatedPlace = await foundPlace.save();
	} catch (error) {
		return next(new HttpError('Could not save/update place', 500));
	}

	res.status(200).json({
		message: 'Place updated',
		updatedPlace,
	});
};

exports.deletePlace = async (req, res, next) => {
	// make sure ObjectId is a valid one
	const { placeId } = req.params;
	if (!mongoose.isValidObjectId(placeId))
		return next(new HttpError('Not valid ID', 422));

	let foundPlace;
	try {
		// find place and "grab" user id with .populate('field')
		foundPlace = await PlaceModel.findById(placeId).populate('creator');
	} catch (error) {
		return next(new HttpError('Could not find place, Code 1', 500));
	}

	if (!foundPlace)
		return next(new HttpError('Could not find place with this ID', 404));

	// check if place belongs to loggen in user
	if (foundPlace.creator._id.toString() !== req.userId) {
		return next(new HttpError('Not authorized to delete place', 401));
	}

	const imagePath = foundPlace.image;

	try {
		// start session
		const currentSession = await mongoose.startSession();
		currentSession.startTransaction();

		// remove place from places
		await foundPlace.deleteOne({ session: currentSession });

		// remove place from users
		foundPlace.creator.places.pull(foundPlace);
		await foundPlace.creator.save({ session: currentSession });

		// end transaction
		await currentSession.commitTransaction();
	} catch (error) {
		return next(new HttpError('Could not delete place, Code 1', 500));
	}

	fs.unlink(imagePath, (err) => {
		if (err) console.log('err', err);
	});

	res.status(200).json({ message: 'Place deleted' });
};
