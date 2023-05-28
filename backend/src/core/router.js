const express = require('express');

const { PageNotFound } = require('./errors');
const { auth } = require('../middleware');
const userRouter = require('../users/routes');
const movieRouter = require('../movies/routes');

const router = express.Router();

router.use('/', userRouter);
router.use('/movies', auth, movieRouter);
router.use(auth, (req, res, next) => next(new PageNotFound(`Page '${req.url}' does not exist`)));

module.exports = router;
