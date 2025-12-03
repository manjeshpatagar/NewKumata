export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res
    .status(statusCode)
    .json({ success: false, message: err.message || "server error" });
};
