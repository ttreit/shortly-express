const logger = (req, res, next) => {
  req.requestTime = Date.now();
  console.log(
    'Received Request! Url: ' + "'" + req.url + "'" + '  Method: ' + req.method);
  next();
};

module.exports = logger;