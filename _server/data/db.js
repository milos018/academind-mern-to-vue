const { connect } = require('mongoose');

module.exports = async () => {
	try {
		const conn = await connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log('Connected to DB');
	} catch (error) {
		console.log(error);
	}
};
