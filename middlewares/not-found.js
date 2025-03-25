const notFoundMiddleware = (req, res, next) => {
  return res.status(404).json({ msg: "Page not found" });
};

module.exports = notFoundMiddleware;
