const { ALLOWED_METHODS } = require('../../config');

const cors = (req, res, next) => {
	const { method } = req;
	const requestHeaders = req.headers['access-control-request-headers'];
	res.header('Access-Control-Allow-Origin', '*');
	if (method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
		res.header('Access-Control-Allow-Headers', requestHeaders);
		return res.end();
	}
	return next();
};

module.exports = cors;
