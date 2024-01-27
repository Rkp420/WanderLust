class ExpressError extends Error {
    constructor(statusCode, massage) {
        super();
        this.statusCode = statusCode;
        this.message = massage;
    }
}

module.exports = ExpressError;