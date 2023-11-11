const asyncHandler = fn => (req, res, next) =>
  setTimeout(() => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }, 0);

module.exports = asyncHandler;
