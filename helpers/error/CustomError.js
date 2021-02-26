class CustomError extends Error{
    constructor(message, status, internalMessage) {
        super(message);
        this.status = status;
        this.internalMessage = internalMessage;
    }
}
module.exports = CustomError;