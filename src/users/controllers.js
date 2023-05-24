const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY, TOKEN_EXPIRATION } = require('../../config');
const { ObjectAlreadyExist, ObjectDoesNotExist } = require('../core/errors');
const { User } = require('./models');

const getSelf = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		throw new ObjectDoesNotExist('User does not exist');
	}
	return res.send(user);
};

const updateSelf = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) {
		throw new ObjectDoesNotExist('User does not exist');
	}
	user.set({ ...req.body });
	await user.save();
	return res.send(user);
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
	const { password } = req.body;
	delete req.body.password;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await User.create({ password: hashedPassword, ...req.body });
		user.password = undefined;
		return res.status(httpStatus.CREATED).send(user);
	} catch (err) {
		if (err.name === 'MongoServerError' && err.code === 11000) {
			throw new ObjectAlreadyExist('Email is taken.');
		}
		throw err;
	}
};
