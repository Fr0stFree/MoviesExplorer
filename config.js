const path = require('path');

const BASE_DIR = path.join(__dirname, '');

require('dotenv').config({ path: path.join(BASE_DIR, '.env') });

module.exports = {
	BASE_DIR,
	ALLOWED_METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	ALLOWED_URLS: [
		'http://localhost',
	],
	TOKEN_EXPIRATION: '7d',
	NODE_ENV: process.env.NODE_ENV || 'development',
	SECRET_KEY: process.env.SECRET_KEY || 'SOMETHING-REALLY-SECRET',
	MONGO_DNS: process.env.MONGO_DNS || 'mongodb://localhost:27017/movies-explorer',
	SERVER_PORT: process.env.SERVER_PORT || 5000,
	URL_PATTERN: /^https?:(www\.)?[a-zа-яё\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
};
