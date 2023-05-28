const { Joi } = require('celebrate');

const registerSchema = {
	body: Joi.object().keys({
		email: Joi
			.string()
			.required()
			.email()
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
			.email()
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
			.email()
			.lowercase(),
	}),
};

module.exports = {
	registerSchema,
	loginSchema,
	updateSchema,
};
