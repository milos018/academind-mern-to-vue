const jwt = require('jsonwebtoken');
const HttpError = require('../models/http.Error');

module.exports = (req, res, next) => {
	let token;
	try {
		token = req.headers.authorization.split(' ')[1];
		if (!token) throw new Error('Authentication failed');

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decodedToken.userId;
		next();
	} catch (error) {
		return next(new HttpError('No token provided', 401));
	}
};
