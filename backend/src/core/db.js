const mongoose = require('mongoose');

module.exports = async (dns) => {
	await mongoose.connect(dns, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
