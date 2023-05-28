const mongoose = require('mongoose');
require('mongoose-type-url');

const movieSchema = new mongoose.Schema({
	country: {
		type: String,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: mongoose.Schema.Types.Url,
		required: true,
	},
	trailerLink: {
		type: mongoose.Schema.Types.Url,
		required: true,
	},
	thumbnail: {
		type: mongoose.Schema.Types.Url,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	movieId: {
		type: Number,
		required: true,
	},
	nameRU: {
		type: String,
		required: true,
	},
	nameEN: {
		type: String,
		required: true,
	},
}, {
	versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
