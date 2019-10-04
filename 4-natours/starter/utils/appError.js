class AppError extends Error {
  constructor(message, statusCode) {
    // calling the parent class with supper
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    //creating stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
