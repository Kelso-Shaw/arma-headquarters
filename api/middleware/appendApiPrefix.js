function appendApiPrefix(req, res, next) {
  if (!req.url.startsWith("/api")) {
    return res.status(404).send("Not Found");
  }
  next();
}

module.exports = appendApiPrefix;
