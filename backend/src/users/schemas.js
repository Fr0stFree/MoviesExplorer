const { Joi } = require('celebrate');
const {EMAIL_PATTERN} = require("../config");

const registerSchema = {
	body: Joi.object().keys({
		email: Joi
			.string()
			.required()
			.pattern(EMAIL_PATTERN)
			.lowercase(),
		password: Joi
			.string()
			.required(),
		name: Joi
			.string()
			.required()
			.min(2)
			.max(30),
	}),
};

const loginSchema = {
	body: Joi.object().keys({
		email: Joi
			.string()
			.required()
			.pattern(EMAIL_PATTERN)
			.lowercase(),
		password: Joi
			.string()
			.required(),
	}),
};

const updateSchema = {
	body: Joi.object().keys({
		name: Joi
			.string()
			.required()
			.min(2)
			.max(30),
		email: Joi
			.string()
			.required()
			.pattern(EMAIL_PATTERN)
			.lowercase(),
	}),
};

module.exports = {
	registerSchema,
	loginSchema,
	updateSchema,
};
