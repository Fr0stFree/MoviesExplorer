const { requestLogger, errorLogger } = require('./logger');
const errorHandler = require('./errorHandler');
const auth = require('./auth');
const cors = require('./cors');
const rateLimiter = require('./rateLimiter');

module.exports = {
	errorHandler,
	auth,
	cors,
	errorLogger,
	requestLogger,
	rateLimiter,
};
