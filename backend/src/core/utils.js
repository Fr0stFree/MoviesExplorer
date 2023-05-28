const errorCatcher = (func) => async (req, res, next) => func(req, res, next).catch(next);

module.exports = {
	errorCatcher,
};
