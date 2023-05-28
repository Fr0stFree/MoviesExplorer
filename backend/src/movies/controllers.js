const { CREATED, NO_CONTENT } = require('http-status');

const { PermissionDenied, ObjectDoesNotExist } = require('../core/errors');
const Movie = require('./models');

const retrieveAll = async (req, res, next) => {
	const movies = await Movie.find({ owner: req.user.id }).populate(['owner']);
	return res.send(movies);
};

const create = async (req, res, next) => {
	const movie = await Movie.create({ owner: req.user.id, ...req.body });
	return res.status(CREATED).send(movie);
};

const remove = async (req, res, next) => {
	const movie = await Movie.findById(req.params._id);
	if (!movie) {
		throw new ObjectDoesNotExist('Movie not found');
	}
	if (movie.owner.toString() !== req.user._id.toString()) {
		throw new PermissionDenied('Only owner can delete a movie');
	}
	await movie.deleteOne();
	return res.status(NO_CONTENT).send(`Movie ${movie.nameEn} has been deleted`);
};

module.exports = {
	retrieveAll,
	create,
	remove,
};
