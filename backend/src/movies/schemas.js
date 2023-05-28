const { Joi } = require('celebrate');
const { URL_PATTERN } = require('../config');

const createSchema = {
	body: Joi.object().keys({
		country: Joi
			.string()
			.required(),
		director: Joi
			.string()
			.required(),
		duration: Joi
			.number()
			.required(),
		year: Joi
			.string()
			.required(),
		description: Joi
			.string()
			.required(),
		image: Joi
			.string()
			.required()
			.pattern(URL_PATTERN),
		trailerLink: Joi
			.string()
			.required()
			.pattern(URL_PATTERN),
		thumbnail: Joi
			.string()
			.required()
			.pattern(URL_PATTERN),
		movieId: Joi
			.number()
			.required(),
		nameRU: Joi
			.string()
			.required(),
		nameEN: Joi
			.string()
			.required(),
	}),
};

const deleteSchema = {
	params: Joi.object().keys({
		_id: Joi
			.string()
			.required()
			.hex()
			.length(24),
	}),
};

module.exports = {
	createSchema,
	deleteSchema,
};
