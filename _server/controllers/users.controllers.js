const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http.Error.js');
const UserModel = require('../models/user.model');

exports.getUsers = async (req, res, next) => {
	let users;
	try {
		users = await UserModel.find({}, 'email name places');
	} catch (error) {
		return next(new HttpError('Problem fetching users', 500));
	}

	if (!users || users.length === 0)
		return next(new HttpError('No users found', 404));

	res.status(200).json({ users });
};

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return next(new HttpError('invalid input fields', 422));

	const { name, email, password } = req.body;

	let existingUser;
	try {
		existingUser = await UserModel.findOne({ email: email });
	} catch (error) {
		return next(new HttpError('Could not process the request', 500));
	}

	if (existingUser)
		return next(new HttpError('Could not create User with this email', 401));

	bcrypt.hash(password, 10, async (err, hashed) => {
		if (err) return next(new HttpError('Could not process, Code Hash', 500));

		newUser = new UserModel({
			name: name,
			email: email,
			password: hashed,
			places: [],
		});

		try {
			await newUser.save();
		} catch (error) {
			console.log(error);
			return next(new HttpError('Could not save user', 500));
		}

		res.status(201).json({
			message: 'User Created',
			user: newUser,
		});
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	console.log(req.body);

	let foundUser;
	try {
		foundUser = await UserModel.findOne({ email });
	} catch (error) {
		return next(new HttpError('Could not check user data', 500));
	}

	if (!foundUser) return next(new HttpError('Could not get user data', 401));

	let passwordChecked;
	try {
		passwordChecked = await bcrypt.compare(password, foundUser.password);
	} catch (error) {
		return next(new HttpError('Could not authorize user', 422));
	}

	if (!passwordChecked)
		return next(new HttpError('Could not authorize user. Code 2', 422));

	res.json({ message: 'Logged In', user: foundUser });
};
