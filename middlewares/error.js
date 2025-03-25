const errorMiddleware = (err, req, res, next) => {
  return res.status(500).json({ msg: "Something went wrong" });
};

module.exports = errorMiddleware;
