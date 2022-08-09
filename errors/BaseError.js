class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
