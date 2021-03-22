const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const placesRoutes = require('./router/places.routes');
const usersRoutes = require('./router/users.routes');

const HttpError = require('./models/http.Error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

// Error handling -> 404 for routes not found
app.use((req, res, next) => {
	return next(new HttpError('Route Not Found', 404));
});

// Error handling middleware
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occured' });
});

require('./data/db')();

const PORT = 5500;
app.listen(PORT, () => console.log(PORT));
