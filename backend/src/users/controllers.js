const { CREATED } = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY, TOKEN_EXPIRATION } = require('../config');
const { ObjectAlreadyExist } = require('../core/errors');
const User = require('./models');

const retrieveSelf = async (req, res, next) => res.send(req.user);

const updateSelf = async (req, res, next) => {
	req.user.set({ ...req.body });
	try {
		await req.user.save();
		return res.send(req.user);
	} catch (error) {
		if (error.name === 'MongoServerError' && error.code === 11000) {
			throw new ObjectAlreadyExist('Email is taken.');
		}
		throw error;
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findByCredentials(email, password);
	const token = jwt.sign(
		{ userId: user._id.toString() },
		SECRET_KEY,
		{ expiresIn: TOKEN_EXPIRATION },
	);
	return res.send({ token, type: 'Bearer' });
};

const create = async (req, res, next) => {
	await User.validate({ ...req.body });
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	try {
		const user = await User.create({ ...req.body, password: hashedPassword });
		user.password = undefined;
		return res.status(CREATED).send(user);
	} catch (err) {
		if (err.name === 'MongoServerError' && err.code === 11000) {
			throw new ObjectAlreadyExist('Email is taken.');
		}
		throw err;
	}
};

module.exports = {
	create,
	login,
	retrieveSelf,
	updateSelf,
};
