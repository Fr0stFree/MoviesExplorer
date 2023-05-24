const errorHandler = require('./errorHandler');
const auth = require('./auth');
const cors = require('./cors');
const { requestLogger, errorLogger } = require('./logger');

module.exports = {
	errorHandler,
	auth,
	cors,
	errorLogger,
	requestLogger,
};
