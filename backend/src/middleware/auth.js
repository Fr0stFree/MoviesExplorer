const jwt = require('jsonwebtoken');

const { InvalidCredentials } = require('../core/errors');
const { SECRET_KEY } = require('../config');
const User = require('../users/models');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith('Bearer ')) {
		return next(new InvalidCredentials('No token provided'));
	}
	const token = authorization.replace('Bearer ', '');
	let payload;
	try {
		payload = jwt.verify(token, SECRET_KEY);
	} catch (err) {
		return next(new InvalidCredentials('Token is not valid'));
	}
	req.user = await User.getFromCache(payload.userId);
	return next();
};
