class ErrorHandler extends Error {
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}

	static 404(message) {
		return new ErrorHandler(404, message);
	}

	static 500(message) {
		return new ErrorHandler(500, message);
	}

	static 403(message) {
		return new ErrorHandler(403, message);
	}
}

module.exports = ErrorHandler;
