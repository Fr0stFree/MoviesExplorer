const express = require('express');
const { errors } = require('celebrate');

const { SERVER_PORT, MONGO_DNS } = require('./config');
const connectToMongo = require('./core/db');
const mainRouter = require('./core/router');
const {
	errorLogger,
	requestLogger,
	errorHandler,
	cors,
	rateLimiter,
} = require('./middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimiter);
app.use(cors);
app.use(mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, async () => {
	await connectToMongo(MONGO_DNS);
});
