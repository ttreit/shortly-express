const models = require('../models');
const Promise = require('bluebird');
const session = require('../models/session');

module.exports.createSession = (req, res, next) => {
  let cookies = req.cookies; //parsed cookie
  let sessionId;
  let sessionHash;
  if (Object.keys(cookies).length === 0) {
    session.create()
      .then(() => {
        session.get();
      })
      .then((session) => {
        req.session = session;
        console.log ('REQ SESS: ', req.session);

      });

  } else {
    console.log('Cookies! Cookies! Cookies!');
  }
  for (let key in cookies) {
    sessionId = key;
    sessionHash = cookies[key];
    let sessionObj = {
      hash: sessionHash,
      userId: sessionId
    };
    session.get(sessionObj)
      .then(() => {

      });
  }
  next();
};