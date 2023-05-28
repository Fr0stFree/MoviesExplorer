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
		'http://localhost',
	],
	TOKEN_EXPIRATION: '7d',
	NODE_ENV: process.env.NODE_ENV,
	SECRET_KEY: process.env.SECRET_KEY || 'SOMETHING-REALLY-SECRET',
	MONGO_DNS: process.env.MONGO_DNS || 'mongodb://localhost:27017/bitfilmsdb',
	SERVER_PORT: process.env.SERVER_PORT || 5000,
	URL_PATTERN: /^https?:(www\.)?[a-zа-яё\d\-._~:/?#[\]@!$&'()*+,;=]+#?$/i,
};
