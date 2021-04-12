const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const placesRoutes = require('./router/places.routes');
const usersRoutes = require('./router/users.routes');

const HttpError = require('./models/http.Error');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(morgan('dev'));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Error handling -> 404 for routes not found
app.use((req, res, next) => {
	return next(new HttpError('Route Not Found', 404));
});

// Error handling middleware
app.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(error);
		});
	}
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occured' });
});

require('./data/db')();

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(PORT));
