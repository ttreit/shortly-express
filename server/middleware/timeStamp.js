const timeStamp = (req, res, next) => {
  let time = new Date()
  let formatTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
  console.log(formatTime)
  next();
};

module.exports = timeStamp;