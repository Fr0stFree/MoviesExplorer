const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('mongoose-type-email');
require('mongoose-type-url');

const { InvalidCredentials } = require('../core/errors');

const userSchema = new mongoose.Schema({
	email: {
		type: mongoose.Schema.Types.Email,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 30,
	},
}, {
	versionKey: false,
});

userSchema.statics.getFromCache = async function (id) {
	if (!this.cache) {
		this.cache = new Map();
	}
	if (this.cache.has(id)) {
		return this.cache.get(id);
	}
	const result = await this.findById(id);
	this.cache.set(id, result);
	return result;
};

userSchema.statics.findByCredentials = async function (email, password) {
	const user = await this.findOne({ email }).select('+password');
	if (!user) {
		throw new InvalidCredentials('Incorrect email or password');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new InvalidCredentials('Incorrect email or password');
	}
	return user;
};

module.exports = mongoose.model('user', userSchema);
