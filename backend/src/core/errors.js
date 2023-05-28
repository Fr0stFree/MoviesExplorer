const {
	UNAUTHORIZED,
	NOT_FOUND,
	CONFLICT,
	FORBIDDEN,
} = require('http-status');

class InvalidCredentials extends Error {
	constructor(message) {
		super(message);
		this.statusCode = UNAUTHORIZED;
	}
}

class ObjectAlreadyExist extends Error {
	constructor(message) {
		super(message);
		this.statusCode = CONFLICT;
	}
}

class ObjectDoesNotExist extends Error {
	constructor(message) {
		super(message);
		this.statusCode = NOT_FOUND;
	}
}

class PermissionDenied extends Error {
	constructor(message) {
		super(message);
		this.statusCode = FORBIDDEN;
	}
}

class PageNotFound extends Error {
	constructor(message) {
		super(message);
		this.statusCode = NOT_FOUND;
	}
}

module.exports = {
	PermissionDenied,
	ObjectAlreadyExist,
	ObjectDoesNotExist,
	PageNotFound,
	InvalidCredentials,
};
