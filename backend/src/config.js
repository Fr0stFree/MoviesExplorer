const path = require('path');

const APP_DIR = __dirname;
const BACKEND_DIR = path.join(APP_DIR, '../');
const PROJECT_DIR = path.join(BACKEND_DIR, '../');

require('dotenv').config({ path: path.join(PROJECT_DIR, '.env') });

if (!process.env.NODE_ENV) {
	throw new Error('NODE_ENV is not set');
}

module.exports = {
	APP_DIR,
	BACKEND_DIR,
	PROJECT_DIR,
	LOG_DIR: path.join(BACKEND_DIR, 'logs'),
	ALLOWED_METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	ALLOWED_URLS: [
		'*',
	],
	TOKEN_EXPIRATION: '7d',
	NODE_ENV: process.env.NODE_ENV,
	SECRET_KEY: process.env.SECRET_KEY,
	MONGO_DNS: process.env.MONGO_DNS,
	SERVER_PORT: process.env.SERVER_PORT,
	URL_PATTERN: /^https?:(www\.)?[a-zа-яё\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
	EMAIL_PATTERN: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
};
