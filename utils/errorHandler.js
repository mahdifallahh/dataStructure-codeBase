// Middleware error handler for async/await routes
function errorHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(err => {
      // Handle Mongoose CastError for invalid ObjectId
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
      // Handle validation errors
      if (err.name === 'ValidationError') {
        return res.status(422).json({ message: err.message });
      }
      // Other errors
      next(err);
    });
  };
}

module.exports = errorHandler;