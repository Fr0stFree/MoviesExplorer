const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const { BASE_DIR } = require('../../config');

const requestLogger = expressWinston.logger({
	transports: [
		new winston.transports.File({ filename: path.join(BASE_DIR, 'logs', 'request.log') }),
	],
	format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
	transports: [
		new winston.transports.File({ filename: path.join(BASE_DIR, 'logs', 'error.log') }),
	],
	format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
