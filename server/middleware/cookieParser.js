const parseCookies = (req, res, next) => {
  //req.headers.cookie //req.cookie
  var cookieObj = {};
  var cookies = req.headers.cookie.split('; ');
  //loop through cookies arr
  for (var i = 0; i < cookies.length; i++) {
    //obj keys
    var cookieKeyValue = cookies[i].split('=');
    cookieObj[cookieKeyValue[0]] = cookieKeyValue[1];
  }
  return cookieObj;
  next();
};


module.exports = parseCookies;

//access the cookies on an incoming request
  //check headers for cookies
    //if exists, //parse them into an object w/key, (userId), & value, (hash) (strings)
//assign this object to a cookies property on the request

//example of multiple cookies
  // headers: {
  //   Cookie: 'shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66; otherCookie=2a990382005bcc8b968f2b18f8f7ea490e990e78; anotherCookie=8a864482005bcc8b968f2b18f8f7ea490e577b20'
  // }

  // shortlyid: '18ea4fb6ab3178092ce936c591ddbb90c99c9f66',
  //           otherCookie: '2a990382005bcc8b968f2b18f8f7ea490e990e78',
  //           anotherCookie: '8a864482005bcc8b968f2b18f8f7ea490e577b20'

  // console.log('REQ.HEADERS.COOKIE: ', req.headers.cookie);
  // console.log('REQ.cookie ', req.cookie);
  // console.log('**** REQ: ', req);

  //create obj w/id and cookie
  //else set req.cookies to cookies object?