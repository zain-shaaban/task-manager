class ApiError extends Error {
  constructor(message, status,failToken) {
    super(message);
    this.status = status;
    this.failToken=failToken
  }
}

module.exports=ApiError;