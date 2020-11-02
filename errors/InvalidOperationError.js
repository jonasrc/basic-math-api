const ERR_INVALID_OPERATION = 'Invalid operation passed as parameter.';

class InvalidOperationError extends Error {
    constructor() {
        super(ERR_INVALID_OPERATION);
        this.status = 400;
    }
}

exports.InvalidOperationError = InvalidOperationError;