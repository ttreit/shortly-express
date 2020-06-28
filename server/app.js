const express = require('express');
const path = require('path');
const utils = require('./lib/hashUtils');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const Auth = require('./middleware/auth');
const models = require('./models');
const cookie = require('./middleware/cookieParser');
const logger = require('./middleware/logger');
const time = require('./middleware/timeStamp');
const favicon = require('serve-favicon');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(favicon(__dirname + '/favicon.ico'));

//middleware
app.use(cookie);
app.use(Auth.createSession);
app.use(time);
app.use(logger);

app.get('/',
  (req, res) => { //middleware func
    res.render('index');
  });

app.get('/create',
  (req, res) => {
    res.render('index');
  });

app.get('/links',
  (req, res, next) => {
    models.Links.getAll()
      .then(links => {
        res.status(200).send(links);
      })
      .error(error => {
        res.status(500).send(error);
      });
  });

app.post('/links',
  (req, res, next) => {
    var url = req.body.url;
    if (!models.Links.isValidUrl(url)) {
      // send back a 404 if link is not valid
      return res.sendStatus(404);
    }

    return models.Links.get({ url })
      .then(link => {
        if (link) {
          throw link;
        }
        return models.Links.getUrlTitle(url);
      })
      .then(title => {
        return models.Links.create({
          url: url,
          title: title,
          baseUrl: req.headers.origin
        });
      })
      .then(results => {
        return models.Links.get({ id: results.insertId });
      })
      .then(link => {
        throw link;
      })
      .error(error => {
        res.status(500).send(error);
      })
      .catch(link => {
        res.status(200).send(link);
      });
  });

/************************************************************/
// Write your authentication routes here
/************************************************************/

app.get('/signup', (req, res) => {
  //call signup page
  res.render('signup');
});

app.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  return models.Users.get({ username })
    .then((user) => {
      if (!user) {
        return models.Users.create({ username, password })
          .then((user) => {
            res.redirect('/');
            //models.Sessions.create();
          })
          .catch((err) => {
            console.log('ERROR: ', err);
          });
      } else {
        //message to user?? Saying username taken
        console.log('Username Taken');
        res.redirect('/signup');
      }
    });
});

//**************************** */
//TEST DELETE THIS
//// parseCookies

// app.get('/testcookie', (req, res) => {
//   Auth.createSession(req, res);
//   res.sendStatus(200);
// });

//**************************** */

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  return models.Users.get({ username })
    .then((user) => {
      if (user) {
        if (models.Users.compare(password, user.password, user.salt)) {
          res.redirect('/');
        } else {
          //returns boolean true if passwords match.
          //if user doesn't exist, skip over then block below
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    });
});

/************************************************************/
// Handle the code parameter route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/:code', (req, res, next) => {

  return models.Links.get({ code: req.params.code })
    .tap(link => {

      if (!link) {
        throw new Error('Link does not exist');
      }
      return models.Clicks.create({ linkId: link.id });
    })
    .tap(link => {
      return models.Links.update(link, { visits: link.visits + 1 });
    })
    .then(({ url }) => {
      res.redirect(url);
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(() => {
      res.redirect('/');
    });
});

module.exports = app;
