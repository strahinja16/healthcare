
module.exports = class StatusError extends Error {
  constructor ( message, status ) {
    super();
    Error.captureStackTrace( this, this.constructor );
    this.name = 'StatusError';
    this.message = message;
    this.status = status;
  }
};
