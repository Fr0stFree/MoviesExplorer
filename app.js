const express = require('express');
const { errors } = require('celebrate');

const { SERVER_PORT, MONGO_DNS } = require('./config');
const connectToMongo = require('./src/core/db');
const mainRouter = require('./src/core/router');
const {
	errorLogger,
	requestLogger,
	errorHandler,
	cors,
} = require('./src/middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, async () => {
	await connectToMongo(MONGO_DNS);
});
