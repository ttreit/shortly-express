const myLogger = (req, res, next) => {
  console.log('Someone Ping Me?');
  next();
};

module.exports = logger;